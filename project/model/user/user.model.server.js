var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);
var bcrypt = require("bcrypt-nodejs");

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;
userModel.findUserByUsername = findUserByUsername;
userModel.findCriticByUsername = findCriticByUsername;
userModel.addMovie = addMovie;
userModel.deleteMovie = deleteMovie;
userModel.addCritic = addCritic;
userModel.findAllCritics = findAllCritics;
userModel.findAllUsers = findAllUsers;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.addReview = addReview;
userModel.deleteReview = deleteReview;

module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId})
}

function findAllUsers() {
    return userModel.find();
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(id) {
    return userModel.findById(id);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}


//bcrypt implementation
function findUserByCredentials(username, password) {
    return userModel
        .findOne({username: username})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                null;
            }
        });

    //, password: password});
}

// function findUserByCredentials(username, password) {
//     return userModel.findOne({username: username, password: password});
// }

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        })
}

function deleteWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        })
}

function addReview(userId, reviewId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.reviews.push(reviewId);
            return user.save();
        })
}

function deleteReview(userId, reviewId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        })
}


function findCriticByUsername(criticUsername) {

    return userModel.findOne({username: criticUsername});
}

function addMovie(userId, imdbId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {

            var index = -1;
            index = user.favorites.indexOf(imdbId);
            if (index == -1) {
                user.favorites.push(imdbId);
                return user.save();
            }
            return user;
        })
}


function findAllCritics() {
    return userModel
        .find({isCritic: true});
}


//Critic Functions

function addCritic(userId, criticId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {

            var index = -1;
            index = user.following.indexOf(criticId);
            if (index == -1) {
                user.following.push(criticId);
                return user.save();
            }
            return user;
        })
}


function deleteMovie(userId, movieId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.favorites.indexOf(movieId);
            user.favorites.splice(index, 1);
            return user.save();
        });
}
