const express = require("express");
const router = express.Router();

// Data dummy untuk test bahasa
let dataBahasa = [
  { id: 1, activity: "Mengenal huruf A-Z", type: "Bahasa" },
  { id: 2, activity: "Suku Kata", type: "Bahasa" },
  { id: 3, activity: "Kata Random", type: "Bahasa" },
];

// GET - Menampilkan semua aktivitas yang ada
router.get("/bahasa", (req, res) => {
  res.json(dataBahasa);
});

// POST - Menambahkan aktivitas baru
router.post("/bahasa", (req, res) => {
  const { activity, type } = req.body;
  const newActivity = { id: dataBahasa.length + 1, activity, type };
  dataBahasa.push(newActivity);
  res.status(201).json(newActivity);
});

// PUT - Mengupdate aktivitas berdasarkan ID
router.put("/bahasa/:id", (req, res) => {
  const { id } = req.params;
  const { activity, type } = req.body;

  let activityIndex = dataBahasa.findIndex((item) => item.id == id);

  if (activityIndex !== -1) {
    dataBahasa[activityIndex] = { id, activity, type };
    res.json(dataBahasa[activityIndex]);
  } else {
    res.status(404).json({ message: "Activity not found" });
  }
});

// DELETE - Menghapus aktivitas berdasarkan ID
router.delete("/bahasa/:id", (req, res) => {
  const { id } = req.params;
  const activityIndex = dataBahasa.findIndex((item) => item.id == id);

  if (activityIndex !== -1) {
    const deletedActivity = dataBahasa.splice(activityIndex, 1);
    res.json(deletedActivity);
  } else {
    res.status(404).json({ message: "Activity not found" });
  }
});

module.exports = router;
