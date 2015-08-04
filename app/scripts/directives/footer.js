'use strict';

/**
 * @ngdoc function
 * @name ecmsEcmsUiApp.directive:footer
 */

angular.module('ecmsEcmsUiApp')
    .directive('footer', function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'templates/footer.html'
        };
    });
