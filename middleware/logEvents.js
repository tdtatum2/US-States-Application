// NPM MODULES
const { format } = require("date-fns");
const { v4:uuid } = require("uuid");


// CORE MODULES
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");


// LOG EVENTS SECTION
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime} \t ${uuid()} \t ${message}`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        } 
        await fsPromises.appendFile(
            path.join(__dirname, "..", "logs", logName),
            logItem
        );
    } catch (err) {
        console.log(err);
    }
};




// LOGGER SECTION
const logger = (req, res, next) => {
    logEvents(
        `${req.method} \t ${req.headers.origin} \t ${req.url}\n`,
        "reqLog.txt"
    );
    console.log(`${req.method} \t ${req.path}`);
    next();
};





// EXPORT SECTION
module.exports = { logger, logEvents };