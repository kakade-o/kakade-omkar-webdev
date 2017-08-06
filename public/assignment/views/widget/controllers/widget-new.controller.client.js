(function () {

    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.createWidget = createWidget;

        function createWidget(type) {
            //widget._id = model.widgetId;
            console.log("Hello");
            widgetService
                .createWidget(model.pageId, {type})
                .then(function (widget) {
                    console.log(angular.toJson(widget));
                    $location.url("/user/" + model.userId + "/"
                        + model.websiteId + "/" + model.pageId
                        + "/" + widget._id + "/edit");
                })
        }

    }


})();