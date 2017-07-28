(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService) {

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
            widgetService.deleteWidget(model.widgetId);
        }

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
        }
    }

})();