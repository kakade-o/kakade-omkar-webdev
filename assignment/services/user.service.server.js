module.exports = function (app) {

    var userModel = require("../model/user/user.model.server");

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

        userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

    }

    function registerUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            })

    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            })

    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            })

    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        //console.log([username, password]);

        if(username && password) {

            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    res.json(user);
                    return;
                }, function (err) {
                    res.sendStatus(404).send(err);
                    return;
                });

            return;

        } else if(username) {

            userModel.findUserByUsername(username)
                .then(function (user) {
                    res.json(user);
                })

        }

    }

};