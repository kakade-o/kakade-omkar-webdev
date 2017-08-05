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

        // website.developerId = userId;
        // website._id = (new Date()).getTime() + "";
        //
        // websites.push(website);
        // res.json(website);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var userId = req.params.userId;
        websiteModel
            .deleteWebsite(userId, websiteId)
            .then(function (status) {
               res.json(status);
            });

        // for(var w in websites) {
        //     if(websites[w]._id === websiteId) {
        //         websites.splice(w, 1);
        //         res.sendStatus(200);
        //     }
        // }

    }

    function updateWebsite(req, res) {

        var website = req.body;

        for(var w in websites) {
            if(websites[w]._id === req.params.websiteId) {
                websites[w] = website;
                res.send(website);
            }
        }
        res.sendStatus(404);

    }

    function findWebsiteById(req, res) {
        for(var w in websites) {
            if(websites[w]._id === req.params.websiteId) {
                res.json(websites[w]);
            }
        }
        res.sendStatus(404);
    }

    function findWebsitesForUser(req, res) {

        var userId = req.params.userId;

        websiteModel
            .findWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            });

        // var sites = [];
        //
        // for(var w in websites) {
        //     if(websites[w].developerId === userId) {
        //         sites.push(websites[w]);
        //     }
        // }
        // res.json(sites);

    }


};