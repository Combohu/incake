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
    })
  })
})
