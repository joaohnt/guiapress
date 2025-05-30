const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
  res.send("articles List");
});

router.get("/admin/articles/new", (req, res) => {
  res.send("Create New article");
});

module.exports = router;
