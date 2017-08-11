module.exports = function (app) {

    var userModel = require("../model/user/user.model.server");

    app.get   ('/api/project/criticSearch/:criticUsername', findCriticByUsername);
    // app.get   ('/api/project/user', findUserByCredentials);
    // app.post  ('/api/project/profile', registerUser);
    // app.put   ("/api/project/user/:userId", updateUser);
    // app.delete("/api/project/user/:userId", deleteUser);

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];



    function findCriticByUsername(req, res) {
        var userId = req.params.userId;
        var criticUsername = req.params.criticUsername;

        userModel
            .findCriticByUsername(criticUsername)
            .then(function (user) {
                res.json(user);
            })

        // var user = users.find(function (user) {
        //    return user._id === userId;
        // });
        //
        // res.send(user);
    }












    // function updateUser(req, res) {
    //     var userId = req.params.userId;
    //     var user = req.body;
    //
    //     userModel
    //         .updateUser(userId, user)
    //         .then(function (status) {
    //             res.json(status);
    //         }, function (err) {
    //             res.sendStatus(404).send(err);
    //         });
    //
    //     // for(var u in users) {
    //     //     if(users[u]._id === userId) {
    //     //         users[u] = user;
    //     //         res.send(user);
    //     //         return;
    //     //     }
    //     // }
    //     // return res.sendStatus(404);
    // }
    //
    // function registerUser(req, res) {
    //     var user = req.body;
    //     userModel
    //         .createUser(user)
    //         .then(function (user) {
    //             res.json(user);
    //         })
    //     // user._id = (new Date()).getTime() + "";
    //     // users.push(user);
    //     // res.send(user);
    // }
    //
    // function deleteUser(req, res) {
    //     var userId = req.params.userId;
    //
    //     userModel
    //         .deleteUser(userId)
    //         .then(function (status) {
    //             res.sendStatus(200);
    //         })
    //
    //     // for (var u in users) {
    //     //     if(users[u]._id === userId) {
    //     //         users.splice(u, 1);
    //     //         res.sendStatus(200);
    //     //     }
    //     // }
    // }
    //
    // function findUserById(req, res) {
    //     var userId = req.params.userId;
    //
    //     userModel
    //         .findUserById(userId)
    //         .then(function (user) {
    //             res.json(user);
    //         })
    //
    //     // var user = users.find(function (user) {
    //     //    return user._id === userId;
    //     // });
    //     //
    //     // res.send(user);
    // }
    //
    // function findUserByCredentials(req, res) {
    //     var username = req.query['username'];
    //     var password = req.query['password'];
    //
    //     if(username && password) {
    //         userModel
    //             .findUserByCredentials(username, password)
    //             .then(function (user) {
    //                 res.json(user);
    //                 return;
    //             }, function (err) {
    //                 res.sendStatus(404).send(err);
    //                 return;
    //             });
    //
    //         // for(var u in users) {
    //         //     var user = users[u];
    //         //     if(user.username === username &&
    //         //         user.password === password) {
    //         //         res.json(user);
    //         //         return;
    //         //     }
    //         // }
    //         // res.sendStatus(404);
    //         return;
    //
    //     } else if(username) {
    //
    //         // for(u in users) {
    //         //     if(users[u].username === username) {
    //         //         //return users[u];
    //         //         res.send(users[u]);
    //         //         return;
    //         //     }
    //         // }
    //
    //         userModel.findUserByUsername(username)
    //             .then(function (user) {
    //                 res.json(user);
    //             });
    //     }
    //
    // }

};