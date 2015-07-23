;$(document).ready(function() {
  var sliders = $('.offers-item-slider');
  
  function sizing_track(num, size) {
    if (num[(num.length - 1)] === '%') {
       num = num.slice(0, -1) / 100;
    } else {
      num = num.slice(0, -2) / size.slice(0, -2);
    }
    return num;
  }
  
  for(var i = 0; i < sliders.length; i++) {
    var slider = $(sliders[i]);
    
    slider.tinyscrollbar({
        axis: "x"
      ,	trackSizePer: sizing_track(slider.find('.scrollbar').css('width'), slider.css('width'))
      ,	thumbSize: 80
      , mainContainer: $('.offers-slider__box')
    });
  };
});


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

//$(document).ready(function() {
//	var controls = 'popular-slider__controls';
//	var area = 'popular';
//	
//	$('.' + controls).click(function(event) {
//		event.preventDefault();
//		
//		var slide = $('.popular-slider__item:not(.popular-slider__item--all)').parent();
//		var doc_w = $(document).width();
//		
//		var slide_class;
//		var slide_interval;
//		
//		if (doc_w > 991) {
//			slide_class = 'slide-show';
//			slide_interval = 5;
//		} else if (doc_w > 767) {
//			slide_class = 'slide-show-sm';
//			slide_interval = 3;
//		} else {
//			slide_class = 'slide-show-xs';
//			slide_interval = 1;
//		}
//
//		var slide_show = $('.' + area + ' .' + slide_class);
//		var slide_show_id = slide.index(slide_show[0]);
//		var slide_show_id_l = slide.index(slide_show[(slide_show.length - 1)]);
//
//		if ($(this).hasClass(controls + '--left') && slide_show_id > 0) {
//
//			slide_show.removeClass(slide_class);
//
//			var new_slide = slide.slice((slide_show_id - slide_interval), (slide_show_id));
//			new_slide.addClass(slide_class);
//
//		} else if ($(this).hasClass(controls + '--right') && slide_show_id_l < (slide.length-1)) {
//
//			slide_show.removeClass(slide_class);
//
//			var new_slide = slide.slice((slide_show_id_l+1), (slide_show_id_l + slide_interval + 1));
//			new_slide.addClass(slide_class);
//		}
//	});
//});
//
//$(document).ready(function() {
//	$(".news-menu__item-title p").dotdotdot({
//		watch: true
//	});
//	
//	$(".news-item__text").dotdotdot({
//		watch: true,
//		after: 'a.news-item__link'
//	});
//});
//
//$(document).ready(function() {
//	var controls = 'news-menu__controls';
//	var area = 'news';
//	
//	$('.' + controls).click(function(event) {
//		event.preventDefault();
//		
//		var slide = $('.news-menu__item').parent();
//		var doc_w = $(document).width();
//		
//		var slide_class;
//		
//		if (doc_w > 991) {
//			slide_class = 'slide-show';
//		} else if (doc_w > 767) {
//			slide_class = 'slide-show-sm';
//		} else {
//			slide_class = 'slide-show-xs';
//		}
//
//		var slide_show = $('.' + area + ' .' + slide_class);
//		var slide_show_id = slide.index(slide_show[0]);
//		var slide_show_id_l = slide.index(slide_show[(slide_show.length - 1)]);
//
//		if ($(this).hasClass(controls + '--left') && slide_show_id > 0) {
//
//			$(slide[slide_show_id_l]).removeClass(slide_class);
//
//			$(slide[(slide_show_id - 1)]).addClass(slide_class);
//
//		} else if ($(this).hasClass(controls + '--right') && slide_show_id_l < (slide.length-1)) {
//
//			$(slide[slide_show_id]).removeClass(slide_class);
//
//			$(slide[(slide_show_id_l + 1)]).addClass(slide_class);
//		}
//	});
//});
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
