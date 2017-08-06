var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
            .create(widget)
            .then(function (widget) {
                 return pageModel
                     .addWidget(pageId, widget._id);
            });
}

function findWidgetsByPageId(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page', 'name')
        .exec();
}

function findWidgetById(id) {
    return widgetModel.findById(id);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widget}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}



