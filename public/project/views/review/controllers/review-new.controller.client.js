(function () {
    angular
        .module("omdbApp")
        .controller("reviewNewController", reviewNewController);

    function reviewNewController($location, $routeParams, reviewService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.reviewId = $routeParams.reviewId;

        model.newReview = newReview;

        function init() {
            reviewService
                .findReviewByUserId(model.websiteId)
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }
        init();


        function newReview(review) {
            reviewService
                .createReview(model.websiteId, review)
                .then(function () {
                    $location.url("/user/"+model.userId+"/"+model.websiteId+"/review");
                })
        }

    }

})();