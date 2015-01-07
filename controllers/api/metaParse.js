var async = require('async');
var subsonicScan = require('./subsonicScan');
var emitters = require('../emitters');
var regexTrack = require('../regex/regexTrack');
var regexComposer = require('../regex/regexComposer');
var regexWork = require('../regex/regexWork');
var request = require('request');

var events = emitters.eventEmitter;

function subsonicParse(data){
    var composerName = regexComposer.parse(data.artist);
    var work = regexWork.parse(data.album);

    var parsedData = {
        subsonicID: data.id,
        subsonicAlbumID: data.albumId,
        subsonicArtistID: data.artistID,
        trackTitle: data.title,
        albumName: data.album,
        workTitle: work.title,
        workNumber: work.number,
        workKey: work.key,
        opusNumber: work.opus,
        opusSub: work.opusSub,
        fullWorkTitle: work.fullTitle,
        workSubtitle: work.subtitle,
        composerFirstName: composerName.firstName,
        composerMiddleName: composerName.middleName,
        composerLastName: composerName.lastName,
        composerFullName: composerName.fullName,
        duration: data.duration,
        bitRate: data.bitRate,
        size: data.size,
        extension: data.suffix,
        originalPath: data.path
    };



    return parsedData;
}

exports.parse = function(source, data){
    var parsedData;

    if(source === 'subsonic'){
        parsedData = subsonicParse(data);
    }

    return parsedData;
};
