!function($,i,a){var t={init:function(){this.addEvent(),this.imgOwl()},imgOwl:function(i){i||(i="huajishijie");var a=$(".owl-phone-pic[data-name="+i+"]");a.owlCarousel({items:1,itemsDesktop:[1199,1],itemsDesktopSmall:[980,1],itemsTablet:[768,1],autoPlay:!0,stopOnHover:!1,pagination:!0,scrollPerPage:!0});var t=a.data("owlCarousel");return t},addEvent:function(){var i=$(".wall ul li"),a=this;i.click(function(){var t=$(this).attr("data-name");i.removeClass("active"),$(this).addClass("active"),$(".owl-phone-pic").hide(),$(".shop-info").hide(),t&&($(".owl-phone-pic[data-name="+t+"]").show(),$(".shop-info[data-name="+t+"]").css({display:"inline-block"}));var o=a.imgOwl(t);o.goTo(0)})}};$(function(){t.init()})}(jQuery,window,document);