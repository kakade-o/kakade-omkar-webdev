/**
 * Created by omkarkakade on 7/18/17.
 */

(function () {
    angular
        .module("omdbApp")
        .controller("loginController", loginController)

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);
            
            function handleError(error) {
                model.errorMessage = "Username '" + username + "' not found. Please try again.";
            }

            function login(found) {
                if(found !== null) {
                    $location.url('/profile/' + found._id);
                } else {
                    model.errorMessage = "Username " + username + "Not found";
                }
            }

        }

        // model.login = login;
        //
        // function init() {
        //
        // }
        // init();
        //
        // function login(user) {
        //
        //     if(!user) {
        //         model.errorMessage = "User not found";
        //         return;
        //     }
        //
        //     // var user = userService.findUserByCredentials(user.username, user.password);
        //
        //     userService
        //         .findUserByCredentials(username, password)
        //
        //     if(user === null) {
        //         model.errorMessage = "User not found";
        //     } else {
        //         $location.url("profile/" +user._id);
        //     }
        //
        //
        //
        // }

    }
})();
