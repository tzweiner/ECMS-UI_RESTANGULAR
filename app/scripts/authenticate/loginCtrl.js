'use strict';
/**
 * @ngdoc controller
 * @name login
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('ecmsEcmsUiApp')
    .controller('LoginController', function($scope,
                                  $rootScope,
                                  $state,
                                  $sessionStorage,
                                  ecmsSession,
                                  goTo,
                                  toggleFeatures,
                                  Restangular,
                                  $timeout){



        var $this = this;   // alias for this controller

        // Scope defaults
        $scope.loginError = false;
        $scope.userLoggedIn = ecmsSession.getUserLoggedIn() || false;
        $scope.credentials = {
            username: 'kvillaca',
            password: 'JavaRules11!',
            rememberMe: false
        };
        $scope.codeMirrorArea = null;


        /*
         * Authenticate the user, calling a rest service!
         */
        $scope.authenticateUser = function () {

            // clear out any previous error messages
            $scope.loginError = false;

            // this is what we are passing on to the server for authentication
            var jsonInput = {
                Authentication: {
                    Credentials: {
                        UserPass: {
                            Username: $scope.credentials.username,
                            Password: $scope.credentials.password
                        }
                    },
                    ClientInfo: {
                        RemoteAddress: $rootScope.IP,
                        UserAgent: navigator.userAgent,
                        RefererURL: window.location.pathname
                    }
                }
            };


            // Restangular call for Authenticate user!
            Restangular.one('v1').post('authenticate', angular.toJson(jsonInput, true)).
                then(function (response) {
                    $timeout(function () {
                        $this.sessionKey = response.data.UserLoginEvent.SessionKey;
                        $sessionStorage.$default({session: null});
                        ecmsSession.set($this.sessionKey, true);
                        $scope.loginError = false;
                        $scope.userLoggedIn = true;
                        toggleFeatures.toggle('search.input');
                        $state.go('search.input');
                    });
                }, function (fail) {
                    $timeout(function () {
                        $scope.loginError = true;
                        ecmsSession.set(undefined, false);
                        console.log(fail);
                    });
                });
        };



        // clear form data when user clicks back into login form after an error
        $scope.clear = function () {
            if ($scope.loginError) {
                $scope.loginError = false;
                $scope.credentials = {
                    username: null,
                    password: null,
                    rememberMe: false
                };
            }
        };
    });
