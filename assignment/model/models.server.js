console.log("Hello from Mongoose!!!");

var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/webdev_2017');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    phone: String,
    dateCreated: {type: Date, default: Date.now}

}, {collection: "user"}); 

var userModel = mongoose.model("UserModel", userSchema);


removeUser("598499303965b31e42eed59c")
    .then(function (status) {
        console.log(status);
    });

function removeUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUserValues) {
    return userModel.update({_id: userId}, {$set:newUserValues});
}

function findUserById(id) {
    return userModel.findById(id);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findAllUsers() {
    return userModel.find();
}

function createUser(user) {
    userModel.create(user, function (err, doc) {
        if(err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    });
}


