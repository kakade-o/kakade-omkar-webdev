(function () {

    angular
        .module("omdbApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider

        // API Tests
            .when("/", {
                templateUrl: "views/omdb/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbId", {
                templateUrl: "views/omdb/templates/details.html",
                controller: "detailsController",
                controllerAs: "model"
            })

            .when("/:movieTitle/searchMovie", {
                templateUrl: "views/omdb/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })


            // Critic Search
            .when("/user/criticSearch", {
                templateUrl: "views/criticSearch/templates/criticSearch.view.client.html",
                controller: "criticSearchController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            //Review List and Details for User

            .when("/user/criticReviewList/:reviewerId", {
                templateUrl: "views/criticReviewList/templates/reviewList.view.client.html",
                controller: "reviewListController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            .when("/user/criticReviewList/:reviewerId/details/:reviewId", {
                templateUrl: "views/criticReviewList/templates/reviewDetails.view.client.html",
                controller: "reviewListController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            // Admin
            .when("/adminList", {
                templateUrl: "views/user/templates/adminListOfUsers.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            .when("/adminList/newUser", {
                templateUrl: "views/user/templates/adminCreateNewUser.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            .when("/adminList/user/edit", {
                templateUrl: "views/user/templates/adminEditUser.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            // User
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"


            })
            .when("/profile/", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"

            })


            .when("/user/following", {
                templateUrl: "views/user/templates/following.view.client.html",
                controller: "followingController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }

            })

            .when("/user/favorites", {
                templateUrl: "views/user/templates/favorites.view.client.html",
                controller: "favoritesController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })


            //Critic User
            .when("/criticProfile", {
                templateUrl: "views/user/templates/criticProfile.view.client.html",
                controller: "criticProfileController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            .when("/user/search", {
                templateUrl: "views/search/templates/search_movie.view.client.html",
                controller: "userSearchController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            .when("/user/search/:movieTitle/searchMovie", {
                templateUrl: "views/search/templates/search_movie.view.client.html",
                controller: "userSearchController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            .when("/user/details/:imdbId", {
                templateUrl: "views/search/templates/details_movie.view.client.html",
                controller: "userDetailsController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })


            //Review
            .when("/user/review", {
                templateUrl: "views/review/templates/review-list.view.client.html",
                controller: "reviewListController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            .when("/user/review/new", {
                templateUrl: "views/review/templates/review-new.view.client.html",
                controller: "reviewNewController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })

            .when("/user/review/:reviewId/edit", {
                templateUrl: "views/review/templates/review-edit.view.client.html",
                controller: "reviewEditController",
                controllerAs: "model",
                resolve: {
                    resolveUser: checkLogin
                }
            })


    }

    function checkLogin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url("/login")

                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();