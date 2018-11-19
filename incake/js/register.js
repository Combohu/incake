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
    })
    var form =tools.$("#register-form");
    form.onsubmit = function(e){
      e = e || event;
     var username = tools.$("#phone").value;
      var password = tools.$("#password").value;
      var email = tools.$("#email").value;
      var weixin = tools.$("#weixin").value;
      var usernameReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      var pwdReg = /^.{6,}$/;


      if (!usernameReg.test(username)){
          alert("用户名格式有误！请摆正您的态度，认真填写用户名！");
      }
      if (!pwdReg.test(password)){
          alert("密码格式有误！请摆正您的态度，认真填写密码！");
      }
      if (usernameReg.test(username) && pwdReg.test(password)) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET","http://localhost/java_script/incake_project/server/api/php/register.php?username="+username+"&password="+password+"&email="+email+"&weixin="+weixin);
        ajax.send(null);
        ajax.onreadystatechange = function(){
          if (ajax.readyState === 4 && ajax.status === 200) {
            var data = JSON.parse(ajax.responseText);
            console.log(data);
            if (data.code === 1) {
              alert("注册成功！");
              document.cookie = "username="+username+";path=/";
              document.cookie = "password="+password+";path=/";
              window.location.href = "http://localhost:1807/index.html";
            }else{
              alert("注册失败,格式有误！");
            }
          }
        }
      }
      e.preventDefault();
      return false;
    }
  })
})
