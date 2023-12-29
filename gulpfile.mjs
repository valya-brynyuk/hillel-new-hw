'use strict';

import gulp from 'gulp';


export function watchImages() {
  gulp.watch('src/img/*', {events: ['add', 'unlink']}, function (cb) {
    console.log('Added or removed image')

    cb();
  })
}

export function watchSass() {
  gulp.watch('src/sass/*.sass', {events: ['change']}, function (cb) {
    console.log('Changed sass file')

    cb();
  })
}

export function watchDist() {
  gulp.watch('dist/', {events: ['unlinkDir', 'addDir', ]}, function (cb) {
    console.log('Dist directory structure changed')

    cb();
  })
}

export const watch = gulp.parallel(watchDist, watchSass, watchImages);
