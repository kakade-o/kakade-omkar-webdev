module.exports = function (app) {

    var userModel = require("../model/user/user.model.server");
    var passport = require("passport");
    var LocalStrategy = require("passport-local").Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get   ('/api/user/:userId', findUserById);
    app.get   ('/api/user', findUserByCredentials);
    app.post  ('/api/profile', registerUser);
    app.put   ("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    app.post  ('/api/login', passport.authenticate('local'), login);

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];
    
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(!user) {
                    return done(null, false);
                }
                return done(null, user);
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
    }
    
    function login(req, res) {
        var user = req.user;
        res.json(user);

    }
    
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

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

        // for(var u in users) {
        //     if(users[u]._id === userId) {
        //         users[u] = user;
        //         res.send(user);
        //         return;
        //     }
        // }
        // return res.sendStatus(404);
    }

    function registerUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(err);
            })
        // user._id = (new Date()).getTime() + "";
        // users.push(user);
        // res.send(user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            })

        // for (var u in users) {
        //     if(users[u]._id === userId) {
        //         users.splice(u, 1);
        //         res.sendStatus(200);
        //     }
        // }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            })
        
        // var user = users.find(function (user) {
        //    return user._id === userId;
        // });
        //
        // res.send(user);
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

            // for(var u in users) {
            //     var user = users[u];
            //     if(user.username === username &&
            //         user.password === password) {
            //         res.json(user);
            //         return;
            //     }
            // }
            // res.sendStatus(404);
            return;
        } else if(username) {
            userModel.findUserByUsername(username)
                .then(function (user) {
                    res.send(user);
                });
            // for(var u in users) {
            //     if(users[u].username === username) {
            //         res.send(users[u]);
            //         return;
            //     }
            // }
            res.send("0");
        }

    }

};