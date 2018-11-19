require(["config"], function(){
	require(["jquery", "tools", "header", "footer","template"], function($,tools,header,footer,template){

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
    });
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
                var add_basket = $("#add_basket");
                add_basket.click(function(){
                  var btr = location.search.slice(1);
                  var brr = btr.split("=");
                  var bbj = {};
                    bbj[brr[0]] = brr[1];
                var preview_big = $("#preview_big"),
                    introduce_tittle = $("#introduce_tittle"),
                    attr = $("#left_content"),
                    spec = $("#spec"),
                    number = $("#img"),
                    newPrice = $("#newPrice");
                    //检测是否已经有名字叫cart的cookie,如果有则先取出来暂存，再添加新的进去，一并放进去；
                    var arr=[];
                    if(tools.cookie("cart")){
                       arr=JSON.parse(tools.cookie("cart"));
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
                        };
                          arr.push(obj);
                          console.log(arr);
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
                        };
                          arr.push(obj);
                    }
                  var str = JSON.stringify(arr);
                  tools.cookie("cart",str,"path=/");
                })
            }
          }
        })

  })
})
