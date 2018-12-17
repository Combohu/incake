require(["config"], function(){
	require(["jquery", "tools", "header", "footer","template"], function($,tools,header,footer,template){

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
    })
    $.ajax({
       method:"POST",
       url:"http://localhost/java_script/incake_project/server/api/php/specials.php",
       dataType:"json",
       success:function (res) {
         var html = template("list-template",{list_contents:res});
         $("#section-content").html(html);
       }
     })
     $.ajax({
        method:"POST",
        url:"http://localhost/java_script/incake_project/server/api/php/specials2.php",
        dataType:"json",
        success:function (res) {
          var html = template("list2-template",{list2_contents:res});
          $("#section-content2").html(html);
        }
      })
      $.ajax({
         method:"POST",
         url:"http://localhost/java_script/incake_project/server/api/php/specials3.php",
         dataType:"json",
         success:function (res) {
           var html = template("list3-template",{list3_contents:res});
           $("#section-content3").html(html);
         }
       })
  })
})
