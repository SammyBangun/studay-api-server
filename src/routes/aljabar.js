/**
 * @swagger
 * tags:
 *   name: Aljabar
 *   description: Matematika Dasar
 *
 * /studay/angka:
 *   get:
 *     summary: Menampilkan semua formula angka
 *     tags: [Aljabar]
 *     responses:
 *       200:
 *         description: Menampilkan semua formula angka
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aljabar'
 *
 * /studay/penjumlahan:
 *   get:
 *     summary: Menampilkan formula penjumlahan
 *     tags: [Aljabar]
 *     parameters:
 *       - in: query
 *         name: formula
 *         required: true
 *         schema:
 *           type: string
 *         description: Formula penjumlahan
 *     responses:
 *       200:
 *         description: Menampilkan formula penjumlahan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aljabar'
 *
 * /studay/pengurangan:
 *   get:
 *     summary: Menampilkan formula pengurangan
 *     tags: [Aljabar]
 *     parameters:
 *       - in: query
 *         name: formula
 *         required: true
 *         schema:
 *           type: string
 *         description: Formula pengurangan
 *     responses:
 *       200:
 *         description: Menampilkan formula pengurangan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aljabar'
 *
 * components:
 *   schemas:
 *     Aljabar:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID formula aljabar
 *         formula:
 *           type: string
 *           description: Formula aljabar
 *         description:
 *           type: string
 *           description: Deskripsi formula aljabar
 *
 */

const express = require("express");
const router = express.Router();

// Data dummy untuk test aljabar
let aljabarData = [
  { id: 1, formula: "1,2,3", description: "Angka" },
  { id: 2, formula: "1 + 2", description: "Penjumlahan Dasar" },
  { id: 3, formula: "1 - 2", description: "Pengurangan Dasar" },
];

// GET - Menampilkan semua formula aljabar
router.get("/aljabar", (req, res) => {
  res.json(aljabarData);
});

// GET - Endpoint untuk angka (1-9)
router.get("/angka", (req, res) => {
  const angka = Array.from({ length: 9 }, (_, i) => i + 1);
  res.json(angka);
});

// GET - Penjumlahan dua angka
router.get("/penjumlahan", (req, res) => {
  const { angka1, angka2 } = req.query;

  // Validasi input
  if (!angka1 || !angka2 || isNaN(angka1) || isNaN(angka2)) {
    return res
      .status(400)
      .json({ message: "Masukkan angka1 dan angka2 yang valid" });
  }

  const hasil = parseInt(angka1) + parseInt(angka2);
  res.json({ angka1: parseInt(angka1), angka2: parseInt(angka2), hasil });
});

// GET - Pengurangan dua angka
router.get("/pengurangan", (req, res) => {
  const { angka1, angka2 } = req.query;

  // Validasi input
  if (!angka1 || !angka2 || isNaN(angka1) || isNaN(angka2)) {
    return res
      .status(400)
      .json({ message: "Masukkan angka1 dan angka2 yang valid" });
  }

  const hasil = parseInt(angka1) - parseInt(angka2);
  res.json({ angka1: parseInt(angka1), angka2: parseInt(angka2), hasil });
});

module.exports = router;
