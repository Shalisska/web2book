//создание спрайтов
var my_sprite = {
	vars: {
		name: 'retina',
		retina: [1, 1.5, 2, 3]
	},
	obj_cr: function () {
		var vars = this.vars,
			obj_gl = {},
			i;
		for (i = 0; i < vars.retina.length; i += 1) {
			var obj = {},
				retina_name = vars.retina[i],
				obj_name;
			if (vars.retina[i] % 1 !== 0) {
				retina_name = vars.retina[i] * 10;
			}
			obj_name = vars.name + retina_name;
		
			function templ(ret_i) {
				var ret = ret_i,
					tem;

				tem = function (data) {
					var result = '',
						media_opera,
						media_dpi;

					if (ret !== 1) {
						media_dpi = 96 * ret;
						switch (ret) {
						case 1.5:
							media_opera = '3/2';
							break;
						case 2:
							media_opera = '2/1';
							break;
						case 3:
							media_opera = '5/2';
							break;
						default:
							break;
						}

						result += '@media only screen and (-webkit-min-device-pixel-ratio: ' + ret + '), only screen and (min--moz-device-pixel-ratio: ' + ret + '), only screen and (-o-min-device-pixel-ratio: ' + media_opera + '), only screen and (min-device-pixel-ratio: ' + ret + '), only screen and (min-resolution: ' + media_dpi + 'dpi), only screen and (min-resolution: ' + ret + 'dppx) {\n';
					}

					result += '.sprite {background-image: url(../images/spritesheet/spritesheet@' + ret + '.png);}';

					var i,
						ii = data.items.length;
					for (i = 0; i < ii; i += 1) {
						var name_new = data.items[i].name.replace((/@[0-9]*/g), ''),
							name = '.sprite_icon-' + name_new,
							hover = '--hover',
							active = '--active',
							header_slider_btn = {
								name: 'header-slider_controls--btn--active',
								vars: ['slide1', 'slide2', 'slide3', 'slide4', 'slide5']
							},
							j,
							jj = header_slider_btn.vars.length;

						if (name_new === header_slider_btn.name) {
							name_new = [];
							for (j = 0; j < jj; j += 1) {
								var elem = header_slider_btn.vars[j],
									name_elem = '.header-slider__input#header-slider--' + elem
										+ ':checked ~ .header-slider__controls label[for="header-slider--' + elem + '"]';
								name_new.push(name_elem);
							}
							name = name_new;
						} else {
							if (name_new.slice(name_new.length - hover.length) === hover) {
								name_new = name_new.slice(0, (name_new.length - hover.length)) + ':hover';
							} else if (name_new.slice(name_new.length - active.length) === active) {
								name_new = name_new.slice(0, (name_new.length - active.length)) + ':active';
							}
							name = '.sprite_icon-' + name_new;
						}

						result += name + '{' +
							'background-position: ' + parseInt(data.items[i].offset_x) / ret + 'px ' + parseInt(data.items[i].offset_y) / ret + 'px;' +
							'background-size: ' + parseInt(data.items[i].total_width) / ret + 'px ' + parseInt(data.items[i].total_height) / ret + 'px;' +
							'width: ' + parseInt(data.items[i].width) / ret + 'px;' +
							'height: ' + parseInt(data.items[i].height) / ret + 'px;' +
							'}\n';
					}
					return result;
				};
				return tem;
			}

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

module.exports = {
	sprite: sprite_build
};

//	normal: {
//		ret: 1,
//		src: 'spec/sprite/sprite@1/*.png',
//		dest: 'spec/spritesheet@1.png',
//		destCss: 'app/less/helpers/sprites@1.less',
//		cssTemplate: function(data) {
//			var ret = this.ret;
//			var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@' + ret + '.png); background-repeat: no-repeat;}';
//			for (var i = 0, ii = data.items.length; i < ii; i += 1) {
//				var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
//				result += '.sprite_icon-' + name_new + '{' +
//					'background-position: ' + data.items[i].px.offset_x + ' ' + data.items[i].px.offset_y + ';' +
//					'width: ' + data.items[i].px.width + ';' +
//					'height: ' + data.items[i].px.height + ';' +
//					'}\n'
//			}
//			return result;
//		}
//	}
//}
//	large15: {
//		src: 'spec/sprite/sprite@1.5/*.png',
//		dest: 'spec/spritesheet@1.5.png',
//		destCss: 'app/less/helpers/sprites@1.5.less',
//		padding: 3,
//		cssTemplate: function (data) {
//			var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@1.5x.png); background-repeat: no-repeat;}';
//			result += '@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min-device-pixel-ratio: 1.5), only screen and (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx) {\n';
//			for (var i = 0, ii = data.items.length; i < ii; i += 1) {
//				var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
//				result += '.sprite_icon-' + name_new + '{' +
//					'background-position: ' + data.items[i].offset_x/1.5 + 'px ' + data.items[i].offset_y/1.5 + 'px;' +
//					'background-size: ' + data.items[i].total_width/1.5 + 'px ' + data.items[i].total_height/1.5 + 'px;' +
//					'width: ' + data.items[i].width/1.5 + 'px;' +
//					'height: ' + data.items[i].height/1.5 + 'px;' +
//					'}\n'
//			}
//			result += '}';
//			return result;
//		}
//	},
//	large2: {
//		src: 'spec/sprite/sprite@2/*.png',
//		dest: 'spec/spritesheet@2.png',
//		destCss: 'app/less/helpers/sprites@2.less',
//		padding: 4,
//		cssTemplate: function (data) {
//			var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@2x.png); background-repeat: no-repeat;}';
//			result += '@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {\n';
//			for (var i = 0, ii = data.items.length; i < ii; i += 1) {
//				var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
//				result += '.sprite_icon-' + name_new + '{' +
//					'background-position: ' + data.items[i].offset_x/2 + 'px ' + data.items[i].offset_y/2 + 'px;' +
//					'background-size: ' + data.items[i].total_width/2 + 'px ' + data.items[i].total_height/2 + 'px;' +
//					'width: ' + data.items[i].width/2 + 'px;' +
//					'height: ' + data.items[i].height/2 + 'px;' +
//					'}\n'
//			}
//			result += '}';
//			return result;
//		}
//	},
//	large3: {
//		src: 'spec/sprite/sprite@3/*.png',
//		dest: 'spec/spritesheet@3.png',
//		destCss: 'app/less/helpers/sprites@3.less',
//		padding: 6,
//		cssTemplate: function (data) {
//			var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@3x.png); background-repeat: no-repeat;}';
//			result += '@media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (-min--moz-device-pixel-ratio: 3), only screen and (-o-min-device-pixel-ratio: 5/2), only screen and (min-device-pixel-ratio: 3), only screen and (min-resolution: 288dpi), only screen and (min-resolution: 3dppx) {\n';
//			for (var i = 0, ii = data.items.length; i < ii; i += 1) {
//				var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
//				result += '.sprite_icon-' + name_new + '{' +
//					'background-position: ' + data.items[i].offset_x/3 + 'px ' + data.items[i].offset_y/3 + 'px;' +
//					'background-size: ' + data.items[i].total_width/3 + 'px ' + data.items[i].total_height/3 + 'px;' +
//					'width: ' + data.items[i].width/3 + 'px;' +
//					'height: ' + data.items[i].height/3 + 'px;' +
//					'}\n'
//			}
//			result += '}';
//			return result;
//		}
//	}