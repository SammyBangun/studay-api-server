// routes/api.js
const express = require("express");
const router = express.Router();

// Data dummy untuk test
let calistungData = [
  { id: 1, activity: "Menghitung angka 1-10", type: "Matematika" },
  { id: 2, activity: "Mengenal huruf A-Z", type: "Bahasa" },
  { id: 3, activity: "Menulis angka 1-10", type: "Matematika" },
];

// GET - Menampilkan semua aktivitas yang ada
router.get("/calistung", (req, res) => {
  res.json(calistungData);
});

// POST - Menambahkan aktivitas baru
router.post("/calistung", (req, res) => {
  const { activity, type } = req.body;
  const newActivity = { id: calistungData.length + 1, activity, type };
  calistungData.push(newActivity);
  res.status(201).json(newActivity);
});

// PUT - Mengupdate aktivitas berdasarkan ID
router.put("/calistung/:id", (req, res) => {
  const { id } = req.params;
  const { activity, type } = req.body;

  let activityIndex = calistungData.findIndex((item) => item.id == id);

  if (activityIndex !== -1) {
    calistungData[activityIndex] = { id, activity, type };
    res.json(calistungData[activityIndex]);
  } else {
    res.status(404).json({ message: "Activity not found" });
  }
});

// DELETE - Menghapus aktivitas berdasarkan ID
router.delete("/calistung/:id", (req, res) => {
  const { id } = req.params;
  const activityIndex = calistungData.findIndex((item) => item.id == id);

  if (activityIndex !== -1) {
    const deletedActivity = calistungData.splice(activityIndex, 1);
    res.json(deletedActivity);
  } else {
    res.status(404).json({ message: "Activity not found" });
  }
});

module.exports = router;
