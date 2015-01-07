'use strict';

angular.module('classicalforce-desktop')
    .controller('fileModal', function($scope, $modal){
        $scope.items = ['item', 'item', 'item'];

        $scope.open = function(){

            var modalInstance = $modal.open({
                templateUrl: '../partials/modals/scan-file-modal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: function (){
                        return $scope.items;
                    }
                }
            })
        }
    });

angular.module('classicalforce-desktop')
    .controller('ModalInstanceCtrl', function($scope, $modalInstance, FilesService){
        $scope.directory = '';
        //var scanDirectory = FilesService.scanDirectory();

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };

        $scope.scan = function(){
            FilesService.scanDirectory($scope.directory);
            $modalInstance.dismiss('cancel');
        };
    });

