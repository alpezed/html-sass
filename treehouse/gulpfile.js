var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    browserSync     = require('browser-sync'),
    uglify          = require('gulp-uglify'),
    gulpIf          = require('gulp-if'),
    cssnano         = require('gulp-cssnano'),
    autoPrefixer    = require('gulp-autoprefixer'),
    useref          = require('gulp-useref'),
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache'),
    del             = require('del');

var path = {
    dist: {
        html: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    app: {
        html: 'app/*.html',
        css: 'app/css/theme.css',
        style: 'app/scss/**/*.scss',
        js: 'app/js/*.js',
        img: 'app/images/**/*.+(png|jpg|jpeg|gif|svg)',
        fonts: 'app/fonts/**/*'
    }
};

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('sass', function() {
    gulp.src(path.app.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('style', function() {
    gulp.src(path.app.css)
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
    gulp.src(path.app.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    gulp.src(path.app.html)
        .pipe(useref())
        //.pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(path.dist.html))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function() {
    gulp.src(path.app.img)
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts', function() {
    gulp.src(path.app.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('cache:clear', function () {
    del('dist').then(function(callback) {
        return cache.clearAll(callback);
    });
})

gulp.task('clean', function() {
    del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});
//gulp.task('clean', del.bind(null, ['dist/**/*', '!dist/images', '!dist/images/**/*']));

gulp.task('build', ['sass','style','scripts','html','images','fonts']);

gulp.task('watch', function() {
    gulp.watch(path.app.style, ['sass', 'style']);
    gulp.watch(path.app.js, ['scripts']);
    gulp.watch(path.app.html, ['html']);
    gulp.watch(path.app.img, ['images']);
    gulp.watch(path.app.fonts, ['fonts']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build', 'watch', 'browserSync');
});
