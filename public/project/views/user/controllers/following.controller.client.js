(function () {
    angular
        .module("omdbApp")
        .controller("followingController", followingController);


    function followingController($location, $routeParams, userService) {

        var model = this;

        var userId = $routeParams.userId;

        model.updateUser = updateUser;
        model.unregister = unregister;


        userService
            .findUserById(userId)
            .then(renderUser);


        // function renderCritic(user) {
        //     var criticId;
        //
        // }

        function renderUser(user) {
            // console.log(user.following);
            model.user = user;
            model.critics = [];

            for (var u in model.user.following) {
            userService
                .findUserById(model.user.following[u])
                .then(function (user) {
                    model.critics.push(user)
                })

            }

            console.log(model.user.following);
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
