var icon;
var Config;
var xsldoc = null;
var oCurrentNode=null;//高亮度显示时当前节点
var oTempClass=null;//定义鼠标样式的临时变量

jQuery(function() {
	
	function rmDebug(str) {
		if(!$("#rmDebugTextarea").length) {
			$("body").append("<div><textarea id='rmDebugTextarea' style='z-index:999;' rows='50' cols='180'></textarea></div>");
		}
		$("#rmDebugTextarea").val(str);
	}

	//$("body").append("<div id='output' style='z-index:-999;display:none'></div>");
});

jQuery(function(){
	function SelectStart(e){  //不允许选择
		e = window.event || e;
		e.cancelBubble=true;
		e.returnValue=false;
		return false;
	}
	
	icon={
		leaf:treeImagePath + "/file.gif",
		close:treeImagePath + "/z.png",
		open:treeImagePath + "/v.png"
	};
	
	Config={
		loading:"数据加载中...",  //加载时显示信息
		unavaible:"无相应数据！",  //加载失败时显示信息
		Service:rootXmlSource,  //节点数据文件
		SyncXSLsrc:xslPath,  //一次加载时xsl文件
		isExpandOne:expandType  //是否自动关闭兄弟节点
	};
	
	//加载xsl文件
	$.ajax({
		type: "post",
		url: Config.SyncXSLsrc,
		dataType: "xml",
		async: false,
		beforeSend: function(XMLHttpRequest){
			ShowLoading();
		},
		success: function(data, textStatus){
			xsldoc = data;
		}
	});
	
	$(".deeptree").each(function(e){
		//定义样式
		var ch = document.documentElement.clientHeight || document.body.clientHeight;
		if($("#footerDiv").length && ch > 300) { //有确定按钮
			this.style.height = ch-30;
		} else { //无确定按钮
			//this.style.height = ch;
		}
		
		//绑定事件
		$(this).click(MouseClick);
		$(this).dblclick(MouseDblClick);
		$(this).mouseover(MouseOver);
		$(this).mouseout(MouseOut);
		//$(this).select(function(e){
		//	e.stopPropagation();
		//});
		
		//扩展函数
		//this.PreLoad = PreLoad;
		this.autoExpand = autoExpand;
		this.ExpandObject = ExpandObject;
		this.CollapseObject = CollapseObject;
		this.getXmlDataIslandValue = getXmlDataIslandValue;
		if((typeof returnValueName) != "undefined") {
			this.returnValueName = returnValueName;
		}

		Init(this);
		PreLoad(true);
	});
});

function PreLoad(iconIsString){  //预下载图片
	for(i in icon){
		var temp = iconIsString ? icon[i] : icon[i].src;
		icon[i]=new Image();
		icon[i].src=temp;
	}
	//setTimeout("PreLoad()",10000);
}



function ShowLoading() {
	
}

/**********************开始deeptree的树展现相关方法 **********************/
function StateXML(objContainer,state){  //显示加载的状态 (加载中或加载失败)
	var msgLoading="<message text='"+state+"'/>";
	var result = $(objContainer).transform({xmlstr:msgLoading, xslobj:xsldoc})[0].innerHTML;
	return result;
}
function Init(thisObj){  //加载初始化
	var jq=$.noConflict();
	if(xmlSourceType == "nodeCode") {
		getXmlValue(thisObj, Config.Service + defaultNodeCodeGetCurrent, false);
	} else {
		getXmlValue(thisObj, Config.Service, false);
	}
}

function autoExpand(){  //自动展开
	var oRootNode = GetElement(element,"div");
	ExpandNode(oRootNode);
}

function ExpandObject() {
	var currentObject = getObjectById(currentObjectId_cookie);
	if(currentObject != null)
		ExpandNode(currentObject);
}

function CollapseObject() {
	var currentObject = getObjectById(currentObjectId_cookie);
	if(currentObject != null)
		CollapseNode(currentObject);
}

function appendRmts(urlStr) {
	var rmts = (new Date()).valueOf();
	if(urlStr != null && urlStr.indexOf("rmts") < 0) {
		if (urlStr.indexOf("?") >= 0) {   
			urlStr = urlStr + "&rmts=" + rmts;   
		} else {   
			urlStr = urlStr + "?rmts=" + rmts;    
		}
	}
	return urlStr;   
}

