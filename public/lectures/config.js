/**
 * Created by omkarkakade on 7/19/17.
 */

(function () {

    angular.module("WamApp")
        .config(configuration);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "template/register.view.client.html"
            })

            .when("user/:userId/website", {
                templateUrl: "..."
            })
    }

})();
