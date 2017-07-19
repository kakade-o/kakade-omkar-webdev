/**
 * Created by omkarkakade on 7/18/17.
 */
var app = angular.module("WebAppMaker", []);

app.controller("loginController", loginController);

app.config(configuration());

function configuration($routeProvider) {

    $routeProvider
        .when("/login", {
            templateUrl: "views/user/login.view.client.html"
        })
        .when("/register", {
            templateUrl: "views/user/register.view.client.html"
        })

}