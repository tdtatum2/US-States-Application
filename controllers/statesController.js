// IMPORT SECTION
const statesDB = require("../model/States");

const fs = require("fs");



// Get All States
const getStates = async (req, res) => {
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        var statesList = JSON.parse(data);
        if(req.query.contig == 'true') {
            var contigs = [];
            for(var key in statesList) {
                if (statesList[key].code != 'AK' && statesList[key].code != 'HI') {
                    contigs.push(statesList[key]);
                }
            }
            statesList = contigs;
        } else if (req.query.contig == 'false') {
            var noncontigs = [];
            for(var key in statesList) {
                if (statesList[key].code == 'AK' || statesList[key].code == 'HI') {
                    noncontigs.push(statesList[key]);
                }
            }
            statesList = noncontigs;
        }
        return res.render('index', {statesList});
    });
}


// Get Specific State
const getState = async (req, res) => {
    const funFacts = await statesDB.find({});
    const code = (req.params.state).toUpperCase();
    const check = (check) => check == code;
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        const statesList = JSON.parse(data);
        const codes = [];
        for(var key in statesList) {
            if (statesList.hasOwnProperty(key)) {
                codes.push(statesList[key].code);
            }
        }
        if (codes.findIndex(check) > -1) {
            const state = statesList[codes.findIndex(check)];
            if( typeof funFacts !== 'undefined') {
                for (var key in funFacts) {
                    if (state.code == funFacts[key].stateCode) {
                        state.funFacts = funFacts[key];
                    }
                }
            }
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