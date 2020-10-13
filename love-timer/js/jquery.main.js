jQuery(function() {
	initMobileNav();
	initOpenClose();
	initAnchors();
	initTimerUp();
		initCountdown();
});


// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener',
		hideOnClickOutside: true,
		menuDrop: 'nav'
	});

	jQuery('.search-holder').mobileNav({
		menuActiveClass: 'search-active',
		menuOpener: '.search-open',
		hideOnClickOutside: false,
		menuDrop: 'ul'
	});
}

// init countdown
function initCountdown() {
	jQuery('.counter').each(function() {
		var holder = jQuery(this);
		var counter = holder.find('.count');
		var days = holder.find('.days');
		var hours = holder.find('.hours');
		var minutes = holder.find('.minutes');
		var seconds = holder.find('.seconds');
		var options = holder.data('options');
		var day = new Date(options.date);

		if (options.time) {
			for (var name in options.time) {
				switch (name) {
					case 'days':
						day.setHours(options.time.days);
						break;
					case 'hours':
						day.setHours(options.time.hours);
						break;
					case 'minutes':
						day.setMinutes(options.time.minutes);
						break;
					case 'seconds':
						day.setSeconds(options.time.seconds);
						break;
				}
			}
		}

		counter.countdown({
			until: day,
			format: 'DHMS',
			onTick: showTime
		});

		function showTime(timeArr) {
			days.text(timeArr[3] < 10 ? ('0' + timeArr[3]) : timeArr[3]);
			hours.text(timeArr[4] < 10 ? ('0' + timeArr[4]) : timeArr[4]);
			minutes.text(timeArr[5] < 10 ? ('0' + timeArr[5]) : timeArr[5]);
			seconds.text(timeArr[6] < 10 ? ('0' + timeArr[6]) : timeArr[6]);
		}
	});
}


function initTimerUp() {

var today = new Date();
var tl = new Date('2019/12/08 00:00:00');
var day = Math.floor((today - tl)/(24*60*60*1000))
var hour = Math.floor((today - tl)/(60*60*1000))
var min = Math.floor((today - tl)/(60*1000))
console.log(hour);

$( ".second-section .heading-holder .day").append( "<h2>" + day+"</h2>" );
$( ".second-section .heading-holder .hour").append( "<h2>" + hour+"</h2>" );
$( ".second-section .heading-holder .min").append( "<h2>" + min+"</h2>" );
}


// initialize smooth anchor links
function initAnchors() {
	new SmoothScroll({
		anchorLinks: '.anchor-link',
		extraOffset: function() {
			var totalHeight = 0;
			jQuery('#header').each(function() {
				var $box = jQuery(this);
				var stickyInstance = $box.data('StickyScrollBlock');
				if (stickyInstance) {
					stickyInstance.stickyFlag = false;
					stickyInstance.stickyOn();
					totalHeight += $box.outerHeight();
					stickyInstance.onResize();
				} else {
					totalHeight += $box.css('position') === 'fixed' ? $box.outerHeight() : 0;
				}
			});
			return totalHeight;
		},
		activeClasses: 'link',
		wheelBehavior: 'none'
	});
}


// open-close init
function initOpenClose() {
	ResponsiveHelper.addRange({
		'..767': {
			on: function() {
				jQuery('.open-close').openClose({
					activeClass: 'active',
					opener: '.opener',
					slider: '.slide',
					animSpeed: 400,
					effect: 'slide'
				});
			},
			off: function() {
				jQuery('.open-close').openClose('destroy');
			}
		}
	});
}

/*
 * Simple Mobile Navigation
 */
 ;(function($) {
 	function MobileNav(options) {
 		this.options = $.extend({
 			container: null,
 			hideOnClickOutside: false,
 			menuActiveClass: 'nav-active',
 			menuOpener: '.nav-opener',
 			menuDrop: '.nav-drop',
 			toggleEvent: 'click',
 			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
 		}, options);
 		this.initStructure();
 		this.attachEvents();
 	}
 	MobileNav.prototype = {
 		initStructure: function() {
 			this.page = $('html');
 			this.container = $(this.options.container);
 			this.opener = this.container.find(this.options.menuOpener);
 			this.drop = this.container.find(this.options.menuDrop);
 		},
 		attachEvents: function() {
 			var self = this;

 			if(activateResizeHandler) {
 				activateResizeHandler();
 				activateResizeHandler = null;
 			}

 			this.outsideClickHandler = function(e) {
 				if(self.isOpened()) {
 					var target = $(e.target);
 					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
 						self.hide();
 					}
 				}
 			};

 			this.openerClickHandler = function(e) {
 				e.preventDefault();
 				self.toggle();
 			};

 			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
 		},
 		isOpened: function() {
 			return this.container.hasClass(this.options.menuActiveClass);
 		},
 		show: function() {
 			this.container.addClass(this.options.menuActiveClass);
 			if(this.options.hideOnClickOutside) {
 				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
 			}
 		},
 		hide: function() {
 			this.container.removeClass(this.options.menuActiveClass);
 			if(this.options.hideOnClickOutside) {
 				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
 			}
 		},
 		toggle: function() {
 			if(this.isOpened()) {
 				this.hide();
 			} else {
 				this.show();
 			}
 		},
 		destroy: function() {
 			this.container.removeClass(this.options.menuActiveClass);
 			this.opener.off(this.options.toggleEvent, this.clickHandler);
 			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
 		}
 	};

 	var activateResizeHandler = function() {
 		var win = $(window),
 		doc = $('html'),
 		resizeClass = 'resize-active',
 		flag, timer;
 		var removeClassHandler = function() {
 			flag = false;
 			doc.removeClass(resizeClass);
 		};
 		var resizeHandler = function() {
 			if(!flag) {
 				flag = true;
 				doc.addClass(resizeClass);
 			}
 			clearTimeout(timer);
 			timer = setTimeout(removeClassHandler, 500);
 		};
 		win.on('resize orientationchange', resizeHandler);
 	};

 	$.fn.mobileNav = function(opt) {
 		var args = Array.prototype.slice.call(arguments);
 		var method = args[0];

 		return this.each(function() {
 			var $container = jQuery(this);
 			var instance = $container.data('MobileNav');

 			if (typeof opt === 'object' || typeof opt === 'undefined') {
 				$container.data('MobileNav', new MobileNav($.extend({
 					container: this
 				}, opt)));
 			} else if (typeof method === 'string' && instance) {
 				if (typeof instance[method] === 'function') {
 					args.shift();
 					instance[method].apply(instance, args);
 				}
 			}
 		});
 	};
 }(jQuery));




