(function () {

    angular
        .module("omdbApp")
        .controller("criticSearchController", criticSearchController);

    function criticSearchController(criticService, $location, $routeParams, userService) {
        var model = this;

        model.userId = $routeParams.userId;
        // model.imdbId = $routeParams.imdbId;

        model.searchCriticByUsername = searchCriticByUsername;
        model.addCritic = addCritic;
        model.toProfile = toProfile;

        function init() {
            criticService
                .findAllCritics()
                .then(function (critics) {
                    model.allCritics = critics;
                })
        }
        init();

        function searchCriticByUsername(criticUsername) {

            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if(user.username == criticUsername) {

                        model.errorMessage = "Cannot search own username";

                    } else {
                        criticService
                            .searchCriticByUsername(criticUsername)
                            .then(renderCritics, function (err) {
                                model.errorMessage = "Critic does not exist";
                            });
                    }
                });
        }

        function renderCritics(critics) {
            model.critics = critics;
        }


        function addCritic(criticId) {

            userService.findUserById(model.userId)
                .then(function (user) {
                    var temp = 0;
                   for(var f in user.following) {
                       if(user.following[f] == criticId) {
                           temp = 1;
                       }
                   }
                   if(temp == 1) {
                       model.errorMessage = "Already following critic";

                   } else {
                       userService
                           .followCritic(model.userId, criticId)
                           .then(function () {

                               $location.url('/user/' + model.userId + '/following');
                           });
                   }

                });
        }

        function toProfile() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if(user.isCritic == true) {
                        $location.url('/criticProfile/' + user._id);
                    }
                    else {
                        $location.url('/profile/' + user._id);
                    }
                })
        }


    }

})();