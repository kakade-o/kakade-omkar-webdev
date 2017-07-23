(function() {

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
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;


        // Deletes an existing page
        function deletePage(id) {
            for(var p in pages) {
                if(pages[p]._id === id) {
                    pages.splice(p, 1);
                }
            }
        }

        // Updates details of an an existing page
        function updatePage(id, page) {
            for(var p in pages) {
                if(pages[p]._id === id) {
                    pages[p] = page;
                }
            }
        }

        // Finds a page requested by user by Id
        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return pages[p];
                }
            }
        }

        // Finds the list of pages in a website of a user
        function findPageByWebsiteId(siteId) {
            var page = [];

            for(var p in pages) {
                if(pages[p].websiteId === siteId) {
                    page.push(pages[p]);
                }
            }
            return page;

        }

        // Creates a new page
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }



    }


})();