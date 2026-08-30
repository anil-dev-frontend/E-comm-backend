const dotenv = require("dotenv");

dotenv.config({ path: "./src/config/.env" });

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT;

// Connect MongoDB
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});