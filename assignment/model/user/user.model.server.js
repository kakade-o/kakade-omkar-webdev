var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;
userModel.findUserByUsername = findUserByUsername;

module.exports = userModel;

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
    return userModel.find({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

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
