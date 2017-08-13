(function () {
    angular
        .module("omdbApp")
        .controller("userDetailsController", userDetailsController);

    function userDetailsController($location, movieService, $routeParams, userService) {
       var model = this;

        model.userId = $routeParams.userId;
        model.imdbId = $routeParams.imdbId;

        model.makeFavorite = makeFavorite;
        model.toProfile = toProfile;
        model.createComment = createComment;

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
                .makeFavorite(model.userId, model.imdbId)
                .then(function () {
                    model.liked = "Added to Favorites!";
                })

        }

        function createComment() {
            userService
                .createComment(model.userId, model.imdbId);
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