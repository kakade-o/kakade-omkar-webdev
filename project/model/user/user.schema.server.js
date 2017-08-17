var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String,}, //removed password require true for google authentication
    firstName: String,
    lastName: String,
    dob: Date,
    isAdmin: Boolean,
    isCritic: Boolean,
<<<<<<< HEAD
    //email:     email,
    google: {
        id:    String,
        token: String
=======
    // email: String,
    google: {
        id:    String,//profile.id,
        token: String//token
>>>>>>> 40e42bbf4c5f6d6f7e3b2698f2f0a1a67cec58a4
    },
    favorites: [{type: String}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;