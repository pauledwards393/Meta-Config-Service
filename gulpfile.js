var gulp = require('gulp'),
	server = require('gulp-develop-server'),
	livereload = require('gulp-livereload');

gulp.task('server:start', function() {
	server.listen({ path: 'server.js' }, livereload.listen);
});

gulp.task('default', [ 'server:start' ], function() {

	function restart(file) {
		server.changed(function(error) {
			if (!error)
				livereload.changed(file.path);
		});
	}

	gulp.watch( ['server.js', 'routes.js', 'advertisers.js', 'databaseProvider.js'] ).on('change', restart);
});