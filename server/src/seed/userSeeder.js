const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

console.log("Starting user seeder...");

// Sample user data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Alice Williams",
    email: "alice@example.com",
    password: "password123",
    role: "user",
  },
];

async function seedUsers() {
  try {
    console.log("Clearing existing users...");
    await User.deleteMany({});
    console.log("Cleared existing users");

    console.log("Inserting new users...");

    // Hash passwords before inserting
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`Added ${createdUsers.length} users to the database`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    return createdUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    await mongoose.disconnect();
    throw error;
  }
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return seedUsers();
  })
  .then(() => {
    console.log("User seeding completed successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error in user seeder:", err);
    process.exit(1);
  });

module.exports = users;
