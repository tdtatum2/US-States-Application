// IMPORT SECTION
const States = require("../model/States");

const fs = require("fs");



// Get All States
const getStates = async (req, res) => {
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        const statesList = JSON.parse(data);
        const states = []
        for(let i = 0; i < statesList.length; i++) {
            states[i] = statesList[i].state;
        }
        if(!states) {
            return res.status(400).json({ message: "No states found." });
        }
        return states;
    });
}


// Get Specific State
const getState = async (req, res) => {
    if(!req.body?.state) {
        return res.status(400).json({ message: "State Name is required." });
    }
}




// EXPORT SECTION
module.exports = getStates;