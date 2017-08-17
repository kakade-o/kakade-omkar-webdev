(function () {

    angular
        .module("omdbApp")
        .controller("userSearchController", userSearchController);

    function userSearchController($location, movieService, $routeParams, userService, resolveUser) {

        var model = this;

        model.userId = resolveUser._id;//$routeParams.userId;

        model.searchMovieByTitle = searchMovieByTitle;
        model.toProfile = toProfile;

        model.movieTitle = $routeParams.movieTitle;

        function init() {

            if (model.movieTitle == 'undefined') {
                model.movieTitle = "";

            } else {
                searchMovieByTitle(model.movieTitle)
            }

        }

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(function (movies) {
                    renderMovies(movies, movieTitle);
                });
        }

        function renderMovies(movies, title) {
            model.movies = movies;
            //$location.url("/user/search/" + title +"/searchMovie");
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