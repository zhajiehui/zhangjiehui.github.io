
var rmConfigValidateInfoType_df = "writeAlert,writePage";  //支持writeAlert和writePage

var isGlobalFilterChar_df = false;  //是否全局的过滤乱字符

var rmTempStatusIsAlert_df = false;

var rmTempStatusIsFocus_df = false;

var rmTempInputAlertStatus_df = new Object();

var beginValidate_df = false;

var set_All_Rm_Inputs_Default_df = true;

var DF_RES_CLASS_PAGE = false;//个性化较强，判断复选框后校验
var DF_CHECK_DISPLAY_INPUT = false;//对隐藏文本进行校验，

function checkAllForms_df() {
	var checkResult = true;
	rmTempStatusIsAlert_df = false;
	rmTempStatusIsFocus_df = false;
	rmTempInputAlertStatus_df = new Object();
	//setAllRmInputsDefault_df();
	for (var i=0;i<document.forms.length;i++) {
		checkResult = checkResult && checkRmForm_df(document.forms[i]);
	}
	return checkResult;
}

function checkRmForm_df(thisForm) {
	var checkResult = true;
	rmTempStatusIsAlert_df = false;
	rmTempStatusIsFocus_df = false;
	rmTempInputAlertStatus_df = new Object();
	//setAllRmInputsDefault_df();
	var eleLength = 0;
	if(thisForm.elements['length'] == null) {
		eleLength = thisForm.elements.length;
	} else {
		for(var i=0; i<10000; i++) {
			if(thisForm.elements.item(i) == null) {
				eleLength = i;
				break;
			}
		}
	}
	for (var j=0;j<eleLength;j++) {
		var thisInput = thisForm.elements.item(j);
		if ( thisInput.type!="hidden" && thisInput.type!="button" && !( thisInput.id.indexOf("TF_")>=0 && thisInput.id.indexOf("_TF")>0 ) ){
			var rtValue = check_df(thisInput);
			if(checkResult && rtValue == false) {
				checkResult = false;
			}
		}
	}
	return checkResult;
}

