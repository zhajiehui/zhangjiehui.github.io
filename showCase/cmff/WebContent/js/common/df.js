var browserName=navigator.appName;
var browserVersion=navigator.appVersion;
function browser(){
	alert(browserName);
}
function browserversion(){
	alert(browserVersion);
}

if(typeof(dfWinIdArray) == "undefined" || typeof(dfWinIdArrayNum) == "undefined"){
	var dfWinIdArray = new Array();
	var dfWinIdArrayNum = -1;
}

if(typeof(dfWinIdIframeArray) == "undefined" || typeof(dfWinIdIframeArrayNum) == "undefined"){
	var dfWinIdIframeArray = new Array();
	var dfWinIdIframeArrayNum = -1;
}

/* ========= 单选按钮开始 =========== */ 
var checkboxHeight = "25";
var radioHeight = "25";
var selectWidth = "190";

/* No need to change anything after this */

var Custom = {
	init: function() {
		var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
		for(var a = 0; a < inputs.length; a++) {
			if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && inputs[a].className == "styled") {
				span[a] = document.createElement("span");
				span[a].className = inputs[a].type;

				if(inputs[a].checked == true) {
					if(inputs[a].type == "checkbox") {
						position = "0 -" + (checkboxHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					} else {
						position = "0 -" + (radioHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					}
				}
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				inputs[a].onchange = Custom.clear;
				if(!inputs[a].getAttribute("disabled")) {
					span[a].onmousedown = Custom.pushed;
					span[a].onmouseup = Custom.check;
				} else {
					span[a].className = span[a].className += " disabled";
				}
			}
		}
		inputs = document.getElementsByTagName("select");
		for(a = 0; a < inputs.length; a++) {
			if(inputs[a].className == "styled") {
				option = inputs[a].getElementsByTagName("option");
				active = option[0].childNodes[0].nodeValue;
				textnode = document.createTextNode(active);
				for(b = 0; b < option.length; b++) {
					if(option[b].selected == true) {
						textnode = document.createTextNode(option[b].childNodes[0].nodeValue);
					}
				}
				span[a] = document.createElement("span");
				span[a].className = "select";
				span[a].id = "select" + inputs[a].name;
				span[a].appendChild(textnode);
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				if(!inputs[a].getAttribute("disabled")) {
					inputs[a].onchange = Custom.choose;
				} else {
					inputs[a].previousSibling.className = inputs[a].previousSibling.className += " disabled";
				}
			}
		}
		document.onmouseup = Custom.clear;
	},
	pushed: function() {
		element = this.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 -" + checkboxHeight*3 + "px";
		} else if(element.checked == true && element.type == "radio") {
			this.style.backgroundPosition = "0 -" + radioHeight*3 + "px";
		} else if(element.checked != true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 -" + checkboxHeight + "px";
		} else {
			this.style.backgroundPosition = "0 -" + radioHeight + "px";
		}
	},
	check: function() {
		element = this.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 0";
			element.checked = false;
		} else {
			if(element.type == "checkbox") {
				this.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
			} else {
				this.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
				group = this.nextSibling.name;
				inputs = document.getElementsByTagName("input");
				for(a = 0; a < inputs.length; a++) {
					if(inputs[a].name == group && inputs[a] != this.nextSibling) {
						inputs[a].previousSibling.style.backgroundPosition = "0 0";
					}
				}
			}
			element.checked = true;
		}
	},
	clear: function() {
		inputs = document.getElementsByTagName("input");
		for(var b = 0; b < inputs.length; b++) {
			if(inputs[b].type == "checkbox" && inputs[b].checked == true && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
			} else if(inputs[b].type == "checkbox" && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 0";
			} else if(inputs[b].type == "radio" && inputs[b].checked == true && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
			} else if(inputs[b].type == "radio" && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 0";
			}
		}
	},
	choose: function() {
		option = this.getElementsByTagName("option");
		for(d = 0; d < option.length; d++) {
			if(option[d].selected == true) {
				document.getElementById("select" + this.name).childNodes[0].nodeValue = option[d].childNodes[0].nodeValue;
			}
		}
	}
}
window.onload = Custom.init;
window.onresize = dfWindowResize;
/* ========= 单选按钮结束 =========== */ 

/*modified by wangsy 2013-5-14 add for 页面加载完成后须执行的方法 begin*/
jQuery(document).ready(function(){
	dfReady();
	dfWindowResize();
});

function dfReady(){
	/*单选框*/
	jQuery('.firerift-style-radio-r').each(function() {
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
	
	/*复选框（开关式）*/
	jQuery('.firerift-style-checkbox').each(function() {
		thisID		= jQuery(this).attr('id');
		if(thisID==null||thisID==''){
				thisID = getNewId();
				jQuery(this).attr('id',thisID);
		}
		thisClass	= jQuery(this).attr('class');

		switch(thisClass) {
			case "firerift-style-checkbox": setClass = "firerift-style";
			break;
		}
		jQuery(this).removeClass('firerift-style-checkbox').addClass("simple-checkbox");		
		jQuery(this).addClass('hidden');
				
		if(jQuery(this)[0].checked == true)
			jQuery(this).after('<div class="'+ setClass +' on" rel="'+ thisID +'">&nbsp;</div>');
		else
			jQuery(this).after('<div class="'+ setClass +' off" rel="'+ thisID +'">&nbsp;</div>');
	});

	/*复选框（圆型）*/
	jQuery('.firerift-style-checkbox-o').each(function() {
			
			thisID		= jQuery(this).attr('id');
			if(thisID==null||thisID==''){
				thisID = getNewId();
				jQuery(this).attr('id',thisID);
			}
			thisClass	= jQuery(this).attr('class');

			switch(thisClass) {

				case "firerift-style-checkbox-o":
					setClass = "firerift-style-o";
				break;
			}
			jQuery(this).removeClass('firerift-style-checkbox-o').addClass("simple-checkbox");
			jQuery(this).addClass('hidden');
			if(jQuery(this)[0].checked == true)
				jQuery(this).after('<div class="'+ setClass +' on" rel="'+ thisID +'">&nbsp;</div>');
			else
				jQuery(this).after('<div class="'+ setClass +' off" rel="'+ thisID +'">&nbsp;</div>');
		});

	/*复选框（方型）*/
	jQuery('.firerift-style-checkbox-f').each(function() {
			
			thisID		= jQuery(this).attr('id');
			if(thisID==null||thisID==''){
				thisID = getNewId();
				jQuery(this).attr('id',thisID);
			}
			thisClass	= jQuery(this).attr('class');

			switch(thisClass) {

				case "firerift-style-checkbox-f":
					setClass = "firerift-style-f";
				break;
			}
			jQuery(this).removeClass('firerift-style-checkbox-f').addClass("simple-checkbox");
			jQuery(this).addClass('hidden');
			
			if(jQuery(this)[0].checked == true)
				jQuery(this).after('<div class="'+ setClass +' on" rel="'+ thisID +'">&nbsp;</div>');
			else
				jQuery(this).after('<div class="'+ setClass +' off" rel="'+ thisID +'">&nbsp;</div>');
		});
	/*表格外边框颜色加深*/
	/*jQuery('.dftable').each(function(){
		var trs = jQuery(this).children().children("tr");//tr
		var td1 = jQuery(trs[0]).children("td");//td
		for(var i = 0 ; i < td1.length; i++){
			jQuery(td1[i]).css("border-top-color","#bbb");
		}
		var tdn = jQuery(trs[trs.length-1]).children("td");
		for(var i = 0 ; i < tdn.length; i++){
			jQuery(tdn[i]).css("border-bottom-color","#bbb");
		}
		for(var i = 0 ; i < trs.length; i++){
			jQuery(jQuery(trs[i]).children("td")[0]).css("border-left-color","#bbb");
		}
		for(var i = 0 ; i < trs.length; i++){
			tdx = jQuery(trs[i]).children("td").length;
			jQuery(jQuery(trs[i]).children("td")[tdx-1]).css("border-right-color","#bbb");
		}
	});*/

	/*列表隔行变色*/
	jQuery(".table tr:even").css("background","#ffffff");
	jQuery(".table tr:odd").css("background","#f8f8f8");

	jQuery(".dfmetatable tr:odd").css("background","#ffffff");
	jQuery(".dfmetatable tr:even").css("background","#f8f8f8");
	
	/*初始化下拉框*/
    jQuery(".inputselect").each(function(i,val){
        var selector=this;
		var selectspan = jQuery(this).prev();		
		var defaultValue = jQuery(this).attr("selectValue");
		
		if(typeof(defaultValue) != "undefined"&&defaultValue!=''){
			var selectValue = Number(defaultValue);
			for(var i=0;i<jQuery(this).children().length;i++){
				if(selectValue == jQuery(this).children()[i].value){
					selectspan.text(jQuery(this).children()[i].innerHTML);
					selector.selectedIndex=i;
				}
			}
		}
		
		if(selectspan.text()=='--请选择--'||defaultValue==''){
          	var index=-1;
         	var defaultSel="--请选择--";
         	selector.selectedIndex=index;
         	jQuery(selector).prev().html(defaultSel); 
		}
		
		//modified by wangsy 2013-6-28 update for 下拉显示文字过长时自动截取
		if(selectspan[0]){
			spanWidth = selectspan.parent().css("width").replace("px","")-20;
			fontSize = selectspan.css("font-size").replace("px","")-0+1;
			fontNum = Math.floor(spanWidth/fontSize);
			
			var str = jQuery.trim(selectspan.html());
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
				jQuery(this).attr("title",selectspan.html());
				selectspan.html(selectspan.html().substr(0,strInput - 1)+"...");
			}else{
				jQuery(this).attr("title","");
			}
		}
	});
	
	/*表格自动换行*/
	jQuery("[dfRowTable]").each(function(){
		QueryTrs = jQuery(this).children().children();
		colNum = Number(jQuery(this).attr("dfRowTable"));
		if(colNum != "0"){
			for(var i=0;i<QueryTrs.length;){
				var TRIsDisplay = jQuery(QueryTrs[i]).children(".dftd2").css("display");
				var colSpanCount = 0;
				//TODO 暂不支持隐藏字段
				//if(TRIsDisplay!="none"){
					colSpanCount = jQuery(QueryTrs[i]).children(".dftd2").attr("colspan")?jQuery(QueryTrs[i]).children(".dftd2").attr("colspan"):1;
					colSpanCount++;
				//}
				var j=0;
				while(colSpanCount<colNum){
					j++;
					if(QueryTrs[i+j]){
						var TDIsDisplay = jQuery(QueryTrs[i+j]).children(".dftd2").css("display");
						var colSpanNum = 0;
						//if(TDIsDisplay!="none"){
							colSpanNum = jQuery(QueryTrs[i+j]).children(".dftd2").attr("colspan")?jQuery(QueryTrs[i+j]).children(".dftd2").attr("colspan"):1;
							colSpanNum++;
						//}
						jQuery(QueryTrs[i]).append(QueryTrs[i+j].innerHTML);
						jQuery(QueryTrs[i+j]).remove();
						colSpanCount+=colSpanNum;
					}else{
						jQuery(this).attr("dfRowTable","0");
						return;
					}
				}
				i+=j+1;
			}
			
			/*for(var i=0;i<QueryTrs.length;){
				if(QueryTrs[i].innerHTML.match("<textarea") || QueryTrs[i].innerHTML.match("<TEXTAREA") || QueryTrs[i].innerHTML.match("FILE_CONTROL") || QueryTrs[i].innerHTML.match("colspan") || QueryTrs[i].innerHTML.match("COLSPAN")){
					i++;
				}else{
					isTextarea = 0;
					j=0;
					for(j=1;j<colNum+isTextarea;j++){
						if(QueryTrs[i+j]){
							if(!Boolean(QueryTrs[i+j].innerHTML.match("<textarea")) && !Boolean(QueryTrs[i+j].innerHTML.match("<TEXTAREA")) && !Boolean(QueryTrs[i+j].innerHTML.match("FILE_CONTROL"))){
								jQuery(QueryTrs[i]).append(QueryTrs[i+j].innerHTML);
								jQuery(QueryTrs[i+j]).remove();
							}else{
								isTextarea++;
							}
						}
					}
					i+=colNum+isTextarea;
				}
			}*/
		}
		jQuery(this).attr("dfRowTable","0");
	});
	
	//处理div在ie7时出现在div内部，而ie8,ie9出现在外部
	jQuery(".table").each(function(){
		var tableWidth = jQuery(this).css("width").replace("px","")-0;
		var parentWidth = jQuery(this).parent().css("width").replace("px","")-0;
		if(parentWidth<tableWidth){
			var height = jQuery(this).css("height").replace("px","")-0+18;
			jQuery(this).parent().css("height",height+"px");
		}
	});
	jQuery(".dfmetatable").each(function(){
		if(jQuery(this).attr("fixHeight") != 1){
			var tableWidth = jQuery(this).css("width").replace("px","")-0;
			var parentWidth = jQuery(this).parent().css("width").replace("px","")-0;
			if(parentWidth<tableWidth){
				var height = jQuery(this).css("height").replace("px","")-0+18;
				jQuery(this).parent().css("height",height+"px");
			}
		}
	});
	
	
	
	jQuery(".deleteInput").each(function(){
		var valueLength = jQuery(this).val().length;
		if(valueLength==0){
			jQuery(this).next().css("display","none");
		}
	});
	
}
//出现和隐藏文本框的清除图标
jQuery(".deleteInput").live("change",function(){
	if(jQuery(this).val().length>0 && jQuery(this).next().css("display") == "none"){
		jQuery(this).parent().children("i").css("display","block");
	}else if(jQuery(this).val().length == 0){
		jQuery(this).parent().children("i").css("display","none");
	}
});

//数字输入框
jQuery(".dfNumberInput").live("keydown",function(event){
	//alert(event.keyCode);//48-57数字键 8删除键 46delete键 116 F5键 37-40方向键
	if(!((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=37 && event.keyCode<=40) || event.keyCode==8 || event.keyCode==46 || event.keyCode==116 )){
		return false;
	}
});

function dfWindowResize(){
	//调整参照框内的input大小
	jQuery(".selInputdiv").each(function(){
		dfChangeSelInputWidth(this);
	});
	jQuery(".selInputdiv30").each(function(){
		dfChangeSelInputWidth(this);
	});
	jQuery(".calInputdiv").each(function(){
		dfChangeCalInputWidth(this);
	});
	jQuery(".calInputdiv30").each(function(){
		dfChangeCalInputWidth(this);
	});
	jQuery(".nameInputdiv").each(function(){
		dfChangeCalInputWidth(this);
	});
	jQuery(".nameInputdiv30").each(function(){
		dfChangeCalInputWidth(this);
	});
	jQuery(".deleteInputdiv").each(function(){
		dfChangeCalInputWidth(this);
	});
	jQuery(".deleteInputdiv30").each(function(){
		dfChangeCalInputWidth(this);
	});
	jQuery(".dfLenovoInputdiv").each(function(){
		dfChangeCalInputWidth(this);
	});
	jQuery(".dfLenovoInputdiv30").each(function(){
		dfChangeCalInputWidth(this);
	});
}
/*modified by wangsy 2013-5-14 add for 页面加载完成后须执行的方法 end*/

/*modified by wangsy 2013-7-30 add for 调整参照框内的input大小 begin*/
function dfChangeSelInputWidth(thisObj){
	var divWidth = jQuery(thisObj).css("width").replace("px","");
	var inputObj = jQuery(thisObj).children("input");
	inputObj.css("width",divWidth-55);
}
function dfChangeCalInputWidth(thisObj){
	var divWidth = jQuery(thisObj).css("width").replace("px","");
	var inputObj = jQuery(thisObj).children("input");
	inputObj.css("width",divWidth-35);
}

/*modified by wangsy 2013-5-15 add for 数据加载完成后须执行的方法 begin*/
function dfPageBarConfig(pageCount){
	/* 根据消息数量配置分页条 */
	mesNum = jQuery("#dfListConfig").attr("mesNum") ||
				(jQuery("#dfMesNum").html().index("W")>-1 ?
					Number(jQuery("#dfMesNum").html())*10000 :
			  		jQuery("#dfMesNum").html());
	pageMesNum = jQuery("#dfPageConfig").attr("pageMesNum") || jQuery("#pageSizeInput").val();
	var dfPageNum = parseInt(mesNum/pageMesNum)+(mesNum%pageMesNum>0 ? 1 : 0);
	if(dfPageNum==0){
		//modified by wangsy 2013-07-27 update for 查询结果为空时，正确设置分页条
		jQuery("#dfMesNum").html(0);
		jQuery("#pageCount").html(0);
		jQuery("#dfPageNum").html(0);
		jQuery("#dfFirstPage").attr('class','disabled');
		jQuery("#dfPrevPage").attr('class','disabled');
		jQuery("#dfFirstPage").attr('href','###');
		jQuery("#dfPrevPage").attr('href','###');
		jQuery("#dfLastPage").attr('class','disabled');
		jQuery("#dfNextPage").attr('class','disabled');
		jQuery("#dfLastPage").attr('href','###');
		jQuery("#dfNextPage").attr('href','###');
	}else{
		if(mesNum >= 10000){
			jQuery("#dfMesNum").attr("title",mesNum);
			mesNum = parseInt(mesNum / 10000) + "W";	
		}
		if(pageCount >=10000){
			jQuery("#pageCount").attr("title",pageCount);
			pageCount = parseInt(pageCount / 10000) + "W";
		}
		if(pageCount >=10000){
			jQuery("#dfPageNum").attr("title",dfPageNum);
			dfPageNum = parseInt(dfPageNum / 10000) + "W";
		}
		
		jQuery("#dfMesNum").html(mesNum);
		jQuery("#pageCount").html(pageCount);
		jQuery("#dfPageNum").html(dfPageNum);
		if(pageCount == 1){
			jQuery("#dfFirstPage").attr('class','disabled');
			jQuery("#dfPrevPage").attr('class','disabled');
			jQuery("#dfFirstPage").attr('href','###');
			jQuery("#dfPrevPage").attr('href','###');
		}else{
			jQuery("#dfFirstPage").attr('class','');
			jQuery("#dfPrevPage").attr('class','');

			jQuery("#dfFirstPage").attr('href','javascript:query(1)');
			jQuery("#dfPrevPage").attr('href','javascript:query(jQuery("#pageCount").html()-1)');
		}
		if(pageCount == dfPageNum){
			jQuery("#dfLastPage").attr('class','disabled');
			jQuery("#dfNextPage").attr('class','disabled');
			jQuery("#dfLastPage").attr('href','###');
			jQuery("#dfNextPage").attr('href','###');
		}else{
			jQuery("#dfLastPage").attr('class','');
			jQuery("#dfNextPage").attr('class','');
			jQuery("#dfLastPage").attr('href','javascript:query(jQuery("#dfPageNum").html()-0)');
			jQuery("#dfNextPage").attr('href','javascript:query(jQuery("#pageCount").html()-0+1)');
		}
	}
	
	/*自动添加行号*/
	var rowNumber = 1;
	jQuery("[tableRowNumber]").each(function(){
		if(jQuery(this).attr("tableRowNumber")!=""){
			mesNum = 0;
			if(jQuery("#dfPageConfig").attr("RowNumByPage")==1){
				mesNum = Number(pageMesNum)*(pageCount-1);
			}
			jQuery(this).html(rowNumber+mesNum);
			rowNumber++;
			jQuery(this).attr("tableRowNumber","")
		}
	});
}
/*modified by wangsy 2013-5-15 add for 数据加载完成后须执行的方法 end*/

/*====================清除文本框值==========================*/
function dfDeleteValue(thisObj){
	jQuery(thisObj).prev().val("");
	jQuery(thisObj).prev().focus();
	jQuery(thisObj).css("display","none");
}


/*=============== 控件 ================*/

/* ========= 智能联想输入框 =========== */ 
var dfLenovoInputFlag=0;//监控点击事件
//联通文本框输入时出现匹配项
jQuery(".dfLenovoInput").live("keyup",function(event){
	showLenovoResult(this,event);
});
//点击图标出现匹配项
jQuery(".dfLenovoI").live("click",function(event){
	var dfLenovoInput = jQuery(this).prev()[0] || jQuery(this).parent().prev().children("input")[0];
	dfLenovoInputFlag=1;
	showLenovoResult(dfLenovoInput,event);
});
/*jQuery(".dfLenovoDIV").live("click",function(){
	showLenovoResult(jQuery(this).parent().prev().children('.dfLenovoInput')[0]);
});*/
//点击控件内部时，不隐藏结果
jQuery(".dfLenovoInputdiv,.dfLenovoInputdiv30,.downInputTextDIV30,.downInputTextDIV26").live("mouseleave",function(){
	dfLenovoInputFlag=0;
});

//出现匹配项方法
function showLenovoResult(thisObj,event){
	//获取id
	if(!thisObj.id){
		thisObj.id = getNewId();
	}
	var lenovoId = thisObj.id + "LenovoResult";
	
	//首先清除联想结果
	var lenovoObj = document.getElementById(lenovoId);
	if(lenovoObj){
		jQuery(lenovoObj).remove();
	}
	
	var inputValue = jQuery(thisObj).val();
	var lenovoResultArr = new Array();
	//获取匹配数组
	var lenovoData = jQuery(thisObj).attr("lenovoData");
	if(lenovoData==null){
		lenovoData=",";
		return;
	}
	var lenovoDataArr = lenovoData.split(";");
	
	//过滤取为空时
	if(inputValue.length==0){
		lenovoResultArr = lenovoDataArr;
	}else{
		for(var i=0;i<lenovoDataArr.length;i++){
			if(inputValue.length != 0 && lenovoDataArr[i].match(inputValue)){
				lenovoResultArr.push(lenovoDataArr[i]);
			}
		}
	}
	
	//拼联想结果div
	var margin_top,margin_left;
	var lenovoResultArrNum = lenovoResultArr.length;
	if(lenovoResultArr.length>10){
		lenovoResultArrNum =10;
	}

	if(jQuery("body").css("height").replace("px","") - getAbsPoint(thisObj).y - 12 * lenovoResultArrNum<0){
		margin_top = -12*lenovoResultArrNum - 2 + "px";
/*   为了某个特殊结构而写的，但是不完美，对普通的dom结构造成了影响 by zhangjh
		if(!jQuery(thisObj).next()[0]){
			if(jQuery(thisObj).parent().parent().parent().parent().hasClass("downInputTextDIV30")){ 
				margin_top = -12*lenovoResultArrNum-30+"px";
			}else{
				margin_top = -12*lenovoResultArrNum-28+"px";
			}
		}
*/
	}else{
		var divHeight = parseInt(jQuery(thisObj).parent().parent().parent().parent().parent().css("height"));
		margin_top = divHeight + 2 + "px";
		if(jQuery(thisObj).next()[0]){
			margin_top = jQuery(thisObj).parent().css("height");
		}
	}
	margin_left = "0px";
	if(!jQuery(thisObj).next()[0]){
		margin_left = "-1px";
	}
	if(document.documentMode<=7){
		if(jQuery(thisObj).next()[0]){
			margin_left = -Number(jQuery(thisObj).parent().css("width").replace("px",""))-2+"px";
		}else{
			margin_left = -Number(jQuery(thisObj).parent().parent().parent().parent().parent().css("width").replace("px",""))-2+"px";
		}
		
	}
	
	
	var lenovoResultStyle = "margin-top:"+margin_top+";margin-left:"+margin_left+";width:"+jQuery(thisObj).parent().css("width")+";";
	if(!jQuery(thisObj).next()[0]){
		lenovoResultStyle = "margin-top:"+margin_top+";margin-left:"+margin_left+";width:"+jQuery(thisObj).parent().parent().parent().parent().css("width")+";";
	}
	var lenovoResult = '<div style="'+lenovoResultStyle+'" class="dflenovoResultDiv" id="'+lenovoId+'" inputId="'+thisObj.id+'">';
	if(lenovoResultArr.length == 0){
		lenovoResult += '<span style="" class="dfLenovoResultSpanStyle" >未发现匹配项</span>';
	}else{
		for(var i=0;i<lenovoResultArr.length;i++){
			lenovoResultOption = lenovoResultArr[i].split(",");
			lenovoResult += '<div style="" class="dfLenovoResultSpanStyle dfLenovoResultSpan" optionValue="'+lenovoResultOption[0]+'" >'+lenovoResultOption[1]+'</div>';
		}
	}
	lenovoResult += "</div>";
	if(jQuery(thisObj).next()[0]){
		jQuery(thisObj).parent().after(lenovoResult);
	}else{
		jQuery(thisObj).parent().parent().parent().parent().parent().after(lenovoResult);
	}
	
	
	//当为tab或enter键时，选中联通结果
	if(event && (event.keyCode==13 || event.keyCode==9)){
		autoSelectLenovoOption(thisObj);
		lenovoObj = document.getElementById(lenovoId);
		if(lenovoObj){
			jQuery(lenovoObj).remove();
		}
		return false;
	}
}
//点击其它地方时清除匹配结果
jQuery("body").live("click",function(event){
	//jQuery("#asdffdsa").val("");
	var lenovoInput = document.getElementById(jQuery(".dflenovoResultDiv").attr("inputId"));
	if(dfLenovoInputFlag){
		return;
	}
	if(lenovoInput){
		autoSelectLenovoOption(lenovoInput)
		jQuery(".dflenovoResultDiv").remove();
	}
});
//点击选中匹配项
jQuery(".dfLenovoResultSpan").live("click",function(event){
	var dfLenovoInputdiv = jQuery(document.getElementById(jQuery(this).parent().attr("inputId"))).parent();
	dfLenovoInputdiv.children(".dfLenovoHiiden").val(jQuery(this).attr("optionValue"));
	dfLenovoInputdiv.children(".dfLenovoInput").val(jQuery(this).html());
	dfLenovoInputdiv.children(".dfLenovoInput").focus();
	dfLenovoInputdiv.children(".dfLenovoInput").blur();
	jQuery(".dflenovoResultDiv").remove();
	event.cancelBubble=true;
});
//输入后，自动选中
/*jQuery(".dfLenovoInput").live("blur",function(){
	autoSelectLenovoOption(this);
});*/
function autoSelectLenovoOption(thisObj){
	var lenovoResultDiv = jQuery(document.getElementById(thisObj.id+"LenovoResult"));
	var inputValue = jQuery(thisObj).val();
	if(inputValue.length != 0 && lenovoResultDiv.attr("class") == "dflenovoResultDiv"){
		selectOption = lenovoResultDiv.children(".dfLenovoResultSpan")[0];
		if(selectOption){
			jQuery(thisObj).val(jQuery(selectOption).html());
			jQuery(thisObj).prev().val(jQuery(selectOption).attr("optionvalue"));
		}else{
			jQuery(thisObj).val("");
			jQuery(thisObj).prev().val("");
		}
	}else{
		jQuery(thisObj).val("");
		jQuery(thisObj).prev().val("");
	}
	jQuery(thisObj).focus();
	jQuery(thisObj).blur();
}
//模拟选项变色效果
jQuery(".dfLenovoResultSpan").live("mouseover",function(){
	jQuery(this).parent().children(".dfLenovoResultSpan").each(function(){
		jQuery(this).css("color","#000");
		jQuery(this).css("background-color","#fff");
	});
	jQuery(this).css("color","#fff");
	jQuery(this).css("background-color","#309bfb");
});

//屏蔽tab键
jQuery("[lenovoData]").live("keydown",function(event){
	if(event.keyCode == 9 && jQuery(".dflenovoResultDiv")[0]){
		jQuery(".dflenovoResultDiv").remove();
		return false;
	}
});

//初始化智能联想输入框
function initdfLenovo(objId,data){
	var obj = document.getElementById(objId);
	var lenovoData = "";
	if(obj){
		if(typeof(data)=="string"){
			lenovoData = data;
		}else if(typeof(data)=="object" && data instanceof Array){
			for(var i=0;i<data.length;i++){
				if(i!=0){
					lenovoData += ";";
				}
				lenovoData += data[i][0]+","+data[i][1];
				if(data[i].length>2){
					for(var j=2;j<data[i].length;j++){
						lenovoData += ","+data[i][j];
					}
				}
			}
		}else if(typeof(data)=="object"){
			var lenovoDataArr = data.lenovoData;
			for(var i=0;i<lenovoDataArr.length;i++){
				if(i!=0){
					lenovoData += ";";
				}
				lenovoData += lenovoDataArr[i].value+","+lenovoDataArr[i].text;
				if(lenovoDataArr[i].code){
					lenovoData += ","+lenovoDataArr[i].code;
				}
				if(lenovoDataArr[i].other){
					lenovoData += ","+lenovoDataArr[i].other;
				}
			}
		}
		
		jQuery(obj).attr("lenovoData",lenovoData);
	}else{
		alert(objId+"元素未找到");
	}
}
//取得HTML控件绝对位置
function getAbsPoint(e){
	var x = e.offsetLeft;
	var y = e.offsetTop;
	while(e = e.offsetParent){
	  x += e.offsetLeft;
	  y += e.offsetTop;
	}
	return {"x": x, "y": y};
};
/* ========= 下拉输入框 =========== */ 
/**
 * 下拉输入框html代码部分
 * 	<div class="sel_wrap">
		<span class="selectspan">--请选择--</span> 
		<!--设置下拉框的id  -->
		<select class="inputselect"  id="selw1">

		</select>
	</div>

初始化方式：
var ids="selw1";
var vals=[{text:"湖南",value:"01"},{text:"湖北",value:"02"},{text:"其他",value:"03"}];
var selArray=["湖南","湖北","其他"];
var selValueArray=["01","02","03"];

jQuery(document).ready(function(){
 * 初始化下拉框数据Array数组方式
 * 如：var selArray=["湖南","湖北","其他"];
 *     var selValueArray=["01","02","03"];
 *
	initSelectOnArray(ids,selArray,selValueArray);
});
或者
jQuery(document).ready(function(){
 * ids为下拉框的id
 * 初始化下拉框数据json数据方式
 * 如：var vals=[{text:"湖南",value:"01"},{text:"湖北",value:"02"},{text:"其他",value:"03"}];
 *
	initSelectOnJson(ids,vals);
});
 */

/**
 * ids为下拉框的id
 * 初始化下拉框数据json数据方式
 * 如：var vals=[{opt:"湖南",value:"01"},{opt:"湖北",value:"02"},{opt:"其他",value:"03"}];
 */
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
 	jQuery(selector).prev().html(defaultSel);
}

