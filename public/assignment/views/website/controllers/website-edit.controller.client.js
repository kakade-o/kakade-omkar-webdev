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
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.userId, model.websiteId)
                .then(function (response) {
                    model.site = response.data;
                });
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