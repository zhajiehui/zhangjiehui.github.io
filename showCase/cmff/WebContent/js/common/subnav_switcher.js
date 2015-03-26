// JavaScript Document
/*---------------------二级导航切换页面功能---------------------*/
$(".app").on("click",function(){
	switchApp(this);
	var name = $(this).data("name");
	var tabUrl = $(this).attr("tabUrl");
	$(".tabContent").children().hide();
	if($(".tabContent #"+name+"")[0]){
		$(".tabContent #"+name+"").show();
		adaptiveHeight(name);
	}else{
		var iframe = document.createElement("iframe");
		iframe.src = tabUrl;
		iframe.id = name;
		iframe.name = name;
		iframe.width = "100%";
		iframe.height = "100%";
		iframe.setAttribute('frameborder', '0');
		iframe.onload = function(){
			adaptiveHeight(name);
		};
		$(".tabContent").append(iframe);
	}
});
function adaptiveHeight(id){
	 var iframeHeight = $("#"+id+"").contents().find("html").height();
	 $(".tabContent").height(iframeHeight+50);
};
/*左导航app切换*/
function switchApp(thisObj){
	$(".app").removeClass("active");
	$(thisObj).addClass("active");
}
$(".cmf_username").on("click",function(){
	if($(this).parent().hasClass("show")){
		$(this).parent().removeClass("show");
	}else{
		$(this).parent().addClass("show");
	}
});
$(".dropdown-menu").on("mouseleave",function(){
	$(this).parent().removeClass("show");
});
$(".my-task").on("click",function(){
	var name = $(this).data("name");
	var tabUrl = $(this).attr("tabUrl");
	$(".tabContent").children().hide();
	if($(".tabContent #"+name+"")[0]){
		$(".tabContent #"+name+"").show();
	}else{
		var html='<iframe src="'+tabUrl+'" id="'+name+'" name="'+name+'" frameborder="0" width="100%" height="100%" ></iframe>';
		$(".tabContent").append(html);
	}
	adaptiveHeight(name);
});

