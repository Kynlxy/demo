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
                this.contact = $(this).siblings('input[name=contact]').val();
                //var mobile=$(this).siblings("input[name='mobile']").val();
                var username=$(this).siblings("input[name='username']").val();
                //var qq_data=$(this).siblings("input[name='qq']").val();
                var email=$(this).siblings("input[name='eamil']").val();
                var mobile_reg = /^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$/;
                var qq_reg = /^\d{5,12}$/;
                //因为qq和手机号两者合为一个input,name为mobile,所以必填项改为两项
                   //if(mobile==''||username==""||qq_data=="")
                if(this.contact == "") {
                     alert("必填项不能为空")
                   }
                   else{
                    if(mobile_reg.test(this.contact)){
                        var mobile = this.contact;
                        var data = {
                            'mobile':mobile,
                            'username':username,
                            'qq':qq_data,
                            'email':email
                        }
                        that.submitData(data);
                    }else if(qq_reg.test(this.contact)){
                        var qq_data = this.contact;
                        var data = {
                            'mobile':mobile,
                            'username':username,
                            'qq':qq_data,
                            'email':email
                        }
                        that.submitData(data);
                    } else {
                        //alert('请输入正确的手机号码或者QQ号!');
                        $(".error_tips").fadeIn();
                        setTimeout(function(){
                            $(".error_tips").fadeOut();
                        },2000);
                    }
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
                var wh = $(window).scrollTop();
                var width = ($(window).width() - header.width()) / 2 + 'px';
                var logo = $('.logo');

                if( wh > 55 ){
                    header.addClass('header-fixed');
                    banner.css({
                        'margin-top':'95px'
                    });
                    logo.css({
                        'height':'60px',
                        'line-height':'60px'
                    })
                }else{
                    header.removeClass('header-fixed');
                    banner.css({
                        'margin-top':'0'
                    });
                    logo.css({
                        'height':'100px',
                        'line-height':'100px'
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
