'use strict';

/**
 * @ngdoc directive
 * @name ecmsEcmsUiApp.directive:ecmsEcmsUiApp
 * Expand textarea height to fit the content, but don't shrink below the initial height.
 * <textarea fit-content-input=""></textarea>
 */
angular.module('ecmsEcmsUiApp').directive('fitContentInput', function($timeout) {

    return function(scope, iElem) {
        var defaultHeight = iElem[0].scrollHeight + 'px';

        function setHeight() {
            iElem[0].style.height = '0'; //encourage shrinkage.
            if (iElem[0].scrollHeight > parseInt(defaultHeight)) {
                iElem[0].style.height = iElem[0].scrollHeight + 10 + 'px';
            } else {
                iElem[0].style.height = defaultHeight;
            }
        }

        $timeout(setHeight,1);
        iElem.bind('keyup', setHeight);
        scope.$on('updateSearchInputHeight', function(){
            $timeout(setHeight,100);
        });
    };
});
