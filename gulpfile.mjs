'use strict';

import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import gulp from 'gulp';
import * as sassCompiller from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import gulpCopy from 'gulp-copy';
import gulpClean from 'gulp-clean';
import browserSync from 'browser-sync';

const CWD = dirname(fileURLToPath(import.meta.url));
const SRC = join(CWD, 'src');
const STYLES_SRC = join(SRC, 'sass', '*.sass');
const DIST = join(CWD, 'dist');
const sass = gulpSass(sassCompiller);
const sync = browserSync.create()

export function serve() {
  sync.init({
    server: DIST,
  })
}

export function copyFiles() {
  return gulp.src([join(SRC, 'img', '*'), join(SRC, '*.html')])
    .pipe(gulpCopy(DIST, {
      prefix: 1
    }));
}

export function clean() {
  return gulp.src(DIST, {allowEmpty: true})
    .pipe(gulpClean({
      force: true,
    }));
}

export function buildStyles() {
  return gulp.src(STYLES_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(sourcemaps.write(DIST))
    .pipe(gulp.dest(join(DIST, 'style')));
}

export const build = gulp.series(clean, copyFiles, buildStyles);

// non posix path style issue
export const watch = gulp.series(build, gulp.parallel(() => gulp.watch(`src/sass/*.sass`, buildStyles), serve));
