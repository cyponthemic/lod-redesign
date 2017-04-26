(function () {
    'use strict';

    // This helper adds a class that shows a loading state.
    angular
        .module('LOD')
        .directive('ngMainNav', ngMainNav);


    function ngMainNav() {
        var directive = {
            link: link,
            restrict: 'A',
            controller: ngMainNavController,
            controllerAs: 'mnc',
            bindToController: true
        };
        function link(scope, element, attrs, model) {
            console.log('main nav is loaded');
            $(window).on('scroll',function(){
                var scrollPosition = window.pageYOffset,
                    scrollClass = 'has-scrolled';
                if(scrollPosition>200){
                    $(element).addClass(scrollClass);
                }else {
                    $(element).removeClass(scrollClass);
                }
            })
        }
        return directive;
    }

    ngMainNavController.$inject = ['$scope'];

    function ngMainNavController($scope) {
        var mnc = this;

    }
})();
