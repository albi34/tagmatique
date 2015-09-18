module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'react:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
