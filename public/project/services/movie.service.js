(function () {

    angular
        .module("omdbApp")
        .service("movieService", movieService);


    function movieService($http) {

        this.searchMovieByTitle = searchMovieByTitle;
        this.searchMovieByImdbId = searchMovieByImdbId;

        function searchMovieByTitle(movieTitle) {
            var url = "http://www.omdbapi.com/?s="+movieTitle+"&apikey=1e793951";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchMovieByImdbId(imdbId) {
            var url = "http://www.omdbapi.com/?i="+imdbId+"&apikey=1e793951";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }


})();