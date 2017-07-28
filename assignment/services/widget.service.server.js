module.exports = function (app) {

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.post("/api/page/:pageId/widget", createWidget);

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

    function createWidget(req, res) {

        var widget = req.body;
        var pageId = req.params.pageId;

        widget.pageId = pageId;
        widget._id = (new Date()).getTime() + "";
        widgets.push(widget);

        res.json(widget);

    }



};