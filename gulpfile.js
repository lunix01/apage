/*
* name: apage
* version: 0.1.0
* author: lunix01
* Copyright (c) 2015
*/
var gulp = require('gulp')
var jade = require('gulp-jade')
var prettify = require('gulp-prettify');
var less = require('gulp-less')
var cssmin = require('gulp-minify-css');
var babel = require("gulp-babel")
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')

gulp.task('jade', function() {
  return gulp.src('./p/src/jade/*.jade')
    .pipe(jade())
    .pipe(prettify())
    .pipe(gulp.dest('./p/build/html/'))
});
gulp.task('less', function() {
  return gulp.src('./p/src/less/*.less')
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(cssmin({compatibility: 'ie8'}))
    .pipe(gulp.dest('./p/build/css/'))
});
gulp.task('js', function() {
  return gulp.src('./p/src/es/*.js')
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./p/build/js'))
});
gulp.task('default', ['jade','less','js']);

gulp.watch('./p/src/jade/*.jade', ['jade'])
gulp.watch('./p/src/less/*.less', ['less']);
gulp.watch('./p/src/es/*.js', ['js']);
