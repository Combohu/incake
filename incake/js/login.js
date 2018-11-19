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
    });
    var form =tools.$("#login-form");
    var protal = tools.$("#protal");
    form.onsubmit = function(e){
      e = e || event;
      var username = tools.$("#phone").value;
      var password = tools.$("#password").value;
      var status = tools.$("#remember").checked;
      //console.log(status);

      var ajax = new XMLHttpRequest();
      ajax.open("GET","http://localhost/java_script/incake_project/server/api/php/login.php?username="+username+"&password="+password);
      ajax.send(null);
      ajax.onreadystatechange = function(){
        if (ajax.readyState === 4 && ajax.status === 200) {
          var data = JSON.parse(ajax.responseText);
          //console.log(data);
          if (data.code === 1) {
            alert("登录成功！");
            if (status) {
              var date = new Date();
              date.setDate(date.getDate()+3);
              document.cookie = "username="+username+";expires="+date.toUTCString()+";path=/";
              document.cookie = "password="+password+";expires="+date.toUTCString()+";path=/";
            }else{
              document.cookie = "username="+username+";path=/";
              document.cookie = "password="+password+";path=/";
            }
              window.location.href = "http://localhost:1807/index.html";
          }else{
            alert("登录失败,用户名或密码有误！");
          }
        }
      }
      e.preventDefault();
      return false;
    }
  })
})
