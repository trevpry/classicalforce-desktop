var Datastore = require('nedb'),
    path = require('path'),
    gui = window.require('nw.gui'),
    albumsDb = new Datastore({filename: path.join(gui.App.dataPath, 'albums.db')}),
    tracksDb = new Datastore({filename: path.join(gui.App.dataPath, 'tracks.db')}),
    emitters = require('../emitters.js');

var events = emitters.eventEmitter;

albumsDb.loadDatabase();
tracksDb.loadDatabase();
//tracksDb.ensureIndex({fieldName: 'subsonicID', unique: true});

events.on('albumInfo', function(data){

});

events.on('composerParsed', function(data){
    var composer = [];
    data.forEach(function(track){
        tracksDb.insert(track, function(err, newDoc){
            composer.push(newDoc);
        });
    });
    events.emit('newComposer', composer)
});

exports.getTracks = function(req, res){

    //tracksDb.removeIndex('subsonicID', function(err) {
    //    var indexError = err;
    //    tracksDb.loadDatabase(function (err) {
    //        tracksDb.remove({composerLastName: {$exists: true}}, {multi: true}, function(err, numRemoved){
    //
    //        });
    //        res.json({error: err, indexError: indexError});
    //    });
    //});
    //tracksDb.loadDatabase(function(err){
    //    res.json({error: err});
    //});
    //res.json({success: 'success'});
    tracksDb.find({}).sort({composerLastName: 1, albumName: 1, trackTitle: 1}).limit(100).exec(function (err, docs){
        res.json({rows: [{composerLastName: 'no tracks found'}]});
        //if(docs.length < 1){
        //    res.json({rows: [{composerLastName: 'no tracks found'}]});
        //} else {
        //    res.json({rows: docs});
        //}

    });
    //tracksDb.find({composerLastName: {$exists: true}}, function(err, docs){
    //    res.json({rows: docs})
    //})
};