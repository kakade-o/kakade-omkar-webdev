(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, flickrService, widgetService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {

        }

        init();

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url = url + "/" + photo.id + "_" + photo.secret + "_b.jpg";

            console.log("controller hit");



            widgetService
                // does the widget exist
                .findWidgetById(model.widgetId)
                .then(function () {
                    // if so, then update it
                    widgetService
                        .updateWidget(model.widgetId, {
                            _id: model.widgetId,
                            url: url,
                            "widgetType": 'IMAGE',
                            "pageId": model.pageId,
                            "width": "100%"
                        })
                        .then(function () {
                            $location.url("/user/" + model.userId + "/" +
                                model.websiteId + "/" + model.pageId + "/" + model.widgetId + "/IMAGE");
                        })
                }, function () {
                    // if not, then create one
                    widgetService
                        .createWidget(model.pageId, {
                            _id: model.widgetId,
                            url: url,
                            "widgetType": 'IMAGE',
                            "pageId": model.pageId,
                            "width": "100%"
                        })
                        .then(function () {
                            // once created, add the changes to it
                            widgetService
                                .updateWidget(model.widgetId, {
                                    _id: model.widgetId,
                                    url: url,
                                    "widgetType": 'IMAGE',
                                    "pageId": model.pageId,
                                    "width": "100%"
                                })
                                .then(function () {
                                    $location.url("/user/" + model.userId + "/" +
                                        model.websiteId + "/" + model.pageId + "/" + model.widgetId + "/IMAGE");
                                })
                        })

                });



            // widgetService
            //     .updateWidget(model.widgetId, {
            //         _id: model.widgetId,
            //         url: url,
            //         "widgetType": 'IMAGE',
            //         "pageId": model.pageId,
            //         "width": "100%"
            //     })
            //     .then(function () {
            //         $location.url("/user/" + model.userId + "/" + model.websiteId
            // + "/" + model.pageId + "/" + model.widgetId + "/IMAGE");
            //     })
        }

    }

})();