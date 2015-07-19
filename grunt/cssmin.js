module.exports = {
	style: {
		options: {
			KeepSpecialComments: 0,
			report: 'gzip'
		},
		files: {
			'build/css/style.min.css' : ['build/css/style.css']
		}
	}
};