
var express = require('express');
var router = express.Router();



var request = require('request');

var myJSONObject = {
  'email': "angelfemme@gmail.com",
  'password':"password",
  'admin':true

 };
request({
    url: "http://angelthom.ddns.net/api/authenticate",
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    console.log(response);
});

module.exports = router;
