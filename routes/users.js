"use strict";

const express = require('express');
const router  = express.Router();
const pg = require("pg");

require('dotenv').config();

db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  db: process.env.DB_NAME,
  ssl: process.env.DB_SSL,
  port: process.env.DB_PORT
});

module.exports = (knex) => {
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
    option_5_desc: req.body.option_1_desc
  };

  // function insertBio (tempObject) {
  //   knex('admins').insert(templateVars.email, templateVars.firstName, templateVars.lastName)
  //     asCallback ((err, results) => {
  //       if (err) {
  //         console.log("Error from insert", err);
  //       }
  //       knex.select('*').from('admins').asCallback((error, rows) => {
  //         if (error) {
  //           console.log('Error from select', error);
  //         }
  //         console.log('rows: ', rows);
  //       })
  //     })
  // };

  // Creates a random alphanumeric string
function generateRandomString() {
  return Math.random().toString(36).substr(2, 10);
}

  // insert using promises
  function insertData(tempObject) {
    const adminRandomKey = generateRandomString();
    const shareRandomKey = generateRandomString();


    const insertBioPromise = knex('admins')
    .insert(templateVars.email, templateVars.firstName, templateVars.lastName);

    const insertedBioPromise = insertBioPromise
    .then((admin) => {
      console.log('Here are my admins:', things);
    })

    const insertPollsPromise = knex('polls')
    .insert(adminURL_random_key, shareURL_random_key, name)




    // .catch((err) => {
    //   console.log('Err', err);
    // });
  }


  function insertData (tempObject) {
    //use today's lecture to add stuff
  }

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post('/', (res, req) => {
    /*
    Logic:
    1. takes the data(first_name, last_name, email) in req.body
        - 
    2. adds it to the database
    3. redirects to thank you page
    */
  })

  return router;
}
