var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);

});

gulp.task('sass', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('default' , ['serve']);
