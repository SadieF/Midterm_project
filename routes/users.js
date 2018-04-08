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
          return id;
        })
        .then((id) => Number(id[0]))
        .then((id) => {
          console.log('Here are my poll_id:', id);
          return (knex('options')
            .insert([
              ({
                poll_id: id,
                option: templateVars.option_1,
                option_desc: templateVars.option_1_desc,
                "order": 1
              }),
              ({
                poll_id: id,
                option: templateVars.option_2,
                option_desc: templateVars.option_2_desc,
                "order": 2
              }),
              ({
                poll_id: id,
                option: templateVars.option_3,
                option_desc: templateVars.option_3_desc,
                "order": 3
              }),
              ({
                poll_id: id,
                option: templateVars.option_4,
                option_desc: templateVars.option_4_desc,
                "order": 4
              }),
              ({
                poll_id: id,
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

      // Mailgun email for new poll creation
      var pollname = templateVars.title;
      var adminURL = adminRandomKey;
      var shareURL = shareRandomKey;
      var data = {
        from: "WTF Decision Maker <wtf@sandbox776e0d067094447ca8a251aff144199a.mailgun.org>",
        to: `${templateVars.email}`,
        subject: "Well That's Fabulous! Your poll has been created!",
        text: 'Your poll has been created!',
        html: `<html><h1>You've created a new poll!</h1><h2>${pollname}</h2>
          <p>Congratulations ${req.body.firstname}! Your new poll has been created and is ready for voting!</p>
          <p>To view your poll, <a href="http://127.0.0.1:8080/${adminURL}" target="_blank">click here</a>.</p>
          <p>To share your poll with friends, copy and paste the Share Link below to emails, social media, a billboard, etc.</p>
          <p><b>Share Link: <a href="http://127.0.0.1:8080/vote/${shareURL}" target="_blank">http://127.0.0.1:8080/vote/${shareURL}</a></b></p>
          <p>Thanks for using the Where's The Fun? Decision Maker!</p>
          <p>Sincerely,<br/>Your friends at Party Parrot</p></html>`,
      };

      mailgun.messages().send(data, function(error, body) {
        res.redirect('/' + adminURL)
        console.log(body);
      });

    }
    insertData(templateVars);

  })


  return router;
}
