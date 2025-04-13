!(function($){
	const escapeRegExp = function (string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
	};
	$.fancybox.defaults.transitionEffect = "circular";
	$.fancybox.defaults.transitionDuration = 500;
	$.fancybox.defaults.lang = "ru";
	$.fancybox.defaults.i18n.ru = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		ERROR: "Запрошенный контент не может быть загружен.<br/>Повторите попытку позже.",
		PLAY_START: "Начать слайдшоу",
		PLAY_STOP: "Остановить слайдшоу",
		FULL_SCREEN: "Полный экран",
		THUMBS: "Миниатюры",
		DOWNLOAD: "Скачать",
		SHARE: "Поделиться",
		ZOOM: "Увеличить"
	};
	$.fancybox.defaults.afterClose = function(instance, current){
		// Удаляем историю pdf. Очень неудобная штука
		Cookies.remove('pdfjs.history', { path: '' });
		window.localStorage.removeItem('pdfjs.history');
	};
	let items = $.makeArray($('a[href$=".xlsx"], a[href$=".docx"], a[href$=".pdf"]'));
	$.each(items, function (i, item) {
		let href = item.href,
			base = window.location.origin + '/',
			arr = href.split('.'),
			ext = arr.at(-1).toLowerCase(),
			reg = new RegExp("^" + escapeRegExp(base));
		if(reg.test(href) && $.trim(item.textContent)){
			item.setAttribute('data-fancybox', ext);
			item.setAttribute('data-caption', $.trim(item.textContent));
			item.setAttribute('data-src', base + 'viewer/' + ext + '_viewer/?file=' + href);
		}
		item.setAttribute('target', "_blank");
	});
}(jQuery));