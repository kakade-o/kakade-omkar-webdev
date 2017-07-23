(function () {

    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        function deleteWidget(id) {
            for(var w in widgets) {
                if(widgets[w]._id === id) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(id, widget) {
            for(var w in widgets) {
                if(widgets[w]._id === id) {
                    widgets[w] === widget;
                }
            }

        }

        function findWidgetById(id) {
            for(var w in widgets) {
                if(widgets[w]._id === id) {
                    return widgets[w];
                }
            }
            return null;
        }


        function findWidgetsByPageId(id) {
            var widget = [];

            for(var w in widgets) {
                if(widgets[w].pageId === id) {
                    widget.push(widgets[w]);
                }
            }
            return widget;

        }

        function createWidget(id, widget) {
            widget.pageId = id;
            widget._id = (new Date()).getTime() + "";
            widgets.push(widget);
        }

    }

})();