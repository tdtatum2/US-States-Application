// IMPORT SECTION
const express = require("express");
const router = express();
const statesController = require("../../controllers/statesController");



// ROUTER
router
    .route("/")
    .get(statesController.getStates)

router.route("/:state").get(statesController.getState);

router.get("/", (req, res) => {
    console.log(req.query.contig);
})

module.exports = router;