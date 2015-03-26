var new_tab_count=0;
$(function() {
	// 关闭(删除)tab
	
	$(".tabTitle>ul>li>a").on("click",function() {
			var pId=$(this).parent().parent().parent().parent().attr('id');
			var objTitle = $("#"+pId+">div>ul>li");
			if (objTitle.length == 2 
					&&  $("#"+pId+">div>ul>li:last-child").html().toLowerCase()
					.indexOf("label>") < 0){
				return;
			}
			if (objTitle.length == 1) {
				return;
			}
			var li = $(this).parent();
			var index = objTitle.index(li);
			if (li.attr("id")=="tabSelect"){
			    li.removeAttr("id");
				if(li.prev()[0]){
					li.prev().attr("id","tabSelect");
					$("#"+pId+" div[class='tab_content']").eq(index-1).show();
				}else{
					li.next().attr("id","tabSelect");
					$("#"+pId+" div[class='tab_content']").eq(index+1).show();
				}
				li.remove();
				$("#"+pId+" div[class='tab_content']").eq(index).remove();
			}else{
				li.remove();
				$("#"+pId+" div[class='tab_content']").eq(index).remove();
			}
		});
	// tab切换、新建
	$(".tabTitle>ul>li").live("click",function() {
			var pId=$(this).parent().parent().parent().attr('id');
			var index = $("#"+pId+">div>ul>li").index(this);
			if ((index + 1) == $("#"+pId+">div>ul>li").length
					&& $(this).text().replace(" ", "") == "*") {
				new_tab_count++;
				AddTab("新增" + new_tab_count, "content" + new_tab_count, pId);
			}
			for(var i=0; i<$("#"+pId+">div>ul>li").length; i++){
				var liId=$("#"+pId).find("li")[i].id;
				if(liId){
					break;
				}
			}
			if ($("#"+pId+">div[class='tabTitle']>ul>li[id='tabSelect']").children().length > 0) {
				$("#"+pId+">div[class='tabTitle']>ul>li[id='tabSelect']").children()[0].className = "tab_close";
			}
			$("#"+pId+">div[class='tabTitle']>ul>li[id='"+liId+"']").removeAttr("id");
			$(this).attr("id", "tabSelect");
			if ($(this).children().length > 0) {
				$(this).children()[0].className = "tab_close1";
			}
			$("#"+pId+" div[class='tab_content']").hide();
			
			$("#"+pId+" div[class='tab_content']").eq(index).show();// 显示当前
		});
	// tab滚动
	$(".ScrollBtn").click(function() {
		var pId=$(this).parent().attr('id');
		// 左
		if ($(this).index() == 0){
			var currentPosition = $("#"+pId+">div[class='tabTitle']>ul").scrollLeft();
			$("#"+pId+">div[class='tabTitle']>ul").get(0).scrollLeft = currentPosition - 50;
		}else{
			var currentPosition = $("#"+pId+">div[class='tabTitle']>ul").scrollLeft();
			var maxLeft = $("#"+pId+">div[class='tabTitle']>ul>li:last-child").offset().left;
			if (maxLeft > $("#"+pId+">div[class='tabTitle']>ul>li:last-child").width() + 20){
				$("#"+pId+" div[class='tabTitle']").get(0).scrollLeft = currentPosition + 50;
			}
		}
	});
});
// 添加tab
function AddTab(title, content, pID, isClose) {
	var needAdd = true;
	$("#"+pID+">div>ul>li").each(
			function() {
				if ($(this).text() == title) {
					var index = $("#"+pID+">div>ul>li").index(this);
					if ($("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").children().length > 0) {
						$("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").children()[0].className = "tab_close";
					}
					$("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").removeAttr("id");
					$(this).attr("id", "tabSelect");
					if ($(this).children().length > 0) {
						$(this).children()[0].className = "tab_close1";
					}
					$("#"+pID+">div[class='tab_content']").hide();// 全部隐藏
					$("#"+pID+">div[class='tab_content']").eq(index).show();// 显示当前
					needAdd = false;
				}
			});
	if(needAdd){
		// 添加标题
		var tabTitleHtml = "";
		// 是否带有关闭按钮
		if(isClose == true){
			tabTitleHtml = "<li>" + title + "<label class='tab_close'></label></li>";
		}else{
			tabTitleHtml = "<li>" + title + "</li>";
		}
		//最多能添加100个tab
		if($("#"+pID+">div>ul>li").length > 100){
			alert("最多只能添加100个tab");
			return;
		}
		//添加新的tab

		if($("#"+pID+">div>ul>li:last-child").text().replace(" ", "") == "*"){
			$("#"+pID+">div>ul>li:last-child").html(tabTitleHtml.replace("<li>", "").replace("</li>", ""));
			$("#"+pID+">div>ul").append("<li>*</li>");
		} else {
			$("#"+pID+">div>ul").append(tabTitleHtml);
		}
		// 添加内容
		var ContentHtml = "<div class='tab_content' style='display:none'>";
		if(content.substr(0,3)=="url"){
			ContentHtml += "<iframe src='"+content.substr(4)+ "' frameborder='0' width='100%' height='100%' ></iframe></div>";
			$("#"+pID).append(ContentHtml);
		}else{
			ContentHtml += content+ "</div>";
			$("#"+pID).find(".tabContent").append(ContentHtml);		
		}
		// 判断滚动条的出现
		showScrollbar(pID);
	}
}
function showScrollbar(pID){
	var liOffset = $("#"+pID+">div>ul>li:last-child").offset().left;
	var liWidth = $("#"+pID+">div>ul>li:last-child")[0].clientWidth;
	var result = liOffset + liWidth;
	if (result > $(".tabTitle").width()){
		if ($(".ScrollBtn").css("display") == "block") return;
		$(".ScrollBtn").css("display", "block");
	}
}
function ReSet() {
	var pID = $(".tabTitle>ul>li").parent().parent().parent().attr('id')
	var width=document.body.clientWidth;
	var lastLeft=$("#"+pID+">div>ul>li:last-child").offset().left;
	if (lastLeft > $(".tabTitle").width() || lastLeft >= width){
			if ($(".ScrollBtn").css("display") == "block") return;
			$(".ScrollBtn").css("display", "block");
		}else{
			if ($(".ScrollBtn").css("display") == "block") {
				$(".ScrollBtn").css("display", "none");
				$("#"+pID+">div[class='tabTitle']")[0].scrollLeft = 0;
				showScrollbar(pID);
			}
		}
}