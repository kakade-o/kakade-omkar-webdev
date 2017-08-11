(function () {
    angular
        .module("omdbApp")
        .controller("reviewEditController", reviewEditController);

    function reviewEditController($location, $routeParams, reviewService) {

        var model = this;

        model.userId = $routeParams.userId;
        // model.websiteId = $routeParams.websiteId;
        model.reviewId = $routeParams.reviewId;

        model.updateReview = updateReview;
        model.removeReview = removeReview;

        function init() {
            reviewService
                .findReviewByUserId(model.userId)
                .then(function (reviews) {
                    model.reviews = reviews;
                });

            reviewService
                .findReviewById(model.userId, model.reviewId)
                .then(function (response) {
                    model.review = response.data;
                })
        }
        init();

        function updateReview(review) {
            reviewService
                .updateReview(review._id, review)
                .then(function () {
                    $location.url("/user/" + model.userId + "/review");
                });
            model.updated = "Updated!";
        }

        function removeReview(id) {
            reviewService
                .deleteReview(id)
                .then(function () {
                    $location.url("/user/" + model.userId + "/" + model.reviewId + "/review");
                });
        }


    }

})();