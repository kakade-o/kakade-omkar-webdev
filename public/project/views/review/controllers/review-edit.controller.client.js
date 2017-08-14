(function () {
    angular
        .module("omdbApp")
        .controller("reviewEditController", reviewEditController);

    function reviewEditController($location, $routeParams, reviewService, userService) {

        var model = this;

        model.userId = $routeParams.userId;
        // model.websiteId = $routeParams.websiteId;
        model.reviewId = $routeParams.reviewId;

        model.updateReview = updateReview;
        model.removeReview = removeReview;
        model.toProfile = toProfile;

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

        function removeReview(userId, reviewId) {
            reviewService
                .deleteReview(userId, reviewId)
                .then(function () {
                    $location.url("/user/" + model.userId + "/review");
                });
        }

        function toProfile() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if(user.isCritic == true) {
                        $location.url('/criticProfile/' + user._id);
                    }
                    else {
                        $location.url('/profile/' + user._id);
                    }
                })
        }


    }

})();