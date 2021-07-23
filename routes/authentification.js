const express = require('express');

const router = express.Router();
const pool = require('../dbconfig');

router.post('/signup', (request, response) => {
  const { pseudo, password } = request.body;
  if (!pseudo || !password) {
    response.status(403).send('Pseudo or password missing');
  } else {
    pool.query(
      'INSERT INTO user (pseudo, password) VALUES (?,?)',
      [pseudo, password],
      (error, results) => {
        console.log(error, results);
      }
    );
  }
  response.sendStatus(200);
});

router.get('/signin', function (request, response) {
  pool.query('SELECT * from user;', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

module.exports = router;
