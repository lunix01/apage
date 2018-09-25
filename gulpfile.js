/*
* name: apage
* version: 0.2.0
* author: lunix01
* Copyright (c) 2015 - 2018
*/
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const pug = require('gulp-pug');
const prettify = require('gulp-prettify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack-stream');
const webpackCfg = require('./webpack.config.js')
const named = require('vinyl-named');
const uglify = require('gulp-uglify');
const pump = require('pump');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

const paths = {
    pug: ['./p/src/pug/**/*.pug', '!./p/src/pug/**/_*.pug'],
    sass: ['./p/src/sass/**/*.scss', '!./p/src/sass/**/_*.scss'],
    js: ['./p/src/es/**/*.js', '!./p/src/es/**/_*.js'],
    image: './p/src/images/**/*'
};
gulp.task('clean', () => {
    return del(['./p/build/']).then(paths => {
        console.log('删除：', paths.join('\n'));
    });
});
gulp.task('pug', function buildHTML() {
    return gulp.src(paths.pug)
        .pipe(pug())
        .pipe(prettify())
        .pipe(gulp.dest('./p/build/html/'))
});
gulp.task('sass', () => {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: ['last 3 version', '>5%'],
            cascade: false,
            remove: false
        }), cssnano]))
        .pipe(gulp.dest('./p/build/css/'))
});
gulp.task('js', function(cb) {
    pump([
        gulp.src(paths.js),
        named(),
        webpack(webpackCfg),
        uglify(),
        gulp.dest('./p/build/js')
    ], cb);
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
    gulp.watch(paths.pug, ['pug']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js', 'eslint']);
    gulp.watch(paths.image, ['image']);
});
gulp.task('default', function(cb) {
    runSequence(
        ['pug', 'sass', 'js', 'eslint', 'image'],
        'watch',
        cb
    );
});
gulp.task('apage', ['default']);
