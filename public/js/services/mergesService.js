'use strict';

angular.module('classicalforce-desktop')
    .factory('mergesService', function(){

        var mergesService = {
            getMerges: function(data, fields){
                var rows = data.rows;
                var prev = '';
                var next = '';
                var merges = [];
                var span = 0;
                var index = 0;

                for (var j = 0; j < fields.length; j++){
                    var field_name = fields[j];
                    merges.push({field: field_name, merges: []});
                    console.log(field_name);

                    for (var i = 0; i < rows.length; i++){
                        span++;
                        next = (i < rows.length - 1) ? rows[i+1][field_name] : '';
                        console.log(rows[i][field_name]);

                        if (rows[i][field_name] !== prev){
                            index = i;
                            //span = 0;
                        } else if (rows[i][field_name] !== next || i+1 == rows.length){
                            merges[j].merges.push({
                                index: index,
                                rowspan: span
                            });
                            span = 0;
                        }

                        prev = rows[i][field_name];

                    }

                }
                return merges;
            }
        };

        return mergesService;

    });