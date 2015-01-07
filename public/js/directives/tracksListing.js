'use strict';

angular.module('classicalforce-desktop')
    .directive('tracksListing', function(){

        return {
            templateUrl: '../../partials/trackListing.html',
            link: function(scope, element, attrs, SocketIO){

            },
            controller: function($scope, SocketIO){
                $scope.tracks = [];
                $scope.albums = [];
                $scope.composers = ['composer1', 'composer2'];
                $scope.trackCount = 0;
                $scope.albumCount = 0;
                $scope.composerCount = 0;
                $scope.data = [
                    {id: 1, composer_last_name: 'name1'},
                    {id: 2, composer_last_name: 'name2'}
                ];

                SocketIO.on('newTrack', function(message){
                    $scope.trackCount++;
                    $scope.tracks.push(message);
                    console.log(message);
                });

                SocketIO.on('newAlbum', function(message){
                    $scope.albumCount++;
                    $scope.albums.push(message);
                    console.log(message);
                });

                SocketIO.on('newComposer', function(message){
                    if($scope.composerCount === 0){
                        $scope.composers = [];
                    }
                    $scope.composerCount++;
                    $scope.composers.push(message);
                    //console.log(message);
                });

                $scope.addTrack = function(){
                    alert('added');
                    $('.temp-tracks-table').loadData($scope.data);
                    $scope.data.push({id: 3, composer_last_name: 'name3'});
                }
            }

        };
    });