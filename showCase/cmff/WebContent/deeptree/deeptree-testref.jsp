<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>

<link href="<%=request.getContextPath()%>/css/common/df.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/deeptree/css/deeptree.css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery/jquery-1.7.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/df.js"></script>
<%@ include file="include/rmGlobal.jsp" %>
</head>
<body>
<form name="form" method="post">
<div>
<table style="border: 1px solid #9EB4CD; border-spacing: 1px;padding: 1px;">
	<tr>		
		<td align="right">选择部门</td>
        <td align="left">
        <div class="selInputdiv" style="width: 200px;border: 1px solid #bbbbbb;">
            <div class="dfReference" hiddenInputId="assist_dept2,assist_dept_name2"></div><input type="text" class="text_field_reference_readonly" name="assist_dept_name2" hiddenInputId="assist_dept2,assist_dept_name2" inputname="协办部门" maxlength="500" style="border:none;"/><input type="hidden" name="assist_dept2"/><i onClick="showTree()"></i>
        </div> 
        	<input type="button" value="自由树" onclick="deeptreefree()"/>
        	<input type="button" onClick="clearSelectedCheckbox('freeTree1')" value="清空自由树复选框选中状态">
    		<input type="hidden" name="assist_dept_com2"/>
    		<input type="button" onClick="treeNodeUp()" value="上移"></input>
    		<input type="button" onClick="treeNodeDown()" value="下移"></input>
    		<input type="button" onClick="treeNodeTop()" value="置顶"></input>
    		<input type="button" onClick="treeNodeBottom()" value="置底"></input>
    		<input type="button" onClick="treeNodeReturn()" value="保存"></input>
        </td> 
	</tr>
</table>
</div>
</form>	
<div id="loaddeeptree" style="float:left;">

</div>
<script type="text/javascript">
	var dfDeeptreeFuzzySearch = "<%=request.getContextPath()%>/dfDeeptreeFuzzySearch.do";//模糊查询结果用于显示查询列表
	var dfDeeptreeSearch = "/ucloudapp/ucdf/deeptree/serch_data.jsp";//精确查询全路径，用于展示查询出来的树
    <% String dataType="xml"; %>   //xml代表加载树的数据文件配置为xml格式，json代表加载树的数据文件配置为json格式
    <% String dataType1="json"; %> 
    var funClickArray = new Array();//单击事件自定义方法
	    funClickArray[0] ="fun1";
	    funClickArray[1] ="fun2";
	var funDbClickArray = new Array();//双击事件自定义方法
	    funDbClickArray[0] ="dbfun1";
	    funDbClickArray[1] ="dbfun2";
	var xmlArray = new Array();//单双击事件xml返回参数自定义
		xmlArray[0] = "dfurl";
		xmlArray[1] = "test2";
	var defaultShowArray = new Array();//树加载完成自定义方法
		defaultShowArray[0] ="show1";
	    defaultShowArray[1] ="show2";
