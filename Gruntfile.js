module.exports = function (grunt) {
	
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		less: require('./grunt/less.js'),//компиляция less
		autoprefixer: require('./grunt/autoprefixer.js'),//автопрефиксер
		cmq: require('./grunt/cmq.js'),//комбинирует медиа-выражения
		cssmin: require('./grunt/cssmin.js'),//минимизирует стилевой файл
		csscomb: require('./grunt/csscomb.js'),//делает стилевой файл красивым
		imagemin: require('./grunt/imagemin.js'),//минимизирует изображения
		htmlmin: require('./grunt/htmlmin.js'),//минимизирует html-файлы
		clean: require('./grunt/clean.js'),//очистка папки проекта
		copy: require('./grunt/copy.js'),//копирование файлов в папку проекта
		jade: require('./grunt/jade.js'),//работа с jade-файлами
		prettify: require('./grunt/prettify.js'),//замена пробелов табами в html-файлах
		watch: require('./grunt/watch.js'),//запуск автоматических функций
		uglify: require('./grunt/uglify.js'),//минимизатор JS
		replace: require('./grunt/replace.js'),//замена относительных адресов
		sprite: require('./grunt/sprite.js'),
		concat: require('./grunt/concat.js'),
		concurrent: require('./grunt/concurrent.js'),
		notify: require('./grunt/notify.js')
	});
	
	grunt.registerTask('default', [
//		'imagemin',
		'clean:build',
		'copy:build',
		'copy:build_html',
//		'cssmin',
//		'htmlmin',
//		'uglify',
//		'concat',
		'replace'
	]);
	
	grunt.registerTask('debug', [
		'newer:less',
		'newer:autoprefixer',
		'newer:cmq',
		'newer:csscomb'
	]);
	
	grunt.registerTask('replacing', [
		'clean:build_sprite',
		'copy:build_sprite'
	]);
	
	grunt.registerTask('sprite_build', [
		'clean:build_sprite',
		'copy:build_sprite',
		'sprite'
	]);
	
	grunt.registerTask('sprite_form', [
		'clean:sprite_form',
		'copy:sprite_form',
		'sprite'
	]);
	
	grunt.registerTask('sprite_private', [
		'clean:sprite_private',
		'copy:sprite_private',
		'sprite'
	]);
};