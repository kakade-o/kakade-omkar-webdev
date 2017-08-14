(function () {
    angular
        .module("omdbApp")
        .controller("reviewNewController", reviewNewController);

    function reviewNewController($location, $routeParams, reviewService, userService) {

        var model = this;

        model.userId = $routeParams.userId;
        // model.websiteId = $routeParams.websiteId;
        model.reviewId = $routeParams.reviewId;

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
            reviewService
                .createReview(model.userId, review)
                .then(function () {
                    $location.url("/user/"+model.userId+"/review");
                })
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