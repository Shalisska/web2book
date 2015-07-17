//var requireDir = require('require-dir');
//requireDir('./tasks', { recurse: true });

var gulp = require('gulp'),
	jade = require('gulp-jade');

gulp.task('jade', function () {
	gulp.src('app/jade/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./dist/'))
});