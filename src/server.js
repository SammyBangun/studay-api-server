require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 8080;

// Middleware CORS
app.use(cors());

// Middleware untuk meng-handle JSON
app.use(express.json());

// Import routes
const apiRoutes = require("./api/index");
app.use("/studay", apiRoutes);

// Swagger Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Studay API",
      version: "1.0.0",
      description: "API documentation for Studay",
      contact: {
        name: "Studay",
      },
    },
    servers: [
      {
        url: "http://0.0.0.0:8080",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

// Inisialisasi Swagger-jsdoc
const specs = swaggerjsdoc(options);

// Swagger UI
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
