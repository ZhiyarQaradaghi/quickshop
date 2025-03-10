import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/cartService";

function ProductCard({ product }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const productId = product._id || product.id;
  const { name, description, price, category, imageUrl, stock } = product;

  const addToCartMutation = useMutation({
    mutationFn: () => cartService.addToCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      setSnackbarMessage(`${name} added to cart!`);
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

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCartMutation.mutate();
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 3,
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography variant="h6" component="div" gutterBottom>
              {name}
            </Typography>
            <Chip
              label={category}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ ml: 1 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="primary.main">
              ${price.toFixed(2)}
            </Typography>
            <Typography
              variant="body2"
              color={stock > 10 ? "success.main" : "error.main"}
            >
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            component={RouterLink}
            to={`/products/${productId}`}
            size="small"
            sx={{ mr: 1 }}
          >
            View Details
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCartIcon />}
            disabled={stock <= 0 || addToCartMutation.isPending}
            onClick={handleAddToCart}
          >
            {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </CardActions>
      </Card>

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
    </>
  );
}

export default ProductCard;
