module.exports = {
	build: {
		options: {
			optimizationLevel: 3
		},
		files: [{
			expand: true,
			src: ['app/images/**/*.{png, jpg, gif, svg}']
		}]
	}
};