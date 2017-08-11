var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    reviewname: {type: String, require: true},
    reviewtext: String,
    rating: Number,
    _reviewerId: {type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"},
    // websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});

module.exports = reviewSchema;