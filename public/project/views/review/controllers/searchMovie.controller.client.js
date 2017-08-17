(function () {
    angular
        .module("omdbApp")
        .controller("criticSearchController", criticSearchController);

    function criticSearchController($location, movieService, $routeParams, userService, resolveUser) {

        var model = this;

        model.userId = resolveUser._id;

        model.searchMovieByTitle = searchMovieByTitle;
        model.toProfile = toProfile;
        model.checkForExistingReview = checkForExistingReview;

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(function (movies) {
                    renderMovies(movies, movieTitle);
                });
        }

        function renderMovies(movies, title) {
            model.movies = movies;

            userService
                .findUserById(model.userId)
                .then(function (user) {
                    console.log(user);
                })

            //$location.url("/user/search/" + title +"/searchMovie");
        }

        function checkForExistingReview(movieId) {
            //href="#!/user/review/new/search/{{movie.imdbID}}"
            userService
                .findUserById(model.userId)
                .then(function (user) {

                    var allReviews = user.reviews;
                    for(var r in allReviews) {
                        console.log(allReviews[r]);
                    }
                })
        }

        function toProfile() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if (user.isCritic == true) {
                        $location.url('/criticProfile');
                    }
                    else {
                        $location.url('/profile');
                    }
                })
        }

    }

})();