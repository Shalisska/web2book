(function($){
  /*
	* создаем новый метод объекта jQuery.fn,
	* в который передаем параметр options
	*/
	$.fn.myCounter = function(options) {
		// дефолтные настройки
		var settings = {
			min: false,
      max: false,
      step: 1
		};
		
		return this.each(function() {
			if (options) {
				$.extend(settings, options);
			}
      
      var counter = $(this);
      var minus = counter.children('.calculator__counter-minus');
      var plus = counter.children('.calculator__counter-plus');
      var result = counter.children('.calculator__counter-input').children('input');

      minus.click(function(e) {
		e.preventDefault();
        var res = parseInt(result.val());
        res = res - settings.step;
        if ((settings.min || settings.min == 0) 
            && res <= settings.min) {
          res = settings.min;
        };
        result.val(res);
      });
      
      plus.click(function(e) {
		e.preventDefault();
        var res = parseInt(result.val());
        res = res + settings.step;
        if (settings.max 
            && res >= settings.max) {
          res = settings.max;
        };
        result.val(res);
      });
			      
      result.change(function() {
        var res = parseInt(result.val(), 10);
        if (settings.min 
            && res <= settings.min) {
          res = settings.min;
        } else if (settings.max 
            && res >= settings.max) {
          res = settings.max;
        };
        result.val(res);
      });
      
      function getChar(event) {
        
        if (event.which!=0 && event.keyCode!=0) {
          if (event.which < 32) return null;
          return event.keyCode;  // остальные
        };

      return null; // специальная клавиша
      };
      
      result.keydown(function(e) {
        e = e || event;
        var chr  = getChar(e);

        if (e.ctrlKey || e.altKey || chr == null) return; // специальная клавиша
        if ((chr < '48' || chr > '57')
          && (chr < '96' || chr > '105')) return false;
      });
		});
	};
})(jQuery);