/* 	var headInfo = new Array();//列表树头信息
		headInfo[0] = "树节点"
		headInfo[1] = "id1";
		headInfo[2] = "name1"; */
		deeptreeData={"aa":"aa1","bb":"bb"};
	function showTree(){
		var dtConfirmFun = "returnVlueFun";//确定方法名
		var body_width = 300;
		var body_height = 500;
		var win_ico = "";
		var win_name = "组织树";
		var win_id = "treeDiv";
		var nodeRelationType = "hasRelation"; //hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
		var isOnlyLeaf = "0";	//1代表只回传叶子节点，0代表回传父子节点
		var inputType = "checkbox";	//checkbox代表复选框，radio代表单选框，noInput代表无
		var queryCondition = "assist_dept=1&tan=2";	//异步查询条件,如果没有查询条件请设置成""
		var dept_value = form.assist_dept2.value;
		var win_body = "<%=request.getContextPath()%>/deeptree/deeptree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType+ "&defaultSelectedNodesValue="+ dept_value+ "&queryCondition="+ encodeURIComponent(queryCondition);
		//win_body += "&rootXmlSource=../ucdf/deeptree/deeptree_data.do?" + encodeURIComponent("teststr=3&searchvalue=5&dataType=xml");
		win_body += "&rootXmlSource=<%=request.getContextPath()%>/deeptree/xmlData.xml?" + encodeURIComponent("teststr=3&searchvalue=5&dataType=xml");
		var need_shade = true;
		var isCenter = true;
		var win_left = "100";
		var win_top = "100";
						
		//返回参数的调用
		var paramArray = new Array();
		paramArray[0] = "form.assist_dept2";
		paramArray[1] = "form.assist_dept_name2";
		paramArray[2] = "form.assist_dept_com2";
		
		//是否有查询
		var isSearchBox = "1" ;//1为有查询；0为无查询
		//定义前后台查询
		var fuzzySearchType = "1" //前台（0）或后台（1）查询，默认为0
		var fuzzySearchDataType = "1"//前台查询时为0默认为0；后台查询时，查组织为1，查人员为2，只查组织为3，只查人员为4， 5为查公司但显示的是查组织，默认为1.
		
			//页卡相关参数
			//是否有页卡
		var isTabTree = "1";//1有页卡；0无页卡
			//页卡二的url
		var win_body1 = "<%=request.getContextPath()%>/deeptree/deeptree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType + "&queryCondition="+ encodeURIComponent(queryCondition);
		
		funClickArray[0] = 'deeptreefun';
		
		new_tree(body_width,body_height,win_ico,win_name,win_id,win_body,win_body1,dept_value,need_shade,isCenter,win_left,win_top,paramArray,dtConfirmFun,isSearchBox,fuzzySearchType,fuzzySearchDataType,isTabTree);
	}
	
	//单击事件
	function deeptreefun(obj,winId,inputObj,divObj,thisObj){
		var treeTab = jQuery(".treedfWinTabHead2").attr("tabwinid");
		//if(treeTab == "treeDiv"){
		if(thisObj.getAttribute("type") == "parent"){
			document.getElementById('searchvalue1_iframe'+winId).value = obj["childName"];
			document.getElementById('hidserch_iframe'+winId).value = obj["childId"];
		}
		//}
	}
	
	//获取自由树
   	function deeptreefree(){
		var nodeRelationType = "hasRelation"; //hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
		var isOnlyLeaf = "0";	//1代表只回传叶子节点，0代表回传父子节点
		var inputType = "checkbox";	//checkbox代表复选框，radio代表单选框
		var queryCondition = "assist_dept=1";	//异步查询条件
		var win_id = "freeTree1";
		var win_body = "<%=request.getContextPath()%>/deeptree/deeptreefree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType+ "&queryCondition="+"'"+ queryCondition +"'";
		win_body += "&rootXmlSource=<%=request.getContextPath()%>/deeptree/xmlData.xml?" + encodeURIComponent("teststr=3&searchvalue=5&dataType=xml");
		//jQuery("#loaddeeptree").load(win_body);
		jQuery.ajax({
			url:win_body,
			success:function(data){
				jQuery("#loaddeeptree").html(data);
			}
		});
		funClickArray[0] = 'fun1';
	}
/* 	function returnVlueFun(submitStringArray){ //确定方法自定义
		for(var i = 0; i<submitStringArray.length; i++){		
			alert(submitStringArray[i]["childName"]); //name
			alert(submitStringArray[i]["childId"]);	  //id	
		}
	} */
	
	function show1(){
/* 		$('.TreeNode').each(function(){
			var test = $(this).attr("text");
			if (test == '电信事业部') {
			alert(test);}
		}); */
	}
	
	//单击事件
	function fun1(obj,winId,inputObj,divObj,thisObj){
		$("span[name='deeptree_span']").css("color","#000000");
		thisObj.style.color='red';
/* 		document.getElementById('searchvalue1_iframe'+winId).value = obj["childName"];
		document.getElementById('hidserch_iframe'+winId).value = obj["childId"]; */
//单击文字时让复选框选中
/* 		if(inputObj.checked){
			inputObj.checked = false;
			divObj.className = "tree-firerift-style-o off";
		}else{
			inputObj.checked = true;
			divObj.className = "tree-firerift-style-o on";
		} 
/*   		alert(winId);
			alert("单击1");
			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["childId"]);
			alert(obj["busContent"]);  
			alert(obj[xmlArray[0]]);
			alert(obj[xmlArray[1]]);  
		 var url=obj[xmlArray[0]];
		treefroms_win(url); */
	}
	function fun2(obj,winId,thisObj){
/* 		alert(winId);
			alert("单击2");
 			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["childId"]);
			alert(obj["busContent"]); */ 
	}
	
	//双击事件
	function dbfun1(obj,winId){
/* 		alert(winId);
			alert("双击1");
			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["busContent"]);
			alert(obj[xmlArray[0]]);
			alert(obj[xmlArray[1]]);  */
	}
	function dbfun2(obj,winId){
/* 		alert(winId);
			alert("双击2");
 			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["busContent"]); */ 
	}
