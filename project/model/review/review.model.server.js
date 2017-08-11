var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ProjectReviewModel", reviewSchema);

reviewModel.createReview = createReview;
reviewModel.findReviewById = findReviewById;
reviewModel.updateReview = updateReview;
reviewModel.findReviewByCredentials = findReviewByCredentials;
reviewModel.deleteReview = deleteReview;
// reviewModel.addWebsite = addWebsite;
// reviewModel.deleteWebsite = deleteWebsite;
reviewModel.findReviewByreviewname = findReviewByreviewname;

module.exports = reviewModel;

function createReview(review) {
    return reviewModel.create(review);
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

function findReviewByCredentials(reviewname, password) {
    return reviewModel.findOne({reviewname: reviewname, password: password});
}

function deleteReview(reviewId) {
    return reviewModel.remove({_id: reviewId});
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