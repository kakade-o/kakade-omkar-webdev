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
                templateUrl: "views/user/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"

            })
            .when("/profile/:userId", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })

            // Website
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/edit", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })

            // Page
            .when("/user/:userId/:websiteId/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/edit", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })

            // Widget
            .when("/user/:userId/:websiteId/:pageId/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/widget/new/header", {
                templateUrl: "views/widget/widget-heading.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/widget/new/image", {
                templateUrl: "views/widget/widget-image.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/widget/new/youtube", {
                templateUrl: "views/widget/widget-youtube.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/widget/new/html", {
                templateUrl : "views/widget/widget-html.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })
                //#!/user/{{model.userId}}/{{model.websiteId}}/{{model.pageId}}/{{widget._id}}/HEADER
            .when("/user/:userId/:websiteId/:pageId/:widgetId/HEADER", {
                templateUrl: "views/widget/widget-edit-heading.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/:widgetId/IMAGE", {
                templateUrl: "views/widget/widget-edit-image.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/:widgetId/YOUTUBE", {
                templateUrl: "views/widget/widget-edit-youtube.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })

            .when("/user/:userId/:websiteId/:pageId/:widgetId/HTML", {
                templateUrl: "views/widget/widget-edit-html.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })

    }
})();
