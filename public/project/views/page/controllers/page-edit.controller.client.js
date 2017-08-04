(function () {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.updatePage = updatePage;
        model.removePage = removePage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });

            pageService
                .findPageById(model.pageId)
                .then(function (response) {
                    model.page = response.data;
                })
        }
        init();

        function updatePage(page) {
            pageService
                .updatePage(page._id, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/" + model.websiteId + "/page");
                });
        }

        function removePage(id) {
            pageService
                .deletePage(id)
                .then(function () {
                    $location.url("/user/" + model.userId + "/" + model.websiteId + "/page");
                });
        }


    }

})();