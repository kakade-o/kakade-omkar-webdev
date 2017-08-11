(function () {

    angular
        .module("omdbApp")
        .controller("userSearchController", userSearchController);

    function userSearchController($location, movieService, $routeParams) {

        var model = this;

        model.userId = $routeParams.userId;

        model.searchMovieByTitle = searchMovieByTitle;

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }
    }

})();