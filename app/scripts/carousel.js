(function($){
  function integerDivision(nominator, denominator) {
    var res = (nominator - nominator % denominator) / denominator;
    return res;
  }
  
  function making_wheel(arr, sum) {
        
    transforming(arr.slice(0, sum));

    function transforming(arr) {
      var center = integerDivision(arr.length, 2);
      var vals = parametring(center, 0.2, 30);
      var ind = 0;
      while (arr.length > 1) {
        var items = arr.splice(0, 1).concat(arr.splice((arr.length - 1), 1));
        var obj = {
          ind: ind,
          arr: items
        };
        styling(obj, vals.splice((vals.length - 1), 1));
        ind = ind + 1;
      }

      arr.css({
        'transform': 'scale(1.3)',
        'z-index': ind
      });
    };

    function styling(obj, val) {
      for (var i = 0; i < obj.arr.length; i++) {
        var k;
        i == 0 ? k = 1 : k = -1;
        $(obj.arr[i]).css({
          'transform': 'scale(' + val[0].scale + ') translate(' + (val[0].trans * k) + '%, 0)',
          'z-index': obj.ind
        });
      };
    };

    function parametring(quantity, step, step_trans) {
      var arr = [];  
      for (var i = 0; i != quantity; i++) {
        var translate = step_trans * i * i;

        arr.push({
          scale: 1 - step * i,
          trans: translate
        });
      };
      return arr;
    };
  };
  
	/*
	* создаем новый метод объекта jQuery.fn,
	* в который передаем параметр options
	*/
	$.fn.myCarousel = function(options) {
		// дефолтные настройки
		var settings = {
			visible: 3, // видимых элементов - 3
			speed: 500, // скорость перемотки (в миллисекундах)
		};
		
		return this.each(function() {
			if (options) {
				$.extend(settings, options);
			}
			
			// определяем "глобальные" переменные
			var $this = $(this); // сохраняем контекст
			var $carousel = $this.children(':first'); // находим первого потомка в нашем контейнере (.container), т.е. <ul>
			var $item = $carousel.children(); // находим потомков
			var itemsTotal = $item.length; // определяем сколько всего элементов у нашей карусели
			var running = false; // флаг, который хранит информацию о том проигрывается ли анимация на данный момент
      // присваиваем необходимые стили для элементов карусели
			// сначала для контейнера
			$this.css({
				'position': 'relative', // необходимо для нормального отображения в ИЕ6(7)
				'overflow': 'hidden', // прячем все, что не влезает в контейнер
			});
			
			// потом для внутреннего элемента (в нашем случае <ul>)
			$carousel.css({
				'position': 'relative', // относительное позиционирование нужно для того, чтобы можно было использовать сдвиг влево
				'width': (100 * itemsTotal * 2 / settings.visible) + '%', // ставим ширину побольше, чтобы точно влезли все элементы
				'left': 0 // устанавливаем нулевой левый сдвиг
			});
      
      $item.css({
        'width' : (100 / itemsTotal / 2) + '%'
      });
      
      making_wheel($item, settings.visible);
      
      // параметр num(number) - number of slides
			function slide(num, elem) {
				var leftIndent = 0; // левое смещение (для <ul>)
        var number = integerDivision(settings.visible, 2);
        var items_new;
        var items_hide;
				
				if (!running) { // если анимация завершена (или еще не запущена)
					running = true; // ставим флажок, что анимация в процессе
										
					if (num > 0) {
            /*
						* вставляем после последнего элемента карусели
						* клоны стольких элементов, сколько задано
						* в параметре num
						*/
						$carousel.children(':last').after($carousel.children().slice(0, num).clone(true));
            items_new = $carousel.children().slice(elem.index() - number, elem.index() + number + 1);
            making_wheel(items_new, settings.visible);
            
            items_hide = $carousel.children().slice(0, elem.index() - number);
            for (var i = 0; i < items_hide.length; i++) {
              $(items_hide[i]).css('transform', 'scale(0)');
            };
            
					} else if (num < 0){
						/*
						* вставляем перед первым элементом карусели
						* клоны стольких элементов, сколько задано
						* в параметре num
						*/
						$carousel.children(':first').before($carousel.children().slice(itemsTotal + num, itemsTotal).clone(true));
						
						/*
						* сдвигаем карусель (<ul>) влево на ширину элемента,
						* умноженную на количество элементов, заданных
						* в параметре num
						*/
						$carousel.css('left', (100 / itemsTotal) * num + '%');
            items_new = $carousel.children().slice(elem.index() - number, elem.index() + number + 1);
            making_wheel(items_new, settings.visible);
            
            items_hide = $carousel.children().slice(elem.index() + number + 1);
            for (var i = 0; i < items_hide.length; i++) {
              $(items_hide[i]).css('transform', 'scale(0)');
            };
					}
					
					if (num > 0) {
						/*
            * расчитываем левое смещение
            * текущее значение left + ширина одного элемента * количество проматываемых элементов
            */
            leftIndent = parseInt($carousel.css('left')) - (100 / itemsTotal * num) + '%';
            
            // запускаем анимацию
            $carousel.animate({'left': leftIndent}, {queue: false, duration: settings.speed, complete: function() {
              // когда анимация закончена
              // удаляем столько первых элементов, сколько задано в num
            	$carousel.children().slice(0, num).remove();
              // устанавливаем сдвиг в ноль
            	$carousel.css('left', 0);
            	running = false; // отмечаем, что анимация завершена
            }});
            
          } else if (num < 0){
            /*
            * расчитываем левое смещение
            * текущее значение 0
            */
            leftIndent = 0;
            // запускаем анимацию
            $carousel.animate({'left': leftIndent}, {queue: false, duration: settings.speed, complete: function() {
              // когда анимация закончена
              // удаляем столько последних элементов, сколько задано в num
            	$carousel.children().slice(itemsTotal, itemsTotal - num).remove();
            	running = false; // отмечаем, что анимация завершена
            }});
          }
				}
				//return false; // возвращаем false для того, чтобы не было перехода по ссылке
			}
      
      $item.click(function() {
        var center = integerDivision(settings.visible, 2) + 1;
        var ind = $(this).index() + 1;
        var num = ind - center;
        var elem = $(this);
               
        if (num != 0 ) {
          return slide(num, elem);
        };
        
      });
      
      
		});
	};
})(jQuery);

$(document).ready(function() {
	$('.calculator-types__carousel').myCarousel({
		visible: 7
	});
});