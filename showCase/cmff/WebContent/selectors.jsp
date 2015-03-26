<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>下拉选择框</title>
<link href="css/common/cmf-base.css" rel="stylesheet" type="text/css" />
<link href="css/common/selectors.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/common/jquery-1.7.min.js"></script>
<script type="text/javascript" src="js/common/selectors.js"></script>
<script type="text/javascript">

var id1="selw1";
var selArray=["湖南","湖北","其他"];
var selValueArray=["01","02","03"];

var id2="selw2";
var vals=[{text:"湖南",value:"01"},{text:"湖啊啊啊啊爱爱爱啊啊啊啊啊啊北",value:"02"},{text:"其他",value:"03"}];

$(document).ready(function(){
	//initSelectOnArray(id1,selArray,selValueArray,"02");  //带默认值的
	initSelectOnArray(id2,selArray,selValueArray);  //默认值为空
	//initSelectOnJson('selw1s',vals);  //默认值为空
	initSelectOnJson('selw2s',vals,"01");  //带默认值的
	dfReady();
});
</script>

</head>
<body>
<br><br>style 中可设置下拉框的宽度和边框大小
<!--<br><br>高度40px的下拉框 
	 <div class="sel_wrap" style="width: 200px;">
		<span class="selectspan" >--请选择--</span> 
    <a class="select-icon"></a>
		设置下拉框的id 
		<select class="inputselect" id="selw1"></select>
	</div> -->
	<br><br> 高度30px的下拉框  
	<div class="sel_wrap30"  style="width: 200px;border: 1px solid #BBBBBB;">
		<span class="selectspan">--请选择--</span> 
    <a class="select-icon"></a>
		<!--设置下拉框的id  -->
		<select class="inputselect"  id="selw2"></select>
	</div>
	
	<br><br>
	
	<div class="sel_wrap30"  style="width: 200px;border: 1px solid #BBBBBB;">
		<span class="selectspan">--请选择--</span> 
    <a class="select-icon"></a>
		<!--设置下拉框的id  -->
		<select class="inputselect"  id="selw2s"></select>
	</div>
	
	<br/><br/>
	
	字段一  <input class="stanInput"/>
	
	<br/><br/>
	
	复选框  
	<div class="check-box"><i><input name="check-box" type="checkbox"/></i></div>
	
	<br/><br/>
	
	单选框
	<div>
	<div class="radio-box"><i><input name="radio-box" type="radio" class="radioInput"/></i></div>
	<div class="radio-box"><i><input name="radio-box" type="radio" class="radioInput"/></i></div>
	</div>
	
	<br/><br/>
	
	普通按钮
	<button type="button" class="btn btn-default">查询</button>
	<button type="button" class="btn btn-primary">取消</button>
	<br/><br/>
	不可操作的按钮
	<button type="button" class="btn btn-disabled">高级查询</button>
	<br/><br/>
	宽度为80px定宽的按钮
	<button type="button" class="btn-fixed80 btn-default">确认</button>
</body>
</html>