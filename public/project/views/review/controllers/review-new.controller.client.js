(function () {
    angular
        .module("omdbApp")
        .controller("reviewNewController", reviewNewController);

    function reviewNewController($location, $routeParams, reviewService, userService, resolveUser) {

        var model = this;

        model.userId = resolveUser._id;//$routeParams.userId;
        // model.websiteId = $routeParams.websiteId;
        model.reviewId = $routeParams.reviewId;

        model.movieId = $routeParams.movieId;

        model.newReview = newReview;
        model.toProfile = toProfile;

        function init() {
            reviewService
                .findReviewByUserId(model.userId)
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }
        init();


        function newReview(review) {
            console.log("inside controller");
            review.movieId = model.movieId;
            reviewService
                .createReview(model.userId, review)
                .then(function () {
                    $location.url("/user"+"/review");
                })
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