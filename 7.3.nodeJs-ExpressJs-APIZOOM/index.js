//include required modules
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');
const axios = require('axios');
//Require view engine ejs
const expressLayouts = require("express-ejs-layouts");

//Require untuk konfigurasi Flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//Require express validator
const { body, validationResult, check } = require("express-validator");

//Require Method override untuk bisa menggunakan method PUT dan DELETE
const methodOverride = require("method-override");

//Require untuk konfigurasi upload fie dengan multer
const multer = require("multer");

//Require untuk encrypt password
const crypto = require("crypto-js");

//Require nodejs module
const pathModule = require("path");
const fs = require("fs");

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//konfigurasi ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
//konfigurasi method override
app.use(methodOverride("_method"));

//konfigurasi flash
app.use(cookieParser("secret"));

//konfigure session
const cookieTime = 1000 * 60 * 15;
app.use(
  session({
    cookie: { maxAge: cookieTime },
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
let sess;
app.use(flash());

var email, userid, resp;

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);
const PORT = 5000;
const HOST_URL = 'http://localhost:5000';

//get the form
app.get("/", (req, res) => res.sendFile("./public/index.html", { root: __dirname }));

//use userinfo from the form and make a post request to /userinfo
app.post('/userinfo', (req, res) => {
  //store the email address of the user in the email variable
    email = req.body.email;
  //check if the email was stored in the console
    console.log(email);
  //Store the options for Zoom API which will be used to make an API call later.
  var options = {
    //You can use a different uri if you're making an API call to a different Zoom endpoint.
    uri: `https://api.zoom.us/v2/users/${email}/meetings`,
    method: "POST",
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    body: {
      topic: "Percobaan",
      type: 2,
      start_time: `2022-02-11T${12 - 7}:00:00Z`,
      duration: 40,
      timezone: "Asia/Jakarta",
      settings: {
        join_before_host: true,
        approval_type: 1,
      },
    },
    json: true, //Parse the JSON string in the response
  };

//Use request-promise module's .then() method to make request calls.
rp(options)
    .then(function (response) {
      //printing the response on the console
        console.log('User has', response);
        //console.log(typeof response);
        resp = response
        //Adding html to the page
        var title1 ='<center><h3>Your token: </h3></center>'
        var result1 = title1 + '<code><pre style="background-color:#aef8f9;">' + token + '</pre></code>';
        var title ='<center><h3>User\'s information:</h3></center>'
        //Prettify the JSON format using pre tag and JSON.stringify
        var result = title + '<code><pre style="background-color:#aef8f9;">'+JSON.stringify(resp, null, 2)+ '</pre></code>'
        res.send(result1 + '<br>' + result);

    })
    .catch(function (err) {
        // API call failed...
        console.log('API call failed, reason ', err);
    });


});

app.get("/zoom-api/:topic/:tanggal/:time", (req, res) => {
  const { topic, tanggal, time } = req.params;
  axios({
    url: `https://api.zoom.us/v2/users/me/meetings`,
    method: "post",
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
    data: {
      topic,
      type: 2,
      start_time: `${tanggal}T${time}`,
      duration: 60,
      timezone: "Asia/Jakarta",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        approval_type: 0,
      },
    },
    responseType: "json",
  })
    .then((resp) => res.send(JSON.stringify(resp.data, null, 2)))
    .catch((err) => res.send(JSON.stringify(err.response.data, null, 2)));
});

app.listen(PORT, () => console.log(`Example app listening on port ${HOST_URL}`));