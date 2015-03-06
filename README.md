# gulp-collector
Collect files from pipeline

## Usage

```
npm i gulp-collector
```

```js
var gulp = require('gulp'),
	collector = require('gulp-collector');

gulp.task('default', function () {
	gulp.src('components/**/index.{html,css}')
		.pipe(collector(function (src) {
			// Src - object with {filename: content} of files in the same directory
			// return { filename: content }
			return { 'compiled.html': src['index.html'] + '\n===\n' + src['index.css'] };
		}, options))
});

```

### options

- `options.cache` ('default') - cache namespace
- `options.base` ('.') - glob base



##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2015 Bogdan Chadkin
