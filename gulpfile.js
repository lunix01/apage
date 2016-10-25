/*
* name: apage
* version: 0.1.3
* author: lunix01
* Copyright (c) 2015 - 2016
*/
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const jade = require('gulp-jade');
const prettify = require('gulp-prettify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cssmin = require('gulp-clean-css');
const webpack = require('webpack-stream');
const webpackCfg = require('./webpack.config.js')
const named = require('vinyl-named');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

const paths = {
    jade: ['./p/src/jade/**/*.jade', '!./p/src/jade/**/_*.jade'],
    sass: ['./p/src/sass/**/*.scss', '!./p/src/sass/**/_*.scss'],
    js: ['./p/src/es/**/*.js', '!./p/src/es/**/_*.js'],
    image: './p/src/images/**/*'
};
gulp.task('clean', () => {
    return del(['./p/build/']).then(paths => {
        console.log('删除：', paths.join('\n'));
    });
});
gulp.task('jade', () => {
    return gulp.src(paths.jade)
        .pipe(jade())
        .pipe(prettify())
        .pipe(gulp.dest('./p/build/html/'))
});
gulp.task('sass', () => {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(gulp.dest('./p/build/css/'))
});
gulp.task('js', () => {
    return gulp.src(paths.js)
        .pipe(named())
        .pipe(webpack(webpackCfg))
        .pipe(uglify())
        .pipe(gulp.dest('./p/build/js'))
});
gulp.task('eslint', () => {
    return gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
gulp.task('image', () => {
    return gulp.src(paths.image)
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('./p/build/image/'))
});
gulp.task('watch', () => {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js', 'eslint']);
    gulp.watch(paths.image, ['image']);
});
gulp.task('default', function(cb) {
    runSequence(
        'clean',
        ['jade', 'sass', 'js', 'eslint', 'image'],
        'watch',
        cb
    );
});
gulp.task('apage', ['default']);
