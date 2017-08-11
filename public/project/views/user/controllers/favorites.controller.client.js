(function () {

    angular
        .module("omdbApp")
        .controller("favoritesController", favoritesController);

    function favoritesController($routeParams, $location, movieService, userService) {
        var model = this;

        model.userId = $routeParams.userId;

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

            })

    }



})();