(function () {
    angular
        .module("omdbApp")
        .factory("userService", userService);

    
    function userService($http) {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "findUserByUsername": findUserByUsername,
            "deleteUser": deleteUser,
            "makeFavorite": makeFavorite,
            "followCritic": followCritic,
            "deleteMovie": deleteMovie
            //"createComment": createComment
        };

        return api;

        // Deletes an existing user
        function deleteUser(userId) {

            var url = "/api/project/user/" + userId;
            return $http.delete(url);

        }

        // updates the info of an existing user
        function updateUser(userId, user) {

            var url = "/api/project/user/" + userId;

            return $http.put(url, user);

        }

        // Finds user by username only
        function findUserByUsername(username) {

            var url = "/api/project/user?username=" + username;
            return $http.get(url);

        }

        // Registers a new user
        function registerUser(user) {

            var url = "/api/project/profile";

            return $http.post(url, user);

        }

        // Finds user by username and password
        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


        }

        // Finds the user by ID
        function findUserById(userId) {

            var url = "/api/project/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function makeFavorite(userId, imdbId) {
            var url = "/api/project/user/" + userId + "/imdb/" + imdbId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function followCritic(userId, criticId) {
            var url = "/api/project/user/" + userId + "/criticSearch/" + criticId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function deleteMovie(userId, imdbId) {
            var url = "/api/project/user/" + userId + "/imdb/" + imdbId;
            return $http.delete(url);
        }

        // function createComment(userId, movieId) {
        //     var url = "/api/project/user/" + userId + "/imdb/" + movieId + "/comment";
        //
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         })
        //
        // }

        
    }
    
})();