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

////скроллинг offers
//;$(document).ready(function() {
//  var sliders = $('.offers-item-slider');
//  
//  function sizing_track(num, size) {
//    if (num[(num.length - 1)] === '%') {
//       num = num.slice(0, -1) / 100;
//    } else {
//      num = num.slice(0, -2) / size.slice(0, -2);
//    }
//    return num;
//  }
//  
//  for(var i = 0; i < sliders.length; i++) {
//    var slider = $(sliders[i]);
//    
//    slider.tinyscrollbar({
//        axis: "x"
//      ,	trackSizePer: sizing_track(slider.find('.scrollbar').css('width'), slider.css('width'))
//      ,	thumbSize: 80
//      , mainContainer: $('.offers-slider__box')
//    });
//  };
//});

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


//
//$(document).ready(function(){
//	// плавное перемещение страницы к нужному блоку
//	$('.header-menu .nav-item a').click(function () {
//		elementClick = $(this).attr("href");
//		destination = $(elementClick).offset().top;
//		$("body,html").animate({scrollTop: destination }, 800);
//	});
//});
//
//$(document).ready(function() {
//	var arr = [$('.popular'), $('.features'), $('.workmap'), $('.services'), $('.equipment')];
//	
//	for(var i=0; i<arr.length; i++) {
//		$(arr[i]).addClass("scrolling_hidden").viewportChecker({
//			classToAdd: 'scrolling_visible animation',
//			offset: 100
//		});
//	};
//});

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