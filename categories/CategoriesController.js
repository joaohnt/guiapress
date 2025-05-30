const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("Categories List");
});

router.get("/admin/categories/new", (req, res) => {
  res.send("Create New Category");
});

module.exports = router;
