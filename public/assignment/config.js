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
                templateUrl: "views/website/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })

    }
})();