function getXmlValue(objContainer, xmlSource, isSelected, id, isAppand) {  //接受xmlSource异步，动态的加载数据，返回值，修正后
	if(!isAppand) {
		jQuery(objContainer).html(StateXML(objContainer,Config.loading));
		//objContainer.innerHTML = StateXML(objContainer,Config.loading);
	}
	//添加异步id查询条件 zhoulch add
	xmlSource = appendRmts(xmlSource);
	if(id != null && id != ""){
		xmlSource = xmlSource + "&id=" + id.substr(0,id.indexOf("-"));
	}
	var targetUrl = xmlSource;
	if(xmlSourceType == "nodeCode") { //如果传过来的xml数据获取方式为nodeCode，则加上默认xmlPath路径
		targetUrl = defaultXmlUrlPath + targetUrl;
	}
	objContainer.setAttribute("send", "true");
	$.ajax({
		type: "post",
		url: targetUrl,
		dataType: "xml",
		async: true,
		beforeSend: function(XMLHttpRequest){
			ShowLoading();
		},
		success: function(data, textStatus){
			var Xmldoc=data;
			if(Xmldoc.documentElement.hasChildNodes()){
				$(objContainer).transform({xmlobj:Xmldoc, xslobj:xsldoc});
				
				//zhoulichen add 2013.4.10 resolve asynchronous query condition
				var re = new RegExp("(\w*||\W*)\.jsp(\w*||\W*)", "g");
				/*if(queryCondition != null && queryCondition != ""){
					queryCondition = queryCondition + "&";
				}*/
/*					result = result.replace(re,"$1"+ ".jsp?"+ queryCondition +"$2"); 
				if(isAppand) {
					objContainer.innerHTML += result;
				} else {
					objContainer.innerHTML = result;
				}*/
				//$("#output").html("");
				addChildrenToId(Xmldoc, isSelected, id);
				
				if(typeof(toDoNodeAppend) == "function") {
					toDoNodeAppend();
					//toDoMouseClick();
				}
			}else{
				if(!isAppand) {
					objContainer.innerHTML = StateXML(objContainer,Config.loading);
					//隐藏提示
					translateParentToLeaf(objContainer);
				}
			}
		},
		complete: function(XMLHttpRequest, textStatus){
			initLogoImage();
			//HideLoading();
		},
		error: function(){
			if(!isAppand) {
				objContainer.innerHTML = StateXML(objContainer,Config.unavaible);
			}
		}
	});
}

function translateParentToLeaf(thisDiv) {  //把父节点变成叶子
	thisDiv.style.display = "none";
	var thisParent = thisDiv.previousSibling;
	if(thisParent == undefined || thisParent == null || thisParent.getAttribute("type") != "parent") {
		return false;
	}
	thisParent.setAttribute("type", "leaf");
	var thisTreeImage = getObjectById(prefixTreeImg + thisParent.id.substring(prefixDiv.length));
	if(icon.leaf.src != null) {
		thisTreeImage.src = icon.leaf.src;
	} else {
		thisTreeImage.src = icon.leaf;
	}
}

function getXmlDataIslandValue() {  //动态新增节点
	var currentObject = getObjectById(currentObjectId); //这句话得到的是当前的span
	if(currentObject == null)
		return false;
	var objContainer = currentObject.parentNode.parentNode;
	var isSelected = false;
	if(inputType == "checkbox") {
		isSelected = getObjectById(prefixCheckbox + gradeMapParent[currentObject.id.substring(prefixSpan.length)]).checked;	
	}
	var id = gradeMapParent[currentObject.id.substring(prefixSpan.length)];
	if(currentItem_Drag != null) {
		var objContainer = currentObject.parentNode;
		if(objContainer.hasChild == "1") {
			objContainer.nextSibling.insertAdjacentHTML("afterEnd", currentItem_Drag);
		} else {
			objContainer.insertAdjacentHTML("afterEnd", currentItem_Drag);
		}
		var thisMapId = _dt_itemMouseDown.downObject.id.substring(prefixSpan.length);
		var tempOldParent = gradeMapParent[thisMapId];
		var tempNewParent = gradeMapParent[objContainer.id.substring(prefixDiv.length)];
		gradeMapParent[thisMapId] = tempNewParent;
		if(gradeMapChild[tempNewParent] == undefined) {
			gradeMapChild[tempNewParent] = new Object();
		} 
		gradeMapChild[tempNewParent].push(thisMapId);
		gradeMapChild[tempOldParent] = getArrayDeleteString(gradeMapChild[tempOldParent], thisMapId);
	} else {
		var Xmldoc = getObjectById("xmlDataIsland");
		var tempDiv = window.document.createElement("div");
		var result = $("#output").transform({xmlobj:Xmldoc, xslobj:xsldoc})[0].innerHTML;
		tempDiv.innerHTML = result;
		tempDiv = tempDiv.childNodes[0];
		currentObject.parentNode.insertAdjacentElement("afterEnd", tempDiv);
		addChildrenToId(Xmldoc, isSelected, id);
	}
}

