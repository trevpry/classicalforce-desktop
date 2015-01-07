var http = require('http');
var emitters = require('../emitters');
var request = require('request');
var metaParse = require('./metaParse');

var server = 'http://trevpry.subsonic.org/rest/';
var password = 'admin';
var username = 'admin';
var format = 'json';
var version = '1.10.2';
var client = 'classicalForce';
var params = '?u=' + username + '&p=' + password + '&f=' + format + '&v=' + version + '&c=' + client;
var ping = server + 'ping.view' + params;
var albumList = server + 'getAlbumList2.view' + params + '&size=10&type=alphabeticalByArtist';
var albumInfo = server + 'getAlbum.view' + params;
var artistInfo = server + 'getArtist.view' + params;
var artistList = server + 'getArtists.view' + params;
var coverArt = server + 'getCoverArt.view' + params;
var events = emitters.eventEmitter;
var parsedTrack;

var subsonic = {
    getAllArtists: function(){
        request(artistList, function(error, response, body){
            var subsonicResponse = JSON.parse(body);

            var artists = subsonicResponse['subsonic-response']['artists'];
            var allArtists = [];

            //artists.index.forEach(function(index){

                artists.index[0].artist.forEach(function(artist){
                    //allArtists.push(artist);
                    events.emit('artistRetrieved', artist);
                });
            //});
        });
    },
    getArtist: function(artistID){
        //return artistInfo + '&id=' + artistID;

        request(artistInfo + '&id=' + artistID, function(error, response, body){
            var subsonicResponse = JSON.parse(body);
            var artist = subsonicResponse['subsonic-response']['artist'];

            //return artist;
            //return artistInfo + '&id=' + artistID;
            events.emit('artistInfo' + artistID, artist);
        });
    },
    getAlbum: function(albumID){
        request(albumInfo + '&id=' + albumID, function(error, response, body){
            if (error == null){
                //events.emit('newComposer', JSON.parse(body));
                var subsonicResponse = JSON.parse(body);
                if (typeof subsonicResponse == 'object'){
                    var album = subsonicResponse['subsonic-response']['album'];
                    //events.on('coverArt'+albumID, function(details){
                    //album.coverArt = details;
                    events.emit('albumInfo' + albumID, album);
                    //});

                    //subsonic.getCoverArt(albumID);
                }
            }

        });
    },
    getCoverArt: function(albumID){
        request(coverArt + '&id=al-' + albumID, function(error, response, body){
            events.emit('coverArt' + albumID, body);
        });
    }

};

var scan = function(){
    events.on('artistRetrieved', function(artist){
        var tracks = [];

        events.on('artistInfo' + artist.id, function(details){
            artist.details = details;
            artist.albums = [];

            details.album.forEach(function(album){
                events.on('albumInfo' + album.id, function(details){
                    if (details.song.length > 0){
                        details.song.forEach(function(track){
                            parsedTrack = metaParse.parse('subsonic', track);
                            parsedTrack.coverArtPath = coverArt + '&id=al-' + album.id + '&size=200';
                            //parsedTrack.coverArt = album.coverArt;
                            tracks.push(parsedTrack);
                        });
                        artist.albums.push(details);
                        if (artist.albums.length === artist.albumCount){
                            events.emit('newComposer', tracks);
                        }
                    }
                });
                subsonic.getAlbum(album.id);
            });
        });

        subsonic.getArtist(artist.id);
    });

    subsonic.getAllArtists();
};

exports.scan = scan;
exports.subsonic = subsonic;

//function getAlbums(artistID){
//    request(artistInfo + '&id=' + artistID, function(error, response, body){
//        var subsonicResponse = JSON.parse(body);
//        var albums = subsonicResponse['subsonic-response']['artist']['album'];
//        var artist = [];
//
//        albums.forEach(function(album){
//            album.name = regexAlbum.parse(album.name);
//            artist.push(album);
//        });
//
//        events.emit('albumsParsed', artist);
//    })
//}
//
//function getTracks(albumID){
//    request(albumInfo + '&id=' + parsedAlbum.albumID, function(error, response, body){
//        var subsonicResponse = JSON.parse(body);
//        var tracks = subsonicResponse['subsonic-response']['album']['song'];
//        var album = [];
//
//        tracks.forEach(function(track){
//            track.title = regexTrack.parse(track.title);
//            album.push(track);
//        });
//
//        events.emit('tracksParsed', album);
//    });
//}
//
////function parseTrack(trackID){
////    request(albumInfo + '&id=' + parsedAlbum.albumID, function(error, response, body){
////        var subsonicResponse = JSON.parse(body);
////        var tracks = subsonicResponse['subsonic-response']['album']['song'];
////        var album = [];
////
////        tracks.forEach(function(track){
////            track.title = regexTrack.parse(track.title);
////            album.push(track);
////        });
////
////        events.emit('tracksParsed', album);
////    });
////}
//
//exports.scan = function(req, res){
//    request(artistList, function(error, response, body){
//        var subsonicResponse = JSON.parse(body);
//
//        var artists = subsonicResponse['subsonic-response']['artists'];
//        //emitters.eventEmitter.emit('newAlbum', artists);
//
//        artists.index.forEach(function(index){
//
//            index.artist.forEach(function(artist){
//                //parseArtist(artist);
//                events.emit('artistParsed', regexComposer.parse(artist));
//            });
//        });
//
//        //var albums = subsonicResponse['subsonic-response']['albumList2']['album'];
//        //
//        //albums.forEach(function(album){
//        //    parseAlbum(album);
//        //});
//    });
//};

