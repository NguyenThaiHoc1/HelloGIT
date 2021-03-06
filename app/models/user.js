// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs'); // dung de ma hoa mat khau

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        username     : String,
        email        : String,
        password     : String,
        avatar       : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash : phat sinh password cho 1 doi tuong
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid kiem tra password xem co dung hay khong ?
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
