//***************************************//
// Gulpfile for building a styleguide    //
//***************************************//

/* Common Deps */

var env         = process.env['NODE_ENV'] || 'development';
var config      = require('./config/' + env + '.json');

var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');

/* Simple Express server */

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(4000);
});

/* SCSS Tasks */

var sass = require('gulp-sass');

gulp.task('scss:dev', function(){
    return gulp.src(config.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
          noCache: true,
          style: "expanded",
          lineNumbers: true,
          loadPath: config.scss.src
        }))
        .pipe(sourcemaps.write(config.scss.mapsDir))
        .pipe(gulp.dest('css'));
});

var minifyCSS = require('gulp-minify-css');

gulp.task('scss:prod', function(){
    return gulp.src(config.scss.src)
        .pipe(sass(config.sass))
        .pipe(minifyCSS(config.minifyCSS || {}))
        .pipe(gulp.dest(config.scss.dest));
});

/* JavaScript Tasks */

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('js:lint', function(){
    return gulp.src(config.js.glob)
        .pipe(jshint(config.jshint))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

var concat = require('gulp-concat');

gulp.task('js:dev', function(){
    return gulp.src(config.js.src)
            .pipe(sourcemaps.init())
            .pipe(concat(config.js.destFile))
            .pipe(sourcemaps.write(config.js.mapsDir))
            .pipe(gulp.dest(config.js.dest));
});

var uglify = require('gulp-uglify');

gulp.task('js:prod', function(){
    return gulp.src(config.js.src)
            .pipe(concat(config.js.destFile))
            .pipe(uglify(config.uglify || {}))
            .pipe(gulp.dest(config.js.dest));
});

/* LiveReload */

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

/* Watch Task */

gulp.task('watch', function(){
    gulp.watch(config.scss.glob, ['scss:dev']);
    gulp.watch(config.js.glob, ['js:lint', 'js:dev']);
    gulp.watch('*.html', notifyLiveReload);
    gulp.watch('css/*.css', notifyLiveReload);
});

gulp.task('build', ['scss:prod', 'js:prod']);

gulp.task('default', ['express', 'livereload', 'watch'], function() {

});
