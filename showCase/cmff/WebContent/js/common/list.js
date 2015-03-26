// JavaScript Document
/**
 * 初始化下拉框数据Array数组方式
 * 如：var selArray=["湖南","湖北","其他"];
 *    var selValueArray=["01","02","03"];
 * 带默认值: defaultValue
 */
function listCreation(rows,colsname){
	var uWidth = 100/(colsname.length-0+1);
	var html = "";
	html = '<table class="table" width="100%" align="center">';
	for(var i = 0;i < rows;i++){
		html += '<tr>';
		if(i == 0){
			for(var j = 0;j <= colsname.length + 1;j++){
				if(j == 0){
					html += '<th class="checkbox-th">选择</th>';
				}else if(j == colsname.length + 1){
					html += '<th class="handle">操作</th>';
				}else{
					html += '<th>'+colsname[j-1]+'</th>';
				}
			}
		}else{
			for(var j = 0;j <= colsname.length + 1;j++){
				if(j == 0){
					html += '<td class="checkbox-th"><div class="check-box"><i><input name="check-box" type="checkbox"/></i></div></td>';
				}else if(j == colsname.length + 1){
					html += '<td><a class="modify">修改</a><a class="delete">删除</a></td>'
				}else{
					html += '<td></td>';
				}
			}
		}
		html += '</tr>';
	}
	html+= '</table>';
	$(".list").html(html);
	$('.check-box').on('click', function () {
		var isChecked = $(this).find(':checkbox').attr("checked");
		if(isChecked == "undefined" || isChecked == null || isChecked == false){
			$(this).find(':checkbox').attr('checked',true);
			$(this).addClass("checkedBox");
		}else if(isChecked == true || isChecked == "checked"){
			$(this).find(':checkbox').attr('checked',false);
			$(this).removeClass("checkedBox");
		}
	});
	
}



function dfReady(){
	/*初始化下拉框*/
	$(".inputselect").each(function(i,val){
		var selector=this;
		var selectspan = $(selector).parent().find(".selectspan");		
		var defaultValue = $(this).attr("selectValue");
	
		if(typeof(defaultValue) != "undefined"&&defaultValue!=''){
			var selectValue = Number(defaultValue);
			for(var i=0;i<$(this).children().length;i++){
				if(selectValue == $(this).children()[i].value){
					selectspan.text($(this).children()[i].innerHTML);
					selector.selectedIndex=i;
				}
			}
		}
	
		if(selectspan.text()=='--请选择--'||defaultValue==''){
			var index=-1;
			var defaultSel="--请选择--";
			selector.selectedIndex=index;
			$(selector).parent().find(".selectspan").html(defaultSel); 
		}
	
		//modified by wangsy 2013-6-28 update for 下拉显示文字过长时自动截取
		if(selectspan[0]){
			spanWidth = selectspan.parent().css("width").replace("px","")-25;
			fontSize = selectspan.css("font-size").replace("px","")-0+1;
			fontNum = Math.floor(spanWidth/fontSize);
			
			var str = $.trim(selectspan.html());
			var strLength = 0;
			var strInput = 0;
			for(var i = 0;i < str.length;i++){
				if(str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126){ 
				   strLength += 2;
			   	}else{
				   strLength++;
			   	}
				if(strLength / 2 < fontNum){
					strInput++;
				}
			}

			if(strLength / 2 > fontNum){
				$(this).attr("title",selectspan.html());
				selectspan.html(selectspan.html().substr(0,strInput - 2)+"...");
			}else{
				$(this).attr("title","");
			}
		}
	});
}

function changeWordLength(thisObj,selectspan){
	if(selectspan[0]){
		var selectspan = $(thisObj).parent().find(".selectspan");
		var selectchildren = $(thisObj).children();
		for(var i=0; i<selectchildren.length ; i++){
			if(selectchildren[i].selected){
				//modified by wangsy 2013-7-15 update for 过渡换行符
				selectspan.text($.trim(selectchildren[i].innerHTML));
				//modified by wangsy 2013-6-17 update for 下拉查询刷新
				$(thisObj).attr("selectValue",$(thisObj).val());
				break;
			}
		}
		//modified by wangsy 2013-6-28 update for 下拉显示文字过长时自动截取
		spanWidth = selectspan.parent().css("width").replace("px","")-25;
		fontSize = selectspan.css("font-size").replace("px","")-0+1;
		fontNum = Math.floor(spanWidth/fontSize);//全角的字符数
		
		var str = $.trim(selectspan.html());
		var strLength = 0;
		var strInput = 0;
		for(var i = 0;i < str.length;i++){
			if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) { 
				strLength += 2;
			}else{
				strLength++;
			}
			if(strLength / 2 < fontNum){
				strInput++;
			}
		}
	
		if(strLength / 2 > fontNum){
			$(this).attr("title",selectspan.html());
				selectspan.html(selectspan.html().substr(0,strInput-2)+"...");
		}else{
				$(this).attr("title","");
		}
	}
}
