(function () {

    angular
        .module("omdbApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, movieService, $window) {

        var model = this;

        model.imdbId = $routeParams.imdbId;
        model.goBack = goBack;

        function init() {
            movieService
                .searchMovieByImdbId(model.imdbId)
                .then(renderMovie);
        }
        init();

        function renderMovie(movie) {

            model.movie = movie;
            
        }
        
        function goBack() {
            $window.history.back();
        }
    }

})();