module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'browserify:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
