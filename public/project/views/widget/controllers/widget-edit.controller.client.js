(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($location, $routeParams, widgetService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.updateWidget = updateWidget;
        model.removeWidget = removeWidget;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = response.data;
                })
        }
        init();

        function removeWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.url("/user/"+model.userId+"/"+model.websiteId+"/"+model.pageId+"/widget");
                });
        }

        function updateWidget(widget) {
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function () {
                    $location.url("/user/"+model.userId+"/"+model.websiteId+"/"+model.pageId+"/widget");
                });
        }
    }

})();