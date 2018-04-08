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

const dataHelpers = require('./data-helpers')(knex);

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

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

//Thanks page
app.get('/thanks', (req, res) => {
  res.render("thanks");
})

// For the admin
app.get('/:id', (req, res) => {
  const pollAndScoresPromise = dataHelpers.getPollWithOptionsAndScoresByAdminURL(req.params.id)
  pollAndScoresPromise
    .then(poll => {
      res.render("admin", { poll });
    });
});


// Shared Voting Page
app.get('/vote/:id', (req, res) => {
  const pollWithOptionsPromise = dataHelpers.getPollWithOptionsByShareUrl(req.params.id)
  pollWithOptionsPromise
    .then(poll => {
      if (req.params.id != poll.shareurl_random_key) {
        res.render("404");
      } else {
        res.render("vote", { poll });
      }
    });
  //console.log('REQ.PARAMS.ID:', req.params.id);
});

// POST: shareable link
app.post('/vote/:id', (req, res) => {

  function addScore(formArr) {
    let maxScore = 5
    formArr.forEach(function(item) {
      item.score = maxScore;
      maxScore--;
    })
    return formArr;
  }

  const addedScore = addScore(req.body.data)

  function insertDataIntoVotesDatabase(formArr) {
    knex('votes')
    .insert(formArr.map(formArr =>({
        option_id: formArr.option_id,
        score: formArr.score
      }))
    )
    .then((votes) => {
      console.log('Here are my votes:', votes);
    })
    .catch((err) => {
      console.log("THERE IS AN ERROR", err);
    });
  }

  insertDataIntoVotesDatabase(req.body.data);
  res.redirect('/thanks')
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
