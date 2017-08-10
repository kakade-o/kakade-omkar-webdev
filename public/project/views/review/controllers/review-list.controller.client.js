(function () {
    angular
        .module("omdbApp")
        .controller("reviewListController", reviewListController);

    function reviewListController($routeParams, reviewService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.reviewId = $routeParams.reviewId;

        function init() {
            reviewService
                .findReviewByreviewId(model.reviewId)
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }
        init();

    }

})();