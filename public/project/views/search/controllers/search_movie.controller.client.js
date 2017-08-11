(function () {

    angular
        .module("omdbApp")
        .controller("userSearchController", userSearchController);

    function userSearchController($location, movieService) {

        var model = this;

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