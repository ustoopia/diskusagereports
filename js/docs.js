;(function($) {
	$(function(){
		var win = $(window),
			doc = $('#Docs'),
			toc = $('#TOC'),
			tocTop,
			tocHeight,
			docTop,
			docHeight,
			isFixed = 0,
			isBottom = 0;
		
		var processScroll = function() {
			var i, scrollTop = win.scrollTop(),
				isShort = docHeight + docTop - scrollTop <= tocHeight,
				viewPort = win.height();
				
			if (viewPort < tocHeight) {
				isFixed = 0;
				isBottom = 0;
				toc.removeClass('fixed bottom');
			}
			else if (isShort && !isBottom) {
				isBottom = 1;
				isFixed = 0;
				toc.addClass('bottom').removeClass('fixed');
			}
			else if (!isShort && scrollTop >= tocTop && !isFixed) {
				isFixed = 1;
				isBottom = 0;
				toc.addClass('fixed').removeClass('bottom');
			}
			else if (scrollTop <= tocTop && (isFixed || isBottom)) {
				isFixed = 0;
				isBottom = 0;
				toc.removeClass('fixed bottom');
			}
		};
		
		var calcSizes = function() {
			toc.removeClass('fixed bottom');
			isFixed = 0;
			isBottom = 0;
			
			tocTop = toc.size() && toc.offset().top - 20;
			tocHeight = toc.size() && toc.outerHeight(true) + 25;
			docTop = doc.offset().top;
			docHeight = doc.height();
			
			processScroll();
		};
		
		win.on('resize', function() {
			tocTop = toc.size() && toc.offset().top - 20;
			docTop = doc.offset().top;
		});
		
		calcSizes();
		processScroll();
		win.on('resize', calcSizes);
		win.on('scroll', processScroll);
		
		if (navigator.userAgent.match(/\b(Android|iPad|iPhone)\b/i) != null) {
			$('body').addClass('detectmobile');
		}
	});
})(jQuery);