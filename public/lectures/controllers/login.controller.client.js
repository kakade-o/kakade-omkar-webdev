/**
 * Created by omkarkakade on 7/19/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


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
