// IMPORT SECTION
const { logEvents } = require("./logEvents");



// ERROR HANDLER SECTION
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, "errorLog.txt");
    console.log(err.stack);
    res.status(500).send(err.message);
};



// EXPORT SECTION
module.exports = errorHandler;