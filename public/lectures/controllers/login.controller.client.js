/**
 * Created by omkarkakade on 7/19/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("loginController", loginController);


    function loginController($location, userService) {

        var model = this;

        function init() {

        }
        init();

        model.login = function(user) {
            if(!user) {
                model.errorMessage = "User not found";
                return;
            }

            var _user = userService.findUserByUsernameAndPassword(user.username, user.password);

            if(_user === null) {
                model.errorMessage = "User not found";
            } else {
                $location.url("profile/" + _user._id);
            }


            //alert(user.username + ' ' + user.password);
        }
    }
})();
