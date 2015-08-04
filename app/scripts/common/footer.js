'use strict';

/**
 * @ngdoc function
 * @name ecmsEcmsUiApp.controller:FooterCtrl
 * @description Controller of the footer
 */
angular.module('ecmsEcmsUiApp')
    .controller('FooterCtrl', function ($scope, ecmsSession, $state, FOOTER_LINKS) {

        $scope.links = FOOTER_LINKS;

        $scope.showLink = function (routeName) {

            if ($scope.isExternal(routeName)) {
                return true;
            }

            var routeObj = $state.get(routeName);
            if (routeObj.module === 'private' && !ecmsSession.getSession()) {
                return false;
            }
            return true;
        };

        $scope.isExternal = function (link) {
            return link.indexOf('http') > -1;
        };

    });
