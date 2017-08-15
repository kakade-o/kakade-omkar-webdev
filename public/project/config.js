(function () {

    angular
        .module("omdbApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider

        // API Tests
            .when("/", {
                templateUrl: "views/omdb/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbId", {
                templateUrl: "views/omdb/templates/details.html",
                controller: "detailsController",
                controllerAs: "model"
            })


            // Critic Search
            .when("/user/:userId/criticSearch", {
                templateUrl: "views/criticSearch/templates/criticSearch.view.client.html",
                controller: "criticSearchController",
                controllerAs: "model"
            })

            //Review List and Details for User

            .when("/user/:userId/criticReviewList/:reviewerId", {
                templateUrl: "views/criticReviewList/templates/reviewList.view.client.html",
                controller: "reviewListController",
                controllerAs: "model"
            })

            .when("/user/:userId/criticReviewList/:reviewerId/details/:reviewId", {
                templateUrl: "views/criticReviewList/templates/reviewDetails.view.client.html",
                controller: "reviewListController",
                controllerAs: "model"
            })



            // User
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"

            })
            .when("/profile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })


            .when("/user/:userId/following", {
                templateUrl: "views/user/templates/following.view.client.html",
                controller: "followingController",
                controllerAs: "model"

            })

            .when("/user/:userId/favorites", {
                templateUrl: "views/user/templates/favorites.view.client.html",
                controller: "favoritesController",
                controllerAs: "model"
            })


            //Critic User
            .when("/criticProfile/:userId", {
                templateUrl: "views/user/templates/criticProfile.view.client.html",
                controller: "criticProfileController",
                controllerAs: "model"
            })

            .when("/user/:userId/search", {
                templateUrl: "views/search/templates/search_movie.view.client.html",
                controller: "userSearchController",
                controllerAs: "model"
            })

            .when("/user/:userId/details/:imdbId", {
                templateUrl: "views/search/templates/details_movie.view.client.html",
                controller: "userDetailsController",
                controllerAs: "model"
            })


            //Review
            .when("/user/:userId/review", {
                templateUrl: "views/review/templates/review-list.view.client.html",
                controller: "reviewListController",
                controllerAs: "model"
            })

            .when("/user/:userId/review/new", {
                templateUrl: "views/review/templates/review-new.view.client.html",
                controller: "reviewNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/review/:reviewId/edit", {
                templateUrl: "views/review/templates/review-edit.view.client.html",
                controller: "reviewEditController",
                controllerAs: "model"
            })


    }

})();