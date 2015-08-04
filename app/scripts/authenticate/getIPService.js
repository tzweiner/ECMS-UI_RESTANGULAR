//'use strict';
//
///**
// * @ngdoc function
// * @name ecmsEcmsUiApp.service:getIPService
// * @description retrieves data from the search endpoint
// */
//
//angular.module('ecmsEcmsUiApp')
//    .service('getIPService', function ($http, $q) {
//
//        return {
//            getIP: function () {
//                var requestUrl = 'http://freegeoip.net/json/';
//                var deferred = $q.defer();
//
//                var config = {
//                    url: requestUrl,
//                    headers: { 'Content-Type' : 'application/json' }
//                };
//
//                $http(config)
//                    .then(function (result) {
//                        deferred.resolve(result);
//                    }, function () {
//                        deferred.reject('getIPService error');
//                    });
//
//                return deferred.promise;
//            }
//        };
//
//    });
