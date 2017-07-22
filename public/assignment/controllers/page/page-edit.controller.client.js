(function () {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.updatePage = updatePage;
        model.removePage = removePage;

        function init() {
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function updatePage(page) {
            pageService.updatePage(page._id, page);
        }

        function removePage(id) {
            pageService.deletePage(id);
        }


    }

})();