function getMoreTreeNode(thisSpan) {  //更多的展开节点
	var objDiv = thisSpan.parentNode;
	var objContainer = objDiv.parentNode;
	var xmlSource = thisSpan.getAttribute("xmlSource");
	var isSelected = false;
	if(inputType == "checkbox") {
		isSelected = getObjectById(prefixCheckbox + objDiv.parentNode.previousSibling.id.substring(prefixDiv.length)).checked;
	} 
	var id = objDiv.parentNode.previousSibling.id.substring(prefixDiv.length);
	objDiv.parentNode.removeChild(objDiv);
	getXmlValue(objContainer, xmlSource, isSelected, id, true);
}



function SelectNode(obj,open){  //选择节点，让节点高亮度显示
	var objNode=GetElement(obj,"span");
	var oLink=GetElement(objNode,"a");
	if(!oCurrentNode){
		oCurrentNode=objNode;
		objNode.className="HighLight";
	} else{
		oCurrentNode.className = (oCurrentNode.getAttribute("type")=="load") ? "load" : "";
		objNode.className="HighLight";
		oCurrentNode=objNode;
	}
	if(enableStatusText) {
		window.status=objNode.innerText;	
	}
	currentObjectId = objNode.id;  //放入全局变量中
	if(oLink!=null && open) {
		window.open(oLink.href,oLink.target);
	}
}



function GetElement(objParent, objTag){  //从objParent中得到类型为objTag的元素
	var objNode=null;
	if(objParent == null)
		return false;
	var oChildren=objParent.children;
	if(oChildren){
		for(i=0;i<oChildren.length;i++){
			if(oChildren[i].tagName.toUpperCase()==objTag.toUpperCase()){
				objNode=oChildren[i];
				break;
			}
		}
	}
	return objNode;
}

function Toggle(objNode){  //节点展开，或者收拢
	if(objNode.getAttribute("type")=="parent"){
		if(objNode.getAttribute("open")=="false") {
			ExpandNode(objNode);
			if(enableCookie)
				SetCookie(objNode.id.substring(prefixDiv.length), cookieEnable, exp);			
		} else {
			CollapseNode(objNode);
			if(enableCookie)
				DeleteCookie(objNode.id.substring(prefixDiv.length));		
		}
			
	}
}

function ExpandNode(objNode){  //展开节点
	if(objNode == null || objNode.getAttribute("type") != "parent")
		return false;
		
	//先让父辈节点全部展开
	var parentNode = getObjectById(prefixDiv + gradeMapParent[objNode.id.substring(prefixDiv.length)]);
	if(parentNode != null && parentNode.getAttribute("open")=="false") {
		ExpandNode(parentNode);
		if(enableCookie)
			SetCookie(parentNode.id.substring(prefixDiv.length), cookieEnable, exp);			
	}
	
	var oTreeImg=getObjectById(prefixTreeImg + objNode.id.substring(prefixDiv.length));
	var oSpan=getObjectById(prefixSpan + objNode.id.substring(prefixDiv.length));
	var oCheckbox=getObjectById(prefixCheckbox + objNode.id.substring(prefixDiv.length));
	if(oTreeImg==null || oSpan==null)
		return false;
	var oChild=objNode.nextSibling;
	if(oChild.tagName == null) {
		oChild = oChild.nextSibling;
	}
	//wangsy 2013-04-01 for line of last node
	if(icon.open.src != null) {
		if(oTreeImg.src.match("/Lz.png")){
			oTreeImg.src = lastNodeImagePath + "/Lv.png";
		}else if(oTreeImg.src.match("/z.png")){
			oTreeImg.src = lastNodeImagePath + "/v.png";
		}
	} else {
		if(oTreeImg.src.match("/Lz.png")){
			oTreeImg.src = lastNodeImagePath + "/Lv.png";
		}else if(oTreeImg.src.match("/z.png")){
			oTreeImg.src = lastNodeImagePath + "/v.png";
		}
	}
	/*if(icon.open.src != null) {
		oTreeImg.src=icon.open.src;
	} else {
		oTreeImg.src=icon.open;
	}*/
	oChild.style.display="block";
	objNode.setAttribute("open", "true");
	objNode.setAttribute("opened", "true");
	if(oCheckbox != null) {
		objNode.setAttribute("isSelected", oCheckbox.checked);
	}
	if(oChild.getAttribute("send")=="false"){
		getXmlValue(oChild, objNode.getAttribute("xmlSource"), objNode.getAttribute("isSelected"), objNode.id.substring(prefixDiv.length));
	}
	if(Config.isExpandOne){
		var oContainer=objNode.parentNode;
		var oChildren=oContainer.children;
		for(i=0;i<oChildren.length;i++) {
			if(oChildren[i].getAttribute("open")=="true" && oChildren[i]!=objNode) {
				CollapseNode(oChildren[i]);	
				if(enableCookie)	
					DeleteCookie(oChildren[i].id.substring(prefixDiv.length));
			}
		}	
	}
}

