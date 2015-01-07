angular.module('classicalforce-desktop')
    .directive('tempTracks', function(mergesService){
        var merges;
        var mergeFields = ['workTitle', 'coverArtPath'];

            function link(scope, iElement){


                iElement.datagrid({
                    title: 'Edit Tracks',
                    toolbar: '#toolbar',
                    iconCls: 'icon-edit',
                    singleSelect: false,
                    checkOnSelect: false,
                    autoRowHeight: true,
                    //fitColumns: true,
                    url: 'http://localhost:3000/api/tracks/',
                    method: 'get',
                    saveUrl: 'save_user.php',
                    //data: [{id: 0}],
                    //updateUrl: 'http://10.0.10.10/temp_track_update',
                    destroyUrl: 'destroy_user.php',
                    columns:[[
                        {field:'check',checkbox:"true"},
                        {field:'_id',title:'Track ID',width:50,hidden:"false"},
                        //{field:'coverArtPath',title:'Cover Art', width: 200,
                        //    formatter: function(value,row,index){
                        //        return '<img src="' + value + '">';
                        //        //return '<img src="data:image/jpeg;base64,' + value + '">';
                        //        //if (value != undefined && value != null){
                        //        //    return '<img src="' + value +'">';
                        //        //} else {
                        //        //    return '';
                        //        //}
                        //    }
                        //},
                        {field:'workTitle',title:'Work Title',width:250,editor:'text',sortable:"true"},
                        {field:'workSubtitle',title:'Work Subtitle',width:100,editor:'text',sortable:"true"},
                        //{field:'trackTitle',title:'Track Title', width:200, editor:'text',sortable:"true"},
                        {field:'albumName',title:'Album Title', width:200,editor:'text',sortable:"true"},
                        {field:'workNumber',title:'Work Number',editor:'text'},
                        {field:'workKey',title:'Key',width:100,editor:'text'},
                        {field:'opusNumber',title:'Opus Number',editor:'text'},
                        {field:'opusSub',title:'Opus Sub'},
                        {field:'composerFirstName',title:'First Name',width: 200,editor:'text',sortable:"true"},
                        {field:'composerMiddleName',title:'Middle Name',width: 200,editor:'text',sortable:"true"},
                        {field:'composerLastName',title:'Last Name',width: 200, editor:'text',sortable:"true"},
                        {field:'composerFullName',title:'Full Name',width: 200, editor:'text',hidden:"true"}
                    ]],
                    idField: '_id',
                    pageSize: 2,
                    onEndEdit: function(rowIndex, rowData, changes) {
                        rowChanges = changes;

                    },
                    groupField: 'composerFullName',
                    view: groupview,
                    groupFormatter: function(value, rows){
                        return value + ' - ' + rows.length + ' Track(s)';
                    },
                    onHeaderContextMenu: function(e, field){
                      alert('menu');
                    },
                    onClickCell: function(index, field, value){
                        if (mergeFields.indexOf(field) >= 0){
                            var isSelected = $('tr[datagrid-row-index="' + index + '"]').first().hasClass('datagrid-row-selected');

                            if (!isSelected){
                                selectMerges(merges, index, field, iElement);
                            } else {
                                unselectMerges(merges, index, field, iElement);
                            }
                        }
                    },
                    onLoadSuccess: function(data){
                        var rowNumber = 0;
                        data.rows.forEach(function(row){

                            iElement.datagrid('collapseGroup', rowNumber);
                            rowNumber++;
                        });

                        merges = mergesService.getMerges(data, mergeFields);

                        $('.datagrid-group-title').bind('click', function(){
                            alert($(this).text());
                        });

                        applyMerges(merges, iElement);

                        //iElement.datagrid('expandGroup', 1);
                        //scope.$digest();
                    }
                });


            }

        return {
            replace: true,
            transclude: false,
            compile: function (element, attrs) {

                return link;
            },
            controller: function($scope, $element, SocketIO){
               //$('.modal').hide();
                var composerCount = 0;
                var id = 0;
                SocketIO.on('newComposer', function(message){
                    composerCount++;
                    message.forEach(function(track){
                        if(composerCount < 20){
                            id++;
                            track.id = id;
                            console.log(track);
                            $element.datagrid('appendRow', track);

                            //$element.datagrid('collapseGroup', composerCount);
                        }

                    });
                    //merges = mergesService.getMerges({rows: message}, mergeFields);
                    //applyMerges(merges, $element);
                    $('div[group-index="' + composerCount + '"] .datagrid-group-title').bind('click', function(){
                        alert($(this).text());
                    });
                });
            }
        };
    });

var applyMerges = function(merges, element){
    if (merges !== undefined) {

        //loops through each set of merges for each field to be merged
        for (var j=0; j<merges.length; j++){

            for (var i=0; i<merges[j].merges.length; i++){
                element.datagrid('mergeCells',{
                    index: merges[j].merges[i].index,
                    field: merges[j].field,
                    rowspan: merges[j].merges[i].rowspan
                });
            }
        }
    }
};

var getFieldMergeSpan = function(merges, index, field){
    //selects the merges for the passed in field
    var fieldMerges = merges.filter(function(element){
        return element.field == field;
    });

    //selects the merge with passed in index
    var fieldMergeSpan = fieldMerges[0].merges.filter(function(element){
        return element.index == index;
    });

    return (fieldMergeSpan[0] !== undefined) ? fieldMergeSpan[0].rowspan : 0
};

var selectMerges = function(merges, index, field, iElement){
    var mergeSpan = getFieldMergeSpan(merges, index, field);
    console.log(mergeSpan);

    //selects all rows within the merge
    for (var i = 1; i<mergeSpan; i++){
        iElement.datagrid('selectRow', i+index);
    }
};

var unselectMerges = function(merges, index, field, iElement){
    var mergeSpan = getFieldMergeSpan(merges, index, field);

    //unselects all rows within the merge
    for (var i = 1; i<mergeSpan; i++){
        iElement.datagrid('unselectRow', i+index);
    }
};

