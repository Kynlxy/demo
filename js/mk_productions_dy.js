//代言人页面蒙版显示隐藏
;(function() {
	var fun = {
		ThingShow: function () {
			var $Li = $(".p-part1-img").children().find("li");
			for (var i = 0; i < $Li.length; i++) {
				$Li.eq(i).mouseover(function () {
					var x = $(this).index();
					$(".p-part1-div").hide();
					$(".p-part1-div").eq(x).show();
					$(".p-part1-div2").eq(x).show().stop().animate({
						"bottom": "110px"
					})

				});
			}
		},
		ThingHide: function () {
			var $Li = $(".p-part1-img").children().find("li");
			for (var i = 0; i < $Li.length; i++) {
				$Li.eq(i).mouseout(function () {
					var x = $(this).index();
					$(".p-part1-div").hide();
					$(".p-part1-div2").eq(x).stop().animate({
						"bottom": "0px"
					}, function () {
						$(".p-part1-div2").eq(x).hide()
					})

				});
			}
		}
	};
	$(function () {
		fun.ThingHide();
		fun.ThingShow();
	});
})();