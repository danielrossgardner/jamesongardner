var  gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');

gulp.task('concat', function(){
  gulp.src(['./public/js/app.js','./public/js/**/*.js'])
  .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./public/dist'))

});

gulp.task('sass',function(){
  gulp.src(['./public/styles/reset.scss','./public/styles/fonts/base.scss','./public/styles/*.scss'])
  .pipe(concat('all.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/dist'))
});

// can provide an array of tasks

gulp.task('default',['concat','sass']);

// if you name a task default that is the task that will run if you just enter gulp in terminal

gulp.watch(['./public/js/app.js','./public/js/**/*.js'],['concat'])
