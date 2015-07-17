module.exports = {
	options: {
		removeComments: true,
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		caseSensitive: true,
		keepClosingSlash: true
	},
	build: {
		files: {
			'build/index.html' : 'build/index.html'
		}
	}
};