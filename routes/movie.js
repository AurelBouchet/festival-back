const express = require('express');
const multer = require('multer');

const router = express.Router();
const fs = require('fs');
const pool = require('../dbconfig');

const uploadPic = multer({
  limits: { fileSize: Infinity },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('erreur'));
    }
  },
  dest: 'tmp/',
});

router.post('/', uploadPic.single('picture'), (request, response) => {
  const movie = request.body;
  const getPicture = `images/${movie.director}-${Date.now()}`;
  const folder = `public/images/${movie.director}-${Date.now()}/`;
  fs.mkdirSync(folder, { recursive: true });
  const picture = `${getPicture}/${request.file.originalname}`;
  fs.rename(request.file.path, `public/${picture}`, function (err) {
    if (err) {
      response.status(500).send(err);
    } else {
      pool.query(
        `INSERT INTO movie (title, director, genre_id, schedule, theater_id, picture) VALUES (?,?,?,?,?,?)`,
        [
          movie.title,
          movie.director,
          movie.genre_id,
          movie.schedule,
          movie.theater_id,
          picture,
        ],
        (error, results) => {
          if (error) {
            response.status(500).send(error);
          } else {
            response.status(201).send({
              id: results.insertId,
              ...movie,
            });
          }
        }
      );
    }
  });
});

router.get('/', function (request, response) {
  pool.query(
    'SELECT movie.*, genre.name, theater.place FROM movie JOIN genre ON movie.genre_id=genre.id JOIN theater ON movie.theater_id=theater.id;',
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(results);
      }
    }
  );
});

module.exports = router;
