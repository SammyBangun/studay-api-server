/**
 * @swagger
 * tags:
 *   name: Cerita
 *   description: Kumpulan cerita pendek
 *
 * /cerita:
 *   get:
 *     summary: Menampilkan semua cerita
 *     tags: [Cerita]
 *     responses:
 *       200:
 *         description: Menampilkan semua cerita
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cerita'
 *
 * components:
 *   schemas:
 *     Cerita:
 *   type: object
 *   properties:
 *     title:
 *       type: string
 *       description: Judul cerita
 *     content:
 *       type: string
 *       description: Konten cerita
 *     image:
 *       type: string
 *       description: Gambar cerita
 */

const express = require("express");
const router = express.Router();

const stories = require("../res/resCerita");

// Daftar cerita
router.get("/cerita", (req, res) => {
  res.status(200).json({ stories });
});

module.exports = router;
