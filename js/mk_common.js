/*
 global dragMove: false, dragEnd: $, jQuery, window, document
 */

(function($ , window , document){
    var main = {
        init: function(){
            this.addEvent();
            this.showBox();
            this.changeNavStyle();
            this.initImgLoad();
            //this.menulistFix();
            $(window).on('load', this.menulistFix);
            this.isClick = false;
            window.getQuery = this.getQuery();
        },
        initImgLoad: function () {
            var t_img; // 定时器
            var isLoad = true; // 控制变量
            var that = this;
            // 判断图片加载状况，加载完成后回调
            isImgLoad(function(){
                // 加载完成
                that.gotoTop()
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
        showBox: function(){

            var timer=null;
            var cont_index=1;
            timer=setTimeout(function(){
               $(".tanchuang_js").fadeIn();
             },20000);

             $(".closebox").on("click",function(){
                $(".tanchuang_js").fadeOut();
                timer=setTimeout(function(){
                $(".tanchuang_js").fadeIn();
             },20000);
             });//自动弹窗

             $(".button_sq").on("click",function(){
                $(".applicate").animate({"height":"488px"});
             });
             $(".close_app").on("click",function(){
                $(".applicate").animate({"height":"0px"});
             });//申请开通弹窗
      
             
             $(".contact-us").click(function(){
                 if(cont_index==1){
                $(".contact-us").animate({"right":"-156px"});
                $(".contact_show").css({'height':'140px',
                                         'line-height':'24px',
                                         'font-size':'18px'})
                $(".contact_show").html("<img src='http://img01.taojae.com/party/e2ad6424cacc5d5289baa79d2882b5b4.jpg' width=20 > 联系咨询 ");
                  cont_index=0;

                 }
                 else{
                    $(".contact-us").animate({"right":0});
                    $(".contact_show").css({'height':'85px',
                                         'line-height':'30px',
                                         'font-size':'22px'})
                   $(".contact_show").html("收起");
                    cont_index=1;
                  }

             })//右侧栏
        },
        menulistFix: function(){

            var menu = $('.part2');
            var mh = menu.offset();
            var mt = mh.top-200;
            var mkt = $('.neirong').offset().top;
            var bottom_t = $('#carousel-bottom').offset().top-550;
            var menu_lists = $('.menu_lists ul li');
            var menu_list_span = menu_lists.find('.menu_span');
            var advantage_items = $('.advantage_wrap').find('.advantage_items');
            var index;
            var main_height = $('.advantage_wrap').height();
            $('.menu-blank-wrap').height(main_height);

            function beSelect(x){
                menu_list_span.removeClass('be_select').addClass('not_select');
                menu_list_span.eq(x).removeClass('not_select').addClass('be_select');
                menu_lists.removeClass('bcolor').addClass('ncolor');
                menu_lists.eq(x).removeClass('ncolor').addClass('bcolor');
            }

            menu_lists.on('click',function(){
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
                    var advantage_items = $('.advantage_wrap').find('.advantage_items');

                    for( var i = 0 ; i < $('.menu_lists .menu_span').length ; i++ ){

                        if ( wh>advantage_items.eq(i).offset().top-400) {

                            beSelect(i);

                        }else{
                            console.log(advantage_items.eq(i).offset().top);
                        }

                    }
                }else {
                    menu.removeClass('menu_wrap_fixed').removeClass('menu_wrap_abst');
                }

            });
        },
        gotoTop: function () {

            var that = this;
            var windowHeight = window.screen.height ;
            var scrolltop = $(window).scrollTop();

            // 刷新初次判断
            if( windowHeight <= scrolltop ){

                $('.gotop').fadeIn();

            }else{

                $('.gotop').fadeOut()

            }

            $(window).scroll(function () {

                var scrollTop = $(window).scrollTop();

                if( windowHeight <= scrollTop ){

                    $('.gotop').fadeIn();

                }else{

                    $('.gotop').hide()

                }

            });

            // 滚动到顶部
            $(".gotop").click(function(e){
                e.preventDefault();
                if( that.isClick == true ){
                    return false;
                }

                that.isClick = true;

                if( $('.j-iframe-show').length ){
                    return false;
                }else{
                    $.when($("body").animate({scrollTop:0},1000)).done(that.isClick = false);
                }

            });
        },
        addEvent: function () {
            var that=this;
            // nav li:hover
            var header = $('.header ul li');
            var navDetail = $('.header ul li .nav-detail');
            header.hover(function () {
                $(this).find('.nav-detail').show()
            }, function () {
                $(this).find('.nav-detail').hide()
            });
            navDetail.hover(function () {
                $(this).siblings('a').addClass('nav-active')
            }, function () {
                $(this).siblings('a').removeClass('nav-active')
            });
            $(document).on('click','.tijiao_duo',function(e){
                e.preventDefault()
                var mobile=$(this).siblings("input[name='mobile']").val();
                var username=$(this).siblings("input[name='username']").val();
                var qq_data=$(this).siblings("input[name='qq']").val();
                var email=$(this).siblings("input[name='eamil']").val();
                var data = {
                    'mobile':mobile,
                    'username':username,
                    'qq':qq_data,
                    'email':email
                }
                   if(mobile==''||username==""||qq_data=="")
                   {
                     alert("必填项不能为空")
                   }
                   else{
                    that.submitData(data)
                     }
                    
            })
        },
        submitData: function (data) {
            var that = this;
            $.ajax({
                url:'http://115.29.191.163/customer/add_customer',
                type:'get',
                dataType:'jsonp',
                data:data,
                success:function(data){
                    if(data.code==10000){
                        $(".success_tips").fadeIn();
                        setTimeout(function(){
                        $(".success_tips").fadeOut();
                        $(".applicate").animate({"height":"0px"});

                    },2000);
                   
                    }
                    else{
                        alert(data.msg)
                    }
                }
            })
        },
        changeNavStyle: function(){

            // nav position
            $(window).scroll(function(){
                var header = $('.header');
                var _offsetTop = $('.header').offset().top;
                var banner = $('.banner');
                var sy_banner = $('.sy_banner');
                var wh = $(window).scrollTop();
                var width = ($(window).width() - header.width()) / 2 + 'px';
                var logo = $('.logo');

                if( wh > 32 ){
                    header.addClass('header-fixed');
                    //sy_banner.css({
                    //    'margin-top':'90px'
                    //   //' position':'fixed',
                    //   // 'top': '90px',
                    //   // 'left': '0'
                    //});


                    logo.css({
                        'height':'60px',
                        'line-height':'60px'
                    })
                }else if ( wh <32) {
                    header.removeClass('header-fixed');
                    //sy_banner.css({
                    //    'margin-top':'90px'
                    //});
                    logo.css({
                        'height':'60px',
                        'line-height':'60px'
                    })
                }
            });
        },
        getQuery:function(key){
            var t = {};
            location.search.replace("?","").replace(/&?([^=&]+)=([^=&]*)/g, function($0, $1,$2){ t[$1] = $2; });
            return typeof t[key] === "undefined" ? "" : t[key];
        }
    };
    // run
    $(function(){
        main.init()
    })
}(jQuery , window , document ));
