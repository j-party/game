import * as fs from 'fs';
import * as gulp from 'gulp';
import { spawn } from 'child_process';
import * as project from '../aurelia.json';

const cluesDb = project.databaseConverter.source;
const scriptsPath = project.databaseConverter.scriptsPath;

function runCmd(cmd, args, opts, callback) {
  opts = opts || {};
  let log = function(msg) {
    console.log(msg.toString().trim());
  }
  let logError = function(msg) {
    console.log('ERROR:', msg.toString().trim());
  };
  log('Running ' + cmd + ' ' + args.join(' ') + ' ...');
  let proc = spawn(cmd, args, opts);
  if (proc.stdout) { proc.stdout.on('data', log); }
  if (proc.stderr) { proc.stderr.on('data', logError); }
  proc.on('close', (code) => {
    if (code > 0) { return callback(new Error(`${cmd} exited with an error`)); }
    callback();
  });
}

function convert(inFilename, outFilename) {
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

export default function convertDatabase() {
  let convertCategories = () => {
    return convert(`${scriptsPath}/export-categories.sql`, './categories.txt');
  };
  let convertClues = () => {
    return convert(`${scriptsPath}/export-clues.sql`, './clues.txt');
  };
  return convertCategories().then(convertClues);
};
