(function () {

    angular
        .module("omdbApp")
        .controller("userSearchController", userSearchController);

    function userSearchController($location, movieService, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams.userId;

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
                        $location.url('/criticProfile/' + user._id);
                    }
                    else {
                        $location.url('/profile/' + user._id);
                    }
                })
        }
    }

})();