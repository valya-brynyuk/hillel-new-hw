'use strict';

import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import gulp from 'gulp';
import * as sassCompiller from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

const CWD = dirname(fileURLToPath(import.meta.url));
const SRC = join(CWD, 'src');
const STYLES_SRC = join(SRC, 'sass', '*.sass');
const DIST = join(CWD, 'dist');
const sass = gulpSass(sassCompiller);

export function buildStyles() {
  return gulp.src(STYLES_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(sourcemaps.write(DIST))
    .pipe(gulp.dest(join(DIST, 'style')));
}

export const watch = () => gulp.watch(STYLES_SRC, gulp.series(buildStyles));
