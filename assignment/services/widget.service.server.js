module.exports = function (app) {

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", updateWidgetOrder);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: './public/assignment/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

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

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        var widgetsforPage = [];
        for(var w in widgets) {
            if(widgets[w].pageId = pageId) {
                widgetsforPage.push(widgets[w]);
            }
        }

        var initialWidget = widgetsforPage[startIndex];
        var finalWidget = widgetsforPage[endIndex];

        widgets.splice(widgets.indexOf(finalWidget), 0, widgets.splice(widgets.indexOf(initialWidget), 1)[0]);
        res.sendStatus(200);

    }

    function findWidgetById(req, res) {

        for(var w in widgets) {
            if(widgets[w]._id === req.params.widgetId) {
                res.json(widgets[w]);
            }
        }
        res.sendStatus(404);
    }

    function getWidgetById(widgetId) {
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                return widgets[w];
            }
        }

    }

    function createWidget(req, res) {

        var widget = req.body;
        var pageId = req.params.pageId;

        widget.pageId = pageId;
        //widget._id = (new Date()).getTime() + "";
        widgets.push(widget);

        res.json(widget);

    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = getWidgetById(widgetId);
        if(!widget) {
            widget = {};
            widgetId = (new Date()).getTime() + "";
            widget._id = widgetId;
            widget.pageId = pageId;
            widgets.push(widget);
        }
        widget.url = '/assignment/uploads/'+filename;



        var callbackUrl   = "/assignment/#!/user/"+userId+"/"+websiteId+"/"+pageId+ "/"+ widgetId + "/IMAGE";

        res.redirect(callbackUrl);
    }


};