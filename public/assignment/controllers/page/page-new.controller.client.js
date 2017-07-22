(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;

        model.newPage = newPage;

        function init() {

        }
        init();

        function newPage(siteId, page) {
            pageService.createPage(siteId, page);
        }

    }

})();