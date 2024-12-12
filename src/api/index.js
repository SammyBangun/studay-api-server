const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/user");
const bahasaRoutes = require("../routes/bahasa");
const aljabarRoutes = require("../routes/aljabar");
const ceritaRoutes = require("../routes/cerita");

const authenticateFirebase = require("../middlewares/auth");

// Gunakan route dari user.js
router.use(userRoutes);

// Gunakan route dari bahasa.js
router.use(authenticateFirebase, bahasaRoutes);

// Gunakan route dari aljabar.js
router.use(authenticateFirebase, aljabarRoutes);

// Gunakan route dari cerita.js
router.use(authenticateFirebase, ceritaRoutes);

// Middleware fallback 404 untuk menangani rute yang tidak ditemukan
router.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;
