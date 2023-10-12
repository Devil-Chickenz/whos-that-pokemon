const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const cookieParser = require('cookie-parser');
const cookieController = require('./controllers/cookieController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public/'));
app.use(cookieParser());
const PORT = 3000;

// app.use('/', cookieController.checkSession, (req, res) => {
//   console.log('hi');
//   return res
//     .status(200)
//     .sendFile(path.resolve(__dirname, '../public/index.html'));
// });
//set up the router here for '/
app.use('/pokemon', apiRouter);

// Unknown route handler
// app.use('*', (req, res) => res.status(404));

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//move server start to start.js for testing

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
