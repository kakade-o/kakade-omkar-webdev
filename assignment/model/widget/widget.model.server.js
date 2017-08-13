var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    console.log("creating widget in model.");
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (createdWidget) {
            return pageModel
                .addWidget(pageId, createdWidget._id);
        }).catch(console.log);
}

function findWidgetsByPageId(pageId) {
    return pageModel.findPageById(pageId);
}

function findWidgetById(id) {
    return widgetModel.findById(id);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function reorderWidget(pageId, startIndex, endIndex) {

    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            console.log(page);
            page.widgets.splice(endIndex, 0, page.widgets.splice(startIndex, 1)[0]);
            page.save();
            page.update();

            return 200;
        }, function (err) {
            return err;
        });

    // return widgetModel
    //     .find({_page: pageId}, function (err, widgets) {
    //         widgets.splice(endIndex, 0, widgets.splice(startIndex, 1)[0]);
    //
    //         widgets.forEach(function (widget) {
    //             widget.markModified();
    //             widget.update();
    //         })
    //     })
}


