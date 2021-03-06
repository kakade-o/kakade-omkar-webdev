/**
 * Created by omkarkakade on 7/18/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);


    function profileController($location, $routeParams, userService, $timeout) {

        var model = this;

        model.hasAlert = false;

        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;


        userService
            .findUserById(userId)
            .then(renderUser);
        
        function renderUser(user) {
            model.user = user;
        }


        function updateUser(user) {
            userService.updateUser(user._id, user);
            model.hasAlert = true;
            model.updated = "Updated!";

            $timeout(() => model.hasAlert = false, 4000);
        }

        function unregister(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                })
        }

    }
})();
