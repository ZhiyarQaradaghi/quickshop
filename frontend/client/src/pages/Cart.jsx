import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Divider,
  CircularProgress,
  Paper,
  Grid,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import cartService from "../services/cartService";

function Cart() {
  const queryClient = useQueryClient();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartService.getCart().then((res) => res.data),
  });

  const updateCartItem = useMutation({
    mutationFn: ({ productId, quantity }) =>
      cartService.updateCartItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      setSnackbarMessage("Cart updated successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    onError: (error) => {
      setSnackbarMessage(
        error.response?.data?.message || "Failed to update cart"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    },
  });

  const removeFromCart = useMutation({
    mutationFn: (productId) => cartService.removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      setSnackbarMessage("Item removed from cart");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    onError: (error) => {
      setSnackbarMessage(
        error.response?.data?.message || "Failed to remove item"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    },
  });

  const clearCart = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      setSnackbarMessage("Cart cleared successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    onError: (error) => {
      setSnackbarMessage(
        error.response?.data?.message || "Failed to clear cart"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    },
  });

  const checkout = useMutation({
    mutationFn: () => cartService.clearCart(), // For now, just clear the cart
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      setSnackbarMessage("Order placed successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    onError: (error) => {
      setSnackbarMessage(error.response?.data?.message || "Checkout failed");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    },
  });

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= item.product.stock) {
      updateCartItem.mutate({
        productId: item.product._id,
        quantity: newQuantity,
      });
    }
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
      <Box sx={{ mt: 4 }}>
        <Typography color="error">
          Error loading cart: {error.message}
        </Typography>
      </Box>
    );
  }

  const cartItems = cart?.items || [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" gutterBottom>
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <ShoppingCartIcon
              sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Looks like you haven't added any products to your cart yet.
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/products"
              startIcon={<ShoppingCartIcon />}
            >
              Start Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <List>
                  {cartItems.map((item) => (
                    <ListItem key={item.product._id} sx={{ py: 2 }}>
                      <ListItemAvatar sx={{ mr: 2 }}>
                        <Avatar
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          variant="rounded"
                          sx={{ width: 80, height: 80 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="h6"
                            component={RouterLink}
                            to={`/products/${item.product._id}`}
                            sx={{ textDecoration: "none", color: "inherit" }}
                          >
                            {item.product.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              ${item.product.price.toFixed(2)} each
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity - 1)
                                }
                                disabled={
                                  item.quantity <= 1 || updateCartItem.isPending
                                }
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <TextField
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (!isNaN(value)) {
                                    handleQuantityChange(item, value);
                                  }
                                }}
                                inputProps={{
                                  min: 1,
                                  max: item.product.stock,
                                  style: { textAlign: "center" },
                                }}
                                sx={{ width: "50px", mx: 1 }}
                                size="small"
                              />
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity + 1)
                                }
                                disabled={
                                  item.quantity >= item.product.stock ||
                                  updateCartItem.isPending
                                }
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </>
                        }
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          minWidth: "100px",
                        }}
                      >
                        <Typography variant="h6" color="primary.main">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton
                          edge="end"
                          onClick={() =>
                            removeFromCart.mutate(item.product._id)
                          }
                          disabled={removeFromCart.isPending}
                          sx={{ mt: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => clearCart.mutate()}
                    disabled={clearCart.isPending}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography>${total.toFixed(2)}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Shipping:</Typography>
                  <Typography>Free</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary.main">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => checkout.mutate()}
                  disabled={checkout.isPending}
                  sx={{ py: 1.5 }}
                >
                  {checkout.isPending ? "Processing..." : "Checkout"}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
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

export default Cart;
