'use strict';

/**
 * @ngdoc function
 * @name ecmsEcmsUiApp.controller:ModalInstanceCtrl
 * @description
 * # ModalInstanceCtrl
 * Controller for modal instance
 */
angular.module('ecmsEcmsUiApp')
    .controller('ModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, options) {

        $scope.class    = options.class;
        $scope.body     = options.body;
        $scope.title    = options.title;
        $scope.buttons  = options.buttons;

        $scope.ok = function () {
            $modalInstance.close('close');
        };

        /**
         * If passed, this tells the calling controller if the X or Cancel was clicked
         * @param closeOnly
         */
        $scope.cancel = function (closeOnly) {
            if (closeOnly) {
                $modalInstance.dismiss('close');
            }
            else {
                $modalInstance.dismiss('cancel');
            }
        };

        /**
         * For the HTML template each button gets "outcome" assigned to it
         * This method determined what local method to call depending on the incoming outcome
         * @param outcome
         */
        $scope.outcome = function (outcome) {
            switch (outcome) {
                case 'ok':
                    $scope.ok();
                    break;
                case 'cancel':
                    $scope.cancel();
                    break;
                default:
                    $scope.cancel();
            }
        };

        // used when we need to trigger a modal close from outside
        $rootScope.$on('closeModal', function () {
            $scope.cancel('close');
        });

    });
