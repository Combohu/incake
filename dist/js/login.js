"use strict";require(["config"],function(){require(["jquery","tools","header","footer"],function(r,e,t,o){new Promise(function(e,t){r("header").load("/html/component/header.html",function(){e()}),r("footer").load("/html/component/footer.html")}).then(function(){t.nav(),t.localCity(),t.login(),t.exit(),t.num()}),r("#phone").on("blur",function(){var e=r("#phone").val();r.ajax({type:"POST",url:"http://localhost/java_script/incake_project/server/api/php/check.php",data:{username:e},dataType:"json",success:function(e){1===e.res_body.status?r("#info").text("用户名不存在！"):r("#info").text("用户名正确！")}})}),r.ajax({type:"get",url:"http://route.showapi.com/26-4?showapi_appid=78429&showapi_sign=638b3c6f052f49d382f8d2635943a54a",dataType:"json",success:function(e){r("#gen-code").attr("src",e.showapi_res_body.img_path),r("#code").attr("text",e.showapi_res_body.text)}}),r("#code").on("blur",function(){r("#code").attr("text")===r("#code").val()?r("#info").text("验证码正确"):r("#info").text("验证码输入有误，请重新输入")});var a=r("#login-form");r("#protal");a.submit(function(e){e=e||event;var o=r("#phone").val(),a=r("#password").val(),t=r("#code").attr("text"),n=r("#code").val(),s=r("#remember").prop("checked");return console.log(s),t===n?r.ajax({type:"GET",url:"http://localhost/java_script/incake_project/server/api/php/login.php",data:{username:o,password:a},dataType:"json",success:function(e){if(1===e.res_body.status){if(r("#info").text(e.res_body.message),s){var t=new Date;t.setDate(t.getDate()+3),r.cookie("username",o,{expires:t,path:"/"}),r.cookie("password",a,{expires:t,path:"/"})}else r.cookie("username",o,{path:"/"}),r.cookie("password",a,{path:"/"});window.location.href="http://localhost:1807/index.html"}else r("#info").text(e.res_body.message)}}):r("#info").text("验证码输入有误，无法登陆！"),e.preventDefault(),!1})})});