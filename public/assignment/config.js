(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            // .when("/", {
            //     templateUrl: "index.html"
            // })
            .when("/home", {
                templateUrl: "views/home.html"
            })

            // User
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"

            })
            .when("/profile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })

            // Website
            .when("/user/:userId/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/edit", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })

            // Page
            .when("/user/:userId/:websiteId/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/edit", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })

            // Widget
            .when("/user/:userId/:websiteId/:pageId/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })

            // NEW STUFF
            .when("/user/:userId/:websiteId/:pageId/widget/new", {
                templateUrl : "views/widget/templates/widget-chooser.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })

            // NEW STUFF
            .when("/user/:userId/:websiteId/:pageId/:widgetId/edit", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/widget/:widgetId/search", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

    }
})();
