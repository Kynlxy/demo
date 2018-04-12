/*
 global dragMove: false, dragEnd: $, jQuery, window, document
 */

(function($ , window , document){
    var main = {
        init: function(){
            this.imgOwl();
            this.addEvent();
           // this.showQQ();
           
             
        },
        imgOwl: function(){
            

            //幻灯片播放配置
            var bt_owl = $('.banner_big');
            // var xmgf_owl = $('#xmgf_owl');

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


        $('.marquee').kxbdMarquee();
        },
        //10s后弹出qq对话框
        //showQQ: function(){
        //    var timer = null;
        //    timer = setTimeout(function(){
        //        window.open('http://wpa.qq.com/msgrd?v=3&uin=2853828375&site=www.mockuai.com&menu=yes');
        //        //window.onload('tencent://message/?Menu=yes&uin=2853828375&Service=58&SigT=A7F6FEA02730C988F570C9EEF8E38FDE1067F3E47C29732A174879AC61FD7471EC7AB4BB4E263AE78A71622CC5F225AA1FABAEEEA65A917584F9C2D1145F0A3B30458979E1B0EE6D6F9FF7B176E2D1AAFD64BC557CEDD778AE166556809F7E1C602AA54EB4ADCC30565F103BCBFF969D10ED2F7FA17D3FE4&SigU=30E5D5233A443AB208C09D930452FC1E7F39591D1A9277584D35B422D9A87F7278AF8C93CEED191F34A4C74C2C3B3557C95670A39FD2736C11A4FB5197A7057F0384FA71A37789C3');
        //
        //    },10000);
        //},
        addEvent: function(){
            // var wall = $('.wall ul li');
            var that = this;            //    $(".contact-us").animate({"right":0});


            // wall.click(function(){
            //     var name = $(this).attr('data-name');
            //     wall.removeClass('active');
            //     $(this).addClass('active');
            //     $('.owl-phone-pic').hide();
            //     $('.shop-info').hide();
            //     if ( name ){
            //         $('.owl-phone-pic[data-name='+name+']').show();
            //         $('.shop-info[data-name='+name+']').css({
            //             'display':'inline-block'
            //         })
            //     }
            //     var owl = that.imgOwl(name);
            //     owl.goTo(0)
            // });
            $(document).on('click','.tijiao_haoduo',function(e){
                e.preventDefault()
                var number=$(this).siblings("input[name='mobile']").val();
                var company=$(this).siblings("input[name='company']").val();
                var address=$(this).siblings("input[name='address']").val();
                var username=$(this).siblings("input[name='username']").val();
                var remark=$(this).siblings(".remark").val();
                // console.log(remark.length);
                var mobile ,
                    qq_data;
                if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(number))
                    {
                      qq_data=number;
                    }else{
                      mobile=number;
                    }
                var data = {
                    'mobile':mobile,
                    'company':username,
                    'address':address,
                    'qq':qq_data,
                    'username':username,
                    'remark':remark
                }
                   if(number=='')
                   {
                     alert("必填项不能为空")
                   }
                   else{
                        if(remark.length>=30){
                            alert("备注太长，建议小于30字符")
                        }else
                        {
                            that.submitData(data)
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
        
       
    };
    // run
    $(function(){
        main.init()
    })
}(jQuery , window , document ));
