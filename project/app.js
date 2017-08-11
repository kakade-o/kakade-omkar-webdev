module.exports = function(app) {
    require("./services/user.service.server.js")(app);

    app.get('/project/hello', sayHello);

    function sayHello(req, res) {
        res.send("Hello");
    }

};