function CollapseNode(objNode) {  //收拢节点
	if(objNode == null || objNode.getAttribute("type") != "parent")
		return;
	var oTreeImg=getObjectById(prefixTreeImg + objNode.id.substring(prefixDiv.length));
	var oSpan=getObjectById(prefixSpan + objNode.id.substring(prefixDiv.length));
	var oCheckbox=getObjectById(prefixCheckbox + objNode.id.substring(prefixDiv.length));
	if(oTreeImg==null || oSpan==null)
		return false;
	var oChild=objNode.nextSibling;
	if(oChild.tagName == null) {
		oChild = oChild.nextSibling;
	}
	//wangsy 2013-04-01 for line of last node
	if(icon.close.src != null) {
		if(oTreeImg.src.match("/Lv.png")){
			oTreeImg.src = lastNodeImagePath + "/Lz.png";
		}else if(oTreeImg.src.match("/v.png")){
			oTreeImg.src = lastNodeImagePath + "/z.png";
		}
	} else {
		if(oTreeImg.src.match("/Lv.png")){
			oTreeImg.src = lastNodeImagePath + "/Lz.png";
		}else if(oTreeImg.src.match("/v.png")){
			oTreeImg.src = lastNodeImagePath + "/z.png";
		}
	}
	/*if(icon.close.src != null) {
		oTreeImg.src = icon.close.src;
	} else {
		oTreeImg.src = icon.close;
	}*/
	oChild.style.display="none";
	objNode.setAttribute("open", "false");
	if(oCheckbox != null) {
		objNode.setAttribute("isSelected", oCheckbox.checked);
	}
}
/**********************结束deeptree的树展现相关方法 **********************/

/**********************开始监听事件相关方法 **********************/
var intervalTimer = null;
function MouseClick(e){  //鼠标事件定义
	clearTimeout(intervalTimer); //取消上次延时未执行的方法
 
    intervalTimer = setTimeout(function() {
       	e = window.event || e;
		var RealObj = e.srcElement || e.target;
		if(RealObj.tagName.toUpperCase()=="A" || RealObj.tagName.toUpperCase()=="DIV"){
			objSpan=RealObj.parentNode;
			if(objSpan.getAttribute("type")=="label"){
				RealObj.blur();
				var objNode=objSpan.parentNode;
				SelectNode(objNode);
				//Toggle(objNode);  //如果有超链接，一般不展开节点了
			}else{ //zhoulichen add 增加图片checkbox
				var objNode=RealObj.parentNode;
				var divcheckboxid = RealObj.id;
				var divcheckbox = divcheckboxid.substring(0,divcheckboxid.length-3);
				RealObj =  window.document.getElementById(divcheckbox);
				//modified by jiangqx 2013-04-10 for 点击不是复选框或单选框区域时,divcheckbox截取了后三位后RealObj为null begin.
				if(RealObj==null || RealObj==""){
					return false;
				}
				//modified by jiangqx 2013-04-10 for 点击不是复选框或单选框区域时,divcheckbox截取了后三位后RealObj为nul end.
				if(inputType == "checkbox"){
					//zhoulichen add begin图片的变换
					var objdiv = getObjectById(RealObj.id + "div");
					if(objdiv == null){
						return;
					}
					//end
					var isChecked = RealObj.checked;
					if(isChecked == false) {
						isChecked = true;
						objdiv.className = "tree-firerift-style-o on";
						getObjectById(divcheckbox).indeterminate = false;
						window.document.getElementById(divcheckbox).checked = true;
					} else {
						isChecked = false;
						objdiv.className = "tree-firerift-style-o off";
						getObjectById(divcheckbox).indeterminate = false;
						window.document.getElementById(divcheckbox).checked = false;
					}
					objNode.setAttribute("isSelected", isChecked); //将checkbox的状态给父容器对象
					if(nodeRelationType == "hasRelation") {
						if(!arrayHasString(rootNode, RealObj.id.substring(prefixCheckbox.length))) {
							setParentState(RealObj.id);        //设置父节点的checkbox为不确定状态或者选或者不选
						}
						if(objNode.getAttribute("type")=="parent"){
							if(objNode.getAttribute("opened")=="true"){    //对于已经打开的，继续选择子节点
								checkChild(RealObj, gradeMapChild[RealObj.id.substring(prefixCheckbox.length)], objNode.getAttribute("isSelected"));
							}
						}
					}else if(nodeRelationType == "mutualRelation"){
						if(!arrayHasString(rootNode, RealObj.id.substring(prefixCheckbox.length))) {
							setParentUnchecked(RealObj.id);        //设置父节点的checkbox为不选
						}
						if(objNode.getAttribute("type")=="parent"){
							if(objNode.getAttribute("opened")=="true"){    //对于已经打开的，继续选择子节点
								checkChild(RealObj, gradeMapChild[RealObj.id.substring(prefixCheckbox.length)], false);
							}
						}
					}
				}else if(inputType == "radio"){
					var thisIframe_id = "iframe"+winId;
					for(var j=0;j<2;j++){			
						if(!parent.jQuery("#"+thisIframe_id).attr("src")){
							continue;
						}
						var iframetree =parent.frames[thisIframe_id];
						iframetree.jQuery(".tree-firerift-style-r").each(function(){
							if(jQuery(this).attr("class")=="tree-firerift-style-r on"){
								jQuery(this).removeClass('on').addClass('off');
								return ;
							}
						});
						iframetree.jQuery('.tree-firerift-style-r').prev().attr('checked',false);

						thisIframe_id = "iframe"+winId+"_tab2";
					}					
					window.document.getElementById(divcheckbox).checked = true;
					var objdiv = getObjectById(divcheckbox+"div");					
					//$('.tree-firerift-style-r').removeClass('on').addClass('off');
					objdiv.className="tree-firerift-style-r on";
				}
			}
		} else if(RealObj.getAttribute("type")=="img" && RealObj.getAttribute("use")=="tree"){
			var objNode=RealObj.parentNode;
			if(objNode){
				if(objNode.getAttribute("type")=="leaf"){
					SelectNode(objNode,true);
				} else{
					Toggle(objNode);
				}
			}
		} else if(RealObj.getAttribute("type")=="label" || RealObj.getAttribute("type")=="load"){
			var objNode=RealObj.parentNode;
			SelectNode(objNode,true);
			//Toggle(objNode);//调用是否展开节点方法（文字区域）
		} else if(RealObj.getAttribute("type")=="more"){
			getMoreTreeNode(RealObj);
		} else if(RealObj.getAttribute("type")=="checkbox"){
			var objNode=RealObj.parentNode;
			objNode.setAttribute("isSelected", RealObj.checked); //将checkbox的状态给父容器对象
			if(nodeRelationType == "hasRelation") {
				if(!arrayHasString(rootNode, RealObj.id.substring(prefixCheckbox.length))) {
					setParentState(RealObj.id);        //设置父节点的checkbox为不确定状态或者选或者不选
				}
				if(objNode.getAttribute("type")=="parent"){
					if(objNode.getAttribute("opened")=="true"){    //对于已经打开的，继续选择子节点
						checkChild(RealObj, gradeMapChild[RealObj.id.substring(prefixCheckbox.length)], objNode.getAttribute("isSelected"));
					}
				}		
			}
		}

		if(typeof(toDoMouseClick) == "function") {
			toDoMouseClick(e);
		}
		//换成图片
		if(typeof(toDoNodeAppendAfter) == "function") {
			toDoNodeAppendAfter();
		}
		return true;
    }, 300);
}

