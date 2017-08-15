(function () {
    angular
        .module("omdbApp")
        .controller("reviewListController", reviewListController);

    function reviewListController($location, $routeParams, reviewService, userService, $sce, resolveUser) {

        var model = this;

        model.userId = resolveUser._id;//$routeParams.userId;
        model.reviewId = $routeParams.reviewId;
        model.reviewerId = $routeParams.reviewerId;
        model.toProfile = toProfile;
        model.showDetails = showDetails;
        model.trustThisContent = trustThisContent;

        function init() {
            console.log("inside controller");

            if (model.reviewerId != null) {
                reviewService
                    .findReviewByUserId(model.reviewerId)
                    .then(function (reviews) {
                        model.reviews = reviews;
                        if(model.reviewId != null) {
                            var i = showDetails(model.reviews);
                            model.reviewDescription = i;
                            console.log(model.reviewDescription);
                        }
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
                        $location.url('/criticProfile');
                    }
                    else {
                        $location.url('/profile');
                    }
                })
        }

        function showDetails(reviews) {
            for (var u in model.reviews) {
                if (reviews[u]._id === model.reviewId) {
                    return model.reviewDetails = reviews[u];

                }
            }

        }

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);

        }


    }

})();