const admin = require("firebase-admin");

const authenticateFirebase = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer"

  try {
    // Verifikasi token untuk mendapatkan UID
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next(); // Lanjutkan ke handler berikutnya
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token",
      error: error.message || error,
    });
  }
};

module.exports = authenticateFirebase;
