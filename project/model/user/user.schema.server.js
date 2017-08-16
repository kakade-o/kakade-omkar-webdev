var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String,}, //removed password require true for google authentication
    firstName: String,
    lastName: String,
    dob: Date,
    isAdmin: Boolean,
    isCritic: Boolean,
    email:     email,
    google: {
        id:    profile.id,
        token: token
    },
    favorites: [{type: String}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;