//скроллинг offers
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

//скроллинг formates
//;$(document).ready(function() {
//  var sliders = $('.formates-item-slider');
//
//  for(var i = 0; i < sliders.length; i++) {
//    var slider = $(sliders[i]);
//    slider.tinyscrollbar({
//        axis: "y"
//      ,	thumbSize: 120
//		, mainContainer: $('.formates-slider__box')
//    });
//  };
//});


//точки если текст не влезает
$(document).ready(function() {
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
