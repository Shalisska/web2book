(function($){
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
      var $item = $carousel.children(); // находим первого потомка в нашем контейнере (.container), т.е. <ul>
			var itemsTotal = $carousel.children().length; // определяем сколько всего элементов у нашей карусели
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
      
      $carousel.children().css({
        'width' : (100 / itemsTotal / 2) + '%'
      });
      
      $carousel.children(':nth-child(3)').css({
        'transform': 'scale(1.5)'
      })
      
      // параметр num(number) - number of slides
			function slide(num, elem) {
				var leftIndent = 0; // левое смещение (для <ul>)
				
				if (!running) { // если анимация завершена (или еще не запущена)
					running = true; // ставим флажок, что анимация в процессе
										
					if (num > 0) {
						/*
						* вставляем после последнего элемента карусели
						* клоны стольких элементов, сколько задано
						* в параметре num
						*/
						$carousel.children(':last').after($carousel.children().slice(0, num).clone(true));
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
				
				return false; // возвращаем false для того, чтобы не было перехода по ссылке
			}
      
      $item.click(function() {
        var center = (settings.visible - settings.visible % 2) / 2 + 1;
        var ind = $(this).index() + 1;
        var num = ind - center;
        var elem = $(this);
        
        if (num != 0 ) {
          return slide(num, elem);
        }
      });
      
      
		});
	};
})(jQuery);

$(document).ready(function() {
  $('.container').myCarousel({
			visible: 5
		});
});