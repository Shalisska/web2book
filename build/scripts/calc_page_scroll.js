(function($){
  /*
	* создаем новый метод объекта jQuery.fn,
	* в который передаем параметр options
	*/
	$.fn.mySlider = function(options) {
		// дефолтные настройки
		var settings = {
			min: 1,
      max: 500,
      width: true
		};
		
		return this.each(function() {
			if (options) {
				$.extend(settings, options);
			}
      
      var dir;
      settings.width ? dir = {size: 'width', dir: 'right'} : dir = {size: 'height', dir: 'top'};
			
			// определяем "глобальные" переменные
			var $this = $(this); // сохраняем контекст
			var $page = $this.children('.' + settings.class_name + '__page'); // находим макет страницы
			var $scroller = $this.children('.' + settings.class_name + '__scroller--' + dir.size); // скроллеры
      var $line = $scroller.children('.' + settings.class_name + '__scroller-line');
      var $thumb = $scroller.children('.' + settings.class_name + '__scroller-thumb');
      var $input = $('.' + settings.class_name + '__input--' + dir.size);
      var thumb_c;
      settings.width ? thumb_c = $thumb.width() / 2 : thumb_c = $thumb.height() / 2;
      
      var range = settings.max - settings.min;
      var k;
      settings.width ? k = $scroller.width() / range : k = $scroller.height() / range;
      
      thumb_coord_input($input.val(), $input.val());
      
           
      function styling_scroll(dir) {
        var values = parseInt($thumb.css(dir)) + thumb_c;
        $line.css(dir, values);
        $page.css(dir, (values * range / settings.max));
      };
      
      function thumb_coord_input(x, y) {
        var resX = (settings.max - x) * k;
        var resY = (settings.max - y) * k;
        
        thumb_coord_scroll(resX, resY);
      };
      
      function input_vals(dir) {
        var res = settings.max - parseInt($line.css(dir)) / k;
        $input.val(Math.round(res * 10) / 10);
      };
      
      function thumb_coord_scroll(x, y) {
        var vals = {};
        if (settings.width) {
          vals = {
            coord: x,
            size_scroll: $scroller.width()
          };
        } else {
          vals = {
            coord: y,
            size_scroll: $scroller.height()
          };
        };
        
        var thumb_offset = vals.coord - thumb_c;
        if(thumb_offset > vals.size_scroll - thumb_c) {
          thumb_offset = vals.size_scroll - thumb_c;
        } else if (thumb_offset < - thumb_c) {
          thumb_offset = - thumb_c;
        }
        
        $thumb.css(dir.dir, thumb_offset);
        
        styling_scroll(dir.dir);
      };
			      
      $scroller.click(function(e) {
        var offset = $(this).offset();
        var relativeX = (e.pageX - offset.left);
        var relativeY = (e.pageY - offset.top);
        
        thumb_coord_scroll($scroller.width() - relativeX, relativeY);
        input_vals(dir.dir);
      });
      
      $thumb.mousedown(function(e){
        var offset = $(this).parent().offset();
        var relativeX = (e.pageX - offset.left);
        var relativeY = (e.pageY - offset.top);
        
        thumb_coord_scroll($scroller.width() - relativeX, relativeY);
        input_vals(dir.dir);
        
        $(this).mousemove(function(event) {
          var vals = {};
          if (settings.width) {
            vals = {
              coord: relativeX,
              coord_n: (event.pageX - offset.left)
            };
          } else {
            vals = {
              coord: relativeY,
              coord_n: (event.pageY - offset.top)
            };
          };
          
          if(vals.coord != vals.coord_n) {
            vals.coord = vals.coord_n;
            thumb_coord_scroll($scroller.width() - vals.coord, vals.coord);
            input_vals(dir.dir);
          };
        });
        
        $(this).mouseleave(function() {
          $(this).unbind('mousemove');
        });
      });
      
      $thumb.mouseup(function() {
        $(this).unbind('mousemove');
      });
      
      $input.change(function() {
        thumb_coord_input($(this).val(), $(this).val());
      });
		});
	};
})(jQuery);

;$(document).ready(function() {
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