// setup passport module

var LocalStrategy = require("passport-local").Strategy;

// include User setup : noi chung la khai 1 bien User
var user = require("../app/models/user.js");

module.exports = function (passport) {


    // xet' tinh' tuan tu cua 1 user in the session
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
    // loai bo 1 user ra khoi session hien co
    passport.deserializeUser(function (id, done) {
      // cau hoi la id dau ra ma tu nhien co ha do trong mongodb ay no co co che khi add bat cu  1 dong du lieu nao vo thi deu co 1 id duoc phat sinh ra va duoc luu tru kha bao mat
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // feauture register
    passport.use("register", new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, function (req, username, password, done) {
        // xu ly bat dong bo cua nodejs
        process.nextTick(function () {
          user.findOne({'local.username':username}, function (err, preuser) {
              if(err)
                return done(err);
              // neu username da ton tai roi
              if(preuser) {
                return done(null, false, req.flash('signupMessage', "Username is already exist ! Please Again" ));
              }else {


                var nUser = new user();

                nUser.local.username = username;
                nUser.local.password = nUser.generateHash(password);
                nUser.local.email = req.body.email;
                nUser.local.avatar = req.body.picAvartar;


                // save user
                nUser.save(function (err) {
                    if(err)
                      throw err;
                    return done(null, nUser);
                });
              }
          });
        });
    }));
};
