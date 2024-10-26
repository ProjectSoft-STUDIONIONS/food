/**
 * MEDIA
**/
(function ($) {
	'use strict';

	// Object containing properties for each media type
	var escapeRegExp = function (string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
	};
	var UrlValid = function(string) {
		let tmp = false;
		try {
			tmp = new URL(string);
			return tmp.href;
		} catch (err) {
			try {
				tmp = new URL(window.location.protocol + "//" + window.location.hostname + "/" + string);
				return tmp.href;
			}catch(er){
				return false;
			}
		}
	};
	const regHost = escapeRegExp(window.location.hostname);
	var defaults = {
		// YouTube
		youtube: {
			matcher:
				/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
			params: {
				autoplay: 0,
				autohide: 1,
				fs: 1,
				rel: 0,
				hd: 1,
				wmode: 'transparent',
				enablejsapi: 1,
				html5: 1,
			},
			paramPlace: 8,
			type: 'iframe',
			url: 'https://www.youtube-nocookie.com/embed/$4',
			thumb: 'https://img.youtube.com/vi/$4/hqdefault.jpg',
		},
		// Vimeo
		vimeo: {
			matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
			params: {
				autoplay: 1,
				hd: 1,
				show_title: 1,
				show_byline: 1,
				show_portrait: 0,
				fullscreen: 1,
			},
			paramPlace: 3,
			type: 'iframe',
			url: 'https://player.vimeo.com/video/$2',
		},
		// Rutube
		rutube: {
			matcher: /^.+rutube.ru\/(?:video|shorts)\/(\w+)\/?/,
			params: {
				frameBorder: 0,
			},
			paramPlace: 1,
			type: 'iframe',
			url: 'https://rutube.ru/play/embed/$1',
			// thumb: 'Надо как-то вставить'
		},
		// Instagram
		instagram: {
			matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
			type: 'image',
			url: 'https://$1/p/$2/media/?size=l',
		},
		// PDF Viewer
		pdfview: {
			matcher: new RegExp("(^.+" + regHost + "/.+\.pdf)$", "i"),
			params: {
				frameBorder: 0,
			},
			type: 'iframe',
			url: window.location.origin + "/viewer/pdf_viewer/?file=$1"
		},
		// DOCX Viewer
		docxview: {
			matcher: new RegExp("(^.+" + regHost + "/.+\.docx)$", "i"),
			params: {
				frameBorder: 0,
			},
			type: 'iframe',
			url: window.location.origin + "/viewer/docx_viewer/?file=$1"
		},
		// XLSX Viewer
		xlsxview: {
			matcher: new RegExp("(^.+" + regHost + "/.+\.xlsx)$", "i"),
			params: {
				frameBorder: 0,
			},
			type: 'iframe',
			url: window.location.origin + "/viewer/xlsx_viewer/?file=$1"
		},
		pdf: {
			matcher: /(.+\.(?:pdf))((\?|#).*)?$/i,
			params: {
				frameBorder: 0,
			},
			type: 'iframe',
			url: "$1$2"
		},
		// Examples:
		// http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
		// https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
		// https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
		// https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
		gmap_place: {
			matcher:
				/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
			type: 'iframe',
			url: function (rez) {
				return (
					'https://maps.google.' +
					rez[2] +
					'/?ll=' +
					(rez[9]
						? rez[9] +
							'&z=' +
							Math.floor(rez[10]) +
							(rez[12] ? rez[12].replace(/^\//, '&') : '')
						: rez[12] + ''
					).replace(/\?/, '&') +
					'&output=' +
					(rez[12] && rez[12].indexOf('layer=c') > 0 ? 'svembed' : 'embed')
				);
			},
		},

		// Examples:
		// https://www.google.com/maps/search/Empire+State+Building/
		// https://www.google.com/maps/search/?api=1&query=centurylink+field
		// https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
		gmap_search: {
			matcher:
				/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
			type: 'iframe',
			url: function (rez) {
				return (
					'https://maps.google.' +
					rez[2] +
					'/maps?q=' +
					rez[5].replace('query=', 'q=').replace('api=1', '') +
					'&output=embed'
				);
			},
		},
	};

	// Formats matching url to final form
	var format = function (url, rez, params) {
		if (!url) {
			return;
		}

		params = params || '';

		if ($.type(params) === 'object') {
			params = $.param(params, true);
		}

		$.each(rez, function (key, value) {
			url = url.replace('$' + key, value || '');
		});

		if (params.length) {
			url += (url.indexOf('?') > 0 ? '&' : '?') + params;
		}

		return url;
	};

	$(document).on('objectNeedsType.fb', function (e, instance, item) {
		var url = UrlValid(item.src),//item.src || false,
			type = false,
			media,
			thumb,
			rez,
			params,
			urlParams,
			paramObj,
			provider;

		media = $.extend(true, {}, defaults, item.opts.media);

		// Look for any matching media type
		$.each(media, function (providerName, providerOpts) {
			if(!url){
				return;
			}

			rez = url.match(providerOpts.matcher);

			if (!rez) {
				return;
			}

			type = providerOpts.type;
			provider = providerName;
			paramObj = {};

			if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
				urlParams = rez[providerOpts.paramPlace];

				if (urlParams[0] == '?') {
					urlParams = urlParams.substring(1);
				}

				urlParams = urlParams.split('&');

				for (var m = 0; m < urlParams.length; ++m) {
					var p = urlParams[m].split('=', 2);

					if (p.length == 2) {
						paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
					}
				}
			}

			params = $.extend(
				true,
				{},
				providerOpts.params,
				item.opts[providerName],
				paramObj
			);

			url =
				$.type(providerOpts.url) === 'function'
					? providerOpts.url.call(this, rez, params, item)
					: format(providerOpts.url, rez, params);
			thumb =
				$.type(providerOpts.thumb) === 'function'
					? providerOpts.thumb.call(this, rez, params, item)
					: format(providerOpts.thumb, rez);
			switch (providerName){
				case 'youtube':
					url = url.replace(/&t=((\d+)m)?(\d+)s/, function (match, p1, m, s) {
						return '&start=' + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
					});
					break;
				case 'vimeo':
				case 'rutube':
					url = url.replace('&%23', '#');
					break;
			}
			return false;
		});

		// If it is found, then change content type and update the url

		if (type) {
			if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
				item.opts.thumb = thumb;
			}

			if (type === 'iframe') {
				item.opts = $.extend(true, item.opts, {
					iframe: {
						preload: false,
						attr: {
							scrolling: 'no',
						},
					},
				});
			}

			$.extend(item, {
				type: type,
				src: url,
				origSrc: item.src,
				contentSource: provider,
				contentType:
					type === 'image'
						? 'image'
						: provider == 'gmap_place' || provider == 'gmap_search'
						? 'map'
						: 'video',
			});
		} else if (url) {
			item.type = item.opts.defaultType;
		}
	});

	// Load YouTube/Video API on request to detect when video finished playing
	var VideoAPILoader = {
		youtube: {
			src: 'https://www.youtube.com/iframe_api',
			class: 'YT',
			loading: false,
			loaded: false,
		},
		vimeo: {
			src: 'https://player.vimeo.com/api/player.js',
			class: 'Vimeo',
			loading: false,
			loaded: false,
		},
		rutube: {
			src: 'https://static.rutube.ru/static/player_sdk/hls.min.js',
			class: 'Rutube',
			loading: false,
			loaded: false,
		},
		load: function (vendor) {
			var _this = this,
				script;
			if (this[vendor].loaded) {
				setTimeout(function () {
					_this.done(vendor);
				});
				return;
			}
			if (this[vendor].loading) {
				return;
			}
			this[vendor].loading = true;
			if(this[vendor].src) {
				script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = this[vendor].src;
				if (vendor === 'youtube') {
					window.onYouTubeIframeAPIReady = function () {
						_this[vendor].loaded = true;
						_this.done(vendor);
					};
				} else {
					script.onload = function () {
						_this[vendor].loaded = true;
						_this.done(vendor);
					};
				}
				document.body.appendChild(script);
			}
		},
		done: function (vendor) {
			var instance, $el, player;

			if (vendor === 'youtube') {
				delete window.onYouTubeIframeAPIReady;
			}

			instance = $.fancybox.getInstance();

			if (instance) {
				$el = instance.current.$content.find('iframe');
				switch (vendor) {
					case 'youtube':
						if(YT !== undefined && YT) {
							player = new YT.Player($el.attr('id'), {
								events: {
									onStateChange: function (e) {
										if (e.data == 0) {
											instance.next();
										}
									},
								},
							});
						}
						break;
					case 'viemo':
						if (Vimeo !== undefined && Vimeo) {
							player = new Vimeo.Player($el);
							player.on('ended', function () {
								instance.next();
							});
						}
						break;
					case 'rutube':
						// Здесь проверить
						console.log("RuTube");
						break;
				}
			}
		},
	};
	/*window.addEventListener('message', function (event) {
		let message = JSON.parse(event.data);
		let player = document.querySelector('iframe.fancybox-iframe');
		switch (message.type) {
			case 'player:ready':
				console.log(message.type);
				player.contentWindow.postMessage(JSON.stringify({
					type: 'player:play',
					data: {}
				}), '*');
				break;
		};
	});*/

	$(document).on({
		'afterShow.fb': function (e, instance, current) {
			if (instance.group.length > 1) {
				switch (current.contentSource) {
					case 'youtube':
					case 'viemo':
					case 'rutube':
						VideoAPILoader.load(current.contentSource);
						break;
					case 'pdfview':
					case 'docxview':
					case 'xlsxview':
					case 'pdf':
						console.info(current.contentSource);
						break;
				}
			}/* &&
				(current.contentSource === 'youtube' ||
					current.contentSource === 'vimeo' ||
					current.contentSource === 'rutube')
			) {
				VideoAPILoader.load(current.contentSource);
			}*/
		},
	});
})(jQuery);