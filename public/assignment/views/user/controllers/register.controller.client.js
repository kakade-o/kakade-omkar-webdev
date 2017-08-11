(function() {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {

        var model = this;

        // model.registerUser = function registerUser(user) {
        //
        //     userService
        //         .findUserByUsername(user.username)
        //         .then(register, handleError);
        //
        //     function handleError(error) {
        //         model.error = "User already exists. Please use another username.";
        //     }
        //
        //     function register(new_user) {
        //         if(!new_user) {
        //              if(new_user.password !== new_user.password2) {
        //                  model.error = "Passwords must match!";
        //              } else {
        //                  var user = userService.registerUser(user);
        //                  $location.url("/profile/" + new_user._id)
        //              }
        //
        //          } else {
        //              model.error = "User already exists";
        //          }
        //     }
        //
        // }

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

        // function registerUser(user) {
        //     var promise =
        //
        //      var _user = userService.findUserByUsername(user.username);
        //      if(!_user) {
        //          if(user.password !== user.password2) {
        //              model.error = "Passwords must match!";
        //          } else {
        //              var user = userService.registerUser(user);
        //              $location.url("/profile/" + user._id)
        //          }
        //
        //      } else {
        //          model.error = "User already exists";
        //      }
        //
        // }

    }

})();