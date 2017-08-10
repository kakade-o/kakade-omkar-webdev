/**
 * Created by omkarkakade on 7/18/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);


    function profileController($location, $routeParams, userService, $timeout, user) {

        var model = this;

        model.hasAlert = false;

        var userId = user._id;

        model.updateUser = updateUser;
        model.unregister = unregister;


        userService
            .findUserById(userId)
            .then(renderUser);
        
        function renderUser(user) {
            model.user = user;
        }
        
        // function init() {
        //     //model.user = userService.findUserById(userId);
        //     var promise = userService.findUserById(userId);
        //
        //     promise.then(function (response) {
        //         model.user = response.data;
        //     })
        // }
        //
        // init();

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
