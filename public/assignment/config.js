(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            // .when("/", {
            //     templateUrl: "index.html"
            // })
            .when("/home", {
                templateUrl: "views/home.html"
            })

            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/profile/:userId", {
                templateUrl: "views/user/profile.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })

    }
})();
