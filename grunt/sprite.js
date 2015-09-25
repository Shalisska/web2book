function file_manage_sprite_tabl(name_real) {
	var name = '.my_files-docs__item-wrap:hover .my_files-docs__item-manage .sprite_icon-' + name_real;
	return name;
};

function file_manage_sprite_tabl_bw(name_real) {
	var name = '.sprite_icon-' + (name_real).slice(0, name_real.length - 4);
	return name;
};

var images_private = {
    retina: [1, 1.5, 2, 3]
  , width: ['']
  , files: 'spritesheet/sprite_private_room/spritesheet@'
  , files_css: 'sprite/sprite_private_room/sprites@'
  , sprite_name: 'sprite_private_room'
  , spec_templ: [{
      name: 'arrow--down'
    , class: 'before'
    }, {
      name: 'download_cloud'
    , class: 'before'
    }, {
      name: 'download_load'
    , class: 'before'
    }, {
      name: 'windows'
    , class: 'before'
    }, {
      name: 'files_refresh'
    , class: 'before'
    }, {
      name: 'my_files_search'
    , class: 'before'
    }, {
      name: 'arrow_history--gray'
    , class: 'before'
    }, {
      name: 'arrow_history--white'
    , class: 'before'
    }, {
      name: 'checked'
    , template: function (r, w) {
		var name = '.my_files__check:after';
        return name;
      }
    }, {
      name: 'type_file'
    , class: 'before'
    }, {
      name: 'type_folder'
    , class: 'before'
    }, {
      name: 'rename_small'
    , class: 'before'
    }, {
		name: 'clipboard'
	,	template: function (r, w) {
			var name1 = file_manage_sprite_tabl(this.name);
			var name2 = '.sprite_icon-' + this.name + '--active';
			return [name1, name2];
		}
	}, {
		name: 'clipboard--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'busket'
	,	template: function (r, w) {
			var name1 = file_manage_sprite_tabl(this.name);
			var name2 = '.sprite_icon-' + this.name + '--active';
			return [name1, name2];
		}
	}, {
		name: 'busket--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'comment'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'comment--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'file_pdf'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'file_pdf--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'process_manage'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'process_manage--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'to_check'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'to_check--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'zip'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'zip--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'view_1p'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'view_1p--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'info'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'info--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'look'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'look--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'approve'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'approve--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'recheck'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'recheck--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'download'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'download--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}, {
		name: 'convert'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl(this.name);
			return name;
		}
	}, {
		name: 'convert--bw'
	,	template: function (r, w) {
			var name = file_manage_sprite_tabl_bw(this.name);
			return name;
		}
	}]
};

var images_form = {
    retina: [1, 1.5, 2, 3]
  , width: ['']
  , files: 'spritesheet/sprite_form/spritesheet@'
  , files_css: 'sprite/sprite_form/sprites@'
  , sprite_name: 'sprite_form'
  , spec_templ: [{
      name: 'print-arrow'
    , class: 'after'
    }, {
      name: 'ruler-thumb'
    , class: 'after'
    }, {
      name: 'counter-arrow--left'
    , class: 'before'
    }, {
      name: 'counter-arrow--right'
    , class: 'before'
    }, {
      name: 'form_attention'
    , class: 'before'
    }, {
      name: 'captcha_refresh'
    , class: 'before'
    }, {
      name: 'close--gray'
    , class: 'before'
    }]
};

var images = {
    retina: [1, 1.5, 2, 3]
  , width: ['', '950', '900', '650']
  , files: 'spritesheet/spritesheet@'
  , files_css: 'sprite/sprites@'
  , sprite_name: 'sprite'
  , spec_templ: [{
      name: 'header-slider_controls--btn--active'
    , template: function (r, w) {
        var items = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];
        var arr = [];
        items.forEach(function(item) {
          var name = '.header-slider__input#header-slider--' + item
                  + ':checked ~ .header-slider__controls label[for="header-slider--'
                  + item + '"]';
          arr.push(name);
        });

        return arr;
      }
    }, {
      name: 'hook--left'
    , class: 'before'
    }, {
      name: 'hook--right'
    , class: 'after'
    }, {
      name: 'footer-clip--left'
    , class: 'before'
    }, {
      name: 'footer-clip--right'
    , class: 'after'
    }, {
      name: 'lock'
	, class: 'before'
    }, {
      name: 'lock--red'
	, class: 'before'
    }, {
      name: 'home'
	, class: 'before'
    }, {
      name: 'home--blue'
	, class: 'before'
    }, {
      name: 'home--white'
    , template: function (r, w) {
        var name = '.sprite_icon-home--blue:hover:before'
        return name;
      }
    }, {
      name: 'mobile'
	, class: 'before'
    }, {
      name: 'company'
	, class: 'before'
    }, {
      name: 'adress'
	, class: 'before'
    }, {
      name: 'phone'
	, class: 'before'
    }, {
      name: 'mail'
	, class: 'before'
    }]
};

