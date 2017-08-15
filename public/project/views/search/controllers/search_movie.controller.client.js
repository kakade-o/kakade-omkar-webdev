(function () {

    angular
        .module("omdbApp")
        .controller("userSearchController", userSearchController);

    function userSearchController($location, movieService, $routeParams, userService, resolveUser) {

        var model = this;

        model.userId = resolveUser._id;//$routeParams.userId;

        model.searchMovieByTitle = searchMovieByTitle;
        model.toProfile = toProfile;

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }

        function toProfile() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if(user.isCritic == true) {
                        $location.url('/criticProfile');
                    }
                    else {
                        $location.url('/profile');
                    }
                })
        }
    }

})();