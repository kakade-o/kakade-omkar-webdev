(function () {

    angular
        .module("WebAppMaker")
        .directive('wdDraggable', wdDraggable);

    function wdDraggable($http) {

        function linkFunction(scope, element, attrs) {
            var startIndex = -1;
            var endIndex = -1;
            element.sortable({
                axis: 'y',
                handle: ".ok-sort-handle",
                tolerance: 'touch',
                start: function(event, ui) {
                    //console.log(ui.item.index());
                    startIndex = ui.item.index();
                },
                stop: function(event, ui) {
                    //console.log(ui.item.index());
                    endIndex = ui.item.index();
                    $http.put("/api/page/"+scope.model.pageId+"/widget?initial="+startIndex+"&final="+endIndex);
                }

            });
        }

        return {
            link: linkFunction
        }

    }

})();