var mongoose = require("mongoose");
var commentSchema = require("./comment.schema.server");
var commentModel = mongoose.model("CommentModel", commentSchema);

var userModel = require("../user/user.model.server");

commentModel.createComment = createComment;

module.exports = commentModel;


function createComment(userId, imdbId) {
    userModel
        .findUserById(userId)
        .then(function (user) {
            var temp = 0;
            for(var c in user.comments) {
                if(user.comments[c].movieId == imdbId) {
                    temp = 1;
                }
            }

            if(temp == 0) {

            }

        })
}