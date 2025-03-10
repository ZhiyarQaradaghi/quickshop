const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

console.log("Starting product seeder...");
console.log(`MongoDB URI: ${process.env.MONGODB_URI ? "Found" : "Not found"}`);

// Sample product data - 100 products
const products = [
  // Electronics - Smartphones
  {
    name: "Smartphone X",
    description:
      "Latest smartphone with advanced features and high-resolution camera",
    price: 799.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500",
    stock: 50,
  },
  {
    name: "Smartphone Pro Max",
    description:
      "Premium smartphone with 6.7-inch display and triple camera system",
    price: 1099.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1592286927505-1def25115481?q=80&w=500",
    stock: 40,
  },
  {
    name: "Budget Smartphone",
    description:
      "Affordable smartphone with great performance for everyday use",
    price: 299.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=500",
    stock: 75,
  },
  {
    name: "Foldable Smartphone",
    description: "Innovative foldable smartphone with dual screens",
    price: 1499.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1659801995371-d6e3fbf8e7e7?q=80&w=500",
    stock: 25,
  },
  {
    name: "Gaming Smartphone",
    description: "Smartphone optimized for mobile gaming with cooling system",
    price: 899.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=500",
    stock: 35,
  },

  // Electronics - Laptops
  {
    name: "Laptop Pro",
    description:
      "Powerful laptop for professionals with high performance specs",
    price: 1299.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500",
    stock: 30,
  },
  {
    name: "Ultrabook Slim",
    description: "Ultra-thin and lightweight laptop for maximum portability",
    price: 999.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500",
    stock: 45,
  },
  {
    name: "Gaming Laptop",
    description: "High-performance laptop with dedicated graphics for gaming",
    price: 1599.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=500",
    stock: 20,
  },
  {
    name: "Budget Laptop",
    description: "Affordable laptop for students and everyday computing",
    price: 499.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500",
    stock: 60,
  },
  {
    name: "Convertible Laptop",
    description: "2-in-1 laptop that converts to tablet mode with touchscreen",
    price: 899.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=500",
    stock: 35,
  },

  // Electronics - Tablets
  {
    name: "Tablet Pro",
    description:
      "Lightweight tablet with high-resolution display and stylus support",
    price: 649.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=500",
    stock: 45,
  },
  {
    name: "Mini Tablet",
    description: "Compact tablet with 8-inch display, perfect for reading",
    price: 399.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?q=80&w=500",
    stock: 55,
  },
  {
    name: "Budget Tablet",
    description: "Affordable tablet for entertainment and basic tasks",
    price: 199.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=500",
    stock: 70,
  },
  {
    name: "Kids Tablet",
    description: "Durable tablet designed for children with parental controls",
    price: 149.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1631379578550-7038263db699?q=80&w=500",
    stock: 40,
  },
  {
    name: "Drawing Tablet",
    description: "Professional drawing tablet with pressure sensitivity",
    price: 299.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1626955949583-2a8b8d5d1ee5?q=80&w=500",
    stock: 30,
  },

  // Electronics - TVs
  {
    name: "4K Smart TV",
    description: "Ultra HD smart TV with streaming apps and voice control",
    price: 899.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=500",
    stock: 25,
  },
  {
    name: "OLED TV",
    description: "Premium OLED TV with perfect blacks and vibrant colors",
    price: 1499.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?q=80&w=500",
    stock: 15,
  },
  {
    name: "Budget Smart TV",
    description: "Affordable smart TV with Full HD resolution",
    price: 399.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?q=80&w=500",
    stock: 40,
  },
  {
    name: "Outdoor TV",
    description: "Weather-resistant TV designed for outdoor viewing",
    price: 1299.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=500",
    stock: 10,
  },
  {
    name: "Curved TV",
    description: "Immersive curved TV for enhanced viewing experience",
    price: 799.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1558888401-3cc1de77652d?q=80&w=500",
    stock: 20,
  },

  // Audio Products
  {
    name: "Wireless Headphones",
    description:
      "Noise-cancelling wireless headphones with premium sound quality",
    price: 199.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
    stock: 100,
  },
  {
    name: "Wireless Earbuds",
    description:
      "Compact wireless earbuds with charging case and long battery life",
    price: 129.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=500",
    stock: 120,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with waterproof design",
    price: 89.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=500",
    stock: 60,
  },
  {
    name: "Premium Headphones",
    description: "Studio-quality over-ear headphones for audiophiles",
    price: 349.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=500",
    stock: 35,
  },
  {
    name: "Smart Speaker",
    description: "Voice-controlled smart speaker with virtual assistant",
    price: 129.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1512446816042-444d641267d4?q=80&w=500",
    stock: 50,
  },
  {
    name: "Soundbar",
    description: "Slim soundbar with subwoofer for enhanced TV audio",
    price: 199.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=500",
    stock: 40,
  },
  {
    name: "DJ Headphones",
    description: "Professional DJ headphones with swiveling ear cups",
    price: 149.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=500",
    stock: 25,
  },
  {
    name: "Portable DAC",
    description: "Digital-to-analog converter for improved audio quality",
    price: 99.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=500",
    stock: 30,
  },
  {
    name: "Vinyl Record Player",
    description: "Modern turntable with Bluetooth connectivity",
    price: 179.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=500",
    stock: 20,
  },
  {
    name: "Home Theater System",
    description: "Complete 5.1 surround sound system for immersive audio",
    price: 499.99,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=500",
    stock: 15,
  },

  // Wearables
  {
    name: "Smart Watch",
    description: "Fitness tracker and smartwatch with heart rate monitoring",
    price: 249.99,
    category: "Wearables",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500",
    stock: 75,
  },
  {
    name: "Fitness Tracker",
    description: "Slim fitness band with activity and sleep tracking",
    price: 79.99,
    category: "Wearables",
    imageUrl:
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=500",
    stock: 90,
  },
  {
    name: "Smart Glasses",
    description: "AR-enabled smart glasses with heads-up display",
    price: 399.99,
    category: "Wearables",
    imageUrl:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500",
    stock: 20,
  },
  {
    name: "Smart Ring",
    description: "Health monitoring smart ring with sleep tracking",
    price: 299.99,
    category: "Wearables",
    imageUrl:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500",
    stock: 30,
  },
  {
    name: "Running Watch",
    description: "GPS running watch with advanced metrics for athletes",
    price: 199.99,
    category: "Wearables",
    imageUrl:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?q=80&w=500",
    stock: 45,
  },

  // Photography
  {
    name: "Digital Camera",
    description: "Professional digital camera with interchangeable lenses",
    price: 749.99,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500",
    stock: 40,
  },
  {
    name: "Mirrorless Camera",
    description: "Compact mirrorless camera with 4K video capabilities",
    price: 899.99,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=500",
    stock: 30,
  },
  {
    name: "Camera Lens",
    description: "Wide-angle lens for landscape and architectural photography",
    price: 499.99,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=500",
    stock: 25,
  },
  {
    name: "Camera Tripod",
    description: "Sturdy tripod with adjustable height and ball head",
    price: 79.99,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1584824388878-91a76fa8c58d?q=80&w=500",
    stock: 50,
  },
  {
    name: "Camera Backpack",
    description: "Padded backpack designed for camera equipment",
    price: 89.99,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=500",
    stock: 35,
  },
  {
    name: "Drone Camera",
    description: "4K drone with stabilized camera for aerial photography",
    price: 799.99,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=500",
    stock: 20,
  },
  {
    name: "Instant Camera",
    description: "Fun instant camera that prints photos immediately",
    price: 69.99,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500",
    stock: 40,
  },
  {
    name: "Camera Flash",
    description: "External flash unit for better lighting in photography",
    price: 149.99,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1621963189285-bbc2a5f04f70?q=80&w=500",
    stock: 30,
  },

  // Gaming
  {
    name: "Gaming Console",
    description: "Next-generation gaming console with 4K gaming capabilities",
    price: 499.99,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=500",
    stock: 35,
  },
  {
    name: "Gaming Controller",
    description: "Ergonomic controller with customizable buttons",
    price: 69.99,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=500",
    stock: 60,
  },
  {
    name: "Gaming Headset",
    description: "Immersive gaming headset with surround sound",
    price: 99.99,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1591105575839-1fb28afcf4b8?q=80&w=500",
    stock: 45,
  },
  {
    name: "Gaming Mouse",
    description: "Precision gaming mouse with adjustable DPI",
    price: 59.99,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=500",
    stock: 70,
  },
  {
    name: "Gaming Keyboard",
    description: "Mechanical gaming keyboard with RGB lighting",
    price: 129.99,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1595044426077-d36d9236d44a?q=80&w=500",
    stock: 40,
  },
  {
    name: "Gaming Chair",
    description: "Comfortable gaming chair with lumbar support",
    price: 249.99,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=500",
    stock: 25,
  },
  {
    name: "Gaming Monitor",
    description: "High refresh rate monitor for smooth gaming",
    price: 349.99,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=500",
    stock: 30,
  },
  {
    name: "VR Headset",
    description: "Virtual reality headset for immersive gaming",
    price: 399.99,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=500",
    stock: 20,
  },

  // Smart Home
  {
    name: "Smart Thermostat",
    description:
      "Wi-Fi enabled thermostat for energy-efficient climate control",
    price: 149.99,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1567769541715-8c71fe49a48e?q=80&w=500",
    stock: 40,
  },
  {
    name: "Smart Doorbell",
    description: "Video doorbell with motion detection and two-way audio",
    price: 179.99,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=500",
    stock: 35,
  },
  {
    name: "Smart Light Bulbs",
    description: "Color-changing smart bulbs controllable via app",
    price: 39.99,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1558211246-bb8a7deb0c62?q=80&w=500",
    stock: 80,
  },
  {
    name: "Smart Lock",
    description: "Keyless entry smart lock with smartphone control",
    price: 199.99,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=500",
    stock: 30,
  },
  {
    name: "Smart Security Camera",
    description: "Indoor/outdoor security camera with night vision",
    price: 129.99,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=500",
    stock: 45,
  },
  {
    name: "Smart Plug",
    description: "Wi-Fi enabled smart plug to control any device",
    price: 24.99,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=500",
    stock: 100,
  },
  {
    name: "Robot Vacuum",
    description: "Smart robot vacuum with mapping and app control",
    price: 299.99,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=500",
    stock: 25,
  },
  {
    name: "Smart Display",
    description: "Voice-controlled display with virtual assistant",
    price: 129.99,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1551651639-927b595f9281?q=80&w=500",
    stock: 35,
  },

  // Accessories
  {
    name: "Wireless Charger",
    description: "Fast wireless charging pad for compatible devices",
    price: 29.99,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1608069641736-bf3eaaa18dd2?q=80&w=500",
    stock: 90,
  },
  {
    name: "Phone Case",
    description: "Protective case with drop protection for smartphones",
    price: 19.99,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1541877590-a1c8d5a2d9e9?q=80&w=500",
    stock: 150,
  },
  {
    name: "Screen Protector",
    description: "Tempered glass screen protector for smartphones",
    price: 9.99,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=500",
    stock: 200,
  },
  {
    name: "Power Bank",
    description: "Portable battery pack for charging devices on the go",
    price: 49.99,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=500",
    stock: 120,
  },
  {
    name: "USB-C Hub",
    description: "Multi-port adapter for laptops with USB-C",
    price: 39.99,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=500",
    stock: 60,
  },
  {
    name: "Laptop Stand",
    description: "Adjustable stand for improved ergonomics",
    price: 29.99,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1611174797136-5e1a7c9a1c4c?q=80&w=500",
    stock: 70,
  },
  {
    name: "Cable Organizer",
    description: "Silicone cable management system for desk",
    price: 14.99,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1600490036275-35f5f1656861?q=80&w=500",
    stock: 100,
  },
  {
    name: "Laptop Sleeve",
    description: "Padded sleeve for laptop protection",
    price: 24.99,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=500",
    stock: 80,
  },

  // Office Electronics
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with long battery life",
    price: 29.99,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=500",
    stock: 85,
  },
  {
    name: "Wireless Keyboard",
    description: "Slim wireless keyboard with numeric keypad",
    price: 49.99,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=500",
    stock: 65,
  },
  {
    name: "Document Scanner",
    description: "Compact scanner for digitizing documents",
    price: 129.99,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1563770557593-8f6e2d2b6a09?q=80&w=500",
    stock: 30,
  },
  {
    name: "Laser Printer",
    description: "Fast monochrome laser printer for office use",
    price: 199.99,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=500",
    stock: 25,
  },
  {
    name: "External Monitor",
    description: "27-inch 4K monitor for productivity",
    price: 299.99,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500",
    stock: 40,
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    price: 39.99,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1534281305182-8708ce0a5d55?q=80&w=500",
    stock: 60,
  },
  {
    name: "Paper Shredder",
    description: "Cross-cut paper shredder for secure document disposal",
    price: 69.99,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=500",
    stock: 35,
  },
  {
    name: "Webcam",
    description: "HD webcam for video conferencing",
    price: 59.99,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?q=80&w=500",
    stock: 50,
  },

  // Networking
  {
    name: "Wi-Fi Router",
    description: "Dual-band Wi-Fi 6 router for fast home networking",
    price: 149.99,
    category: "Networking",
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=500",
    stock: 40,
  },
  {
    name: "Mesh Wi-Fi System",
    description: "Whole-home mesh Wi-Fi system with 3 nodes",
    price: 249.99,
    category: "Networking",
    imageUrl:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=500",
    stock: 30,
  },
  {
    name: "Network Switch",
    description: "8-port gigabit network switch for wired connections",
    price: 39.99,
    category: "Networking",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500",
    stock: 45,
  },
  {
    name: "Wi-Fi Extender",
    description: "Wi-Fi range extender to eliminate dead zones",
    price: 49.99,
    category: "Networking",
    imageUrl:
      "https://images.unsplash.com/photo-1551703599-2a5a565a2c15?q=80&w=500",
    stock: 55,
  },
  {
    name: "Ethernet Cable",
    description: "Cat 6 ethernet cable for reliable wired connections",
    price: 9.99,
    category: "Networking",
    imageUrl:
      "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=80&w=500",
    stock: 100,
  },

  // Storage
  {
    name: "External SSD",
    description: "Portable SSD with 1TB capacity and fast transfer speeds",
    price: 149.99,
    category: "Storage",
    imageUrl:
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=500",
    stock: 60,
  },
  {
    name: "USB Flash Drive",
    description: "64GB USB 3.0 flash drive for portable storage",
    price: 19.99,
    category: "Storage",
    imageUrl:
      "https://images.unsplash.com/photo-1589466725882-f47191476e8c?q=80&w=500",
    stock: 120,
  },
  {
    name: "NAS Drive",
    description: "Network attached storage with 4TB capacity",
    price: 299.99,
    category: "Storage",
    imageUrl:
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?q=80&w=500",
    stock: 25,
  },
];

// Modify the seedProducts function to return a promise
async function seedProducts() {
  try {
    console.log("Clearing existing products...");
    await Product.deleteMany({});
    console.log("Cleared existing products");

    console.log("Inserting new products...");
    const createdProducts = await Product.insertMany(products);
    console.log(`Added ${createdProducts.length} products to the database`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    return true;
  } catch (error) {
    console.error("Error seeding products:", error);
    await mongoose.disconnect();
    throw error;
  }
}

// Modify the MongoDB connection part
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return seedProducts();
  })
  .then(() => {
    console.log("Seeding completed successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error in seeder:", err);
    process.exit(1);
  });

module.exports = products;
