// require modules
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

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

//  minify scripts
gulp.task('minify-scripts', function() {
  gulp.src(['js/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(buildDir + '/js'));
});

// compile scss
gulp.task('styles', function() {
	gulp.src('./scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
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
gulp.task('minify-styles', function() {
  gulp.src(buildDir + '/css/app.css')
    .pipe(cleanCss({compatibility: 'ie8'}))
		.pipe(rename({
			suffix: ".min"
		}))
    .pipe(gulp.dest(buildDir + '/css'));
});


// Combined Tasks

// default
gulp.task('default', ['watch']);

// build 
gulp.task('build', ['clean','scripts','minify-scripts','styles','minify-styles']);

