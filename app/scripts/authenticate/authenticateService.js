//'use strict';
//
///**
// * @ngdoc function
// * @name ecmsEcmsUiApp.service:authenticateService
// * @description authenticates user
// */
//
//angular.module('ecmsEcmsUiApp')
//    .service('authenticateService', function ($http, $q, $sessionStorage, loginEndpoint) {       // potentially: $localStorage
//
//        this.sessionKey = $sessionStorage.session;
//        var $this = this;
//
//        this.authenticate = function (request) {
//
//            var requestUrl = loginEndpoint.endpoint;
//            var deferred = $q.defer();
//
//            var config = {
//                url: requestUrl,
//                method: loginEndpoint.method,
//                data: request,
//                headers: {'Content-Type' : 'application/json'}
//            };
//
//            function authenticateSuccess (result) {
//                $this.sessionKey = result.data.UserLoginEvent.SessionKey;
//                $sessionStorage.$default({session: null});
//                $sessionStorage.session = $this.sessionKey;
//                deferred.resolve(result);
//            }
//
//            function authenticateError (error) {
//                $this.sessionKey = null;
//                deferred.reject(error);
//            }
//
//            $http(config)
//                .then(authenticateSuccess, authenticateError);
//
//            return deferred.promise;
//        };
//
//        this.terminate = function () {
//            this.sessionKey = null;
//            delete $sessionStorage.session;
//        };
//
//    });
