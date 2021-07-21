const express = require('express');

const router = express.Router();
const pool = require('../dbconfig');

router.get('/', (request, response) => {
  pool.query('SELECT * FROM movie', (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(result);
    }
  });
});

module.exports = router;