function MouseDblClick(e){  //双击事件
	clearTimeout(intervalTimer);
	
	e = window.event || e;
	var RealObj = e.srcElement || e.target;
	if(RealObj.getAttribute("type")=="label"||RealObj.getAttribute("type")=="load"){
		var objNode=RealObj.parentNode;
		if(objNode.id!=""){
			if(inputType == "noInput") {
				window.returnValue = objNode.returnValue+","+objNode.text;			
			}
		}
	}
	if(outputType == "doubleClick") {
		window.close();
	}
	if(typeof(toDoMouseDbClick) == "function") {
		toDoMouseDbClick(e);
	}
	return true;
}

function MouseOver(e){
	e = window.event || e;
	var RealObj = e.srcElement || e.target;
	if(RealObj.tagName.toUpperCase()=="A")
		RealObj=RealObj.parentNode;
	if(RealObj){
		if(RealObj.getAttribute("type")=="label"||RealObj.getAttribute("type")=="load"){
			oTempClass=RealObj.className;
			//RealObj.className="MouseOver";
		}
	}
	if(typeof(toDoMouseOver) == "function") {
		toDoMouseOver(e);
	}
	return true;
}

function MouseOut(e){
	e = window.event || e;
	var RealObj = e.srcElement || e.target;
	if(RealObj.tagName.toUpperCase()=="A")
		RealObj=RealObj.parentNode;
	if(RealObj){
		if(RealObj.getAttribute("type")=="label"||RealObj.getAttribute("type")=="load"){
			if(RealObj==oCurrentNode)
				RealObj.className="HighLight";
			else
				RealObj.className=oTempClass;
		}
	}
	if(typeof(toDoMouseOut) == "function") {
		toDoMouseOut(e);
	}
	return true;
}
/**********************结束监听事件相关方法 **********************/

