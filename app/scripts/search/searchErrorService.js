'use strict';

/**
 * @ngdoc temporary while the API is not ready for validation yet
 * @name ecmsEcmsUiApp.factory:searchErrorService
 * @description Handles errors on search view
 *
 */

angular.module('ecmsEcmsUiApp')
    .service('searchErrorService', function (ERRORS, searchQueryMinLength) {

        var shortQuery = function (input) {
            return (typeof input === 'undefined') || (input.length < searchQueryMinLength.searchQueryMinLength);
        };

        var emptyQuery = function (input) {
            return !input;
        };

        return {
            isValidError: function (errorLabel) {
                for (var key in ERRORS) {
                    if (key === errorLabel) {
                        return true;
                    }
                }
                return false;
            },
            getErrorMessage: function (errorLabel) {
                if (this.isValidError(errorLabel)) {
                    return ERRORS[errorLabel];
                }
                return false;
            },
            checkInput: function (input) {
                if (shortQuery(input)) {
                    return 'shortSearchQuery';
                }
                if (emptyQuery(input)) {
                    return 'emptySearchQuery';
                }

                return true;
            }
        };

    });
