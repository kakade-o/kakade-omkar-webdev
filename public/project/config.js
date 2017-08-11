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


            //Critic User
            .when("/criticProfile/:userId", {
                templateUrl: "views/user/templates/criticProfile.view.client.html",
                controller: "criticProfileController",
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
                controller: "reviewListController",
                controllerAs: "model"
            })

            .when("/user/:userId/review/:reviewId/edit", {
                templateUrl: "views/review/templates/review-edit.view.client.html",
                controller: "reviewListController",
                controllerAs: "model"
            })


    }

})();