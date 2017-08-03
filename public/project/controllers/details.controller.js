(function () {

    angular
        .module("omdbApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, movieService) {

        var model = this;

        model.imdbId = $routeParams.imdbId;

        function init() {
            movieService
                .searchMovieByImdbId(model.imdbId)
                .then(renderMovie);
        }
        init();

        function renderMovie(movie) {

            model.movie = movie;
            
        }
    }

})();