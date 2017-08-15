(function () {
    angular
        .module("omdbApp")
        .controller("reviewListController", reviewListController);

    function reviewListController($location, $routeParams, reviewService, userService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.reviewId = $routeParams.reviewId;
        model.reviewerId = $routeParams.reviewerId;
        model.toProfile = toProfile;

        function init() {
            console.log("inside controller");

            if (model.reviewerId != null) {
                reviewService
                    .findReviewByUserId(model.reviewerId)
                    .then(function (reviews) {
                        model.reviews = reviews;
                    });
            }
            else {
                reviewService
                    .findReviewByUserId(model.userId)
                    .then(function (reviews) {
                        model.reviews = reviews;
                    })
            }

        }

        init();

        function toProfile() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if (user.isCritic == true) {
                        $location.url('/criticProfile/' + user._id);
                    }
                    else {
                        $location.url('/profile/' + user._id);
                    }
                })
        }

    }

})();