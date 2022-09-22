$(function(){
	var menuLinks = `<a style="color: #fff; padding: 5px;" href="/">Главная</a>
					<a style="color: #fff; padding: 5px;" href="online.html">Online обучение</a>
					<a style="color: #fff; padding: 5px;" href="test.html">Тест</a>
					<a style="color: #fff; padding: 5px;" href="typical.html">Типовая</a>
					<a style="color: #fff; padding: 5px;" href="vacancy.html">Ваканции</a>
					<a style="color: #fff; padding: 5px;" data-popup-open="popup__call">Попап заказать звонок</a>`;
	var styleNavdd = 'width: 40px;height: 40px;border-radius: 50%;right: 5px;bottom: 5px;background-color: rgba(133,143,159, 0.6);position: fixed;color: #fff;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;-webkit-transition: 0.4s;-o-transition: 0.4s;transition: 0.4s;z-index: 300;';
	var styleNavddActive = 'width: 100%;height: 100%;border-radius: 0px;right: 0px;bottom: 0px;background-color: rgba(133,143,159, 0.95);position: fixed;color: #fff;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center; align-items: center;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;-webkit-transition: 0.4s;-o-transition: 0.4s;transition: 0.4s;z-index: 300;';
	var styleNavdd_span = 'display: block;';
	var styleNavdd_spanActive = 'display: none;';
	var styleNavdd_div = 'pointer-events: none;opacity: 0;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;position: absolute;overflow-x: hidden;overflow-y: auto;';
	var styleNavdd_divActive = 'pointer-events: auto;opacity: 1;position: static;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;overflow-x: hidden;overflow-y: auto;';
	$('body').append('<div class="nav-d-d"><span>nav</span><div>'+menuLinks+'</div></div>');
	$('.nav-d-d').attr('style', styleNavdd).find('span').attr('style', styleNavdd_span).siblings('div').attr('style', styleNavdd_div);
	$('.nav-d-d').on('click',function(){
		if($(this).is('.active')){
			$(this).removeClass('active');
			$('.nav-d-d').attr('style', styleNavdd).find('span').attr('style', styleNavdd_span).siblings('div').attr('style', styleNavdd_div);
		}else{
			$(this).addClass('active');
			$('.nav-d-d').attr('style', styleNavddActive).find('span').attr('style', styleNavdd_spanActive).siblings('div').attr('style', styleNavdd_divActive);
		}
	})
});