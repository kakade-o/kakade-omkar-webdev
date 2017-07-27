(function(){

    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);
    
    function websiteService($http) {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.deleteWebsite = deleteWebsite;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;

        // Finds list of websites by user
        function findWebsitesForUser(userId) {

            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // var sites = [];
            //
            // for(var w in websites) {
            //     if(websites[w].developerId === userId) {
            //         sites.push(websites[w]);
            //     }
            // }
            // return sites;
        }

        // updates the current website
        function updateWebsite(id, website) {
            for(var w in websites) {
                if(websites[w]._id === id) {
                    websites[w] = website;
                }
            }
        }

        //creates a new website
        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);

            // website.developerId = id;
            // website._id = (new Date()).getTime() + "";
            // websites.push(website);
        }

        // deletes an existing website
        function deleteWebsite(siteId) {
            for(var w in websites) {
                if(websites[w]._id === siteId) {
                    websites.splice(w, 1);
                }
            }
        }

        // Finds an existing website by id
        function findWebsiteById(id) {
            for(var w in websites) {
                if(websites[w]._id === id) {
                    return websites[w];
                }
            }
            return null;
        }

        
    }

})();