jQuery(document).ready(function($){

	/**
	 * Кнопка наверх на jQuery. 
	 * Автор: Тимур Камаев, wp-kama.ru
	 * version 2.0
	 */
//	$('<style>'+
//		'.scrollTop{ display:none; z-index:9999; position:fixed;'+
//			'bottom:10px; left:48%; width:50px; height:70px;'+
//			'background:url(http://site.ru/путь_до_файла.png) 0 0 no-repeat; }' +
//		'.scrollTop:hover{ background-position:0 -76px;}'
//	+'</style>').appendTo('body');
	var
	speed = 500,
	$scrollTop = $('.scrollTop');

	$scrollTop.click(function(e){
		e.preventDefault();

		$( 'html:not(:animated),body:not(:animated)' ).animate({ scrollTop: 0}, speed );
	});

	//появление
	function show_scrollTop(){
		( $(window).scrollTop() > 300 ) ? $scrollTop.fadeIn(600) : $scrollTop.fadeOut(600);
	}
	$(window).scroll( function(){ show_scrollTop(); } );
	show_scrollTop();

});

//всплывающие описания offers
;$(document).ready(function() {
var slide = $('.offers-item__item');
var slide_name;

function search_class(item) {
  var name;
  var pattern = /([\w|-]*[^\b])/g;
  
  while ((res0 = pattern.exec(item.attr('class'))) != null) {
    var patt = /__([\w|-]*)/g;
    var res1 = patt.exec(res0[0])[1];

    if(res1 != 'item') {
      name = res0[0];
    }
  }
  return name;
}

slide.hover(function () {
  slide_name = search_class($(this));
  var pops = $('.' + slide_name + '--pops');
	
	var top = $('.' + slide_name).find('.offers-item__img').height();
  
  if(pops.length > 0) {
    var per = 1.15;
    var width = $(this).outerWidth();
    var width_pops = width * per;
    
    pops.css('display', 'block').css('width', width_pops).css('top', top);
  
    var left = $(this).offset().left;
    var left_pops = pops.offset().left;
    var left_css = left - left_pops - width*((per-1)/2);
    
    width_gl = $('body').width();
        
    if ((left_pops+left_css) < 0) {
      left_css = -left_pops;
    } else if((width_pops + left - width*((per-1)/2)) > width_gl) {
      left_css = width_gl - width_pops - left_pops;
    }
    
    pops.css('left', left_css);
    
  }
  
}, function (event) {
  slide_name = search_class($(this));
  var pops = $('.' + slide_name + '--pops');
  
    if ($(event.relatedTarget).attr('class') !== pops.attr('class')) {
      pops.css('display', 'none').css('width', 0).css('left', 0);
    } else {
      pops.mouseleave(function() {
        pops.css('display', 'none').css('width', 0).css('left', 0);
      });
    }
});
});

//formates
;$(document).ready(function() {
	var slides = $('.formates-item__item');
	var close = $('.formates-item__item--pops-close');
	var slide_name;

	function search_class(item) {
	  var name;
	  var pattern = /([\w|-]*[^\b])/g;

	  while ((res0 = pattern.exec(item.attr('class'))) != null) {
		var patt = /__([\w|-]*)/g;
		var res1 = patt.exec(res0[0])[1];

		if(res1 != 'item') {
		  name = res0[0];
		}
	  }
	  return name;
	}

	slides.click(function() {
	  slide_name = search_class($(this));
	  var pops = $('.' + slide_name + '--pops');

	  if(pops.length > 0) {
		var slide_size = $(this).offset().top + $(this).outerHeight();
		var pops_size = pops.parent().offset().top + pops.parent().outerHeight();

		var delta = pops_size - slide_size;
		var marg = ($(this).outerHeight()) / 100 * 55;

		var size = delta + marg;
		pops.addClass('show').css('bottom', size);  
	  };
	});

	close.click(function(event) {
	  event.preventDefault();
	  $(this).parent().removeClass('show');
	});

	var pop = $('.formates-item__item--pops');

	$(document).click(function(event) {
	  if(!pop.is(event.target)
		&& pop.has(event.target).length === 0
		&& !slides.is(event.target)
		&& slides.has(event.target).length === 0) {
		  pop.removeClass('show');
	  };
	});

	$(window).keydown(function(event) {
	  if (event.keyCode==27
		  && pop.hasClass('show')) {
		pop.removeClass('show');
	  }
	});
});


