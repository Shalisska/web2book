//сортировка файлов для спрайта
var sprite_files = [];

function sprite_create() {
var width_arr = [];
var dest_arr = [];

function in_array(value, array) {
  for(var i = 0; i < array.length; i++) {
    if(array[i] == value) return true;
  }
  return false;
};
	
var header_btn = {
	img_dir: 'header/header-slider_controls--btn',
	dest: [{
		width: ['0'],
		retina: 46
	}]
};
	
var header_arrow = {
	img_dir: 'header/sprite/reg',
	dest: [{
		width: ['0'],
		retina: 42
	}]
};

var header_arrow_hover = {
	img_dir: 'header/sprite/hover',
	dest: [{
		width: ['0'],
		retina: 52
	}]
};

function retina_cr(retina) {
  var arr = []
  arr.push({size: '1', img_size: retina});
  arr.push({size: '1.5', img_size: retina * 1.5});
  arr.push({size: '2', img_size: retina * 2});
  arr.push({size: '3', img_size: retina * 3});
  return arr;
};


function dest_cr(dir, width, retina) {  
  var width_r;
  
  if(width == 0) {
    width_r = '';
  } else {
    width_r = width;
  }
  
  var src = dir + '/**/*@' + retina.img_size + '.png';
  var dest = 'spec/sprite' + width_r + '/sprite@' + retina.size;
  
  if(!(in_array(dest, dest_arr))) {
    dest_arr.push(dest);
  }
  
  return {src: src, dest: dest};
};



function dest_build(dir, dests) {
  var array = [];
  for (var k=0; k<dests.length; k++) {
    var dest = dests[k];
    var item = retina_cr(dest.retina);

    for(var j=0; j<dest.width.length; j++) {
      var width_r = dest.width[j];
      var arr = [];

      if(!(in_array(width_r, width_arr))) {
        width_arr.push(width_r);
      }

      for(var i=0; i<item.length; i++) {
        arr.push(dest_cr(dir, width_r, item[i]));
      }

      var obj = {width: width_r, arr: arr};
      array.push(obj);
    }
  }
  return array;
};

function width_cr(array) {
  var a = [];
  for(var i=0; i<array.length; i++) {
    a = a.concat(array[i]);
  }
  return a;
};

function sprite_cr (arr) {
  var spr_arr = [];
  var arr_main = [];
  
  for (var i=0; i<arr.length; i++) {
    var elem = arr[i];
    
    spr_arr.push(dest_build(elem.img_dir, elem.dest));
  };
  
  var spr_array = width_cr(spr_arr);
  var w_build = width_build(width_arr, spr_array);
  
  for(var i=0; i<dest_arr.length; i++) {
    var arr_stek = [];
    for(var j=0; j<w_build.length; j++) {
      var stek = w_build[j];
      for(var l=0; l<stek.length; l++) {
        if(stek[l].dest == dest_arr[i]) {
          arr_stek.push(stek[l]);
        }
      };
    };
    
    var obj_src = [];
    var obj_src_r = [];
    for(var m=0; m<arr_stek.length; m++) {
      obj_src.push(arr_stek[m].src);
    };
    
    var obj_sprite = {
      expand: true,
      cwd: 'app/images/',
      src: obj_src,
      dest: dest_arr[i],
      flatten: true
    };
    
    arr_main.push(obj_sprite);
  };
  return arr_main
  
};

function width_build(width, array) {
  var arr = [];
  
  for(var i=0; i<width.length; i++) {
    var arr_w = [];
    var w = width[i];
    
    for(var j=0; j<array.length; j++) {
      var ar = array[j];
      if(w == ar.width) {
        arr_w = arr_w.concat(ar.arr);
      }
    }
    arr.push(arr_w);
  }
  return arr;
};
	
var sprite_arr = [header_btn, header_arrow, header_arrow_hover];
sprite_files = sprite_cr(sprite_arr);

return sprite_files;
};
sprite_create();

