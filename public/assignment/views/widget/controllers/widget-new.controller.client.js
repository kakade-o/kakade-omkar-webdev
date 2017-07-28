(function () {

    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);
        // .controller("widgetNewHeadingController", widgetNewHeadingController);

    // function widgetNewHeadingController($routeParams, widgetService) {
    //
    //     var model = this;
    //
    //     model.userId = $routeParams.userId;
    //     model.websiteId = $routeParams.websiteId;
    //     model.pageId = $routeParams.pageId;
    //
    //     function init() {
    //
    //     }
    //     init();
    //
    // }

    function widgetNewController($location, $routeParams, widgetService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.createWidget = createWidget;

        function init() {

        }
        init();

        function createWidget(widget) {

            widgetService
                .createWidget(model.pageId, widget)
                .then(function () {
                    // href="#!/user/{{model.userId}}/{{model.websiteId}}/{{model.pageId}}/widget"
                    $location.url("/user/"+model.userId+"/"+model.websiteId+"/"+model.pageId+"/widget");
                })
        }

    }


})();