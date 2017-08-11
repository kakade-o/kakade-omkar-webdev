var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    dob: Date,
    isAdmin: Boolean,
    isCritic: Boolean,
<<<<<<< HEAD
    //websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    //favorites: [{type: mongoose.Schema.Types.ObjectId}],
=======
    // websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
>>>>>>> 758f1aeee2995ca470f50a4187f061570a3612d5
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;