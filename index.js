require('dotenv').config();
const app = require('./app');

const movieRoute = require('./routes/movie');
const theaterRoute = require('./routes/theater');
const genreRoute = require('./routes/genre');

const PORT = process.env.PORT || 8000;

app.use('/movies', movieRoute);
app.use('/theaters', theaterRoute);
app.use('/genres', genreRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});
