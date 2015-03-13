var gulp = require('gulp'),
	collector = require('../index');

gulp.task('default', function () {
	var dst = '';
	return gulp.src('src/*.*')
		.pipe(collector(function (files) {
			Object.keys(files).forEach(function (filename) {
				dst += files[filename];
			});
		}, {}, function () {
			return {
				'result.txt': dst
			};
		}))
		.pipe(gulp.dest('dst'));
});
