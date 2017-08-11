(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($location, $routeParams, pageService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.newPage = newPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();


        function newPage(page) {
            pageService
                .createPage(model.websiteId, page)
                .then(function (page) {
                    $location.url("/user/"+model.userId+"/"+model.websiteId+"/page");
                });
        }

    }

})();