(function () {

    angular
        .module("WebAppMaker")
        .service("flickrService", flickrService);

    
    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "0a0a1bf3d5f180d70097ba2614130761";
        var secret = "25b50ad462437b2c";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        console.log("service hit");

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }

})();