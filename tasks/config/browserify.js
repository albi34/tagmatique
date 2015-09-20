/**
 * browserify scripts.
 *
 */
module.exports = function(grunt) {

	grunt.config.set('browserify', {
		dev: {
			files: {
				'.tmp/public/js/bundle.js': 'assets/js/public/app.js',
			},
			options: {
				transform: ['reactify', "envify"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
};
