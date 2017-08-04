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
                controllerAs : "model"
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

    }
    
})();