(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService) {

        var model = this;

        model.userId = $routeParams.userId;

        model.newWebsite = newWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);

        }
        init();

        function newWebsite(id, website) {
            var site = websiteService.createWebsite(id, website);
        }

    }



})();