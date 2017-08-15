(function () {

    angular
        .module("omdbApp")
        .controller("favoritesController", favoritesController);

    function favoritesController($routeParams, $location, movieService, userService) {
        var model = this;

        model.userId = $routeParams.userId;

        model.movieArray = [];

        model.deleteMovie = deleteMovie;
        model.toProfile = toProfile;

        function init() {
            model.movieArray = [];
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    var movieIds = user.favorites;
                    for(var id in movieIds) {
                        movieService
                            .searchMovieByImdbId(movieIds[id])
                            .then(function (movie) {
                                model.movieArray.push(movie);

                            });
                    }

                });
        }

        init();

        function deleteMovie(imdbId) {
            userService
                .deleteMovie(model.userId, imdbId)
                .then(function (status) {
                    init();
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