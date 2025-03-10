import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "All Products", path: "/products" },
        { name: "Featured Items", path: "/products?featured=true" },
        { name: "New Arrivals", path: "/products?new=true" },
        { name: "Special Offers", path: "/products?special=true" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "My Account", path: "/account" },
        { name: "Track Order", path: "/orders" },
        { name: "Returns & Exchanges", path: "/returns" },
        { name: "Help Center", path: "/help" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Our Story", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              QuickShop
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
              Your one-stop destination for all your shopping needs. Quality
              products, competitive prices, and exceptional customer service.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">support@quickshop.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">(123) 456-7890</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                123 Commerce St, Shopping City
              </Typography>
            </Box>
          </Grid>

          {!isMobile &&
            footerLinks.map((section) => (
              <Grid item xs={12} sm={6} md={2} key={section.title}>
                <Typography variant="h6" gutterBottom>
                  {section.title}
                </Typography>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                  {section.links.map((link) => (
                    <Box component="li" key={link.name} sx={{ mb: 1 }}>
                      <Link
                        component={RouterLink}
                        to={link.path}
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          textDecoration: "none",
                          "&:hover": {
                            color: "white",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ mb: 3 }}>
              <IconButton aria-label="Facebook" sx={{ color: "white", mr: 1 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" sx={{ color: "white", mr: 1 }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" sx={{ color: "white", mr: 1 }}>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" sx={{ color: "white" }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PaymentIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                We accept all major credit cards
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} QuickShop. All rights reserved.
          </Typography>
          {!isMobile && (
            <Box>
              <Link
                component={RouterLink}
                to="/privacy"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  mr: 3,
                  "&:hover": { color: "white" },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                component={RouterLink}
                to="/terms"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  "&:hover": { color: "white" },
                }}
              >
                Terms of Service
              </Link>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
