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

            //console.log(user.username, user.password2, user.password);

            if(user.password !== user.password2) {
                model.error = "Passwords must match!";
            } else {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if(!_user) {
                            return userService.registerUser(user)
                                .then(function (response) {
                                    _user = response.data;
                                    $location.url("/profile/" + _user._id);
                                });

                        } else {
                            model.error = "User already exists";
                        }
                    })

            }

            }

    }

})();