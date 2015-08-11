var retina_size = [1, 1.5, 2, 3];

var sprite_calc_arr = [{
	img_dir: 'calculator/print_pages/sprite',
	dest: [{
		width: 0,
		retina: 32
	}]
}, {
	img_dir: 'calculator/sprite/ruler-thumb',
	dest: [{
		width: 0,
		retina: 32
	}]
}];

var sprite_arr = [{
	img_dir: 'header/sprite/header-slider_controls--btn',
	dest: [{
		width: 0,
		retina: 32
	}]
}, {
	img_dir: 'header/sprite/header-slider_controls--arrows--reg',
	dest: [{
		width: 0,
		retina: 42
	}, {
		width: 650,
		retina: 34
	}]
}, {
	img_dir: 'header/sprite/header-slider_controls--arrows--hover',
	dest: [{
		width: 0,
		retina: 52
	}, {
		width: 650,
		retina: 42
	}]
}, {
	img_dir: 'header/sprite/hooks',
	dest: [{
		width: 0,
		retina: 90
	}, {
		width: 650,
		retina: 70
	}]
}, {
	img_dir: 'formates/sprite',
	dest: [{
		width: 0,
		retina: 40
	}, {
		width: 950,
		retina: 30
	}]
}, {
	img_dir: 'sprite/clips/clip-left',
	dest: [{
		width: 0,
		retina: 44
	}, {
		width: 900,
		retina: 30
	}]
}, {
	img_dir: 'sprite/clips/clip-right',
	dest: [{
		width: 0,
		retina: 46
	}, {
		width: 900,
		retina: 32
	}]
}, {
	img_dir: 'sprite/adress',
	dest: [{
		width: 0,
		retina: 8
	}]
}, {
	img_dir: 'sprite/company',
	dest: [{
		width: 0,
		retina: 12
	}]
}, {
	img_dir: 'sprite/home',
	dest: [{
		width: 0,
		retina: 12
	}]
}, {
	img_dir: 'sprite/lock',
	dest: [{
		width: 0,
		retina: 8
	}]
}, {
	img_dir: 'sprite/mail',
	dest: [{
		width: 0,
		retina: 12
	}]
}, {
	img_dir: 'sprite/mobile',
	dest: [{
		width: 0,
		retina: 6
	}]
}, {
	img_dir: 'sprite/phone',
	dest: [{
		width: 0,
		retina: 12
	}]
}];

function in_array(value, array) {
  for(var i = 0; i < array.length; i++) {
    if(array[i] == value) return true;
  }
  return false;
};

//объект с ретиной и размерами картинки
function retina_cr(retina) {
  var arr = []
  retina_size.forEach(function(ret) {
    arr.push({size: ret, img_size: retina * ret});
  });
  return arr;
};

//базовый объект с папкой и адресом
function elem_cr(retina, size, dir) {
    var obj = {
    retina: retina,
    src: dir + '/**/*@' + size + '.png'
  };  
  return obj;
};

//объекты по данным элемента dest и значением width
function dest_cr_elem(width, retina, dir) {
  var retina_obj = retina_cr(retina);
  var arr = [];
  retina_obj.forEach(function(ret) {
    arr.push(elem_cr(ret.size, ret.img_size, dir));
  });
  return {width: width, elems: arr};
};

//объекты по данным dest
function dest_cr(dests, dir) {
  var arr = [];
  dests.forEach(function(dest) {
    arr.push(dest_cr_elem(dest.width, dest.retina, dir));
  });
  return arr;
};

//объекты по данным спрайта
function obj_cr(items) {
  var arr = [];
  items.forEach(function(item) {
    arr.push(dest_cr(item.dest, item.img_dir));
  });
  return arr;
};

// Функции сортировки массива по убыванию
function sDecrease(i, ii) {
 if (i > ii)
 return -1;
 else if (i < ii)
 return 1;
 else
 return 0;
}

//создание массива c width
function width_cr(items) {
  var arr = [];
  items.forEach(function(item) {
    item.forEach(function(elem) {
      var width = elem.width;
      if(!in_array(width, arr)) {
        arr.push(width);
      };
    });
  });
  arr.sort(sDecrease);
  return arr;
};

//массив из ширин элемента
function obj_width(items) {
  var arr = [];
  items.forEach(function(item) {
    arr.push(item.width);
  });
  return arr;
};

//добавление объектов со всеми ширинами
function sort(array, items) {
  var items_width = obj_width(items);
  
  for (var i = 0; i < array.length; i++) {
    if(!in_array(array[i], items_width)) {
      if (i == 0) {
        items.forEach(function(item) {
          if(item.width == 0) {
            items.push({width: array[i], elems: item.elems});
          };
        });
      } else {
        items.forEach(function(item) {
          if(item.width == array[i - 1]) {
            items.push({width: array[i], elems: item.elems});
          };
        });
      };
    };
    
  };
  
  return items;
};

//сортировка массивов по значению width
function obj_sorting(sprite) {
  var array = [];
  var obj_arr = obj_cr(sprite);
  var width_arr = width_cr(obj_arr);
  var obj_array = [];
  
  obj_arr.forEach(function(obj) {
    obj_array.push(sort(width_arr, obj));
  });
    
  width_arr.forEach(function(width) {
    var arr = [];
    obj_array.forEach(function(object) {
      object.forEach(function(obj) {
        if(width == obj.width) {
          arr = arr.concat(obj.elems);
        };
      });
    });
    array.push({width: width, elems: arr});
  });
  
  return array;
};

//создание спрайта
function sprite_cr(items) {
  var array = [];
  items.forEach(function(item) {
    retina_size.forEach(function(ret) {
      var arr = [];
      item.elems.forEach(function(elem) {
        if(elem.retina == ret) {
          arr.push(elem.src);
        };
      });
      
      var width = item.width;
      
      if (width == 0) {
        width = '';
      };
      
      var obj_sprite = {
        expand: true,
        cwd: 'app/images/',
        src: arr,
        dest: 'spec/sprite' + width + '/sprite@' + ret,
        flatten: true
      };
      
      array = array.concat(obj_sprite);
    });
  });
  return array;
};

var sprite_files = sprite_cr(obj_sorting(sprite_arr));
var sprite_calc_copy = sprite_cr(obj_sorting(sprite_calc_arr));

module.exports = {
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
	},
	build_sprite: {
		files: sprite_files
	},
	sprite_calc: {
		files: sprite_calc_copy
	}
};