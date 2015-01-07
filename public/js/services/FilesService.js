'use strict';

angular.module('classicalforce-desktop')
    .factory('FilesService', function($http){
        var scanDirectory = function(directory){
            console.log('directory ' + directory);
            $http.post('http://localhost:3000/directory-scan', {directory: directory})
                .success(function(data, status){
                    console.log(data);
                })
                .error(function(data, status){
                    console.log(data);
                })
        };

        var scanSubsonic = function(){
            console.log('Scan Subsonic');
            $http.get('http://localhost:3000/get-metadata')
                .success(function(data, status){
                    console.log(data);
                })
                .error(function(data, status){
                    console.log(data);
                })
        };

        return {
            scanDirectory: function(directory) {
                return scanDirectory(directory);
            },
            scanSubsonic: function(){
                return scanSubsonic();
            }
        };
    });