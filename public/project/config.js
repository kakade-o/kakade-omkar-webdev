(function () {
    
    angular
        .module("omdbApp")
        .config(configuration);
    
    function configuration($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "omdb/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbId", {
                templateUrl: "omdb/details.html",
                controller: "detailsController",
                controllerAs : "model"
            })

    }
    
})();