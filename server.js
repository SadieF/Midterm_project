"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/poll", usersRoutes(knex));
console.log('I GOT HERE -1');

// Home page
app.get("/", (req, res) => {
  console.log('WE ARE IN HOME PAGE');
  res.render("index");
});

app.get('/vote/:poll_id', (req, res) => {
  // query
  const { poll_id } = req.params;

  knex('polls').find(poll_id).select().then(poll => {
    res.render("vote", {
      poll: {
        title: "Hello",
        options: [{
          title: 'Option 1',
          description: 'Option 1 Description'
        }, ]
      }
    })
  });
});

app.get('/results/:admin_id', (req, res) => {
  // query
  const { poll_id } = req.params;

  knex('polls').find(poll_id).select().then(poll => {
    res.render("vote", {
      poll: {
        title: "Hello",
        options: [{
          title: 'Option 1',
          description: 'Option 1 Description'
        }, ]
      }
    })
  });
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
