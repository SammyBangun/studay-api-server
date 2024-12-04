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

// POST - Menambahkan formula aljabar baru
router.post("/aljabar", (req, res) => {
  const { formula, description } = req.body;
  const newFormula = { id: aljabarData.length + 1, formula, description };
  aljabarData.push(newFormula);
  res.status(201).json(newFormula);
});

// PUT - Mengupdate formula aljabar berdasarkan ID
router.put("/aljabar/:id", (req, res) => {
  const { id } = req.params;
  const { formula, description } = req.body;

  let formulaIndex = aljabarData.findIndex((item) => item.id == id);

  if (formulaIndex !== -1) {
    aljabarData[formulaIndex] = { id: parseInt(id), formula, description };
    res.json(aljabarData[formulaIndex]);
  } else {
    res.status(404).json({ message: "Formula not found" });
  }
});

// DELETE - Menghapus formula aljabar berdasarkan ID
router.delete("/aljabar/:id", (req, res) => {
  const { id } = req.params;
  const formulaIndex = aljabarData.findIndex((item) => item.id == id);

  if (formulaIndex !== -1) {
    const deletedFormula = aljabarData.splice(formulaIndex, 1);
    res.json(deletedFormula);
  } else {
    res.status(404).json({ message: "Formula not found" });
  }
});

module.exports = router;