//создание спрайтов
var my_sprite = {
  vars: {
    name: 'retina',
    retina: [1, 1.5, 2, 3]
  },
	obj_cr: function() {
    var vars = this.vars;
    var obj_gl = {};
    
    for(var i=0; i<vars.retina.length; i++) {
      var obj ={};
      
      var retina_name = vars.retina[i];
      if(vars.retina[i]%1 != 0) {
        retina_name = vars.retina[i] * 10;
      };
      var obj_name = vars.name + retina_name;
		
		function templ(ret_i) {
			var ret = ret_i;
			
			var tem = function(data) {
				var result = '';
			
				if (ret != 1) {
					var media_opera;
					var media_dpi = 96*ret;
					switch (ret) {
						case 1.5:
							media_opera = '3/2';
							break
						case 2:
							media_opera = '2/1';
							break
						case 3:
							media_opera = '5/2';
							break
						default:
							break
				};

				result += '@media only screen and (-webkit-min-device-pixel-ratio: ' + ret + '), only screen and (min--moz-device-pixel-ratio: ' + ret + '), only screen and (-o-min-device-pixel-ratio: ' + media_opera + '), only screen and (min-device-pixel-ratio: ' + ret + '), only screen and (min-resolution: ' + media_dpi + 'dpi), only screen and (min-resolution: ' + ret + 'dppx) {\n';
				};
				
				result += '.sprite {background-image: url(../images/spritesheet/spritesheet@' + ret + '.png);}'
				
				for (var i = 0, ii = data.items.length; i < ii; i += 1) {
					var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
					var name = '.sprite_icon-' + name_new;
					var hover = '--hover';
					var active = '--active';
					var header_slider_btn = {
						name: 'header-slider_controls--btn--active',
						vars: ['slide1', 'slide2', 'slide3', 'slide4', 'slide5']};
					
					if(name_new == header_slider_btn.name) {
						name_new = [];
						for(var j = 0, jj = header_slider_btn.vars.length; j < jj; j += 1) {
							var elem = header_slider_btn.vars[j];
							var name_elem = '.header-slider__input#header-slider--' + elem
							+ ':checked ~ .header-slider__controls label[for="header-slider--' + elem + '"]';
							name_new.push(name_elem);
						};
						name = '' + name_new;
					} else {
						if(name_new.slice(name_new.length - hover.length) == hover) {
							name_new = name_new.slice(0, (name_new.length - hover.length)) + ':hover';
						} else if(name_new.slice(name_new.length - active.length) == active) {
							name_new = name_new.slice(0, (name_new.length - active.length)) + ':active';
						}
						name = '.sprite_icon-' + name_new;
					}
					
						result += name + '{' +
							'background-position: ' + parseInt(data.items[i].offset_x)/ret + 'px ' + parseInt(data.items[i].offset_y)/ret + 'px;' +
							'background-size: ' + parseInt(data.items[i].total_width)/ret + 'px ' + parseInt(data.items[i].total_height)/ret + 'px;' +
							'width: ' + parseInt(data.items[i].width)/ret + 'px;' +
							'height: ' + parseInt(data.items[i].height)/ret + 'px;' +
							'}\n';
				}
				return result;
			}
			return tem;
		};

		obj = {
			src: 'spec/sprite/sprite@' + vars.retina[i] + '/*.png',
			dest: 'spec/spritesheet@' + vars.retina[i] + '.png',
			destCss: 'app/less/helpers/sprites@' + vars.retina[i] + '.less',
			cssTemplate: templ(vars.retina[i])
		};

			obj_gl[obj_name] = obj;
		}
		return obj_gl;
	}
};
var sprite_build = my_sprite.obj_cr();



module.exports = function (grunt) {
	
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		//компиляция less
		less: {
			style: {
				files: {
					'app/css/style.css' : ['app/less/common.less']
				}
			}
		},
		//автопрефиксер
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8']
			},
			style: {
				src: 'app/css/style.css'
			}
		},
		//комбинирует медиа-выражения
		cmq: {
			style: {
				files: {
					'app/css/style.css' : ['app/css/style.css']
				}
			}
		},
		//минимизирует стилевой файл
		cssmin: {
			style: {
				options: {
					KeepSpecialComments: 0,
					report: 'gzip'
				},
				files: {
					'build/css/style.min.css' : ['build/css/style.css']
				}
			}
		},
		//делает стилевой файл красивым
		csscomb: {
			style: {
				files: {
					'app/css/style.css' : ['app/css/style.css']
				}
			}
		},
		//минимизирует изображения
		imagemin: {
			build: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					src: ['app/images/**/*.{png, jpg, gif, svg}']
				}]
			}
		},
		//минимизирует html-файлы
		htmlmin: {
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
		},
		//очистка папки проекта
		clean: {
			//build: ['build']
			build_sprite: ['spec']
		},
		//копирование файлов в папку проекта
		copy: {
//			build: {
//				files: [{
//					expand: true,
//					cwd: 'app/',
//					src: [
//						'css/**',
//						'images/**',
//						'scripts/**',
//						'fonts/**'
//					],
//					dest: 'build'
//				}]
//			},
//			//копирование только нужных html-файлов
//			build_html: {
//				files: [{
//					expand: true,
//					cwd: 'app/html/',
//					src:['*.html'],
//					dest: 'build'
//				}]
//			}
			build_sprite: {
				files: sprite_files
			}
		},
		//работа с jade-файлами
		jade: {
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
		},
		//замена пробелов табами в html-файлах
		prettify: {
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
		},
		//запуск автоматических функций
		watch: {
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
		},
		//минимизатор JS
		uglify: {
			build: {
				src: 'build/js/js.js',
				dest: 'build/js/js.min.js'
			}
		},
		//замена относительных адресов
		replace: {
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
		},
		sprite: sprite_build
