var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ProjectReviewModel", reviewSchema);
var userModel = require("../user/user.model.server");

reviewModel.createReview = createReview;
reviewModel.findReviewById = findReviewById;
reviewModel.updateReview = updateReview;
reviewModel.findReviewsForUser = findReviewsForUser;
reviewModel.deleteReview = deleteReview;
// reviewModel.addWebsite = addWebsite;
// reviewModel.deleteWebsite = deleteWebsite;
reviewModel.findReviewByreviewname = findReviewByreviewname;

module.exports = reviewModel;

function createReview(userId, review) {
    return reviewModel
        .create(review)
        .then(function (review) {
            return userModel
                .addReview(userId, review._id);
        });
}

function findReviewById(id) {
    return reviewModel.findById(id);
}

function updateReview(reviewId, review) {
    return reviewModel.update({_id: reviewId}, {$set: review});
}

function findReviewByreviewname(reviewname) {
    return reviewModel.findOne({reviewname: reviewname});
}

function findReviewsForUser(userId) {
    return reviewModel
        .find({_reviewerId: userId})
        .populate('_reviewId', 'username')
        .exec();
}

function deleteReview(userId, reviewId) {

    return reviewModel
        .remove({_id: reviewId})
        .then(function (status) {
            return userModel
                .deleteReview(userId, reviewId);
        });
}


//
// function addWebsite(reviewId, websiteId) {
//     return reviewModel
//         .findreviewById(reviewId)
//         .then(function (review) {
//             review.websites.push(websiteId);
//             return review.save();
//         })
// }
//
// function deleteWebsite(reviewId, websiteId) {
//     return reviewModel
//         .findreviewById(reviewId)
//         .then(function (review) {
//             var index = review.websites.indexOf(websiteId);
//             review.websites.splice(index, 1);
//             return review.save();
//         })
// }