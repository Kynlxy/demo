/*
 global dragMove: false, dragEnd: $, jQuery, window, document
 */

(function($ , window , document){
    var main = {
        init: function(){
            
            var isIE=!!window.ActiveXObject; 
            var isIE8=isIE&&!!document.documentMode; 
            if(isIE8){
                $('.part2 ul li').css({'padding-top':'18px'})
                this.menulistFix()
            }else{
                this.initImgLoad();
            }
        },
        initImgLoad: function () {
            var t_img; // 定时器
            var isLoad = true; // 控制变量
            var that = this;
            // 判断图片加载状况，加载完成后回调
            isImgLoad(function(){
                // 加载完成
                that.menulistFix()
            });

            // 判断图片加载的函数
            function isImgLoad(callback){
                // 查找所有封面图，迭代处理
                $('img').each(function(){
                    // 找到为0就将isLoad设为false，并退出each
                    if(this.height === 0){
                        isLoad = false;
                        return false;
                    }
                });
                // 为true，没有发现为0的。加载完毕
                if(isLoad){
                    clearTimeout(t_img); // 清除定时器
                    // 回调函数
                    callback();
                    // 为false，因为找到了没有加载完成的图，将调用定时器递归
                }else{
                    isLoad = true;
                    t_img = setTimeout(function(){
                        isImgLoad(callback); // 递归扫描
                    },500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
                }
            }

        },
        menulistFix: function(){

            var menu = $('.menu_wrap');
            var mh = menu.offset();
            var mt = mh.top-100;
            var mkt = $('.part2').offset().top;
            var bottom_t = $('.part3').offset().top - 550;
            var menu_list = $('.menu_list ul li');
            var menu_list_span = menu_list.find('.menu_span');
            var advantage_items = $('.advantage_wrap').find('.advantage_items');
            var index;
            var main_height = $('.advantage_wrap').height();
            $('.menu-blank-wrap').height(main_height);

            function beSelect(x){
                menu_list_span.removeClass('be_select').addClass('not_select');
                menu_list_span.eq(x).removeClass('not_select').addClass('be_select');
                menu_list.removeClass('bcolor').addClass('ncolor');
                menu_list.eq(x).removeClass('ncolor').addClass('bcolor');

              }

            menu_list.on('click',function(){
                index =  $(this).index();
                var advantage_items = $('.advantage_wrap').find('.advantage_items');
                $("body,html").animate({
                    scrollTop: advantage_items.eq(index).offset().top
                },100);

            });

            if( $(window).scrollTop() >= 1440 ){
                menu.removeClass('menu_wrap_abst').addClass('menu_wrap_fixed');
            }

             $(window).scroll(function(){
                var wh = $(window).scrollTop();
                //console.log(wh,mt,bottom_t);
                if( wh > mt && wh < bottom_t){
                     menu.removeClass('menu_wrap_abst').addClass('menu_wrap_fixed');

                     for( var i = 0 ; i < $('.menu_list .menu_span').length ; i++ ){

                        if ( wh>advantage_items.eq(i).offset().top - 300 ) {

                            beSelect(i);

                        }

                     }
                }else {
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
