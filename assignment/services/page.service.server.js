module.exports = function (app) {

    var pageModel = require("../model/page/page.model.server");

    app.get   ("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get   ("/api/page/:pageId", findPageById);
    app.post  ("/api/website/:websiteId/page",createPage);
    app.put   ("/api/page/:pageId", updatePage);
    app.delete("/api/website/:websiteId/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {

        var websiteId = req.params.websiteId;
        var page = req.body;

        pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.json(page);
            });

        // page.websiteId = websiteId;
        // page._id = (new Date()).getTime() + "";
        //
        // pages.push(page);
        // res.json(page);
    }

    function deletePage(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;

        pageModel
            .deletePage(websiteId, pageId)
            .then(function (status) {
                res.json(status);
            });

        // for(var p in pages) {
        //     if(pages[p]._id === pageId) {
        //         pages.splice(p, 1);
        //         res.sendStatus(200);
        //     }
        // }
    }

    function updatePage(req, res) {

        var page = req.body;

        for(var p in pages) {
            if(pages[p]._id === req.params.pageId) {
                pages[p] = page;
                res.send(page);
            }
        }
        res.sendStatus(404);

    }

    function findPageById(req, res) {

        for(var p in pages) {
            if(pages[p]._id === req.params.pageId) {
                res.json(pages[p]);
            }
        }
        res.sendStatus(404);
    }


    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findPageByWebsiteId(websiteId)
            .then(function (pages) {
                res.json(pages);
            })

        // var page = [];
        //
        // for(var p in pages) {
        //     if(pages[p].websiteId === websiteId) {
        //         page.push(pages[p]);
        //     }
        // }
        // res.json(page);
    }

};