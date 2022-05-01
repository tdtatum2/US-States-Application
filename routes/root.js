const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");



router.get("^/$|/index(.html)?", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "views", "index.html"));
    fs.readFile('./model/states.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            const states = JSON.parse(data);
            const statesList = Object.assign({}, states);
            res.render('index', {statesList});
        }
    });
});


module.exports = router;
