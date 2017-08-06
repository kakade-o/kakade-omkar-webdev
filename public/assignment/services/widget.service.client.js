(function () {

    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService($http) {

        // var widgets = [
        //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "url": "http://lorempixel.com/400/200/"},
        //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E" },
        //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        // ];

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        // Deletes an existing widget
        function deleteWidget(id) {

            var url = "/api/widget/" + id;
            return $http.delete(url);

            // for(var w in widgets) {
            //     if(widgets[w]._id === id) {
            //         widgets.splice(w, 1);
            //     }
            // }
        }

        // Updates an existing widget
        function updateWidget(id, widget) {

            var url = "/api/widget/" + id;

            return $http.put(url, widget);

            // for(var w in widgets) {
            //     if(widgets[w]._id === id) {
            //         widgets[w] === widget;
            //     }
            // }

        }

        // Finds an existing widget by its id
        function findWidgetById(id) {

            var url = "/api/widget/" + id;

            return $http.get(url);

            // for(var w in widgets) {
            //     if(widgets[w]._id === id) {
            //         return widgets[w];
            //     }
            // }
            // return null;
        }

        // Finds list of widgets by its page id
        function findWidgetsByPageId(id) {

            var url = "/api/page/" + id + "/widget";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

            // var widget = [];
            //
            // for(var w in widgets) {
            //     if(widgets[w].pageId === id) {
            //         widget.push(widgets[w]);
            //     }
            // }
            // return widget;

        }

        // Creates a new widget
        function createWidget(id, widget) {

            var url = '/api/page/' + id + '/widget';
            return $http.post(url, widget)
                    .then(function (response) {
                        return response.data;
                    });

            // widget.pageId = id;
            // widget._id = (new Date()).getTime() + "";
            // widgets.push(widget);
        }

    }

})();