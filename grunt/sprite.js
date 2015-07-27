var images = {
    retina: [1, 1.5, 2, 3]
  , width: ['', 960, 700]
  , spec_templ: [{
      name: 'header-slider_controls--btn--active'
    , template: function () {
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
      name: 'spec_slide'
    , template: function () {
        var items = ['slide1', 'slide2'];
        var arr = [];
        items.forEach(function(item) {
          var name = '.special_rules_for_slide--' + item;
          arr.push(name);
        });

        return arr;
      }
    }, {
        name: 'spec_slide_simple--hover'
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

function template_media (w, r) {
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

  res += '.sprite {background-image: url(../images/spritesheet/spritesheet@' + r + 'w' + w + '.png);}'

  return res;
};

function template_body (data, templates, r) {
  var res = '';
  var name;
  var width;
  
  for(var i = 0; i < data.length; i++) {
    name = template_name(data[i].name, templates);
    width = template_width(data[i], r);
    res +=name + width;
  };
  return res;
};

function template_name(data, templates) {
  var name;
  var spec_names = arr_create(templates);
  var item_name = data.replace((/@\w*/g), '');
  var hover = '--hover';
  var active = '--active';

  if (in_array_templ(item_name, spec_names, templates)) {
    var ind = spec_names.indexOf(item_name);
    name = '' + templates[ind].template();
  } else {
    if(item_name.slice(item_name.length - hover.length) == hover) {
      item_name = item_name.slice(0, (item_name.length - hover.length)) + ':hover';
    } else if(item_name.slice(item_name.length - active.length) == active) {
      item_name = item_name.slice(0, (item_name.length - active.length)) + ':active';
    }
    name = '.sprite_icon-' + item_name;
  };
  return name;
};

function template_width(data, r) {
  var width = '{' +
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
          var result = template_media (w, r);
          result += template_body(data.items, images.spec_templ, r);
          return result;
        };
        
        return templ;
      };
      
        var sprite = {
        src: 'spec/sprite' + w + '/sprite@' + r + '/*.png'
      , dest: 'spec/spritesheet/spritesheet@' + r + 'w' + w + '.png'
      , destCss: 'spec/less/sprite/sprites@' + r + 'w' + w + '.less'
      , cssTemplate: template (w, r, images)
      };

      sprite_gl['sprite' + w + '_' + retina_name] = sprite;
    });
  });
  
  return sprite_gl;
};

var sprite_build = sprite_create(images);

module.exports = sprite_build;