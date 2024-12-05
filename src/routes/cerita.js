const express = require("express");
const router = express.Router();

const stories = require("../res/resCerita");

// Daftar cerita
router.get("/cerita", (req, res) => {
  res.status(200).json({ stories });
});

// Tambahkan cerita baru
router.post("/cerita", (req, res) => {
  const { title, content, image } = req.body;
  if (!title || !content || !image) {
    return res.status(400).json({ message: "Field tidak boleh kosong" });
  }

  const newStory = { title, content, image };
  stories.push(newStory);
  res
    .status(201)
    .json({ message: "Cerita berhasil ditambahkan", story: newStory });
});

module.exports = router;