/**
 * 初始化下拉框数据Array数组方式
 * 如：var selArray=["湖南","湖北","其他"];
 *     var selValueArray=["01","02","03"];
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
 	jQuery(selector).prev().html(defaultSel);
 	
}

function setSelectDefaultValue(obj,value){
    	var selectchildren = jQuery(obj).children();
    	var selectspan = jQuery(this).prev();
	for(var i=0; i<selectchildren.length ; i++){
		if(selectchildren[i].value == value){
			selectspan.text(selectchildren[i].innerHTML);
			obj.selectedIndex=i;
			break;
		}
	}
}

jQuery(document).ready(function(){
	jQuery(".inputselect").live('change',function(){
		changeWordLength(this,jQuery(this).prev());
		jQuery(this).focus();
		jQuery(this).blur();
	});
});

function changeWordLength(thisObj,selectspan){
	if(selectspan[0]){
		var selectspan = jQuery(thisObj).prev();
	    var selectchildren = jQuery(thisObj).children();
	    for(var i=0; i<selectchildren.length ; i++){
	    	if(selectchildren[i].selected){
	    		//modified by wangsy 2013-7-15 update for 过渡换行符
	    		selectspan.text(jQuery.trim(selectchildren[i].innerHTML));
	            //modified by wangsy 2013-6-17 update for 下拉查询刷新
	            jQuery(thisObj).attr("selectValue",jQuery(thisObj).val());
	            break;
	            }
	    	}
	    //modified by wangsy 2013-6-28 update for 下拉显示文字过长时自动截取
	    spanWidth = selectspan.parent().css("width").replace("px","")-20;
	    fontSize = selectspan.css("font-size").replace("px","")-0+1;
	    fontNum = Math.floor(spanWidth/fontSize);//全角的字符数
	  
	    var str = jQuery.trim(selectspan.html());
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
	    	jQuery(this).attr("title",selectspan.html());
	        selectspan.html(selectspan.html().substr(0,strInput-1)+"...");
	    }else{
	        jQuery(this).attr("title","");
	    }
	}
}

/*===========================多级联动=============================*/
/**
 * 向后台URL发送请求，参数为当前下来框的id、所选的value、下一级下拉框的id
 * 返回对象为json数组，格式为[{text:"湖南",value:"01"},{text:"湖北",value:"02"},{text:"其他",value:"03"}];
 */
function SetMultiLevelSelect(url,id,nextid){
			//获取当前对象
			var selectObj = document.getElementById(id);
			
			//设置后台url
			var urls=url+"?currentSelectValue="+selectObj.value+"&nextSelectId="+nextid+"&currentSelectId="+id;
			jQuery.ajax({
				type: "post",
				url:  urls,  //下拉数据来源请求action URL 
				data:'',
				complete: function() {
				},
				success:function(json) {
					//数据请求成功后，动态创建select中得 option ，数据类型定义为{value:'sel1',text:'one'}
					//createSelectObj(json, nextid);
					var data=eval(json);
					initSelectOnJson(nextid,data);
				}
			});
}


function createSelectObj(json, toSelId) {
			var arr=eval(json);
			if (null!=arr && arr.length > 0) {
				var obj = document.getElementById(toSelId);
				obj.innerHTML = "";
				for (var o in arr) {
					var option = new Option(arr[o].name,arr[o].id);
    				$(obj)[0].options.add(option);  
				}
				obj.selectedIndex=-1;
				$(obj).prev().html("--请选择--");
			}
}
/* ============根据name触发全选事件============= */

function ChangeAllCheckBoxByName(inputName,name){
    var CkAllObj = jQuery('#'+inputName)[0];
    jQuery("div.firerift-style-f").each(function(i,val){
		var divobj=jQuery(this);
		var ckobj=divobj.prev();
		if(ckobj.attr('name')==name){
		    if(CkAllObj.checked==true){
     			divobj.attr('class','firerift-style-f off');
			    ckobj.attr('checked',false);   
		    }else{
       			divobj.attr('class','firerift-style-f on');
			    ckobj.attr('checked',true); 
		    }

		}
	});
}

//全选
function selectAllCheckbox(name){
	jQuery("div.firerift-style-f.off").each(function(i,val){
		var divobj=jQuery(this);
		var ckobj=divobj.prev();
		if(ckobj.attr('name')==name){
			divobj.attr('class','firerift-style-f on');
			ckobj.attr('checked',true);
		}
	});
}

//重选
function clearSelectedCheckbox(name){
	jQuery("div.firerift-style-f.on").each(function(i,val){
		var divobj=jQuery(this);
		var ckobj=divobj.prev();
		if(ckobj.attr('name')==name){
			divobj.attr('class','firerift-style-f off');
			ckobj.attr('checked',false);
		}
	});
}

//反选
function modifyAllCheckbox(name){
    var divckoff=jQuery("div.firerift-style-f.off");
    var divckon=jQuery("div.firerift-style-f.on");
    
    divckoff.each(function(i,val){
		var divobj=jQuery(this);
		var ckobj=divobj.prev();
		if(ckobj.attr('name')==name){
			divobj.attr('class','firerift-style-f on');
			ckobj.attr('checked',true);
		}
	});
	divckon.each(function(i,val){
		var divobj=jQuery(this);
		var ckobj=divobj.prev();
		if(ckobj.attr('name')==name){
			divobj.attr('class','firerift-style-f off');
			ckobj.attr('checked',false);
		}
	});
}



//参数为相应输入框的id
jQuery(document).ready(function(){
	/*========= 单选框 ===========*/ 
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
	});
			
	jQuery('.simple-radio').live('change', function() {
		thisID	= jQuery(this).attr('id');
		thisName = jQuery(this).attr('name');
		if(jQuery(this)[0].checked == true) {
			jQuery('.firerift-style-r[dfname='+thisName+']').removeClass('on').addClass('off');
			jQuery('[rel='+thisID+']').removeClass('off').addClass('on');
		} else {
			jQuery('.firerift-style-r[dfname='+thisName+']').removeClass('on').addClass('off');
			jQuery('[rel='+thisID+']').removeClass('on').addClass('off');			
		}	
	});

			
/*========= 复选框 ===========*/ 
jQuery('.firerift-style').live('click', function() {
	checkboxID		= '#' + jQuery(this).attr('rel');
	if(jQuery(checkboxID)[0].checked == false) {
		jQuery(checkboxID)[0].checked = true;
		jQuery(this).removeClass('off').addClass('on');
	} else {
		jQuery(checkboxID)[0].checked = false;
		jQuery(this).removeClass('on').addClass('off');
	}
});
		
/*========= 圆型复选框 ===========*/ 
	jQuery('.firerift-style-o').live('click', function() {
	
		checkboxID		= '#' + jQuery(this).attr('rel');

		if(jQuery(checkboxID)[0].checked == false) {
		
			jQuery(checkboxID)[0].checked = true;
			jQuery(this).removeClass('off').addClass('on');
			
		} else {
			
			jQuery(checkboxID)[0].checked = false;
			jQuery(this).removeClass('on').addClass('off');
			
		}
	});
	
	jQuery('.simple-checkbox').live('change', function() {
		thisID	= jQuery(this).attr('id');
		if(jQuery(this)[0].checked == true) {
			jQuery('[rel='+thisID+']').removeClass('off').addClass('on');
		} else {
			jQuery('[rel='+thisID+']').removeClass('on').addClass('off');			
		}	
	});
	
	
/*========= 方型复选框 ===========*/ 
	jQuery('.firerift-style-f').live('click', function() {
		
		checkboxID		= '#' + jQuery(this).attr('rel');

		if(jQuery(checkboxID)[0].checked == false) {
		
			jQuery(checkboxID)[0].checked = true;
			jQuery(this).removeClass('off').addClass('on');
			
		} else {
			
			jQuery(checkboxID)[0].checked = false;
			jQuery(this).removeClass('on').addClass('off');
			
		}
	});
	
/* ============点击复选框触发全选事件============= */
jQuery("div.firerift-style-f").live('click',function(){
	var ckObj=jQuery(this).prev();
	if(ckObj.attr('id')=='checkboxAll'){
		//alert(ckObj.attr('id'));
		if(ckObj[0].checked==true){
			jQuery("div.firerift-style-f.off").attr('class','firerift-style-f on');
			jQuery("input.simple-checkbox.hidden").attr('checked',true);
		}else{
			jQuery("div.firerift-style-f.on").attr('class','firerift-style-f off');
			jQuery("input.simple-checkbox.hidden").attr('checked',false);
		}
	}
});

/*========= 收放条 ===========*/ 
jQuery(".function_line_hiddenButton").live('click',function(){
	jQuery(this).removeClass('function_line_hiddenButton').addClass('function_line_showButton');
});

jQuery(".function_line_showButton").live('click',function(){
	jQuery(this).removeClass('function_line_showButton').addClass('function_line_hiddenButton');
});

/*========= 折叠菜单 ===========*/ 

jQuery("li.parentMenu").click(function(){
	if(jQuery(this).siblings(".childMenu").css("display") == "block"){
		jQuery(this).removeClass("parentMenu");
		jQuery(this).addClass("parentMenuOpen");
	}else{
		jQuery(this).removeClass("parentMenuOpen");
		jQuery(this).addClass("parentMenu");
	}
	jQuery(this).siblings(".childMenu").slideToggle(500);
});

/*========= 列表 ===========*/
jQuery(".table>tbody>tr").live('click',function(){
	jQuery(".table>tbody>tr:even").css("background","#ffffff");
	jQuery(".table>tbody>tr:odd").css("background","#f8f8f8");
	jQuery(this).css("background","#eeeeee");
});

jQuery(".dfmetatable>tbody>tr").live('click',function(){
	jQuery(".dfmetatable>tbody>tr:odd").css("background","#ffffff");
	jQuery(".dfmetatable>tbody>tr:even").css("background","#f8f8f8");
	jQuery(this).css("background","#eeeeee");
});

/*========= 进度条 ===========*/
jQuery(".inBox").each(function(){
	var allprogresspx = $(this).parent().css("width");
	var inprogresspx = $(this).css("width");
	var allprogress = allprogresspx.substring(0,allprogresspx.lastIndexOf('px'));
	var inprogress = inprogresspx.substring(0,inprogresspx.lastIndexOf('px'));
	var progressPerf = inprogress/allprogress*100;
	var progressPer= Math.round(progressPerf);
	$(this).parent().next().html(progressPer+"%");

});

});
/*========= 下载附件 ===========*/
function dfdownfile(url,SearchActionURLs,DownActionURLs){
    var oldls=document.getElementsByName("DfDownFileDailog");
    var lens=oldls.length;
    var obj;
    for(var i=0;i<lens;i++){
        obj=oldls[i];
        if( obj.parentNode!=null){
            obj.parentNode.removeChild(obj);
        }
    }
    var downdiv=document.createElement("div");
    id='downfile'+Math.floor(Math.random()*10000);
    downdiv.id=id;
    downdiv.setAttribute("name", "DfDownFileDailog");
    //downdiv.style.width='388px';
    //downdiv.style.height='459px';
    downdiv.className='downDivCSS';
    //downdiv.style.zIndex   = "100001";
    //downdiv.style.position = "absolute";
    var divhtml='';
    
    var urls=url+'?SearchActionURLs='+SearchActionURLs+'&DownActionURLs='+DownActionURLs+'&id='+downdiv.id;
    divhtml+='<iframe src="'+urls+'" scrolling="no" frameborder="0"'
           +'style="width: 100%; height: 100%;padding: 0px;margin:0px;overflow: hidden;">'
           +'</iframe>';
    downdiv.innerHTML=divhtml;
    document.body.appendChild(downdiv);
    //setObjMiddleX(downdiv);
    //setObjMiddleY(downdiv);
}

