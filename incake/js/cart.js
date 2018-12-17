require(["config"], function(){
	require(["jquery", "tools", "header", "footer","template","cookie"], function($,tools,header,footer,template,cookie){

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
//读取详情页传来的cookie数据，并解析后用来渲染模板字符串；
var  ul =$("#list_active"),
     money = $("#money"),
     allPrice = 0,
     bg = tools.$(".empty_basket")[0];
     if ($.cookie("cart")){
  var str =$.cookie("cart"),
      json = JSON.parse(str);
var html = template("pro_template",{cookies:json});
    $("#list_active").html(html);
    if (tools.$(".item").length) {
       bg.style.display = "none";
    }else{
      bg.style.display = "block";
    }
//遍历JSON，累加每一条商品的总价
for (var item of json) {
  allPrice += item.price * item.num;
}
money.html(allPrice);

//修改商品数量（增加或减少）；
  var btn_sub = $(".btn_sub");
  var btn_add = $(".btn_add");
//给减少按钮绑定点击事件；
$("#list_active").on("click",".btn_sub",function(event){
//读取当前cookie；
  var currCookie1 = $.cookie("cart");
//解析cookie，并存起来：
  var newJson1 = JSON.parse(currCookie1);
//通过jQuery查找DOM元素的方法找到当前的按钮和input；
  var input = $(this).siblings().children(":first"),
//该条商品的名称；
      mingZi = input.parents(".c_amount").siblings(".c_product").find(".cn"),
//该条商品的小计；
      xiaoJi = input.parents(".c_amount").siblings(".c_cheaper").find(".xiaoJi"),
//该条商品的具体数量值；
      value = input.val();
//如果数量值大于1，则点击事件触发时数量值-1；
if (value > 1){
  value--;
//遍历传来的cookie数据，找到与当前商品名相同的该条数据，并修改cookie；
        for (var i = 0; i <newJson1.length; i++) {
              if (newJson1[i].name == mingZi.html()) {
                newJson1[i].num = value;
                xiaoJi.html(newJson1[i].price * newJson1[i].num);
                input.val(newJson1[i].num);
                break;
              }
          }
//修改完成以后把修改好的数据重新传回cookie：
  var newJson2 = JSON.stringify(newJson1);
  $.cookie("cart",newJson2,{path:"/"});
//每次触发点击按键的时候，重新计算一次总计；
var aLi = $("#list_active").find(".item"),
    gouXuan = $("#list_active").find(".btn_ckBox");
        allPrice = 0;
//遍历所有的Li,如果该LI中存在勾中的复选框，则把他该条LI里面的小计累加；
     for (var i = 0; i <aLi.length; i++) {
       if (gouXuan.eq(i).prop("checked")) {
          allPrice += parseInt(gouXuan.eq(i).parents(".item").find(".xiaoJi").html());
            money.html(allPrice);
          }
       }
}
header.num();
      })
//给增加按钮绑定点击事件；
$("#list_active").on("click",".btn_add",function(event){
  var currCookie2 = $.cookie("cart");
  var newJson3 = JSON.parse(currCookie2);
   var  input = $(this).siblings().children(":first"),
        mingZi = input.parents(".c_amount").siblings(".c_product").find(".cn"),
        xiaoJi = input.parents(".c_amount").siblings(".c_cheaper").find(".xiaoJi"),
        value = input.val();
  value ++;
    for (var i = 0; i < newJson3.length; i++) {
          if (newJson3[i].name == mingZi.html()){
                 newJson3[i].num = value;
                 xiaoJi.html(newJson3[i].price * newJson3[i].num);
                 input.val(newJson3[i].num);
                break;
            }
        }
//修改完成以后把修改好的数据重新传回cookie：
var newJson4 = JSON.stringify(newJson3);
$.cookie("cart",newJson4,{path:"/"});
//每次触发点击按键的时候，重新计算一次总计；
var aLi = $("#list_active").find(".item"),
    gouXuan = $("#list_active").find(".btn_ckBox");
        allPrice = 0;
//遍历所有的Li,如果该LI中存在勾中的复选框，则把他该条LI里面的小计累加；
     for (var i = 0; i <aLi.length; i++) {
       if (gouXuan.eq(i).prop("checked")) {
          allPrice += parseInt(gouXuan.eq(i).parents(".item").find(".xiaoJi").html());
            money.html(allPrice);
          }
       }
       header.num();
      })
//当取消其中部分商品复选框时，总价也要相应的变化；
var aLi = $("#list_active").find(".item"),
    gouXuan = $("#list_active").find(".btn_ckBox");
 $("#list_active").on("change",".btn_ckBox",function(event){
      allPrice = 0;
    for (var i = 0; i < gouXuan.length; i++) {
      if (gouXuan.eq(i).prop("checked")) {
           allPrice += parseInt(gouXuan.eq(i).parents(".item").find(".xiaoJi").html());
             money.html(allPrice);
      }else{
        allPrice += 0;
        money.html(allPrice);
      }
    }
 })
//勾中全选，总价全算，取消全选，价格清零；
$(".list_footer").on("change",".text_checkALL",function(){
 if($(this).prop("checked")){
    allPrice = 0;
    for (var i = 0; i < gouXuan.length; i++) {
          allPrice += parseInt(gouXuan.eq(i).parents(".item").find(".xiaoJi").html());
          money.html(allPrice);
        }
 }else{
   allPrice = 0;
   money.html(allPrice);
 }
 })
//绑定删除按键点击事件，删除该条json数据；
$("#list_active").on("click",".btn_del",function(event){
   var quanXuan = $(".text_checkALL");
   var data= $.cookie("cart");
   var arr = JSON.parse(data);
   var li = $(this).parents(".item");
   var tittle = li.find(".cn").html();
//遍历cookie，判断cookie，并找到与之匹配的当条数据并删掉；
for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == tittle) {
        arr.splice(i,1);
        break;
    }
}
//把剩余的JSON数据再转化为字符串存进cookie;
   var brr = JSON.stringify(arr);
   $.cookie("cart",brr,{
                path:"/",
                expires:3
           })
//最后在DOM结构中删除掉；
       li.remove();
           header.num();
           if ($("#item").length<=0){
             quanXuan.prop("checked",false);
            $("#money").text(0);
           }
})

//全选、复选功能
var quanXuan = $(".text_checkALL");
var danXuan =$("#list_active").find(".btn_ckBox");
var n = danXuan.length;
//给全选框绑定监听事件；
quanXuan.change(function(){
//如果全选按钮是默认选中的，则上面的按钮全部设置为选中；否则全部设为不选中。
    if (quanXuan.prop("checked")) {
      danXuan.prop("checked",true);
    }else{
      n= 0;
      danXuan.prop("checked",false);
    }
})
//给所有的单选框绑定监听事件；
for (var i = 0; i < danXuan.length; i++) {
danXuan.eq(i).change(function(){
    if (quanXuan.prop("checked",true)){
        if ($(this).prop("checked")) {
            n++;
      }else{
            n--;
      }
        if (n === danXuan.length) {
            quanXuan.prop("checked",true);
      }else{
            quanXuan.prop("checked",false);
            }
      }
})
}
}else{
  return;
}
  })
})
