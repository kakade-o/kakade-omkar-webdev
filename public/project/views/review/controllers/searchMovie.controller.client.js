(function () {
    angular
        .module("omdbApp")
        .controller("criticMovieSearchController", criticMovieSearchController);

    function criticMovieSearchController($location, movieService, reviewService, $routeParams, userService, resolveUser, $timeout) {

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
            var temp;

            userService
                .findUserById(model.userId)
                .then(function (user) {
                    var allReviews = user.reviews;
                    var found = false;
                    for(var r in allReviews) {
                        reviewService
                            .findReviewById(model.userId, allReviews[r])
                            .then(function (response) {
                                var review = response.data;

                                if(review.movieId === movieId) {
                                    ///user/review/{{review._id}}/edit
                                    $location.url("/user/review/" + review._id + "/edit");
                                }

                            })
                    }
                    if(!found) {
                        $location.url("/user/review/new/search/" + movieId);
                    }
                })

        }

        function printError() {
            model.errorMessage = "Review for this movie already exists!";
            model.hasAlert = true;
            $timeout(function() {model.hasAlert = false}, 3000);
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