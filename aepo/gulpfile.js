var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    svgstore = require('gulp-svgstore'),
    rename = require('gulp-rename');

gulp.task('sass', function() {
    gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('svgstore', function() {
    gulp.src('app/images/*.svg')
        .pipe(svgstore())
        .pipe(rename({basename: 'sprite'}))
        .pipe(gulp.dest('app/images'));
});

// Move the css files into our app/css folder
gulp.task('css', function() {
    return gulp.src([
            'node_modules/flickity/dist/flickity.min.css'
        ])
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our app/js folder
gulp.task('js', function() {
    return gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            'node_modules/flickity/dist/flickity.pkgd.min.js'
        ])
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        //server: "./app"
        open: 'external',
        proxy: '192.168.93.100',
        port: 8080
    });

    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);

});

gulp.task('default' , ['js', 'css', 'serve']);
