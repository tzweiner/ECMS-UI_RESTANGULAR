'use strict';

/**
 * @ngdoc function
 * @name ecmsEcmsUiApp.factory:getSearchResultsService
 * @description retrieves data from the search endpoint
 */

angular.module('ecmsEcmsUiApp')
    .service('getSearchResultsService', function ($http, $q, documentsEndpoint, ecmsSession) {

        return {
            getResults: function (queryIn, pageNumber, pageSize) {
                var requestUrl = documentsEndpoint.endpoint;
                var deferred = $q.defer();

                var config = {
                    url: requestUrl,
                    method: documentsEndpoint.method,
                    params: {query: queryIn, offset: (pageNumber - 1) * pageSize, limit: pageSize},     // &sort=id.sort desc
                    headers: { 'X-ECMS-Session': ecmsSession.getSession(), 'Content-Type' : 'application/json'}
                };

                $http(config)
                    .then(function (result) {
                        deferred.resolve(result);
                    }, function () {
                        deferred.reject('getSearchResultsService error');
                    });

                return deferred.promise;
            }
        };

    });