/*================居中显示对象==================*/
function setObjMiddleX(msgObj){
	if(msgObj){
		var msgWidth = msgObj.scrollWidth;  
	    var bgLeft=window.pageXOffset   
	               || document.documentElement.scrollLeft   
	               || document.body.scrollLeft || 0;  
	    var bgWidth=document.documentElement.clientWidth   
	               || document.body.clientWidth || 0;
	    var msgLeft=0; 
	    if(bgWidth>msgWidth){
	    	msgLeft=bgLeft+Math.round((bgWidth-msgWidth)/2);
	    }else{
	    	msgLeft=bgLeft+10;
	    }
	    msgObj.style.position = "absolute";  
	    msgObj.style.left  = msgLeft+"px";  
	}
}
function setObjMiddleY(msgObj,objHeight){
	if(msgObj){
		var msgHeight= msgObj.scrollHeight;  
		if(objHeight){
			msgHeight = objHeight;
		}
	    
	    var bgTop=window.pageYOffset   
	            || document.documentElement.scrollTop   
	            || document.body.scrollTop || 0;  
	    var bgHeight=document.documentElement.clientHeight   
	            || document.body.clientHeight || 0;   
	    var msgTop=0;  
	    
	    //通过父页面返高度的方法使窗口纵向居中
	    /*var parentHeight = parent.getIframeScroll();
	    if(parentHeight&&Number(parentHeight)&&parentHeight>0){
	    	bgTop += parentHeight;
	    	bgHeight = bgHeight-parentHeight;
	    }*/
	    
	    if(bgHeight>msgHeight){
	    	msgTop=bgTop+Math.round((bgHeight-msgHeight)/2);
	    }else{
	    	msgTop=bgTop+10;
	    }
	    msgObj.style.position = "absolute";  
	    msgObj.style.top      = msgTop+"px";  
	}
}


