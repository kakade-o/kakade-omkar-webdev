(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            // "findUserByUsername": finuUserByUsername

        };

        return api;



        function registerUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByUsernameAndPassword(username, password) {

            for(var u in users) {
                var _user = users[u];
                if(_user.username === username && _user.password === password) {
                    //$scope.welcomeUser = _user;
                    return _user;
                }
            }
            return null;
        }

    }
})();