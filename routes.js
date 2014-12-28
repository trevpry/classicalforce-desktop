var pages = require('./controllers/pages');

//All routes are placed within this set function, which is passed the Express app
var set = function(app){
    //Index page
    app.get('/', pages.index);
};

exports.set = set;