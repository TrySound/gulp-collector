# gulp-collector
Collect files from pipeline

```
npm i gulp-collector
```

```js
var gulp = require('gulp'),
	collector = require('gulp-collector');

gulp.task('default', function () {
	gulp.src('components/**/*.*')
		.pipe(collector(function (src) {
			return {
				filename: 'compiled.html',
				content: src['index.html'] + '\n===\n' + src['index.css']
			};
		}, ['index.html', 'index.css']))
});

```


##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2015 Bogdan Chadkin
