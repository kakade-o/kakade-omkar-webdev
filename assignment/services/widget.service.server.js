module.exports = function (app) {

    var widgetModel = require("../model/widget/widget.model.server");

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", updateWidgetOrder);
    app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: './public/assignment/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgets = [
        {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function findWidgetsByPageId(req, res) {

        var pageId = req.params.pageId;

        widgetModel.findWidgetsByPageId(pageId)
            .then(function (widgets) {
                res.json(widgets);
            });

    }

    function deleteWidget(req, res) {
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(pageId, widgetId)
            .then(function (status) {
                res.json(status);
            })

    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                res.json(widget);
            });

    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        widgetModel.reorderWidget(pageId, startIndex, endIndex)
            .then(function (status) {
                res.json(status);
            })

    }

    function findWidgetById(req, res) {

        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            })

    }

    function getWidgetById(widgetId) {
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                return widgets[w];
            }
        }

    }

    function createWidget(req, res) {

        var widget = req.body;
        var pageId = req.params.pageId;

        console.log("creating widget." + widget + " pageId: " + pageId);

        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                console.log("responding.");
                res.json(widget);
            });


    }

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        console.log(widgetId);
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        //var originalname  = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var current_widget;

        widgetModel
            .updateWidget(widgetId, {url: '/assignment/uploads/' + filename})
            .then(function (w) {
                var callbackUrl = "/assignment/#!/user/" + userId + "/"
                    + websiteId + "/" + pageId + "/" + widgetId + "/edit";
                res.redirect(callbackUrl);
            });
    }


};