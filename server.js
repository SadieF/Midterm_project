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
var api_key = 'key-53af461a44e0d2292e1def1205f95c8a';
var DOMAIN = 'sandbox776e0d067094447ca8a251aff144199a.mailgun.org';
var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: DOMAIN
});

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

// Create a poll page
app.get("/", (req, res) => {
  res.render("index");
});

// Home page
app.get('/wtf', (req, res) => {
  res.render("wtf");
})

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
  console.log('REQ PARAMS', req.params);
  console.log('REQ BODY', req.body);
  console.log('REQ HEADER', req.header);
  console.log('REQ Option data', req.body.data[0].option_id)

  const adminInfoPromise = dataHelpers.getEmailByShareUrl(req.body.data[0].option_id);
  adminInfoPromise
    .then(adminInfo => {
      var adminemail = (adminInfo['0'].email);
      var pollname = (adminInfo['0'].name)
      var adminURL = (adminInfo['0'].adminurl_random_key)
      var shareURL = (adminInfo['0'].shareurl_random_key)
      console.log(adminemail, pollname, adminURL, shareURL);
      var data = {
        from: "WTF Decision Maker <wtf@sandbox776e0d067094447ca8a251aff144199a.mailgun.org>",
        to: `${adminemail}`,
        subject: "Way Too Fun! A new vote!",
        text: 'Your poll has a new vote!',
        html: `<html><h1>Your poll has a new vote!</h1><h2>${pollname}</h2>
      <p>What's That Feeling? It's a new vote!</p>
      <p>To view your poll and see how people are voting, <a href="http://127.0.0.1:8080/${adminURL}" target="_blank">click here</a>.</p>
      <p>To share your poll with friends, copy and paste the Share Link below.</p>
      <p><b>Share Link: <a href="http://127.0.0.1:8080/vote/${shareURL}" target="_blank">http://127.0.0.1:8080/vote/${shareURL}</a></b></p>
      <p>Thanks for using the Where's The Fun? Decision Maker!</p>
      <p>Sincerely,<br/>Your friends at Party Parrot</p></html>`,
      };

      mailgun.messages().send(data, function(error, body) {
        res.redirect('/thanks')
      });

    })




  function addScore(formArr) {
<<<<<<< HEAD
    let maxScore = formArr.length;
=======
    let maxScore = formArr.length
>>>>>>> feature/routes
    formArr.forEach(function(item) {
      item.score = maxScore;
      maxScore--;
    })
    return formArr;
  }

  const addedScore = addScore(req.body.data)

  function insertDataIntoVotesDatabase(formArr) {
    knex('votes')
      .insert(formArr.map(formArr => ({
        option_id: formArr.option_id,
        score: formArr.score
      })))
      .then((votes) => {
        console.log('Here are my votes:', votes);
      })
      .catch((err) => {
        console.log("THERE IS AN ERROR", err);
      });
  }
  insertDataIntoVotesDatabase(req.body.data);
  // res.redirect('/thanks')

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
