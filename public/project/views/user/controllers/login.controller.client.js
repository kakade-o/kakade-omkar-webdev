/**
 * Created by omkarkakade on 7/18/17.
 */

(function () {
    angular
        .module("omdbApp")
        .controller("loginController", loginController);

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
                    model.errorMessage = "Username '" + username + "' not found. Please try again.";
                }
            }

        }

    }
})();
