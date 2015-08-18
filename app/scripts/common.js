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
  var allert_div = 'print_other__input--allert';
  elem.parent().append('<div class=' + allert_div + '>Значение поля не должно быть ' + text + ' ' + rang + '</div>');
  $('.' + allert_div).css({
    'position': 'absolute',
    'color': 'red',
    'width': '200%',
    'top': '0',
    'left': '-50%',
    'background': 'white',
    'border': '1px solid red'
  });
  $(window).keydown(function (event) {
    if (event.keyCode == 27) {
      $('.' + allert_div).remove();
    }
  });
  setTimeout(function () {
    $('.' + allert_div).remove();
  }, 2100);
};
});



$(document).ready(function() {
	$('.print_other').mySlider({
		min: 105,
		max: 210,
		class_name: 'print_other'
	});
	
	$('.print_other').mySlider({
		min: 148,
		max: 297,
		class_name: 'print_other',
		width: false
	});
});