(function() {

    angular
        .module("WebAppMaker")
        .service("pageService", pageService);


    function pageService($http) {

        
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;


        // Deletes an existing page
        function deletePage(websiteId, pageId) {

            var url = "/api/website/"+ websiteId +"/page/" + pageId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });

        }

        // Updates details of an an existing page
        function updatePage(id, page) {

            var url = "/api/page/" + id;

            return $http.put(url, page);

        }

        // Finds a page requested by user by Id
        function findPageById(pageId) {

            var url = "/api/page/" + pageId;
            return $http.get(url);


        }

        // Finds the list of pages in a website of a user
        function findPageByWebsiteId(siteId) {
            var url = '/api/website/' + siteId + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        // Creates a new page
        function createPage(websiteId, page) {

            var url = '/api/website/' + websiteId + '/page';
            return $http
                .post(url, page)
                .then(function (response) {
                    return response.data;
                });

        }



    }


})();