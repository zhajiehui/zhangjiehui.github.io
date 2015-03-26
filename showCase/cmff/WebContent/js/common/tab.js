var new_tab_count=0;
var title=1;

$(".mail").on("click",function(){
	AddTab(""+title+"", title);
	title++;
});
$(".more_tab").on("click",function(){
	if($(this).hasClass("show")){
		$(this).removeClass("show");
	}else{
		$(this).addClass("show");
	}
});
// 添加tab
function AddTab(title, content) {
	var needAdd = true;
	var selectedTab = $("#myTab div[class='tabTitle']>ul>li[id='tabSelect']");
	var tab = $("#main-content .tabContent").children();
	$("#myTab>div>ul>li").each(function(){
		//如果要新增的页面在已有页签中已打开,则切换至该页签
		if ($(this).text() == title) {
			var index = $("#myTab>div>ul>li").index(this);
			selectedTab.removeAttr("id");
			$(this).attr("id", "tabSelect");
			tab.hide();// 全部隐藏
			tab.eq(index).show();// 显示当前
			needAdd = false;
		}
	});
	if(needAdd){
		// 添加标题
		selectedTab.removeAttr("id");
		var id = Math.random();
		var html = '<li id="tabSelect" data-tabId="'+id+'">'+title+'<a class="tab_close"></a></li>';
		$("#myTab div[class='tabTitle']>ul").prepend(html);
		
		//判断页签是否满载，若满载则通过"more"来选择页签
		if($("#myTab div[class='tabTitle']>ul").children().length > 4){
			var lastLi = $("#myTab div[class='tabTitle']>ul>li:last-child");
			$("#myTab .more_tab .dropdown-list").prepend(lastLi[0].outerHTML);
			lastLi.remove();
		}
		
		// 添加内容
		var ContentHtml = '<div class="tab_content" data-contentId="'+id+'" style="display:none">';
		/*if(content.substr(0,3)=="url"){
			ContentHtml += "<iframe src='"+content.substr(4)+ "' frameborder='0' width='100%' height='100%' ></iframe></div>";
			$("#myTab").append(ContentHtml);
		}else{*/
			ContentHtml += content+ "</div>";
			$("#main-content").find(".tabContent").prepend(ContentHtml);		
	/*	}*/
		tab.hide();// 全部隐藏
		$("#main-content div[class='tab_content']").eq(0).show();// 显示当前
		
		/*****绑定事件*****/
		bindFunc();
	}
}

function switchTab(thisObj){
	var pId=$(thisObj).parent().parent().parent().attr('id');
	var index = $("#"+pId+">div>ul>li").index(thisObj);
	var tab = $("#main-content .tabContent").children();
	for(var i=0; i<$("#"+pId+">div>ul>li").length; i++){
		var liId=$("#"+pId).find("li")[i].id;
		if(liId){
			$("#"+pId+">div[class='tabTitle']>ul>li[id='"+liId+"']").removeAttr("id");
			break;
		}
	}
	$(thisObj).attr("id", "tabSelect");
	if(index >= 4){
		var lastLi = $("#myTab div[class='tabTitle']>ul>li:last-child");
		$("#myTab .more_tab .dropdown-list").prepend(lastLi[0].outerHTML);
		lastLi.remove();
		$("#"+pId+" .tabTitle>ul").prepend($(thisObj)[0].outerHTML);
		$(thisObj).remove();
	}
	
	//显示选中页
	tab.hide();
	for(var i = 0;i < tab.length;i++){
		if($(tab[i]).attr("data-contentId") == $(thisObj).attr("data-tabId")){
			$(tab[i]).show();
			break;
		}
	}
	bindFunc();
}

function closeTab(thisObj){
	var tab = $(thisObj).parents(".myTab");
	var pId = tab.attr("id");
	var objTitle = $("#"+pId+">div>ul>li");
	var li = $(thisObj).parent();
	var index = objTitle.index(li);
	var tab = $("#main-content .tabContent").children();
	if (li.attr("id")=="tabSelect"){
		//若关闭的页签是当前显示的页签
	    li.removeAttr("id");
		if(li.prev()[0]){
			//若该标签左侧有标签
			li.prev().attr("id","tabSelect");
			for(var i = 0;i < tab.length;i++){
				if($(tab[i]).attr("data-contentId") == $(li).prev().attr("data-tabId")){
					$(tab[i]).show();
					break;
				}
			}
		}else{
			li.next().attr("id","tabSelect");
			for(var i = 0;i < tab.length;i++){
				if($(tab[i]).attr("data-contentId") == $(li).next().attr("data-tabId")){
					$(tab[i]).show();
					break;
				}
			}
		}
	}
	//若关闭的页签不是当前显示的页签
	for(var i = 0;i < tab.length;i++){
		if($(tab[i]).attr("data-contentId") == $(li).attr("data-tabId")){
			$(tab[i]).remove();
			break;
		}
	}
	li.remove();
	if($("#"+pId+" .tabTitle>ul>li").length < 4){
		if($("#"+pId+" .more_tab .dropdown-list").children()[0]){
			var li = $("#"+pId+" .more_tab .dropdown-list").children()[0];
			$("#"+pId+" .tabTitle>ul").append(li.outerHTML);
			li.remove();
		}
	}
}
function bindFunc(){
	// tab切换
	$(".myTab ul>li").unbind("click").on("click",function() {
		switchTab(this);
	});
	// 关闭(删除)tab
	$(".myTab ul>li>a").unbind("click").bind("click",function() {
		closeTab(this);
	});
}