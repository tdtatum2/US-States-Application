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
    const code = req.params.state;
    const check = (check) => check == code;
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        const statesList = JSON.parse(data);
        const codes = []
        for(var key in statesList) {
            if (statesList.hasOwnProperty(key)) {
                codes.push(statesList[key].code);
            }
        }
        if (codes.findIndex(check) > -1) {
            const state = statesList[codes.findIndex(check)];
            console.log(state);
            return res.render('state', state);
        } else {
            return res.render('no_state');
        }
    })
}




// EXPORT SECTION
module.exports = {
    getStates,
    getState
};