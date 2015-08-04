'use strict';

describe('Controller: DocCtrl', function () {

    var rootScope,
        EditorCtrl,
        scope,
        mockId = 'LOUICALOUICA272014100163A31C79DDB5819CD9EE499EF4A21977Newalterationsatpotentiallyreg',
        state,
        getDocumentService,
        updateDocumentService,
        authService;

    // load the controller's module
    beforeEach(module('ecmsEcmsUiApp'));

    /**
     * 4/09/2015
     * The following block is necessary because currently $urlRouterProvider interferes with
     * $httpBackend unit test. This may become obsolete with future updates
     * @link https://github.com/meanjs/mean/issues/198
     * @link http://stackoverflow.com/questions/23655307/ui-router-interfers-with-httpbackend-unit-test-angular-js/23670198#23670198
     */
    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise(function () {
            return false;
        });
    }));

    // Inject the mock providers
    beforeEach(inject(function ($controller,
                                $rootScope,
                                $state,
                                $q,
                                _getDocumentService_,
                                _updateDocumentService_,
                                _authenticateService_) {

        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        getDocumentService = _getDocumentService_;
        updateDocumentService = _updateDocumentService_;

        scope.state = {};

        EditorCtrl = $controller('DocCtrl', {
            $scope: scope,
            $rootScope: rootScope,
            $state: state,
            updateDocumentService: updateDocumentService,
            getDocumentService: getDocumentService
        });
        authService = _authenticateService_;


        /*getDocumentService.get = function() {
         var deferred = $q.defer();
         deferred.resolve({data: {Document: {id: '123'}}, status: 'Success'});
         return deferred.promise;
         };*/
        //getDocumentSpy = spyOn(getDocumentService, 'get');

        scope.id = mockId;

        /*scope.editorForm = {
            $dirty: false,
            $valid: true,
            $setPristine: function () {//console.log('in mock $setPristine');
                scope.editorForm.$dirty = false;
                return null;
            },
            $setDirty: function () {//console.log('in mock $setDirty');
                scope.editorForm.$dirty = true;
                return null;
            },
            $setValidity: function (bool) {
                scope.editorForm.$valid = bool;
                return null;
            }
        };*/

        scope.totalItems = 333;
    }));

    describe('Initialize', function () {
        it('should set scope variables', function () {
            expect(scope.statusAlert).toEqual({});
            expect(scope.state.errorBox).toEqual(null);
        });
    });

    /*describe('Reload method', function () {
        it('should make a successful call to reload resource', function () {

            var success = function (result) {
                expect(result.limit).toEqual(10);
                expect(scope.errorBox).toEqual(null);
            };

            $httpBackend.expectGET('/ecms/rest/v1/documents/' + mockId, {
                'X-ECMS-Session': authService.sessionKey, 'Accept': 'application/json, text/plain, *!/!*'
            }).respond(200,
                {
                    limit: 10
                }
            );

            getDocumentService.get(mockId)
                .then(success);

            $httpBackend.flush();

        });

        it('should fail the call to reload resource', function () {

            var success = function (result) {
                // noop
                return result;
            };

            var error = function (error) {
                expect(error).toBe('getDocumentService error');
            };

            $httpBackend.expectGET('/ecms/rest/v1/documents/' + mockId, {
                'X-ECMS-Session': authService.sessionKey, 'Accept': 'application/json, text/plain, *!/!*'
            }).respond(500);

            getDocumentService.get(mockId)
                .then(success, error);

            $httpBackend.flush();

        });

    });

    describe('dismissAlert method', function () {
        it('should show error', function () {
            scope.statusAlert = {
                status: 'Error',
                alerts: ['hi there']
            };

            scope.dismissAlert();

            expect(scope.errorBox).not.toBeNull();
        });

        it('should not show error', function () {
            scope.statusAlert = {
                status: 'Success'
            };

            scope.dismissAlert();

            expect(scope.errorBox).toEqual(null);
        });
    });*/

    /*afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });*/
});
