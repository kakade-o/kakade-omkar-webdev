(function () {

    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService($http) {


        this.findWidgetsByPageId = findWidgetsByPageId;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        // Deletes an existing widget
        function deleteWidget(pageId, widgetId) {

            var url = "/api/page/" + pageId + "/widget/" + widgetId;
            return $http.delete(url);

        }

        // Updates an existing widget
        function updateWidget(id, widget) {

            var url = "/api/widget/" + id;

            return $http.put(url, widget);

        }

        // Finds an existing widget by its id
        function findWidgetById(id) {

            var url = "/api/widget/" + id;

            return $http.get(url);

        }

        // Finds list of widgets by its page id
        function findWidgetsByPageId(id) {

            var url = "/api/page/" + id + "/widget";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


        }

        // Creates a new widget
        function createWidget(id, widget) {
            widget._page = id;

            console.log("creating widget");
            var url = '/api/page/' + id + '/widget';
            return $http.post(url, widget)
                    .then(function (response) {
                        console.log("got response");
                        return response.data;
                    });

        }

    }

})();