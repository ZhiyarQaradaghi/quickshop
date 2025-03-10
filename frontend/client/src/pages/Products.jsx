import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProductCard from "../components/products/ProductCard";
import FilterSidebar from "../components/filters/FilterSidebar";
import ActiveFilters from "../components/filters/ActiveFilters";
import MobileFilterDrawer from "../components/filters/MobileFilterDrawer";
import EmptyState from "../components/common/EmptyState";
import api from "../services/api";

function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stockFilter, setStockFilter] = useState("all");
  const [activeFilters, setActiveFilters] = useState([]);

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then((res) => res.data),
  });

  const categories = [...new Set(products.map((product) => product.category))];
  const prices = products.map((product) => product.price);
  const minPrice = Math.min(...(prices.length ? prices : [0]));
  const maxPrice = Math.max(...(prices.length ? prices : [1000]));

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products.length, minPrice, maxPrice]);

  useEffect(() => {
    const filters = [];

    if (priceRange[0] > minPrice || priceRange[1] < maxPrice) {
      filters.push(`Price: $${priceRange[0]} - $${priceRange[1]}`);
    }

    selectedCategories.forEach((category) => {
      filters.push(`Category: ${category}`);
    });

    if (stockFilter === "inStock") {
      filters.push("In Stock Only");
    } else if (stockFilter === "outOfStock") {
      filters.push("Out of Stock");
    }

    setActiveFilters(filters);
  }, [priceRange, selectedCategories, stockFilter, minPrice, maxPrice]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleStockFilterChange = (value) => {
    setStockFilter(value);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setPriceRange([minPrice, maxPrice]);
    setSelectedCategories([]);
    setStockFilter("all");
  };

  const removeFilter = (filter) => {
    if (filter.startsWith("Price:")) {
      setPriceRange([minPrice, maxPrice]);
    } else if (filter.startsWith("Category:")) {
      const category = filter.split(": ")[1];
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else if (filter === "In Stock Only" || filter === "Out of Stock") {
      setStockFilter("all");
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    let matchesStock = true;
    if (stockFilter === "inStock") {
      matchesStock = product.stock > 0;
    } else if (stockFilter === "outOfStock") {
      matchesStock = product.stock === 0;
    }

    return matchesSearch && matchesPrice && matchesCategory && matchesStock;
  });

  const filterProps = {
    priceRange,
    minPrice,
    maxPrice,
    categories,
    selectedCategories,
    stockFilter,
    handlePriceChange,
    handleCategoryChange,
    handleStockFilterChange,
    clearAllFilters,
    isMobile,
    toggleDrawer,
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">Error loading products: {error.message}</Alert>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" gutterBottom>
          Products
        </Typography>

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3} lg={2}>
              <Paper elevation={1} sx={{ height: "100%" }}>
                <FilterSidebar {...filterProps} />
              </Paper>
            </Grid>
          )}

          <Grid item xs={12} md={9} lg={10}>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={isMobile ? 10 : 12}>
                  <TextField
                    fullWidth
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                  />
                </Grid>

                {isMobile && (
                  <MobileFilterDrawer
                    open={drawerOpen}
                    toggleDrawer={toggleDrawer}
                    filterProps={filterProps}
                  />
                )}
              </Grid>
            </Box>

            {activeFilters.length > 0 && (
              <ActiveFilters
                filters={activeFilters}
                removeFilter={removeFilter}
                clearAllFilters={clearAllFilters}
              />
            )}

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </Typography>
            </Box>

            {filteredProducts.length > 0 ? (
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={product._id || product.id}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyState
                title="No products found"
                description="Try adjusting your search or filter criteria"
                actionText="Clear Filters"
                onAction={clearAllFilters}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Products;
