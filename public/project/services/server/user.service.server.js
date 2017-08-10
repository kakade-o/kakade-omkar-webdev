module.exports = function (app) {

    app.get   ('/api/user/:userId', findUserById);
    app.get   ('/api/user', findUserByCredentials);
    app.post  ('/api/profile', registerUser);
    app.put   ("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;

        for(var u in users) {
            if(users[u]._id === userId) {
                users[u] = user;
                res.send(user);
                return;
            }
        }
        return res.sendStatus(404);
    }

    function registerUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        users.push(user);
        res.send(user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
            }
        }
    }

    function findUserById(req, res) {
        var userId = req.params[ 'userId'];
        var user = users.find(function (user) {
           return user._id === userId;
        });

        res.send(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        //console.log([username, password]);
        if(username && password) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username &&
                    user.password === password) {
                    res.json(user);
                    return;
                }
            }
            res.sendStatus(404);

        } else if(username) {
            for(u in users) {
                if(users[u].username === username) {
                    //return users[u];
                    res.send(users[u]);
                    return;
                }
            }
            res.send("0");
        }

    }

}