module.exports = {
	//компилятор less и автопрефиксер
	styles: {
		files: ['app/less/**/*.less'],
		tasks: ['less:style', 'autoprefixer'],
		options: {
			spawn: false
		}
	},
	//компилятор jade
	jades: {
		files: ['app/jade/**/*.jade'],
		tasks: ['jade'],
		options: {
			spawn: false
		}
	}
};