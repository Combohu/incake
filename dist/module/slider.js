"use strict";define(["jquery"],function(u){u.fn.extend({slider:function(n){var i=u("#"+n.goPrev),e=u("#"+n.goNext),t=this.find("ul"),s=this.find("ul li"),l=this.find("ol"),c=0,a=s.length,o=!1,f=null,d=s.eq(0).width();s.each(function(){u("<li>").addClass(0==u(this).index()?"ac":"").appendTo(l)}),s.eq(0).clone(!0).appendTo(t),t.css("width",d*(a+1)),l.on("click","li",function(){o||(o=!0,u(this).addClass("ac").siblings().removeClass("ac"),c=u(this).index(),t.animate({left:-c*d-350},"slow",function(){o=!1}))}),i.click(function(){o||(o=!0,--c<0&&(t.css("left",-a*d),c=a-1),t.animate({left:-c*d-350},"slow",function(){o=!1}),l.children().eq(c).addClass("ac").siblings().removeClass("ac"))}),e.click(function(){o||(o=!0,++c>=a?(t.animate({left:-a*d-350},"slow",function(){t.css("left",-350),o=!1}),c=0):t.animate({left:-c*d-350},"slow",function(){o=!1}),l.children().eq(c).addClass("ac").siblings().removeClass("ac"))}),this.hover(function(){clearInterval(f)},function n(){return f=setInterval(function(){u("#goNext").trigger("click")},2e3),n}())}})});