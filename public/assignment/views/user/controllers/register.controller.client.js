(function() {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {

        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
             var _user = null;//userService.findUserByUsername(user.username);
             if(!_user) {
                 if(user.password !== user.password2) {
                     model.error = "Passwords must match!";
                 } else {
                     var user = userService.registerUser(user);
                     $location.url("/profile/" + user._id)
                 }

             } else {
                 model.error = "User already exists";
             }

        }

    }

})();