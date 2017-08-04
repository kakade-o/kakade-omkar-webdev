(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {

        var model = this;

        model.userId = $routeParams.userId;

        model.newWebsite = newWebsite;

        function init() {
            websiteService.findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });

        }
        init();

        function newWebsite(website) {
            websiteService
                .createWebsite(model.userId, website)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website");
                })
        }

    }



})();