/**********************开始checkbox状态维护提交方法 **********************/	
function checkChild(oChk,arrayOfStrings,state){  //check子节点的状态
	if(arrayOfStrings == undefined || arrayOfStrings == null)
		return false;
	for(var i=0;i<arrayOfStrings.length;i++){
		var obj = getObjectById(prefixCheckbox + arrayOfStrings[i]);
		//zholichen add begin 解决第一个state是string的问题 为什么是string需要进一步研究
		if(typeof(state) == "string"){
			if(state == "true")
				state = true;
			else
				state = false;
		}
		//end
		if(obj != null && (obj.parentNode.getAttribute("type")!="parent" || obj.parentNode.getAttribute("opened")=="true")) { //只全选未异步加载的节点
			obj.indeterminate = false;
			obj.checked = state;
		} else if(obj == null){
/*			var parentObj = getObjectById(prefixDiv + arrayOfStrings[i]);  //当该父节点没有复选框时
			if(parentObj.getAttribute("type")=="parent" && parentObj.getAttribute("opened")=="true"){
				checkChild(parentObj,gradeMapChild[arrayOfStrings[i]], state);
			}*/
			continue;
		}
		//zhoulichen add begin图片的变换
		var objdiv = getObjectById(prefixCheckbox + arrayOfStrings[i] + "div");
		
		if(objdiv != null && (obj.parentNode.getAttribute("type")!="parent" || obj.parentNode.getAttribute("opened")=="true")) {
			if(state == true)
				objdiv.className = "tree-firerift-style-o on";
			else
				objdiv.className = "tree-firerift-style-o off";
		}
		//end
		if(obj.parentNode.getAttribute("type")=="parent" && obj.parentNode.getAttribute("opened")=="true"){
			checkChild(obj,gradeMapChild[obj.id.substring(prefixCheckbox.length)], obj.checked);
		}
	}
}
	
function setParentState(checkboxid){  //设置父checkbox为不确定状态或者选或者不选, checkboxid是待处理节点id，父可能变灰、选、不选
	if(checkboxid == undefined || checkboxid == null)
		return false;
	var parentNode = null;
	var tempBrotherArray = null;
	var parentState = 30; //2,不选 3,不确定 5,选
	var tempState = null;
	if(!arrayHasString(rootNode, checkboxid.substring(prefixCheckbox.length))) {
		var thisObj = getObjectById(checkboxid);
		
		parentNode = gradeMapParent[checkboxid.substring(prefixCheckbox.length)];
		if(parentNode == undefined || parentNode == null)
			parentNode = eval("gradeMapParent['\"' + checkboxid + '\"']");
			
		tempBrotherArray = gradeMapChild[parentNode];
		if(tempBrotherArray == undefined || tempBrotherArray == null)
			tempBrotherArray = eval(gradeMapChild['"' + parentNode + '"']);
			
		for(var i=0; i<tempBrotherArray.length; i++) {
			var tempObj = getObjectById(prefixCheckbox + tempBrotherArray[i]);
			if(tempObj!=null){
				if((tempState != null && tempState != tempObj.checked) || (tempObj.indeterminate)) {
					parentState = 3;
				}
				tempState = tempObj.checked;
			}
		}
		
		if(parentState != 3 && tempState != null && tempState == true) {
			parentState = 5;
		} else if(parentState != 3 && tempState != null && tempState == false) {
			parentState = 2;
		}
		if(parentState == 3) {
			if(getObjectById(prefixCheckbox + parentNode) == null){
				return false;
			}
			if(getObjectById(prefixCheckbox + parentNode).checked == false){
				getObjectById(prefixCheckbox + parentNode).checked = false;
				getObjectById(prefixCheckbox + parentNode).indeterminate = true;
				//zhoulichen add begin图片的变换
				getObjectById(prefixCheckbox + parentNode + "div").className = "tree-firerift-style-o off";
			}
			setStateIndeterminate(prefixCheckbox + parentNode);
		} else if(parentState == 2) {
			if(getObjectById(prefixCheckbox + parentNode) == null){
				return false;
			}
			getObjectById(prefixCheckbox + parentNode).indeterminate = false;
			getObjectById(prefixCheckbox + parentNode).checked = false;
			//zhoulichen add begin图片的变换
			getObjectById(prefixCheckbox + parentNode + "div").className = "tree-firerift-style-o off";
			setParentState(prefixCheckbox + parentNode);
		} else if(parentState == 5) {
			if(getObjectById(prefixCheckbox + parentNode) == null){
				return false;
			}
			getObjectById(prefixCheckbox + parentNode).indeterminate = false;
			getObjectById(prefixCheckbox + parentNode).checked = true;
			//zhoulichen add begin图片的变换
			getObjectById(prefixCheckbox + parentNode + "div").className = "tree-firerift-style-o on";
			setParentState(prefixCheckbox + parentNode);
		}
		
	} else {
	}
}

