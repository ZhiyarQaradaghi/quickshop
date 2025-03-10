import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Paper,
  Rating,
  Alert,
  Snackbar,
  TextField,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import cartService from "../services/cartService";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.get(`/products/${id}`).then((res) => res.data),
  });

  const addToCartMutation = useMutation({
    mutationFn: () => cartService.addToCart(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      setSnackbarMessage(`${product.name} added to cart!`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    onError: (error) => {
      setSnackbarMessage(
        error.response?.data?.message || "Failed to add to cart"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    },
  });

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCartMutation.mutate();
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
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/products")}
            sx={{ mb: 2 }}
          >
            Back to Products
          </Button>
          <Alert severity="error">Error loading product: {error.message}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          sx={{ mb: 4 }}
        >
          Back to Products
        </Button>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h1" component="h1">
                  {product.name}
                </Typography>
                <Chip
                  label={product.category}
                  color="primary"
                  variant="outlined"
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  (24 reviews)
                </Typography>
              </Box>

              <Typography variant="h4" color="primary.main" sx={{ mb: 3 }}>
                ${product.price.toFixed(2)}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Availability:
                  <Typography
                    component="span"
                    color={product.stock > 0 ? "success.main" : "error.main"}
                    sx={{ ml: 1 }}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </Typography>
                </Typography>
              </Box>

              {product.stock > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={quantity}
                      onChange={handleQuantityChange}
                      inputProps={{
                        min: 1,
                        max: product.stock,
                        style: { textAlign: "center" },
                      }}
                      sx={{ width: "60px", mx: 1 }}
                      size="small"
                      type="number"
                    />
                    <IconButton
                      size="small"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}

              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                disabled={product.stock <= 0 || addToCartMutation.isPending}
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
                onClick={handleAddToCart}
              >
                {addToCartMutation.isPending
                  ? "Adding to Cart..."
                  : "Add to Cart"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProductDetail;
