(function () {

    angular
        .module("WebAppMaker")
        .service("pageService", pageService);


    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]
        
        this.findPageByWebsiteId = findPageByWebsiteId;
        
        function findPageByWebsiteId(siteId) {
            var page = [];

            for(var p in pages) {
                if(pages[p].websiteId === siteId) {
                    page.push(pages[p]);
                }
            }
            return page;

        }



    }


})();