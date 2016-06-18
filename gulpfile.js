'use strict';

const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const spawn = require('child_process').spawn;

const binPath = 'node_modules/.bin';
const buildPath = './dist';
const sourcePath = './src';

const cssFiles = sourcePath + '/*.css';
const htmlFiles = sourcePath + '/*.html';

let runCmd = function(cmd, args, callback) {
  let log = function(msg) {
    gutil.log(msg.toString().trim());
  }
  let logError = function(msg) {
    gutil.log(gutil.colors.red(msg.toString().trim()));
  };
  let proc = spawn(cmd, args);
  proc.stdout.on('data', log);
  proc.stderr.on('data', logError);
  proc.on('close', (code) => {
    if (code > 0) { return callback(new Error(`${cmd} exited with an error`)); }
    callback();
  });
};

gulp.task('build', ['clean'], function(done) {
  return runSequence(['compile:ts', 'copy:css', 'copy:html'], done);
});

gulp.task('compile:ts', function(done) {
  runCmd(binPath + '/tsc', [], done);
});

gulp.task('clean', function() {
  return del(buildPath);
});

gulp.task('copy:css', function() {
  return gulp.src(cssFiles)
    .pipe(gulp.dest(buildPath));
})

gulp.task('copy:html', function() {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest(buildPath));
})

gulp.task('default', function(done) {
  runSequence('build', ['serve', 'watch']);
});

gulp.task('serve', function() {
  runCmd(binPath + '/lite-server', []);
});

gulp.task('test', function() {
  // TODO
});

gulp.task('watch', function() {
  runCmd(binPath + '/tsc', ['-w']);
  gulp.watch(cssFiles, ['copy:css']);
  gulp.watch(htmlFiles, ['copy:html']);
});
