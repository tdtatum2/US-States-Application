const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");



router.get("^/$|/index(.html)?", (req, res) => {
    res.render('home');
});
      


module.exports = router;
