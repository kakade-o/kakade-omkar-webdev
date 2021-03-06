module.exports = function (app) {

    var websiteModel = require("../model/website/website.model.server");

    app.get   ("/api/user/:userId/website", findWebsitesForUser);
    app.get   ("/api/user/:userId/website/:websiteId", findWebsiteById);
    app.post  ("/api/user/:userId/website", createWebsite);
    app.put   ("/api/website/:websiteId", updateWebsite);
    app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);


    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];
    
    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;

        websiteModel
            .createWebsite(userId ,website)
            .then(function (website) {
                res.json(website);
            });

    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var userId = req.params.userId;
        websiteModel
            .deleteWebsite(userId, websiteId)
            .then(function (status) {
               res.json(status);
            });


    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;

        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (website) {
                res.json(website);
            })

    }

    function findWebsiteById(req, res) {

        websiteModel
            .findWebsiteById(req.params.websiteId)
            .then(function (website) {
                res.json(website);
            })

    }

    function findWebsitesForUser(req, res) {

        var userId = req.params.userId;

        websiteModel
            .findWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            });

    }


};