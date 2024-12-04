require("dotenv").config();
const { initializeApp } = require("firebase/app");

// Penggunaan env untuk menyimpan konfigurasi Firebase
const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;
