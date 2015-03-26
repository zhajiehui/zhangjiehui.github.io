function switchTag(thisObj){
	var pId=$(thisObj).parent().parent().parent().attr('id');
	var index = $("#"+pId+">div>ul>li").index(thisObj);
	var tag = $(".tag_content");
	for(var i=0; i<$("#"+pId+">div>ul>li").length; i++){
		var liId=$("#"+pId).find("li")[i].id;
		if(liId){
			$("#"+pId+" .tagTitle>ul>li[id='"+liId+"']").removeAttr("id");
			break;
		}
	}
	$(thisObj).attr("id", "tagSelect");
	//显示选中页
	tag.hide();
	for(var i = 0;i < tag.length;i++){
		if($(tag[i]).attr("data-contentId") == $(thisObj).attr("data-tabId")){
			$(tag[i]).show();
			break;
		}
	}
}
$(".tagGroup>ul>li").on("hover",function(){
	$(this).addClass("hover");
}).on("mouseleave",function(){
	$(this).removeClass("hover");
});
// tab切换
$(".tagGroup ul>li").on("click",function() {
	switchTag(this);
});
