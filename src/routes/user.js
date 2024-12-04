require("dotenv").config();
const express = require("express");
const router = express.Router();
const admin = require("../firebase/admin");
const firestore = admin.firestore();
const axios = require("axios");

const authenticateFirebase = require("../middlewares/auth");

const usersCollection = firestore.collection("users");
const API_KEY = process.env.API_KEY;

// Register
router.post("/register", async (req, res) => {
  const { nama, email, password } = req.body;
  if (!nama || !email || !password) {
    return res.status(400).json({ message: "Field tidak boleh kosong" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: nama,
    });

    // Simpan data tambahan ke Firestore
    await usersCollection.doc(userRecord.uid).set({
      nama,
      email,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { uid: userRecord.uid, email: userRecord.email, nama },
    });
  } catch (error) {
    res.status(500).json({ message: "Error during registration", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email dan password tidak boleh kosong" });
  }

  try {
    // Panggil Firebase REST API untuk sign in dengan email dan password
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const idToken = response.data.idToken;
    const refreshToken = response.data.refreshToken;

    res.status(200).json({
      message: "Login berhasil",
      idToken, // Langsung kirim ID token
      refreshToken, // Opsional, untuk token refresh
    });
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error during login",
      error: error.response?.data || error.message,
    });
  }
});

// Profil
router.get("/profile", authenticateFirebase, async (req, res) => {
  try {
    const userId = req.user.uid;

    // Ambil data dari Firestore
    const userDoc = await usersCollection.doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found in Firestore" });
    }

    res.status(200).json({
      message: "User profile",
      user: { uid: userId, ...userDoc.data() },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      message: "Error fetching user profile",
      error: error.message || error,
    });
  }
});

module.exports = router;