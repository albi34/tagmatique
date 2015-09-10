module.exports = function(grunt) {

	grunt.config.set('react', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
        src: ['**/*.jsx'],
				dest: '.tmp/public',
        ext: '.js'
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

  grunt.loadNpmTasks('grunt-react');
};
