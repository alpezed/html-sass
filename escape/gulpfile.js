var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('css/'))
});

gulp.task('build', ['sass']);

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['build', 'watch']);
