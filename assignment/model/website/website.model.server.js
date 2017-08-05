var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("../user/user.model.server");

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesForUser = findWebsitesForUser;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;


function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
           return userModel
               .addWebsite(userId, website._id);
        });
}

function findWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        })
}