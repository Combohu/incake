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
        header.num();
    })
    //验证用户名是否重复注册
   $("#phone").on("blur",function(){
    var username =$("#phone").val();
    var usernameReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (usernameReg.test(username)){
      $.ajax({
        type:"POST",
        url:"http://localhost/java_script/incake_project/server/api/php/check.php",
        data:{username:username},
        dataType:"json",
        success:function(data) {
        if (data.res_body.status === 0){
          $("#info").text("抱歉!用户名重复，请重新注册！").fadeIn().fadeOut();
        }else{
            $("#info").text("恭喜您！该用户名未被使用！").fadeIn().fadeOut();
        }
      }
  });
  }else{
    $("#info").text("用户名格式有误！请摆正您的态度，认真填写用户名！").fadeIn().fadeOut();
  }
  })
  //验证密码是否输入正确
  $("#password").on("blur",function(){
    console.log(1245);
   var password =$("#password").val(),
        pwdReg = /^.{6,}$/;
   if (!pwdReg.test(password)){
      $("#info2").text("密码格式有误！请摆正您的态度，认真填写密码，位数为6位！").fadeIn().fadeOut();
 }else{
   $("#info2").text("密码格式正确！").fadeIn().fadeOut();
 }
});
//语音验证码是否正确
function makeCode(){
		// 0-9的随机数
		var arr = [];//容器
		for(var i =0;i<6;i++){//循环六次
			var num = Math.random()*9;//Math.random();每次生成(0-1)之间的数;
			num = parseInt(num,10);
			arr.push(num);
		}
    var code = Number(arr.join(""));
    return code;
};
$("#btn-code").click(function(){
  var valicode = makeCode();
  var to = $("#phone").val();
  $.ajax({
    type:"get",
    url:"https://way.jd.com/chonry/voice?appkey=66a161b67022ed41077b09f11d50c107",
    data:{
      voiceCode:valicode,
      mobile:to
    },
    dataType:"json",
    success:function(data){
      $("#btn-code").text(data.msg);
      if ($("#yuYin-code").val() == valicode){
        $("#info").text("语音验证码正确").fadeIn().fadeOut();
      }
    }
  })
})
 //表单提交
  var form =$("#register-form"),
      usernameReg = /^[1][3,4,5,7,8][0-9]{9}$/,
      pwdReg = /^.{6,}$/;
      form.submit(function(e){
        e= e || event;
        e.preventDefault();
          var
                email = $("#email").val(),
                username =$("#phone").val(),
                password =$("#password").val(),
                weixin =$("#weixin").val();
                console.log(username);
            if (usernameReg.test(username) && pwdReg.test(password)){
              console.log(123);
              $.ajax({
                type:"GET",
                url:"http://localhost/java_script/incake_project/server/api/php/register.php",
                data:{
                  username:username,
                  password:password,
                  email:email,
                  weixin:weixin
                },
                dataType:"json",
                success:function(data){
                  if (data.status === 1) {
                    alert(data.message);
                    $.cookie("username",username,{path:"/"});
                    $.cookie("password",password,{path:"/"});
                    window.location.href = "http://localhost:1807/index.html";
                  }else{
                    alert(data.message);
                }
              }
            })
        }
    })
  })
})
