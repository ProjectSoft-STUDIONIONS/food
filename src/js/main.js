!(function($){
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
	$(document).on('click', 'a[href$=".xlsx"], a[href$=".docx"], a[href$=".pdf"]', function(e){
		let base = window.location.origin + '/',
			_this = e.currentTarget;
		if(_this.nodeName == "A"){
			let reg = new RegExp("^" + base),
				href = _this.href,
				test = _this.href,
				go = false,
				arr = href.split('.'),
				ext = arr.at(-1).toLowerCase(),
				options = {};
			
			if(reg.test(href)){
				e.preventDefault();
				$(_this).data('google', go);
				switch (ext){
					case "xlsx":
						go = window.location.origin + '/viewer/xlsx_viewer/?file=' + test;
						options = {
							src: go,
							type: 'iframe',
							toolbar: true,
							smallBtn: false,
							buttons: [
								"close"
							],
							opts : {
								afterShow : function( instance, current ) {
									$(".fancybox-content").addClass('xlsx_viewer');
								},
								afterLoad : function( instance, current ) {
									$(".fancybox-content").addClass('xlsx_viewer');
								},
							}
						};
						e.preventDefault();
						$.fancybox.open(options);
						return !1;
						break;
					case "docx":
						go = window.location.origin + '/viewer/docx_viewer/?file=' + test;
						options = {
							src: go,
							type: 'iframe',
							toolbar: true,
							smallBtn: false,
							buttons: [
								"close"
							],
							opts : {
								afterShow : function( instance, current ) {
									$(".fancybox-content").addClass('docx_viewer');
								},
								afterLoad : function( instance, current ) {
									$(".fancybox-content").addClass('docx_viewer');
								},
							}
						};
						e.preventDefault();
						$.fancybox.open(options);
						return !1;
						break;
					case "pdf":
						go = window.location.origin + '/viewer/pdf_viewer/?file=' + test;
						options = {
							src: go,
							toolbar: true,
							smallBtn: false,
							buttons: [
								"close"
							],
							opts : {
								afterShow : function( instance, current ) {
									$(".fancybox-content").addClass('pdf_viewer');
								},
								afterLoad : function( instance, current ) {
									$(".fancybox-content").addClass('pdf_viewer');
								},
							}
						};
						e.preventDefault();
						$.fancybox.open(options);
						return !1;
				}
				return !1;
			}
		}
	});
}(jQuery));