function setParentUnchecked(){  //设置父checkbox为不选
	if(checkboxid == undefined || checkboxid == null)
		return false;
	var parentNode = null;
	var tempBrotherArray = null;
	if(!arrayHasString(rootNode, checkboxid.substring(prefixCheckbox.length))) {
		var thisObj = getObjectById(checkboxid);
		
		parentNode = gradeMapParent[checkboxid.substring(prefixCheckbox.length)];
		if(parentNode == undefined || parentNode == null)
			parentNode = eval("gradeMapParent['\"' + checkboxid + '\"']");
			
		tempBrotherArray = gradeMapChild[parentNode];
		if(tempBrotherArray == undefined || tempBrotherArray == null)
			tempBrotherArray = eval(gradeMapChild['"' + parentNode + '"']);
		getObjectById(prefixCheckbox + parentNode).checked = false;
		getObjectById(prefixCheckbox + parentNode).indeterminate = true;
		//zhoulichen add begin图片的变换
		getObjectById(prefixCheckbox + parentNode + "div").className = "tree-firerift-style-o off";
		setParentUnchecked(prefixCheckbox + parentNode);
	}
}
	
function setStateIndeterminate(checkboxid) {  //设置父checkbox为不确定状态, checkboxid是父节点id，保证变灰
	var obj = getObjectById(checkboxid);
	if(obj == null){
		return false;
	}
	if(obj.checked == false){
		obj.checked = false;
		obj.indeterminate = true;
		//zhoulichen add begin图片的变换
		getObjectById(checkboxid + "div").className = "tree-firerift-style-o off";
	}
	if(!arrayHasString(rootNode, checkboxid.substring(prefixCheckbox.length))) {
		setStateIndeterminate(prefixCheckbox + gradeMapParent[obj.id.substring(prefixCheckbox.length)]);			
	}
}
/**********************结束checkbox状态维护提交方法 **********************/	
function initLogoImage() {
	jQuery(".logoImage").each(function(){
		if(this.width > 22) {
			jQuery(this).css("height", "22px");
		}
		jQuery(this).load(function() {
			if(this.width > 22) {
				jQuery(this).css("height", "22px");
			}
		});
	});
}
function addChildrenToId(oXmlDoc, isSelected, parentId) {  //把取出的子节点加到当前节点的属性中
	if( oXmlDoc == null || oXmlDoc.documentElement == null) {
		return false;
	}
	var thisRoot = oXmlDoc.documentElement;  //取到根节点
	var cs = thisRoot.childNodes;  //取第二级子节点
	recursiveAddChildrenToId(cs, isSelected, parentId);
}

