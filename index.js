require('dotenv').config();
const app = require('./app');

const movieRoute = require('./routes/movie');
const theatreRoute = require('./routes/theater');

const PORT = process.env.PORT || 8000;

app.use('/movies', movieRoute);
app.use('/theaters', theatreRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});

console.log('coucou');
