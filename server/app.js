const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//imported routes for the server
const route = require('./routes')

const app = express();

//get the database url
const dbCredentials = process.env.dbCreds;

//connect to the database
mongoose.connect(dbCredentials, {useNewUrlParser : true,useUnifiedTopology : true})
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch(() => {
        console.log("Failed to Connect to the Database");
    })

//to have the app use json files parse JSON objects where the content header = type option
app.use(bodyParser.json());
//parse the url for the objects in the key-value pairs
app.use(bodyParser.urlencoded({extended : false}));

//using the cors object from express
app.use(cors());

//ROUTES
app.use('/routename', route);

module.exports = app;