module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);

    app.get("/api/session/:name/:value",
        function (req, res) {
            var name = req.params.name;
            var value = req.params.value;
            req.session[name] = {name: value};
            console.log(req.session);
            res.send(req.session);
    });

    // app.get('/hello', sayHello);
    //
    // function sayHello(req, res) {
    //     res.send("Hola senòr");
    // }
};


