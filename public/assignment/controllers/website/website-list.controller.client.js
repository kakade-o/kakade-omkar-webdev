(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        model.user = $routeParams.user;
        model.userId = $routeParams.userId;


        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

    }

})();