//清除自由树checkbox的选中状态
	function clearSelectedCheckbox(winId){
		jQuery("div.tree-firerift-style-o.on").each(function(i,val){
			var divobj=jQuery(this);
			var ckobj=divobj.prev();
			if(ckobj.attr('name')==winId+"deeptree_checkbox"){
				divobj.attr('class','tree-firerift-style-o off');
				ckobj.attr('checked',false);
			}
		});
	}
	function treefroms_win(win_body){
		jQuery("#win_id").remove()
		var win_html = "";
		win_html += '<div class="win_body1" style="width:100%;height:100%;">'
		+ 		'<iframe src="'+win_body+'" marginwidth="0" frameborder="0" marginheight="0" style="width:100%;height:100%;border:0;" id="iframe"  name="iframe"></iframe>'
		+	'</div>'	
		var div = document.createElement("div");
		div.id = "win_id";
		div.innerHTML = win_html;
		div.style.zIndex = '9999';
		div.style.paddingLeft = '400px'
		jQuery("#loaddeeptree").after(div);
		//document.getElementById("loaddeeptree").appendChild(div);
		document.getElementById("win_id").style.display = "";
	}
/*  	function returnVlueFun(submitObjectArray){
		for(var i=0; i<submitObjectArray.length; i++) {
			alert(submitObjectArray[i]["returnValue"]);
			alert(submitObjectArray[i]["childName"]);
			alert(submitObjectArray[i]["busContent"]);
		}
	}  */
	//清空复选框选中状态（调用子页面方法）
 	function deeptreeClear(){
		var win_id = "treeDiv";//win_id为树的id和showTree()相同
		var iframetree = window.frames["iframe"+win_id];//
		iframetree.toDodeeptreeClear(win_id);
	}
	
	//移动过节点的父节点
	var parentTreeNodeArray = new Array();
	
	//树节点上移
	function treeNodeUp(){
	    var onthis=jQuery(".HighLight").parent();
	    var getUp=onthis.prev();
	    if(!onthis.prev()[0]){
	    	//alert("顶级元素不能上移");
	    	return;
	    }
	    if(getUp.attr('class')!='TreeNode'){
	    	getUp = onthis.prev().prev();
	    }
	    if(onthis.attr('type')=='parent'){
	    	var onthisChild = onthis.next();
	    	jQuery(getUp).before(onthisChild);
	    	jQuery(onthisChild).before(onthis);
	    }else{
	    	jQuery(getUp).before(onthis);
	    }
	    
	    if(onthis.attr('type') == 'leaf'){
	    	onthis.children()[1].src = lastNodeImagePath + "/l-.png";
	    }else if(onthis.attr('type') == 'parent'){
	    	if(onthis.next()[0].style.display == 'none'){
	    		onthis.children()[1].src = lastNodeImagePath + "/z.png";
	    	}else{
	    		onthis.children()[1].src = lastNodeImagePath + "/v.png";
	    	}
	    	onthis.next()[0].style.background = "url("+lastNodeImagePath + "/line.png) repeat-y";
	    }
	    
	    if(getUp.attr('type') == 'leaf'){
	    	if(!getUp.next()[0]){
	    		getUp.children()[1].src = lastNodeImagePath + "/L.png";
	    	}
	    }else if(getUp.attr('type') == 'parent'){
	    	if(!getUp.next().next()[0]){
				if(getUp.next()[0].style.display == "none"){
					getUp.children()[1].src = lastNodeImagePath + "/Lz.png";
				}else{
					getUp.children()[1].src = lastNodeImagePath + "/Lv.png";
				}
				getUp.next().css("background","");
	    	}
	    }
	    //将移动过节点的父节点存入数组
	    var parentNode =onthis.parent().prev();
	    if(!parentNode[0]){
	    	parentNode = onthis.parent();
	    }
	    saveParentNode(parentNode.attr('id'));
	}
	//树节点下移
	function treeNodeDown(){
		var onthis=jQuery(".HighLight").parent();
		var getDown=onthis.next();
	    if(!onthis.next()[0]){
	    	//alert("底层元素不能下移");
	    	return;
	    }
	    if(onthis.attr('type')=='parent'){
	    	getDown = onthis.next().next();
		    if(!onthis.next().next()[0]){
		    	//alert("底层元素不能下移");
		    	return;
		    }
	    }
	    if(getDown.attr('type')=='parent'){
	    	var getDownChild = getDown.next();
	    	jQuery(onthis).before(getDownChild);
	    	jQuery(getDownChild).before(getDown);
	    }else{
	    	jQuery(onthis).before(getDown);
	    }
	    
	    if(getDown.attr('type') == 'leaf'){
	    	getDown.children()[1].src = lastNodeImagePath + "/l-.png";
	    }else if(getDown.attr('type') == 'parent'){
	    	if(getDown.next()[0].style.display == 'none'){
	    		getDown.children()[1].src = lastNodeImagePath + "/z.png";
	    	}else{
	    		getDown.children()[1].src = lastNodeImagePath + "/v.png";
	    	}
	    	getDown.next()[0].style.background = "url("+lastNodeImagePath + "/line.png) repeat-y";
	    }
	    
	    if(onthis.attr('type') == 'leaf'){
	    	if(!onthis.next()[0]){
	    		onthis.children()[1].src = lastNodeImagePath + "/L.png";
	    	}
	    }else if(onthis.attr('type') == 'parent'){
	    	if(!onthis.next().next()[0]){
				if(onthis.next()[0].style.display == "none"){
					onthis.children()[1].src = lastNodeImagePath + "/Lz.png";
				}else{
					onthis.children()[1].src = lastNodeImagePath + "/Lv.png";
				}
				onthis.next().css("background","");
	    	}
	    }
	    //将移动过节点的父节点存入数组
	    var parentNode =onthis.parent().prev();
	    if(!parentNode[0]){
	    	parentNode = onthis.parent();
	    }
	    saveParentNode(parentNode.attr('id'));
	}
	
	//树节点置顶
	function treeNodeTop(){
		var onthis=jQuery(".HighLight").parent();
		var getTop=onthis.parent().children()[0];
		var getUp=onthis.prev();
	    if(!getUp[0]){
	    	//alert("已经在最顶层");
	    	return;
	    }
	    if(getUp.attr('class')!='TreeNode'){
	    	getUp = onthis.prev().prev();
	    }
		if(onthis.attr('type')=='parent'){
			var onthisChild = onthis.next();
	    	jQuery(getTop).before(onthisChild);
	    	jQuery(onthisChild).before(onthis);
		}else{
			jQuery(getTop).before(onthis);
		}
		
	    if(onthis.attr('type') == 'leaf'){
	    	onthis.children()[1].src = lastNodeImagePath + "/l-.png";
	    }else if(onthis.attr('type') == 'parent'){
	    	if(onthis.next()[0].style.display == 'none'){
	    		onthis.children()[1].src = lastNodeImagePath + "/z.png";
	    	}else{
	    		onthis.children()[1].src = lastNodeImagePath + "/v.png";
	    	}
	    	onthis.next()[0].style.background = "url("+lastNodeImagePath + "/line.png) repeat-y";
	    }
	    
	    if(getUp.attr('type') == 'leaf'){
	    	if(!getUp.next()[0]){
	    		getUp.children()[1].src = lastNodeImagePath + "/L.png";
	    	}
	    }else if(getUp.attr('type') == 'parent'){
	    	if(!getUp.next().next()[0]){
				if(getUp.next()[0].style.display == "none"){
					getUp.children()[1].src = lastNodeImagePath + "/Lz.png";
				}else{
					getUp.children()[1].src = lastNodeImagePath + "/Lv.png";
				}
				getUp.next().css("background","");
	    	}
	    }
	    //将移动过节点的父节点存入数组
	    var parentNode =onthis.parent().prev();
	    if(!parentNode[0]){
	    	parentNode = onthis.parent();
	    }
	    saveParentNode(parentNode.attr('id'));
	}
	
	//树节点置底
	function treeNodeBottom(){
		var onthis=jQuery(".HighLight").parent();
		var getBottom=onthis.parent().children().last();
		if(onthis.attr('type')=='parent'){
			if(!onthis.next().next()[0]){
		    	//alert("已经在最底层");
		    	return;
			}
			var onthisChild = onthis.next();
			jQuery(getBottom).after(onthis);
			jQuery(onthis).after(onthisChild);
		}else{
			if(!onthis.next()[0]){
		    	//alert("已经在最底层");
		    	return;
			}
			jQuery(getBottom).after(onthis);
		}
		
	    if(getBottom.attr('type') == 'leaf'){
	    	getBottom.children()[1].src = lastNodeImagePath + "/l-.png";
	    }else{
	    	if(getBottom[0].style.display == 'none'){
	    		getBottom.prev().children()[1].src = lastNodeImagePath + "/z.png";
	    	}else{
	    		getBottom.prev().children()[1].src = lastNodeImagePath + "/v.png";
	    	}
	    	getBottom[0].style.background = "url("+lastNodeImagePath + "/line.png) repeat-y";
	    }	    
	    if(onthis.attr('type') == 'leaf'){
	    	if(!onthis.next()[0]){
	    		onthis.children()[1].src = lastNodeImagePath + "/L.png";
	    	}
	    }else if(onthis.attr('type') == 'parent'){
	    	if(!onthis.next().next()[0]){
				if(onthis.next()[0].style.display == "none"){
					onthis.children()[1].src = lastNodeImagePath + "/Lz.png";
				}else{
					onthis.children()[1].src = lastNodeImagePath + "/Lv.png";
				}
				onthis.next().css("background","");
	    	}
	    }
	    //将移动过节点的父节点存入数组
	    var parentNode =onthis.parent().prev();
	    if(!parentNode[0]){
	    	parentNode = onthis.parent();
	    }
	    saveParentNode(parentNode.attr('id'));
	}
	
	//将移动过节点的父节点存入数组
	function saveParentNode(parentNode){
		var b = false;
		for(i=0;i<parentTreeNodeArray.length;i++){
			if(parentTreeNodeArray[i] == parentNode){
				b = true;
				break;
			} 
		}
		if(b){
			return;
		}else{
			parentTreeNodeArray[parentTreeNodeArray.length] = parentNode;
		}
		//alert(parentTreeNodeArray);
	}
	
	
	//保存移动后的树节点顺序
	function treeNodeReturn(){
		var returnJsonArr = new Array();
		for(var i=0;i<parentTreeNodeArray.length;i++){	
			var returnJson = new Object();
			var parentTreeNodeId = parentTreeNodeArray[i]
			var b = parentTreeNodeId.replace(new RegExp(/(>)/g),'\\>');
			var turnParentTreeNodeId = b.replace(new RegExp(/(-)/g), '\\-');			
			//移动过的父节点
			//alert(jQuery("#"+turnParentTreeNodeId).attr('realid'));
			returnJson["parentId"] = jQuery("#"+turnParentTreeNodeId).attr('realid');
			var onthis = jQuery("#"+turnParentTreeNodeId).next();
			var thisChildren = onthis.children(".TreeNode");
			var thisChildrenIds = "";
			for(var j=0;j<thisChildren.length;j++){
				if(j!=0){
					thisChildrenIds += ",";
				}
				thisChildrenIds += jQuery(thisChildren[j]).attr('realid');
			}
			/* onthis.children(".TreeNode").each(function(){
				//移动过的节点按顺序输出
				alert(jQuery(this).attr('realid'));
			}); */
			returnJson["childrenIds"] = thisChildrenIds;
			returnJsonArr.push(returnJson);
			alert(returnJsonArr);
		}
		//返回格式说明，json数组：[{parentId:"",childrenIds:""},{parentId:"",childrenIds:""},...]
		return returnJsonArr;
	}
</script>
</body>
</html>
