var finish = {
    src: 'spec1/sprite960/sprite@1/*.png'
  , dest: 'spec1/sprite960/spritesheet@1/*.png'
  , destCss: 'spec1/less/sprite/sprites@1w960.less'
}

var images = {
    retina: [1, 1.5, 2, 3]
  , width: [960, 700]
}


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

function template_name () {
  
};



function sprite_create(images) {
  var sprite_gl = {};
  images.width.forEach(function (w) {
    images.retina.forEach(function (r) {
      var retina_name = r;
      if (r%1 != 0) {
        retina_name = r * 10;
      };
      
      function template (w, r) {
        
        var result = template_media (w, r);
        
        return result;
      };
      
      
        var sprite = {
        src: 'spec1/sprite' + w + '/sprite@' + r + '/*.png'
      , dest: 'spec1/spritesheet/spritesheet@' + r + 'w' + w + '/*.png'
      , destCss: 'spec1/less/sprite/sprites@' + r + 'w' + w + '.less'
      , cssTemplate: template (w, r)
      };

      sprite_gl['sprite' + w + '_' + retina_name] = sprite;
    });
  });
  
  return sprite_gl;
};

console.log(sprite_create(images));


//--------------------------------------//
var finish = {
    src: 'spec1/sprite960/sprite@1/*.png'
  , dest: 'spec1/sprite960/spritesheet@1/*.png'
  , destCss: 'spec1/less/sprite/sprites@1w960.less'
}

var data = ['header-slider_controls--btn--active@960',
            'slider@100',
            'slider--hover@400',
            'slider--active@10',
            'slider1@190',
            'spec_slider_simple@140',
            'spec_slide@140'
           ];

var images = {
    retina: [1, 1.5, 2, 3]
  , width: [960, 700]
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
    }]
}

function replacing(name, pattern) {
  var names = [];
  name.forEach(function(item) {
    names.push(item.replace(pattern, ''));
  });
  return names;
};

function sorting(arr, mask) {
  mask.forEach(function(el) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == el.name) {
        arr.splice(i, 1);
      }
    };
  });
  return arr;
};


function template_name (data, templates) {
  var item_names = replacing(data, /@\w*/g);
  item_names = sorting(item_names, templates);
  
  for(var i = 0; i < data.length; i++) {
    var item_name = data[i].replace((/@\w*/g), '');
    
    var name = '.sprite_icon-' + item_name;
    var hover = '--hover';
    var active = '--active';
    templates.forEach(function(templ) {
      if (item_name == templ.name) {
        name = '' + templ.template();
        data.splice(i, 1);
        //console.log(name);
      } else {
        if(item_name.slice(item_name.length - hover.length) == hover) {
          item_name = item_name.slice(0, (item_name.length - hover.length)) + ':hover';
        } else if(item_name.slice(item_name.length - active.length) == active) {
          item_name = item_name.slice(0, (item_name.length - active.length)) + ':active';
        }
        name = '.sprite_icon-' + item_name;
      }
      
      console.log(name);
      
    });
    
  };
  console.log(data);
};

console.log(template_name(data, images.spec_templ));