//		sprite: {
//			normal: sprite_build
//			normal: {
//				ret: 1,
//				src: 'spec/sprite/sprite@1/*.png',
//				dest: 'spec/spritesheet@1.png',
//				destCss: 'app/less/helpers/sprites@1.less',
//				cssTemplate: function(data) {
//					var ret = this.ret;
//					var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@' + ret + '.png); background-repeat: no-repeat;}';
//					for (var i = 0, ii = data.items.length; i < ii; i += 1) {
//						var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
//						result += '.sprite_icon-' + name_new + '{' +
//							'background-position: ' + data.items[i].px.offset_x + ' ' + data.items[i].px.offset_y + ';' +
//							'width: ' + data.items[i].px.width + ';' +
//							'height: ' + data.items[i].px.height + ';' +
//							'}\n'
//					}
//					return result;
//				}
//			}
//		}
//			large15: {
//				src: 'spec/sprite/sprite@1.5/*.png',
//				dest: 'spec/spritesheet@1.5.png',
//				destCss: 'app/less/helpers/sprites@1.5.less',
//				padding: 3,
//				cssTemplate: function (data) {
//					var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@1.5x.png); background-repeat: no-repeat;}';
//					result += '@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min-device-pixel-ratio: 1.5), only screen and (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {\n';
//					for (var i = 0, ii = data.items.length; i < ii; i += 1) {
//						var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
//						result += '.sprite_icon-' + name_new + '{' +
//							'background-position: ' + data.items[i].offset_x/1.5 + 'px ' + data.items[i].offset_y/1.5 + 'px;' +
//							'background-size: ' + data.items[i].total_width/1.5 + 'px ' + data.items[i].total_height/1.5 + 'px;' +
//							'width: ' + data.items[i].width/1.5 + 'px;' +
//							'height: ' + data.items[i].height/1.5 + 'px;' +
//							'}\n'
//					}
//					result += '}';
//					return result;
//				}
//			},
//			large2: {
//				src: 'spec/sprite/sprite@2/*.png',
//				dest: 'spec/spritesheet@2.png',
//				destCss: 'app/less/helpers/sprites@2.less',
//				padding: 4,
//				cssTemplate: function (data) {
//					var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@2x.png); background-repeat: no-repeat;}';
//					result += '@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {\n';
//					for (var i = 0, ii = data.items.length; i < ii; i += 1) {
//						var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
//						result += '.sprite_icon-' + name_new + '{' +
//							'background-position: ' + data.items[i].offset_x/2 + 'px ' + data.items[i].offset_y/2 + 'px;' +
//							'background-size: ' + data.items[i].total_width/2 + 'px ' + data.items[i].total_height/2 + 'px;' +
//							'width: ' + data.items[i].width/2 + 'px;' +
//							'height: ' + data.items[i].height/2 + 'px;' +
//							'}\n'
//					}
//					result += '}';
//					return result;
//				}
//			},
//			large3: {
//				src: 'spec/sprite/sprite@3/*.png',
//				dest: 'spec/spritesheet@3.png',
//				destCss: 'app/less/helpers/sprites@3.less',
//				padding: 6,
//				cssTemplate: function (data) {
//					var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@3x.png); background-repeat: no-repeat;}';
//					result += '@media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (-min--moz-device-pixel-ratio: 3), only screen and (-o-min-device-pixel-ratio: 5/2), only screen and (min-device-pixel-ratio: 3), only screen and (min-resolution: 288dpi), only screen and (min-resolution: 3dppx) {\n';
//					for (var i = 0, ii = data.items.length; i < ii; i += 1) {
//						var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
//						result += '.sprite_icon-' + name_new + '{' +
//							'background-position: ' + data.items[i].offset_x/3 + 'px ' + data.items[i].offset_y/3 + 'px;' +
//							'background-size: ' + data.items[i].total_width/3 + 'px ' + data.items[i].total_height/3 + 'px;' +
//							'width: ' + data.items[i].width/3 + 'px;' +
//							'height: ' + data.items[i].height/3 + 'px;' +
//							'}\n'
//					}
//					result += '}';
//					return result;
//				}
//			}
//		}
	});
	
	grunt.registerTask('default', [
//		'imagemin',
		'clean',
		'copy',
//		'cssmin',
//		'htmlmin',
//		'uglify',
		'replace'
	]);
	
	grunt.registerTask('debug', [
		'less',
		'autoprefixer',
		'cmq',
		'csscomb'
	]);
	
	grunt.registerTask('replacing', [
		'clean',
		'copy'
	]);
	
	grunt.registerTask('sprite_build', [
		'sprite'
	]);
};