const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Importing Routes
const categoryRoutes = require("./routes/category-routes");
const brandsRoutes = require("./routes/brand-routes");


//Using Routes
app.use("/api/category",categoryRoutes);
app.use("/api/brand",brandsRoutes);

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "E-commerce Backend API is running"
  });
});

module.exports = app;