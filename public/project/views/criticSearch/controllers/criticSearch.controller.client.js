(function () {

    angular
        .module("omdbApp")
        .controller("criticSearchController", criticSearchController);

    function criticSearchController(criticService) {
        var model = this;

        model.searchCriticByUsername = searchCriticByUsername;

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
    }

})();