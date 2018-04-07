"use strict";
console.log('I GOT HERE 0');

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
    router.post('/', (req, res) => {
        res.redirect('/thankyou')
      })
}
