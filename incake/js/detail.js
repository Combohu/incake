require(["config"], function(){
	require(["jquery", "tools", "header", "footer","template","fly"], function($,tools,header,footer,template){

		//promise
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
      $("footer").load("/html/component/footer.html");
		}).then(function() {
        header.nav();
        header.localCity();
        header.login();
        header.exit();
       header.num();
    });
    //发送ajax请求
      var str = location.search.slice(1);
      var arr = str.split("=");
      var obj = {};
        obj[arr[0]] = arr[1];
        $.ajax({
          method:"POST",
          data:obj,
          dataType:"json",
          url:"http://localhost/java_script/incake_project/server/api/php/detail.php",
          success:function(res){
            if (res.code === 1) {
                var str = template("detail_template",{product:res.product});
                $("#baoguo").html(str);
                //放大镜
                function fangDaJing(x){
                  var
                      middleBox = $("#preview_big"),
                      bigBox = $("#fangDaJing"),
                      len = $("#len"),
                      bigImg =x;
                    middleBox.on("mouseenter",function(){
                      //console.log(113);
                    //鼠标移入盒子中
                      len.css("display","block");
                      bigBox.css("display","block");
                  });
                  middleBox.on("mousemove",function(e){
                    //获取鼠标的各种位置坐标
                    var
                        pageX = e.pageX,
                        pageY = e.pageY;
                    //获取middleBox元素的坐标位置
                    var _offset = middleBox.offset();
                    //获取该DIV盒子的宽高;
                    var
                        boxWidth =len.outerWidth(),
                        boxHeight =len.outerHeight();
                    //计算放大镜的位置坐标
                      var
                        _left = pageX -_offset.left -boxWidth/2,
                        _top = pageY -_offset.top -boxHeight/2;
                  //限制放大镜移动的范围
                    if (_top <= 0){
                      _top = 0;
                    }else if (_top > 250){
                      _top = 250;
                    }
                    if (_left <= 0){
                      _left = 0;
                    }else if (_left > 250){
                      _left = 250;
                    }
                    //设置CSS属性
                      len.css("left",_left);
                      len.css("top",_top);
                    //设置大图片的定位属性
                      bigImg.css("top",-2*_top);
                      bigImg.css("left",-2*_left);
                  });
                  middleBox.on("mouseleave",function(){
                    //鼠标移出盒子中
                    len.css("display","none");
                    bigBox.css("display","none");
                  });
                }
              fangDaJing($("#bigImg1"));
                //点击小图，切换大图
                var
                  midlle1 = $("#middleImg1"),
                  midlle2 = $("#middleImg2"),
                  midlle3 = $("#middleImg3"),
                  midlle4 = $("#middleImg4"),
                  small1 = $("#preview_small1"),
                  small2 = $("#preview_small2"),
                  small3 = $("#preview_small3"),
                  small4 = $("#preview_small4");
                  small1.click(function(){
                    midlle2.hide();
                    midlle3.hide();
                    midlle4.hide();
                    midlle1.show();
                    $("#bigImg2").hide();
                    $("#bigImg3").hide();
                    $("#bigImg4").hide();
                    $("#bigImg1").show();
                      fangDaJing($("#bigImg1"));
                  })
                  small2.click(function(){
                    midlle1.hide();
                    midlle3.hide();
                    midlle4.hide();
                    midlle2.show();
                    $("#bigImg1").hide();
                    $("#bigImg3").hide();
                    $("#bigImg4").hide();
                    $("#bigImg2").show();
                    fangDaJing($("#bigImg2"));
                  })
                  small3.click(function(){
                    midlle1.hide();
                    midlle2.hide();
                    midlle4.hide();
                    midlle3.show();
                    $("#bigImg1").hide();
                    $("#bigImg2").hide();
                    $("#bigImg4").hide();
                    $("#bigImg3").show();
                    fangDaJing($("#bigImg3"));
                  })
                  small4.click(function(){
                    midlle1.hide();
                    midlle2.hide();
                    midlle3.hide();
                    midlle4.show();
                    $("#bigImg1").hide();
                    $("#bigImg2").hide();
                    $("#bigImg3").hide();
                    $("#bigImg4").show();
                    fangDaJing($("#bigImg4"));
                  })
                  //表单中的商品数量
                  if ($.cookie("cart") && $.cookie("cart").length !== 2){
                  var cart = $.cookie("cart");
                  var str = JSON.parse(cart);
                  var input = $("#text_amout");
                  var btr = location.search.slice(1);
                  var arr = btr.split("=");
                  var obj = {};
                    obj[arr[0]] = arr[1];
                 for (var i = 0; i < str.length; i++) {
                      if (str[i].id === obj.id) {
                          input.val(str[i].num);
                          break;
                        }
                      }
                      //console.log(i);
                    if(i == str.length){
                        input.val(1);
                      }
                    }else{
                      var input = $("#text_amout");
                      input.val(1);
                    }
                  //增加按钮
                  var
                      input = $("#text_amout"),
                      inputValue = input.val(),
                      btn_add = $("#btn_add");
                    btn_add.click(function(){
                      var currValue = input.val(++inputValue);
                      //str[0].num =currValue;
                  })
                  //减少按钮
                  var
                      input = $("#text_amout"),
                      inputValue = input.val(),
                      btn_sub = $("#btn_sub");
                    btn_sub.click(function(){
                      if (inputValue>1){
                        input.val(--inputValue);
                      }else{
                          input.val(1);
                      }
                  })
                //添加购物车按钮绑定事件
                var add_basket = $("#add_basket");
                add_basket.click(function(e){
                  //添加购物车，抛物线
                  var
                        end =$("#bag").offset(),
                        start ={
                          top:e.pageY- $(window).scrollTop(),
                          left:e.pageX
                        },
                        flyer = $("<div></div>").css({
              						width: 20,
              						height: 20,
              						background: "#f00"
              					});
              				end.top -= $(window).scrollTop();
              				flyer.fly({
              					start,
              					end,
              					onEnd() {
              						this.destroy();
              					}
              				});
                      $("#bg").css("display","block");
              $("#btn-cancel").click(function(){
                      $("#bg").css("display","none");
              })
                  var btr = location.search.slice(1);
                  var brr = btr.split("=");
                  var bbj = {};
                    bbj[brr[0]] = brr[1];
                var preview_big = $("#middleImg1"),
                    introduce_tittle = $("#introduce_tittle"),
                    attr = $("#left_content"),
                    spec = $("#spec"),
                    number = $("#img"),
                    newPrice = $("#newPrice");
                    //检测是否已经有名字叫cart的cookie,如果有则先取出来暂存，再添加新的进去，一并放进去；
                    var arr=[];
                    if(tools.cookie("cart") && tools.cookie("cart").length !== 2 ){
                       arr=JSON.parse(tools.cookie("cart"));
                       //console.log(arr);
                     //遍历之前的cookie,找到相同项;
                      for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id == brr[1]) {
                          arr[i].num++;
                          break;
                        }
                      }
                      if (i === arr.length) {
                        var obj  = {
                              id:brr[1],
                              pictrue:preview_big.attr("src"),
                              name:introduce_tittle.html(),
                              shuXing:attr.html(),
                              guiGe:spec.html(),
                              price:newPrice.html(),
                              num:1
                        }
                          arr.push(obj);
                      }
                    }else{
                        var obj  = {
                              id:brr[1],
                              pictrue:preview_big.attr("src"),
                              name:introduce_tittle.html(),
                              shuXing:attr.html(),
                              guiGe:spec.html(),
                              price:newPrice.html(),
                              num:1
                        }
                        //console.log(obj);
                          arr.push(obj);
                    }
                  var str = JSON.stringify(arr);
                  tools.cookie("cart",str,"path=/");
                 header.num();
                })
            }
          }
        })

  })
})
