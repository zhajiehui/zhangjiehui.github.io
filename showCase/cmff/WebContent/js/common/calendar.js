//调用
$(".start-date-picker-toggle").click(function(){
	SelectDate(this,'yyyy-MM-dd hh:mm:ss');
});

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
/*========================================== 日期控件 begin =================================*/
/*
* 返回日期
* @param d the delimiter
* @param p the pattern of your date
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
/**
 * 返回日期
 * @param d the delimiter
 * @param p the pattern of your date
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

/**
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
 * Date.prototype.dfformat						 格式化日期
 * String.prototype.dfToDate					 将字符串转为日期对象
 * dfCalendar.prototype.setCalPosition(thisObj,C调整日期控件的显示位置
 * $(".dfCalendarTimeInput").live("keydown"     数字输入框,控制输入框只能输入有效数字
 * dfCalendar.prototype.dfKeyUpTimeDate         键盘上键调整时间
 * dfCalendar.prototype.dfKeyDownTimeDate       键盘下键调整时间
 * dfCalendar.prototype.dfDateTest(CalendarTimeI设置时间输入框校验
 * dfCalendar.prototype.bindFunc                对日期控件绑定注册事件
 * dfCalendar.prototype.compareDate             设置日期比较
 * 
 * 日期控件方法
 * function dfCalendar()						 日期控件类
 * dfCalendar.prototype.language				 语言包
 * dfCalendar.prototype.formatMode				 日期格式标记方法
 * dfCalendar.prototype.getMonthViewArray		 返回某月的日(数组)
 * dfCalendar.prototype.getElement				 获取日期控件页面元素
 * dfCalendar.prototype.draw					 画出日期控件无数据部分
 * dfCalendar.prototype.bind				             在画出的日期控件中日的单元格
 * dfCalendar.prototype.changeInput				 调整日期控件中所有输入框以符合当前日期
 * dfCalendar.prototype.goPrevYear				  向前一年
 * dfCalendar.prototype.goNextYear				  向后一年
 * dfCalendar.prototype.goPrevMonth				  向前一月
 * dfCalendar.prototype.goNextMonth				  向前一月
 * dfCalendar.prototype.resetDate				  重置
 * dfCalendar.prototype.goSelectDay				  选中某日
 * dfCalendar.prototype.calInputControl			  控制输入框只能输入有效数字
 * dfCalendar.prototype.returnDate				  返回日期，写入输入框
 * dfCalendar.prototype.hide					   隐藏日期控件
 * dfCalendar.prototype.show					   显示日期控件
 * 
 * dfCalendar.prototype.currentDate				   按钮方法_现在
 * dfCalendar.prototype.submitDate				   按钮方法_确定
 * dfCalendar.prototype.deleteDate				   按钮方法_取消
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
 * queryCondition 使用$选择器规则
 */
