module.exports = function (app) {
    require("./services/user.service.server.js")(app);

    app.get('/hello', sayHello);

    function sayHello(req, res) {
        res.send("Hola senòr");
    }

};