function check_df(thisInput) {
	//TODO 20130924 wangsy 十分不想加，但暂时想不到好办法 
	if(DF_RES_CLASS_PAGE){
		var tdObj = jQuery(thisInput).parents("td");
		if(tdObj.prev().find(".firerift-style-f")[0]){
			if(tdObj.prev().find(".firerift-style-f").hasClass("off")){
				return true;
			}
		}else{
			return true;
		}
	}
	var inputValue = thisInput.value;
	var validateStr = thisInput.getAttribute("dfValidate");
	var isDisplayObj=thisInput;
	if(!DF_CHECK_DISPLAY_INPUT){
		while(isDisplayObj.tagName != "form" && isDisplayObj.tagName != "FORM"){
			if(jQuery(isDisplayObj).css("display")=="none"){
				return true;
			}else{
				isDisplayObj = jQuery(isDisplayObj).parent()[0];
			}
		}
	}else{
		while(isDisplayObj.tagName != "body" && isDisplayObj.tagName != "BODY"){
			if(jQuery(isDisplayObj).css("display")=="none"){
				return true;
			}else{
				isDisplayObj = jQuery(isDisplayObj).parent()[0];
			}
		}
	}

	if(validateStr != null){
		if ( beginValidate_df ) {
			var validateTemp = new Array();	
			validateTemp = validateStr.split(';');
			for (var i=0;i<validateTemp.length;i++) {
				if(validateTemp[i].length == 0) {
					continue;
				}
				if(jQuery(thisInput).hasClass("inputselect")){//满足校验下拉控件
					var spanObj = jQuery(thisInput).prev();
					if(spanObj[0]){
						s = replaceSingleQuote_df(spanObj.html());
					}else{
						s = "";
					}
					
					if(s.indexOf("--请")>=0){
						s = replaceSingleQuote_df("");
					}
				}else if(jQuery(thisInput).attr("class") == "calInput"){//满足校验日期控件
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
		}
	}

	//加上了全局过滤乱字符
	if(isGlobalFilterChar_df) {
		if(validateStr != null && validateStr.indexOf("notGlobalFilterChar") > -1) {
			return true;
		}
		if(thisInput.tagName.toUpperCase() == "TEXTAREA") {
		
		} else if(thisInput.tagName.toUpperCase() == "INPUT" && thisInput.type.toUpperCase() == "FILE") {

		} else if(!isFilterChar_df(thisInput.value, thisInput)) {
			return false;
		}
	}
	return true;
}

function replaceEnter_df(_str) {
	/**替换换行回车字符**/
	var str = _str;

	str = str.replace('\n','');
	str = str.replace('\r','');
	
	//alert(str.indexOf('\n'))
	
	if(str.indexOf('\n')!=-1 &&str.indexOf('\r')!=-1) {	
		return replaceEnter_df(str);
	} else {
		return str;
	}
}

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


function alertWithInputName_old_df(alertStr,inputName) { 

	if(inputName!=null && inputName.length >0 ){
		
		alert('"'+inputName+'"输入内容存在问题!\r\n'+alertStr);
		
	}else{
	
		alert( alertStr );
	}
}

function isContains_df(_validateStr,_validator) {
	for (var i=0;i<_validateStr.length;i++)
	{
		if(_validateStr[i] == _validator)
			hideValidateInfo_df(thisInput);
			return true;
	}
	
	return false;
}

/**********************************************************************
* rm validate
***********************************************************************/
function notNull_df(s, thisInput, displayInput) {  //不能为空
	if(displayInput == null) {
		displayInput = thisInput;
	}
	var inputName = getInputNameFromObject_df(thisInput);
	if ( s.length == 0){
		writeValidateInfo_df("请您输入"+inputName+"！ ", displayInput);
		return false;
	}  
	var s = Jtrim_df(s);	 
	if ( s.length == 0){
		writeValidateInfo_df("请您输入"+inputName+"！ ", displayInput);
		return false;
	}
	if(thisInput.type != null ) {
		try {
			if(thisInput.type.toLowerCase() == "radio" || thisInput.type.toLowerCase() == "checkbox") {
				var aInput = document.getElementsByName(thisInput.name);
				var isSelected = false;
				for(var i=0; i<aInput.length; i++) {
					if(aInput[i].checked) {
						isSelected = true;
						break;
					}
				}
				var dInput = document.getElementsByName(displayInput.name);
				if(!isSelected) {
					if(rmTempInputAlertStatus_df[thisInput.name] != "1") {
						writeValidateInfo_df("不能为空或空格！", dInput[dInput.length-1]);
						rmTempInputAlertStatus_df[thisInput.name] = "1";
						return false;
					}
				}
			}
		} catch(e) {
			alert("非空校验系统异常\n" + e.message);
		}
	}
	hideValidateInfo_df(thisInput);
	return true;
}

function isMobile_df(s, thisInput) {  //是手机号码：必须以数字开头，除数字外，可含有“-” 

	if(s.length ==0 ) {
	hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('请输入合法的手机号码！', thisInput);
		return false;
	}		
	hideValidateInfo_df(thisInput);
	return true;
}

function notGlobalFilterChar_df(s, thisInput) {
	hideValidateInfo_df(thisInput);
	return true;
}

function isPostalCode_df(s, thisInput) {  //是邮政编码
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	var patrn=/^[a-zA-Z0-9 ]{3,12}$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('请输入合法的邮政编码！', thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
} 


function isTel_df(s,thisInput) {  //是电话普通电话、传真号码：可以“+”开头，除数字外，可含有“-” 

	if(s.length ==0 )  {
		hideValidateInfo_df(thisInput);
		return true;
	}
	var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('请输入合法的电话号码！',thisInput);
		return false;
	} 
	hideValidateInfo_df(thisInput);
	return true;
}

function isFax_df(s,thisInput) {  //是电话普通电话、传真号码：可以“+”开头，除数字外，可含有“-” 

	if(s.length ==0 )  {
		hideValidateInfo_df(thisInput);
		return true;
	}
	var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('请输入合法的传真号码！',thisInput);
		return false;
	} 
	hideValidateInfo_df(thisInput);
	return true;
}

function isChinese_df(s,thisInput) {  //是中文

	if(s.length ==0 )  {
		hideValidateInfo_df(thisInput);
		return true;
	}
	var ret = ischinese_df(s);
	
	if(!ret){
		writeValidateInfo_df("请输入中文", thisInput);
		return ret;
	}
	hideValidateInfo_df(thisInput);
	return ret;
}

function notChinese_df(s,thisInput) {  //不含中文

	if(s.length ==0 )  {
		hideValidateInfo_df(thisInput);
		return true;
	}
	var ret = ischinese_df(s);
	
	if(ret){
		writeValidateInfo_df("不能输入中文",thisInput);
		return !ret;
	}
	hideValidateInfo_df(thisInput);
	return !ret;
}

//modified by wangsy 2013-04-15 add 精确数字校验规则
function isNumberDf(s,thisInput,mustPositive,mustInteger){
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^(-?\d+)(\.\d+)?$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('请输入数字！', thisInput);
		return false;
	}		
	
	if(mustPositive){
		sArr = s.split(".");
		if(sArr.length==2){
			if (sArr[1].length != mustPositive) {
				writeValidateInfo_df('精度必须为'+mustPositive+'位！', thisInput);
				return false;
			}
		}
	}
	
	if(mustInteger){
		if(s.length != mustInteger){
			writeValidateInfo_df('长度必须为'+mustInteger+'位！', thisInput);
			return false;
		}
	}
	
	hideValidateInfo_df(thisInput);
	return true;
}

