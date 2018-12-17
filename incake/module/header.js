define(["tools","jquery","cookie"],function (tools,$,cookie) {
  function Header(){}
    Header.prototype.nav = function () {
      var subMenu = tools.$(".subMenu");
      for (var i = 0; i < subMenu.length; i++) {
        subMenu[i].onmousemove = function () {
          tools.$("ul",this)[0].style.display = "block";
        }
        subMenu[i].onmouseleave = function () {
          tools.$("ul",this)[0].style.display = "none";
        }
      }
      $("#btn-zs").click(function(){
        $(this).attr("href","http://localhost:1807/html/list.html?id=1");
      })
      $("#btn-qkl").click(function(){
        $(this).attr("href","http://localhost:1807/html/list.html?id=2");
      })
      $("#btn-npl").click(function(){
        $(this).attr("href","http://localhost:1807/html/list.html?id=3");
      })
      $("#btn-ms").click(function(){
        $(this).attr("href","http://localhost:1807/html/list.html?id=4");
      })
      $("#btn-rz").click(function(){
        $(this).attr("href","http://localhost:1807/html/list.html?id=5");
      })
      $("#btn-xp").click(function(){
        $(this).attr("href","http://localhost:1807/html/list.html?id=6");
      })
    }
    Header.prototype.localCity = function(){
      var localCity = tools.$(".localCity")[0];
      var localCity_select = tools.$(".localCity_select")[0];
      localCity.onmousemove = function(){
        localCity_select.style.display = "block";
      }
      localCity.onmouseleave = function(){
        localCity_select.style.display = "none";
      }
    }
    Header.prototype.login = function(){
      var username_cookie = tools.cookie("username");
      if (username_cookie) {
        var protal = tools.$("#protal");
        var login_active = tools.$("#login_active");
        protal.style.display = "none";
        login_active.innerHTML = "欢迎您登陆！"+username_cookie;
        login_active.style.display ="block";
      }
    }
    Header.prototype.exit = function(){
      var exit = $("#exit");
      exit.click(function(){
        $.cookie("username",123,{
          expires:-1,
          path:"/"
        })
      })
    }
    Header.prototype.num = function(){
     var numValue =$("#ShopcartNum");
      var amout = 0;
       if ($.cookie("cart") && $.cookie("cart").length !==2){//[].length ==2
          var cookie =JSON.parse($.cookie("cart"));
         for (var i = 0; i < cookie.length; i++){
            amout += cookie[i].num;
          }
          var num_cookie = amout;
            numValue.text(num_cookie);
      }else{
        numValue.text(0);
      }
    }
  return new Header();
})
