import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../store/slices/authSlice";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/login");
    setDrawerOpen(false);
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

  const navItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Products", path: "/products", icon: <CategoryIcon /> },
    { text: "Cart", path: "/cart", icon: <ShoppingCartIcon /> },
  ];

  const mobileDrawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ color: "primary.main", textDecoration: "none" }}
        >
          QuickShop
        </Typography>
      </Box>
      <Divider />

      {isAuthenticated && (
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography>{user?.name}</Typography>
        </Box>
      )}

      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{ pl: 3 }}
          >
            <Box sx={{ mr: 2, color: "primary.main" }}>{item.icon}</Box>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        {isAuthenticated ? (
          <ListItem button onClick={handleLogout} sx={{ pl: 3 }}>
            <Box sx={{ mr: 2, color: "error.main" }}>
              <LogoutIcon />
            </Box>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem button component={RouterLink} to="/login" sx={{ pl: 3 }}>
              <Box sx={{ mr: 2, color: "primary.main" }}>
                <LoginIcon />
              </Box>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/register"
              sx={{ pl: 3 }}
            >
              <Box sx={{ mr: 2, color: "primary.main" }}>
                <PersonAddIcon />
              </Box>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ color: "white", textDecoration: "none" }}>
            QuickShop
          </RouterLink>
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}

            {isAuthenticated ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                  onClick={handleMenu}
                >
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      bgcolor: "secondary.main",
                      fontSize: "1.2rem",
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    color="white"
                    sx={{
                      ml: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    {user?.name}
                  </Typography>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  startIcon={<PersonAddIcon />}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {mobileDrawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