function recursiveAddChildrenToId(cs, isSelected, parentId) {
	var tempArrayString = new Array();
	var iXsltIndex = 1;
	for (var i = 0; i < cs.length; i++) {
		if (cs[i].tagName == prefixTreeNode) {  //TODO 注意：这里和xslt的规则绑死了 ，这里一定要改
			//modified by jiangqx 2013-04-15 for 修改树加载id错误问题 begin.
			var attrId=cs[i].getAttribute("id")+ prefixConcat_xsltNumber + iXsltIndex;
			tempArrayString.push(attrId);
			//modified by jiangqx 2013-04-15 for 修改树加载id错误问题 end.
			iXsltIndex ++;
		}
	}
	
	var tempParentId = prefixRootMapCode;
	if(parentId != undefined)
		tempParentId = parentId;
	var tempIndex = indexObject++;
	var tempParentIdOld = tempParentId;
	tempParentId = prefixConcat_index + tempIndex + tempParentId;
	for(var a=0; a<tempArrayString.length; a++) {
		var thisDiv = getObjectById(prefixDiv + tempArrayString[a]);
		if(thisDiv==null)
			continue;
		thisDiv.id = thisDiv.id + prefixConcat_parent + tempParentId;
		for(var b=0; b<thisDiv.children.length; b++) {
			var tempInnerObj = thisDiv.children[b];
			if(tempInnerObj.tagName == "DIV"){
				tempInnerObj.id = tempInnerObj.id + prefixConcat_parent + tempParentId + "div";
			}else{
				tempInnerObj.id = tempInnerObj.id + prefixConcat_parent + tempParentId;
			}
		}
	}
	for(var i=0; i<tempArrayString.length; i++) {
		tempArrayString[i] += prefixConcat_parent + tempParentId;  //要把父节点id放在子节点后面保证全局唯一
		if(tempParentId == prefixConcat_index + tempIndex + prefixRootMapCode) {  //parentId未定义，说明正在处理根节点
			rootNode.push(tempArrayString[i]);  //设置rootNode
			gradeMapParent[tempArrayString[i]] = prefixRootMapCode;
		} else {
			gradeMapParent[tempArrayString[i]] = tempParentIdOld;
		}
	}
	if(tempParentId == prefixConcat_index + tempIndex + prefixRootMapCode) {
		if(gradeMapChild[prefixRootMapCode] == undefined) {
			gradeMapChild[prefixRootMapCode] = new Array();		
		}
		for(var b=0; b<tempArrayString.length; b++) {
			gradeMapChild[prefixRootMapCode].push(tempArrayString[b]);
		}
	} else {
		if(gradeMapChild[tempParentIdOld] == undefined) {
			gradeMapChild[tempParentIdOld] = new Array();		
		}
		for(var b=0; b<tempArrayString.length; b++) {
			gradeMapChild[tempParentIdOld].push(tempArrayString[b]);
		}
	}
	
	//把子节点的checkbox定义为和父节点一样 zhoulichen 注释掉3/29/2013
	/*if(nodeRelationType == "hasRelation") {
		for(var i=0; i<tempArrayString.length; i++) {
			var tempCheckbox = getObjectById(prefixCheckbox + tempArrayString[i]);
			if(tempCheckbox != null) {
					tempCheckbox.checked = isSelected;
			}
		}
	}*/
	
	//让默认聚焦的节点聚焦
	if(defaultFocusNode != "") {
		var focusNodesId = defaultFocusNode.split(",");
		for(var i=0; i<tempArrayString.length; i++) {
			var tempDiv = getObjectById(prefixDiv + tempArrayString[i]);
			if(arrayHasString(focusNodesId, tempDiv.getAttribute("realId"))) {
				var parentNode = getObjectById(prefixDiv + gradeMapParent[tempDiv.id.substring(prefixDiv.length)]);
				if(parentNode.getAttribute("open")=="false") {
					ExpandNode(parentNode);			
				}
				SelectNode(tempDiv, false);
			}
		}
	}
	
	//让默认不选中的节点被选中
	if(defaultNotSelectedNodes != "" || defaultNotSelectedNodesValue != "") {
		var notSelectedNodesId = defaultNotSelectedNodes.split(",");
		var notSelectedNodesIdValue = defaultNotSelectedNodesValue.split(",");
		for(var i=0; i<tempArrayString.length; i++) {
			var tempDiv = getObjectById(prefixDiv + tempArrayString[i]);
			if(arrayHasString(notSelectedNodesId, tempDiv.getAttribute("realId")) || arrayHasString(notSelectedNodesIdValue, tempDiv.getAttribute("returnValue"))) {
				var tempCheckbox = getObjectById(prefixCheckbox + tempArrayString[i]);
				if(tempCheckbox != null) {
					tempCheckbox.checked = false;
				}
				var tempRadio = getObjectById(prefixRadio + tempArrayString[i]);
				if(tempRadio != null) {
					tempRadio.checked = false;
				}
			}
		}
	}
	
	//让默认选中的节点被选中
	if(defaultSelectedNodes != "" || defaultSelectedNodesValue != "") {
		var selectedNodesId = defaultSelectedNodes.split(",");
		var selectedNodesIdValue = defaultSelectedNodesValue.split(",");

		for(var i=0; i<tempArrayString.length; i++) {
			var tempDiv = getObjectById(prefixDiv + tempArrayString[i]);
			if(arrayHasString(selectedNodesId, tempDiv.getAttribute("realId")) || arrayHasString(selectedNodesIdValue, tempDiv.getAttribute("returnValue"))) {
				var tempCheckbox = getObjectById(prefixCheckbox + tempArrayString[i]);
				if(tempCheckbox != null) {
					tempCheckbox.checked = true;
				}
				var tempRadio = getObjectById(prefixRadio + tempArrayString[i]);
				if(tempRadio != null) {
					tempRadio.checked = true;
				}
			}
		}
	}
	
	
	//递归处理
	var n=0;
	for(var m=0; m<cs.length; m++) {
		if(cs[m].tagName != prefixTreeNode) {
			continue;
		}
		if(cs[m].childNodes.length > 0) {
			recursiveAddChildrenToId(cs[m].childNodes, isSelected,  tempArrayString[n]);
		}
	
		//200611270953 add by rmw ，为了实现软载入节点的自动层层展开
		var defaultOpenNode = getObjectById(prefixDiv + tempArrayString[n]);
		if(defaultOpenNode != null) {
			if(defaultOpenNode.getAttribute("hasChild") == "1" && defaultOpenNode.getAttribute("xmlSource") != "" && defaultOpenNode.getAttribute("open") == "false" && defaultOpenNode.getAttribute("defaultOpen") == "1") {
				ExpandNode(defaultOpenNode);
			}
		}
		n ++;		
	}
}
jQuery(function(){
	initLogoImage();
});