var my_sprite = {
  vars: {
    name: 'retina',
    retina: [1, 1.5, 2, 3],
    templ: ''
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
      
      obj = {
		ret: vars.retina[i];
        src: 'spec/sprite/sprite@' + vars.retina[i] + '/*.png',
        dest: 'spec/spritesheet@' + vars.retina[i] + '.png',
        destCss: 'app/less/helpers/sprites@' + vars.retina[i] + '.less',
        cssTemplate: function(data) {
			var ret = this.ret;
			var result = '.sprite {display: inline-block; background-image: url(../img/spritesheet@' + ret + '.png); background-repeat: no-repeat;}';
			
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
			
			for (var i = 0, ii = data.items.length; i < ii; i += 1) {
				var name_new = data.items[i].name.replace((/@[0-9]*/g), '');
				result += '.sprite_icon-' + name_new + '{' +
					'background-position: ' + data.items[i].px.offset_x/ret + ' ' + data.items[i].px.offset_y/ret + ';' +
					'width: ' + data.items[i].px.width/ret + ';' +
					'height: ' + data.items[i].px.height/ret + ';' +
					'}\n'
			}
			return result;
		}
      };
      
      obj_gl[obj_name] = obj;
    }
        
    return obj_gl
	}
};
var sprite_build = my_sprite.obj_cr();
var sprite_build_obj = {normal: sprite_build};

console.log(sprite_build);
