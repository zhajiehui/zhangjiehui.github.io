<%@page contentType="text/html;charset=UTF-8" language="java"%>
<html>
<head>
<title>rm-based architecture project</title>
<jsp:include page="include/globalDeepTree.jsp" />
<link href="<%=request.getContextPath()%>/css/common/df.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/deeptree/js/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/deeptree/js/rm/rm-tools.js"></script>
<script type="text/javascript">

	//定义全局路
	var treeImagePath = "<%=request.getContextPath()%>/deeptree/image";  //树图标路径
	//wangsy 2013-0401 for lastNodeImage
	var lastNodeImagePath = "<%=request.getContextPath() %>/deeptree/image";

	if(typeof(parent.xmlArray) != "undefined"){
		var xmlArray = parent.xmlArray;//单双击事件xml返回参数自定义数组
		var xmlArrayL = parent.xmlArray.length; //单双击事件xml返回参数自定义数组长度
		var xslPath = "<%=request.getContextPath()%>/deeptree/deeptree_xsl.jsp?inputType=" + inputType + "&treeImagePath=" + treeImagePath + "&returnTextType="+ returnTextType + "&isOnlyLeaf="+ isOnlyLeaf + "&xmlArray="+ xmlArray+ "&xmlArrayL="+ xmlArrayL;  //xslt文件相对路径
	}else{
		var xslPath = "<%=request.getContextPath()%>/deeptree/deeptree_xsl.jsp?inputType=" + inputType + "&treeImagePath=" + treeImagePath + "&returnTextType="+ returnTextType + "&isOnlyLeaf="+ isOnlyLeaf ;  //xslt文件相对路径	
	}

	var returnTextType = "self"; //返回文本策略, 包括加上plugParent, self, plugRoot
	//var xslPath = "deeptree_xsl.jsp?inputType=" + inputType + "&treeImagePath=" + treeImagePath + "&returnTextType="+ returnTextType+ "&xmlArray="+ xmlArray+ "&xmlArrayL="+ xmlArrayL;  //xslt文件相对路径
	var defaultXmlUrlPath = "<%=request.getContextPath()%>/deeptree/deeptree_data.jsp?rootnode=";  //xmlSourceType为nodeCode时有效, 默认xml主路径, 转义影射：&-->%26, =-->%3D
	var defaultNodeCodeGetCurrent = "&getcurrent=1";  //xmlSourceType为nodeCode时有效, 默认取节点本身数据参数标识：&-->%26, =-->%3D
	
	function toDoNodeAppend() {
		var firstNodeId = jQuery("#deeptree").children()[0].getAttribute("realid");
		var firstNodeText = jQuery("#deeptree").children()[0].getAttribute("text");
		if(window.parent.document.getElementById('searchvalue1_iframe'+winId) != null && window.parent.document.getElementById('searchvalue1_iframe'+winId) != "undefined" ){
			if(window.parent.document.getElementById('searchvalue1_iframe'+winId).value==""){
				window.parent.document.getElementById('searchvalue1_iframe'+winId).value = firstNodeText;
				window.parent.document.getElementById('hidserch_iframe'+winId).value = firstNodeId;
			}
		}
		/* wangsy 2013-04-01 for line of last node */
		$('.TreeNode').each(function(){
			if($(this).attr("type") == 'leaf'){
				if(!$(this).next()[0]){
					$(this).children()[1].src = lastNodeImagePath + "/L.png";
				}
			}else if($(this).attr("type") == 'parent'){
				if(!$(this).next()[0]){
					$(this).children()[1].src = lastNodeImagePath + "/Lz.png";
				}else if(!$(this).next().next()[0]){
					if($(this).next()[0].style.display == "none"){
						$(this).children()[1].src = lastNodeImagePath + "/Lz.png";
					}else{
						$(this).children()[1].src = lastNodeImagePath + "/Lv.png";
					}
					$(this).next().css("background-image","");
				}
				
			}
		});


		$('.tree-firerift-style-checkbox-o').each(function() {
			
			thisID		= $(this).attr('id');
			thisClass	= $(this).attr('class');
			var isType = window.document.getElementById(thisID).type;
			if(isType == "radio"){
					setClass = ".tree-firerift-style-r";
			}else if(isType == "checkbox"){
					setClass = ".tree-firerift-style-o";
			}
			
			if($(this)[0].checked == true){
				$(this).next(setClass).addClass('on');
			}
			else{
				$(this).next(setClass).addClass('off');
			}
			$(this).removeClass('tree-firerift-style-checkbox-o');
			
			$(this).addClass('hidden');
		});
	}


	//根据需要可以重写的方法
	function toDoMouseClick(e) {
		e = window.event || e;
		var obj = e.srcElement || e.target;
		var inputObj = getObjectById("deeptree_checkbox" + getMouseIdByEvent(obj.id));
		var divObj = getObjectById("deeptree_checkbox" + getMouseIdByEvent(obj.id) + "div");
		//alert("单击");
		if(inputType == "radio" || inputType == "checkbox" || inputType == "noInput") {
			var tempObj = new Object();
			//var submitObjectArray = new Array(0);
			var thisObj = getObjectById(prefixDiv + getMouseIdByEvent(obj.id));
			if(thisObj != null){
				tempObj["haschild"] = thisObj.getAttribute("haschild");
				tempObj["childName"] = thisObj.getAttribute("text");
				tempObj["childId"] = thisObj.getAttribute("returnValue");
				tempObj["returnValue"] = thisObj.getAttribute("returnValue");								
				/*新添加的属性开始*/
				tempObj["busContent"] = thisObj.getAttribute("busContent");				
				/*新添加的属性结束*/
				/*tanjing: xml新添加属性*/
				for(i=0; i<xmlArrayL; i++){
					tempObj[xmlArray[i]] = thisObj.getAttribute(xmlArray[i]);
				}				
				//单击事件
				if(typeof(parent.funClickArray) != "undefined"){
					var toDoClickNextBus = parent.funClickArray;
					var funClickArrayL = parent.funClickArray.length;
					if(funClickArrayL>0){
						for(i=0; i<funClickArrayL; i++){
							try{
								if(typeof(parent.eval(toDoClickNextBus[i]))=="function" ){
									parent.eval(toDoClickNextBus[i])(tempObj,winId,inputObj,divObj,thisObj);
								}							
							}
							catch(e){								
							}
						}			
					}
				}
/* 				window.parent.document.getElementById('searchvalue1_iframe'+winId).value = tempObj["childName"];
				window.parent.document.getElementById('hidserch_iframe'+winId).value = tempObj["childId"]; */
			}
		}
	}
	
	function toDoMouseDbClick(e) {
		e = window.event || e;
		var obj = e.srcElement || e.target;
		//alert("双击");
		if(inputType == "radio" || inputType == "checkbox" || inputType == "noInput") {
			var tempObj = new Object();
			//var submitObjectArray = new Array(0);
			var thisObj = getObjectById(prefixDiv + getMouseIdByEvent(obj.id));
			if(thisObj != null){
				tempObj["childName"] = thisObj.getAttribute("text");
				tempObj["childId"] = thisObj.getAttribute("returnValue");
				tempObj["returnValue"] = thisObj.getAttribute("returnValue");
				
				
				/*新添加的属性开始*/
				tempObj["busContent"] = thisObj.getAttribute("busContent");
				/*新添加的属性结束*/
				/*tanjing: xml新添加属性*/
				for(i=0; i<xmlArrayL; i++){
					tempObj[xmlArray[i]] = thisObj.getAttribute(xmlArray[i]);
				}				
				//双击事件
				if(typeof(parent.funDbClickArray) != "undefined"){
					var toDoDbClickNextBus = parent.funDbClickArray;
					var funDbClickArrayL = parent.funDbClickArray.length;
					if(funDbClickArrayL>0){
						for(i=0; i<funDbClickArrayL; i++){
							try{
								if(typeof(parent.eval(toDoDbClickNextBus[i]))=="function" ){
									parent.eval(toDoDbClickNextBus[i])(tempObj,winId);
								}							
							}
							catch(e){								
							}
						}			
					}
				}
			}
		}
	}
	
	function toDoMouseOver(e) {
		e = window.event || e;
		var obj = e.srcElement || e.target;
	}
	
	function toDoMouseOut(e) {
		e = window.event || e;
		var obj = e.srcElement || e.target;
	}


</script>
</head>
<body onLoad="doOnLoad()" topmargin=0 leftmargin=0 background="" >
<form name="form" method="post">
<div>
<!-- 	<div class="searchhead" style="height:50px;width:400px;padding-left:2px;width:290px;">
		<div class="select_type" style="padding-left:5px;width:285px;">
			<div style="float:left;padding-left:5px;">查找范围：</div>
			<input type="text" id="searchvalue1" name="searchname1" value="" readOnly="true"/><input type="hidden" id="hidserch" name="hidserch"/>
		</div>
		<div class="inputKey" style="width:285px;">
			<div style="float:left;">组织人员：</div>
			<input type="text" id="searchvalue" name="searchname" value="" style="float:left;"/>
			<div class="searchbtn" style="margin-left:10px" onClick="showcontent('+"'iframe"+win_id+"','" +win_body+"'"+')"><span class="characters1">查找</span></div>
		</div>
	</div> -->
	<!--树开始-->    
	<div name="deeptree" id="deeptree" class="deeptree" style="z-index: 1000px;"></div>
	<!--树结束-->
</div>
</form>
</body>
</html>
