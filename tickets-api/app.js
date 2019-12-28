const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();

//I added this////////
const methodOverride = require('method-override')
const path = require('path');
const ticketsRouter = require('./routes/api/v1/tickets');
const indexRouter = require('./routes/index');
const cookieParser = require('cookie-parser');
app.use(methodOverride('_method'));
/////////////////////////////
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors()); // Enable All CORS Requests
app.use(express.urlencoded({ extended: true }));

//
// Prepend ticketsRouter to /api/v1/tickets
//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);
app.use('/api/v1/tickets', ticketsRouter);

//
// declare store credentials. You will use your database id and password as you
// work on this project. Make those empty strings when you submit.
//
const dbuser = ""
const dbpass = ""

//
// declare mongoDB variable to the URI for your own database as you work on this
// project. Make the URI an empty string when you submit.
//
const mongoUri ="";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//
// connect to the mongo database using mongoUri
//
mongoose.connect(mongoUri)
    .then(() => console.log("connected"))
    .catch(() => {
        console.log("error in connection");
        mongoose.connection.close();
    });

app.listen(4000, () => {
    console.log(`Example express app listening on port 4000!`);
});


module.exports = app;
