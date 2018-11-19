require(["config"], function(){
	require(["jquery", "tools", "header", "footer","slider","template"], function($,tools,header,footer,slider,template){

		//promise
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
      $("footer").load("/html/component/footer.html");
		}).then(function(){
			header.nav();
      header.localCity();
      header.login();
      header.exit();
		}).then(function(){
			$("#slider-wrapper").slider({
        goPrev:"goPrev",
        goNext:"goNext"
      });
		})

    $.ajax({
      method:"POST",
      url:"http://localhost/java_script/incake_project/server/api/php/list.php",
      dataType:"json",
      success:function (res) {
        var html = template("list-template",{list_content:res});
        $("#list-content").html(html);
      }
    })
	})
})
