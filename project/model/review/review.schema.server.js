var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    reviewname: {type: String, require: true},
    reviewtext: String,
    rating: String,
    _reviewerId: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    movieId: String,
    // websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});

module.exports = reviewSchema;