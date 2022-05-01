// IMPORT SECTION
const express = require("express");
const router = express();
const statesController = require("../../controllers/statesController");



// ROUTER
router
    .route('/')
    .get(statesController.getStates)

router.route("/:state").get(statesController.getState);

module.exports = router;