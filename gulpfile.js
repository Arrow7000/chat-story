const gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch');

gulp.task('connect', function() {
    return connect.server({
        root: '.',
        livereload: true
    });
});

gulp.task('html', function() {
    console.log('HTML changed')
    return gulp.src('.')
        .pipe(connect.reload())
});

gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload())
});

gulp.task('ts', function() {
    console.log('TS changed')
    return gulp.src('.')
        .pipe(connect.reload())
});

gulp.task('reload', ['connect'], function() {
    return gulp.src('.')
        .pipe(connect.reload())
});

gulp.task('default', ['sass', 'reload'], function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./ts/**/*.ts', ['ts']);
    gulp.watch('./*.html', ['html']);
});