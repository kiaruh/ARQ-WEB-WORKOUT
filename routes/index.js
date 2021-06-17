const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Base route");
})

module.exports = router;
