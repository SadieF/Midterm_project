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