dfCalendar.prototype.getElement = function(queryCondition){
	return $(this.panel).find(queryCondition);
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
	var CalInputToBottom = $(document).height()-InputAreaY-CalInputArea.offsetHeight;//输入框到当前页面底部的距离
	var CalHeight = CalendarObj.offsetHeight + 14;//获取日历高度
	
	if((InputAreaX + CalendarObj.offsetWidth + 14) > $(document).width()){
		CalendarObj.style.left =$(document).width() - CalendarObj.offsetWidth - 14 + "px";
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
		if(CalHeight > $(window).height()){
			//浏览器可视高度小于日历高度，日历距离浏览器顶部3px
			CalendarObj.style.top = 3+"px";
		}else{
			//浏览器可视高度大于等于日历高度时，日历向垂直方向（Y）居中
			CalendarObj.style.top = Math.round(($(window).height()-CalHeight)/2)+"px";
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
	    html +=		'<div class="dfCalBody">'
        	 +		'<div class="dfCalendar">'
             +			'<div class="dfCalYear">'
             +				'<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle"><table><tr><td style="border:0;" >'
						 +			    	'<div class="dfCalYearGo dfCalYearLeftGo" ></div>'
			 +					'<div class="dfCalYearGo dfCalMonthLeftGo" ></div>';
    if(document.documentMode < 7){
	    html += 				'<div class="dfCalYearNum"><input class="dfCalYearInput dfCalendarTimeInput" style="width:33px;"></input></div>'
			 +  				'<div class="dfCalText24">年</div>'
		     +  				'<div class="dfCalMonthNum">'
	      	 +					'<div class="dfCalMinShadow" dfCalShadowLevel="5"></div>'
	    	 + 					'<input class="dfCalMonthInput dfCalInput" style="width:17px;"></input></div>';
	}else{
		html += 				'<div class="dfCalYearNum"><input class="dfCalYearInput dfCalendarTimeInput"></input></div>'
			 +  				'<div class="dfCalText24">年</div>'
			 +  				'<div class="dfCalMonthNum">'
	       	 +					'<div class="dfCalMinShadow" dfCalShadowLevel="5"></div>'
	    	 +	 				'<input class="dfCalMonthInput dfCalInput dfCalendarTimeInput"></input></div>';
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
    		 +              '<table style="margin-left:28px; margin-top:5px;float:left;"><tr><td>'
    		 +  				'<div class="dfCalHour">'
	         +						'<div class="dfCalMinShadow" dfCalShadowLevel="3" ></div>'
        	 +					'<input class="dfCalHourInput dfCalendarTimeInput" style="width:17px;"></input></div>'
		     + 					'<div class="dfCalText20">:</div>'
             +  				'<div class="dfCalMinute">'
             +						'<div class="dfCalMinShadow" dfCalShadowLevel="2"></div>'
        	 +	 				'<input class="dfCalMinuteInput dfCalendarTimeInput" style="width:17px;"></input></div>'
		     +  				'<div class="dfCalText20">:</div>'
             +  				'<div class="dfCalSecond">'
             +						'<div class="dfCalMinShadow" dfCalShadowLevel="1"></div>'
             +    				'<input class="dfCalSecondInput dfCalendarTimeInput" style="width:17px;"></input></div>';
    }else{
    	html += 		'<div class="dfCalSelectTime" style="margin-top:0;">'
             +  			'<div class="borderWhite"></div>'
    		 +              '<table style="margin-left:28px; margin-top:5px;float:left;border-collapse:collapse;"><tr><td>'
    		 +  				'<div class="dfCalHour">'
		     +						'<div class="dfCalMinShadow" dfCalShadowLevel="3"></div>'
		     +					'<input class="dfCalHourInput dfCalendarTimeInput"></input></div>'
		     +  				'<div class="dfCalText20">:</div>'
             +  				'<div class="dfCalMinute">'
	       	 +						'<div class="dfCalMinShadow" dfCalShadowLevel="2"></div>'
	    	 +	 				'<input class="dfCalMinuteInput dfCalendarTimeInput"></input></div>'
		     +  				'<div class="dfCalText20">:</div>'
             +  				'<div class="dfCalSecond">'
		     +						'<div class="dfCalMinShadow" dfCalShadowLevel="1"></div>'
   			 +					'<input class="dfCalSecondInput dfCalendarTimeInput"></input></div>';
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
		 $('.dfCalDateTable').each(function(){
			var trs = $(this).children().children().children("tr");//tr
			for(var i=0; i<trs.length; i++){
				var td = $(trs[i]).children("td");
				$(td[0]).css("border-left","0px");
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
		var dfCalShadowLevel = $(this).attr("dfCalShadowLevel");
		if(dfCalShadowLevel>=dateFormatMode){
			$(this).hide();
		}else{
			$(this).show();
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
	//上一年
	this.getElement(".dfCalYearLeftGo")[0].onclick = function(){dfThisCal.goPrevYear();};
	//下一年
	this.getElement(".dfCalYearRightGo")[0].onclick = function(){dfThisCal.goNextYear();};
	//上一月
	this.getElement(".dfCalMonthLeftGo")[0].onclick = function(){dfThisCal.goPrevMonth();};
	//下一月
	this.getElement(".dfCalMonthRightGo")[0].onclick = function(){dfThisCal.goNextMonth();};
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
	//点击body任一处隐藏日历面板
	$(".dfCalendarPanel").on("mouseenter",function(){
		dfCalmouseIn = 1;
	});
	$(".dfCalendarPanel").on("mouseleave",function(){
		dfCalmouseIn = 0;
	});

	$("body").live("click",function(e){
		e = e || window.event;
		if(dfCalmouseIn == 0){ 
			if(e.target != dfThisCal.thisI){
				$(".dfCalendarPanel").hide();
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
					tdDatePanelArr[i].className = "tdDatePanel dfCalThisDay";//今天红
				}else{
					tdDatePanelArr[i].className = "tdDatePanel dfCalThisDay";//选中选择天，红
				}
			}else if(currentDate.getFullYear() == this.year 
					&& currentDate.getMonth() == this.month 
					&& currentDate.getDate() == i-dayOfFirstDay+1){//当前天
				tdDatePanelArr[i].className = "tdDatePanel dfCalCurrentDay";//今天灰
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
		$(this.thisInput).change();
		$(this.thisInput).focus();
		$(this.thisInput).blur();
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
		this.getElement(CalendarTimeInput).parent().css("border","1px solid #0088cc");
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
		this.getElement(CalendarTimeInput).parent().css("border","1px dotted #bbbbbb");
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
	if($(thisObj).prev()[0]){
		thisInput = $(thisObj).prev()[0];
	}else{
		thisInput = $(thisObj).parent().prev().children("input")[0];
	}
	
	
	if($(thisInput).val().length != 0){
		date = $(thisInput).val().dfToDate(dateformat);
	}else if(dDate != null && dateformat != null){
		date = dDate.dfToDate(dateformat);
	}else{
		date = new Date();
	}
	if(dfCal == null){
		dfCal = new dfCalendar({
			thisInput:thisInput,
			thisI:thisObj,
			thisInputPanel:$(thisInput).parents("div")[0],
			dateFormat:dateformat,
			date:date,
			fDate:fDate,
			lDate:lDate
		});
	}else{
		dfCal.thisInput = thisInput;
		dfCal.thisI = thisObj;
		dfCal.thisInputPanel = $(thisInput).parents("div")[0];
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





/*
$("body").live("click",function(e){
	e = e || window.event;
	var target = $(e.target);
//	alert(typeof(target));
	if(dfCalmouseIn == 0){ 
		if(!target.is('i') || $(target.parents()[0]).find("input.calInput")[0] == undefined){
			$(".dfCalendarPanel").hide();
		}
	}
	/*if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
	if(dfCalClicked){
		return dfCalClicked = 0;
		$(".dfCalendarPanel").show();
	}
	if(dfCalmouseIn == 0){
		$(".dfCalendarPanel").hide();
	}else{
		return;
	}
});

/*========================================== 日期控件 end =================================*/
/*Calendar.prototype.draw = function(thisObj){
	var html = "";
	var tr = 6;
	var td = 7;
	
		html += '<div class="CalendarPanel-days" style="display:block;">'
				 +			'<table class="table-condensed">'
				 +				'<thead>'
				 +					'<tr>'
				 +						'<th class="prev">'
				 +							'<a class="icon icon-chevron-left"></a>'
				 +						'</th>'
				 +						'<th class="datepicker-switch" colspan="5"></th>'
				 +						'<th class="next">'
				 +							'<a class="icon icon-chevron-right"></a>'
				 +						'</th>'
				 +					'</tr>'
				 +					'<tr>'
				 +						'<th class="dow">日</th>'
				 +						'<th class="dow">一</th>'
				 +						'<th class="dow">二</th>'
				 +						'<th class="dow">三</th>'
				 +						'<th class="dow">四</th>'
				 +						'<th class="dow">五</th>'
				 +						'<th class="dow">六</th>'
				 +					'</tr>'
				 +				'</thead>'
				 +				'<tbody>';
				 for(var i = 0;i < tr;i++){
					 html += '<tr>';
					 for(var j = 0;j < td;j++){
						 html += '<td class="day"></td>';
					 }
					 html += '</tr>';
				 }
		html +=				'</tbody>'
				 +				'<tfoot>'
				 +					'<tr>'
				 +						'<th class="today" colspan="3">今天</th>'
				 +						'<th class="tomorrow" colspan="2">明天</th>'
				 +						'<th class="someday" colspan="2">清除</th>'	
				 +					'</tr>'
				 +				'</tfoot>'
				 +			'</table>'
				 +	'</div>';
             
     var CalendarHomemake = document.createElement("div");
     CalendarHomemake.className = "CalendarPanel";
		 CalendarHomemake.id = "CalendarPanel";
		 CalendarHomemake.style.position = "absolute";
     CalendarHomemake.style.left = "0px";
     CalendarHomemake.style.top = "0px";
		 CalendarHomemake.style.display = "block";
     CalendarHomemake.innerHTML = html;
	   document.body.appendChild(CalendarHomemake);
		 
		 this.setCalPosition(thisObj,CalendarHomemake); 
	 

	 if(document.documentMode<7){
		 $('.dfCalDateTable').each(function(){
			var trs = $(this).children().children().children("tr");//tr
			for(var i=0; i<trs.length; i++){
				var td = $(trs[i]).children("td");
				$(td[0]).css("border-left","0px");
			}
	 	});
	 }
	this.bindFunc();

}
*/