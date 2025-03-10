import {
  Box,
  Typography,
  Slider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
} from "@mui/material";

function FilterSidebar({
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
}) {
  return (
    <Box sx={{ p: 3, width: isMobile ? "100%" : "auto" }}>
      <Typography variant="h6">Filters</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 1, mb: 3 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          valueLabelFormat={(value) => `$${value}`}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  size="small"
                />
              }
              label={<Typography variant="body2">{category}</Typography>}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Typography variant="subtitle1" gutterBottom>
        Availability
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={stockFilter === "all"}
                onChange={() => handleStockFilterChange("all")}
                size="small"
              />
            }
            label={<Typography variant="body2">All Items</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={stockFilter === "inStock"}
                onChange={() => handleStockFilterChange("inStock")}
                size="small"
              />
            }
            label={<Typography variant="body2">In Stock Only</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={stockFilter === "outOfStock"}
                onChange={() => handleStockFilterChange("outOfStock")}
                size="small"
              />
            }
            label={<Typography variant="body2">Out of Stock</Typography>}
          />
        </FormGroup>
      </FormControl>

      <Button
        variant="outlined"
        fullWidth
        onClick={clearAllFilters}
        sx={{ mt: 2 }}
      >
        Clear All Filters
      </Button>
    </Box>
  );
}

export default FilterSidebar;
