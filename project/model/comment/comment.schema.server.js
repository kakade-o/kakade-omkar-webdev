var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel", require: true},
    movieId: {type: String, require: true},
    text: {type: String}
}, {collection: "comment"});

module.exports = commentSchema;