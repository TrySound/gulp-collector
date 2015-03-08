var through = require('through2'),
	gutil = require('gulp-util'),
	extend = require('extend'),
	path_lib = require('path'),
	cache = {};


function collector(fn, opts) {
	opts = opts || {};
	opts.cache = typeof opts.cache === 'string' ? opts.cache : 'default';
	opts.base = typeof opts.base === 'string' ? opts.base : '.';


	var registry = opts.cache ? (cache[opts.cache] = cache[opts.cache] || {}) : {},
		active = [];

	return through.obj(function (file, enc, cb) {
		var dir,
			result,
			push = this.push.bind(this);

		if(file.isNull()) {
			cb();
			return;
		}

		if(file.isStream()) {
			cb(new gutil.PluginError('gulp-collector',  'Streaming not supported'));
			return;
		}

		if(typeof fn === 'function') {
			dir = path_lib.dirname(file.path)

			if( ! (dir in registry)) {
				registry[dir] = {};
			}

			if(active.indexOf(dir) === -1) {
				active.push(dir);
			}
			registry[dir][path_lib.basename(file.path)] = file.contents.toString();
		}

		cb();

	}, function (cb) {
		var push = this.push.bind(this);

		active.forEach(function (dir) {
			var files = registry[dir],
				result;

			if(Object.keys(files).length) {
				result = fn(extend({}, files), dir);

				if(typeof result === 'object') {
					Object.keys(result).forEach(function (filename) {
						var file;

						if(filename) {
							push(new gutil.File({
								base: opts.base,
								path: [dir, filename].join('/'),
								contents: new Buffer(result[filename])
							}));
						}
					});
				}
			}
		});

		cb();
	});
};


module.exports = collector;
