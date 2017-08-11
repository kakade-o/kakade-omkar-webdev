(function () {
    angular
        .module("omdbApp")
        .controller("userDetailsController", userDetailsController);

    function userDetailsController(movieService, $routeParams, userService) {
       var model = this;

        model.userId = $routeParams.userId;
        model.imdbId = $routeParams.imdbId;

        model.makeFavorite = makeFavorite;

        function init() {
            movieService
                .searchMovieByImdbId(model.imdbId)
                .then(renderMovie);
        }
        init();

        function renderMovie(movie) {
            model.movie = movie;
            console.log(model.movie);

        }

        function makeFavorite() {
            userService
                .makeFavorite(model.userId, model.imdbId);
        }


    }

})();