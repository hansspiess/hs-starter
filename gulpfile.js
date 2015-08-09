
// require modules
var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");

// setup config vars
var buildDir = './dist';


// delete files inside /css folder
gulp.task('clean', function() {
	return del(['dist/css/*.css', 'dist/css/maps/*.css', 'dist/js/*.js'], function (err, paths) {
		console.log('Deleted files/folders:\n', paths.join('\n'));
	});
});

// concatenate scripts
gulp.task('scripts', function() {
  gulp.src(['js/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(buildDir + '/js'));
});

// compile scss
gulp.task('styles', function() {
	gulp.src('./scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('/maps'))
		.pipe(gulp.dest(buildDir + '/css'));
});

// watch changes
gulp.task('watch',function() {
	gulp.watch(
		['scss/**/*.scss','js/**/*.js'],
		['scripts','styles']
	);
});

// minify css
gulp.task('minify-css', function() {
  gulp.src(buildDir + '/css/app.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(rename({
			suffix: ".min"
		}))
    .pipe(gulp.dest(buildDir + '/css'));
});


// Combined Tasks

// default
gulp.task('default', ['watch']);

// build 
gulp.task('build', ['clean','scripts','styles','minify-css']);

