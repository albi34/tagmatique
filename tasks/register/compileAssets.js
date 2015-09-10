module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		'react:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
