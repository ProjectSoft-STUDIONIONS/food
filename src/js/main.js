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
	/*
	let items = $.makeArray($('a[href$=".xlsx"], a[href$=".docx"], a[href$=".pdf"]'));
	$.each(items, function (i, item) {
		let href = item.href,
			base = window.location.origin + '/',
			reg = new RegExp("^" + escapeRegExp(base));
		if(reg.test(href)){
			item.setAttribute('data-fancybox', "");
		}
	});
	*/
	//
	$(document).on('click', 'a[href$=".xlsx"], a[href$=".docx"], a[href$=".pdf"]', function(e){
		let base = window.location.origin + '/',
			_this = e.currentTarget;
		if(_this.nodeName == "A"){
			let reg = new RegExp("^" + base),
				href = _this.href,
				test = _this.href,
				arr = href.split('.'),
				ext = arr.at(-1).toLowerCase(),
				options = {};
			if(reg.test(href)){
				e.preventDefault();
				switch (ext){
					case "xlsx":
					case "docx":
					case "pdf":
						options = {
							src: window.location.origin + '/viewer/' + ext + '_viewer/?file=' + test,
							type: 'iframe',
							toolbar: true,
							smallBtn: false,
							buttons: [
								"close"
							],
							opts : {
								afterShow : function( instance, current ) {
									$(".fancybox-content").addClass(ext + '_viewer');
								},
								afterLoad : function( instance, current ) {
									$(".fancybox-content").addClass(ext + '_viewer');
								},
							}
						};
						e.preventDefault();
						$.fancybox.open(options);
						return !1;
						break;
				}
				return !1;
			}
		}
	});//
}(jQuery));