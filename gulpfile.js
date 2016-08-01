const gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch');

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    });
});

gulp.task('html', function() {
    console.log('HTML changed')
    gulp.src('.')
        .pipe(connect.reload())
});

gulp.task('sass', function() {
    console.log('Compiling Sass')
    gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload())
    console.log('Sass done');
});

gulp.task('ts', function() {
    console.log('TS changed')
    gulp.src('./ts/**/*.ts')
        .pipe(connect.reload())
});

gulp.task('default', ['connect', 'sass'], function() {
    gulp.src('.').pipe(connect.reload())
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./ts/**/*.ts', ['ts']);
    gulp.watch('./*.html', ['html']);
});