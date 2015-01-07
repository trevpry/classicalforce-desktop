var pages = require('./controllers/pages');
//var api = require('./controllers/api/directoryScan');

//All routes are placed within this set function, which is passed the Express app
var set = function(app){
    //Index page
    app.get('/', pages.index);

    //Directory scan
    //app.post('/directory-scan', api.directoryScan);
};

exports.set = set;