/*
 * jQuery Open/Close plugin
 */
 ;(function($) {
 	function OpenClose(options) {
 		this.options = $.extend({
 			addClassBeforeAnimation: true,
 			hideOnClickOutside: false,
 			activeClass: 'active',
 			opener: '.opener',
 			slider: '.slide',
 			animSpeed: 400,
 			effect: 'fade',
 			event: 'click'
 		}, options);
 		this.init();
 	}
 	OpenClose.prototype = {
 		init: function() {
 			if (this.options.holder) {
 				this.findElements();
 				this.attachEvents();
 				this.makeCallback('onInit', this);
 			}
 		},
 		findElements: function() {
 			this.holder = $(this.options.holder);
 			this.opener = this.holder.find(this.options.opener);
 			this.slider = this.holder.find(this.options.slider);
 		},
 		attachEvents: function() {
			// add handler
			var self = this;
			this.eventHandler = function(e) {
				e.preventDefault();
				if (self.slider.hasClass(slideHiddenClass)) {
					self.showSlide();
				} else {
					self.hideSlide();
				}
			};
			self.opener.on(self.options.event, this.eventHandler);

			// hover mode handler
			if (self.options.event === 'hover') {
				self.opener.on('mouseenter', function() {
					if (!self.holder.hasClass(self.options.activeClass)) {
						self.showSlide();
					}
				});
				self.holder.on('mouseleave', function() {
					self.hideSlide();
				});
			}

			// outside click handler
			self.outsideClickHandler = function(e) {
				if (self.options.hideOnClickOutside) {
					var target = $(e.target);
					if (!target.is(self.holder) && !target.closest(self.holder).length) {
						self.hideSlide();
					}
				}
			};

			// set initial styles
			if (this.holder.hasClass(this.options.activeClass)) {
				$(document).on('click touchstart', self.outsideClickHandler);
			} else {
				this.slider.addClass(slideHiddenClass);
			}
		},
		showSlide: function() {
			var self = this;
			if (self.options.addClassBeforeAnimation) {
				self.holder.addClass(self.options.activeClass);
			}
			self.slider.removeClass(slideHiddenClass);
			$(document).on('click touchstart', self.outsideClickHandler);

			self.makeCallback('animStart', true);
			toggleEffects[self.options.effect].show({
				box: self.slider,
				speed: self.options.animSpeed,
				complete: function() {
					if (!self.options.addClassBeforeAnimation) {
						self.holder.addClass(self.options.activeClass);
					}
					self.makeCallback('animEnd', true);
				}
			});
		},
		hideSlide: function() {
			var self = this;
			if (self.options.addClassBeforeAnimation) {
				self.holder.removeClass(self.options.activeClass);
			}
			$(document).off('click touchstart', self.outsideClickHandler);

			self.makeCallback('animStart', false);
			toggleEffects[self.options.effect].hide({
				box: self.slider,
				speed: self.options.animSpeed,
				complete: function() {
					if (!self.options.addClassBeforeAnimation) {
						self.holder.removeClass(self.options.activeClass);
					}
					self.slider.addClass(slideHiddenClass);
					self.makeCallback('animEnd', false);
				}
			});
		},
		destroy: function() {
			this.slider.removeClass(slideHiddenClass).css({
				display: ''
			});
			this.opener.off(this.options.event, this.eventHandler);
			this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
			$(document).off('click touchstart', this.outsideClickHandler);
		},
		makeCallback: function(name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	};

	// add stylesheet for slide on DOMReady
	var slideHiddenClass = 'js-slide-hidden';
	(function() {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.' + slideHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	}());

	// animation effects
	var toggleEffects = {
		slide: {
			show: function(o) {
				o.box.stop(true).hide().slideDown(o.speed, o.complete);
			},
			hide: function(o) {
				o.box.stop(true).slideUp(o.speed, o.complete);
			}
		},
		fade: {
			show: function(o) {
				o.box.stop(true).hide().fadeIn(o.speed, o.complete);
			},
			hide: function(o) {
				o.box.stop(true).fadeOut(o.speed, o.complete);
			}
		},
		none: {
			show: function(o) {
				o.box.hide().show(0, o.complete);
			},
			hide: function(o) {
				o.box.hide(0, o.complete);
			}
		}
	};

	// jQuery plugin interface
	$.fn.openClose = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function() {
			var $holder = jQuery(this);
			var instance = $holder.data('OpenClose');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$holder.data('OpenClose', new OpenClose($.extend({
					holder: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));

/*
 * Responsive Layout helper
 */
 window.ResponsiveHelper = (function($){
	// init variables
	var handlers = [],
	prevWinWidth,
	win = $(window),
	nativeMatchMedia = false;

	// detect match media support
	if(window.matchMedia) {
		if(window.Window && window.matchMedia === Window.prototype.matchMedia) {
			nativeMatchMedia = true;
		} else if(window.matchMedia.toString().indexOf('native') > -1) {
			nativeMatchMedia = true;
		}
	}

	// prepare resize handler
	function resizeHandler() {
		var winWidth = win.width();
		if(winWidth !== prevWinWidth) {
			prevWinWidth = winWidth;

			// loop through range groups
			$.each(handlers, function(index, rangeObject){
				// disable current active area if needed
				$.each(rangeObject.data, function(property, item) {
					if(item.currentActive && !matchRange(item.range[0], item.range[1])) {
						item.currentActive = false;
						if(typeof item.disableCallback === 'function') {
							item.disableCallback();
						}
					}
				});

				// enable areas that match current width
				$.each(rangeObject.data, function(property, item) {
					if(!item.currentActive && matchRange(item.range[0], item.range[1])) {
						// make callback
						item.currentActive = true;
						if(typeof item.enableCallback === 'function') {
							item.enableCallback();
						}
					}
				});
			});
		}
	}
	win.bind('load resize orientationchange', resizeHandler);

	// test range
	function matchRange(r1, r2) {
		var mediaQueryString = '';
		if(r1 > 0) {
			mediaQueryString += '(min-width: ' + r1 + 'px)';
		}
		if(r2 < Infinity) {
			mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
		}
		return matchQuery(mediaQueryString, r1, r2);
	}

	// media query function
	function matchQuery(query, r1, r2) {
		if(window.matchMedia && nativeMatchMedia) {
			return matchMedia(query).matches;
		} else if(window.styleMedia) {
			return styleMedia.matchMedium(query);
		} else if(window.media) {
			return media.matchMedium(query);
		} else {
			return prevWinWidth >= r1 && prevWinWidth <= r2;
		}
	}

	// range parser
	function parseRange(rangeStr) {
		var rangeData = rangeStr.split('..');
		var x1 = parseInt(rangeData[0], 10) || -Infinity;
		var x2 = parseInt(rangeData[1], 10) || Infinity;
		return [x1, x2].sort(function(a, b){
			return a - b;
		});
	}

	// export public functions
	return {
		addRange: function(ranges) {
			// parse data and add items to collection
			var result = {data:{}};
			$.each(ranges, function(property, data){
				result.data[property] = {
					range: parseRange(property),
					enableCallback: data.on,
					disableCallback: data.off
				};
			});
			handlers.push(result);

			// call resizeHandler to recalculate all events
			prevWinWidth = null;
			resizeHandler();
		}
	};
}(jQuery));

/*!
 * SmoothScroll module
 */
;(function($, exports) {
	// private variables
	var page,
		win = $(window),
		activeBlock, activeWheelHandler,
		wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll');

	// animation handlers
	function scrollTo(offset, options, callback) {
		// initialize variables
		var scrollBlock;
		if (document.body) {
			if (typeof options === 'number') {
				options = {
					duration: options
				};
			} else {
				options = options || {};
			}
			page = page || $('html, body');
			scrollBlock = options.container || page;
		} else {
			return;
		}

		// treat single number as scrollTop
		if (typeof offset === 'number') {
			offset = {
				top: offset
			};
		}

		// handle mousewheel/trackpad while animation is active
		if (activeBlock && activeWheelHandler) {
			activeBlock.off(wheelEvents, activeWheelHandler);
		}
		if (options.wheelBehavior && options.wheelBehavior !== 'none') {
			activeWheelHandler = function(e) {
				if (options.wheelBehavior === 'stop') {
					scrollBlock.off(wheelEvents, activeWheelHandler);
					scrollBlock.stop();
				} else if (options.wheelBehavior === 'ignore') {
					e.preventDefault();
				}
			};
			activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler);
		}

		// start scrolling animation
		scrollBlock.stop().animate({
			scrollLeft: offset.left,
			scrollTop: offset.top
		}, options.duration, function() {
			if (activeWheelHandler) {
				scrollBlock.off(wheelEvents, activeWheelHandler);
			}
			if ($.isFunction(callback)) {
				callback();
			}
		});
	}

	// smooth scroll contstructor
	function SmoothScroll(options) {
		this.options = $.extend({
			anchorLinks: 'a[href^="#"]', // selector or jQuery object
			container: null, // specify container for scrolling (default - whole page)
			extraOffset: null, // function or fixed number
			activeClasses: null, // null, "link", "parent"
			easing: 'swing', // easing of scrolling
			animMode: 'duration', // or "speed" mode
			animDuration: 800, // total duration for scroll (any distance)
			animSpeed: 1500, // pixels per second
			anchorActiveClass: 'anchor-active',
			sectionActiveClass: 'section-active',
			wheelBehavior: 'stop', // "stop", "ignore" or "none"
			useNativeAnchorScrolling: false // do not handle click in devices with native smooth scrolling
		}, options);
		this.init();
	}
	SmoothScroll.prototype = {
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.isInit = true;
		},
		initStructure: function() {
			var self = this;

			this.container = this.options.container ? $(this.options.container) : $('html,body');
			this.scrollContainer = this.options.container ? this.container : win;
			this.anchorLinks = jQuery(this.options.anchorLinks).filter(function() {
				return jQuery(self.getAnchorTarget(jQuery(this))).length;
			});
		},
		getId: function(str) {
			try {
				return '#' + str.replace(/^.*?(#|$)/, '');
			} catch (err) {
				return null;
			}
		},
		getAnchorTarget: function(link) {
			// get target block from link href
			var targetId = this.getId($(link).attr('href'));
			return $(targetId.length > 1 ? targetId : 'html');
		},
		getTargetOffset: function(block) {
			// get target offset
			var blockOffset = block.offset().top;
			if (this.options.container) {
				blockOffset -= this.container.offset().top - this.container.prop('scrollTop');
			}

			// handle extra offset
			if (typeof this.options.extraOffset === 'number') {
				blockOffset -= this.options.extraOffset;
			} else if (typeof this.options.extraOffset === 'function') {
				blockOffset -= this.options.extraOffset(block);
			}
			return {
				top: blockOffset
			};
		},
		attachEvents: function() {
			var self = this;

			// handle active classes
			if (this.options.activeClasses && this.anchorLinks.length) {
				// cache structure
				this.anchorData = [];

				for (var i = 0; i < this.anchorLinks.length; i++) {
					var link = jQuery(this.anchorLinks[i]),
						targetBlock = self.getAnchorTarget(link),
						anchorDataItem = null;

					$.each(self.anchorData, function(index, item) {
						if (item.block[0] === targetBlock[0]) {
							anchorDataItem = item;
						}
					});

					if (anchorDataItem) {
						anchorDataItem.link = anchorDataItem.link.add(link);
					} else {
						self.anchorData.push({
							link: link,
							block: targetBlock
						});
					}
				};

				// add additional event handlers
				this.resizeHandler = function() {
					if (!self.isInit) return;
					self.recalculateOffsets();
				};
				this.scrollHandler = function() {
					self.refreshActiveClass();
				};

				this.recalculateOffsets();
				this.scrollContainer.on('scroll', this.scrollHandler);
				win.on('resize load orientationchange refreshAnchor', this.resizeHandler);
			}

			// handle click event
			this.clickHandler = function(e) {
				self.onClick(e);
			};
			if (!this.options.useNativeAnchorScrolling) {
				this.anchorLinks.on('click', this.clickHandler);
			}
		},
		recalculateOffsets: function() {
			var self = this;
			$.each(this.anchorData, function(index, data) {
				data.offset = self.getTargetOffset(data.block);
				data.height = data.block.outerHeight();
			});
			this.refreshActiveClass();
		},
		toggleActiveClass: function(anchor, block, state) {
			anchor.toggleClass(this.options.anchorActiveClass, state);
			block.toggleClass(this.options.sectionActiveClass, state);
		},
		refreshActiveClass: function() {
			var self = this,
				foundFlag = false,
				containerHeight = this.container.prop('scrollHeight'),
				viewPortHeight = this.scrollContainer.height(),
				scrollTop = this.options.container ? this.container.prop('scrollTop') : win.scrollTop();

			// user function instead of default handler
			if (this.options.customScrollHandler) {
				this.options.customScrollHandler.call(this, scrollTop, this.anchorData);
				return;
			}

			// sort anchor data by offsets
			this.anchorData.sort(function(a, b) {
				return a.offset.top - b.offset.top;
			});

			// default active class handler
			$.each(this.anchorData, function(index) {
				var reverseIndex = self.anchorData.length - index - 1,
					data = self.anchorData[reverseIndex],
					anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

				if (scrollTop >= containerHeight - viewPortHeight) {
					// handle last section
					if (reverseIndex === self.anchorData.length - 1) {
						self.toggleActiveClass(anchorElement, data.block, true);
					} else {
						self.toggleActiveClass(anchorElement, data.block, false);
					}
				} else {
					// handle other sections
					if (!foundFlag && (scrollTop >= data.offset.top - 1 || reverseIndex === 0)) {
						foundFlag = true;
						self.toggleActiveClass(anchorElement, data.block, true);
					} else {
						self.toggleActiveClass(anchorElement, data.block, false);
					}
				}
			});
		},
		calculateScrollDuration: function(offset) {
			var distance;
			if (this.options.animMode === 'speed') {
				distance = Math.abs(this.scrollContainer.scrollTop() - offset.top);
				return (distance / this.options.animSpeed) * 1000;
			} else {
				return this.options.animDuration;
			}
		},
		onClick: function(e) {
			var targetBlock = this.getAnchorTarget(e.currentTarget),
				targetOffset = this.getTargetOffset(targetBlock);

			e.preventDefault();
			scrollTo(targetOffset, {
				container: this.container,
				wheelBehavior: this.options.wheelBehavior,
				duration: this.calculateScrollDuration(targetOffset)
			});
			this.makeCallback('onBeforeScroll', e.currentTarget);
		},
		makeCallback: function(name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},
		destroy: function() {
			var self = this;

			this.isInit = false;
			if (this.options.activeClasses) {
				win.off('resize load orientationchange refreshAnchor', this.resizeHandler);
				this.scrollContainer.off('scroll', this.scrollHandler);
				$.each(this.anchorData, function(index) {
					var reverseIndex = self.anchorData.length - index - 1,
						data = self.anchorData[reverseIndex],
						anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

					self.toggleActiveClass(anchorElement, data.block, false);
				});
			}
			this.anchorLinks.off('click', this.clickHandler);
		}
	};

	// public API
	$.extend(SmoothScroll, {
		scrollTo: function(blockOrOffset, durationOrOptions, callback) {
			scrollTo(blockOrOffset, durationOrOptions, callback);
		}
	});

	// export module
	exports.SmoothScroll = SmoothScroll;
}(jQuery, this));


/*! Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
!function(){"use strict";var a=!1;window.JQClass=function(){},JQClass.classes={},JQClass.extend=function b(c){function d(){!a&&this._init&&this._init.apply(this,arguments)}var e=this.prototype;a=!0;var f=new this;a=!1;for(var g in c)if("function"==typeof c[g]&&"function"==typeof e[g])f[g]=function(a,b){return function(){var c=this._super;this._super=function(b){return e[a].apply(this,b||[])};var d=b.apply(this,arguments);return this._super=c,d}}(g,c[g]);else if("object"==typeof c[g]&&"object"==typeof e[g]&&"defaultOptions"===g){var h,i=e[g],j=c[g],k={};for(h in i)k[h]=i[h];for(h in j)k[h]=j[h];f[g]=k}else f[g]=c[g];return d.prototype=f,d.prototype.constructor=d,d.extend=b,d}}(),/*! Abstract base class for collection plugins v1.0.2.
	Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.
	Licensed under the MIT license (http://keith-wood.name/licence.html). */
function($){"use strict";function camelCase(a){return a.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()})}JQClass.classes.JQPlugin=JQClass.extend({name:"plugin",defaultOptions:{},regionalOptions:{},deepMerge:!0,_getMarker:function(){return"is-"+this.name},_init:function(){$.extend(this.defaultOptions,this.regionalOptions&&this.regionalOptions[""]||{});var a=camelCase(this.name);$[a]=this,$.fn[a]=function(b){var c=Array.prototype.slice.call(arguments,1),d=this,e=this;return this.each(function(){if("string"==typeof b){if("_"===b[0]||!$[a][b])throw"Unknown method: "+b;var f=$[a][b].apply($[a],[this].concat(c));if(f!==d&&void 0!==f)return e=f,!1}else $[a]._attach(this,b)}),e}},setDefaults:function(a){$.extend(this.defaultOptions,a||{})},_attach:function(a,b){if(a=$(a),!a.hasClass(this._getMarker())){a.addClass(this._getMarker()),b=$.extend(this.deepMerge,{},this.defaultOptions,this._getMetadata(a),b||{});var c=$.extend({name:this.name,elem:a,options:b},this._instSettings(a,b));a.data(this.name,c),this._postAttach(a,c),this.option(a,b)}},_instSettings:function(a,b){return{}},_postAttach:function(a,b){},_getMetadata:function(elem){try{var data=elem.data(this.name.toLowerCase())||"";data=data.replace(/(\\?)'/g,function(a,b){return b?"'":'"'}).replace(/([a-zA-Z0-9]+):/g,function(a,b,c){var d=data.substring(0,c).match(/"/g);return d&&d.length%2!==0?b+":":'"'+b+'":'}).replace(/\\:/g,":"),data=$.parseJSON("{"+data+"}");for(var key in data)if(data.hasOwnProperty(key)){var value=data[key];"string"==typeof value&&value.match(/^new Date\(([-0-9,\s]*)\)$/)&&(data[key]=eval(value))}return data}catch(a){return{}}},_getInst:function(a){return $(a).data(this.name)||{}},option:function(a,b,c){a=$(a);var d=a.data(this.name),e=b||{};return!b||"string"==typeof b&&"undefined"==typeof c?(e=(d||{}).options,e&&b?e[b]:e):void(a.hasClass(this._getMarker())&&("string"==typeof b&&(e={},e[b]=c),this._optionsChanged(a,d,e),$.extend(d.options,e)))},_optionsChanged:function(a,b,c){},destroy:function(a){a=$(a),a.hasClass(this._getMarker())&&(this._preDestroy(a,this._getInst(a)),a.removeData(this.name).removeClass(this._getMarker()))},_preDestroy:function(a,b){}}),$.JQPlugin={createPlugin:function(a,b){"object"==typeof a&&(b=a,a="JQPlugin"),a=camelCase(a);var c=camelCase(b.name);JQClass.classes[c]=JQClass.classes[a].extend(b),new JQClass.classes[c]}}}(jQuery);

/*! http://keith-wood.name/countdown.html
Countdown for jQuery v2.1.0.
Written by Keith Wood (wood.keith{at}optusnet.com.au) January 2008.
Available under the MIT (http://keith-wood.name/licence.html) license.
Please attribute the author if you use it. */
!function(a){"use strict";var b="countdown",c=0,d=1,e=2,f=3,g=4,h=5,i=6;a.JQPlugin.createPlugin({name:b,defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,padZeroes:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:!1}},_rtlClass:b+"-rtl",_sectionClass:b+"-section",_amountClass:b+"-amount",_periodClass:b+"-period",_rowClass:b+"-row",_holdingClass:b+"-holding",_showClass:b+"-show",_descrClass:b+"-descr",_timerElems:[],_init:function(){function b(a){var h=a<1e12?e?window.performance.now()+window.performance.timing.navigationStart:d():a||d();h-g>=1e3&&(c._updateElems(),g=h),f(b)}var c=this;this._super(),this._serverSyncs=[];var d="function"==typeof Date.now?Date.now:function(){return(new Date).getTime()},e=window.performance&&"function"==typeof window.performance.now,f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,g=0;!f||a.noRequestAnimationFrame?(a.noRequestAnimationFrame=null,a.countdown._timer=setInterval(function(){c._updateElems()},1e3)):(g=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||d(),f(b))},UTCDate:function(a,b,c,d,e,f,g,h){"object"==typeof b&&b instanceof Date&&(h=b.getMilliseconds(),g=b.getSeconds(),f=b.getMinutes(),e=b.getHours(),d=b.getDate(),c=b.getMonth(),b=b.getFullYear());var i=new Date;return i.setUTCFullYear(b),i.setUTCDate(1),i.setUTCMonth(c||0),i.setUTCDate(d||1),i.setUTCHours(e||0),i.setUTCMinutes((f||0)-(Math.abs(a)<30?60*a:a)),i.setUTCSeconds(g||0),i.setUTCMilliseconds(h||0),i},periodsToSeconds:function(a){return 31557600*a[0]+2629800*a[1]+604800*a[2]+86400*a[3]+3600*a[4]+60*a[5]+a[6]},resync:function(){var b=this;a("."+this._getMarker()).each(function(){var c=a.data(this,b.name);if(c.options.serverSync){for(var d=null,e=0;e<b._serverSyncs.length;e++)if(b._serverSyncs[e][0]===c.options.serverSync){d=b._serverSyncs[e];break}if(b._eqNull(d[2])){var f=a.isFunction(c.options.serverSync)?c.options.serverSync.apply(this,[]):null;d[2]=(f?(new Date).getTime()-f.getTime():0)-d[1]}c._since&&c._since.setMilliseconds(c._since.getMilliseconds()+d[2]),c._until.setMilliseconds(c._until.getMilliseconds()+d[2])}});for(var c=0;c<b._serverSyncs.length;c++)b._eqNull(b._serverSyncs[c][2])||(b._serverSyncs[c][1]+=b._serverSyncs[c][2],delete b._serverSyncs[c][2])},_instSettings:function(a,b){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(a){this._hasElem(a)||this._timerElems.push(a)},_hasElem:function(b){return a.inArray(b,this._timerElems)>-1},_removeElem:function(b){this._timerElems=a.map(this._timerElems,function(a){return a===b?null:a})},_updateElems:function(){for(var a=this._timerElems.length-1;a>=0;a--)this._updateCountdown(this._timerElems[a])},_optionsChanged:function(b,c,d){d.layout&&(d.layout=d.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")),this._resetExtraLabels(c.options,d);var e=c.options.timezone!==d.timezone;a.extend(c.options,d),this._adjustSettings(b,c,!this._eqNull(d.until)||!this._eqNull(d.since)||e);var f=new Date;(c._since&&c._since<f||c._until&&c._until>f)&&this._addElem(b[0]),this._updateCountdown(b,c)},_updateCountdown:function(b,c){if(b=b.jquery?b:a(b),c=c||this._getInst(b)){if(b.html(this._generateHTML(c)).toggleClass(this._rtlClass,c.options.isRTL),"pause"!==c._hold&&a.isFunction(c.options.onTick)){var d="lap"!==c._hold?c._periods:this._calculatePeriods(c,c._show,c.options.significant,new Date);1!==c.options.tickInterval&&this.periodsToSeconds(d)%c.options.tickInterval!==0||c.options.onTick.apply(b[0],[d])}var e="pause"!==c._hold&&(c._since?c._now.getTime()<c._since.getTime():c._now.getTime()>=c._until.getTime());if(e&&!c._expiring){if(c._expiring=!0,this._hasElem(b[0])||c.options.alwaysExpire){if(this._removeElem(b[0]),a.isFunction(c.options.onExpiry)&&c.options.onExpiry.apply(b[0],[]),c.options.expiryText){var f=c.options.layout;c.options.layout=c.options.expiryText,this._updateCountdown(b[0],c),c.options.layout=f}c.options.expiryUrl&&(window.location=c.options.expiryUrl)}c._expiring=!1}else"pause"===c._hold&&this._removeElem(b[0])}},_resetExtraLabels:function(a,b){var c=null;for(c in b)c.match(/[Ll]abels[02-9]|compactLabels1/)&&(a[c]=b[c]);for(c in a)c.match(/[Ll]abels[02-9]|compactLabels1/)&&"undefined"==typeof b[c]&&(a[c]=null)},_eqNull:function(a){return"undefined"==typeof a||null===a},_adjustSettings:function(b,c,d){for(var e=null,f=0;f<this._serverSyncs.length;f++)if(this._serverSyncs[f][0]===c.options.serverSync){e=this._serverSyncs[f][1];break}var g=null,h=null;if(this._eqNull(e)){var i=a.isFunction(c.options.serverSync)?c.options.serverSync.apply(b[0],[]):null;g=new Date,h=i?g.getTime()-i.getTime():0,this._serverSyncs.push([c.options.serverSync,h])}else g=new Date,h=c.options.serverSync?e:0;var j=c.options.timezone;j=this._eqNull(j)?-g.getTimezoneOffset():j,(d||!d&&this._eqNull(c._until)&&this._eqNull(c._since))&&(c._since=c.options.since,this._eqNull(c._since)||(c._since=this.UTCDate(j,this._determineTime(c._since,null)),c._since&&h&&c._since.setMilliseconds(c._since.getMilliseconds()+h)),c._until=this.UTCDate(j,this._determineTime(c.options.until,g)),h&&c._until.setMilliseconds(c._until.getMilliseconds()+h)),c._show=this._determineShow(c)},_preDestroy:function(a,b){this._removeElem(a[0]),a.empty()},pause:function(a){this._hold(a,"pause")},lap:function(a){this._hold(a,"lap")},resume:function(a){this._hold(a,null)},toggle:function(b){var c=a.data(b,this.name)||{};this[c._hold?"resume":"pause"](b)},toggleLap:function(b){var c=a.data(b,this.name)||{};this[c._hold?"resume":"lap"](b)},_hold:function(b,c){var d=a.data(b,this.name);if(d){if("pause"===d._hold&&!c){d._periods=d._savePeriods;var e=d._since?"-":"+";d[d._since?"_since":"_until"]=this._determineTime(e+d._periods[0]+"y"+e+d._periods[1]+"o"+e+d._periods[2]+"w"+e+d._periods[3]+"d"+e+d._periods[4]+"h"+e+d._periods[5]+"m"+e+d._periods[6]+"s"),this._addElem(b)}d._hold=c,d._savePeriods="pause"===c?d._periods:null,a.data(b,this.name,d),this._updateCountdown(b,d)}},getTimes:function(b){var c=a.data(b,this.name);return c?"pause"===c._hold?c._savePeriods:c._hold?this._calculatePeriods(c,c._show,c.options.significant,new Date):c._periods:null},_determineTime:function(a,b){var c=this,d=function(a){var b=new Date;return b.setTime(b.getTime()+1e3*a),b},e=function(a){a=a.toLowerCase();for(var b=new Date,d=b.getFullYear(),e=b.getMonth(),f=b.getDate(),g=b.getHours(),h=b.getMinutes(),i=b.getSeconds(),j=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,k=j.exec(a);k;){switch(k[2]||"s"){case"s":i+=parseInt(k[1],10);break;case"m":h+=parseInt(k[1],10);break;case"h":g+=parseInt(k[1],10);break;case"d":f+=parseInt(k[1],10);break;case"w":f+=7*parseInt(k[1],10);break;case"o":e+=parseInt(k[1],10),f=Math.min(f,c._getDaysInMonth(d,e));break;case"y":d+=parseInt(k[1],10),f=Math.min(f,c._getDaysInMonth(d,e))}k=j.exec(a)}return new Date(d,e,f,g,h,i,0)},f=this._eqNull(a)?b:"string"==typeof a?e(a):"number"==typeof a?d(a):a;return f&&f.setMilliseconds(0),f},_getDaysInMonth:function(a,b){return 32-new Date(a,b,32).getDate()},_normalLabels:function(a){return a},_generateHTML:function(b){var j=this;b._periods=b._hold?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date);var k=!1,l=0,m=b.options.significant,n=a.extend({},b._show),o=null;for(o=c;o<=i;o++)k=k||"?"===b._show[o]&&b._periods[o]>0,n[o]="?"!==b._show[o]||k?b._show[o]:null,l+=n[o]?1:0,m-=b._periods[o]>0?1:0;var p=[!1,!1,!1,!1,!1,!1,!1];for(o=i;o>=c;o--)b._show[o]&&(b._periods[o]?p[o]=!0:(p[o]=m>0,m--));var q=b.options.compact?b.options.compactLabels:b.options.labels,r=b.options.whichLabels||this._normalLabels,s=function(a){var c=b.options["compactLabels"+r(b._periods[a])];return n[a]?j._translateDigits(b,b._periods[a])+(c?c[a]:q[a])+" ":""},t=b.options.padZeroes?2:1,u=function(a){var c=b.options["labels"+r(b._periods[a])];return!b.options.significant&&n[a]||b.options.significant&&p[a]?'<span class="'+j._sectionClass+'"><span class="'+j._amountClass+'">'+j._minDigits(b,b._periods[a],t)+'</span><span class="'+j._periodClass+'">'+(c?c[a]:q[a])+"</span></span>":""};return b.options.layout?this._buildLayout(b,n,b.options.layout,b.options.compact,b.options.significant,p):(b.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(b._hold?" "+this._holdingClass:"")+'">'+s(c)+s(d)+s(e)+s(f)+(n[g]?this._minDigits(b,b._periods[g],2):"")+(n[h]?(n[g]?b.options.timeSeparator:"")+this._minDigits(b,b._periods[h],2):"")+(n[i]?(n[g]||n[h]?b.options.timeSeparator:"")+this._minDigits(b,b._periods[i],2):""):'<span class="'+this._rowClass+" "+this._showClass+(b.options.significant||l)+(b._hold?" "+this._holdingClass:"")+'">'+u(c)+u(d)+u(e)+u(f)+u(g)+u(h)+u(i))+"</span>"+(b.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+b.options.description+"</span>":"")},_buildLayout:function(b,j,k,l,m,n){for(var o=b.options[l?"compactLabels":"labels"],p=b.options.whichLabels||this._normalLabels,q=function(a){return(b.options[(l?"compactLabels":"labels")+p(b._periods[a])]||o)[a]},r=function(a,c){return b.options.digits[Math.floor(a/c)%10]},s={desc:b.options.description,sep:b.options.timeSeparator,yl:q(c),yn:this._minDigits(b,b._periods[c],1),ynn:this._minDigits(b,b._periods[c],2),ynnn:this._minDigits(b,b._periods[c],3),y1:r(b._periods[c],1),y10:r(b._periods[c],10),y100:r(b._periods[c],100),y1000:r(b._periods[c],1e3),ol:q(d),on:this._minDigits(b,b._periods[d],1),onn:this._minDigits(b,b._periods[d],2),onnn:this._minDigits(b,b._periods[d],3),o1:r(b._periods[d],1),o10:r(b._periods[d],10),o100:r(b._periods[d],100),o1000:r(b._periods[d],1e3),wl:q(e),wn:this._minDigits(b,b._periods[e],1),wnn:this._minDigits(b,b._periods[e],2),wnnn:this._minDigits(b,b._periods[e],3),w1:r(b._periods[e],1),w10:r(b._periods[e],10),w100:r(b._periods[e],100),w1000:r(b._periods[e],1e3),dl:q(f),dn:this._minDigits(b,b._periods[f],1),dnn:this._minDigits(b,b._periods[f],2),dnnn:this._minDigits(b,b._periods[f],3),d1:r(b._periods[f],1),d10:r(b._periods[f],10),d100:r(b._periods[f],100),d1000:r(b._periods[f],1e3),hl:q(g),hn:this._minDigits(b,b._periods[g],1),hnn:this._minDigits(b,b._periods[g],2),hnnn:this._minDigits(b,b._periods[g],3),h1:r(b._periods[g],1),h10:r(b._periods[g],10),h100:r(b._periods[g],100),h1000:r(b._periods[g],1e3),ml:q(h),mn:this._minDigits(b,b._periods[h],1),mnn:this._minDigits(b,b._periods[h],2),mnnn:this._minDigits(b,b._periods[h],3),m1:r(b._periods[h],1),m10:r(b._periods[h],10),m100:r(b._periods[h],100),m1000:r(b._periods[h],1e3),sl:q(i),sn:this._minDigits(b,b._periods[i],1),snn:this._minDigits(b,b._periods[i],2),snnn:this._minDigits(b,b._periods[i],3),s1:r(b._periods[i],1),s10:r(b._periods[i],10),s100:r(b._periods[i],100),s1000:r(b._periods[i],1e3)},t=k,u=c;u<=i;u++){var v="yowdhms".charAt(u),w=new RegExp("\\{"+v+"<\\}([\\s\\S]*)\\{"+v+">\\}","g");t=t.replace(w,!m&&j[u]||m&&n[u]?"$1":"")}return a.each(s,function(a,b){var c=new RegExp("\\{"+a+"\\}","g");t=t.replace(c,b)}),t},_minDigits:function(a,b,c){return b=""+b,b.length>=c?this._translateDigits(a,b):(b="0000000000"+b,this._translateDigits(a,b.substr(b.length-c)))},_translateDigits:function(a,b){return(""+b).replace(/[0-9]/g,function(b){return a.options.digits[b]})},_determineShow:function(a){var b=a.options.format,j=[];return j[c]=b.match("y")?"?":b.match("Y")?"!":null,j[d]=b.match("o")?"?":b.match("O")?"!":null,j[e]=b.match("w")?"?":b.match("W")?"!":null,j[f]=b.match("d")?"?":b.match("D")?"!":null,j[g]=b.match("h")?"?":b.match("H")?"!":null,j[h]=b.match("m")?"?":b.match("M")?"!":null,j[i]=b.match("s")?"?":b.match("S")?"!":null,j},_calculatePeriods:function(a,b,j,k){a._now=k,a._now.setMilliseconds(0);var l=new Date(a._now.getTime());a._since?k.getTime()<a._since.getTime()?a._now=k=l:k=a._since:(l.setTime(a._until.getTime()),k.getTime()>a._until.getTime()&&(a._now=k=l));var m=[0,0,0,0,0,0,0];if(b[c]||b[d]){var n=this._getDaysInMonth(k.getFullYear(),k.getMonth()),o=this._getDaysInMonth(l.getFullYear(),l.getMonth()),p=l.getDate()===k.getDate()||l.getDate()>=Math.min(n,o)&&k.getDate()>=Math.min(n,o),q=function(a){return 60*(60*a.getHours()+a.getMinutes())+a.getSeconds()},r=Math.max(0,12*(l.getFullYear()-k.getFullYear())+l.getMonth()-k.getMonth()+(l.getDate()<k.getDate()&&!p||p&&q(l)<q(k)?-1:0));m[c]=b[c]?Math.floor(r/12):0,m[d]=b[d]?r-12*m[c]:0,k=new Date(k.getTime());var s=k.getDate()===n,t=this._getDaysInMonth(k.getFullYear()+m[c],k.getMonth()+m[d]);k.getDate()>t&&k.setDate(t),k.setFullYear(k.getFullYear()+m[c]),k.setMonth(k.getMonth()+m[d]),s&&k.setDate(t)}var u=Math.floor((l.getTime()-k.getTime())/1e3),v=null,w=function(a,c){m[a]=b[a]?Math.floor(u/c):0,u-=m[a]*c};if(w(e,604800),w(f,86400),w(g,3600),w(h,60),w(i,1),u>0&&!a._since){var x=[1,12,4.3482,7,24,60,60],y=i,z=1;for(v=i;v>=c;v--)b[v]&&(m[y]>=z&&(m[y]=0,u=1),u>0&&(m[v]++,u=0,y=v,z=1)),z*=x[v]}if(j)for(v=c;v<=i;v++)j&&m[v]?j--:j||(m[v]=0);return m}})}(jQuery);
/*
* jQuery Tabs plugin
*/
jQuery(function() {});


