var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash"); // passing message
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var config = require("./config/database.js"); // khai bao databse
var app = express();

// connect mongodb
mongoose.connect(config.url);




// midderWare
  // . setting body-parser
  var urlencodeParser = bodyparser.urlencoded({extended:true});
  app.use(urlencodeParser);
  // . setting public include: css, font, js
  app.use(express.static(__dirname + "/public"));
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(session({secret: "sdabsdgag123g1hghgsdhjgasdg21g3jhg12hj3g"}));
  app.use(passport.initialize()); // khi su dung passport bat buoc phai co 2 cai nay
  app.use(passport.session());
  app.use(flash());

// . setting Template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// setup passport
require("./config/passport.js")(passport);

// check login
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}



// Home Page
app.get("/", function (req, res) {
  res.render("Home");
});

// About Page
app.get("/About", function (req, res) {
  res.render("About");
});



// Blogs Page
app.get("/Blogs", function (req, res) {
  res.render("Blog");
});






// Albums Page
app.get("/Albums", function (req, res) {
  res.render("Albums");
});
  // Sub-Album (chua the xu ly duoc de sau vay)
  app.get("/Albums/:id" , function (req, res) {
    // chuyen vao 1 cai id de no co the vong lap tao ra
    res.render("SubAlbum");
  });




// Register Page
app.get("/register", function (req, res) {
  //res.render("RegisterPage");
  res.render('RegisterPage', { message: req.flash('signupMessage') });
});
app.post("/register", passport.authenticate("register", {
  successRedirect : '/profile', // chuyen huong qua trang home hay trang profile
  failureRedirect : '/register',
  failureFlash : true // allow flash messages
}));

// login page
app.get("/login", function (req, res) {
  res.render("register");
});
app.post("/login", function (req, res) {
  // process login ...
});

// profile Page
app.get("/profile",isLoggedIn, function (req, res) {
  res.render("profile", {
      user : req.user // get the user out of session and pass to template
  });
});
// Log Out



app.listen(8080, function() {
 console.log("Server is connecting in Port: 8080");
});
