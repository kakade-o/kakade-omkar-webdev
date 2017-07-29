(function () {

    angular
        .module("WebAppMaker")
        .directive('wdDraggable', wdDraggable);

    function wdDraggable() {

        function linkFunction(scope, element, attrs) {
            element.sortable({
                axis: 'y',
                handle: ".ok-sort-handle",
                tolerance: 'touch',
                start: function(event, ui) {
                    console.log(ui.item.index());
                },
                stop: function(event, ui) {
                    console.log(ui.item.index());
                }
            });
        }

        return {
            link: linkFunction
        }

    }

})();