/* =============== 容器 ================ */
/* ========= 页签 =========== */  
/* =n-当前要切换的页签号，m-页签总数= */
jQuery(document).ready(function() {
	jQuery("sec1").live('click', function() {
		
		//获取最外层div
		var selectors=jQuery(this).parent().parent().parent();
		var seldiv="dfpcttable";
		if(selectors.attr("class")==seldiv){
			
			//获取页卡头table的第一个tr
			var selcardtr=jQuery(this).parent();
	
			//获取页卡体对象table
			var selbodytable=selectors.parent().children('div');
	
			//获取页卡头table的第一个tr内的所有td
			var tb=selcardtr.children();
	
			//确定当前被选页卡的位置参数
			var n=0;
	
			//设置页卡头
			for(var i=0;i<tb.length;i++){
				tb[i].className="sec1";
			}
			this.className="sec2";	
	
			//获取当前页卡位置
			for(var i=0;i<tb.length;i++){
				if(tb[i].className==this.className){
					n=i;
				}
			}
	
			//获取页卡体内的所有div对象
			var tbh=selbodytable;
	
			//设置页卡体显示状态
			for(var i=0;i<tbh.length;i++){
				tbh[i].style.display = "none";
			}
			tbh[n].style.display = "block";
		}
	});
	
	jQuery(".dfWinTabHead1").live('click', function() {
		//获取最外层div
		var selectors=jQuery(this).parent().parent().parent();
		var seldiv="dfWinTabTable";
		if(selectors.attr("class")==seldiv){
			
			//获取页卡头table的第一个tr
			var selcardtr=jQuery(this).parent();
	
			//获取页卡体对象table
			var selbodytable=selectors.parent().parent().children('.dfWinTabBody');
	
			//获取页卡头table的第一个tr内的所有td
			var tb=selcardtr.children();
	
			//确定当前被选页卡的位置参数
			var n=0;
	
			//设置页卡头
			for(var i=0;i<tb.length;i++){
				tb[i].className="dfWinTabHead1";
			}
			this.className="dfWinTabHead2";
			url=jQuery(this).attr("dfTabUrl");
			isRefresh=jQuery(this).attr("isRefresh");
			
			//获取当前页卡位置
			for(var i=0;i<tb.length;i++){
				if(tb[i].className==this.className){
					n=i;
				}
			}
	
			//获取页卡体内的所有div对象
			var tbh=selbodytable;
	
			//设置页卡体显示状态
			for(var i=0;i<tbh.length;i++){
				tbh[i].style.display = "none";
			}
			tbh[n].style.display = "block";	//设置当前页卡的图像
			if(isRefresh==1){
				if(url!="" && url!=null && url!="undefined"){ 
					jQuery(tbh[n]).children("iframe").attr("src",url)
				}
			}else{
				var dfTabUrl = jQuery(tbh[n]).children("iframe").attr("src");
				if(dfTabUrl=="" || dfTabUrl==null || dfTabUrl=="undefined"){  //为当前页卡中的iframe设置url
					jQuery(tbh[n]).children("iframe").attr("src",url)
				}
			}
		}
		jQuery(".dfWinTabScroll").each(function(){
			var width1=0;
			widthTD = jQuery(".dfWinTabScroll").children().children().children().children();
			
			for(var i=0;i<widthTD.length;i++){
				widthSD = jQuery(widthTD[i]).width()+30;
				//alert(widthSD)
				width1 += widthSD;
			}
			//width1 += jQuery(".dfWinTabTable2nd").css('margin-left');
			//alert(width1);
			if(width1>750){
				jQuery(".dfWinTabScroll").css("width",width1+5+"px");
			}
		});

	});
	
	jQuery(".dfWinTabHead2nd1").live('click', function() {
		var selectors=jQuery(this).parent().parent().parent();
		var seldiv="dfWinTabTable2nd";
		if(selectors.attr("class")==seldiv){
			var selcardtr=jQuery(this).parent();
			var selbodytable=selectors.parent().parent().children('.dfWinTabBody');
			var tb=selcardtr.children();
			var n=0;
			for(var i=0;i<tb.length;i++){
				tb[i].className="dfWinTabHead2nd1";
			}
			this.className="dfWinTabHead2nd2";
			for(var i=0;i<tb.length;i++){
				if(tb[i].className==this.className){
					n=i;
				}
			}
			var tbh=selbodytable;
			for(var i=0;i<tbh.length;i++){
				tbh[i].style.display = "none";
			}
			tbh[n].style.display = "block";
		}
	});
	
	jQuery(".HeadSet2nd0").live('click', function() {
		var selectors=jQuery(this).parent().parent().parent().parent();    //table
		var seldiv="dfWinTabTable2nd";
		if(selectors.attr("class")==seldiv){
			var selcardtr=jQuery(this).parent().parent();    //tr
			var selbodytable=selectors.parent().parent().parent().children('.dfWinTabBody');
			var tb=selcardtr.children().children();
			var n=0;
			for(var i=0;i<tb.length;i++){
				tb[i].className="HeadSet2nd0";
			}
			this.className="HeadSet2nd1";
			for(var i=0;i<tb.length;i++){
				if(tb[i].className==this.className){
					n=i;
				}
			}
			var tbh=selbodytable;
			for(var i=0;i<tbh.length;i++){
				tbh[i].style.display = "none";
			}
			tbh[n].style.display = "block";
			
		}
	});

});
/* ========= 高级页签 =========== */ 
var new_tab_count=0;
jQuery(function() {
	// 关闭(删除)tab
	jQuery(".tabTitle>ul>li>label").live("click",function() {
			var pId=jQuery(this).parent().parent().parent().parent().attr('id');
			var objTitle = jQuery("#"+pId+">div>ul>li");
			if (objTitle.length == 2 
					&&  jQuery("#"+pId+">div>ul>li:last-child").html().toLowerCase()
					.indexOf("label>") < 0){
				return;
			}
			if (objTitle.length == 1) {
				return;
			}
			var li = jQuery(this).parent();
			var index = objTitle.index(li);
			if (li.attr("id")=="tabSelect"){
			    li.removeAttr("id");
				if(li.prev()){
					li.prev().attr("id","tabSelect");
					jQuery("#"+pId+">div[class='tab_content']").eq(index-1).show();
				}else{
					li.next().attr("id","tabSelect");
					jQuery("#"+pId+">div[class='tab_content']").eq(index+1).show();
				}
				li.remove();
				jQuery("#"+pId+">div[class='tab_content']").eq(index).remove();
			}else{
				li.remove();
				jQuery("#"+pId+">div[class='tab_content']").eq(index).remove();
			}
		});
	// tab切换、新建
	jQuery(".tabTitle>ul>li").live("click",function() {
			var pId=jQuery(this).parent().parent().parent().attr('id');
			var index = jQuery("#"+pId+">div>ul>li").index(this);
			if ((index + 1) == jQuery("#"+pId+">div>ul>li").length
					&& jQuery(this).text().replace(" ", "") == "*") {
				new_tab_count++;
				AddTab("新增" + new_tab_count, "content" + new_tab_count, pId);
			}
			for(var i=0; i<jQuery("#"+pId+">div>ul>li").length; i++){
				var liId=jQuery("#"+pId).find("li")[i].id;
				if(liId){
					break;
				}
			}
			if (jQuery("#"+pId+">div[class='tabTitle']>ul>li[id='tabSelect']").children().length > 0) {
				jQuery("#"+pId+">div[class='tabTitle']>ul>li[id='tabSelect']").children()[0].className = "tab_close";
			}
			jQuery("#"+pId+">div[class='tabTitle']>ul>li[id='"+liId+"']").removeAttr("id");
			jQuery(this).attr("id", "tabSelect");
			if (jQuery(this).children().length > 0) {
				jQuery(this).children()[0].className = "tab_close1";
			}
			jQuery("#"+pId+">div[class='tab_content']").hide();
			
			jQuery("#"+pId+">div[class='tab_content']").eq(index).show();// 显示当前
		});
	// tab滚动
	jQuery(".ScrollBtn").click(function() {
		var pId=jQuery(this).parent().attr('id');
		// 左
		if (jQuery(this).index() == 0){
			var currentPosition = jQuery("#"+pId+">div[class='tabTitle']").scrollLeft();
			jQuery("#"+pId+">div[class='tabTitle']").get(0).scrollLeft = currentPosition - 50;
		}else{
			var currentPosition = jQuery("#"+pId+">div[class='tabTitle']").scrollLeft();
			var maxLeft = jQuery("#"+pId+">div[class='tabTitle']>ul>li:last-child").offset().left;
			if (maxLeft > jQuery("#"+pId+">div[class='tabTitle']>ul>li:last-child").width() + 20){
				jQuery("#"+pId+">div[class='tabTitle']").get(0).scrollLeft = currentPosition + 50;
			}
		}
	});
});
// 添加tab
function AddTab(title, content, pID, isClose) {
	var needAdd = true;
	jQuery("#"+pID+">div>ul>li").each(
			function() {
				if (jQuery(this).text() == title) {
					var index = jQuery("#"+pID+">div>ul>li").index(this);
					if (jQuery("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").children().length > 0) {
						jQuery("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").children()[0].className = "tab_close";
					}
					jQuery("#"+pID+">div[class='tabTitle']>ul>li[id='tabSelect']").removeAttr("id");
					jQuery(this).attr("id", "tabSelect");
					if (jQuery(this).children().length > 0) {
						jQuery(this).children()[0].className = "tab_close1";
					}
					jQuery("#"+pID+">div[class='tab_content']").hide();// 全部隐藏
					jQuery("#"+pID+">div[class='tab_content']").eq(index).show();// 显示当前
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
		if(jQuery("#"+pID+">div>ul>li").length > 100){
			alert("最多只能添加100个tab");
			return;
		}
		//添加新的tab
		if(jQuery("#"+pID+">div>ul>li:last-child").text().replace(" ", "") == "*"){
			jQuery("#"+pID+">div>ul>li:last-child").html(tabTitleHtml.replace("<li>", "").replace("</li>", ""));
			jQuery("#"+pID+">div>ul").append("<li>*</li>");
		} else {
			jQuery("#"+pID+">div>ul").append(tabTitleHtml);
		}
		// 添加内容
		var ContentHtml = "<div class='tab_content' style='display:none'>";
		if(content.substr(0,3)=="url"){
			ContentHtml += "<iframe src='"+content.substr(4)+ "' frameborder='0' width='100%' height='100%' ></iframe></div>";
			jQuery("#"+pID).append(ContentHtml);
		}else{
			ContentHtml += content+ "</div>";
			jQuery("#"+pID).append(ContentHtml);		
		}
		// 判断滚动条的出现
		if (jQuery("#"+pID+">div>ul>li:last-child").offset().left > jQuery(".tabTitle").width()){
			if (jQuery(".ScrollBtn").css("display") == "block") return;
			jQuery(".ScrollBtn").css("display", "block");
			var titleWidth = jQuery(".tabTitle").width() - jQuery(".ScrollBtn").width() * 2;
			jQuery(".tabTitle").css("width", titleWidth + "px");
		}
	}
}

// 按钮事件处理(测试用)
function TabAdd() {
	var title = jQuery("#txtTabName").val();
	var content = jQuery("#txtContent").val();
	var ID = jQuery("#txtTabID").val();
	AddTab(title, content, ID, true);
}

/* ========= 校验功能 =========== */ 
//modified by wangsy2 2013-04-09 for add validate function begin.
jQuery("[dfValidate]").live('blur',function(){
	var thisInput = this;
	var validateStr = jQuery(this).attr("dfValidate");
	var inputValue = jQuery(this).attr("value");
	var validateTemp = new Array();	
	
	validateTemp = validateStr.split(';');
	for (var i=0;i<validateTemp.length;i++) {
		if(validateTemp[i].length == 0) {
			continue;
		}
		
		if(jQuery(this).hasClass("inputselect")){//满足校验下拉控件
			s = replaceSingleQuote_df(jQuery(this).prev().html());
			if(s.indexOf("--请")>=0){
				s = replaceSingleQuote_df("");
			}
		}else if(jQuery(this).attr("class") == "calInput"){//满足校验日期控件
			if(jQuery("#ContainerPanel")[0] && jQuery("#ContainerPanel").css("display") != "none"){
				return true;
			}
			s = replaceSingleQuote_df(inputValue);
		}else{
			s = replaceSingleQuote_df(inputValue);
		}
		try{
			var scriptCode = "javascript:" + validateTemp[i];  //"javascript:" + validateTemp[i] + "('" + s + "', " + "thisInput)"
			if(validateTemp[i].indexOf("(") < 0 || validateTemp[i].indexOf(")") < 0) {
				scriptCode = "javascript:" + validateTemp[i] + "(s,thisInput)";
			} else{
				var temScriptCode;
				do{
					temScriptCode=scriptCode;
					scriptCode=scriptCode.replace(/(\W)this(\W)/, "$1"+"thisInput"+"$2");
				}while(scriptCode!=temScriptCode);
				
			} 
			if (!eval(scriptCode)) {  
				return false;
			}
		} catch(e) {
			inputName = jQuery(thisInput).attr("inputName");
			if(typeof(inputName) == "undefined"){
				inputName = "";
			}
			alert(inputName+"校验函数"+validateTemp[i]+"有异常，请检查！" + "\n" + e.message );
			return false;
		}
	}
});

function replaceSingleQuote_df(_str) {
	/**替换换行回车字符**/
	//defined by zhangjhg on 2013/11/14
	var str = _str;
	str = str.replace(/\\/g,'\\u005C');
	str = str.replace(/\'/g,'\\u0027');	
	str = str.replace(/\(/g,'\\u0028');
	str = str.replace(/\)/g,'\\u0029');
	str = str.replace(/\"/g,'\\u0022');
	str = str.replace(/;/g,'\\u0038');

	str = Jtrim_df(str);

	return str;
}

function Jtrim_df(str) {  //去空隔函数
	var i = 0;
	var len = str.length;
	if ( str == "" ) return( str );
	j = len -1;
	flagbegin = true;
	flagend = true;
	while ( flagbegin == true && i< len) {
		if ( str.charAt(i) == " " ) {
			i=i+1;
			flagbegin=true;
		} else {
			flagbegin=false;
		}
	}

	while  (flagend== true && j>=0)	{
		if (str.charAt(j)==" ")	{
			j=j-1;
			flagend=true;
		} else {
			flagend=false;
		}
	}

	if ( i > j ) 
		return ("");

	trimstr = str.substring(i,j+1);
	return trimstr;
}

function writeValidateInfo_df(info, thisObj) {
	//var inputName = getInputNameFromObject(thisObj);
	//info = inputName + "的输入有误！\n" + info;
	
	if(rmConfigValidateInfoType_df.indexOf("writePage") >= 0) {
		writeValidateInfoAfterObject_df(info, thisObj);
	}
	setRmInputError_df(thisObj);
}

function writeValidateInfoAfterObject_df(info, thisObj) {  //写校验信息
	if(!Boolean(jQuery(thisObj).attr("id"))){
		newId = getNewId();
		jQuery(thisObj).attr("id",newId);
	}
	//modified by wangsy 2013-7-19 update for 截取校验信息文字
	var errorObjwidth;
	
	//兼容id中带.
	if(!document.getElementById(thisObj.id+"_error")){
		if(jQuery(thisObj).hasClass("dfLenovoInput") || jQuery(thisObj).hasClass("nameInput") || jQuery(thisObj).hasClass("deleteInput") || jQuery(thisObj).hasClass("calInput") || jQuery(thisObj).hasClass("selInput") || jQuery(thisObj).hasClass("simple-radio")){
			if(jQuery(thisObj.parentElement).css("width").match("px")){
				errorObjwidth = Number(jQuery(thisObj.parentElement).css("width").replace("px",""));
				if(document.documentMode<7){
					left = -2/3*errorObjwidth + "px";
				}else if(document.documentMode==7){
					left = -2/3*errorObjwidth + "px";
				}else{
					left = errorObjwidth/3 + "px";
				}
			}else if(thisObj.parentElement.style.width.match("%")){
				if(document.documentMode<7){
					left = -2/3*Number(jQuery(thisObj.parentElement).css("width").replace("%","")) + "%";
				}else if(document.documentMode==7){
					left = -2/3*Number(jQuery(thisObj.parentElement).css("width").replace("%","")) + "%";
				}else{
					left = Number(jQuery(thisObj.parentElement).css("width").replace("%",""))/3 + "%";
				}
			}
		}else if(jQuery(thisObj).hasClass("inputselect")){
			if(jQuery(thisObj.parentElement).css("width").match("px")){
				errorObjwidth = Number(jQuery(thisObj.parentElement).css("width").replace("px",""));
				if(document.documentMode<7){
					left = errorObjwidth/3 + "px";
				}else if(document.documentMode==7){
					left = errorObjwidth/3 + "px";
				}else{
					left = errorObjwidth/3 + "px";
				}
			}else if(thisObj.parentElement.style.width.match("%")){
				if(document.documentMode<7){
					left = -2/3*Number(jQuery(thisObj.parentElement).css("width").replace("%","")) + "%";
				}else if(document.documentMode==7){
					left = -2/3*Number(jQuery(thisObj.parentElement).css("width").replace("%","")) + "%";
				}else{
					left = Number(jQuery(thisObj.parentElement).css("width").replace("%",""))/3 + "%";
				}
			}
		}else if(jQuery(thisObj).hasClass("popUpInput")){
			if(jQuery(thisObj.parentElement).css("width").match("px")){
				var thisTable = jQuery(thisObj.parentElement).parent().parent().parent().parent();
				errorObjwidth = Number(thisTable.css("width").replace("px",""));
				if(document.documentMode<7){
					left = errorObjwidth/3 + "px";
				}else if(document.documentMode==7){
					left = errorObjwidth/3 + "px";
				}else{
					left = errorObjwidth/3 + "px";
				}
			}else if(thisObj.parentElement.style.width.match("%")){
				if(document.documentMode<7){
					left = -2/3*Number(thisTable.css("width").replace("%","")) + "%";
				}else if(document.documentMode==7){
					left = -2/3*Number(thisTable.css("width").replace("%","")) + "%";
				}else{
					left = Number(thisTable.css("width").replace("%",""))/3 + "%";
				}
			}
		}else{
			if(jQuery(thisObj).css("width").match("px")){
				errorObjwidth = Number(jQuery(thisObj).css("width").replace("px",""));
				if(document.documentMode<7){
					left = -2/3*errorObjwidth + "px";
				}else if(document.documentMode==7){
					left = -2/3*errorObjwidth + "px";
				}else{
					left = errorObjwidth/3 + "px";
				}
			}else if(thisObj.style.width.match("%")){
				if(document.documentMode<7){
					left = -2/3*Number(jQuery(thisObj.parentElement).css("width").replace("%","")) + "%";
				}else if(document.documentMode==7){
					left = -2/3*Number(jQuery(thisObj.parentElement).css("width").replace("%","")) + "%";
				}else{
					left = Number(jQuery(thisObj.parentElement).css("width").replace("%",""))/3 + "%";
				}
			}
		}
		
		if(Boolean(jQuery(thisObj).css("height"))){
			if(jQuery(thisObj).hasClass("inputselect")){
				if(document.documentMode<7){
					height = -Number(jQuery(thisObj).css("height").replace("px",""))-33+"px";
				}else if(document.documentMode==7){
					height = -Number(jQuery(thisObj).css("height").replace("px",""))-23+"px";
				}else{
					height = -Number(jQuery(thisObj).css("height").replace("px",""))-23+"px";
				}
			}else if(jQuery(thisObj).hasClass("popUpInput") || jQuery(thisObj).hasClass("dfLenovoInput") || jQuery(thisObj).hasClass("nameInput") || jQuery(thisObj).hasClass("deleteInput") || jQuery(thisObj).hasClass("calInput") || jQuery(thisObj).hasClass("selInput")){
				if(document.documentMode<7){
					height = "-20px";
				}else if(document.documentMode==7){
					height = "-20px";
				}else{
					height = "-20px";
				}
			}else{
				if(document.documentMode<7){
					height = "-20px";
				}else if(document.documentMode==7){
					height = "-20px";
				}else{
					height = -Number(jQuery(thisObj).css("height").replace("px",""))-23+"px";
				}
			}
		}
		
		var fontLength = info.length;
		var fontCount = Math.floor((errorObjwidth*2/3-16)/12)-1;
		
		zIndex = getZIndex(thisObj);
			
		html = '<div id="'+thisObj.id+'_error" style="margin-top:'+height+';margin-left:'+left+';white-space:nowrap;z-index:'+zIndex+';position:absolute;" class="inputErrorInfo"';
		if(fontLength>fontCount){
			var titleText = info; 
			info = info.substr(0,fontCount)+"...";
			html+='title="'+titleText+'" >';
		}else{
			html+='>';
		}
		html+='	<table cellspacing="0" cellpadding="0"><tr class="dfValidateErrorTr" style="background-color:transparent !important;"><td style="vertical-align:top !important;min-height:0px !important;border:0px !important;padding:0px !important;"><div style="" class="inputErrorInfoDiv"></div></td><td style="min-height:0px !important;border:0px !important;padding:0px !important;"><div class="inputErrorInfoSpan">'+info+'</div></td></tr></table>'  
		+'</div>';
		
		if(jQuery(thisObj).hasClass("inputselect")){
			jQuery(thisObj).parent().after(html);
		}else if(jQuery(thisObj).hasClass("dfLenovoInput") || jQuery(thisObj).hasClass("nameInput") || jQuery(thisObj).hasClass("deleteInput") || jQuery(thisObj).hasClass("calInput") || jQuery(thisObj).hasClass("selInput")){
			if(jQuery(thisObj).next()[0]){
				jQuery(thisObj).parent().after(html);
			}else{
				jQuery(thisObj).parent().parent().parent().parent().parent().after(html);
			}
		}else if(jQuery(thisObj).hasClass("popUpInput")){
			jQuery(thisObj).parent().parent().parent().parent().parent().after(html);
		}else{
			jQuery(thisObj).after(html);
		}
		
	}
}

function setRmInputError_df(_frm) {
	try {
		if(jQuery(_frm).hasClass("inputtest")){
			_frm.style.border="1px solid #b83838";
		}else if(jQuery(_frm).hasClass("inputtable")){
			_frm.style.height="28px"; 
			_frm.style.border="1px solid #b83838";
		}else if(jQuery(_frm).hasClass("dfLenovoInput") || jQuery(_frm).hasClass("nameInput") || jQuery(_frm).hasClass("deleteInput") || jQuery(_frm).hasClass("inputselect") || jQuery(_frm).hasClass("calInput") || jQuery(_frm).hasClass("selInput")){
			if(jQuery(_frm).next()[0] || jQuery(_frm).prev()[0]){
				jQuery(_frm).parent().css("height","28px");
				jQuery(_frm).parent().css("border","1px solid #b83838");
			}else{
				jQuery(_frm).parent().parent().parent().parent().parent().css("height","28px");
				jQuery(_frm).parent().parent().parent().parent().parent().css("border","1px solid #b83838");
			}
		}else if(jQuery(_frm).hasClass("popUpInput")){
			jQuery(_frm).parent().parent().parent().parent().parent().css("border","1px solid #b83838");
		}
	} catch(e) {
		alert(e.message);
	}
}

function hideValidateInfo_df(thisInput){
	//兼容id中带.
	jQuery(document.getElementById(thisInput.id+"_error")).remove();
	
	if(jQuery(thisInput).hasClass("inputtable")){
		jQuery(thisInput).css("height","30px");
		jQuery(thisInput).css("border","0px solid #bbbbbb");
	}else if(jQuery(thisInput).hasClass("inputtest")){
		jQuery(thisInput).css("border","1px solid #bbbbbb");
	}else if(jQuery(thisInput).parent().hasClass("dfLenovoInputdiv") || jQuery(thisInput).parent().hasClass("nameInputdiv") || jQuery(thisInput).parent().hasClass("deleteInputdiv") || jQuery(thisInput).parent().hasClass("sel_wrap") || jQuery(thisInput).parent().hasClass("calInputdiv") || jQuery(thisInput).parent().hasClass("selInputdiv")){
		jQuery(thisInput).parent().css("border","1px solid #bbbbbb");
	}else if(jQuery(thisInput).parent().hasClass("dfLenovoInputdiv30") || jQuery(thisInput).parent().hasClass("nameInputdiv30") || jQuery(thisInput).parent().hasClass("deleteInputdiv30") || jQuery(thisInput).parent().hasClass("sel_wrap30") || jQuery(thisInput).parent().hasClass("calInputdiv30") || jQuery(thisInput).parent().hasClass("selInputdiv30")){
		jQuery(thisInput).parent().css("height","30px");
		jQuery(thisInput).parent().css("border","0px solid #bbbbbb");
	}else if(jQuery(thisInput).hasClass("popUpInput")){
		jQuery(thisInput).parent().parent().parent().parent().parent().css("border","1px solid #bbbbbb");
	}
}

function getInputNameFromObject_df(thisInput) {
	var inputName = thisInput.getAttribute("inputName");
	if (inputName == null || inputName.length == 0 ){
		inputName = thisInput.name;
		if ( inputName == null || inputName.length == 0 ){
			inputName = "";
		}
	}
	return inputName;
}
//modified by wangsy2 2013-04-09 for add validate function end.

//modified by wangsy2 2013-04-09 for add 获取层级方法  begin.
//本方法用于获取此元素的z-index，没有返回0
function getZIndex(thisObj){
	zIndex = null;
	zIndexObj = thisObj;

	while(true){
		if(zIndexObj.style.zIndex==""){
			if(zIndexObj.parentNode.localName != null){
				zIndexObj = zIndexObj.parentNode;
			}else{
				zIndex = 1;
				break;
			}
		}else{
			zIndex = zIndexObj.style.zIndex - 0 + 1;
			break;
		}
	}
	return zIndex;
}
function getDfZIndex(){
	zIndex = null;
	if(document.getElementById("dfZIndex")){
		zIndex = jQuery("#dfZIndex").attr("dfmaxzIndex");
	}else{
		zIndex = 1;
		var divZIndex = document.createElement("div");
		divZIndex.id = "dfZIndex";
		jQuery("body").append(divZIndex);
	}
	zzIndex = zIndex-0+1;
	jQuery("#dfZIndex").attr("dfmaxzIndex",zzIndex);
	return zIndex;
}
//modified by wangsy2 2013-04-09 for add 获取层级方法 end.

//本方法用于生成一个动态id，16位长度
//modified by wangsy2 2013-04-09 for add getNewId function begin.
function getNewId(){
	var newId = "";
	for(var i=0;i<4;i++){
		var ids = parseInt(String(Math.random()*10000));
		newId += String(ids);
	}
	return newId;
	
}
//modified by wangsy2 2013-04-09 for add getNewId function end.

/* ========= 弹出框事件 =========== */ 
/* 参数说明：new_win(触发点击事件的对象(this,用于存放窗口id),窗体宽度(number),窗体高度(number),"窗口名称",
 * "窗口内容(如想要内容以iframe的方式嵌入一个其它页面时,格式为“url:xxx.xxx”，如"url:http://www.baidu.com"；
 * 如果以非iframe的方式时，格式为“load:xxx.xxx”)",是否带遮罩层(boolean),是否居中(boolean),
 * 窗口横坐标(number),窗口纵坐标(number),是否支持缩放功能(1为支持,0为不支持),是否初始化最大化) */
function new_win(thisObj,body_width,body_height,win_name,win_body,need_shade,
		isCenter,win_left,win_top,win_larger,init_larger){
	/*是否最大化功能，1是/0否*/
	win_larger = (win_larger||win_larger=="0")?win_larger:1;
	/*是否窗口初始化最大化,1是/0否*/
	init_larger = (init_larger || init_larger == "0")?init_larger:0;

	/*获取窗口id*/
	if(typeof(thisObj)=="string"){
		win_id = thisObj;
	}else{
		if(jQuery(thisObj).attr("dfWinId")){
			win_id = jQuery(thisObj).attr("dfWinId");
		}else{
			win_id = getNewId();
			jQuery(thisObj).attr("dfWinId",win_id);
		}
	}
	
	/*判断窗口是否已生成*/
	if(document.getElementById(win_id)){
		document.getElementById(win_id).style.display = "";
	}else{
		/*获取窗口层级*/
		var win_z_index = getDfZIndex();
		
		if(win_body.substr(0,3) == "url" || win_body.substr(0,4) == "load"){
			var win_height = body_height + 36 ;
			var win_width = body_width + 2 ;
		}else{
			var win_height = body_height + 76 ;
			var win_width = body_width + 42 ;
		}
		var head_width = win_width - 2;
		
		//var win_margin_top = -win_height/2;
		//var win_margin_left = -win_width/2;
	
		var win_style = "";
		if(isCenter){
			win_style = "width:"+win_width+"px; height:"+win_height+"px;top:0px;left:0px;position:absolute;z-index:"+win_z_index+";";
		}else{
			win_style = "width:"+win_width+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;z-index:"+win_z_index+";";
		}
		if(document.documentMode<7){
			quirks_width = win_width-0+12;
			quirks_height = win_height-0+14;
		}
		
		var win_html = "";
		if(need_shade){
			shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
			shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
			win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;z-index:'+win_z_index+';"></div>'
		}
		var objHeight;
		win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">';
		if(document.documentMode < 7){
			objHeight = quirks_height;
			win_html +='<div class="lightbox" style="width:'+quirks_width+'px; height:'+quirks_height+'px; "></div>';
		}else{
			objHeight = win_height;
			win_html +='<div class="lightbox" style="width:'+win_width+'px; height:'+win_height+'px; "></div>';
		}
		win_html +=	'<div class="win_header" style="width:'+head_width+'px;height:34px;" >'
		+		'<span class="win_name" style="" >'+win_name+'</span>'
		+		'<span class="win_cancel" style="width:12px;height:12px;" ';
		if(win_body.substr(0,3) == "url"){
			win_html +=	'onclick="win_remove('+"'"+win_id+"'"+')"';
			dfWinIdIframeArrayNum--;
		}else{
			win_html +=	'onclick="dfWinRemove()"';
		}
		win_html +=		'></span>';
		if( win_larger !=null && win_larger != 0){
		win_html +=	'<span class="win_magnify" onclick="dfChangeZoom(this)" preWidth="'+win_width+'" preHeight="'+win_height+'" winId="'+win_id+'" ';
			if(win_body.substr(0,3) == "url"){
				win_html +=	'winType="iframe"';
			}else{
				win_html +=	'winType="load"';
			}
			win_html +=		'></span>' 
		}
		win_html +=	'</div>'
		+	'<div class="win_body" style="width:'+body_width+'px;height:'+body_height+'px;';
		
		if(win_body.substr(0,3) == "url"){
			if(win_body.indexOf('?')>0){
				win_id_url = '&win_id='+win_id;
			}else{
				win_id_url = '?win_id='+win_id;
			}
			//alert(win_id_url);
			win_html += '" ><iframe id="'+win_id+'_iframe" src=\''+win_body.substr(4)+win_id_url+'\' style="width:100%;height:100%;border:0;" marginwidth="0" frameborder="0" marginheight="0"></iframe>';
		}else if(win_body.substr(0,4) == "load"){
			win_html += 'position: absolute;overflow-y:auto;overflow-x:hidden;"  id="loadDiv_'+win_id+'" >';
		}else{
			win_html += 'padding:20px;" >'+win_body;
		}
		win_html +=	'</div></div>';
		
		var div = document.createElement("div");
		div.id = win_id;
		div.innerHTML = win_html;
		div.style.zIndex = win_z_index;
		document.body.appendChild(div);
		if(win_body.substr(0,4) == "load"){
			jQuery("#loadDiv_"+win_id).load(win_body.substr(5));
		}
		if(win_body.substr(0,3) != "url"){
			dfWinIdArrayNum++;
			dfWinIdArray[dfWinIdArrayNum] = win_id;
		}else{
			dfWinIdIframeArrayNum++;
			dfWinIdIframeArray[dfWinIdIframeArrayNum] = win_id;
		}
		
		//alert(textHeight);
		win_border_obj = jQuery("#win_border_"+win_id);
		
		setObjMiddleX(win_border_obj[0]);
		setObjMiddleY(win_border_obj[0],objHeight);
		
		drag(win_border_obj[0], win_border_obj.children()[1]);
		if(init_larger !=null && init_larger != 0){
			dfChangeZoom(jQuery(win_border_obj[0]).find(".win_magnify"));
		}
	}
}

function dfWinRemove(){
	jQuery("#"+getDfWinId_load()).remove();
	dfWinIdArrayNum--;
}
function dfWinIframeRemove(){
	jQuery("#"+getDfWinId_url()).remove();
	dfWinIdIframeArrayNum--;
}
//modefied by wangsy 2013-04-21 for 获取窗口id
function getDfWinId_load(){
	return dfWinIdArray[dfWinIdArrayNum];
}
function getDfWinId_url(){
	return dfWinIdIframeArray[dfWinIdIframeArrayNum];
}

function win_close(win_id){
	jQuery("#"+win_id).hide();
}

//modified by jiangqx 2013-04-09 for 在导出点击取消时销毁窗口
function win_remove(win_id){
	//jQuery("#"+win_id).contents().find("iframe").contents().find("body").empty();
	jQuery("#"+win_id).remove();
}

//最大化
function dfChangeZoom(thisObj){
	//更改win_border
	var thisWin = jQuery(thisObj).parents(".win_border")[0];
	//遮罩层lightbox
	var thisLightBox = jQuery(thisObj).parents(".win_border").children(".lightbox")[0];
	//div头部
	var thisWinHead = jQuery(thisObj).parents(".win_header")[0];
	//div身体
	var thisWinBody = jQuery(thisObj).parents(".win_border").children(".win_body")[0];
	//保存原窗口的宽高
	var winWidth = jQuery(thisObj).attr("preWidth");
	var winHeight = jQuery(thisObj).attr("preHeight");
	//lightbox在IE7以下版本的宽高
	var quirks_width = Number(winWidth)+12;
	var quirks_height =  Number(winHeight)+14;
	
	if(jQuery(thisObj).hasClass("win_magnify")){
		var bgWidth=document.documentElement.clientWidth   
	    || document.body.clientWidth || 0;
		var bgHeight=document.documentElement.clientHeight   
	    || document.body.clientHeight || 0;   
		
		//lightbox在IE7以下版本的宽高
		var quirks_width = Number(bgWidth)+14;
		var quirks_height =  Number(bgHeight)+14;
		
		thisWin.style.left = "0px";
		thisWin.style.top = "0px";
		thisWin.style.width = bgWidth - 18 + "px";
		thisWin.style.height = bgHeight - 18 +"px";
		if(document.documentMode<7){
			jQuery(thisLightBox).css("width",quirks_width - 18 + "px");
			jQuery(thisLightBox).css("height",quirks_height - 18 + "px");
			//thisLightBox.style.width = quirks_width - 18 + "px";
			//thisLightBox.style.height = quirks_height - 18 +"px";
		}else{
			thisLightBox.style.width = bgWidth - 18 + "px";
			thisLightBox.style.height = bgHeight - 18 +"px";
		}
		thisWinHead.style.width = bgWidth - 20 + "px";
		thisWinBody.style.width = bgWidth - 19 + "px";
		thisWinBody.style.height = bgHeight - 56 + "px";
		jQuery(thisObj).attr("class","win_reduce");
	}else if(jQuery(thisObj).hasClass("win_reduce")){
		thisWin.style.width = winWidth+"px";
		thisWin.style.height = winHeight+"px";
		if(document.documentMode<7){
			thisLightBox.style.width = quirks_width+"px";
			thisLightBox.style.height = quirks_height+"px";
		}else{
			thisLightBox.style.width = winWidth+"px";
			thisLightBox.style.height = winHeight+"px";
		}
		thisWinHead.style.width = winWidth - 2 + "px";
		thisWinBody.style.width = winWidth - 1 + "px";
		thisWinBody.style.height = winHeight - 36 + "px";
		jQuery(thisObj).attr("class","win_magnify");
		setObjMiddleX(thisWin);
		setObjMiddleY(thisWin,winHeight);
	}
	if(jQuery(thisObj).attr("winType")=="iframe"){
		if(typeof(jQuery("#"+jQuery(thisObj).attr("winId")+"_iframe")[0].contentWindow.dfWindowResize)=="function"){
			jQuery("#"+jQuery(thisObj).attr("winId")+"_iframe")[0].contentWindow.dfWindowResize();
			jQuery("#"+jQuery(thisObj).attr("winId")+"_iframe")[0].contentWindow.dfWindowResize();
		}
	}
}

//midified by wangsy 2013-04-27 for 导入
jQuery(document).ready(function(){
	jQuery(".inputFile").live("change",function(){
		inputValue = jQuery(this).val();
		inputValue = inputValue.substr(inputValue.lastIndexOf("\\")+1);
		var valueLength = 0;
		var showLength = 0;
		for(var i=0;i<inputValue.length;i++){
			if(inputValue.charCodeAt(i)>=10000){
				valueLength += 2;
			}else{
				valueLength += 1;
			}
		}
		if(inputValue.length == 0){
			jQuery("#inputFileSpan").html("未选择文件");
		}else{
			if(valueLength>36){
				for(var i=0;i<32;showLength++){
					if(inputValue.charCodeAt(showLength)>=10000){
						i += 2;
					}else{
						i += 1;
					}
				}
				inputValue = inputValue.substr(0,showLength)+"...";
			}
			jQuery("#inputFileSpan").html(inputValue);
			jQuery("#inputFileSpan").attr("title",jQuery(this).val());
		}
	});
});
function win_import(import_action,showId){
	win_name = "导入";
	
	var id=getNewId();
	
	shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
	shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
	width = "414px";
	height = "165px";
	margin_top = -(Number(height.replace("px",""))/2)+"px";
	margin_left = -(Number(width.replace("px",""))/2)+"px";
	
	var win_html =  '<div id ="win_import_shade" style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;z-index:9998;"></div>'
				+	'<div class="win_border" id="win_border_'+id+'" style="width:414px;top:0;left:0;position: absolute;z-index:9999;">';
	if(document.documentMode < 7){
			win_html +=  '<div class="lightbox" style="width:428px; height:180px; "></div>'
					 + '<div class="win_header" style="height:34px;width:414px;" >';
		}else{
			win_html += '<div class="lightbox" style="width:414px; height:165px;  "></div>'
					 +  '<div class="win_header" style="height:34px;width:412px;" >';
		}
		win_html += '<span class="win_name" style="">'+win_name+'</span>'
				 +		'<span class="win_cancel" style="width:12px;height:12px;" onclick="confirm_remove(this)"></span>'
				 +	'</div>';
		if(document.documentMode<7){
			win_html +=	'<div class="win_body" style="padding:20px;padding-bottom:10px;width:414px;">';
		}else{
			win_html +=	'<div class="win_body" style="padding:20px;padding-bottom:10px;width:372px;">';
		}
		
		win_html +=	'   '
				+	'<table><tr>'
				+	'<td><span style="height:26px;line-height:26px;font-size:12px;cursor:default;">文件路径：</span></td>'
				+	'<td><div class="importbutton">'
				+	'<input type="file" class="inputFile" id="fileName" name="fileName" />'
				+	'<div></td>'
				+	'<td><span id="inputFileSpan" class="inputFileSpan" style="" title="未选择文件">未选择文件</span></td>'
				+	'</tr></table><br>'
				+	'<div><table align="center" cellspacing=10px; border=0px;><tr><td>'
				+	'<input type="button" value="确　定" class="redbutton" '
				+	'url="'+import_action+'"'
				+	'fileId="fileName"'
				+	'showId="'+showId+'"'
				+	'onclick="ajaxImportFile(this)" /></td><td>'
				+	'<input type="button" value="取　消" class="graybutton" onclick="import_submit(this)" />'
				+	'</td></tr></table></div>'
				+	'</div>'
				+  '</div>';
	
	var div = document.createElement("div");
	div.id = "win_import";
	div.innerHTML = win_html;
	document.body.appendChild(div);
	
	win_border_obj = jQuery("#win_border_"+id);
	
	setObjMiddleX(win_border_obj[0]);
	setObjMiddleY(win_border_obj[0]);
	
	drag(win_border_obj[0], win_border_obj.children()[1]);
	
}

function ajaxImportFile(thisObj){
	var importFileAction = jQuery(thisObj).attr('url');
	var fileId =  jQuery(thisObj).attr('fileId');
	var showId =  jQuery(thisObj).attr('showId');
	var fileInputObj = jQuery('#'+fileId);
	if(fileInputObj.val()==null||fileInputObj.val()==''){
		win_alert('导入提示','请选择文件');
		return false;
	}
	//增加锁屏功能
	jQuery('#win_import_shade').css('zIndex','10000');
	jQuery.ajaxFileUpload({
		url:importFileAction,
		secureuri:false,
		fileElementId:fileId,
		dataType: 'text',
		success: function (data, status){
			jQuery('#win_import_shade').css('zIndex','9998');
			importFileFinish(data,showId);
			
			win_remove("win_import");
		},
		error: function (data, status, e){
			win_alert('导入提示',"导入失败");
		}
	});
}

function import_submit(winObj){
	win_remove("");
}

function export_dataByCol(thisObj, url,cols,rows,queryCondition,param){
    
	//列头信息，数据类型JSON,如：[{"name":"列名1","code":"DF_COL_NAME1"},{"name":"列名2","code":"DF_COL_NAME2"},{"name":"列名3","code":"DF_COL_NAME3"}]
	cols=JsonObjectToString(cols);//json格式转化为String格式
	cols =encodeURI(encodeURI(cols)); //转码  utf-8 
	//记录信息，用来选取导出的记录，数据类型为字符串,如："1001,1002,1003"
	rows =encodeURI(encodeURI(rows.join(','))); //转码  utf-8 
		
	//查询条件，用于通过查询条件查询出记录
	queryCondition=encodeURI(encodeURI(queryCondition));  //转码  utf-8 
		
	//拓展参数，用于扩展用途，将发送给后台
	param =encodeURI(encodeURI(param)); //转码  utf-8 
	export_new_win(thisObj, 444, 450, '导出', url, true, true, '', '', cols,
			rows,queryCondition,param);  
}

function export_dataByRow(thisObj, url,cols,rows,queryCondition,param){
    
	//列头信息，数据类型JSON,如：[{"name":"列名1","code":"DF_COL_NAME1"},{"name":"列名2","code":"DF_COL_NAME2"},{"name":"列名3","code":"DF_COL_NAME3"}]
	cols=JsonObjectToString(cols);//json格式转化为String格式
	cols =encodeURI(encodeURI(cols)); //转码  utf-8 
	//记录信息，用来选取导出的记录，数据类型为字符串,如："1001,1002,1003"
	rows =encodeURI(encodeURI(rows.join(','))); //转码  utf-8 
		
	//查询条件，用于通过查询条件查询出记录
	queryCondition=encodeURI(encodeURI(queryCondition));  //转码  utf-8 
		
	//拓展参数，用于扩展用途，将发送给后台
	param =encodeURI(encodeURI(param)); //转码  utf-8 
	export_new_win(thisObj, 415,151, '导出', url, true, true, '', '', cols,
			rows,queryCondition,param);  
}


/**
 * json 转 String
 */
function JsonObjectToString(o) {
    var arr=[];
    var fmt = function(s) { 
            if (typeof s == 'object' && s != null ) return JsonObjectToString(s); 
            return /^(string|number)$/.test(typeof s) ? "\"" + s + "\"" : s; 
    };
    
    if(o instanceof Array){
        for (var i in o){
                arr.push(fmt(o[i]));
        }
        return '[' + arr.join(',') + ']';
            
    }
    else{
        for (var i in o){
                arr.push("\"" + i + "\":" + fmt(o[i]));
        }
        return '{' + arr.join(',') + '}'; 
    }
}; 


/**
 * 数据导出窗口
 */
function export_new_win(thisObj,body_width,body_height,win_name,win_body,need_shade,isCenter,win_left,win_top,colNames,rowNames,queryCondition,params){
	/*获取窗口id*/
	if(jQuery(thisObj).attr("dfWinId")){
		win_id = jQuery(thisObj).attr("dfWinId");
	}else{
		win_id = getNewId();
		jQuery(thisObj).attr("dfWinId",win_id);
	}
	/*判断窗口是否已生成*/
	if(document.getElementById(win_id)){
		document.getElementById(win_id).style.display = "";
	}else{
		/*获取窗口层级*/
		var win_z_index = getDfZIndex();
		
		var win_height = 0;
		var win_width =  0;
		if(win_body.substr(0,3) == "url" || win_body.substr(0,4) == "load"){
			win_height = body_height + 36 ;
			win_width = body_width + 2 ;
		}else{
			win_height = body_height + 76 ;
			win_width = body_width + 42 ;
		}
		var head_width = win_width - 2;
		
		win_height = body_height + 36 ;
		win_width = body_width + 2 ;
		
		//var win_margin_top = document.body.scrollTop - win_height/2;
		//var win_margin_left = document.body.scrollLeft - win_width/2;
	
		var win_style = "";
		//if(isCenter){
			win_style = "width:"+win_width+"px; height:"+win_height+"px;top:0;left:0;position:absolute;z-index:"+win_z_index+";";//"top:50%;left:50%;margin-top:"+win_margin_top+"px;margin-left:"+win_margin_left+"px;position: absolute;z-index:"+win_z_index+";";
		//}else{
		//	win_style = "width:"+win_width+"px; height:"+win_height+"px;";//"top:"+win_top+"px;left:"+win_left+"px;position: absolute;z-index:"+win_z_index+";";
		//}
		if(document.documentMode<7){
			quirks_width = win_width-0+12;
			quirks_height = win_height-0+14;
		}
		
		var win_html = "";
		if(need_shade){
			shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
			shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
			win_html += '<div style="width:'+shade_width+'px; height:'+shade_height+'px; background:black; filter:alpha(opacity=0); opacity:0; position:absolute; top:0px; left:0px; z-index:'+win_z_index+';"></div>'
		}
		win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">'
		if(document.documentMode < 7){
			win_html+=   '<div class="lightbox" style="width:'+quirks_width+'px; height:'+quirks_height+'px; "></div>'
		}else{
			win_html+=   '<div class="lightbox" style="width:'+win_width+'px; height:'+win_height+'px; "></div>'
		}
		win_html+=	'<div class="win_header" style="width:'+head_width+'px;height:34px;" >'
			    +	'<span class="win_name" style="" >'+win_name+'</span>'
			    +	'<span class="win_cancel" style="width:12px;height:12px;" ';
		if(win_body.substr(0,3) == "url"){
			win_html +=	'onclick="win_remove('+"'"+win_id+"'"+')"';
		}else{
			win_html +=	'onclick="dfWinRemove()"';
		}
		win_html +=		'></span>'
		+	'</div>'
		+	'<div class="win_body" style="width:'+body_width+'px;height:'+body_height+'px;';
		if(win_body.substr(0,3) == "url"){
			win_html += '" ><iframe id="'+win_id+'_iframe" src="'+win_body.substr(4)+'?win_id='+win_id+'&colNames='+colNames+'&rowNames='+rowNames+'&queryCondition='+queryCondition+'&params='+params+'" style="width:100%;height:100%;border:0;overflow: hidden;" marginwidth="0" frameborder="0" marginheight="0" marginwidth="0"></iframe>';
		}else if(win_body.substr(0,4) == "load"){
			win_html += 'position: absolute;overflow:auto;" id="loadDiv_'+win_id+'" >';
		}else{
			win_html += 'padding:20px;" >'+win_body;
		}
		win_html +=	'</div></div>';
		
		var div = document.createElement("div");
		div.id = win_id;
		div.innerHTML = win_html;
		div.style.zIndex = win_z_index;
		document.body.appendChild(div);
		if(win_body.substr(0,4) == "load"){
			jQuery("#loadDiv_"+win_id).load(win_body.substr(5),{'colNames':colNames,'rowNames':rowNames,'queryCondition':queryCondition,'params':params});
		}
		if(win_body.substr(0,3) != "url"){
			dfWinIdArrayNum++;
			dfWinIdArray[dfWinIdArrayNum] = win_id;
		}else{
			dfWinIdIframeArrayNum++;
			dfWinIdIframeArray[dfWinIdIframeArrayNum] = win_id;
		}
		
		/*================居中显示对象==================*/
		win_border_obj = jQuery("#win_border_"+win_id);
		
		setObjMiddleX(win_border_obj[0]);
		setObjMiddleY(win_border_obj[0]);
		
		drag(win_border_obj[0], win_border_obj.children()[1]);
	}
}
/*导出*/
function export_win(body_width,body_height,win_name,win_id,win_body,need_shade,isCenter,win_left,win_top,columnNames){
	if(document.getElementById(win_id)){
		document.getElementById(win_id).style.display = "";
	}else{
		if(win_body.substr(0,3) == "url"){
			var win_height = body_height + 36 ;
			var win_width = body_width + 2 ;
		}else{
			var win_height = body_height + 76 ;
			var win_width = body_width + 42 ;
		}
		var head_width = win_width - 2;
		
		var win_margin_top = -win_height/2;
		var win_margin_left = -win_width/2;
	
		var win_style = "";
		if(isCenter){
			win_style = "width:"+win_width+"px; height:"+win_height+"px;top:50%;left:50%;margin-top:"+win_margin_top+"px;margin-left:"+win_margin_left+"px;position: fixed;z-index:9999;";
		}else{
			win_style = "width:"+win_width+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;";
		}
		
		var win_html = "";
		if(need_shade){
			shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
			shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
			win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;"></div>'
		}
		win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">'
		+	'<div class="win_header" style="width:'+head_width+'px;height:34px;" >'
		+		'<span class="win_name" style="" >'+win_name+'</span>'
		+		'<span class="win_cancel" style="width:12px;height:12px;" onclick="win_remove('+"'"+win_id+"'"+')"></span>'
		+	'</div>'
		+	'<div class="win_body" style="width:'+body_width+'px;height:'+body_height+'px;';
		if(win_body.substr(0,3) == "url"){
			win_html += '" ><iframe src="'+win_body.substr(4)+'?win_id='+win_id+'&columnNames='+columnNames+'" style="width:100%;height:100%;border:0;overflow:hidden;" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"></iframe>';
		}else if(win_body.substr(0,4) == "load"){
			win_html += 'position: absolute;overflow:auto;"  id="loadDiv_'+win_id+'" >';
		}else{
			win_html += 'padding:20px;" >'+win_body;
		}
		win_html +=	'</div></div>';
		var div = document.createElement("div");
		div.id = win_id;
		div.style.zIndex = "9999";
		div.innerHTML = win_html;
		document.body.appendChild(div);
		if(win_body.substr(0,4) == "load"){
			jQuery("#loadDiv_"+win_id).load(win_body.substr(5));
		}
	}
}
//modified by wangsy 2013-04-21 add for 提示框模拟alert
/*参数说明：窗口名称,提示文字*/
function win_alert(win_name,win_body,fun1){
	shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
	shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
	//modified by wangsy 2013-7-23 update for 优化id设置
	var id = getNewId();
	var win_html = '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;z-index:9998;"></div>'
	+  '<div class="win_border" id="win_alert_'+id+'" style="top:0;left:0;position:absolute;z-index:9999;width:372px;">'
	if(document.documentMode<7){
	    win_html +=   '<div class="lightbox" style="width:386px; height:253px; "></div>'
		+	'<div class="win_header" style="height:34px;margin-right:-14px;" >'
	    }else{
		win_html+=   '<div class="lightbox" style="width:372px; height:237px; "></div>'
		+	'<div class="win_header" style="height:34px;" >'
		}
	win_html+=	'<span class="win_name_alert" style="">'+win_name+'</span>'
			+	'<span class="win_cancel" style="width:12px;height:12px;" onclick="alert_remove(this)"></span>'
			+	'</div>'
			+	'<div class="win_body" style="padding:20px;padding-bottom:10px;width:330px;height:170px;">'
			+	'	<div class="win_body_title">温馨提示</div>'
			+	'	<div style="font-size:12px;color:#3f3f3f;margin-top:30px;text-indent:2em;width:330px;height:78px;">'+win_body+'</div>'
			+	'	<div><table align="center" cellspacing=10px; border=0px;><tr><td><input type="button" value="确　定" id="alert_submit_id" class="redbutton" onclick="alert_submit(this,'+fun1+')" /></td></tr></table></div>'
			+	'</div>'
			+  '</div>';
	
	var div = document.createElement("div");
	div.id = "win_alert"+id;
	div.innerHTML = win_html;
	document.body.appendChild(div);
	
	win_border_obj = jQuery("#win_alert_"+id);
	
	setObjMiddleX(win_border_obj[0]);
	setObjMiddleY(win_border_obj[0]);
	
	//modified by wangsy 2013-7-22 update for 为正确获取页面滚动条高度
	jQuery("#alert_submit_id").focus();
	
	drag(win_border_obj[0], win_border_obj.children()[1]);
}

function alert_submit(winObj,fun1){
	if(typeof(eval(fun1))=="function" ){
		eval(fun1)();
	}
	jQuery(winObj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).remove();	
}

function alert_remove(win_cancel){
	jQuery(win_cancel.parentNode.parentNode.parentNode).remove();
}

//modified by wangsy 2013-04-21 add for 确认框模拟confirm
/*参数说明：窗口名称,提示文字,点击确定时的事件,点击取消时的事件*/
function win_confirm(win_name,win_body,fun_true,fun_false){
	shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
	shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
	
	//modified by wangsy 2013-7-23 update for 优化id设置
	var id = getNewId();
	var win_html = '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;z-index:9998;top:0px;left:0px;"></div>'
	+	'<div class="win_border" id="win_confirm_'+id+'" style="top:0;left:0;position:absolute;z-index:9999;width:372px;">';
	if(document.documentMode<7){
		    win_html +=   '<div class="lightbox" style="width:386px; height:253px; "></div>'
			+	'<div class="win_header" style="height:34px;margin-right:-14px;" >'
	}else{
			win_html+=   '<div class="lightbox" style="width:372px; height:237px; "></div>'
			+	'<div class="win_header" style="height:34px;" >'
	}
	win_html+=	'<span class="win_name_alert" style="">'+win_name+'</span>'
			+	'<span class="win_cancel" style="width:12px;height:12px;" onclick="confirm_remove(this)"></span>'
			+	'</div>'
			+	'<div class="win_body" style="padding:20px;padding-bottom:10px;width:330px;height:170px;">'
			+	'	<div class="win_body_title">温馨提示</div>'
			+	'	<div style="font-size:12px;color:#3f3f3f;margin-top:30px;text-indent:2em;width:330px;height:78px;">'+win_body+'</div>'
			+	'	<div><table align="center" cellspacing=10px; border=0px;><tr><td><input type="button" value="确　定" class="redbutton" id="confirm_submit_id" onclick="confirm_submit(this,'+fun_true+')" /></td><td><input type="button" value="取　消" class="graybutton" onclick="confirm_submit(this,'+fun_false+')" /></td></tr></table></div>'
			+	'</div>'
			+  '</div>';
	
	var div = document.createElement("div");
	div.id = "win_confirm"+id;
	div.innerHTML = win_html;
	document.body.appendChild(div);
	
	win_border_obj = jQuery("#win_confirm_"+id);
	
	setObjMiddleX(win_border_obj[0]);
	setObjMiddleY(win_border_obj[0]);
	
	//modified by wangsy 2013-7-22 update for 为正确获取页面滚动条高度
	jQuery("#confirm_submit_id").focus();
	
	drag(win_border_obj[0], win_border_obj.children()[1]);
	
}

function confirm_submit(winObj){
	jQuery(winObj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).remove();
}

function confirm_remove(win_cancel){
	jQuery(win_cancel.parentNode.parentNode.parentNode).remove();
}

//modified by wangsy 2013-04-25 add for 图片浏览 begin
function simpleImg(){
	height = Number(jQuery(".dfImg").css("height").replace("px",""));
	width = Number(jQuery(".dfImg").css("width").replace("px",""));
	if(height>width && height>180){
		jQuery(".dfImg").css("height","180px");
	}else if(width>180){
		jQuery(".dfImg").css("width","180px");
	}
	
	height = Number(jQuery(".dfImg").css("height").replace("px",""));
	width = Number(jQuery(".dfImg").css("width").replace("px",""));
	//图片居中
	margin = (180-width)/2;
	jQuery(".dfImg").css("margin-left",margin);
	margin = (180-height)/2;
	jQuery(".dfImg").css("margin-top",margin);
	//放大镜右下角
	margin = (180-height)/2-30;
	jQuery(".dfImg").next().css("margin-top",margin);
}

function detailedImg(){
	height = Number(jQuery(".dfImg").css("height").replace("px",""));
	width = Number(jQuery(".dfImg").css("width").replace("px",""));
	
	if(height>width){
		jQuery(".dfImg").parent().css("height",height);
		jQuery(".dfImg").parent().css("width",height);
		margin = (height-width)/2;
		jQuery(".dfImg").parent().css("margin-top",-height/2+10);
		jQuery(".dfImg").parent().css("margin-left",-height/2+10);
		jQuery(".dfImg").css("margin-left",margin);
	}else{
		jQuery(".dfImg").parent().css("height",width);
		jQuery(".dfImg").parent().css("width",width);
		margin = (width-height)/2;
		jQuery(".dfImg").parent().css("margin-top",-width/2+10);
		jQuery(".dfImg").parent().css("margin-left",-width/2+10);
		jQuery(".dfImg").css("margin-top",margin);
	}
}

jQuery(document).ready(function(){
	jQuery(".dfShowImage").live("click",function(){
		if(jQuery("#dfImagePanel")[0]){
			jQuery("#dfImagePanel").remove();
		}
		/*获取窗口层级*/
		var win_z_index = 9999;
		
		win_width = 200;
		win_height = 200;
		
		var win_margin_top = -win_height/2;
		var win_margin_left = -win_width/2;
		
		win_style = "width:180px; height:180px;padding:10px;top:50%;left:50%;margin-top:"+win_margin_top+"px;margin-left:"+win_margin_left+"px;position: fixed;z-index:"+win_z_index+";border:1px solid #bbbbbb;background:#ffffff;";
		
		imgUrl = jQuery(this).attr("imgUrl");
		if(jQuery(this).attr("imgDetailUrl")){
			imgDetailUrl = jQuery(this).attr("imgDetailUrl");
		}else{
			imgDetailUrl = jQuery(this).attr("imgUrl");
		}
		
		//遮罩层
		var div_html = "";
		shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
		shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
		div_html += '<div class="removeImg" style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;z-index:'+win_z_index+';"></div>';
		
		div_html += '<div style="'+win_style+'">'
				 + '	<img src='+imgUrl+' style="" class="dfImg" onload="simpleImg()"/>'
				 + '	<div style="margin-top:-30px;*+margin-top:-34px;margin-left:150px;cursor:pointer;"><div class="dfBig" imgUrl="'+imgDetailUrl+'"></div></div>'
				 + '</div>';

		var div = document.createElement("div");
		div.innerHTML = div_html;
		div.id = "dfImagePanel";
		document.body.appendChild(div);
	});
	
	jQuery(".removeImg").live("click",function(){
		jQuery(this).parent().remove();
	});
	
	jQuery(".dfBig").live("click",function(){
		jQuery(this).parent().parent().parent().remove();
		/*获取窗口层级*/
		var win_z_index = 9999;
		
		win_width = 200;
		win_height = 200;
		
		var win_margin_top = -win_height/2;
		var win_margin_left = -win_width/2;
		
		win_style = "width:180px; height:180px;padding:10px;top:50%;left:50%;margin-top:"+win_margin_top+"px;margin-left:"+win_margin_left+"px;position: fixed;z-index:"+win_z_index+";border:1px solid #bbbbbb;background:#ffffff;";
		
		imgUrl = jQuery(this).attr("imgUrl");
		
		var div_html = "";
		//遮罩层
		shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
		shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
		div_html += '<div class="removeImg" style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;z-index:'+win_z_index+';"></div>';
		
		div_html += '<div style="'+win_style+'">'
				 + '	<img src='+imgUrl+' onload="detailedImg()" class="dfImg" />'
				 + '</div>';

		var div = document.createElement("div");
		div.innerHTML = div_html;
		div.id = "dfImagePanel";
		document.body.appendChild(div);
	});
});
//modified by wangsy 2013-04-25 add for 图片浏览 begin


/*附件上传，移除子页面的flash对象*/
function removeUploadFlash(){
	var fileUploadIframeObj = jQuery('#fileUploadIframeObj');
	if(fileUploadIframeObj!=null){
		jQuery(fileUploadIframeObj)[0].contentWindow.cancel();
	}
}
/*参数说明：触发点击事件的对象(this,用于存放窗口id),后台处理的请求(String,必填),上传子页面(win-upload,必填),上传文件类型描述(String,仅支持英文,与fileExt同时存在),上传文件类型后缀名(String,与fileDesc同时存在),文件大小(Number,单位为KB,默认为100KB),上传文件数量(Number,默认为100)*/
function upload_win(thisObj,script,winUpload,fileDesc,fileExt,sizeLimit,queueSizeLimit){
	script = encodeURIComponent(script);
	fileDesc=encodeURI(encodeURI(fileDesc));
	/*获取窗口id*/
	if(jQuery(thisObj).attr("dfWinId")){
		win_id = jQuery(thisObj).attr("dfWinId");
	}else{
		win_id = getNewId();
		jQuery(thisObj).attr("dfWinId",win_id);
	}
	body_width = 405;
	body_height = 445;
	win_name = '添加附件';
	if(winUpload!=null){
		win_body = winUpload;
	}else{
		alert("请配置上传子页面");
	}
	need_shade = true;
	isCenter = true;
	if(document.getElementById(win_id)){
		document.getElementById(win_id).style.display = "";
	}else{
		if(win_body.substr(0,3) == "url"){
			var win_height = body_height + 36 ;
			var win_width = body_width + 2 ;
			var win_width_ie7 = win_width + 10;
		}else{
			var win_height = body_height + 76 ;
			var win_width = body_width + 42 ;
		}
		var head_width = win_width - 2;
		var head_width_ie7 = win_width_ie7 - 2;
		
		var body_width_ie7 = body_width + 10;
		
	    var bgTop=window.pageYOffset   
        || document.documentElement.scrollTop   
        || document.body.scrollTop || 0; 
	    var bgLeft=window.pageXOffset   
           || document.documentElement.scrollLeft   
           || document.body.scrollLeft || 0; 
		var win_margin_top =bgTop -win_height/2;
		var win_margin_left =bgLeft -win_width/2;
	
		var win_style = "";
		if(isCenter){
			win_style = "width:"+win_width+"px;*+width:"+win_width_ie7+"px; height:"+win_height+"px;top:0;left:0;position:  absolute;z-index:9999;";
		}else{
			win_style = "width:"+win_width+"px;*+width:"+win_width_ie7+"px; height:"+win_height+"px;top:"+win_top+"px;left:"+win_left+"px;position: absolute;";
		}
		if(document.documentMode<7){
			quirks_width = win_width-0+22;
			quirks_height = win_height-0+14;
		}
		
		var win_html = "";
		if(need_shade){
			shade_width = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.scrollWidth);
			shade_height = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.scrollHeight);
			win_html += '<div style="width:'+shade_width+'px;height:'+shade_height+'px;background:black;filter:alpha(opacity=0);opacity:0;position: absolute;top:0px;left:0px;"></div>'
		}
		win_html += '<div class="win_border" id="win_border_'+win_id+'" style="'+win_style+'">';
		if(document.documentMode < 7){
			win_html +='<div class="lightbox" style="width:'+quirks_width+'px; height:'+quirks_height+'px; "></div>';
		}else{
			win_html +='<div class="lightbox" style="width:'+win_width+'px; *+width:'+win_width_ie7+'px; height:'+win_height+'px; "></div>';
		}
		win_html+=	'<div class="win_header" style="width:'+head_width+'px;*+width:'+head_width_ie7+'px;height:34px;" >'
		+		'<span class="win_name" style=" " >'+win_name+'</span>'
		+		'<span class="win_cancel" style="width:12px;height:12px;" onclick="removeUploadFlash()"></span>'
		+	'</div>'
		+	'<div class="win_body" style="width:'+body_width+'px;*+width:'+body_width_ie7+'px;height:'+body_height+'px;';
		
		win_html += '" ><iframe id="fileUploadIframeObj" src="'+win_body.substr(4)+'?script='+script+'&fileDesc='+fileDesc+'&fileExt='+fileExt+'&sizeLimit='+sizeLimit+'&queueSizeLimit='+queueSizeLimit+'&win_id='+win_id+'" style="width:100%;height:100%;border:0;overflow:hidden;" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"></iframe>';
		win_html +=	'</div></div>';
		
		var div = document.createElement("div");
		div.id = win_id;
		div.innerHTML = win_html;
		div.style.zIndex = '9999';
		document.body.appendChild(div);
		
		win_border_obj = jQuery("#win_border_"+win_id);
		
		setObjMiddleX(win_border_obj[0]);
		setObjMiddleY(win_border_obj[0]);
		
		drag(win_border_obj[0], win_border_obj.children()[1]);
	}
}

/* ========= 收缩域事件 =========== */ 
function div_hide(div_id){
	jQuery("#"+div_id).hide(500);
}
function div_show(div_id){
	jQuery("#"+div_id).show(500);
}
function div_toggle(div_id){
	jQuery("#"+div_id).toggle(500);
}

/*========================================== 日期控件 begin =================================*/
/**//**//**//**//**//**//**//**
* 返回日期
* @param d the delimiter
* @param p the pattern of your date
2006-06-25 由 www.ttkc.net 修改为根据用户指定的 style 来确定；
*/
String.prototype.toDate = function(style) {
var y = this.substring(style.indexOf('y'),style.lastIndexOf('y')+1);//年
var M = this.substring(style.indexOf('M'),style.lastIndexOf('M')+1);//月
var d = this.substring(style.indexOf('d'),style.lastIndexOf('d')+1);//日
var h = this.substring(style.indexOf('h'),style.lastIndexOf('h')+1);//时
var m = this.substring(style.indexOf('m'),style.lastIndexOf('m')+1);//分
var s = this.substring(style.indexOf('s'),style.lastIndexOf('s')+1);//秒

if(s == null ||s == "" || isNaN(s)) {s = new Date().getSeconds();}
if(m == null ||m == "" || isNaN(m)) {m = new Date().getMinutes();}
if(h == null ||h == "" || isNaN(h)) {h = new Date().getHours();}
if(d == null ||d == "" || isNaN(d)) {d = new Date().getDate();}
if(M == null ||M == "" || isNaN(M)) {M = new Date().getMonth()+1;}
if(y == null ||y == "" || isNaN(y)) {y = new Date().getFullYear();}
var dt ;
eval ("dt = new Date('"+ y+"', '"+(M-1)+"','"+ d+"','"+ h+"','"+ m+"','"+ s +"')");
return dt;
}

/**//**//**//**//**//**//**//**
* 格式化日期
* @param   d the delimiter
* @param   p the pattern of your date
* @author  meizz
*/
Date.prototype.format = function(style) {
var o = {
  "M+" : this.getMonth() + 1, //month
  "d+" : this.getDate(),      //day
  "h+" : this.getHours(),     //hour
  "m+" : this.getMinutes(),   //minute
  "s+" : this.getSeconds(),   //second
  "w+" : "天一二三四五六".charAt(this.getDay()),   //week
  "q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
  "S"  : this.getMilliseconds() //millisecond
}
if(/(y+)/.test(style)) {
  style = style.replace(RegExp.$1,
  (this.getFullYear() + "").substr(4 - RegExp.$1.length));
}
for(var k in o){
  if(new RegExp("("+ k +")").test(style)){
    style = style.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
      ("00" + o[k]).substr(("" + o[k]).length));
  }
}
return style;
}
/**//**//**//**//**//**//**//**
 * 返回日期
 * @param d the delimiter
 * @param p the pattern of your date
2006-06-25 由 www.ttkc.net 修改为根据用户指定的 style 来确定；
 */
String.prototype.dfToDate = function(style) {
	var y = this.substring(style.indexOf('y'),style.lastIndexOf('y')+1);//年
	var M = this.substring(style.indexOf('M'),style.lastIndexOf('M')+1);//月
	var d = this.substring(style.indexOf('d'),style.lastIndexOf('d')+1);//日
	var h = this.substring(style.indexOf('h'),style.lastIndexOf('h')+1);//时
	var m = this.substring(style.indexOf('m'),style.lastIndexOf('m')+1);//分
	var s = this.substring(style.indexOf('s'),style.lastIndexOf('s')+1);//秒
	
	if(s == null ||s == "" || isNaN(s)) {s = new Date().getSeconds();}
	if(m == null ||m == "" || isNaN(m)) {m = new Date().getMinutes();}
	if(h == null ||h == "" || isNaN(h)) {h = new Date().getHours();}
	if(d == null ||d == "" || isNaN(d)) {d = new Date().getDate();}
	if(M == null ||M == "" || isNaN(M)) {M = new Date().getMonth()+1;}
	if(y == null ||y == "" || isNaN(y)) {y = new Date().getFullYear();}
	var dt ;
	eval ("dt = new Date('"+ y+"', '"+(M-1)+"','"+ d+"','"+ h+"','"+ m+"','"+ s +"')");
	return dt;
}

/**//**//**//**//**//**//**//**
 * 格式化日期
 * @param   d the delimiter
 * @param   p the pattern of your date
 * @author  meizz
 */
Date.prototype.dfformat = function(style) {
	var o = {
			"M+" : this.getMonth() + 1, //month
			"d+" : this.getDate(),      //day
			"h+" : this.getHours(),     //hour
			"m+" : this.getMinutes(),   //minute
			"s+" : this.getSeconds(),   //second
			"w+" : "天一二三四五六".charAt(this.getDay()),   //week
			"q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
			"S"  : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(style)) {
		style = style.replace(RegExp.$1,
				(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		if(new RegExp("("+ k +")").test(style)){
			style = style.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
						("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return style;
}

/**
* 设置日期比较
* @author:wangjian
* @param fDate 日期格式字符串 例如:2012-07-01 13:58:12
* @param sDate 日期格式字符串 例如:2012-08-01 13:58:12
*/
function compareDate(fDate,sDate){
	if(fDate==''||fDate==undefined) return 0;  
	if(sDate==''||sDate==undefined) return 0;
	if(fDate.length == 4){
		fDate+="-01-01";
		sDate+="-01-01";
	}else if(fDate.length == 7){
		fDate+="-01";
		sDate+="-01";
	}
	
    var fd = new Date(fDate.replace(/\-/g, "\/"));
    var sd = new Date(sDate.replace(/\-/g, "\/"));
    return Date.parse(fd)-Date.parse(sd);
}
//--> 
//=========================== 日期控件 ============================//
/*
 * 使用全局变量目录  
 * dfCal 										页面惟一日期控件 
 * preSelectTdClassName 						上一个选择日期的样式(第一个首选是当前日期的的特殊灰底框)
 * dateIsDate 									选择的日期
 * 
 * 使用全局方法   
 * Date.prototype.dfformat						格式化日期
 * String.prototype.dfToDate					将字符串转为日期对象
 * dfCalendar.prototype.setCalPosition(thisObj,C调整日期控件的显示位置
 * jQuery(".dfCalendarTimeInput").live("keydown"数字输入框,控制输入框只能输入有效数字
 * dfCalendar.prototype.dfUpTimeDate	    	上键调整时间：默认'小时'
 * dfCalendar.prototype.dfDownTimeDate   		下键调整时间：默认'小时'
 * dfCalendar.prototype.dfKeyUpTimeDate         键盘上键调整时间
 * dfCalendar.prototype.dfKeyDownTimeDate       键盘下键调整时间
 * dfCalendar.prototype.dfDateTest(CalendarTimeI设置时间输入框校验
 * dfCalendar.prototype.bindFunc                对日期控件绑定注册事件
 * dfCalendar.prototype.compareDate             设置日期比较
 * 
 * 日期控件方法
 * function dfCalendar()						日期控件类
 * dfCalendar.prototype.language				语言包
 * dfCalendar.prototype.formatMode				日期格式标记方法
 * dfCalendar.prototype.getMonthViewArray		返回某月的日(数组)
 * dfCalendar.prototype.getElement				获取日期控件页面元素
 * dfCalendar.prototype.draw					画出日期控件无数据部分
 * dfCalendar.prototype.bind					在画出的日期控件中日的单元格
 * dfCalendar.prototype.changeInput				调整日期控件中所有输入框以符合当前日期
 * dfCalendar.prototype.goPrevYear				向前一年
 * dfCalendar.prototype.goNextYear				向后一年
 * dfCalendar.prototype.goPrevMonth				向前一月
 * dfCalendar.prototype.goNextMonth				向前一月
 * dfCalendar.prototype.resetDate				重置
 * dfCalendar.prototype.goSelectDay				选中某日
 * dfCalendar.prototype.calInputControl			控制输入框只能输入有效数字
 * dfCalendar.prototype.returnDate				返回日期，写入输入框
 * dfCalendar.prototype.hide					隐藏日期控件
 * dfCalendar.prototype.show					显示日期控件
 * 
 * dfCalendar.prototype.currentDate				 按钮方法_现在
 * dfCalendar.prototype.submitDate				 按钮方法_确定
 * dfCalendar.prototype.deleteDate				 按钮方法_取消
 */

var dfCal = null;
var dfCalClicked = 0; //为了点击别处使得日历面板隐藏时，判断点击点是否为日期弹出图标。是则更改为1，打断隐藏面板
var dfCalmouseIn = 0; //判断鼠标所在位置,1为日历面板内,0为日历面板外
//日历类
function dfCalendar(data){
	//参数属性
	if(!data){
		data = {};
	}
	this.thisInput = data.thisInput?data.thisInput:null;//当前日期输入框
	this.thisInputPanel = data.thisInputPanel?data.thisInputPanel:this.thisInput;//当前日期输入框容器，若无时使用当前日期输入框
	this.thisI = data.thisI?data.thisI:null;//日期标记
	this.dateFormat = data.dateFormat?data.dateFormat:"yyyy-MM-dd hh:mm:ss";//日期格式
	this.dateFormatMode = this.formatMode(this.dateFormat);
	
	this.lang = data.lang?data.lang:0;//语言类型
	
	this.date = data.date?data.date:new Date();//当前日期
	this.year = this.date.getFullYear();
	this.month = this.date.getMonth();
	this.day = this.date.getDate();
	this.hour = this.date.getHours();
	this.minute = this.date.getMinutes();
	this.second = this.date.getSeconds();
	
	this.fDate = data.fDate;//可选区间
	this.lDate = data.lDate;
	
	//工具属性，
	this.selectTd = null;    
	this.preSelectTd = null;
	
	this.panel = null;  //本日期html窗口容器
	
	this.TimeYInputError = 0;//年份，用于当输入有误时禁止提交
	this.TimeMonInputError = 0;//月份，0为正确，1为错误
	this.TimeHInputError = 0;
	this.TimeMInputError = 0;
	this.TimeSInputError = 0;
	
	this.changeTimeInput = "h";
	this.CalendarNumInput = null;//日历控件输入框：年月时分秒的值
	this.CalTimeInput = null;//日历控件输入框

}

/**//**//**//**//**//**//**//**
* 语言包
*/
dfCalendar.prototype.language = {
		"year"   : [[""], [""]],
		"months" : [["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
		      ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
		       ],
		"weeks"  : [["日","一","二","三","四","五","六"],
		      ["SUN","MON","TUR","WED","THU","FRI","SAT"]
		       ],
		"hour"  : [["时"], ["H"]],
		"minute"  : [["分"], ["M"]],
		"second"  : [["秒"], ["S"]],
		"clear"  : [["清空"], ["CLS"]],
		"today"  : [["今天"], ["TODAY"]],
		"submit"  : [["确定"], ["OK"]],//pickMode 精确到年、月时把今天变成“确定”
		"close"  : [["关闭"], ["CLOSE"]]	
}

/**//**//**//**//**//**//**//**
* 日期格式精度判断
*/
dfCalendar.prototype.formatMode = function(dateFormat){
	if(dateFormat.indexOf('y')< 0) {return 1;}//默认精度为秒
	if(dateFormat.indexOf('M')< 0) {return 6;}//精度为年
	if(dateFormat.indexOf('d')< 0) {return 5;}//精度为月
	if(dateFormat.indexOf('h')< 0) {return 4;}//精度为日
	if(dateFormat.indexOf('m')< 0) {return 3;}//精度为时
	if(dateFormat.indexOf('s')< 0) {return 2;}//精度为分
	return 1;//精度为秒
}
/**//**//**//**//**//**//**//**
* 返回当前月的日数组
* @param y this year
* @param m this month
* @return mvArray the dayArr of this month
*/
dfCalendar.prototype.getMonthViewArray = function(y,m){
	m = m-1;
	var mvArray = [];
	var dayOfFirstDay = new Date(y, m, 1).getDay();
	var daysOfMonth = new Date(y, m + 1, 0).getDate();
	var daysOfPrevMonth = new Date(y, m, 0).getDate();
	
	for (var i = 0; i < 42; i++) {
		if(i<dayOfFirstDay){
			mvArray[i] = daysOfPrevMonth - dayOfFirstDay + i;
		}else if(i<dayOfFirstDay + daysOfMonth){
			mvArray[i] = i - dayOfFirstDay + 1;
		}else{
			mvArray[i] = i - dayOfFirstDay - daysOfMonth + 1;
		}
	}
	return mvArray;
}
/**//**//**//**//**//**//**//**
 * 获取日期控件页面元素
 * queryCondition 使用jQuery选择器规则
 */
dfCalendar.prototype.getElement = function(queryCondition){
	return jQuery(this.panel).find(queryCondition);
}
//调整日期控件的显示位置
dfCalendar.prototype.setCalPosition = function(thisObj,CalendarObj){
	var CalInputArea = this.thisInputPanel;//取当前输入框
	var ContentArea = this.thisInputPanel.parentNode;//取当前输入框的父级
	var ContentScrollHeight =null;
	var ContentScrollWidth = null;
	while(ContentArea.nodeName.toLowerCase() != "body"){
		ContentScrollHeight += ContentArea.scrollTop;//获取滚动条滚动过的高度
		ContentScrollWidth += ContentArea.scrollLeft;//获取滚动条滚动过的宽度
		ContentArea = ContentArea.parentNode;
	}
	var abc = getAbsPoint(CalInputArea);
	var InputAreaX = abc.x-ContentScrollWidth;//获取当前输入框的绝对位置
	var InputAreaY = abc.y-ContentScrollHeight;//当前输入框到body左上角的距离
	var CalPosX = (InputAreaX)+"px";//获取日历的x轴位置
	var CalInputToTop = InputAreaY;//输入框到当前页面顶部的距离
	var CalInputToBottom = jQuery(document).height()-InputAreaY-CalInputArea.offsetHeight;//输入框到当前页面底部的距离
	var CalHeight = CalendarObj.offsetHeight + 14;//获取日历高度
	
	if((InputAreaX + CalendarObj.offsetWidth + 14) > jQuery(document).width()){
		CalendarObj.style.left =jQuery(document).width() - CalendarObj.offsetWidth - 14 + "px";
	}else{
		CalendarObj.style.left = CalPosX;
	}
	if(CalInputToBottom >= CalHeight){
		CalendarObj.style.top = (InputAreaY + CalInputArea.offsetHeight)+"px";
	}else if(CalInputToBottom < CalHeight && CalHeight <= CalInputToTop){
		//日历距离浏览器底部距离小于日历高度，距离浏览器顶部距离大于日历高度，显示在输入框上方 27=41-14 (14是lightbox在日历面板外围的总高度)
		CalendarObj.style.top = (InputAreaY + CalInputArea.offsetHeight) - CalHeight - 27 + "px";
	}else if(CalInputToBottom < CalHeight && CalHeight > CalInputToTop){
		//日历距离浏览器底部距离小于日历高度，距离浏览器顶部距离小于日历高度，日历在垂直方向（Y）居中
		if(CalHeight > jQuery(window).height()){
			//浏览器可视高度小于日历高度，日历距离浏览器顶部3px
			CalendarObj.style.top = 3+"px";
		}else{
			//浏览器可视高度大于等于日历高度时，日历向垂直方向（Y）居中
			CalendarObj.style.top = Math.round((jQuery(window).height()-CalHeight)/2)+"px";
		}
	}
};


//画出日期控件无数据部分
dfCalendar.prototype.draw = function(thisObj){
	if(this.panel){
		this.panel.style.display = "block";
		this.setCalPosition(thisObj,this.panel);
		return false;
	}
	var html = "";
	var tr = 6;
	var td = 7;
	if(document.documentMode < 7){
		html += '<div class="dfCalLightbox" style="width:204px; height:341px;"></div>'
		     +  '<div class="dfCalHeader" style="width:190px;">';
	}else{
        html +=	'<div class="dfCalLightbox"></div>'
        	 +  '<div class="dfCalHeader">';
	}
	    html +=		'<div class="dfHeaderCancel"></div>添加日期与时间'
    		 +		'</div>'
    		 +	'<div class="dfCalBody">'
        	 +		'<div class="dfCalendar">'
             +			'<div class="dfCalYear">'
             +				'<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle"><table><tr><td style="border:0;" >'
             +			    	'<div class="dfCalYearGo dfCalYearLeftGo" ></div>'
			 +					'<div class="dfCalYearGo dfCalMonthLeftGo" ></div>';
    if(document.documentMode < 7){
	    html += 				'<div class="dfCalYearNum"><div class="borderWhite1"></div><input class="dfCalYearInput dfCalendarTimeInput" style="width:33px;"></input></div>'
			 +  				'<div class="dfCalText24">年</div>'
		     +  				'<div class="dfCalMonthNum">'
	      	 +					'<div class="dfCalMinShadow" dfCalShadowLevel="5"></div>'
	    	 + 					'<div class="borderWhite1"></div><input class="dfCalMonthInput dfCalInput" style="width:17px;"></input></div>';
	}else{
		html += 				'<div class="dfCalYearNum"><div class="borderWhite1"></div><input class="dfCalYearInput dfCalendarTimeInput"></input></div>'
			 +  				'<div class="dfCalText24">年</div>'
			 +  				'<div class="dfCalMonthNum">'
	       	 +					'<div class="dfCalMinShadow" dfCalShadowLevel="5"></div>'
	    	 +	 				'<div class="borderWhite1"></div><input class="dfCalMonthInput dfCalInput dfCalendarTimeInput"></input></div>';
	}
	    html +=             	'<div class="dfCalText24">月</div>'
		 	 +					'<div class="dfCalYearGo dfCalMonthRightGo"></div>'
		 	 +					'<div class="dfCalYearGo dfCalYearRightGo" ></div>'
             +				'</td></tr></table></td></tr></table>'
             +			'</div>'
             +			'<div class="dfCalWeek">'
			 +				'<div class="borderWhite"></div>'
			 +				'<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr>';
	for( var i=0; i<td; i++){
		var redColor = "";
		if(i==0||i==6){redColor = "color:#d71920;";}
		html += 				'<td style="width:25px; height:27px; font-family:微软雅黑; font-size:14px; text-align:center; line-height:27px;'+redColor+'">'+dfCal.language["weeks"][this.lang][i]+'</td>';
	}
	    html += 			'</tr></table>'
			 +			'</div>'
             +			'<div class="dfCalDateTable">'
	      	 +			'<div class="dfCalMaxShadow" dfCalShadowLevel="4"></div>'
       		 +    			'<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">';
	for( var i=0; i<tr; i++){
		html +=					'<tr>';
		for( var j=0; j<td; j++){
			html +=					'<td class="tdDatePanel"></td>';
		}
		html +=					'</tr>';
	}
	    html +=				'</table>'
             +   		'</div>';
    if(document.documentMode < 7){
    	html += 		'<div class="dfCalSelectTime" style="margin-top:0;">'
             +  			'<div class="borderWhite"></div>'
    		 +              '<table style="margin-left:13px; margin-top:5px;float:left;width:148px;"><tr><td>'
    		 +  				'<div class="dfCalHour">'
	         +						'<div class="dfCalMinShadow" dfCalShadowLevel="3" ></div>'
        	 +					'<div class="borderWhite1"></div><input class="dfCalHourInput dfCalendarTimeInput" style="width:17px;"></input></div>'
		     + 					'<div class="dfCalText20">:</div>'
             +  				'<div class="dfCalMinute">'
             +						'<div class="dfCalMinShadow" dfCalShadowLevel="2"></div>'
        	 +	 				'<div class="borderWhite1"></div><input class="dfCalMinuteInput dfCalendarTimeInput" style="width:17px;"></input></div>'
		     +  				'<div class="dfCalText20">:</div>'
             +  				'<div class="dfCalSecond">'
             +						'<div class="dfCalMinShadow" dfCalShadowLevel="1"></div>'
             +    				'<div class="borderWhite1"></div><input class="dfCalSecondInput dfCalendarTimeInput" style="width:17px;"></input></div>'   
             +                  '<div class="dfCalUpDown" style="width:31px;"><div class="dfCalTimeUp"></div><div class="dfCalTimeDown"></div></div>';
    }else{
    	html += 		'<div class="dfCalSelectTime" style="margin-top:0;">'
             +  			'<div class="borderWhite"></div>'
    		 +              '<table style="margin-left:13px; margin-top:5px;float:left;width:148px;border-collapse:collapse;"><tr><td>'
    		 +  				'<div class="dfCalHour">'
		     +						'<div class="dfCalMinShadow" dfCalShadowLevel="3"></div>'
		     +					'<div class="borderWhite1"></div><input class="dfCalHourInput dfCalendarTimeInput"></input></div>'
		     +  				'<div class="dfCalText20">:</div>'
             +  				'<div class="dfCalMinute">'
	       	 +						'<div class="dfCalMinShadow" dfCalShadowLevel="2"></div>'
	    	 +	 				'<div class="borderWhite1"></div><input class="dfCalMinuteInput dfCalendarTimeInput"></input></div>'
		     +  				'<div class="dfCalText20">:</div>'
             +  				'<div class="dfCalSecond">'
		     +						'<div class="dfCalMinShadow" dfCalShadowLevel="1"></div>'
   			 +					'<div class="borderWhite1"></div><input class="dfCalSecondInput dfCalendarTimeInput"></input></div>'
             +					'<div class="dfCalUpDown"><div class="dfCalTimeUp"></div><div class="dfCalTimeDown"></div></div>';
    }
        html +=       		'</td></tr></table>'
             +   		'</div>'
             +		'</div>'
             +		'<div class="dfCalButtonArea">'
             +			'<div class="dfCalButton dfCurrentButton">现 在</div>'
             +			'<div class="dfCalButton dfCalSubmitButton">确 定</div>'
             +			'<div class="dfCalButton dfCalResetButton">重 置</div>'
             +			'<div class="dfCalButton dfCalCancelButton">取 消</div>'
             +		'</div>'
             +'</div>';
             
     var CalendarHomemake = document.createElement("div");
     CalendarHomemake.className = "dfCalendarPanel";
     CalendarHomemake.id = "dfCalendarPanel";
     CalendarHomemake.style.position = "absolute";
     CalendarHomemake.style.left = "0px";
     CalendarHomemake.style.top = "0px";
     
     CalendarHomemake.innerHTML = html;
	 document.body.appendChild(CalendarHomemake);
	 
	 this.panel = CalendarHomemake;
	
	 this.setCalPosition(thisObj,CalendarHomemake); 
	 
	 if(document.documentMode<7){
		 jQuery('.dfCalDateTable').each(function(){
			var trs = jQuery(this).children().children().children("tr");//tr
			for(var i=0; i<trs.length; i++){
				var td = jQuery(trs[i]).children("td");
				jQuery(td[0]).css("border-left","0px");
			}
	 	});
	 }
	this.bindFunc();

}
//判断时间精度，决定遮罩层的显示与否
dfCalendar.prototype.changeShadowByFormat = function(){
	var shadowDiv = this.getElement("[dfCalShadowLevel]");
	var dateFormatMode = this.dateFormatMode;
	shadowDiv.each(function(){
		var dfCalShadowLevel = jQuery(this).attr("dfCalShadowLevel");
		if(dfCalShadowLevel>=dateFormatMode){
			jQuery(this).hide();
		}else{
			jQuery(this).show();
		}
	});
}

//对日期控件绑定注册事件
dfCalendar.prototype.bindFunc = function(){
	var dfThisCal = this;
	//现在
	this.getElement(".dfCurrentButton")[0].onclick = function(){dfThisCal.currentDate();};
	//确定
	this.getElement(".dfCalSubmitButton")[0].onclick = function(){dfThisCal.submitDate();};
	//重置
	this.getElement(".dfCalResetButton")[0].onclick = function(){dfThisCal.resetDate();};
	//取消
	this.getElement(".dfCalCancelButton")[0].onclick = function(){dfThisCal.deleteDate();};
	//上翻
	this.getElement(".dfCalTimeUp")[0].onclick = function(){dfThisCal.dfUpTimeDate();};
	//下翻
	this.getElement(".dfCalTimeDown")[0].onclick = function(){dfThisCal.dfDownTimeDate();};
	//上一年
	this.getElement(".dfCalYearLeftGo")[0].onclick = function(){dfThisCal.goPrevYear();};
	//下一年
	this.getElement(".dfCalYearRightGo")[0].onclick = function(){dfThisCal.goNextYear();};
	//上一月
	this.getElement(".dfCalMonthLeftGo")[0].onclick = function(){dfThisCal.goPrevMonth();};
	//下一月
	this.getElement(".dfCalMonthRightGo")[0].onclick = function(){dfThisCal.goNextMonth();};
	//叉号
	this.getElement(".dfHeaderCancel")[0].onclick = function(){dfThisCal.hide();};
	//数字输入框,控制输入框只能输入有效数字
	for(var i=0;i<5;i++){
		this.getElement(".dfCalendarTimeInput")[i].onkeydown = function(event){
			if(!((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=37 && event.keyCode<=40) || event.keyCode==46 || event.keyCode==8 || event.keyCode==116 )){
				return false;
			}
			if(event.keyCode==38){
				//38：上
				dfThisCal.dfKeyUpTimeDate(dfThisCal.changeTimeInput); 
				//上下键时，阻止光标移动 
				return false;
			}
			if(event.keyCode==40){
				//38：上
				dfThisCal.dfKeyDownTimeDate(dfThisCal.changeTimeInput); 
				//上下键时，阻止光标移动 
				return false;
			}
		};
	}
	this.getElement(".dfCalYearInput").live("focus",function(){
		dfCal.changeTimeInput = "y";
	});
	this.getElement(".dfCalMonthInput").live("focus",function(){
		dfCal.changeTimeInput = "mo";
	}); 
	this.getElement(".dfCalHourInput").live("focus",function(){ 
		dfThisCal.changeTimeInput = "h";
	});
	this.getElement(".dfCalMinuteInput").live("focus",function(){
		dfThisCal.changeTimeInput = "m";
	});
	this.getElement(".dfCalSecondInput").live("focus",function(){
		dfThisCal.changeTimeInput = "s";
	});
	//设置时间输入框校验
	this.getElement(".dfCalendarTimeInput").live("blur",function(){
		dfThisCal.dfDateTest(this);
		dfThisCal.bind();
	});
	jQuery("body").live("click",function(e){
		e = e || window.event;
		if(dfCalmouseIn == 0){ 
			if(e.target != dfThisCal.thisI){
				jQuery(".dfCalendarPanel").hide();
			}
		}
	});
}

//在画出的日期控件中绑定数据及绑定数据对应事件
dfCalendar.prototype.bind = function(){
	var tdDatePanelArr = this.getElement(".tdDatePanel");
	
	//wangsy 20130929 取代全局变量dfCal
	var thisCalendarObj = this;
	
	var y = this.year;
	var m = this.month;
	
	var dayOfFirstDay = new Date(y, m, 1).getDay();//当前月第一天是星期几
	var daysOfMonth = new Date(y, m + 1, 0).getDate();//当前月一共有多少天
	var daysOfPrevMonth = new Date(y, m, 0).getDate();//上个月一共有多少天
	
	var currentDate = new Date();
	
	for (var i = 0; i < 42; i++) {
		if(i<dayOfFirstDay){//上月日期格
			tdDatePanelArr[i].innerHTML = daysOfPrevMonth - dayOfFirstDay + i + 1;
			tdDatePanelArr[i].className = "tdDatePanel dfCalNoThisMonth";
			//点击上月日期格跳至上月
			tdDatePanelArr[i].onclick = function(){thisCalendarObj.goPrevMonth();};
		}else if(i<dayOfFirstDay + daysOfMonth){//本月日期格
			var dayHtml = i - dayOfFirstDay + 1;
			tdDatePanelArr[i].innerHTML = dayHtml;
			var dateValue = this.year+"-"+(this.month-0+1)+"-"+dayHtml+" "+this.hour+":"+this.minute+":"+this.second;
			if(this.fDate && this.compareDate(dateValue,this.fDate)<0){
				tdDatePanelArr[i].className = "tdDatePanel dfCalOutOfLimit";//超范围
				tdDatePanelArr[i].onclick = function(){};
				continue;
			}
			if(this.lDate && this.compareDate(dateValue,this.lDate)>0){
				tdDatePanelArr[i].className = "tdDatePanel dfCalOutOfLimit";//超范围
				tdDatePanelArr[i].onclick = function(){};
				continue;
			}
			if(this.day == i-dayOfFirstDay+1){//选中天
				if(currentDate.getFullYear() == this.year 
						&& currentDate.getMonth() == this.month 
						&& currentDate.getDate() == i-dayOfFirstDay+1){//选中今天
					tdDatePanelArr[i].className = "tdDatePanel dfCalThisCurrent";//今天红
				}else{
					tdDatePanelArr[i].className = "tdDatePanel dfCalThisDay";//选中选择天，红
				}
			}else if(currentDate.getFullYear() == this.year 
					&& currentDate.getMonth() == this.month 
					&& currentDate.getDate() == i-dayOfFirstDay+1){//当前天
				tdDatePanelArr[i].className = "tdDatePanel dfCalCurrentDay";//今天灰
			}else if(i%7==6 || i%7==0){//周六日
				tdDatePanelArr[i].className = "tdDatePanel dfCalWeekend";
			}else{//不是当前天或选中天的工作日
				tdDatePanelArr[i].className = "tdDatePanel dfCalNormalDay";
			}
			//选中某日
			tdDatePanelArr[i].onclick = function(){thisCalendarObj.goSelectDay(this);};
		}else{//下月日期格
			tdDatePanelArr[i].innerHTML = i - dayOfFirstDay - daysOfMonth + 1;
			tdDatePanelArr[i].className = "tdDatePanel dfCalNoThisMonth";
			//点击下月日期格跳至下月
			tdDatePanelArr[i].onclick = function(){thisCalendarObj.goNextMonth();};
		}
	}
}

//调整日期控件中所有输入框以符合当前日期
dfCalendar.prototype.changeInput = function(){
	this.getElement(".dfCalYearInput").val(this.year);

	if(this.month<9){
		this.getElement(".dfCalMonthInput").val("0"+(this.month+1));
	}else{
		this.getElement(".dfCalMonthInput").val(this.month+1);
	}
	
	if(this.hour<10){
		this.getElement(".dfCalHourInput").val("0"+this.hour);
	}else{
		this.getElement(".dfCalHourInput").val(this.hour);
	}
	
	if(this.minute<10){
		this.getElement(".dfCalMinuteInput").val("0"+this.minute);
	}else{
		this.getElement(".dfCalMinuteInput").val(this.minute);
	}
	
	if(this.second<10){
		this.getElement(".dfCalSecondInput").val("0"+this.second);
	}else{
		this.getElement(".dfCalSecondInput").val(this.second);
	}
}

//向前一年
dfCalendar.prototype.goPrevYear = function(e){
	this.year--;

	var daysOfMonth = new Date(this.year, this.month + 1, 0).getDate();//当前月一共有多少天
	if(this.day>daysOfMonth){
		this.day=daysOfMonth;
	}
	
	this.changeInput();
	var thisCal = this;
	this.dfDateTest(this.getElement(".dfCalYearInput")[0]);
	/* this.getElement(".dfCalendarTimeInput").each(function(){
		thisCal.dfDateTest(this);
	}); */
	
	this.bind();
	
}
//向后一年
dfCalendar.prototype.goNextYear = function(e){
	this.year++;

	var daysOfMonth = new Date(this.year, this.month + 1, 0).getDate();//当前月一共有多少天
	if(this.day>daysOfMonth){
		this.day=daysOfMonth;
	}
	
	this.changeInput();
	var thisCal = this;
	this.getElement(".dfCalendarTimeInput").each(function(){
		thisCal.dfDateTest(this);
	});
	
	this.bind();
	
}
//向前一月
dfCalendar.prototype.goPrevMonth = function(e){
	if(dfCal.dateFormatMode<6){
		if(this.month == 0){
			this.year--;
			this.month = 11;
		}else{
			this.month--;
		}

		var daysOfMonth = new Date(this.year, this.month + 1, 0).getDate();//当前月一共有多少天
		if(this.day>daysOfMonth){
			this.day=daysOfMonth;
		}
		
		this.changeInput();
		var thisCal = this;
		this.getElement(".dfCalendarTimeInput").each(function(){
			thisCal.dfDateTest(this);
		});
		this.bind();
	}
}
//向后一月
dfCalendar.prototype.goNextMonth = function(e){
	if(dfCal.dateFormatMode<6){
		if(this.month == 11){
			this.year++;
			this.month = 0;
		}else{
			this.month++;
		}

		var daysOfMonth = new Date(this.year, this.month + 1, 0).getDate();//当前月一共有多少天
		if(this.day>daysOfMonth){
			this.day=daysOfMonth;
		}
		
		this.changeInput();
		var thisCal = this;
		this.getElement(".dfCalendarTimeInput").each(function(){
			thisCal.dfDateTest(this);
		});
		this.bind();
	}
}
//重置
dfCalendar.prototype.resetDate = function(){
	var curDate = new Date();
	if(this.fDate && this.compareDate(curDate,this.fDate)<0){
		return false;
	}
	if(this.lDate && this.compareDate(curDate,this.lDate)>0){
		return false;
	}
	
	this.date = curDate;
	
	this.year = this.date.getFullYear();
	this.month = this.date.getMonth();
	this.day = this.date.getDate();
	this.hour = this.date.getHours();
	this.minute = this.date.getMinutes();
	this.second = this.date.getSeconds();
	
	this.changeInput();
	this.returnDate(this.date.dfformat(this.dateFormat));
	this.bind();
	
	var thisCal = this;
	this.getElement(".dfCalendarTimeInput").each(function(){
		thisCal.dfDateTest(this);
	});
}
//选中某日
dfCalendar.prototype.goSelectDay = function(thisObj){
	this.day = thisObj.innerHTML;
	this.bind();
}

//控制输入框只能输入有效数字
dfCalendar.prototype.calInputControl = function(event,thisObj,length){
	if(thisObj.value.length == length){
		return false;
	}
	if(event.keyCode<48 || event.keyCode>57 || event.keyCode == 116){
		return false;	
	}
}


//返回日期
dfCalendar.prototype.returnDate = function(dateValue){
	if(this.fDate && this.compareDate(dateValue,this.fDate)<0){
		return false;
	}
	if(this.lDate && this.compareDate(dateValue,this.lDate)>0){
		return false;
	}
	if(this.thisInput){
		this.thisInput.value = dateValue;
		jQuery(this.thisInput).change();
		jQuery(this.thisInput).focus();
		jQuery(this.thisInput).blur();
		return true;
	}else{
		return false;
	}
	
}

/**
* 设置日期比较
* @author:wangjian
* @param fDate 日期格式字符串 例如:2012-07-01 13:58:12
* @param sDate 日期格式字符串 例如:2012-08-01 13:58:12
*/
dfCalendar.prototype.compareDate = function(fDate,sDate){
	  if(fDate==''||fDate==undefined) return 0;  
	  if(sDate==''||sDate==undefined) return 0;
	if(fDate instanceof Date){
	  var fd = fDate;
	}else{
		var fd = new Date(fDate.replace(/\-/g, "\/"));
	}
	if(sDate instanceof Date){
		  var sd = sDate;
		}else{
			var sd = new Date(sDate.replace(/\-/g, "\/"));
		}
    return fd-sd;
}

//隐藏日期控件
dfCalendar.prototype.hide = function(){
	if(this.panel){
		this.panel.style.display = "none";
	}
}
//显示日期控件
dfCalendar.prototype.show = function(thisObj){
	this.year = this.date.getFullYear();
	this.month = this.date.getMonth();
	this.day = this.date.getDate();
	this.hour = this.date.getHours();
	this.minute = this.date.getMinutes();
	this.second = this.date.getSeconds();
	
	this.draw(thisObj);
	//判断时间精度，决定遮罩层的显示与否
	this.changeShadowByFormat();
	this.bind();
	this.changeInput();
	
	
}

//按钮方法
//现在
dfCalendar.prototype.currentDate = function(){
	var curDate = new Date();
	if(this.returnDate(curDate.dfformat(this.dateFormat))){
		this.hide();
	}
}
//确定
dfCalendar.prototype.submitDate = function(){
	if(this.TimeYInputError==1 || this.TimeMonInputError==1 || this.TimeHInputError==1 || this.TimeMInputError==1 || this.TimeSInputError ==1){
		return false;
	}
	var submitDate = new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);
	if(this.returnDate(submitDate.dfformat(this.dateFormat))){
		this.hide();
	}
}
//取消
dfCalendar.prototype.deleteDate = function(){
	this.returnDate("");
	this.hide();
}

//控件按钮调整时间(使时分秒的上下键不能控制年月)
dfCalendar.prototype.dfUpTimeDate = function(){
	if(this.changeTimeInput=="y"||this.changeTimeInput=="mo"){
		return false;
	}
	this.dfKeyUpTimeDate(this.changeTimeInput);
	this.bind();
}

dfCalendar.prototype.dfDownTimeDate = function(){
	if(this.changeTimeInput=="y"||this.changeTimeInput=="mo"){
		return false;
	}
	this.dfKeyDownTimeDate(this.changeTimeInput);
	this.bind();
}


//上下键调整时间：小时
dfCalendar.prototype.dfKeyUpTimeDate = function(changeType){
	if(changeType=="y"){
		var nowYear = this.getElement(".dfCalYearInput").val();
		var nextYear = ++nowYear;
		if(nextYear==10000){
			this.getElement(".dfCalYearInput").val("0001");
		}else if(nextYear<10){
			this.getElement(".dfCalYearInput").val("000"+nextYear);
		}else if(nextYear<100){
			this.getElement(".dfCalYearInput").val("00"+nextYear);
		}else if(nextYear<1000){
			this.getElement(".dfCalYearInput").val("0"+nextYear);
		}else{
			this.getElement(".dfCalYearInput").val(nextYear);
		}
		this.year = this.getElement(".dfCalYearInput").val();
	}else if(changeType=="mo"){
		var nowMonth = this.getElement(".dfCalMonthInput").val();
		var nextMonth = ++nowMonth;
		if(nextMonth==13){
			this.getElement(".dfCalMonthInput").val("01");
		}else if(nextMonth<10){
			this.getElement(".dfCalMonthInput").val("0"+nextMonth);
		}else{
			this.getElement(".dfCalMonthInput").val(nextMonth);
		}
		this.month = this.getElement(".dfCalMonthInput").val();
	}else if(changeType=="h"){
		var nowHour = this.getElement(".dfCalHourInput").val();
		var nextHour = ++nowHour;
		if(nextHour==24){
			this.getElement(".dfCalHourInput").val("00");
		}else if(nextHour<10){
			this.getElement(".dfCalHourInput").val("0"+nextHour);
		}else{
			this.getElement(".dfCalHourInput").val(nextHour);
		}
		this.hour = this.getElement(".dfCalHourInput").val();
	}else if(changeType=="m"){
		var nowMinute = this.getElement(".dfCalMinuteInput").val();
		var nextMinute = ++nowMinute;
		if(nextMinute==60){
			this.getElement(".dfCalMinuteInput").val("00");
		}else if(nextMinute<10){
			this.getElement(".dfCalMinuteInput").val("0"+nextMinute);
		}else{
			this.getElement(".dfCalMinuteInput").val(nextMinute);
		}
		this.minute = this.getElement(".dfCalMinuteInput").val();
	}else if(changeType=="s"){
		var nowSecond = this.getElement(".dfCalSecondInput").val();
		var nextSecond = ++nowSecond;
		if(nextSecond==60){
			this.getElement(".dfCalSecondInput").val("00");
		}else if(nextSecond<10){
			this.getElement(".dfCalSecondInput").val("0"+nextSecond);
		}else{
			this.getElement(".dfCalSecondInput").val(nextSecond);
		}
		this.second = this.getElement(".dfCalSecondInput").val();
	}
}

dfCalendar.prototype.dfKeyDownTimeDate = function(changeType){
	if(changeType=="y"){
		var nowYear = this.getElement(".dfCalYearInput").val();
		var nextYear = --nowYear;
		if(nextYear==0){
			this.getElement(".dfCalYearInput").val("9999");
		}else if(nextYear<10){
			this.getElement(".dfCalYearInput").val("000"+nextYear);
		}else if(nextYear<100){
			this.getElement(".dfCalYearInput").val("00"+nextYear);
		}else if(nextYear<1000){
			this.getElement(".dfCalYearInput").val("0"+nextYear);
		}else{
			this.getElement(".dfCalYearInput").val(nextYear);
		}
		this.year = this.getElement(".dfCalYearInput").val();
	}else if(changeType=="mo"){
		var nowMonth = this.getElement(".dfCalMonthInput").val();
		var nextMonth = --nowMonth;
		if(nextMonth==0){
			this.getElement(".dfCalMonthInput").val("12");
		}else if(nextMonth<10){
			this.getElement(".dfCalMonthInput").val("0"+nextMonth);
		}else{
			this.getElement(".dfCalMonthInput").val(nextMonth);
		}
		this.month = this.getElement(".dfCalMonthInput").val();
	}else if(changeType=="h"){
		var nowHour = this.getElement(".dfCalHourInput").val();
		var nextHour = --nowHour;
		if(nextHour==-1){
			this.getElement(".dfCalHourInput").val("23");
		}else if(nextHour<10){
			this.getElement(".dfCalHourInput").val("0"+nextHour);
		}else{
			this.getElement(".dfCalHourInput").val(nextHour);
		}
		this.hour = this.getElement(".dfCalHourInput").val();
	}else if(changeType=="m"){
		var nowMinute = this.getElement(".dfCalMinuteInput").val();
		var nextMinute = --nowMinute;
		if(nextMinute==-1){
			this.getElement(".dfCalMinuteInput").val("59");
		}else if(nextMinute<10){
			this.getElement(".dfCalMinuteInput").val("0"+nextMinute);
		}else{
			this.getElement(".dfCalMinuteInput").val(nextMinute);
		}
		this.minute = this.getElement(".dfCalMinuteInput").val();
	}else if(changeType=="s"){
		var nowSecond = this.getElement(".dfCalSecondInput").val();
		var nextSecond = --nowSecond;
		if(nextSecond==-1){
			this.getElement(".dfCalSecondInput").val("59");
		}else if(nextSecond<10){
			this.getElement(".dfCalSecondInput").val("0"+nextSecond);
		}else{
			this.getElement(".dfCalSecondInput").val(nextSecond);
		}
		this.second = this.getElement(".dfCalSecondInput").val();;
	}
}

dfCalendar.prototype.dfDateTest = function(CalendarTimeInput){

	var inputValue = Number(this.getElement(CalendarTimeInput).val());
	var maxValue = null;
	if(this.getElement(CalendarTimeInput).hasClass("dfCalYearInput")){
		maxValue = 10000;
	}else if(this.getElement(CalendarTimeInput).hasClass("dfCalMonthInput")){
		maxValue = 12;
	}else if(this.getElement(CalendarTimeInput).hasClass("dfCalHourInput")){
		maxValue = 23;
	}else{
		maxValue = 59;
	}
	
	if(inputValue<0 || inputValue>maxValue || (Boolean(inputValue!=0) && !Number(inputValue))){
		this.getElement(CalendarTimeInput).parent().css("border","1px solid #f7d1d2");
		if(this.getElement(CalendarTimeInput).hasClass("dfCalYearInput")){
			this.TimeYInputError = 1;
		}else if(this.getElement(CalendarTimeInput).hasClass("dfCalMonthInput")){
			this.TimeMonInputError = 1;
		}else if(this.getElement(CalendarTimeInput).hasClass("dfCalHourInput")){
			this.TimeHInputError = 1;
		}else if(this.getElement(CalendarTimeInput).hasClass("dfCalMinuteInput")){
			this.TimeMInputError = 1;
		}else if(this.getElement(CalendarTimeInput).hasClass("dfCalSecondInput")){
			this.TimeSInputError = 1;
		}
		
	}else{
		this.getElement(CalendarTimeInput).parent().css("border","1px solid #bbbbbb");
		if(this.getElement(CalendarTimeInput).hasClass("dfCalYearInput")){
			if(inputValue<10){
				this.getElement(CalendarTimeInput).val("000"+inputValue);
			}else if(inputValue<100){
				this.getElement(CalendarTimeInput).val("00"+inputValue);
			}else if(inputValue<1000){
				this.getElement(CalendarTimeInput).val("0"+inputValue);
			}
		}else{
			if(inputValue<10){
				this.getElement(CalendarTimeInput).val("0"+inputValue);
			}
		}
		
		if(this.getElement(CalendarTimeInput).hasClass("dfCalYearInput")){
			this.year = inputValue;
			this.TimeYInputError = 0;
		}else if(this.getElement(CalendarTimeInput).hasClass("dfCalMonthInput")){
			this.month = inputValue-1;
			this.TimeMonInputError = 0;
		}else if(this.getElement(CalendarTimeInput).hasClass("dfCalHourInput")){
			this.hour = inputValue;
			this.TimeHInputError = 0;
		}else if(this.getElement(CalendarTimeInput).hasClass("dfCalMinuteInput")){
			this.minute = inputValue;
			this.TimeMInputError = 0;
		}else if(this.getElement(CalendarTimeInput).hasClass("dfCalSecondInput")){
			this.second = inputValue;
			this.TimeSInputError = 0;
		}
	}
}
//调用日期控件方法
function SelectDate(thisObj,dateformat,fDate,lDate,dDate){
	var date = null;
	var thisInput = null;
	if(jQuery(thisObj).prev()[0]){
		thisInput = jQuery(thisObj).prev()[0];
	}else{
		thisInput = jQuery(thisObj).parent().prev().children("input")[0];
	}
	
	if(jQuery(thisInput).val().length != 0){
		date = jQuery(thisInput).val().dfToDate(dateformat);
	}else if(dDate != null && dateformat != null){
		date = dDate.dfToDate(dateformat);
	}else{
		date = new Date();
	}
	if(dfCal == null){
		dfCal = new dfCalendar({
			thisInput:thisInput,
			thisI:thisObj,
			thisInputPanel:jQuery(thisInput).parents("div")[0],
			dateFormat:dateformat,
			date:date,
			fDate:fDate,
			lDate:lDate
		});
	}else{
		dfCal.thisInput = thisInput;
		dfCal.thisI = thisObj;
		dfCal.thisInputPanel = jQuery(thisInput).parents("div")[0];
		dfCal.dateFormat = dateformat;
		dfCal.dateFormatMode = dfCal.formatMode(dateformat);
		dfCal.date = date;
		dfCal.fDate = fDate;
		dfCal.lDate = lDate;
	}
	dfCal.show(thisObj);
	dfCalClicked = 1;
	//window.event.cancelBubble=true;
}

//点击body任一处隐藏日历面板
jQuery(".dfCalendarPanel").live("mouseenter",function(){
	dfCalmouseIn = 1;
});
jQuery(".dfCalendarPanel").live("mouseleave",function(){
	dfCalmouseIn = 0;
});
/*
jQuery("body").live("click",function(e){
	e = e || window.event;
	var target = jQuery(e.target);
//	alert(typeof(target));
	if(dfCalmouseIn == 0){ 
		if(!target.is('i') || jQuery(target.parents()[0]).find("input.calInput")[0] == undefined){
			jQuery(".dfCalendarPanel").hide();
		}
	}
	/*if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
	if(dfCalClicked){
		return dfCalClicked = 0;
		jQuery(".dfCalendarPanel").show();
	}
	if(dfCalmouseIn == 0){
		jQuery(".dfCalendarPanel").hide();
	}else{
		return;
	}
});

/*========================================== 日期控件 end =================================*/
//* ========= 参照删除数据开始  =========== */ 
jQuery(".dfReference").live('click', function() {
	if(jQuery(this).attr("hiddenInputId") != null) {				
			var aHidden = jQuery(this).attr("hiddenInputId").split(",");
			for(var i=0; i<aHidden.length; i++) {
				jQuery("#" + aHidden[i]).val("");
				jQuery("input[name=" + aHidden[i] + "]").val("");
			}
		
	}
});
function dfReference(thisObj){
	if(jQuery(thisObj).attr("hiddenInputId") != null) {				
		var aHidden = jQuery(thisObj).attr("hiddenInputId").split(",");
		for(var i=0; i<aHidden.length; i++) {
			jQuery("#" + aHidden[i]).val("");
			jQuery("input[name=" + aHidden[i] + "]").val("");
		}
	}
}

function selInputTextDel(thisObj){
	var inputObj = jQuery(thisObj).parent().next().children();
	if(inputObj!=null){
		inputObj.val("");
	}
}
//* ========= 参照删除数据结束  =========== */ 
/*-------------------------- +
拖拽函数
+-------------------------- */
function drag(oDrag, handle,cursor)
{
	var disX = dixY = 0;
	handle = handle || oDrag;
	//handle.style.cursor = "move";
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		
		var NS=navigator.appName=='Netscape';//当前浏览器的类型 Netscape ,Microsoft Internet Explorer
		if(event.button==2)  { //単鼠标右击是不拖动对象
			//alert(event.button);
			return;
		}
		
		handle.style.cursor =cursor||"move"; //鼠标移动对象时的样式
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			
			var bgLeft=window.pageXOffset   
	        	|| document.documentElement.scrollLeft   
	        	|| document.body.scrollLeft || 0;  
		
			var bgTop=window.pageYOffset   
	        	|| document.documentElement.scrollTop   
	        	|| document.body.scrollTop || 0;  
			
			if(document.documentMode!=null && typeof(document.documentMode)!="undefined" && document.documentMode<7){
				DOMwidth = document.documentElement.scrollWidth+bgLeft;
				DOMheight = document.documentElement.scrollHeight+bgTop;
			}else{
				DOMwidth = document.documentElement.clientWidth+bgLeft;
				DOMheight = document.documentElement.clientHeight+bgTop;
			}
			var maxL = DOMwidth - oDrag.offsetWidth;
			var maxT = DOMheight - oDrag.offsetHeight;
			
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);
			iL <= bgLeft && (iL = bgLeft);
			iT <= bgTop && (iT = bgTop);
			
			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";
			
			return false
		};
		
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
			handle.style.cursor =""; //鼠标移动对象时的样式
		};
		this.setCapture && this.setCapture();
		return false
	};	
	/*//最大化按钮
	oMax.onclick = function ()
	{
		oDrag.style.top = oDrag.style.left = 0;
		oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
		oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
		this.style.display = "none";
		oRevert.style.display = "block";
	};
	//还原按钮
	oRevert.onclick = function ()
	{		
		oDrag.style.width = dragMinWidth + "px";
		oDrag.style.height = dragMinHeight + "px";
		oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
		oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
		this.style.display = "none";
		oMax.style.display = "block";
	};
	//最小化按钮
	oMin.onclick = oClose.onclick = function ()
	{
		oDrag.style.display = "none";
		var oA = document.createElement("a");
		oA.className = "open";
		oA.href = "javascript:;";
		oA.title = "还原";
		document.body.appendChild(oA);
		oA.onclick = function ()
		{
			oDrag.style.display = "block";
			document.body.removeChild(this);
			this.onclick = null;
		};
	};
	//阻止冒泡
	oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
	{
		this.onfocus = function () {this.blur()};
		(event || window.event).cancelBubble = true	
	};*/
}
/* 滑动下拉页面 */
jQuery(".dfPanelArrow").live("click",function(){
	if(jQuery(this).parent().parent().children(".dfPanelContent").css("display")=="none"){
		jQuery(this).parent().children(".dfPanelArrow").css("background-position","0px -70px");
		jQuery(this).parent().children(".dfPanelHeaderText").html("[收起]");
		jQuery(this).parent().parent().children(".dfPanelContent").slideToggle();
	}else if(jQuery(this).parent().parent().children(".dfPanelContent").css("display")=="block"){
		jQuery(this).parent().children(".dfPanelArrow").css("background-position","0px -60px");
		jQuery(this).parent().children(".dfPanelHeaderText").html("[展开]");
		jQuery(this).parent().parent().children(".dfPanelContent").slideToggle();

	}
});
jQuery(".dfPanelHeaderText").live("click",function(){
	if(jQuery(this).parent().parent().children(".dfPanelContent").css("display")=="none"){
		jQuery(this).parent().children(".dfPanelArrow").css("background-position","0px -70px");
		jQuery(this).parent().children(".dfPanelHeaderText").html("[收起]");
		jQuery(this).parent().parent().children(".dfPanelContent").slideToggle();
	}else if(jQuery(this).parent().parent().children(".dfPanelContent").css("display")=="block"){
		jQuery(this).parent().children(".dfPanelArrow").css("background-position","0px -60px");
		jQuery(this).parent().children(".dfPanelHeaderText").html("[展开]");
		jQuery(this).parent().parent().children(".dfPanelContent").slideToggle();

	}
});


/* 多选下拉框 */
function selShowdiv(links){
	//var links = [[1,'在用'],[2,'闲置-可使用'],[3,'闲置-不可使用'],[4,'其他']];
	if(jQuery(".selShowdiv").css("display")=="none"){
		var html = "";
		for(var i=0;i<links.length;i++){
			  if(i==links.length-1){
				  html += '<div class="selLastDivLevel"><div class="sel_checkbox"><input type="checkbox" class="firerift-style-checkbox-f" value="'+links[i][0]+'"></input></div>'+links[i][1]+'</div>';    
			  }else{
				  html += '<div class="selDivLevel"><div class="sel_checkbox"><input type="checkbox" class="firerift-style-checkbox-f" value="'+links[i][0]+'"></input></div>'+links[i][1]+'</div>';   
			  }
		}
		var div = document.createElement("div");
		div.id = "selShowdiv";
		div.innerHTML = html;
		jQuery(div).insertBefore(jQuery(".dfShowButton"));
		jQuery(".selShowdiv").css("display","block");
	}else if(jQuery(".selShowdiv").css("display")=="block"){
		jQuery("#selShowdiv").remove();
		jQuery(".selShowdiv").css("display","none");
	}
	
	dfReady();
	
	if(jQuery(".selInputHidden").attr("value")!=""){
		var ids = jQuery(".selInputHidden").attr("value");
		var chosenDiv = ids.split(",");
		var div_length = jQuery("#selShowdiv").children();
		for(var i=0; i<chosenDiv.length;i++){
			j=parseInt(chosenDiv[i])-1;
			jQuery(div_length[j]).find(".firerift-style-f.off").attr("class","firerift-style-f on");
			jQuery(div_length[j]).find(".simple-checkbox").attr("checked",true);
		}
	}
}

jQuery(".selShowButton2").live('click',function(){
	jQuery("#selShowdiv").remove();
	jQuery(".selShowdiv").css("display","none");
});

jQuery(".selShowButton1").live('click',function(){
	var selDivs = jQuery("#selShowdiv").children();
	var divckon=jQuery("div.firerift-style-f.on");
	var html = "";
	var ids = "";
	divckon.each(function(){
		var divobj=jQuery(this);
		var ckobj=divobj.prev();
		var objValue = ckobj.attr("value");
		html += ckobj.parent()[0].nextSibling.data+",";
		ids += objValue+",";
	});
	var reg=/,$/gi;
	html=html.replace(reg,"");
	ids=ids.replace(reg,"");
	jQuery(".selInput").attr("value",html);
	jQuery(".selInputHidden").attr("value",ids);
	jQuery("#selShowdiv").remove();
	jQuery(".selShowdiv").css("display","none");
});
