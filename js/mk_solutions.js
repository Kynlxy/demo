/*
 global dragMove: false, dragEnd: $, jQuery, window, document
 */

(function($ , window , document){
    var main = {
        init: function(){
            this.addEvent();
            this.imgOwl();
        },
        imgOwl: function(){


            //幻灯片播放配置
            var bt_owl = $('#obt_owl');
            var xmgf_owl = $('#xmgf_owl');

            bt_owl.owlCarousel({
                items:1,
                itemsDesktop:[1199,1],
                itemsDesktopSmall:[980,1],
                itemsTablet:[768,1],
                autoPlay:true,
                stopOnHover:false,
                pagination:true,
                scrollPerPage:true
            });
            xmgf_owl.owlCarousel({
                items:1,
                itemsDesktop:[1199,1],
                itemsDesktopSmall:[980,1],
                itemsTablet:[768,1],
                autoPlay:true,
                stopOnHover:false,
                pagination:true,
                scrollPerPage:true
            });


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
        },
        menulistFix: function(){
            var menu=$('.menu_wrap');
            var mh=menu.offset();
            var mt=mh.top-100;
            var mkt=$('.part2').offset().top;
            var bottom_t= $('.part3').offset().top-400;
            var menu_list=$('.menu_list ul li');
            var menu_list_span=menu_list.find('.menu_span');
            var advantage_items=$('.advantage_wrap').find('.advantage_items');

            function beSelect(x){
                menu_list_span.removeClass('be_select').addClass('not_select');
                menu_list_span.eq(x).removeClass('not_select').addClass('be_select');
                menu_list.removeClass('bcolor').addClass('ncolor');
                menu_list.eq(x).removeClass('ncolor').addClass('bcolor');

            }
            $(window).scroll(function(){
                var wh = $(window).scrollTop();
                if( wh > mt && wh < bottom_t)
                {
                    menu.removeClass('menu_wrap_abst').addClass('menu_wrap_fixed');

                    for(var i=0;i<8;i++)
                    {
                        if(wh>advantage_items.eq(i).offset().top-300){
                            beSelect(i);
                        }
                    }
                }
                else {
                    menu.removeClass('menu_wrap_fixed').removeClass('menu_wrap_abst');
                }

            });
        }
    };
    // run
    $(function(){
        main.init()
    })
}(jQuery , window , document ));
