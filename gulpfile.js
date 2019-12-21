'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const stripCssComments = require('gulp-strip-css-comments');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');
const rigger = require('gulp-rigger');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const remember = require('gulp-remember');
const cached = require('gulp-cached');
const path = require('path');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function () {
    return gulp.src('assets/css/apps.css')
        .pipe(autoprefixer())
        .pipe(concatCss("apps.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(stripCssComments())
        // .pipe(rename('apps.min.css'))
        .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('clean', function () {
    return del('public');
});

gulp.task('image', function () {
    return gulp.src('assets/img/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('public/assets/img'));
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(newer('public'))
        .pipe(plumber())
        .pipe(debug({title: 'assets'}))
        .pipe(gulp.dest('public'));
});

var jsfiles = [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",
    "node_modules/swiper/dist/js/swiper.min.js",
    "node_modules/jquery.maskedinput/src/jquery.maskedinput.js",
    "node_modules/sweetalert/dist/sweetalert.min.js"
    "node_modules/instafeed.js/instafeed.min.js"
];

gulp.task('js', function () {
    return gulp.src(jsfiles, {base: 'assets/js'})
    // .pipe(rigger()) //Прогоним через rigger
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('vendors.js'))
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('myJs', function () {
    return gulp.src('assets/js/**/*.*')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/js'));
});

// gulp.task('fonts', function() {
//     return gulp.src([
//         'node_modules/font-awesome/fonts/fontawesome-webfont.*'])
//         .pipe(gulp.dest('public/node_modules/font-awesome/fonts'));
// });

gulp.task('fonts', function() {
    return gulp.src('assets/fonts/**/*.*')
        .pipe(gulp.dest('public/assets/fonts'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles','html','image','js','myJs','fonts')));

gulp.task('watch', function () {
    gulp.watch('assets/css/**/*.*', gulp.series('styles')).on('uplink', function (filepath) {
        remember.forget('styles', path.resolve(filepath));
        delete cached.caches.styles[path.resolve(filepath)];
    });
    gulp.watch('assets/img/**/*.*', gulp.series('image')).on('uplink', function (filepath) {
        remember.forget('image', path.resolve(filepath));
        delete cached.caches.image[path.resolve(filepath)];
    });
    gulp.watch('assets/js/**/*.*', gulp.series('myJs')).on('uplink', function (filepath) {
        remember.forget('myJs', path.resolve(filepath));
        delete cached.caches.myJs[path.resolve(filepath)];
    });
    gulp.watch('*.html', gulp.series('html'));
});



// gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

gulp.task('dev', gulp.series('build', gulp.parallel('watch')));