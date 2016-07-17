'use strict';

const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const spawn = require('child_process').spawn;

const cluesDb = './clues.db';

const binPath = 'node_modules/.bin';
const buildPath = './dist';
const scriptsPath = './scripts';
const sourcePath = './src';

const cssFiles = sourcePath + '/*.css';
const htmlFiles = sourcePath + '/*.html';

let runCmd = function(cmd, args, opts, callback) {
  opts = opts || {};
  let log = function(msg) {
    gutil.log(msg.toString().trim());
  }
  let logError = function(msg) {
    gutil.log(gutil.colors.red(msg.toString().trim()));
  };
  let proc = spawn(cmd, args, opts);
  if (proc.stdout) { proc.stdout.on('data', log); }
  if (proc.stderr) { proc.stderr.on('data', logError); }
  proc.on('close', (code) => {
    if (code > 0) { return callback(new Error(`${cmd} exited with an error`)); }
    callback();
  });
};

gulp.task('build', ['clean'], function(done) {
  return runSequence(['compile:ts', 'convert:db', 'copy:css', 'copy:html'], done);
});

gulp.task('compile:ts', function(done) {
  runCmd(binPath + '/tsc', [], {}, done);
});

gulp.task('convert:db', function(done) {
  let convert = (inFilename, outFilename) => {
    let inFile = fs.openSync(inFilename, 'r');
    let outFile = fs.openSync(outFilename, 'w');
    return new Promise((resolve, reject) => {
      runCmd('sqlite3', [cluesDb], {
        stdio: [inFile, outFile, 'inherit']
      }, (err) => {
        fs.closeSync(inFile);
        fs.closeSync(outFile);
        if (err) { return reject(err); }
        resolve();
      });
    });
  };

  let convertCategories = () => {
    return convert(scriptsPath + '/export-categories.sql', './categories.txt');
  };

  let convertClues = () => {
    return convert(scriptsPath + '/export-clues.sql', './clues.txt');
  };

  convertCategories().then(convertClues).then(done).catch(done);
});

gulp.task('clean', function() {
  return del(buildPath);
});

gulp.task('copy:css', function() {
  return gulp.src(cssFiles)
    .pipe(gulp.dest(buildPath));
});

gulp.task('copy:html', function() {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest(buildPath));
});

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
