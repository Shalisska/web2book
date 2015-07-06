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
	
var workmap = {
	img_dir: 'workmap',
	dest: [{
		width: ['0'],
		retina: { x1: '202', x15: '303', x2: '404', x3: '606'}
	}, {
		width: ['991'],
		retina: { x1: '126', x15: '189', x2: '252', x3: '378'}
	}, {
		width: ['767'],
		retina: { x1: '86', x15: '129', x2: '172', x3: '258'}
	}]
};
	
var action_controls = {
	img_dir: 'sprite/action-order-controls',
	dest: [{
		width: ['0', '991', '767'],
		retina: { x1: '150', x15: '225', x2: '300', x3: '450'}
	}]
};

function retina_cr(retina) {
  var arr = []
  arr.push({size: '1', img_size: retina.x1});
  arr.push({size: '1.5', img_size: retina.x15});
  arr.push({size: '2', img_size: retina.x2});
  arr.push({size: '3', img_size: retina.x3});    
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
	
var sprite_arr = [workmap, action_controls];
sprite_files = sprite_cr(sprite_arr);

return sprite_files;
};
sprite_create();
	

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
			build: ['build']
			//build_sprite: ['spec']
		},
		//копирование файлов в папку проекта
		copy: {
			build: {
				files: [{
					expand: true,
					cwd: 'app/',
					src: [
						'css/**',
						'images/**',
						'scripts/**',
						'fonts/**'
					],
					dest: 'build'
				}]
			},
			//копирование только нужных html-файлов
			build_html: {
				files: [{
					expand: true,
					cwd: 'app/html/',
					src:['*.html'],
					dest: 'build'
				}]
			}
//			build_sprite: {
//				files: sprite_files
//			}
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
//		sprite: {
//			normal: {
//				src: 'spec/sprite/sprite@1/*.png',
//				destImg: 'spec/spritesheet@1.png',
//				destCSS: 'spec/spritestyles@1.less',
//				padding: 2
//				cssTemplate: function (params) {
//					var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet.png); background-repeat: no-repeat;}';
//					for (var i = 0, ii = params.items.length; i < ii; i += 1) {
//						result += '.sprite_icon-' + params.items[i].name + '{' +
//							'background-position: ' + params.items[i].px.offset_x + ' ' + params.items[i].px.offset_y + ';' +
//							'width: ' + params.items[i].px.width + ';' +
//							'height: ' + params.items[i].px.height + ';' +
//							'}\n'
//					}
//					return result;
//				}
//			}
//			large15: {
//				src: 'spec/sprite/sprite@1.5/*.png',
//				destImg: 'spec/spritesheet@1.5x.png',
//				destCSS: 'spec/spritestyles@1.5x.less',
//				padding: 3,
//				cssTemplate: function (params) {
//					var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@1.5x.png); background-repeat: no-repeat;}';
//					result += '@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min-device-pixel-ratio: 1.5), only screen and (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {\n';
//					for (var i = 0, ii = params.items.length; i < ii; i += 1) {
//						result += '.sprite_icon-' + params.items[i].name + '{' +
//							'background-position: ' + params.items[i].offset_x/1.5 + 'px ' + params.items[i].offset_y/1.5 + 'px;' +
//							'background-size: ' + params.items[i].total_width/1.5 + 'px ' + params.items[i].total_height/1.5 + 'px;' +
//							'width: ' + params.items[i].width/1.5 + 'px;' +
//							'height: ' + params.items[i].height/1.5 + 'px;' +
//							'}\n'
//					}
//					result += '}';
//					return result;
//				}
//			},
//			large2: {
//				src: 'spec/sprite/sprite@2/*.png',
//				destImg: 'spec/spritesheet@2x.png',
//				destCSS: 'spec/spritestyles@2x.less',
//				padding: 4,
//				cssTemplate: function (params) {
//					var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@2x.png); background-repeat: no-repeat;}';
//					result += '@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {\n';
//					for (var i = 0, ii = params.items.length; i < ii; i += 1) {
//						result += '.sprite_icon-' + params.items[i].name + '{' +
//							'background-position: ' + params.items[i].offset_x/2 + 'px ' + params.items[i].offset_y/2 + 'px;' +
//							'background-size: ' + params.items[i].total_width/2 + 'px ' + params.items[i].total_height/2 + 'px;' +
//							'width: ' + params.items[i].width/2 + 'px;' +
//							'height: ' + params.items[i].height/2 + 'px;' +
//							'}\n'
//					}
//					result += '}';
//					return result;
//				}
//			},
//			large3: {
//				src: 'spec/sprite/sprite@3/*.png',
//				destImg: 'spec/spritesheet@3x.png',
//				destCSS: 'spec/spritestyles@3x.less',
//				padding: 6,
//				cssTemplate: function (params) {
//					var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@3x.png); background-repeat: no-repeat;}';
//					result += '@media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (-min--moz-device-pixel-ratio: 3), only screen and (-o-min-device-pixel-ratio: 5/2), only screen and (min-device-pixel-ratio: 3), only screen and (min-resolution: 288dpi), only screen and (min-resolution: 3dppx) {\n';
//					for (var i = 0, ii = params.items.length; i < ii; i += 1) {
//						result += '.sprite_icon-' + params.items[i].name + '{' +
//							'background-position: ' + params.items[i].offset_x/3 + 'px ' + params.items[i].offset_y/3 + 'px;' +
//							'background-size: ' + params.items[i].total_width/3 + 'px ' + params.items[i].total_height/3 + 'px;' +
//							'width: ' + params.items[i].width/3 + 'px;' +
//							'height: ' + params.items[i].height/3 + 'px;' +
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
};