var express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./routes.js'),
  http = require('http'),
  //events = require('events'),
  emitters = require('./controllers/emitters.js'),
  subsonicScan = require('./controllers/api/subsonicScan'),
  metaParse = require('./controllers/api/metaParse'),
  db = require('./controllers/db/db'),
  //recursive = require('recursive-readdir'),
  //fs = require('fs'),
  //musicMetadata = require('musicmetadata'),
  trackCount = 0;

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

routes.set(app);

emitters.eventEmitter.on('newTrack', function(message){
  io.emit('newTrack', message);
});
emitters.eventEmitter.on('newAlbum', function(message){
  io.emit('newAlbum', message);
});
emitters.eventEmitter.on('newComposer', function(message){
  io.emit('newComposer', message);
});

//app.post('/subsonic-scan', subsonicScan.scan);
app.get('/get-metadata', subsonicScan.scan);
app.get('/api/tracks', db.getTracks);
//app.get('/artist-test', metaParse.testArtist(970));

app.set('port', process.env.PORT || 3000);

//var server = app.listen(app.get('port'), function() {
//	// log a message to console!
//});
server.listen(3000);

module.exports = app;
