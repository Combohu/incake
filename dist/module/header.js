"use strict";define(["tools","jquery","cookie"],function(t,o,e){function n(){}return n.prototype.nav=function(){for(var o=t.$(".subMenu"),e=0;e<o.length;e++)o[e].onmousemove=function(){t.$("ul",this)[0].style.display="block"},o[e].onmouseleave=function(){t.$("ul",this)[0].style.display="none"}},n.prototype.localCity=function(){var o=t.$(".localCity")[0],e=t.$(".localCity_select")[0];o.onmousemove=function(){e.style.display="block"},o.onmouseleave=function(){e.style.display="none"}},n.prototype.login=function(){var o=t.cookie("username");if(o){var e=t.$("#protal"),n=t.$("#login_active");e.style.display="none",n.innerHTML="欢迎您登陆！"+o,n.style.display="block"}},n.prototype.exit=function(){o("#exit").click(function(){o.cookie("username",123,{expires:-1,path:"/"})})},new n});