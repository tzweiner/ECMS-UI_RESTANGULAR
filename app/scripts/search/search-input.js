'use strict';

/**
 * @ngdoc function
 * @name ecmsEcmsUiApp.controller:SearchCtrl
 * @description
 * Controller of the ecmsEcmsUiApp search page
 */
angular.module('ecmsEcmsUiApp')
    .controller('SearchInputCtrl', function ($scope,
                                             $rootScope) {

        /**
         * Clears login form of any input
         * This is called on click inside an input box, like after an error
         */
        $scope.clearForm = function () {
            $rootScope.state.searchQuery = '';
            $rootScope.state.errorMessage = '';
            $rootScope.state.errorBox = null;
            $scope.clearDocument();
            if ($rootScope.state.currentView === 'search.input') {
                $scope.clearSearchResults();
            }
            $rootScope.$broadcast('updateSearchInputHeight');
        };


        /**
         * When hitting enter/return in search field, submit form.
         * @param $event
         * @param search query
         */
        $scope.submitOnEnterKey = function ($event, searchQueryInput) {
            if ($event.keyCode === 13) {    // on Enter key
                $event.preventDefault();
                $scope.submitQuery(searchQueryInput);
            }
        };


    });
