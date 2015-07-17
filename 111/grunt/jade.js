module.exports = {
	//основные файлы
	temp: {
		options: {
			pretty: true
		},
		files: [{
			expand: true,
			cwd: 'app/jade/pages/',
			src: ['*.jade'],
			dest: 'app/html/',
			ext: '.html',
			extDot: 'last'
		}]
	}
};