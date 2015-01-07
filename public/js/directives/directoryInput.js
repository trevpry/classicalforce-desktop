'use strict';

angular.module('classicalforce-desktop')
    .directive('fileInput', function(){

       return {
           template: '<input name="directory" id="fileDialog" ng-model="path" type="file" nwdirectory><div>{{directory}}</div>',
           replace: false,
           link: function(scope, element, attrs){
               //scope.directory = 'test';
               //element.bind('change', alert('changed'));
               //alert(attrs);
               element.on('change', function(event){
                   var files = event.target.files;
                   scope.directory = files[0].path;
                   scope.path = files[0].path;
                   console.log(scope.directory);

                   scope.$apply();
               });
           }
       };
    });