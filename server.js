// IMPORT SECTION
// Dotenv Import
require("dotenv").config();

// Express Imports
const express = require("express");
const app = express();

// Cors Imports
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

// Path Import
const path = require("path");

// FS Import
const fs = require("fs");

// Middleware Imports
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

// Mongoose (MongoDB) Import
const mongoose = require("mongoose");

// Database Connection
const connectDB = require("./config/connectDB");

// Partials Directory
const hbs = require("hbs");

// Port Declaration
const PORT = process.env.PORT || 3000;

const getStates = require('./controllers/statesController');


// DATABASE SECTION
// Connecting to MongoDB
connectDB();





// MIDDLEWARE SECTION
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// STATIC FILE HANDLER
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);



// ALL ROUTES
app.use("/", require("./routes/root"));

fs.readFile('./model/states.json', 'utf8', function(err, data) {
  if (err) {
      console.log(err);
  } else {
      const states = JSON.parse(data);
      const statesList = Object.assign({}, states);
  }
});


// 404 ROUTES
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 not found" });
    } else {
      res.type("txt").send("404 not found");
    }
});




// USE ERROR HANDLER
app.use(errorHandler)



mongoose.connection.once("open", () => {
    console.log("Connected to Mongo DB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});

