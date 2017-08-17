(function () {
    angular
        .module("omdbApp")
        .controller("reviewEditController", reviewEditController);

    function reviewEditController($location, $routeParams, reviewService, userService, resolveUser) {

        var model = this;

        model.userId = resolveUser._id//$routeParams.userId;
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
                    console.log(review);
                    $location.url("/user/" + "review");
                });
            model.updated = "Updated!";
        }

        function removeReview(userId, reviewId) {
            reviewService
                .deleteReview(userId, reviewId)
                .then(function () {
                    $location.url("/user/" + "review");
                });
        }

        function toProfile() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if(user.isCritic == true) {
                        $location.url('/criticProfile');
                    }
                    else {
                        $location.url('/profile');
                    }
                })
        }


    }

})();