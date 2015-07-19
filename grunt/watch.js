module.exports = {
	//компилятор less и автопрефиксер
	styles: {
		files: ['app/less/**/*.less'],
		tasks: ['less:style', 'autoprefixer', 'notify:less'],
		options: {
			spawn: false
		}
	},
	//компилятор jade
	jades: {
		files: ['app/jade/**/*.jade'],
		tasks: ['jade', 'notify:jade'],
		options: {
			spawn: false
		}
	}
};