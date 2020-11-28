var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter')
var promoRouter = require('./routes/promoRouter')
var leaderRouter = require('./routes/leaderRouter');
var favoriteRouter = require('./routes/favoritesRouter');
var reservationRouter = require('./routes/reservationRouter')

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mongoose = require('mongoose')



mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
let gfs;
mongoose.connection
  .once("open", () => {

    console.log("connection established:", mongoose.connection.readyState);
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });

  })
  .on("error", (error) => {
    console.log("connection error:", error);
  });



var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);

app.use('/dishes', dishRouter)
app.use('/promotions', promoRouter)
app.use('/leaders', leaderRouter)
// app.use('/imageUpload', uploadRouter)
app.use('/favorites', favoriteRouter);
app.use('/reserve', reservationRouter)

app.get("/images/:filename", (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {

    // if the filename exist in database
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'no files exist'
      });
    }

    // creating stream to read the image which is stored in chunks 
    const readStream = gfs.openDownloadStreamByName(file[0].filename);
    // this is will display the image directly
    readStream.pipe(res);
  })

})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
