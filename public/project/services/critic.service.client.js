(function () {

    angular
        .module("omdbApp")
        .service("criticService", criticService);


    function criticService($http) {

        this.searchCriticByUsername = searchCriticByUsername;
        // this.searchCriticByReviewerId = searchCriticByReviewerId;

        function searchCriticByUsername(criticUsername) {
            var url = "/api/project/criticSearch/" + criticUsername;
            return $http.get(url)
                .then(function (response) {
                    if (response.data.isCritic === true) {
                        var critics = response.data
                        return critics;
                    }
                    else {
                        return (err);
                    }
                })
        }

        // function searchMovieByImdbId(imdbId) {
        //     var url = "http://www.omdbapi.com/?i="+imdbId+"&apikey=1e793951";
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         })
        // }
    }


})();