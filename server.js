var express = require("express");
var bodyparser = require("body-parser");
var pg = require("pg");
var app = express();

var fs = require("fs");
// setting a ServerFile Project
  // . setting public include: css, font, js
app.use(express.static(__dirname + "/public"));
  // . setting Template engine
app.set("view engine", "ejs");
app.set("views", "./views");
  // . setting body-parser
var urlencodeParser = bodyparser.urlencoded({extended:false});
  // . setting PostGres
  // comming soon

// Home Page
app.get("/", function (req, res) {

});

// About Page
app.get("/About", function (req, res) {

});

// Blogs Page
app.get("/Blogs", function (req, res) {

});

// Albums Page
app.get("/Albums", function (req, res) {

});
  // Sub-Album

// Register Page
app.get("/register", function (req, res) {
  res.render("register");
});

app.listen(8080, function() {
 console.log("Server is connecting in Port: 8080");
});
