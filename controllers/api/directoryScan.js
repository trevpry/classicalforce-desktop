var recursive = require('recursive-readdir');
var http = require('http');

//var mediainfo = require('mediainfo');
var fileNames = '';
var directory;

function getMetadata(files, recursiveError, res){
    var fileList = [];

    for(var i = 0; i < files.length; i++){
        fileList.push(files[i]);
        if (i = files.length-1){

        }
    }


}

exports.directoryScan = function(req, res){
    res.json({
        success: 'success'
    });
    var parsed = 0;
    var errors = 0;
    var metadata = [];

    //CHECK OUT recursive-readdir-filter
    recursive(req.body.directory, function(err, files){
        files.forEach(function(file){
            trackCount++;
            var parser = musicMetadata(fs.createReadStream(file));

            parser.on('metadata', function(result){
                metadata.push(result);
                //io.emit('newTrack', {count: trackCount, metadata: result});
                parsed++;
                io.emit('newTrack', {parsed: parsed, length: files.length});
                if (parsed === files.length){
                    io.emit('newTrack', {count: trackCount, errors: errors, metadata: metadata});
                }
            }).on('done', function(error){
                errors++;
            });


        });

    });


};

