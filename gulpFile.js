var gulp = require('gulp');
var shell = require('gulp-shell');
var sass = require('gulp-sass');


// Run project
gulp.task('run', shell.task([
     'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 --run ./' 
]));

// Compile project
gulp.task('build-osx', shell.task([
	 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p osx ./' 
]));

// Compile project
gulp.task('build-win', shell.task([
	 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p win ./' 
]));

// Compile project
gulp.task('build-linux', shell.task([
	 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p linux32,linux64 ./' 
]));

//Compile SCSS to CSS
gulp.task('sass', function(){
	gulp.src('./styles/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/css'));
});

//Watch files for changes
gulp.task('watch', function(){
	gulp.watch('./styles/*.scss', ['sass']);
});

//Default task
gulp.task('default', ['sass', 'watch']);
