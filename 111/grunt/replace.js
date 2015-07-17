//замена относительных адресов
module.exports = {
	build: {
		options: {
			patterns: [{
				match: /src="..\//g,
				replacement: 'src="'
			}, {
				match: /href="..\//g,
				replacement: 'href="'
			}, {
				match: /..\/images/g,
				replacement: 'images'
			}]
		},
		files: [{
			expand: true,
			flattern: true,
			src: ['build/*.html']
		}]
	}
};