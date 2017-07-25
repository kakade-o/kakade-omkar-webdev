(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.removeWebsite = removeWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
            model.site = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function removeWebsite(website) {
            websiteService.deleteWebsite(website._id);
        }

        function updateWebsite(website) {
            websiteService.updateWebsite(website._id, website);
        }

    }

})();