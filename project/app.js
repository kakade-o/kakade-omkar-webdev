module.exports = function (app) {
    require("./services/user.service.server.js")(app);

    app.get("/api/project/session/:name/:value",
        function (req, res) {
            var name = req.params.name;
            var value = req.params.value;
            req.session[name] = {name: value};
            console.log(req.session);
            res.send(req.session);
        });

};