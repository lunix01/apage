/*
* name: apage
* version: 0.1.2
* author: lunix01
* Copyright (c) 2015 - 2016
*/
const gulp = require('gulp');
const jade = require('gulp-jade');
const prettify = require('gulp-prettify');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-clean-css');
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

const paths = {
    jade: './p/src/jade/**/*.jade',
    less: './p/src/less/**/*.less',
    js: './p/src/es/**/*.js',
    image: './p/src/images/**/*'
};
gulp.task('jade', () => {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(prettify())
    .pipe(gulp.dest('./p/build/html/'))
});
gulp.task('less', () => {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(cssmin({compatibility: 'ie8'}))
    .pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: false
    }))
    .pipe(gulp.dest('./p/build/css/'))
});
gulp.task('js', () => {
  return gulp.src(paths.js)
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./p/build/js'))
});
gulp.task('image', () => {
  return gulp.src(paths.image)
    .pipe(imagemin())
    .pipe(gulp.dest('./p/build/image/'))
});
gulp.task('watch', () => {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.image, ['image']);
});
gulp.task('default', ['jade', 'less', 'js', 'image', 'watch']);
gulp.task('apage', ['jade', 'less', 'js', 'image', 'watch']);
