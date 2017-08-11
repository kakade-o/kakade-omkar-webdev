(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $sce, widgetService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        
        
        model.trustThisContent = trustThisContent;
        model.getYouTubeUrl = getYouTubeUrl;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
        }
        init();
        
        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
            
        }

        function getYouTubeUrl(link) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var linkParts =  link.split('/');
            var id = linkParts[linkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

    }

})();