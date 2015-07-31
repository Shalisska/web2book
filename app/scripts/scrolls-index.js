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

//скроллинг formates
;$(document).ready(function() {
	var controls = $('.formates-slider__controls label');
	var sliders = $('.formates-item-slider');

	function scroll(slide) {
		slide.tinyscrollbar({
			axis: "y"
		,	thumbSize: 120
		});

		var scrollbar = slide.data("plugin_tinyscrollbar")
		scrollbar.update();
	};
	
	function search(items) {
  for(var i = 0; i < items.length; i++) {
    var item = $(items[i]);
    if(item.is(':visible')) {
      return item;
    };
  };
};

scroll(search(sliders));
	
	controls.click(function() {
  var mask = $(this).attr('for').replace(/[\w|-]*--([\w|-]*)/gi, '$1');

  setTimeout(function() {
    scroll($('.formates-item-slider--' + mask));
  }, 1);
});
});