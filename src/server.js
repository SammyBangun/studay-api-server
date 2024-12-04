require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// const authenticateFirebase = require("./middlewares/auth");
// const admin = require("./firebase/admin");
// const router = express.Router();

const port = process.env.PORT || 3000;

// Middleware CORS
app.use(cors());

// Middleware untuk meng-handle JSON
app.use(express.json());

// Route dasar
// app.get("/", (req, res) => {
//   res.send("Welcome to Studay API");
// });

// Import routes
const apiRoutes = require("./api/index");
app.use("/studay", apiRoutes);

// Run server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
