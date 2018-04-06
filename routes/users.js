"use strict";
console.log('I GOT HERE 0');

const express = require('express');
const router = express.Router();

// Creates a random alphanumeric string
function generateRandomString() {
  return Math.random().toString(36).substr(2, 10);
}


module.exports = (knex) => {
  console.log('I GOT HERE 1');

  // let templateVars = {
  //   email: req.body.email,
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  //   title: req.body.title,
  //   option_1: req.body.option_1,
  //   option_1_desc: req.body.option_1_desc,
  //   option_2: req.body.option_2,
  //   option_2_desc: req.body.option_2_desc,
  //   option_3: req.body.option_3,
  //   option_3_desc: req.body.option_3_desc,
  //   option_4: req.body.option_4,
  //   option_4_desc: req.body.option_4_desc,
  //   option_5: req.body.option_5,
  //   option_5_desc: req.body.option_1_desc
  // };

  let templateVars = {
    email: 'a@a',
    firstname: 'Anhad',
    lastname: 'Gill',
    title: 'Sports',
    option_1: 'Soccer',
    option_1_desc: 'It\'s a game played with a feet and a ball',
    option_2: 'Cricket',
    option_2_desc: 'It\'s a game played with a bat and a ball',
    option_3: req.body.option_3,
    option_3_desc: req.body.option_3_desc,
    option_4: req.body.option_4,
    option_4_desc: req.body.option_4_desc,
    option_5: req.body.option_5,
    option_5_desc: req.body.option_1_desc
  };

  // insert using promises
  function insertData(tempObject) {
    const adminRandomKey = generateRandomString();
    const shareRandomKey = generateRandomString();

    const insertInfoPromise = knex(nameOfTable).insert([{email:templateVars.email}, {firstname: templateVars.firstName}, {lastname: templateVars.lastName}]);

    const insertDataPromise = insertInfoPromise
      .then(function (rows) {
        var adminKey = rows[0]
        console.log(adminKey);
        return adminKey;
      })
      .then((adminKey) => {
        console.log('Here are my admins:', AdminKey);
      })
      // .then(() => {
      //   return knex('polls').insert([{adminurl_random_key: adminRandomKey}, {shareurl_random_key: shareRandomKey}, {name: templateVars.title}])})
      // .then((poll_id) => {
      //   knex('options').insert([{option: templateVars.option_1}, {option_1_desc: templateVars.option_1_desc}, {order: 1}])
      //   knex('options').insert([{option: templateVars.option_2}, {option_2_desc: templateVars.option_2_desc}, {order: 2}])
      //   knex('options').insert([{option: templateVars.option_3}, {option_3_desc: templateVars.option_3_desc}, {order: 3}])
      //   knex('options').insert([{option: templateVars.option_4}, {option_4_desc: templateVars.option_4_desc}, {order: 4}])
      //   knex('options').insert([{option: templateVars.option_5}, {option_5_desc: templateVars.option_5_desc}, {order: 5}])
      //   return poll_id;
      // })
      .catch((err) => {
        console.log("err", err);
      })
      console.log('I GOT HERE');
    return insertDataPromise;
  }
  
  router.get("/", (req, res) => {
    knex
    .select("*")
    .from("users")
    .then((results) => {
      res.json(results);
    });
  });
  
  router.post('/', (req, res) => {
    res.redirect('/thankyou')
  })
  
  return router;
}

insertData(templateVars);