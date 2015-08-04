'use strict';

angular.module('ecmsEcmsUiApp')
    .filter('capitalizeFirstLetter', function () {
        return function (input) {
            if (input !== null) {
                return input.substring(0, 1).toUpperCase() + input.substring(1);
            }
            return '';
        };
    })
    .filter('range', function () {
    return function (pages, total) {
        total = parseInt(total);
        var input = [];
        for (var i = 1; i <= total; i++) {
            input.push(i);
        }
        return input;
    };
});
