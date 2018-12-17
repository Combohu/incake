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
        header.num()
    })
//封装函数
    function xuanXiangka(element,url){
      $(element).click(function(){
        $("#all").attr("class","");
        $("#zs").attr("class","");
        $("#qkl").attr("class","");
        $("#npl").attr("class","");
        $("#ms").attr("class","");
        $("#rz").attr("class","");
        $("#xp").attr("class","");
        $("#kw-npl").attr("class","");
        $("#kw-sg").attr("class","");
        $("#kw-zs").attr("class","");
        $("#kw-qkl").attr("class","");
        $("#kw-ms").attr("class","");
        $("#kw-kf").attr("class","");
        $("#kw-xn").attr("class","");
        $("#kw-wt").attr("class","");
      $(this).attr("class","active");
        $.ajax({
          method:"POST",
          url:url,
          dataType:"json",
          success:function (res) {
            var html = template("list-template",{list_contents:res});
            $("#cakeList").html(html);
          }
        })
      })
    }
//页面显示，先显示一次全部；
var str = location.search.slice(1);
var arr = str.split("=");
var obj = {};
  obj[arr[0]] = arr[1];
  if (obj.id) {
    var sel = ".num"+obj.id+"";
    $("#all").attr("class","");
    $(sel).attr("class","active");
    $.ajax({
      method:"POST",
      url:"http://localhost/java_script/incake_project/server/api/php/list"+obj.id+".php",
      dataType:"json",
      success:function (res) {
        var html = template("list-template",{list_contents:res});
        $("#cakeList").html(html);
      }
    })
  }else{
    //假数据
/*    $.ajax({
      method:"GET",
      url:"http://rap2api.taobao.org/app/mock/120882/api/list",
      dataType:"json",
      success:function (res) {
        console.log(res);
        var html = template("list-template",{list_contents:res.res_body.list});
        console.log(html);
        $("#cakeList").html(html);
      }
    })*/
    //数据库
   $.ajax({
      method:"POST",
      url:"http://localhost/java_script/incake_project/server/api/php/list.php",
      dataType:"json",
      success:function (res) {
        var html = template("list-template",{list_contents:res});
        $("#cakeList").html(html);
      }
    })
  }
//调用函数，选项卡效果
    xuanXiangka("#all","http://localhost/java_script/incake_project/server/api/php/list.php");
    xuanXiangka("#zs","http://localhost/java_script/incake_project/server/api/php/list1.php");
    xuanXiangka("#qkl","http://localhost/java_script/incake_project/server/api/php/list2.php");
    xuanXiangka("#npl","http://localhost/java_script/incake_project/server/api/php/list3.php");
    xuanXiangka("#ms","http://localhost/java_script/incake_project/server/api/php/list4.php");
    xuanXiangka("#rz","http://localhost/java_script/incake_project/server/api/php/list5.php");
    xuanXiangka("#xp","http://localhost/java_script/incake_project/server/api/php/list6.php");
    xuanXiangka("#kw-npl","http://localhost/java_script/incake_project/server/api/php/list7.php");
    xuanXiangka("#kw-sg","http://localhost/java_script/incake_project/server/api/php/list8.php");
    xuanXiangka("#kw-zs","http://localhost/java_script/incake_project/server/api/php/list9.php");
    xuanXiangka("#kw-qkl","http://localhost/java_script/incake_project/server/api/php/list10.php");
    xuanXiangka("#kw-ms","http://localhost/java_script/incake_project/server/api/php/list11.php");
    xuanXiangka("#kw-kf","http://localhost/java_script/incake_project/server/api/php/list12.php");
    xuanXiangka("#kw-xn","http://localhost/java_script/incake_project/server/api/php/list13.php");
    xuanXiangka("#kw-wt","http://localhost/java_script/incake_project/server/api/php/list14.php");

  })
})
