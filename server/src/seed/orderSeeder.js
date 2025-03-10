const mongoose = require("mongoose");
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
require("dotenv").config();

console.log("Starting order seeder...");

async function seedOrders() {
  try {
    console.log("Clearing existing orders...");
    await Order.deleteMany({});
    console.log("Cleared existing orders");

    const users = await User.find({ role: "user" });
    const products = await Product.find();

    if (users.length === 0) {
      throw new Error("No users found. Please run the user seeder first.");
    }

    if (products.length === 0) {
      throw new Error(
        "No products found. Please run the product seeder first."
      );
    }

    console.log(`Found ${users.length} users and ${products.length} products`);

    const orders = [];

    for (const user of users) {
      const numOrders = Math.floor(Math.random() * 2) + 2;

      for (let i = 0; i < numOrders; i++) {
        const numProducts = Math.floor(Math.random() * 5) + 1;
        const orderProducts = [];
        let totalAmount = 0;

        const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
        const selectedProducts = shuffledProducts.slice(0, numProducts);

        for (const product of selectedProducts) {
          const quantity = Math.floor(Math.random() * 3) + 1;
          orderProducts.push({
            product: product._id,
            quantity,
          });
          totalAmount += product.price * quantity;
        }

        const statuses = ["pending", "processing", "shipped", "delivered"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));

        orders.push({
          user: user._id,
          products: orderProducts,
          totalAmount: parseFloat(totalAmount.toFixed(2)),
          status: randomStatus,
          createdAt: date,
        });
      }
    }

    console.log("Inserting new orders...");
    const createdOrders = await Order.insertMany(orders);
    console.log(`Added ${createdOrders.length} orders to the database`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    return true;
  } catch (error) {
    console.error("Error seeding orders:", error);
    await mongoose.disconnect();
    throw error;
  }
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return seedOrders();
  })
  .then(() => {
    console.log("Order seeding completed successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error in order seeder:", err);
    process.exit(1);
  });
