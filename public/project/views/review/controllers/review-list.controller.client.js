(function () {
    angular
        .module("omdbApp")
        .controller("reviewListController", reviewListController);

    function reviewListController($routeParams, reviewService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.reviewId = $routeParams.reviewId;

        function init() {
            console.log("inside controller");
            reviewService
                .findReviewByUserId(model.userId)
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }
        init();

    }

})();