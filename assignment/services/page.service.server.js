module.exports = function (app) {

    app.get("/api/website/:websiteId", findPageByWebsiteId);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];


    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;

        var page = [];

        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                page.push(pages[p]);
            }
        }
        res.json(page);
    }

};