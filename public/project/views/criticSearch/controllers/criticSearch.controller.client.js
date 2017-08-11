(function () {

    angular
        .module("omdbApp")
        .controller("criticSearchController", criticSearchController);

    function criticSearchController(criticService, $location, $routeParams, userService) {
        var model = this;

        model.userId = $routeParams.userId;
        // model.imdbId = $routeParams.imdbId;

        model.searchCriticByUsername = searchCriticByUsername;
        model.addCritic = addCritic;

        function init() {

        }
        init();

        function searchCriticByUsername(criticUsername) {
            criticService
                .searchCriticByUsername(criticUsername)
                .then(renderCritics);
        }

        function renderCritics(critics) {
            console.log("inside renderCritics");
            model.critics = critics;
            console.log(critics);
        }


        function addCritic(criticId) {
            userService
                .followCritic(model.userId, criticId);

        }
    }

})();