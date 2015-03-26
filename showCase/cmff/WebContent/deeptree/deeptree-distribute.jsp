<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<link href="<%=request.getContextPath()%>/css/common/df.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ucdf/deeptree/css/deeptree.css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery/jquery-1.7.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/df.js"></script>
<%@ include file="include/rmGlobal.jsp" %>

</head>
<body>
<form name="form" method="post">
<div>
<table style="border: 1px solid #9EB4CD; border-spacing: 1px;padding: 1px;">
	<tr>		
        <td align="left">
    		<input type="button" value="选择" onClick="showTree()"/>
           	
        </td> 
	</tr>
	
</table>
</div>

</form>	
<script type="text/javascript">
	<% String dataType="xml"; %>   //xml代表加载树的数据文件配置为xml格式，json代表加载树的数据文件配置为json格式
	<% String dataType1="json"; %> 
    var funClickArray = new Array();//单击事件自定义方法
    	funClickArray[0] ="fun1";
    	funClickArray[1] ="fun2";
    	/*	var funDbClickArray = new Array();//双击事件自定义方法
	    funDbClickArray[0] ="dbfun1";
	    funDbClickArray[1] ="dbfun2";*/
	var xmlArray = new Array();//单双击事件xml返回参数自定义
		xmlArray[0] = "conmentName";
		xmlArray[1] = "test2";
	var dfDeeptreeFuzzySearch = "<%=request.getContextPath()%>/dfDeeptreeFuzzySearch.do";
	var dfDeeptreeSearch = "<%=request.getContextPath()%>/dfDeeptreeSearch.do";
	function showTree(){
		var body_width = 300;
		var body_height = 500;
		var win_ico = "";
		var win_name = "派发树";
		var win_id = "treeDiv";
		var nodeRelationType = "hasRelation"; //hasRelation代表父子节点有关联，空或noRelation代表父子节点没有关联
		var isOnlyLeaf = "0";	//1代表只回传叶子节点，0代表回传父子节点
		var inputType = "checkbox";	//checkbox代表复选框，radio代表单选框
		var queryCondition = "assist_dept=1";	//异步查询条件
		var win_body = "<%=request.getContextPath()%>/ucdf/deeptree/distributetree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType + "&queryCondition="+ encodeURIComponent(queryCondition);
		win_body += "&rootXmlSource=<%=RmStringHelper.encodeUrl(request.getContextPath() + "/ucdf/deeptree/deeptree_data.jsp?dataType="+dataType)%>";
		var need_shade = true;
		var isCenter = true;
		var win_left = 100;
		var win_top = 100;
		
		//tanjing add begin派发内容返回
		var returnValue = new Array();
		for(var i=0;i<2;i++){			
			returnValue[i] = new Array();
		}	
		//返回值一(顺序不能乱,与确定事件返回参数相对应)
		returnValue[0][0] = "1";//对应busType；1代表派发，2代表送审，3代表抄送
		returnValue[0][1] = "11";//对应childId；节点id
		returnValue[0][2] = "电信事业部";//对应childName；节点值
		returnValue[0][3] = "中国联通-->电信事业部";//对应parentName；节点对应父关系
		returnValue[0][4] = "Company";//对应thisType
		//返回值二
		returnValue[1][0] = "2";
		returnValue[1][1] = "121";
		returnValue[1][2] = "电信事业部";
		returnValue[1][3] = "中国联通-->资源事业部-->电信事业部";
		returnValue[1][4] = "Company";
		//end
		
		//派发树三个按钮的可用状态
		var isUseful = new Array();
		isUseful[0] = "1";//派发：1可用；0不可用
		isUseful[1] = "1";//送审：1可用；0不可用
		isUseful[2] = "1";//抄送：1可用；0不可用
		
		var fuzzySearchType = "0" //前台（0）或后台（1）查询，默认为0
		var fuzzySearchDataType = "0"//前台查询时为0默认为0；后台查询时，查组织为1，查人员为2，默认为1
		
		//页卡相关参数
			//是否有页卡
		var isTabTree = "1";//1有页卡；0无页卡
		
		var tabTree = new Array(); //页卡参数数组定义
		for(var i=0;i<1;i++){			
			tabTree[i] = new Array();
		}
		//页卡二的url
		var win_body1 = "<%=request.getContextPath()%>/ucdf/deeptree/distributetree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType + "&queryCondition="+ encodeURIComponent(queryCondition);
		win_body1 += "&rootXmlSource=<%=RmStringHelper.encodeUrl(request.getContextPath() + "/ucdf/deeptree/deeptree_data.jsp?dataType="+dataType1)%>";
		
		var win_body2 = "<%=request.getContextPath()%>/ucdf/deeptree/distributetree.jsp?winId="+win_id+"&inputType=" + inputType + "&isOnlyLeaf=" + isOnlyLeaf + "&nodeRelationType=" + nodeRelationType + "&queryCondition="+ encodeURIComponent(queryCondition);
		win_body2 += "&rootXmlSource=<%=RmStringHelper.encodeUrl(request.getContextPath() + "/ucdf/deeptree/deeptree_data1.jsp?dataType="+dataType1)%>";
		
		tabTree[0][0] = "常用群组1"; //页卡2 name
		tabTree[0][1] = win_body1;	//页卡2 url
		
		new_distributetree(body_width,body_height,win_ico,win_name,win_id,win_body,need_shade,isCenter,win_left,win_top,isUseful,fuzzySearchType,fuzzySearchDataType,isTabTree,tabTree);
	}
	
	//确定
	function confirmReturnValue(submitStringArray){
		for(var i = 0; i<submitStringArray.length; i++){
			alert(submitStringArray[i]["busType"]); //1代表派发，2代表送审，3代表抄送
			alert(submitStringArray[i]["childName"]);
			alert(submitStringArray[i]["childId"]);
			alert(submitStringArray[i]["thisType"]);
			alert(submitStringArray[i]["parentName"]);
			
			/*新添加的属性开始*/
			alert(submitStringArray[i]["busContent"]);
			/*新添加的属性结束*/
		}
	}

	
	//单击事件
	function toDoClickNextBus(obj,winId){
		document.getElementById('searchvalue1_iframe'+winId).value = obj["childName"];
		document.getElementById('hidserch_iframe'+winId).value = obj["childId"];
	}
/* 	function fun1(obj,winId){
		document.getElementById('searchvalue1_iframe'+winId).value = obj["childName"];
		document.getElementById('hidserch_iframe'+winId).value = obj["childId"]; */
/* 		alert(winId);
			alert("单击1");
			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["childId"]);
			alert(obj["busContent"]);
			alert(obj[xmlArray[0]]);
			alert(obj[xmlArray[1]]); */
/* 	}
	function fun2(obj,winId){ */
/* 		alert(winId);
			alert("单击2");
 			alert(obj["returnValue"]);
			alert(obj["childName"]);
			alert(obj["childId"]);
			alert(obj["busContent"]); */
/* 	} */
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
</script>

</body>
</html>
