var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    dob: Date,
    isAdmin: Boolean,
    isCritic: Boolean,
    favorites: [{type: String}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "CommentModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;