/*
 global dragMove: false, dragEnd: $, jQuery, window, document
 */

(function($ , window , document){
    var main = {
        init: function(){
            this.addEvent();
            this.imgOwl()
        },
        imgOwl: function(name){
            if( !name ){
                name = 'huajishijie'
            }

            //幻灯片播放配置
            var owlCarousel = $('.owl-phone-pic[data-name='+name+']');
            owlCarousel.owlCarousel({
                items:1,
                itemsDesktop:[1199,1],
                itemsDesktopSmall:[980,1],
                itemsTablet:[768,1],
                autoPlay:true,
                stopOnHover:false,
                pagination:true,
                scrollPerPage:true
            });

            var owl = owlCarousel.data('owlCarousel');
            return owl
        },
        addEvent: function(){
            var wall = $('.wall ul li');
            var that = this;

            wall.click(function(){
                var name = $(this).attr('data-name');
                wall.removeClass('active');
                $(this).addClass('active');
                $('.owl-phone-pic').hide();
                $('.shop-info').hide();
                if ( name ){
                    $('.owl-phone-pic[data-name='+name+']').show();
                    $('.shop-info[data-name='+name+']').css({
                        'display':'inline-block'
                    })
                }
                var owl = that.imgOwl(name);
                owl.goTo(0)
            })
        }

    };
    // run
    $(function(){
        main.init()
    })
}(jQuery , window , document ));
