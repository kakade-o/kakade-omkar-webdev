(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {

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

        function removeWebsite(websiteId) {
            websiteService
                .deleteWebsite(model.userId, websiteId)
                .then(function () {
                    $location.url('/user/' +model.userId +'/website');
                });
        }

        function updateWebsite(website) {
            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function () {
                    $location.url('/user/' +model.userId +'/website');
                });
        }

    }

})();