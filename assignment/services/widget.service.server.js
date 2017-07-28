module.exports = function (app) {

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

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

    function findWidgetsByPageId(req, res) {

        var widget = [];

        for(var w in widgets) {
            if(widgets[w].pageId === req.params.pageId) {
                widget.push(widgets[w]);
            }
        }
        res.json(widget);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }

    }

    function updateWidget(req, res) {

        var widget = req.body;

        for(var w in widgets) {
            if(widgets[w]._id === req.params.widgetId) {
                widgets[w] = widget;
                res.send(widget);
            }
        }
        res.sendStatus(404);
    }

    function findWidgetById(req, res) {

        for(var w in widgets) {
            if(widgets[w]._id === req.params.widgetId) {
                res.json(widgets[w]);
            }
        }
        res.sendStatus(404);
    }

    function createWidget(req, res) {

        var widget = req.body;
        var pageId = req.params.pageId;

        widget.pageId = pageId;
        widget._id = (new Date()).getTime() + "";
        widgets.push(widget);

        res.json(widget);

    }



};