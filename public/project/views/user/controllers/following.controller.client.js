(function () {
    angular
        .module("omdbApp")
        .controller("followingController", followingController);


    function followingController($location, $routeParams, userService, resolveUser) {

        var model = this;

        var userId =  resolveUser._id; //$routeParams.userId;
        model.userId = resolveUser._id;  //$routeParams.userId;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.toProfile = toProfile;

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

        function toProfile() {
            userService
                .findUserById(userId)
                .then(function (user) {
                    if(user.isCritic == true) {
                        $location.url('/criticProfile');
                    }
                    else {
                        $location.url('/profile');
                    }
                })
        }

    }
})();
