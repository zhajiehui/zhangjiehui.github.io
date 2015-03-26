// JavaScript Document
/**
 * 初始化下拉框数据Array数组方式
 * 如：var selArray=["湖南","湖北","其他"];
 *    var selValueArray=["01","02","03"];
 * 带默认值: defaultValue
 */
function initSelectOnArray(ids,selArray,selValueArray,defaultValue){
	var selector=document.getElementById(ids);
	selector.innerHTML = "";
	/**==============空选项================**/
	var nullOptionValue = -1;
	var nullOptionText = "--请选择--";
	selector.options.add(new Option(nullOptionText,nullOptionValue));
	
	if(selArray!=null&&selArray.length>0){
	    for(var i = 0 ; i<selArray.length; i++){
	    	selector.options.add(new Option(selArray[i],selValueArray[i]));
	    }
	}

 	var index=-1;
 	var defaultSel="--请选择--";
 	
 	if(selArray!=null&&selValueArray.length>0){
	    for(var i = 0 ; i<selArray.length; i++){
	        if(selValueArray[i]==defaultValue){
     		    index=i+1;
     		    defaultSel=selArray[i];
     		    break;
 		   }
	    }
	}
 	selector.selectedIndex=index;
 	$(selector).parent().find(".selectspan").html(defaultSel);
}

function initSelectOnJson(ids,selectlist,defaultValue){
	var selector=document.getElementById(ids);
	selector.innerHTML = "";
	
	/**==============空选项================**/
	var nullOptionValue = -1;
	var nullOptionText = "--请选择--";
	selector.options.add(new Option(nullOptionText,nullOptionValue));
	
	if(selectlist!=null&&selectlist.length>0){
    	for(var i = 0 ; i<selectlist.length; i++){
     		selector.options.add(new Option(selectlist[i].text,selectlist[i].value));
     	}
	}
 	var index=-1;
 	var defaultSel="--请选择--";
 	if(selectlist!=null&&selectlist.length>0){
 	    for(var i = 0 ; i<selectlist.length; i++){
     		if(selectlist[i].value==defaultValue){
     		    index=i+1;
     		    defaultSel=selectlist[i].text;
     		    break;
     		}
 	    }
 	}
 	selector.selectedIndex=index;
 	$(selector).parent().find(".selectspan").html(defaultSel);
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

$(document).ready(function(){
	$(".inputselect").on('change',function(){
		changeWordLength(this,$(this).parent().find(".selectspan"));
		$(this).focus();
		$(this).blur();
	});
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
	$('.radio-box').on('click', function () {
		$('.radio-box').removeClass("radiochecked");
		$('.radio-box').find(':radio').attr('checked',false);
		$(this).addClass("radiochecked");
		$(this).find(':radio').attr('checked',true);
	});

	
	/*$('.radioInput').each(function() {
		thisID		= jQuery(this).attr('id');
		if(thisID==null||thisID==''){
			thisID = getNewId();
			jQuery(this).attr('id',thisID);
		}
		thisName = jQuery(this).attr('name');
		thisClass	= jQuery(this).attr('class');

		switch(thisClass) {
			case "firerift-style-radio-r": setClass = "firerift-style-r";
			break;
		}
		jQuery(this).removeClass('firerift-style-radio-r').addClass("simple-radio");		
		jQuery(this).addClass('hidden');
				
		if(jQuery(this)[0].checked == true)
			jQuery(this).after('<div class="'+ setClass +' on" dfname="'+thisName+'" rel="'+ thisID +'">&nbsp;</div>');
		else
			jQuery(this).after('<div class="'+ setClass +' off" dfname="'+thisName+'" rel="'+ thisID +'">&nbsp;</div>');
	});	
	========= 单选框 =========== 
	jQuery('.firerift-style-r').live('click', function() {
		checkboxID		= '#' + jQuery(this).attr('rel');
		thisName = jQuery(this).attr('dfname');
		if(jQuery(checkboxID)[0].checked == false) {
			//jQuery(checkboxID)[0].checked = true;
			jQuery(jQuery(checkboxID)[0]).attr("checked","true");
			jQuery('.firerift-style-r[dfname="'+thisName+'"]').removeClass('on').addClass('off');
			jQuery(this).removeClass('off').addClass('on');
			var radios = document.getElementsByName(jQuery(checkboxID)[0].name);
			for(var i=0; i<radios.length; i++){
				if(jQuery(radios[i]).attr("dfValidate") != undefined){
					 beginValidate_df = true;
					check_df(radios[i]);
					beginValidate_df = false;
				}
			}
			
			
		//	jQuery(checkboxID)[0].blur()=function(){hideValidateInfo_df(jQuery(checkboxID)[0])};
		//	alert(document.getElementById(jQuery(this).attr('rel'));
		}
	});*/
}); 
//更改字符显示长度
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