//точки если текст не влезает
;$(document).ready(function() {
	$(".offers-products__info").dotdotdot({
		watch: true,
		after: 'a.offers-products__info-more'
	});
});

;$(document).ready(function() {
function clicking (name) {
  var items = $('.' + name + '-item');
  var item = items.children(':not(.' + name + '-label-wrapper)');

  item.click(function() {
    var $this = $(this);
    $this.parent().children('.' + name + '-label-wrapper').children('label').click();
  });
};

clicking('calculator__scroller');
});

;$(document).ready(function() {
	var vert = $('.print_other__input--height');
var goriz = $('.print_other__input--width');
function ranging(item, range) {
  item.change(function () {
    if ($(this).val() < range[0]) {
      $(this).val(range[0]);
      allert_message($(this), range[0], 'меньше');
    } else if ($(this).val() > range[1]) {
      $(this).val(range[1]);
      allert_message($(this), range[1], 'больше');
    };
  });
};
ranging(vert, [
  148,
  297
]);
ranging(goriz, [
  105,
  210
]);
function allert_message(elem, rang, text) {
  var allert_div = $('.print_other__input--allert');
  allert_div.html('Значение поля не должно быть ' + text + ' ' + rang);
  allert_div.css({
    'display': 'block'
  });
  $(window).keydown(function (event) {
    if (event.keyCode == 27) {
      allert_div.css({
		'display': 'none'
	  });
    }
  });
  setTimeout(function () {
    allert_div.css({
		'display': 'none'
	  });
  }, 2100);
};
});

;$(document).ready(function() {
	var lines =$('.calculator__counter-input--block_lines').children('input');
	var insets = $('.calculator__counter-input--inset_vals').children('input');

var res = parseInt(lines.val()) + parseInt(insets.val());
$('.calculator__total-value').html(res);

changing(lines);
changing(insets);

function changing(item) {
  item.change(function() {
    if (res != (parseInt(lines.val()) + parseInt(insets.val()))) {
      res = parseInt(lines.val()) + parseInt(insets.val());
      $('.calculator__total-value').html(res);
    };
  });

  var btn = item.parent().parent().children('.calculator__counter-btn');

  btn.click(function() {
    if (res != (parseInt(lines.val()) + parseInt(insets.val()))) {
      res = parseInt(lines.val()) + parseInt(insets.val());
      $('.calculator__total-value').html(res);
    };
  });
};
});

;$(document).ready(function() {
	var form = $('.form--calculator');
	var tel = form.find('#autorization_tel');
	var tel_1 = form.find('#autorization_tel_1');
	var tel_2 = form.find('#autorization_tel_2');

	tel.val(tel_1.val() + tel_2.val());

	var str = form.serialize();
	var strArr = form.serializeArray();
});

;$(document).ready(function() {
	var
		check_all = $('.my_files__check-all_inputs'),
		name,
		inputs;
	
	check_all.each(function() {
		checking($(this));
	});

	check_all.click(function() {
		checking($(this));
	});

	function checking(inp) {
		name = inp.attr('id').slice(('my_files__check-all_').length);
		inputs = $('.my_files-docs--' + name).find('.my_files__check_inputs');
		if (inp.prop('checked')) {
			inputs.prop('checked','true');
		} else {
			inputs.removeAttr('checked');
		};
	};
});

;$(document).ready(function() {
	var
		expand = $('.my_files__expand'),
		stat,
		name,
		inputs;

	expand.click(function() {
		checking($(this));
	});

	function checking(inp) {
		stat = inp.attr('id').slice(inp.attr('id').length - 2);
		if (stat === 'on') {
			name = inp.attr('id').slice(('my_files__expand_').length, inp.attr('id').length - 4);
			inputs = $('.my_files-docs--' + name).find('.my_files-docs__folder_opener-input');
			inputs.prop('checked','true');
		} else {
			name = inp.attr('id').slice(('my_files__expand_').length, inp.attr('id').length - 5);
			inputs = $('.my_files-docs--' + name).find('.my_files-docs__folder_opener-input');
			inputs.removeAttr('checked');
		};
	};
});

