(function () {
    
    angular
        .module("omdbApp")
        .controller("adminController", adminController);
    
    function adminController($routeParams, userService, $location, $timeout, resolveUser) {

        var model = this;

        model.adminId = resolveUser.adminId; //$routeParams.adminId;
        model.userId = $routeParams.userId;
        model.updateUser = updateUser;
        model.removeUser = removeUser;

        console.log(model.userId);

        model.registerUser = registerUser;

        function init() {

            userService
                .findAllUsers()
                .then(function (response) {
                    model.users = response.data;
                });

            userService
                .findUserById(model.userId)
                .then(function (user) {
                    model.user = user;
                })

        }
        init();

        function registerUser(user) {

            if(user.password !== user.password2) {
                model.error = "Passwords must match!";
                model.hasAlert = true;
                $timeout(function() {model.hasAlert = false}, 3000);
            } else {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if(!_user) {
                            return userService
                                .register(user)
                                .then(function (response) {
                                    $location.url("/adminList");
                                });

                        } else {
                            model.error = "User already exists";
                            model.hasAlert = true;
                            $timeout(function() {model.hasAlert = false}, 3000);
                        }
                    });
            }

        }

        function updateUser(user) {
            userService.updateUser(model.userId, user);
            model.updated = "Profile Updated!";
            model.updatedAlert = true;
            $timeout(function() {model.hasAlert = false}, 3000);
        }

        function removeUser(user) {
            if(user.isAdmin === true) {
                model.error = "Cannot delete Administrator!";
                model.hasAlert = true;
                $timeout(function() {model.hasAlert = false}, 3000);
            } else {
                userService
                    .deleteUser(model.userId)
                    .then(function () {
                        $location.url("/adminList");
                    })
            }
        }
    }

    
})();