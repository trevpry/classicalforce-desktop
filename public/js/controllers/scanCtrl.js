'use strict';

angular.module('classicalforce-desktop')
    .controller('scanCtrl', function($scope, FilesService){
        $scope.scan = function(source){
            if (source === 'subsonic'){
                FilesService.scanSubsonic();
            }
        };
    });