function arr_create(array) {
  var arr = [];
  array.forEach(function(item) {
    arr.push(item.name);
  });
  return arr;
};

function in_array(what, where) {
  for(var i=0; i<where.length; i++) {
    if(what == where[i]) {
      return true;
    };
  };
  return false;
};

function in_array_templ(what, where, templates) {
  if(in_array(what, where)) {
    var ind = where.indexOf(what);
    if(templates[ind].template) {
      return true;
    };
  };
  return false;
};

function in_array_class(what, where, templates) {
  if(in_array(what, where)) {
    var ind = where.indexOf(what);
    if(templates[ind].class) {
      return true;
    };
  };
  return false;
};

function template_media (path, name, w, r) {
  var res = '';

  if (r != 1) {
    var media_opera;
    var media_dpi = 96*r;
    switch (r) {
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

    res += '@media only screen and (-webkit-min-device-pixel-ratio: '
    + r + '), only screen and (min--moz-device-pixel-ratio: ' 
    + r + '), only screen and (-o-min-device-pixel-ratio: ' 
    + media_opera + '), only screen and (min-device-pixel-ratio: ' 
    + r + '), only screen and (min-resolution: ' 
    + media_dpi + 'dpi), only screen and (min-resolution: ' 
    + r + 'dppx) {\n';
  };
	
	res += '@' + name + '-bg: url(../images/' + path + r + 'w' + w + '.png);\n';

  res += '.' + name + '{background-image: @' + name + '-bg;}'

  return res;
};

function template_body (sprite_name, data, templates, r, w) {
  var res = '';
  var name;
  var width;
  
  for(var i = 0; i < data.length; i++) {
    name = template_name(sprite_name, data[i].name, templates, r, w);
    width = template_width(data[i], r);
    res +=name + width;
  };
  return res;
};

function template_name(sprite_name, data, templates, r, w) {
  var name;
  var spec_names = arr_create(templates);
  var item_name = data.replace((/@\w*/g), '');
  var hover = '--hover';
  var active = '--active';

  if (in_array_templ(item_name, spec_names, templates)) {
    var ind = spec_names.indexOf(item_name);
    name = '' + templates[ind].template(r, w);
  } else {
    if(item_name.slice(item_name.length - hover.length) == hover) {
      item_name = item_name.slice(0, (item_name.length - hover.length)) + ':hover';
    } else if(item_name.slice(item_name.length - active.length) == active) {
      item_name = item_name.slice(0, (item_name.length - active.length)) + ':active';
    }
    name = '.sprite_icon-' + item_name;
  };
	
	if (in_array_class(item_name, spec_names, templates)) {
		var ind = spec_names.indexOf(item_name);
		name = name + ':' + templates[ind].class +
			'{content: ""; ' + 'background-image: @' + sprite_name + '-bg; ';
	} else {
		name = name + '{';
	};
  return name;
};

function template_width(data, r) {
  var width =
        'background-position: ' + parseInt(data.offset_x)/r + 'px '
          + parseInt(data.offset_y)/r + 'px; ' +
        'background-size: ' + parseInt(data.total_width)/r + 'px '
          + parseInt(data.total_height)/r + 'px; ' +
        'width: ' + parseInt(data.width)/r + 'px; ' +
        'height: ' + parseInt(data.height)/r + 'px;' +
        '}\n';
  return width;
};

function sprite_create(images) {
  var sprite_gl = {};
  images.width.forEach(function (w) {
    images.retina.forEach(function (r) {
      var retina_name = r;
      if (r%1 != 0) {
        retina_name = r * 10;
      };
      
      function template (w, r, images) {
        var templ = function(data) {
          var result = template_media (images.files, images.sprite_name, w, r);
          result += template_body(images.sprite_name, data.items, images.spec_templ, r, w);
			if(r != 1) {
				result += '}'
			};
			
          return result;
        };
        
        return templ;
      };
      
        var sprite = {
        src: 'spec/sprite' + w + '/sprite@' + r + '/*.png'
      , dest: 'app/images/' + images.files + r + 'w' + w + '.png'
      , destCss: 'app/less/helpers/' + images.files_css + r + 'w' + w + '.less'
      , cssTemplate: template (w, r, images)
      };

      sprite_gl['sprite' + w + '_' + retina_name] = sprite;
    });
  });
  
  return sprite_gl;
};

var sprite_build = sprite_create(images);
var sprite_form = sprite_create(images_form);
var sprite_private = sprite_create(images_private);

module.exports = sprite_form;