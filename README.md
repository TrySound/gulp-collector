# gulp-collector
Collect files from pipeline by their folder

## Usage

```
npm i gulp-collector
```

```js
var gulp = require('gulp'),
	collector = require('gulp-collector');

gulp.task('default', function () {
	gulp.src('components/**/index.{html,css}')
		.pipe(collector(function (files, dirname) {
			// files - object with {filename: content} of files in the same directory
			// dirname - directory of files
			if('index.css' in files && 'index.html' in files) {
				var css = files['index.css'],
					html = files['index.html'],
					result;

				// Process html with cheerio
				// Process css with postcss
					// Adding prefix to classes
					// Changing custom tag names

				result = '<style>' + css + '</style>' + html;

				// return { filename: content }
				return { 'compiled.html': result };
			}
		}, options, end))
});

```

### options

- `options.cache` ('default') - cache namespace
- `options.base` ('.') - glob base

### end callback

Gets and returns files like build function in the final

### Watch optimization

```js
var gulp = require('gulp'),
	$ = require('gulp-load-plugins');

gulp.task('default', function () {
	gulp.src('components/**/index.{html,css}')
		// Changed file will be associated with other files in directory
		.pipe($.cached('templates'))
		.pipe($.collector(buildFn))
		// Collected files will be restored
		.pipe($.remember('templates'))
		.pipe(gulp.dest('dest_folder'));
});
```


## License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2015 Bogdan Chadkin
