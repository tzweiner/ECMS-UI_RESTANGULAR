'use strict';

describe('Service: searchErrorService', function () {

    var service,
        errors,
        minLength;

    // load the controller's module
    beforeEach(module('ecmsEcmsUiApp'));

    beforeEach(inject(function ($injector) {
        service = $injector.get('searchErrorService');
        errors = $injector.get('ERRORS');
        minLength = $injector.get('searchQueryMinLength');
    }));

    describe ('isValidError', function () {
        it('should return false', function () {
            var errorLabel = '123';

            expect(service.isValidError(errorLabel)).toBeFalsy();
        });

        it('should return true', function () {
            var errorLabel = 'badHeaders';

            expect(service.isValidError(errorLabel)).toBeTruthy();
        });

        it('should return true', function () {
            var errorLabel = 'noResultsFound';

            expect(service.isValidError(errorLabel)).toBeTruthy();
        });

        it('should return true', function () {
            var errorLabel = 'invalidSearchQuery';

            expect(service.isValidError(errorLabel)).toBeTruthy();
        });

        it('should return true', function () {
            var errorLabel = 'shortSearchQuery';

            expect(service.isValidError(errorLabel)).toBeTruthy();
        });

        it('should return true', function () {
            var errorLabel = 'emptySearchQuery';

            expect(service.isValidError(errorLabel)).toBeTruthy();
        });
    });

    describe ('getErrorMessage', function () {
        it('should return false', function () {
            var errorLabel = '123';

            expect(service.getErrorMessage(errorLabel)).toBeFalsy();
        });

        it('should return true', function () {
            var errorLabel = 'badHeaders';

            expect(service.getErrorMessage(errorLabel)).toEqual('Bad headers returned.');
        });

        it('should return header message', function () {
            var errorLabel = 'noResultsFound';

            expect(service.getErrorMessage(errorLabel)).toEqual('No search results.');
        });

        it('should return header message', function () {
            var errorLabel = 'invalidSearchQuery';

            expect(service.getErrorMessage(errorLabel)).toEqual('Invalid search query.');
        });

        it('should return header message', function () {
            var errorLabel = 'shortSearchQuery';

            expect(service.getErrorMessage(errorLabel)).toEqual('Please enter a search query at least 3 characters long.');
        });

        it('should return header message', function () {
            var errorLabel = 'emptySearchQuery';

            expect(service.getErrorMessage(errorLabel)).toEqual('Please enter a search query.');
        });

    });

});
