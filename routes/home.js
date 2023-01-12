const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", async (req, res) => {
  // "../" to go back in dir
  const htmlPath = path.join(__dirname, "../", "public", "index.html");
  res.sendFile(htmlPath);
});

module.exports = router;