function isNum_df(s,thisInput) {  //是数字 
	var digits = "0123456789";
	var i = 0;
	var sLength = s.length;

	while ((i < sLength)) {
		var c = s.charAt(i);
		if (digits.indexOf(c) == -1){
			writeValidateInfo_df ("请您输入正确的数字！",thisInput);		
			return false;
		}
		i++;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

/**校验是否是大于0的整数 */
function isPositiveInteger_df(s,thisInput){
	var digits = "0123456789";
	var i = 0;
	var sLength = s.length;
	if(s == 0 && s != "")
	{
		writeValidateInfo_df ("请您输入正确的数字！",thisInput);		
		return false;
	}
	while ((i < sLength)) {
		var c = s.charAt(i);
		if (digits.indexOf(c) == -1){
			writeValidateInfo_df ("请您输入正确的数字！",thisInput);		
			return false;
		}
		i++;
	}
	hideValidateInfo_df(thisInput);
	return true;
}
/**校验小写字母或数字 wangjian add */
function isNumAndLowercase_df(s,thisInput){
	var result=s.match(/^[a-z0-9]+$/);
    if(result==null){
    writeValidateInfo_df ("请您输入a-z小写字母或0-9之间数字！",thisInput);	
    return false;
    }
	hideValidateInfo_df(thisInput);
    return true;
}
/**验证(http开头)url*/
 function isURL_df(s,thisInput){
 var inputName = getInputNameFromObject_df(thisInput);
  //var strRegex = "^((https|http|ftp|rtsp|mms)?://)" 
  var strRegex = "^((http)?://)" 
 	    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
        + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+.)*" // 域名- www. 
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名 
        + "[a-z]{2,6})" // first level domain- .com or .museum 
        + "(:[0-9]{1,4})?" // 端口- :80 
        + "((/?)|" // a slash isn't required if there is no file name 
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
        var re=new RegExp(strRegex); 
        if(s.length>0){
       	 if (re.test(s)){
       		 hideValidateInfo_df(thisInput);
       		 return true; 
      	  }else{ 
             writeValidateInfo_df ("请您输入正确的url！",thisInput);
             return false;
        }
     }
        hideValidateInfo_df(thisInput);
        return true;
    }
/**验证网址url*/
function isWeburl_df(s,thisInput){
    //var myReg ="^http:\/\/.*[\.].*$";
	//var pattern = new RegExp(myReg);
	/**
    if(!pattern.test(s)){
		writeValidateInfo_df ("请您输入正确的"+inputName+"!",thisInput);
		return false;
	}else{
	hideValidateInfo_df(thisInput);
	    return true;
	}
    */
	var inputName = getInputNameFromObject_df(thisInput);

	if(s==null||s==""||s=="http://"){
		writeValidateInfo_df ("请您输入"+inputName+"!",thisInput);
		return false;
	}else if(s.substring(0,7)!="http://"){
		writeValidateInfo_df ("请您输入正确的"+inputName+"!",thisInput);
		return false;
	}else{
		hideValidateInfo_df(thisInput);
	    return true;
	}
}

function isEmail_df(s,thisInput) {  //是电子邮件

	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;	
	}

	if (s.length > 100)	{
		writeValidateInfo_df("email地址长度不能超过100位!",thisInput);
       	return false;
	}

	var regu = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/;

	if (regu.exec(s)) {		
	hideValidateInfo_df(thisInput);
		return true;
	} else {
		writeValidateInfo_df ("请输入有效合法的E-mail地址 ！",thisInput);
		return false;
	}
}

function isIP_df() {  //是IP
		
	var patrn=/^[0-9.]{1,20}$/; 
	if (!patrn.exec(s)){
		writeValidateInfo_df('请输入IP值！',thisInput);
		return false;
	}  
	hideValidateInfo_df(thisInput);
	return true;
}


/**********************************************************************
*Web JavaScript Code:HTC 校验notNull
***********************************************************************/
function notNullWithoutTrim_df(s,thisInput) {  //是""
	if ( s.length == 0){
		writeValidateInfo_df('请输入，该项不能为空！',thisInput);
		return false;
	}  
	hideValidateInfo_df(thisInput);
	return true;
}

