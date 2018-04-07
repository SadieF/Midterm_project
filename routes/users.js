"use strict";

const express = require('express');
const router = express.Router();

var api_key = 'key-53af461a44e0d2292e1def1205f95c8a';
var DOMAIN = 'sandbox776e0d067094447ca8a251aff144199a.mailgun.org';
var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: DOMAIN
});

// Creates a random alphanumeric string
function generateRandomString() {
  return Math.random().toString(36).substr(2, 10);
}


module.exports = (knex) => {

  //POST - route that adds form data to the database and redirects to the thank you page
  router.post('/', (req, res) => {
    // Data received from the form
    let templateVars = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      title: req.body.title,
      option_1: req.body.option_1,
      option_1_desc: req.body.option_1_desc,
      option_2: req.body.option_2,
      option_2_desc: req.body.option_2_desc,
      option_3: req.body.option_3,
      option_3_desc: req.body.option_3_desc,
      option_4: req.body.option_4,
      option_4_desc: req.body.option_4_desc,
      option_5: req.body.option_5,
      option_5_desc: req.body.option_5_desc
    };

    function insertData(tempObject) {
      const adminRandomKey = generateRandomString();
      const shareRandomKey = generateRandomString();

      knex('admin')
        .insert({
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        })
        .returning('id')
        .then((id) => {
          console.log('Here are my id for admins:', id);
          // We only want the first result
          id = id[0];
          return knex('polls')
            .insert({
              admin_id: id,
              adminurl_random_key: adminRandomKey,
              shareurl_random_key: shareRandomKey,
              name: req.body.title
            })
            .returning('id')
        })
        .then((id) => Number(id[0]))
        .then((id) => {
          console.log('Here are my poll_id:', id);
          return (knex('options')
            .insert([
              ({
                polls_id: id,
                option: templateVars.option_1,
                option_desc: templateVars.option_1_desc,
                "order": 1
              }),
              ({
                polls_id: id,
                option: templateVars.option_2,
                option_desc: templateVars.option_2_desc,
                "order": 2
              }),
              ({
                polls_id: id,
                option: templateVars.option_3,
                option_desc: templateVars.option_3_desc,
                "order": 3
              }),
              ({
                polls_id: id,
                option: templateVars.option_4,
                option_desc: templateVars.option_4_desc,
                "order": 4
              }),
              ({
                polls_id: id,
                option: templateVars.option_5,
                option_desc: templateVars.option_5_desc,
                "order": 5
              })
            ])
          )
        })
        .catch((err) => {
          console.log("err", err);
        })

      // Mailbox data
      var pollname = templateVars.title;
      var adminURL = adminRandomKey;
      var shareURL = shareRandomKey;
      var data = {
        from: "Where's The Fun? <wtf@sandbox776e0d067094447ca8a251aff144199a.mailgun.org>",
        to: `${templateVars.email}`,
        subject: "Well That's Fabulous! Your poll has been created!",
        text: 'Testing some Mailgun awesomness!',
        html: `<html><h1>${pollname}</h1><p>You've created a new poll!</p>
          <p>To look at your poll and see how people are voting, <a href="${adminURL}" target="_blank">click here</a>.</p>
          <p>To share your poll with friends, copy and paste this link to emails, social media, a billboard, etc.</p>
          <p>Share link: <a href="${shareURL}" target="_blank">${shareURL}</a></p></html>`,
      };

      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });

    }

    insertData(templateVars);
    res.redirect('/poll/thanks')
  })

  router.get('/thanks', (req, res) => {
    res.render('thanks')
  })

  return router;
}
