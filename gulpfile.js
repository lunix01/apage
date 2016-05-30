/*
* name: apage
* version: 0.1.3
* author: lunix01
* Copyright (c) 2015 - 2016
*/
const gulp = require('gulp');
const jade = require('gulp-jade');
const prettify = require('gulp-prettify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-clean-css');
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');

const paths = {
    jade: './p/src/jade/**/*.jade',
    sass: './p/src/sass/**/*.scss',
    js: './p/src/es/**/*.js',
    image: './p/src/images/**/*'
};
gulp.task('jade', () => {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(prettify())
    .pipe(gulp.dest('./p/build/html/'))
});
gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
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
    .pipe(uglify())
    .pipe(gulp.dest('./p/build/js'))
});
gulp.task('eslint', function() {
    return gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
gulp.task('image', () => {
  return gulp.src(paths.image)
    .pipe(imagemin())
    .pipe(gulp.dest('./p/build/image/'))
});
gulp.task('watch', () => {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.js, ['eslint']);
  gulp.watch(paths.image, ['image']);
});
gulp.task('default', ['jade', 'sass', 'js', 'eslint', 'image', 'watch']);
gulp.task('apage', ['jade', 'sass', 'js', 'eslint', 'image', 'watch']);
