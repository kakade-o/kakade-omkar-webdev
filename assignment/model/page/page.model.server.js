var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.createPage = createPage;
pageModel.findPageByWebsiteId = findPageByWebsiteId;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        });
}

function findPageByWebsiteId(websiteId) {
    return pageModel.find({_website: websiteId})
                    .populate('_website', 'name')
                    .exec();
}