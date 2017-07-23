(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService)
    
    function userService() {

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
            "deleteUser": deleteUser
        };

        return api;

        // Deletes an existing user
        function deleteUser(userId) {
            for (var u in users) {
                if(users[u]._id === userId) {
                    users.splice(u, 1);
                }
            }
        }

        // updates the info of an existing user
        function updateUser(userId, user) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    users[u] = user;
                    return;
                }
            }
            return null;
        }

        // Finds user by username only
        function findUserByUsername(username) {
            for(u in users) {
                if(users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }

        // Registers a new user
        function registerUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        // Finds user by username and password
        function findUserByCredentials(username, password) {
            for (var u in users) {
                var _user = users[u];
                if(_user.username === username && _user.password === password) {
                    return _user;
                }

            }
            return null;

        }

        // Finds the user by ID
        function findUserById(userId) {

            for(u in users) {
                if(users[u]._id === userId) {
                    return users[u];
                }
            }
            return null;

        }
        
    }
    
})();