module.exports = function (app) {

    app.get('/api/user/:userId', findUserById);
    app.get('/api/user', findUserByCredentials);
    app.post('/api/profile', registerUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function registerUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        users.push(user);
        res.send(user);
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
        for(var u in users) {
            var user = users[u];
            if(user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    }

}