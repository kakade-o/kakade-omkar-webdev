(function () {
    angular
        .module("omdbApp")
        .controller("criticProfileController", criticProfileController);


    function criticProfileController($location, $routeParams, userService) {

        var model = this;

        var userId = $routeParams["userId"];

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
            model.updated = "Updated!";
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
