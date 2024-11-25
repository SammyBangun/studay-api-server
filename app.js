require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// Middleware untuk meng-handle JSON
app.use(express.json());

// Route dasar
app.get("/", (req, res) => {
  res.send("Welcome to Studay API");
});

// Import routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Run server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
