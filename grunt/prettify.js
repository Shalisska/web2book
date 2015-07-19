module.exports = {
	options: {
		indent: 1,
		indent_char: '	'
	},
	html: {
		expand: true,
		cwd: 'app/html',
		ext: '.html',
		src: '**/*.html',
		dest: 'app/html'
	}
};