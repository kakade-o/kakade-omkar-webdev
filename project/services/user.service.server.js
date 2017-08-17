module.exports = function (app) {

    //Passport
    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var userModel = require("../model/user/user.model.server");


    app.get('/api/project/user/:userId', findUserById);
    app.get('/api/project/user', findUserByCredentials);
    app.post('/api/project/profile', registerUser);
    app.put("/api/project/user/:userId", updateUser);
    app.get("/api/project/user/:userId/imdb/:imdbId", addMovie);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get("/api/project/user/:userId/criticSearch/:criticId", followCritic);
    app.delete("/api/project/user/:userId/imdb/:imdbId", deleteMovie);


    app.post  ("/api/project/user", passport.authenticate('local'), login);
    app.get   ("/api/project/checkLogin", checkLogin);

    app.post("/api/project/user", passport.authenticate('local'), login);
    app.get("/api/project/checkLogin", checkLogin);


    // app.post  ('/api/project/user', findUser);
    // app.get   ("/api/project/allUsers", findAllUsers);

    app.post("/api/project/user", passport.authenticate('local'), login);
    app.get("/api/project/checkLogin", checkLogin);


    app.get   ("/api/project/allUsers", findAllUsers);

    app.get("/api/project/allUsers", findAllUsers);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/auth/google", passport.authenticate('google', { scope : ['profile'] }));
    app.get('https://kakade-omkar-webdev.herokuapp.com/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#!/profile',
            failureRedirect: '/project/index.html#!/login'
        }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#!/profile',
            failureRedirect: '/project/index.html#!/login'
        }));
    app.get("/auth/google", function (req, res) {
        console.log("logging in with Google");
    });

    //app.get   ("/api/project/user/:userId/imdb/:imdbId/comment", createComment);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    //Google Config for Passport

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    console.log(googleConfig);

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        // var email = profile.emails[0].value;
                        // var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  profile.displayname,
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            // email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    //Logout for Passport
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    //Check Login for Passport
    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    //Local Strategy Function for Passport

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    //Passport Implementation

    function login(req, res) {
        var user = req.user;
        res.json(user);


        // var body = req.body;
        // var username = body.username;
        // var password = body.password;
        //
        // if(username && password) {
        //     userModel
        //         .findUserByCredentials(username, password)
        //         .then(function (user) {
        //             res.json(user);
        //             return;
        //         }, function (err) {
        //             res.sendStatus(404).send(err);
        //             return;
        //         });
        //
        //     // for(var u in users) {
        //     //     var user = users[u];
        //     //     if(user.username === username &&
        //     //         user.password === password) {
        //     //         res.json(user);
        //     //         return;
        //     //     }
        //     // }
        //     // res.sendStatus(404);
        //     return;
        //
        // } else if(username) {
        //
        //     // for(u in users) {
        //     //     if(users[u].username === username) {
        //     //         //return users[u];
        //     //         res.send(users[u]);
        //     //         return;
        //     //     }
        //     // }
        //
        //     userModel.findUserByUsername(username)
        //         .then(function (user) {
        //             res.json(user);
        //         });
        // }

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

    function addMovie(req, res) {
        var userId = req.params.userId;
        var imdbId = req.params.imdbId;
        userModel
            .addMovie(userId, imdbId)
            .then(function (status) {
                res.json(status);
            })

    }

    function deleteMovie(req, res) {
        var userId = req.params.userId;
        var imdbId = req.params.imdbId;
        userModel
            .deleteMovie(userId, imdbId)
            .then(function (status) {
                res.sendStatus(200);
            })

    }

    function followCritic(req, res) {
        var userId = req.params.userId;
        var criticId = req.params.criticId;
        userModel
            .addCritic(userId, criticId)
            .then(function (status) {
                res.json(status);
            })

    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            })
    }


    // function createComment(req, res) {
    //     var userId = req.params.userId;
    //     var imdbId = req.params.imdbId;
    //
    //     userModel
    //         .findUserById(userId)
    //         .then(function (user) {
    //             var temp = 0;
    //             for(var c in user.comments) {
    //                 if(user.comments[c].movieId == imdbId) {
    //                     temp = 1;
    //
    //                 }
    //             }
    //             res.send(temp);
    //         })
    // }


    function registerUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
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


//OLD IMPLEMENTATION


    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if (username && password) {
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

        } else if (username) {

            // for(u in users) {
            //     if(users[u].username === username) {
            //         //return users[u];
            //         res.send(users[u]);
            //         return;
            //     }
            // }

            userModel.findUserByUsername(username)
                .then(function (user) {
                    res.json(user);
                });
        }

    }


//Passport Serializing functions

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

};