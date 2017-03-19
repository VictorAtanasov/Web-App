const gulp = require('gulp');
const gulpsync = require('gulp-sync') (gulp);
const eslint = require('gulp-eslint');
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const smushit = require('gulp-smushit');
const sass = require('gulp-sass');


gulp.task('lint:js', () => {
    gulp
        .src(["dev/**/*.js", '!node_modules/**'])
        .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
})

gulp.task('clean', () =>{
    return del('public/js')
})

gulp.task('compile:js', () => {
    gulp.src("dev/**/*.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(
            uglify()
        )
        .pipe(
            gulp.dest('public')
        )
})

gulp.task('compile:sass', () => {
    return gulp.src('dev/css/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
})

gulp.task('sass:watch', function (){
    gulp.watch('dev/css/sass/styles.scss', ['compile:sass']);
})

gulp.task('smushit', () => {
    return gulp.src('dev/css/images/*.{jpg,png}')
        .pipe(smushit())
        .pipe(gulp.dest('public/css/images')); 
})
gulp.task('compile', ['compile:js', 'compile:sass'])
gulp.task('lint', ['lint:js'])
gulp.task('build', gulpsync.sync(['clean', 'lint', 'compile'])) 