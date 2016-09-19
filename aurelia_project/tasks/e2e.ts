import { CLIOptions } from 'aurelia-cli';
import * as del from 'del';
import * as gulp from 'gulp';
import { protractor, webdriver_standalone, webdriver_update } from 'gulp-protractor';
import * as typescript from 'gulp-typescript';
import * as tsc from 'typescript';

const rootPath = __dirname + '/../..';
const e2ePath = `${rootPath}/test/e2e`;
const buildPath = `${e2ePath}/dist`;

function cleanDist() {
  return del(buildPath);
}

function buildDist() {
  let typescriptCompiler = typescript.createProject('tsconfig.json', {
    typescript: tsc,
    module: 'commonjs'
  });
  return gulp.src([
      `${rootPath}/typings/**/*.d.ts`,
      `${rootPath}/custom_typings/**/*.d.ts`,
      `${e2ePath}/*.ts`
    ])
    .pipe(typescript(typescriptCompiler))
    .pipe(gulp.dest(buildPath));
}

export function runProtractor(done) {
  return gulp.src(`${e2ePath}/**.js`)
    .pipe(protractor({
      configFile: __dirname + '/../../protractor.conf.js',
      args: [
        '--baseUrl',
        CLIOptions.hasFlag('baseUrl') ? CLIOptions.getFlagValue('baseUrl') : 'http://127.0.0.1:9000'
      ]
    }))
    .on('end', function() { done(); })
    .on('error', function(e) { throw e; });
};

export default gulp.series(
  webdriver_update,
  cleanDist,
  buildDist,
  runProtractor
);
