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
					result += '.sprite_icon-' + name_new + '{' +
						'background-position: ' + parseInt(data.items[i].offset_x)/ret + 'px ' + parseInt(data.items[i].offset_y)/ret + 'px;' +
						'background-size: ' + parseInt(data.items[i].total_width)/ret + 'px ' + parseInt(data.items[i].total_height)/ret + 'px;' +
						'width: ' + parseInt(data.items[i].width)/ret + 'px;' +
						'height: ' + parseInt(data.items[i].height)/ret + 'px;' +
						'}\n'
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