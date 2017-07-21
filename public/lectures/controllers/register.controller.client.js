(function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
            var user = userService.findUserByUsername();

            if(!user) {

            }
            console.log(user);
            $location.url("/profile/")
        }
    }
})();