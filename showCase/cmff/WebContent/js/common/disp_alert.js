// JavaScript Document
//=========================== 弹出框控件 ============================//
/**
 * getDfWinId_load										获取load页面的id
 * getDfZIndex												获取z-index的值
 *
 * 弹出框控件方法
 * popUpBox													弹出框类
 *	alert_submit											提示框点击确认的方法
 * confirm_remove										确认框点击确认/取消的方法
 * cancel														提示框点击叉号关闭窗口
 * getNewId													随机设置id
 * setObjMiddleX											设置窗口横向居中
 * setObjMiddleY											设置窗口纵向居中
 * drag															拖拽窗口
 * dfWinRemove												大弹出框为load加载时点击叉号关闭窗口
 * win_remove												大弹出框为url加载时时点击叉号关闭窗口
 * show															显示弹出框唯一入口
 * hint															显示提示框		
 * validity													显示确认框
 * new_win														显示大弹出框
 */
function getDfWinId_load(){
	return dfWinIdArray[dfWinIdArrayNum];
}
if(typeof(dfWinIdArray) == "undefined" || typeof(dfWinIdArrayNum) == "undefined"){
	var dfWinIdArray = new Array();
	var dfWinIdArrayNum = -1;
}

if(typeof(dfWinIdIframeArray) == "undefined" || typeof(dfWinIdIframeArrayNum) == "undefined"){
	var dfWinIdIframeArray = new Array();
	var dfWinIdIframeArrayNum = -1;
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
//弹出框类
function popUpBox(thisObj){
	this.title = $(thisObj).attr("data-name");               //弹出框名称
	this.boxKind = $(thisObj).attr("data-kind");             //弹出框类型：提示/确认/页面
	this.content = $(thisObj).attr("data-content");          //弹出框内容：当boxKind=hint/validity时定义
	this.loadMethod = $(thisObj).attr("data-contype");       //加载方式：url/load
	this.boxHeight = $(thisObj).attr("data-boxHeight");      //弹出框高度
	this.boxWidth = $(thisObj).attr("data-boxWidth");        //弹出框宽度
	this.url = $(thisObj).attr("data-url");                  //弹出框加载路径，当boxKind=popUp时定义
	this.isCenter = $(thisObj).attr("data-isCenter");        //弹出框是否居中（1是/0否）
	this.magnify = $(thisObj).attr("data-magnify");          //弹出框是否最大化
}
popUpBox.prototype = {
	constructor : popUpBox, //强制声明构造函数
	alert_submit : function(winObj,fun1){
		if(typeof(eval(fun1))=="function" ){
			eval(fun1)();
		}
		jQuery(winObj.parentNode.parentNode.parentNode).remove();	
	},
	confirm_remove : function(win_cancel){
		jQuery(win_cancel.parentNode.parentNode.parentNode.parentNode.parentNode).remove();
	},
	cancel :function(win_cancel){
		jQuery(win_cancel.parentNode.parentNode.parentNode).remove();
	}
}
//随机设置id
popUpBox.prototype.getNewId = function(){
	var newId = "";
	for(var i=0;i<4;i++){
		var ids = parseInt(String(Math.random()*10000));
		newId += String(ids);
	}
	return newId;
}

//弹出框入口
function popUp(thisObj){
	/* 参数说明：窗口名称,提示文字,点击确定时的事件,点击取消时的事件 */
	var win = new popUpBox(thisObj);
	win.show(thisObj);
}
//设置横向居中
popUpBox.prototype.setObjMiddleX = function(msgObj){
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
//设置纵向居中
popUpBox.prototype.setObjMiddleY = function(msgObj,objHeight){
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
//拖拽
popUpBox.prototype.drag = function(oDrag, handle,cursor){
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
}
popUpBox.prototype.dfWinRemove = function(){
	jQuery("#"+getDfWinId_load()).remove();
	dfWinIdArrayNum--;
}
//modified by jiangqx 2013-04-09 for 在导出点击取消时销毁窗口
popUpBox.prototype.win_remove = function(win_id){
	//jQuery("#"+win_id).contents().find("iframe").contents().find("body").empty();
	$("#"+win_id).remove();
}
popUpBox.prototype.show = function(thisObj){
	if(this.boxKind == "validity"){
		this.validity(thisObj);
	}else if(this.boxKind == "hint"){
		this.hint(thisObj);
	}else{
		this.new_win(thisObj);
	}
}
//modified by wangsy 2013-04-21 add for 提示框模拟alert
/*参数说明：窗口名称,提示文字*/
popUpBox.prototype.hint = function(thisObj,fun1){
	var id = this.getNewId();
	var win_html = '<div class="backdrop"></div>'
	+  '<div class="win_border hint" id="win_alert_'+id+'">'
	if(document.documentMode<7){
	    win_html +=   '<header class="win_header" style="margin-right:-14px;" >'
	}else{
		win_html+=   '<header class="win_header" >'
	}
	win_html+=	'<h3 class="win_name_alert" style="">'+this.title+'</h3>'
			+	'<span class="win_cancel"></span>'
			+	'</header>'
			+	'<div class="win_body">'
			+	'	<div class="win_body_title">温馨提示</div>'
			+	'	<div class="win_body_alert">'+this.content+'</div>'
			+	'</div>'
			+ '<footer class="disp_footer">'
			+ '<button id="hint_confirm_id" class="btn btn-primary" />'
			+ '点击确定</button></footer></div>';
	
	var div = document.createElement("div");
	div.id = "win_alert"+id;
	div.innerHTML = win_html;
	document.body.appendChild(div);
	
	win_border_obj = jQuery("#win_alert_"+id);
	this.setObjMiddleX(win_border_obj[0]);
	this.setObjMiddleY(win_border_obj[0]);
	this.drag(win_border_obj[0], win_border_obj.children()[1]);
	//modified by wangsy 2013-7-22 update for 为正确获取页面滚动条高度
	var thisWin = this;  
	$("#hint_confirm_id").focus();
	$("#hint_confirm_id").click(function(){
		thisWin.alert_submit(this,fun1);
	});
	$(".win_cancel").click(function(){
		thisWin.cancel(this);
	});
}

popUpBox.prototype.validity = function(thisObj){
	var id = this.getNewId();
	var win_html =  '<div class="backdrop"></div>'
							 +	'<div class="win_border confirm" id="win_confirm_'+id+'">';
	if(document.documentMode<7){
		win_html +=     '<header class="win_header" style="margin-right:-14px;" >'
	}else{
		win_html+=      '<header class="win_header">'
	}
	win_html+=	        '<span class="win_name_alert" style="">'+this.title+'</span>'
					+	          '<span class="win_cancel"></span>'
					+	        '</header>'
					+	        '<div class="win_body">'
					+	          '	<div class="win_body_title">温馨提示</div>'
					+          	'	<div class="win_body_alert">'+this.content+'</div>'
					+         '</div>'
					+	        '<footer class="disp_footer">'
					+	          '<ul><li>'
					+	            '<button class="btn btn-primary" id="confirm_submit_id">确定'
					+	            '</button></li><li>'
					+             '<button class="btn btn_cancel">取消</button>'
					+         '</li></ul></footer>'
					+       '</div>';
			
	var div = document.createElement("div");
	div.id = "win_confirm"+id;
	div.innerHTML = win_html;
	document.body.appendChild(div);
	
	win_border_obj = jQuery("#win_confirm_"+id);
	this.setObjMiddleX(win_border_obj[0]);
	this.setObjMiddleY(win_border_obj[0]);
	this.drag(win_border_obj[0], win_border_obj.children()[1]);
	//modified by wangsy 2013-7-22 update for 为正确获取页面滚动条高度
	var thisWin = this;
	$("#confirm_submit_id").focus();
	$("#confirm_submit_id").click(function(){
		thisWin.confirm_remove(this);
	});
	$(".win_cancel").click(function(){
		thisWin.cancel(this);
	});
	$(".btn_cancel").click(function(){
		thisWin.confirm_remove(this);
	});
}

/* ========= 弹出框事件 =========== */ 
/* 参数说明：new_win(触发点击事件的对象(this,用于存放窗口id),窗体宽度(number),窗体高度(number),"窗口名称",
 * "窗口内容(如想要内容以iframe的方式嵌入一个其它页面时,格式为“url:xxx.xxx”，如"url:http://www.baidu.com"；
 * 如果以非iframe的方式时，格式为“load:xxx.xxx”)",是否带遮罩层(boolean),是否居中(boolean),
 * 窗口横坐标(number),窗口纵坐标(number),是否支持缩放功能(1为支持,0为不支持),是否初始化最大化) */
popUpBox.prototype.new_win = function(thisObj){
	/*是否最大化功能，1是/0否*/
	/*是否窗口初始化最大化,1是/0否*/
	/*获取窗口id*/
	if(typeof(thisObj)=="string"){
		win_id = thisObj;
	}else{
		if(jQuery(thisObj).attr("dfWinId")){
			win_id = $(thisObj).attr("dfWinId");
		}else{
			win_id = this.getNewId();
			$(thisObj).attr("dfWinId",win_id);
		}
	}
	
	/*判断窗口是否已生成*/
	if(document.getElementById(win_id)){
		document.getElementById(win_id).style.display = "";
	}else{
		/*获取窗口层级*/
		var win_z_index = getDfZIndex();
		
		if(this.loadMethod == "url" || this.loadMethod == "load"){
			var win_height = this.boxHeight - 0 + 36 ;
			var win_width = this.boxWidth  ;
		}else{
			var win_height = this.boxHeight + 76 ;
			var win_width = this.boxWidth + 42 ;
		}
		var win_style = "width:"+win_width+"px; height:"+win_height+"px;top:0px;left:0px;position:absolute;z-index:"+win_z_index+";";
		if(document.documentMode<7){
			quirks_width = win_width-0+12;
			quirks_height = win_height-0+14;
		}
		
		var win_html = '<div class="backdrop" style="z-index:'+win_z_index+';"></div>';
		var objHeight;
		win_html += '<div class="win_border popup" id="win_border_'+win_id+'" style="'+win_style+'">';
		if(document.documentMode < 7){
			objHeight = quirks_height;
		}else{
			objHeight = win_height;
		}
		win_html +=	'<div class="win_header">'
		         +		'<span class="win_name" style="" >'+this.title+'</span>'
		         +		'<span class="win_cancel"></span>';
		//放大
		/*if( win_larger !=null && win_larger != 0){
		win_html +=	'<span class="win_magnify" onclick="dfChangeZoom(this)" preWidth="'+win_width+'" preHeight="'+win_height+'" winId="'+win_id+'" ';
			if(win_body.substr(0,3) == "url"){
				win_html +=	'winType="iframe"';
			}else{
				win_html +=	'winType="load"';
			}
			win_html +=		'></span>' 
		}*/
		win_html +=	'</div>'
		         +	'<div class="win_body" ';
		if(this.url.substr(0,3) == "url"){
			if(this.url.indexOf('?')>0){
				win_id_url = '&win_id='+win_id;
			}else{
				win_id_url = '?win_id='+win_id;
			}
			win_html += '><iframe id="'+win_id+'_iframe" src=\''+this.url.substr(4)+win_id_url+'\' style="width:100%;height:100%;border:0;" marginwidth="0" frameborder="0" marginheight="0"></iframe>';
		}else if(this.url.substr(0,4) == "load"){
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
		if(this.url.substr(0,4) == "load"){
			jQuery("#loadDiv_"+win_id).load(this.url.substr(5));
		}
		if(this.url.substr(0,3) != "url"){
			dfWinIdArrayNum++;
			dfWinIdArray[dfWinIdArrayNum] = win_id;
		}else{
			dfWinIdIframeArrayNum++;
			dfWinIdIframeArray[dfWinIdIframeArrayNum] = win_id;
		}
		
		//alert(textHeight);
		win_border_obj = jQuery("#win_border_"+win_id);
		this.setObjMiddleX(win_border_obj[0]);
		this.setObjMiddleY(win_border_obj[0],objHeight);
		this.drag(win_border_obj[0], win_border_obj.children()[1]);
		var thisWin = this;
	  $(".win_cancel").click(function(){
			if(thisWin.loadMethod == "url"){
				thisWin.win_remove(win_id);
				dfWinIdIframeArrayNum--;
			}else{
				thisWin.dfWinRemove();
			}
		});
		/*if(init_larger !=null && init_larger != 0){
			dfChangeZoom(jQuery(win_border_obj[0]).find(".win_magnify"));
		}*/
	}
}
