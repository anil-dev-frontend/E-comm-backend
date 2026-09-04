const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authenticateJWT = require("./middleware/auth.middleware");
const isAdmin = require("./middleware/admin.middleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Importing Routes
const categoryRoutes = require("./routes/category-routes");
const brandsRoutes = require("./routes/brand-routes");
const productRoutes = require("./routes/product-routes");
const customerRoutes = require("./routes/customer-routes");
const userRoutes = require("./routes/auth-routes");
const wishlistRoutes = require("./routes/wishlist-routes");


//Using Routes
app.use("/api/category",authenticateJWT,isAdmin,categoryRoutes);
app.use("/api/brand",authenticateJWT,isAdmin,brandsRoutes);
app.use("/api/product",authenticateJWT,isAdmin,productRoutes);
app.use("/api/home",authenticateJWT, customerRoutes); 
app.use("/api/auth", userRoutes); 
app.use("/api/wishlist", authenticateJWT, wishlistRoutes);

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "E-commerce Backend API is running"
  });
});

module.exports = app;