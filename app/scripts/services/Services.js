'use strict';

/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
var app = angular.module('ecmsEcmsUiApp');

/**
 * Save state to session
 */
app.service('updateSession', function($sessionStorage){
        this.session = function (scopeState) {
            $sessionStorage.lastState = scopeState;
        };
});


/**
 * Terminate
 */
app.service('terminate', function($rootScope, $sessionStorage) {
    return function() {
        $rootScope.sessionKey = null;
        delete $sessionStorage.session;
    };
});




/**
 * Toggle scope variables on view change
 * @param view, scope variable
 * @return scope updated
 */
app.service('toggleFeatures', function($rootScope, $state, updateSession, redirect){
    this.toggle = function (view) {
        $rootScope.state.currentView = view;
        // toggle features per the view we're loading
        switch (view) {
            case 'login':
                $rootScope.toDefaultState();
                break;
            case 'search.input':
                $rootScope.state.showNavBar = true;
                $rootScope.state.showActionBar = false;
                redirect.to('updateNavbar', 'input', undefined);
                break;
            case 'search.results':
                $rootScope.state.showNavBar = true;
                $rootScope.state.showActionBar = false;
                redirect.to('resizeGrid', undefined, undefined);
                redirect.to('updateNavbar', 'results', undefined);
                break;
            case 'search.doc':
                $rootScope.state.showNavBar = true;
                $rootScope.state.showActionBar = true;
                redirect.to('updateNavbar', 'doc', undefined);
                break;
        }
        updateSession.session($rootScope.state);
    };

});



/*
 * Redirect, to try avoid $broadcast and $on
 */
app.service('redirect', function($rootScope, goTo, updateDocumentInfo, $window) {
    this.to = function(toState, toParams, fromState) {
        switch (toState.name) {
            case 'search.input':
            case 'search':
                goTo.go('search.input');
                break;
            case 'search.results':
                if (!fromState.name || fromState.name === 'search.results') {
                    goTo.go('search.input');
                } else {
                    goTo.go('search.results');
                }
                break;
            case 'search.doc':
                updateDocumentInfo(toParams.id);
                goTo.go('search.doc', {id: toParams.id});
                angular.element($window).scrollTop (0);
                break;
        }
    };
});


app.service('updateDocumentInfo', function($rootScope) {
    this.update = function(id) {
            $rootScope.state.currentDocument.id = id;
            for (var i = 0; i < $rootScope.state.searchResults.length; i++) {
                var row = $rootScope.state.searchResults [i];
                if (row.documentid === id) {
                    $rootScope.state.currentDocument.index = row.searchResultIndex;
                    $rootScope.state.currentDocument.indexOnPage = (i + 1);
                    $rootScope.$broadcast ('updateCurrentDocument');
                    break;
                }
            }
        //return scope;
    };
});



/**
 * Go to new view
 *
 */
app.service('goTo', function($state) {
    this.go = function (newView, options, scopeStateCurrentDocumentId) {
        //toggleFeatures.toggle(newView);
        if (options) {
            $state.go(newView, options);
        }
        else {
            if (newView === 'search.doc') {
                $state.go(newView, {id: scopeStateCurrentDocumentId});
            }
            else {
                $state.go(newView);
            }
        }
    };
});






/**
 * Session - Get and Set.
 */
app.service('ecmsSession', function($sessionStorage) {
   this.getSession = function() {
        return $sessionStorage.session;
    };

   this.getUserLoggedIn  = function() {
       return $sessionStorage.userLoggedIn;
   };

   this.set = function(sessionToSet) {
        $sessionStorage.session = sessionToSet;
    };

   this.set = function(sessionToSet, userLoggedInToSet) {
       $sessionStorage.session = sessionToSet;
       $sessionStorage.userLoggedIn = userLoggedInToSet;
   };
});


/**
  * @ngdoc function
  * @name ecmsEcmsUiApp.service:isPrivateService
  * @description returns True if the view is private and user is not logged in; False in all other cases
  */
app.service('isPrivateService', function (ecmsSession) {
    return {
        check: function (toState) {
            if (toState.name !== 'login' && !ecmsSession.getSession()) {
                if (toState.module === 'private') {
                    return true;
                }
            }
            return false;
        }
    };
});



/**
 * @ngdoc function
 * @name ecmsEcmsUiApp.service:getIPService
 * @description retrieves data from the search endpoint
 */

app.service('getIPService', function ($http, $q) {
        return {
            getIP: function () {
                var requestUrl = 'http://freegeoip.net/json/';
                var deferred = $q.defer();
                var config = {
                    url: requestUrl,
                    headers: { 'Content-Type' : 'application/json' }
                };
                $http(config)
                    .then(function (result) {
                        deferred.resolve(result);
                    }, function () {
                        deferred.reject('getIPService error');
                    });
                return deferred.promise;
            }
        };
    });






