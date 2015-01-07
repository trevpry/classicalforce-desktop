exports.emit = function(){
    io.emit('newTrack', {parsed: true, length: 1});
};

