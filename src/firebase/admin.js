const admin = require("firebase-admin");
const fs = require("fs");
require("dotenv").config();

const firebaseAdminKey = process.env.FIREBASE_JSON_PATH;
const serviceAccount = JSON.parse(fs.readFileSync(firebaseAdminKey, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