;$(document).ready(function() {
	var
		btn_name = 'private_room-page__btn',
		btn = $('.' + btn_name),
		menu = $('.my_files-menu__inputs'),
		inp;

	btn.click(function(e) {
		e.preventDefault();
		moving($(this));
	});

	function detect_inp() {
		menu.each(function() {
			if ($(this).prop('checked')) {
				inp = $(this);
			};
		});
		return inp;
	};

	function moving(btn) {
		inp = detect_inp();
		if (btn.hasClass(btn_name + '--next')) {
			inp.next().prop('checked','true');
		} else {
			inp.prev().prop('checked','true');
		};
	};
});

;$(document).ready(function() {
	function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('input');
    this.opts = this.dd.find('ul.calculation-form__dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;
 
        obj.dd.on('click', function(event){
            $(this).toggleClass('calculation-form__result-select--active');
            return false;
        });
 
        obj.opts.on('click',function(){
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
          if (obj.val === '<Выбрать>') {
            obj.placeholder.val('');
          } else {
            obj.placeholder.val(obj.val);
          }
        });
    },
    getValue : function() {
        return this.val;
    },
    getIndex : function() {
        return this.index;
    }
}
 
$(function() {
  var dd_arr = $('.calculation-form__result-select');
  
  dd_arr.each(function() {
    var dd = new DropDown( $(this) );
 
    $(document).click(function() {
        $('.calculation-form__result-select').removeClass('calculation-form__result-select--active');
    });
  });
});
});

//минимальное количество рядов в таблице
(function($, window, undefined){
$.fn.emptyRows = function(opts) {
   var defaults = {
     value: 30
   , height: '3em'
   , child: 'li'
   , classes: ['my_files-table__items', 'private_room-archive_list__item', 'clearfix']
   , inner: ''
   };
 
  var options = $.extend(defaults, opts || {});
  
  var items = this.children('li');
  var leng = items.length;
  
 
   return this.each(function(){ // jQuery chainability
     while (leng < options.value) {
		var classes = '"' + options.classes.join(' ') + '"';
       $(this).append('<li class = ' + classes + '>' + options.inner + '</li>');
       items = $(this).children(options.child);
       leng = items.length;

       if ($(items[(leng - 2)]).hasClass('my_files-table__items--color1')) {
         $(items[(leng - 1)]).addClass('my_files-table__items--color2')
       } else {
         $(items[(leng - 1)]).addClass('my_files-table__items--color1')
       };

       $(items[(leng - 1)]).attr('style', 'height: ' + options.height);
     };
   });
};
})(jQuery, window);

//личный кабинет-работа с файлами
var val = 20;
var cont = $('.my_files-docs__body-wrap > .my_files-docs__body');

cont.each(function () {
  $(this).emptyRows({
      value: val
    , child: '.my_files-docs__items--lvl0'
    , classes: [  'my_files-table__items'
                , 'my_files-docs__items'
                , 'my_files-docs__items--lvl0'
                , 'clearfix']
    , inner: '<div class="clearfix my_files-table__item-wrap my_files-docs__item-wrap">'
           + '<div class="my_files-table__item my_files-docs__item  my_files-docs__item-size">'
           + '</div>'
           + '<div class="my_files-table__item my_files-docs__item  my_files-docs__item-manage">'
           + '</div>'
           + '</div>'
	});
});

//cкролл архив
;$(document).ready(function() {
	var val = 15;
	
	$('.private_room-archive_list__items').emptyRows({
		value: val
	});
	
	function scroll(slide) {
	  slide.tinyscrollbar({
		axis: "y"
		,	thumbSize: 120
	  });

	  var scrollbar = slide.data("plugin_tinyscrollbar")
	  scrollbar.update();
	};

	if ($('.private_room-archive_list__items').children('li').length === val) {
		scroll($('.private_room-archive_list__slider'));
		
		//height of right part
		var list = $('.private_room-archive_list__slider');
		var right_top = $('.private_room-archive_list__actions');
		var right_bottom = $('.private_room-archive_list__info__block');

		var height_l = list.outerHeight();
		var height_r = right_top.outerHeight() + right_bottom.outerHeight();
		var right_delta = right_bottom.outerHeight() - right_bottom.innerHeight();

		if (height_l !== height_r) {
			var height_r_new = Math.round(height_l - right_top.outerHeight() - right_delta);
			right_bottom.innerHeight(height_r_new - 1);
		}
	};
});

//open/close archive
;$(document).ready(function() {
	var close = $('.private_room-archive__close');
	
	close.click(function(e) {
		e.preventDefault();
		$('.private_room-archive').toggle();
	});
});