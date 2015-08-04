//'use strict';
//
///**
// * @ngdoc function
// * @name ecmsEcmsUiApp.service:isPrivateService
// * @description returns True if the view is private and user is not logged in; False in all other cases
// */
//
//angular.module('ecmsEcmsUiApp')
//    .service('isPrivateService', function (session) {
//
//        return {
//            check: function (toState) {
//                if (toState.name !== 'login' && !session.getSession()) {
//                    if (toState.module === 'private') {
//                        return true;
//                    }
//                }
//                return false;
//            }
//        };
//
//    });