function isInteger_df(s,thisInput) {  //是整数
	//if(str.length ==0 )  {
	//modified by wangsy 2013-04-13 for 变量使用错误
	if(s.length ==0 )  {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var reg = "0123456789";
	for (var i=0;i<s.length;i++){
		//var m = str.charAt(i);
		var m = s.charAt(i);
		if (reg.indexOf(m) == -1) {
			writeValidateInfo_df('请输入整数！',thisInput);
			return false;
		}
	}
	hideValidateInfo_df(thisInput);
	return true;
}

	
function isFloatNumber_df(s,thisInput) {  //判断是否浮点数
	var digits = "0123456789.";
	var i = 0;
	var sLength = s.length;

	while ((i < sLength)) {
		var c = s.charAt(i);
		if (digits.indexOf(c) == -1){
			writeValidateInfo_df ("请输入有效数字！",thisInput);		
			return false;
		}
		i++;
	}
	if(s.indexOf(".") != s.lastIndexOf(".")) {
		writeValidateInfo_df("小数点不对,请输入有效数字！", thisInput);
		return false;
	} else {
		hideValidateInfo_df(thisInput);
		return true;
	}
}

function isNormalStrOnWeb_df(s,thisInput) {  //是普通字符(非html标记)

	if (s.substring(0,1) == "<" || s.substring(0,1) == "\>" || s.substring(0,1) == " "){
			writeValidateInfo_df("焦点处不能以<或\>或空格开头",thisInput);
			return false;
	}else{
		hideValidateInfo_df(thisInput);
	}

	if (!HoldCode_df(s)){
		writeValidateInfo_df("焦点处不能输入全角\"·\"/\"—\"/\"——\"字符",thisInput);
		return false;
	}else{
		hideValidateInfo_df(thisInput);
	}
	if (s.length > 0){
		if (s.indexOf("\"") > -1){
			writeValidateInfo_df("焦点处不能输入双引号!!",thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
		}
		if (s.indexOf("\'") > -1){
			writeValidateInfo_df("焦点处不能输入单引号",thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
		}
		if (s.indexOf("\\") > -1){
			writeValidateInfo_df("焦点处不能输入 '\\' ",thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
		}
	}
	hideValidateInfo_df(thisInput);
	return true;
}




//基本函数列表
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

function isNumber_df(s,thisInput) {  //数字判断函数
	//var digits = "0123456789";
	//modified by wangsy 2013-04-13 for 数字判断加入小数点及加入写错误信息
	var digits = "0123456789.";
	var i = 0;
	var sLength = s.length;

	while ((i < sLength)) {
		var c = s.charAt(i);
		if (digits.indexOf(c) == -1) {
			writeValidateInfo_df ("请输入有效数字！",thisInput);
			return false;		
		}
		i++;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

function ischinese_df(s) {  //判断是否中文函数
	var ret=true;
	for(var i=0;i<s.length;i++)
		ret=ret && (s.charCodeAt(i)>=10000);
	return ret;
}

/**********************************************************************
*Web JavaScript Code:HTC 表单通用检验(完善中)
***********************************************************************/
function HoldCode_df(str){
	for(var i=0;i<str.length;i++){
		if (str.charCodeAt(i) == 8212 || str.charCodeAt(i) == 183){
			return false;
		}
	}
	return true;
}


function validateForm_df(current_form) {
	for (var i=0;i<current_form.length;i++){
		if (current_form[i].type =="text" || current_form[i].type == "radio"){
			if (current_form[i].value.substring(0,1) == "<" || current_form[i].value.substring(0,1) == "\>" || current_form[i].value.substring(0,1) == " "){
					alert("焦点处不能以<或\>或空格开头");
					current_form[i].focus();
					//current_form[i].select();
					return false;
			}

			if (getStrLength(current_form[i].value) > current_form[i].maxLength){
					alert("焦点处输入长度超长\n请确保输入长度在" +current_form[i].maxLength+"以内");
					current_form[i].focus();
					//current_form[i].select();
					return false;
			}
			if (!HoldCode_df(current_form[i].value)){
				alert("焦点处不能输入全角\"·\"/\"—\"/\"——\"字符");
				current_form[i].focus();
				//current_form[i].select();
				return false;
			}
			if (!is_empty(current_form[i].value)){
				if (current_form[i].name == "scriptDefine"){
					hideValidateInfo_df(thisInput);
					return true;
				}
				if (current_form[i].value.indexOf("\"") > -1){
					alert("焦点处不能输入双引号");
					current_form[i].focus();
					//current_form[i].select();
					return false;
				}
			}
		}
	}
	hideValidateInfo_df(thisInput);
	return true;
}

	
	function checkNumber_df(s, inputName) {
		var thisObj = event.srcElement;
		var maxLength = thisObj.integerDigits;
		var scale = thisObj.decimalDigits;
		return checkNumberImpl_df(s, maxLength, scale);
	}
	
	function checkNumberImpl_df(s, maxLength, scale) {  //校验运行里程,小数,整数部分最多为10-2
		if(s == "") {
			hideValidateInfo_df(thisInput);
			return true;
		}
		if(scale == undefined) {
			scale = 0;
		}
		if(maxLength == undefined) {
			maxLength = 38;
		}
		if(!isFloatNumber_df(s)) {
			return false;
		}
		if(s.indexOf(".") >0) {
			if(s.indexOf(".") <= maxLength && (Math.round(s*(pow(10,scale)))<(pow(10,(maxLength + scale))))) {
				hideValidateInfo_df(thisInput);
				return true;
			} else {
				alert("整数部分最大为" + (maxLength - scale) + "位！");
				return false;
			}
		} else {
			if(s.length <= maxLength) {
				hideValidateInfo_df(thisInput);
				return true;
			} else {
				alert("整数部分最大为" + maxLength + "位！！");
				return false;
			}
		}
	}
		/**
		*
		*校验上传zip文件路径是否有效
		**/
	function isUploadPathZip_df(s,thisInput){
 	//var pattern = /^([A-Z]:\\[^/:\*\?<>\|]+\.\w{1,6})|(\|\]+\.\w{1,6})$/">\\{2}[^/:\*\?<>\|]+\.\w{1,6})/$;
 	var pattern =/[A-Za-z]\:\\[^\:\?\"\>\<\*]*\.([Zz][Ii][Pp])/ ;
      flag = pattern.test(s);
 		if(!flag){
			writeValidateInfo_df("您上传的压缩文件不存或后缀名不符合要求,请上传[zip]类型压缩文件!", thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
			return true;
		}
	}
		/**
		*
		*校验上传图片路径是否有效
		**/
	function isUploadPathImag_df(s,thisInput){
 	//var pattern = /^([A-Z]:\\[^/:\*\?<>\|]+\.\w{1,6})|(\|\]+\.\w{1,6})$/">\\{2}[^/:\*\?<>\|]+\.\w{1,6})/$;
 	var pattern =/[A-Za-z]\:\\[^\:\?\"\>\<\*]*\.([Gg][Ii][Ff]|[Jj][Pp][Gg]|[Pp][Nn][Gg])/ ;
      flag = pattern.test(s);
 		if(!flag){
			writeValidateInfo_df("您上传的文件不存或文件格式不符合要求,请上传[gif|jpg|png]类型图片!", thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
			return true;
		}
	}
	/**
	  *校验上传模板文件
	  *
	  **/
	function isUploadPathTemplateFile_df(s,thisInput){
 	var pattern =/[A-Za-z]\:\\[^\:\?\"\>\<\*]*\.([Ss][Hh][Tt][Mm][Ll]|[Hh][Tt][Mm][Ll]|[Hh][Tt][Mm]|[Jj][Ss][Pp]|[Pp][Hh][Pp])/ ;
      if(s.length >0){
       flag = pattern.test(s);
 		if(!flag){
			writeValidateInfo_df("您上传的文件不存或文件格式不符合要求,请上传[shtml|php|html|htm|jsp]类型图片!", thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
			return true;
		}
      }
      hideValidateInfo_df(thisInput);
      return true;
	}
		/**
		*
		*校验上传js文件路径是否有效
		**/
	function isUploadPathJs_df(s,thisInput){
 	var pattern =/[A-Za-z]\:\\[^\:\?\"\>\<\*]*\.([Jj][Ss])/ ;
      flag = pattern.test(s);
 		if(!flag){
			writeValidateInfo_df("您上传的文件不存或文件格式不符合要求,请上传[js]类型文件！", thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
			return true;
		}
		
	}
	
		/**
		*
		*校验上传css文件路径是否有效
		**/
	function isUploadPathCss_df(s,thisInput){
 	var pattern =/[A-Za-z]\:\\[^\:\?\"\>\<\*]*\.([Cc][Ss][Ss])/ ;
      flag = pattern.test(s);
 		if(!flag){
			writeValidateInfo_df("您上传的文件不存或文件格式不符合要求,请上传[css]类型文件！", thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
			return true;
		}
	}
	
		/**
		*
		*校验上传swf文件路径是否有效
		**/
	function isUploadPathSwf_df(s,thisInput){
 	var pattern =/[A-Za-z]\:\\[^\:\?\"\>\<\*]*\.([Ss][Ww][Ff])/ ;
      flag = pattern.test(s);
 		if(!flag){
			writeValidateInfo_df("您上传的文件不存或文件格式不符合要求,请上传[swf]类型文件！", thisInput);
			return false;
		}else{
			hideValidateInfo_df(thisInput);
			return true;
		}
	}
	
	function isFilterChar_df(s, thisInput) {  //不能输入非法字符`~!@#$%^&*()|\<> /[`~!@#$%^&*()\|\\<>]/g
		if(typeof s!= "undefined"){
			if(s.length == 0 ) {
				hideValidateInfo_df(thisInput);
				return true;		
			}
		}
		var pattern = /['"&<>\\]/g;
		var str = "";
		while((result = pattern.exec(s)) != null){
			str += result[0];
		}
		if(str == "") {
			hideValidateInfo_df(thisInput);
			return true;
		} else {
			//writeValidateInfo_df('您输入的内容中有非法字符' + str + ",请重新输入!", thisInput);
			writeValidateInfo_df("您输入的内容中有非法字符（' \" & < > \\），请重新输入！", thisInput);
			return false;
		}
	}
	
	function isSearch_df(s, thisInput) {  //废弃的方法
		hideValidateInfo_df(thisInput);
		return true;
	}

	function largerOtherText_df(thisInput,compareObjName) {
		var compareObj = form[compareObjName];
		if(thisInput == null || compareObj == null || thisInput.value == "" || compareObj.value == "") {
			hideValidateInfo_df(thisInput);
			return true;
		}
		if(thisInput.value > compareObj.value) {
			hideValidateInfo_df(thisInput);
			return true;
		} else {
			if(compareObj.inputName != null) {
				writeValidateInfo_df('必须大于' + compareObj.inputName + "!", thisInput);			
			} else {
				writeValidateInfo_df('必须大于' + compareObj.name + "!", thisInput);
			}
			return false;
		}
	}	
	
/*
* 比较日期、校验ip 和网段**************start********
*/

function isAfter_df(s,thisInput,comName){
	var comInput = document.getElementsByName(comName);
	if((s==null||s=="")&&(comInput[0].value==null||comInput[0].value=="")){
		hideValidateInfo_df(thisInput);
		return true;
	}
	if(comInput[0].value==null||comInput[0].value==""){
		writeValidateInfo_df("不能为空",comInput[0]);
		return false;
	}
	if(s==null||s==""){
		writeValidateInfo_df("不能为空",thisInput);
		return false;
	}
	if(comInput[0].value>s){
		writeValidateInfo_df("起始日期大于终止日期",thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;

}

function isIP_df(s,thisInput) {  //是IP
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	//var patrn=/^[0-9.]{1,20}$/; 
	//var patrn=/^[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}$/;
	var patrn=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	if (!patrn.exec(s)){
		if(!rmTempStatusIsAlert_df){
			alert('请输入合法的IP值！',thisInput);
		}
		rmTempStatusIsAlert_df = true;
		return false;
	}  
	hideValidateInfo_df(thisInput);
	return true;
}

function isNetSect_df(s,thisInput) {  //是网段
	if(s.length ==0 )  {
		hideValidateInfo_df(thisInput);
		return true;
	}
	var patrn=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	if (!patrn.exec(s)){
		if(!rmTempStatusIsAlert_df){
			alert('请输入完整的网段！',thisInput);
		}
		rmTempStatusIsAlert_df = true;
		return false;
	}  
	hideValidateInfo_df(thisInput);
	return true;
}

function isIpNull_df(s,thisInput){
	if(s.length==0||s=='...'){
		if(!rmTempStatusIsAlert_df){
			alert("IP的输入不能为空！");	
		}
		rmTempStatusIsAlert_df = true;
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

function isNetSectNull_df(s,thisInput){
	if(s.length==0||s=='..'){
		if(!rmTempStatusIsAlert_df){
			alert("网段不能为空！");	
		}
		rmTempStatusIsAlert_df = true;
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

  	
function isValidString_df(s,thisInput){
	var voidChar = "'\"\&>\\<";
	var str = thisInput.value;
	for(i = 0 ; i < voidChar.length; i ++){
    aChar = voidChar.substring(i, i + 1);
    	if(str.indexOf(aChar) > -1){
    		writeValidateInfo_df("您输入的内容中有非法字符（' \" & < > \\），请重新输入！", thisInput);
      		return false;	
    	}
	}
	hideValidateInfo_df(thisInput);
	return true;
}

function isMaxLength_df(s,thisInput){
	var strlength = 0;
	var strMaxLength = 0;
	var inputName = getInputNameFromObject_df(thisInput);
	strMaxLength = thisInput.maxLength;
	strlength =  getStrLength(s);	
	if(strlength > strMaxLength){
		writeValidateInfo_df(inputName+"最多可以输入"+strMaxLength+"个字符，请修改！", thisInput);
		return false;	
	}
	hideValidateInfo_df(thisInput);
	return true;
}
/*******用户验证**********************************************/
function ispwd_df(s,thisInput){
	var pwd = document.getElementById("newkw").value;
	var str = thisInput.value;
	if(pwd != str){
		writeValidateInfo_df("输入的2次密码不一致，请修改！", thisInput);
		return false;	
	}
	hideValidateInfo_df(thisInput);
	return true;
}
/*
* 比较日期、校验ip 和网段**************end********
*/

function isLetterAndNum_df(s,thisInput){
	var inputName = getInputNameFromObject_df(thisInput);
	var reg = /^([a-z]|[0-9])+$/;
	if(!reg.exec(s)){
		//目录名称只能由a-z的小写字母和0-9的数字组成，请重新输入！
		writeValidateInfo_df(inputName+'只能由a-z的小写字母和0-9的数字组成，请重新输入！',thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

/*
 * 金额验证，最多支持小数点后2位
 */
function isMoney_df(s,thisInput){
	var inputName = getInputNameFromObject_df(thisInput);
	var reg = /^[0-9]*(\.[0-9]{1,2})?$/; 
	if(!reg.exec(s.replace(/\,/g,""))){		
		writeValidateInfo_df(inputName+'只能输入浮点数，金额最多支持小数点后两位，请重新输入！',thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

	
/**********************************************************************
*银企直联中用到的一些校验方法，别的模块也适用 add by tianyu
***********************************************************************/
/*
 * 比较日期  函数位置写在应该大的输入值处 
 */
function isDateCompare_df(s,thisInput,comName){
	var comInput = document.getElementsByName(comName);
	if((s==null||s=="")||(comInput[0].value==null||comInput[0].value=="")){
		hideValidateInfo_df(thisInput);
		return true;
	}
	if(comInput[0].value>s){
		writeValidateInfo_df("结束日期不能早于开始日期",thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

/*
 * 比较金额  函数位置写在应该大的输入值处  
 */
function isMoneyCompare_df(s,thisInput,comName){
	var comInput = document.getElementsByName(comName);
	if((s==null||s=="")||(comInput[0].value==null||comInput[0].value=="")){
		hideValidateInfo_df(thisInput);
		return true;
	}
	if(Number(comInput[0].value)>Number(s)){
		writeValidateInfo_df("结束金额不能小于开始金额",thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}
/*
 * 比较数值  函数位置写在应该大的输入值处  
 */
function isNumberCompare_df(s,thisInput,comName){
	var comInput = document.getElementsByName(comName);
	if((s==null||s=="")||(comInput[0].value==null||comInput[0].value=="")){
		hideValidateInfo_df(thisInput);
		return true;
	}
	if(Number(comInput[0].value)>Number(s)){
		writeValidateInfo_df("结束数值不能小于开始数值",thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}
/*
 * 不能包含中文
 */
function notContainChinese_df(s,thisInput){
	if(s==null||s==""){
		hideValidateInfo_df(thisInput);
		return true;
	}
	var inputName = getInputNameFromObject_df(thisInput);
	var reg = /.*[\u4e00-\u9fa5]+.*$/;
	if(reg.exec(s)){		
		writeValidateInfo_df(inputName+'不能包含中文！',thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}
/*
 * IP
 */
function ip_df(s,thisInput){
	if(s==null||s==""){
		hideValidateInfo_df(thisInput);
		return true;
	}
	var inputName = getInputNameFromObject_df(thisInput);
	var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	if(!reg.exec(s)){		
		writeValidateInfo_df(inputName+'不合法！',thisInput);
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

function isSmallLength_df(s,thisInput) {  //密码最小长度
	var sLength = Jtrim_df(s);
	if(sLength.length < 6){
		writeValidateInfo_df ("密码长度不能小于6位！",thisInput);		
		return false;
	}
	hideValidateInfo_df(thisInput);
	return true;
}

function setAllRmInputsDefault_df() {	
	var frmslen = document.forms.length;
   	for (var i=0;i<frmslen;i++) {
		var inslen = document.forms[i].elements.length;		
		for (var j=0;j<inslen;j++) {
			var frm = document.forms[i].elements[j];
			if ( frm.type!="hidden" && frm.type!="button" && !( frm.id.indexOf("TF_")>=0 && frm.id.indexOf("_TF")>0 ) ){
				if(isGlobalFilterChar_df || frm.dfValidate != null) {
					//modified by wangsy2 2013-04-10 for 统一校验符合UCloud样式
					hideValidateInfo_df(frm);
				}
			}
		}
	}
	return true;
}

function checkForm_df(thisForm) {
	var checkResult = true;
	rmTempStatusIsAlert_df = false;
	rmTempStatusIsFocus_df = false;
	rmTempInputAlertStatus_df = new Object();
	setAllRmInputsDefault_df();	
	for (var j=0;j<thisForm.elements.length;j++) {
		var thisInput = thisForm.elements[j];
		if ( thisInput.type!="hidden" && thisInput.type!="button" && !( thisInput.id.indexOf("TF_")>=0 && thisInput.id.indexOf("_TF")>0 ) ){
			var rtValue = check_df(thisInput);
			if(checkResult && rtValue == false) {
				checkResult = false;
			}
		}
	}
	return checkResult;
}

/**********************报表新增加校验*******************************/
function dfCompareDateGreaterThan(s,thisInput,otherId){
	var otherObj = document.getElementById(otherId);
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var otherValue = jQuery(otherObj).val();
	var otherName = jQuery(otherObj).attr("inputName") || jQuery(otherObj).attr("name");
	if(otherValue.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	if(compareDate(s,otherValue)<0){
		writeValidateInfo_df('必须大于'+otherName+'！', thisInput);
		return false;
	}
	
	hideValidateInfo_df(thisInput);
	return true;
}

function dfCompareDateLessThan(s,thisInput,otherId){
	var otherObj = document.getElementById(otherId);
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var otherValue = jQuery(otherObj).val();
	var otherName = jQuery(otherObj).attr("inputName") || jQuery(otherObj).attr("name");
	if(otherValue.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	if(compareDate(s,otherValue)>0){
		writeValidateInfo_df('必须小于'+otherName+'！', thisInput);
		return false;
	}
	
	hideValidateInfo_df(thisInput);
	return true;
}

function dfInTheSameYear(s,thisInput,otherId){
	var otherObj = document.getElementById(otherId);
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var otherValue = jQuery(otherObj).val();
	var otherName = jQuery(otherObj).attr("inputName") || jQuery(otherObj).attr("name");
	if(otherValue.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	if(s.split("-")[0] != otherValue.split("-")[0]){
		writeValidateInfo_df('必须与'+otherName+'在同一年！', thisInput);
		return false;
	}
	
	hideValidateInfo_df(thisInput);
	return true;
}
/**********************元模型生成校验*******************************/
function dfInt(s,thisInput){//校验整数
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^-?\d+$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('请输入整数！', thisInput);
		return false;
	}		
	hideValidateInfo_df(thisInput);
	return true;
}

function dfFloat(s,thisInput){//校验浮点数
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^(-?\d+)(\.\d+)?$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('请输入数字！', thisInput);
		return false;
	}		
	hideValidateInfo_df(thisInput);
	return true;
}

function dfString(s,thisInput){//校验字符串 TODO 待完善
	if(s.length ==0 ) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^\w+$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('含有非法字符！', thisInput);
		return false;
	}		
	hideValidateInfo_df(thisInput);
	return true;
}

function dfMaxLength(s,thisInput,MaxNum){//校验最大长度
	if(s.length ==0 || MaxNum==null || MaxNum==0) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	if(MaxNum.length == 0 || MaxNum == 0){
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	if (s.length >MaxNum) {
		writeValidateInfo_df('长度不能超过'+MaxNum+'！', thisInput);
		return false;
	}		
	hideValidateInfo_df(thisInput);
	return true;
}

function dfMinLength(s,thisInput,MinNum){//校验最小长度
	if(s.length ==0 || MinNum==null || MinNum.length == 0 || MinNum==0) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	if (s.length <MinNum) {
		writeValidateInfo_df('长度不能小于'+MinNum+'！', thisInput);
		return false;
	}else{
		hideValidateInfo_df(thisInput);
		return true;
	}
}

//modified by wangsy 2013-7-27 update for 最大最小精度
function dfMaxPrecision(s,thisInput,MaxPrecision,MaxLength){//校验最大精度和最大有效位数
	if(s.length ==0 || MaxPrecision==null || MaxPrecision.length == 0 || MaxPrecision==0) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^(-?\d+)(\.\d+)?$/; 
	if (!patrn.exec(s)) {//校验数字
		writeValidateInfo_df('非浮点型数字！', thisInput);
		return false;
	}
	sArr = s.split(".");
	if(sArr.length==2){//校验精度
		if (sArr[1].length >MaxPrecision) {
			writeValidateInfo_df('精度不能超过'+MaxPrecision+'位！', thisInput);
			return false;
		}
	}
	
	if(MaxLength){//校验长度
		if(s.length > MaxLength){
			writeValidateInfo_df('有效位数不能超过'+MaxLength+'位！', thisInput);
			return false;
		}
	}
	
	hideValidateInfo_df(thisInput);
	return true;
}

function dfMinPrecision(s,thisInput,MinPrecision){//校验最小精度
	if(s.length ==0 || MinPrecision==null || MinPrecision.length == 0 || MinPrecision==0) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^(-?\d+)(\.\d+)?$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('非浮点型数字！', thisInput);
		return false;
	}
	sArr = s.split(".");
	if(sArr.length==2){
		if (sArr[1].length < MinPrecision) {
			writeValidateInfo_df('精度不能小于'+MinPrecision+'位！', thisInput);
			return false;
		}
	}else{
		writeValidateInfo_df('精度不能小于'+MinPrecision+'位！', thisInput);
		return false;
	}
	
	hideValidateInfo_df(thisInput);
	return true;
}
//modified by wangsy 2013-7-27 update for 最大最小值
function dfMaxValue(s,thisInput,MaxValue){//校验最大值
	if(s.length ==0 || MaxValue==null || MaxValue.length == 0) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^(-?\d+)(\.\d+)?$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('非浮点型数字！', thisInput);
		return false;
	}
	if (s >MaxValue) {
		writeValidateInfo_df('此值不能大于'+MaxValue+'！', thisInput);
		return false;
	}
	
	hideValidateInfo_df(thisInput);
	return true;
}

function dfMinValue(s,thisInput,MinValue){//校验最小值
	if(s.length ==0 || MinValue==null || MinValue.length == 0) {
		hideValidateInfo_df(thisInput);
		return true;
	}
	
	var patrn=/^(-?\d+)(\.\d+)?$/; 
	if (!patrn.exec(s)) {
		writeValidateInfo_df('非浮点型数字！', thisInput);
		return false;
	}
	if (s < MinValue) {
		writeValidateInfo_df('此值不能小于'+MinValue+'！', thisInput);
		return false;
	}
	
	hideValidateInfo_df(thisInput);
	return true;
}
