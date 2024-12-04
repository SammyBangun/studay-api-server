const axios = require("axios");
const admin = require("firebase-admin");

// Custom token Anda
const customToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTczMzI4MjI2MCwiZXhwIjoxNzMzMjg1ODYwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay01ZnV0Y0BzdHVkYXktZGVmYTYuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay01ZnV0Y0BzdHVkYXktZGVmYTYuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiJPSnY1VG5hTnNqU2c4WUdoc3JhRjQ4TW1iSUIyIn0.N2wGMq0SD433l9bIWFFxQvszbZlLPLCawVi6R_IFx_XrmcdNewUs12emX66Cr8R3gk0POdF3zDOjKj9OcSOuAtjR5STqB0Ik5wvxDBEUiLOTyGdj3EQMeQX2uSiVva8vnkJMLQpZ51YDu4EcESYbaanqPBNW3gRThcE-2CQmeUatSl_5zo2Z-zNJhc66uDTmh9GuVAoeoczWvVbLtLWRqS9ZRGmK1IbNc7KagJJBmVXWnKiTyj8Z5EMFnozBNHot3MRi4ifkuU85O7iabOSRf1Q2RKEzx9LTO85DwuprhaajoL7I1wsKe9nOWfcXdwYgHN9Tkt4-UpSRiXsTm2XmXw";

// API Key Firebase Anda
const API_KEY = "AIzaSyB0EYua-QOFSVbb1SJlWSxeHnYCHWQvLEU"; // Ganti dengan API Key proyek Anda

const exchangeToken = async () => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`,
      {
        token: customToken,
        returnSecureToken: true,
      }
    );

    const idToken = response.data.idToken;
    console.log("ID Token:", idToken);

    // Verifikasi ID token yang diterima
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded Token:", decodedToken);
  } catch (error) {
    console.error(
      "Error exchanging custom token:",
      error.response?.data || error.message
    );
  }
};

exchangeToken();
