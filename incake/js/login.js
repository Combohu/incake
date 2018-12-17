require(["config"], function(){
	require(["jquery", "tools", "header", "footer"], function($,tools,header,footer){

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
    });
//用户名是否输入正确
  $("#phone").on("blur",function(){
    var phone = $("#phone").val();
      $.ajax({
        type:"POST",
        url:"http://localhost/java_script/incake_project/server/api/php/check.php",
        data:{username:phone},
        dataType:"json",
        success:function(responseText) {
          var res = responseText;
          if (res.res_body.status === 1) {
            $("#info").text("用户名不存在！");
          }else{
              $("#info").text("用户名正确！");
          }
        }
      });
  })
//请求验证码
  function genCode() {
    $.ajax({
      type: "get",
      url: "http://route.showapi.com/26-4?showapi_appid=78429&showapi_sign=638b3c6f052f49d382f8d2635943a54a",
      dataType: "json",
      success: function(data) {
        $("#gen-code").attr("src",data.showapi_res_body.img_path);
        $("#code").attr("text",data.showapi_res_body.text);
      }
    });
  }

  genCode();
  $("#code").on("blur",function(){
        var text = $("#code").attr("text");
        var _code = $("#code").val();
        if(text===_code) {
          $("#info").text("验证码正确");
        } else {
          $("#info").text("验证码输入有误，请重新输入");
        }
  });
    var form =$("#login-form"),
        protal =$("#protal");
  form.submit(function(e){
          e = e || event;
          var username =$("#phone").val(),
              password =$("#password").val(),
              text = $("#code").attr("text"),
               _code = $("#code").val(),
              status =$("#remember").prop("checked");
              console.log(status);
        if (text === _code) {
          $.ajax({
            type:"GET",
            url:"http://localhost/java_script/incake_project/server/api/php/login.php",
            data:{
              username:username,
              password:password
            },
            dataType:"json",
            success:function(res){
              if ( res.res_body.status === 1) {
                $("#info").text(res.res_body.message);
                if (status){
                  var date = new Date();
                  date.setDate(date.getDate()+3);
                  $.cookie("username",username,{expires:date,path:"/"});
                  $.cookie("password",password,{expires:date,path:"/"});
                }else{
                  $.cookie("username",username,{path:"/"});
                  $.cookie("password",password,{path:"/"});
                }
                window.location.href = "http://localhost:1807/index.html";
              }else{
                $("#info").text(res.res_body.message);
              }
            }
          });
        }else{
            $("#info").text( "验证码输入有误，无法登陆！");
          }
          e.preventDefault();
          return false;
        })
  })
})
