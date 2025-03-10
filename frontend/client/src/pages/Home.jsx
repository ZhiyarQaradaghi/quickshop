import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import api from "../services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/layout/Footer";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

function ScrollAnimation({ children, delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: delay,
        },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div ref={ref} initial={{ y: 50, opacity: 0 }} animate={controls}>
      {children}
    </motion.div>
  );
}

const HeroSection = () => (
  <Box
    sx={{
      background: "linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)",
      color: "white",
      py: { xs: 8, md: 12 },
      mb: 6,
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MotionTypography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Welcome to QuickShop
            </MotionTypography>
            <MotionTypography
              variant="h5"
              gutterBottom
              sx={{ mb: 4, fontWeight: 400 }}
            >
              Your One-Stop Shop for Everything You Need
            </MotionTypography>
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: "1.2rem",
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "white",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              Browse Products
            </Button>
          </MotionBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{ textAlign: "center" }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Online Shopping"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 4,
                boxShadow: 4,
              }}
            />
          </MotionBox>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const WelcomeMessage = ({ user }) => (
  <ScrollAnimation>
    <MotionPaper
      elevation={0}
      sx={{
        my: 3,
        p: 2,
        borderRadius: 2,
        background:
          "linear-gradient(90deg, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0.05) 100%)",
        borderLeft: "4px solid #1976d2",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          color: "primary.main",
        }}
      >
        Welcome back, {user?.name || "User"}
      </Typography>
    </MotionPaper>
  </ScrollAnimation>
);

const BenefitCard = ({ benefit, index }) => (
  <Grid item xs={12} md={4} key={index}>
    <ScrollAnimation delay={index * 0.1}>
      <MotionPaper
        elevation={2}
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Box sx={{ color: "primary.main", mb: 2 }}>{benefit.icon}</Box>
        <Typography variant="h5" gutterBottom>
          {benefit.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {benefit.description}
        </Typography>
      </MotionPaper>
    </ScrollAnimation>
  </Grid>
);

const BenefitsSection = ({ benefits }) => (
  <Box sx={{ my: 8 }}>
    <ScrollAnimation>
      <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
        Why Shop With Us
      </Typography>
    </ScrollAnimation>
    <Grid container spacing={4}>
      {benefits.map((benefit, index) => (
        <BenefitCard key={index} benefit={benefit} index={index} />
      ))}
    </Grid>
  </Box>
);

const ProductCard = ({ product }) => (
  <Box sx={{ px: 1 }}>
    <MotionCard
      component={RouterLink}
      to={`/products/${product._id || product.id}`}
      sx={{
        height: 450,
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, minHeight: "4.5em" }}
        >
          {product.description.substring(0, 100)}...
        </Typography>
        <Typography variant="h6" color="primary.main">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
    </MotionCard>
  </Box>
);

const FeaturedProductsSection = ({ products, sliderSettings }) => (
  <Box sx={{ my: 8 }}>
    <ScrollAnimation>
      <Typography variant="h2" align="center" gutterBottom>
        Featured Products
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Check out our most popular items
      </Typography>
    </ScrollAnimation>

    <ScrollAnimation>
      <Box sx={{ mt: 4, mb: 24, px: 2 }}>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </Slider>
      </Box>
    </ScrollAnimation>
  </Box>
);

const TestimonialCard = ({ testimonial, index }) => (
  <Grid item xs={12} md={4} key={index}>
    <ScrollAnimation delay={index * 0.2}>
      <MotionPaper elevation={2} sx={{ p: 3, height: "100%", borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            {testimonial.avatar}
          </Avatar>
          <Typography variant="h6">{testimonial.name}</Typography>
        </Box>
        <Rating
          value={testimonial.rating}
          precision={0.5}
          readOnly
          sx={{ mb: 2 }}
        />
        <Typography variant="body1">"{testimonial.text}"</Typography>
      </MotionPaper>
    </ScrollAnimation>
  </Grid>
);

const TestimonialsSection = ({ testimonials }) => (
  <Box sx={{ my: 8 }}>
    <ScrollAnimation>
      <Typography variant="h2" align="center" gutterBottom>
        What Our Customers Say
      </Typography>
    </ScrollAnimation>
    <Grid container spacing={4} sx={{ mt: 2 }}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} index={index} />
      ))}
    </Grid>
  </Box>
);

const CallToAction = () => (
  <ScrollAnimation>
    <MotionBox
      sx={{
        my: 8,
        p: 6,
        textAlign: "center",
        borderRadius: 4,
        background: "linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)",
        color: "white",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Ready to Start Shopping?
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
        Join thousands of satisfied customers today
      </Typography>
      <Button
        component={RouterLink}
        to="/products"
        variant="contained"
        size="large"
        sx={{
          py: 1.5,
          px: 4,
          fontSize: "1.2rem",
          borderRadius: 2,
          backgroundColor: "white",
          color: "primary.main",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.9)",
          },
        }}
      >
        Shop Now
      </Button>
    </MotionBox>
  </ScrollAnimation>
);

const getBenefits = () => [
  {
    icon: <LocalShippingIcon fontSize="large" />,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: <SupportAgentIcon fontSize="large" />,
    title: "24/7 Support",
    description: "Get help anytime",
  },
  {
    icon: <PaymentIcon fontSize="large" />,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
];

const getTestimonials = () => [
  {
    name: "Sarah Johnson",
    avatar: "S",
    rating: 5,
    text: "QuickShop has the best selection and prices. My go-to for all my shopping needs!",
  },
  {
    name: "Michael Chen",
    avatar: "M",
    rating: 4.5,
    text: "Fast shipping and excellent customer service. Highly recommend!",
  },
  {
    name: "Emily Rodriguez",
    avatar: "E",
    rating: 5,
    text: "The quality of products is outstanding. Will definitely shop here again.",
  },
];

const getSliderSettings = (isMobile) => ({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: isMobile ? 1 : 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  appendDots: (dots) => (
    <Box sx={{ position: "relative", bottom: "-30px" }}>
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </Box>
  ),
  dotsClass: "slick-dots",
});


function Home() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data: allProducts = [] } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => api.get("/products").then((res) => res.data),
  });

  const featuredProducts = useMemo(() => {
    if (allProducts.length <= 8) return allProducts;

    const shuffled = [...allProducts];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 8);
  }, [allProducts]);

  const benefits = getBenefits();
  const testimonials = getTestimonials();
  const sliderSettings = getSliderSettings(isMobile);

  return (
    <Box sx={{ overflow: "hidden" }}>
      <HeroSection />

      <Container maxWidth="lg">
        {isAuthenticated && <WelcomeMessage user={user} />}
        <BenefitsSection benefits={benefits} />
        <FeaturedProductsSection
          products={featuredProducts}
          sliderSettings={sliderSettings}
        />
        <TestimonialsSection testimonials={testimonials} />
        <CallToAction />
      </Container>

      <Footer />
    </Box>
  );
}

export default Home;
