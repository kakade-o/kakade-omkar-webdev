module.exports = function (app) {

    var reviewModel = require("../model/review/review.model.server");

    app.get   ("/api/project/user/:userId/review", findReviewsForUser);
    app.get   ("/api/project/user/:userId/review/:reviewId", findReviewById);
    app.post  ("/api/project/user/:userId/review", createReview);
    app.put   ("/api/project/review/:reviewId", updateReview);
    app.delete("/api/project/user/:userId/review/:reviewId", deleteReview);


    var reviews = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createReview(req, res) {
        var review = req.body;
        var userId = req.params.userId;

        reviewModel
            .createReview(userId ,review)
            .then(function (review) {
                res.json(review);
            });

        // review.developerId = userId;
        // review._id = (new Date()).getTime() + "";
        //
        // reviews.push(review);
        // res.json(review);
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        var userId = req.params.userId;
        reviewModel
            .deleteReview(userId, reviewId)
            .then(function (status) {
                res.json(status);
            });

        // for(var w in reviews) {
        //     if(reviews[w]._id === reviewId) {
        //         reviews.splice(w, 1);
        //         res.sendStatus(200);
        //     }
        // }

    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;

        reviewModel
            .updateReview(reviewId, review)
            .then(function (review) {
                res.json(review);
            })

        // for(var w in reviews) {
        //     if(reviews[w]._id === req.params.reviewId) {
        //         reviews[w] = review;
        //         res.send(review);
        //     }
        // }
        // res.sendStatus(404);

    }

    function findReviewById(req, res) {

        reviewModel
            .findReviewById(req.params.reviewId)
            .then(function (review) {
                res.json(review);
            })


        // for(var w in reviews) {
        //     if(reviews[w]._id === req.params.reviewId) {
        //         res.json(reviews[w]);
        //     }
        // }
        // res.sendStatus(404);
    }

    function findReviewsForUser(req, res) {

        var userId = req.params.userId;

        reviewModel
            .findReviewsForUser(userId)
            .then(function (reviews) {
                res.json(reviews);
            });

        // var sites = [];
        //
        // for(var w in reviews) {
        //     if(reviews[w].developerId === userId) {
        //         sites.push(reviews[w]);
        //     }
        // }
        // res.json(sites);

    }


};