"use strict";require(["config"],function(){require(["jquery","tools","header","footer"],function(o,a,e,t){new Promise(function(e,t){o("header").load("/html/component/header.html",function(){e()}),o("footer").load("/html/component/footer.html")}).then(function(){e.nav(),e.localCity(),e.login(),e.exit()});var n=a.$("#login-form");a.$("#protal");n.onsubmit=function(e){e=e||event;var t=a.$("#phone").value,o=a.$("#password").value,n=a.$("#remember").checked,r=new XMLHttpRequest;return r.open("GET","http://localhost/java_script/incake_project/server/api/php/login.php?username="+t+"&password="+o),r.send(null),r.onreadystatechange=function(){if(4===r.readyState&&200===r.status)if(1===JSON.parse(r.responseText).code){if(alert("登录成功！"),n){var e=new Date;e.setDate(e.getDate()+3),document.cookie="username="+t+";expires="+e.toUTCString()+";path=/",document.cookie="password="+o+";expires="+e.toUTCString()+";path=/"}else document.cookie="username="+t+";path=/",document.cookie="password="+o+";path=/";window.location.href="http://localhost:1807/index.html"}else alert("登录失败,用户名或密码有误！")},e.preventDefault(),!1}})});