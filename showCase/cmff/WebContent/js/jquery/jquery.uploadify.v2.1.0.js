/*
Uploadify v2.1.0
Release Date: August 24, 2009

Copyright (c) 2009 Ronnie Garcia, Travis Nickels

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

if(jQuery)(
	function(jQuery){
		jQuery.extend(jQuery.fn,{
			uploadify:function(options) {
				jQuery(this).each(function(){
					settings = jQuery.extend({
					id             : jQuery(this).attr('id'), // The ID of the object being Uploadified
					uploader       : 'uploadify.swf', // The path to the uploadify swf file
					script         : 'uploadify.php', // The path to the uploadify backend upload script
					expressInstall : null, // The path to the express install swf file
					folder         : '', // The path to the upload folder
					height         : 30, // The height of the flash button
					width          : 110, // The width of the flash button
					cancelImg      : 'cancel.png', // The path to the cancel image for the default file queue item container
					wmode          : 'opaque', // The wmode of the flash file
					scriptAccess   : 'sameDomain', // Set to "always" to allow script access across domains
					fileDataName   : 'Filedata', // The name of the file collection object in the backend upload script
					method         : 'POST', // The method for sending variables to the backend upload script
					queueSizeLimit : 999, // The maximum size of the file queue
					simUploadLimit : 1, // The number of simultaneous uploads allowed
					queueID        : false, // The optional ID of the queue container
					displayData    : 'percentage', // Set to "speed" to show the upload speed in the default queue item
					onInit         : function() {}, // Function to run when uploadify is initialized
					onSelect       : function() {}, // Function to run when a file is selected
					onQueueFull    : function() {}, // Function to run when the queue reaches capacity
					onCheck        : function() {}, // Function to run when script checks for duplicate files on the server
					onCancel       : function() {}, // Function to run when an item is cleared from the queue
					onError        : function() {}, // Function to run when an upload item returns an error
					onProgress     : function() {}, // Function to run each time the upload progress is updated
					onComplete     : function() {}, // Function to run when an upload is completed
					onAllComplete  : function() {}  // Functino to run when all uploads are completed
				}, options);
				var pagePath = location.pathname;
				pagePath = pagePath.split('/');
				pagePath.pop();
				pagePath = pagePath.join('/') + '/';
				var data = {};
				data.uploadifyID = settings.id;
				data.pagepath = pagePath;
				if (settings.buttonImg) data.buttonImg = escape(settings.buttonImg);
				if (settings.buttonText) data.buttonText = escape(settings.buttonText);
				if (settings.rollover) data.rollover = true;
				data.script = settings.script;
				data.folder = escape(settings.folder);
				if (settings.scriptData) {
					var scriptDataString = '';
					for (var name in settings.scriptData) {
						scriptDataString += '&' + name + '=' + settings.scriptData[name];
					}
					data.scriptData = escape(scriptDataString.substr(1));
				}
				data.width          = settings.width;
				data.height         = settings.height;
				data.wmode          = settings.wmode;
				data.method         = settings.method;
				data.queueSizeLimit = settings.queueSizeLimit;
				data.simUploadLimit = settings.simUploadLimit;
				
				//设置为手动上传
				settings.auto = false;
				
				if (settings.hideButton)   data.hideButton   = true;
				if (settings.fileDesc)     data.fileDesc     = settings.fileDesc;
				if (settings.fileExt)      data.fileExt      = settings.fileExt;
				if (settings.multi)        data.multi        = true;
				if (settings.auto)         data.auto         = true;
				if (settings.sizeLimit)    data.sizeLimit    = settings.sizeLimit;
				if (settings.checkScript)  data.checkScript  = settings.checkScript;
				if (settings.fileDataName) data.fileDataName = settings.fileDataName;
				if (settings.queueID)      data.queueID      = settings.queueID;
				if (settings.onInit() !== false) {
					jQuery(this).css('display','none');
					jQuery(this).after('<div id="' + jQuery(this).attr('id') + 'Uploader"></div>');
					//检测是否安装Flash --zouqh
					if(swfobject!=null){
						var playerVersion  = swfobject.getFlashPlayerVersion();
						var flashInstalled = (playerVersion.major >= 9);
						//alert(playerVersion+ " "+flashInstalled);
						if(flashInstalled==false){
							var urlLink = 'http://ishare.iask.sina.com.cn/f/37720945.html';
			  	        	var FlashLink = '<a href="'+urlLink+'" target="_blank">推荐下载flashplayer_activex_11.7,flashplayerplugin_11.7</a>';
			  	        	win_alert("Flash插件","您未安装FLASH控件或者FLASH控件被禁用，无法上传附件！请安装或激活FLASH控件后再试。("+FlashLink+")");
						}
					}
					
					swfobject.embedSWF(settings.uploader, settings.id + 'Uploader', settings.width, settings.height, '9.0.24', settings.expressInstall, data, {'quality':'high','wmode':settings.wmode,'allowScriptAccess':settings.scriptAccess});
					if (settings.queueID == false) {
						jQuery("#" + jQuery(this).attr('id') + "Uploader").after('<div id="' + jQuery(this).attr('id') + 'Queue" class="uploadifyQueue"></div>');
					}
				}
				if (typeof(settings.onOpen) == 'function') {
					jQuery(this).bind("uploadifyOpen", settings.onOpen);
				}
				jQuery(this).bind("uploadifySelect", {'action': settings.onSelect, 'queueID': settings.queueID}, function(event, ID, fileObj) {
					var queueObj = jQuery('#'+settings.queueID); //获取文件队列所在的DIV
					var fileDivs =  queueObj.children(); //获取所有已上传的文件DIV对象
					var counts = fileDivs.length; //获取已上传的文件的数目
					var fObj = document.getElementById(jQuery(this).attr('id') + 'Uploader');
					//fileObjInfo 获取已上传的文件信息
					var fileInputObjs = jQuery('input[name="fileObjInfo"]',queueObj);
					var fileExistFlag = false;
					if(fileInputObjs!=null&&fileInputObjs.length>0){
						for( var k = 0; k < fileInputObjs.length ; k++){
							var fileInputObj = fileInputObjs[k];
							
							if(fileInputObj.size==fileObj.size&&fileInputObj.time==fileObj.time&&fileInputObj.value==fileObj.name){
								//通过文件名、大小、时间信息判断文件是否已经上传
								fileExistFlag = true;
								break;
							}
						}
					}
					
					if(counts>=settings.queueSizeLimit ){
						//如果超出了文件大小，则取消上传该文件，并弹出提示框
						fObj.cancelFileUpload(ID, true, false);
						
						//判断是否已经填出了提示框
						var win_borders = jQuery(".win_border");
						var openWinFlag = true;
						for(var k = 0 ;k < win_borders.length ; k++){
							win_border = win_borders[k];
							var win_border_type = win_borders.attr("id").substr(0,9);
							if(win_border_type == "win_alert"){
								openWinFlag = false;
								break;
							}
						}
						if(openWinFlag){
							win_alert("提示信息","选择的文件个数超出了上传文件的最大数,只能上传"+settings.queueSizeLimit+"个文件");
						}
					}else if(fileExistFlag){
						//文件已经上传，取消上传该文件，并弹出提示框
						fObj.cancelFileUpload(ID, true, false);
						win_alert("提示信息","选择的文件"+fileObj.name+"已经上传，取消选择！");
					}else{
						//加载进度条
						if (event.data.action(event, ID, fileObj) !== false) {
							var byteSize = Math.round(fileObj.size / 1024 * 100) * .01;
							var suffix = 'KB';
							if (byteSize > 1000) {
								//byteSize = Math.round(byteSize *.001 * 100) * .01;
								byteSize = Math.round(byteSize * 100.0 / 1024) / 100.0;
								suffix = 'MB';
							}
							var sizeParts = byteSize.toString().split('.');
							if (sizeParts.length > 1) {
								byteSize = sizeParts[0] + '.' + sizeParts[1].substr(0,2);
							} else {
								byteSize = sizeParts[0];
							}
							if (fileObj.name.length > 20) {
								fileName = fileObj.name.substr(0,20) + '...';
							} else {
								fileName = fileObj.name;
							}
							queue = '#' + jQuery(this).attr('id') + 'Queue';
							if (event.data.queueID) {
								queue = '#' + event.data.queueID;
							}
							
							//获取文件扩展类型名
							var fileExtType = fileObj.type;
							var fileType = getFileType(fileExtType.substr(1));
							
							jQuery(queue).append('<div id="' + jQuery(this).attr('id') + ID + '" class="uploadifyQueueItem">'
									+'<input type="hidden" class="fileObjInfo" name="fileObjInfo" value="'+fileObj.name+'" size="'+fileObj.size+'" time="'+fileObj.modificationDate.time+'">'
									+ '<table style="font-size:12px;width:95%;" cellspacing="2px"><tr>'
									+	'<td width="9%"><div class="upload'+ fileType +'" style="width:26px;height:26px;" ></div></td>'
									+   '<td width="85%">'
									+ 	'<span class="fileName">' + fileName + " </span><span style='color:#858585;'>(" + byteSize + suffix + ')</span><br/>'
									+ 	'<div class="uploadifyProgress">'
									+ 	  '<div id="' + jQuery(this).attr("id") + ID + 'ProgressBar" class="uploadifyProgressBar"><!--Progress Bar--></div>'
									+ 	'</div>'
									+ 	'<div class="percentage" style="color:#858585;float:left;margin-top:6px;">&nbsp;0%</div>'
									+	'</td>'
									+	'<td width="5%">'
									+ 	'<div class="cancel">'
									+ 	  '<a href="javascript:jQuery(\'#' + jQuery(this).attr("id") + "').uploadifyCancel('" + ID + '\')">'
									+   	  '<img src="' + settings.cancelImg + '" border="0" />'
									+ 	  '</a>'
									+ 	'</div>'
									+	'</td>'
									+ 	'</tr></table>'
									+'</div>');
						}
					fObj.startFileUpload(ID, false);
					}
				});
				if (typeof(settings.onSelectOnce) == 'function') {
					jQuery(this).bind("uploadifySelectOnce", settings.onSelectOnce);
				}
				jQuery(this).bind("uploadifyQueueFull", {'action': settings.onQueueFull}, function(event, queueSizeLimit) {
					if (event.data.action(event, queueSizeLimit) !== false) {
						//alert('The queue is full.  The max size is ' + queueSizeLimit + '.');
					}
				});
				jQuery(this).bind("uploadifyCheckExist", {'action': settings.onCheck}, function(event, checkScript, fileQueueObj, folder, single) {
					var postData = new Object();
					postData = fileQueueObj;
					postData.folder = pagePath + folder;
					if (single) {
						for (var ID in fileQueueObj) {
							var singleFileID = ID;
						}
					}
					jQuery.post(checkScript, postData, function(data) {
						for(var key in data) {
							if (event.data.action(event, checkScript, fileQueueObj, folder, single) !== false) {
								var replaceFile = confirm("Do you want to replace the file " + data[key] + "?");
								if (!replaceFile) {
									document.getElementById(jQuery(event.target).attr('id') + 'Uploader').cancelFileUpload(key, true,true);
								}
							}
						}
						if (single) {
							document.getElementById(jQuery(event.target).attr('id') + 'Uploader').startFileUpload(singleFileID, true);
						} else {
							document.getElementById(jQuery(event.target).attr('id') + 'Uploader').startFileUpload(null, true);
						}
					}, "json");
				});
				jQuery(this).bind("uploadifyCancel", {'action': settings.onCancel}, function(event, ID, fileObj, data, clearFast) {
					if (event.data.action(event, ID, fileObj, data, clearFast) !== false) {
						var fadeSpeed = (clearFast == true) ? 0 : 250;
						jQuery("#" + jQuery(this).attr('id') + ID).fadeOut(fadeSpeed, function() { jQuery(this).remove() });
					}
				});
				if (typeof(settings.onClearQueue) == 'function') {
					jQuery(this).bind("uploadifyClearQueue", settings.onClearQueue);
				}
				var errorArray = [];
				jQuery(this).bind("uploadifyError", {'action': settings.onError}, function(event, ID, fileObj, errorObj) {
					if (event.data.action(event, ID, fileObj, errorObj) !== false) {
						//上传失败，修改进度条样式
						var fileArray = new Array(ID, fileObj, errorObj);
						errorArray.push(fileArray);
						jQuery("#" + jQuery(this).attr('id') + ID + " .percentage").text("  " + errorObj.type + " Error");
						jQuery("#" + jQuery(this).attr('id') + ID).addClass('uploadifyError');
					}
				});
				jQuery(this).bind("uploadifyProgress", {'action': settings.onProgress, 'toDisplay': settings.displayData}, function(event, ID, fileObj, data) {
					if (event.data.action(event, ID, fileObj, data) !== false) {
						jQuery("#" + jQuery(this).attr('id') + ID + "ProgressBar").css('width', data.percentage + '%');
						if (event.data.toDisplay == 'percentage') displayData = '  ' + data.percentage + '%';
						if (event.data.toDisplay == 'speed') displayData = '  ' + data.speed + 'KB/s';
						if (event.data.toDisplay == null) displayData = ' ';
						jQuery("#" + jQuery(this).attr('id') + ID + " .percentage").text(displayData);
					}
				});
				jQuery(this).bind("uploadifyComplete", { 'action': settings.onComplete}, function(event, ID, fileObj, response, data) {
					if (event.data.action(event, ID, fileObj, unescape(response), data) !== false) {
						//文件上传后修改进度条样式
						//jQuery("#" + jQuery(this).attr('id') + ID + " .percentage").text(' - Completed');
						//jQuery("#" + jQuery(this).attr('id') + ID).fadeOut(250, function() { jQuery(this).remove()});
						jQuery("#" + jQuery(this).attr('id') + ID + " .percentage").text('');
						jQuery("#" + jQuery(this).attr('id') + ID + " .uploadifyProgress").text('完成');
						jQuery("#" + jQuery(this).attr('id') + ID + " .uploadifyProgress").css("border","0");
						//jQuery("#" + jQuery(this).attr('id') + ID + " .uploadifyProgress").css("background","#F5F5F5");
						jQuery("#" + jQuery(this).attr('id') + ID + " .cancel").css("display","none");
						
					}
				});
				if (typeof(settings.onAllComplete) == 'function') {
					jQuery(this).bind("uploadifyAllComplete", {'action': settings.onAllComplete}, function(event, uploadObj) {
						if (event.data.action(event, uploadObj) !== false) {
							errorArray = [];
						}
					});
				}
			});
		},
		uploadifySettings:function(settingName, settingValue, resetObject) {
			var returnValue = false;
			jQuery(this).each(function() {
				if (settingName == 'scriptData' && settingValue != null) {
					if (resetObject) {
						var scriptData = settingValue;
					} else {
						var scriptData = jQuery.extend(settings.scriptData, settingValue);
					}
					var scriptDataString = '';
					for (var name in scriptData) {
						scriptDataString += '&' + name + '=' + escape(scriptData[name]);
					}
					settingValue = scriptDataString.substr(1);
				}
				returnValue = document.getElementById(jQuery(this).attr('id') + 'Uploader').updateSettings(settingName, settingValue);
			});
			if (settingValue == null) {
				if (settingName == 'scriptData') {
					var returnSplit = unescape(returnValue).split('&');
					var returnObj   = new Object();
					for (var i = 0; i < returnSplit.length; i++) {
						var iSplit = returnSplit[i].split('=');
						returnObj[iSplit[0]] = iSplit[1];
					}
					returnValue = returnObj;
				}
				return returnValue;
			}
		},
		uploadifyUpload:function(ID) {
			jQuery(this).each(function() {
				document.getElementById(jQuery(this).attr('id') + 'Uploader').startFileUpload(ID, false);
			});
		},
		uploadifyCancel:function(ID) {
			jQuery(this).each(function() {
				document.getElementById(jQuery(this).attr('id') + 'Uploader').cancelFileUpload(ID, true, false);
			});
		},
		uploadifyClearQueue:function() {
			jQuery(this).each(function() {
				document.getElementById(jQuery(this).attr('id') + 'Uploader').clearFileUploadQueue(false);
			});
		}
	});
})(jQuery);

/**
 * 获取文件类型名
 */
function getFileType(type){
	var fileType = "Word";
	switch(type){
		case "doc":		
			fileType = "Word";		
			break;
		case "docx":	
			fileType = "Word";		
			break;
		case "xls":		
			fileType = "Excel";		
			break;
		case "xlsx":	
			fileType = "Excel";		
			break;
		case "ppt":		
			fileType = "PPT";		
			break;
		case "pptx":	
			fileType = "PPT";		
			break;
		case "txt":		
			fileType = "Txt";		
			break;
		case "pdf":		
			fileType = "PDF";		
			break;
		case "gif":		
			fileType = "Img";		
			break;
		case "jpg":		
			fileType = "Img";		
			break;
		case "png":		
			fileType = "Img";		
			break;
		case "psd":		
			fileType = "Img";		
			break;
		case "vsd":		
			fileType = "Visio";		
			break;
		default:		
			fileType = "Other";
	}
	return fileType;
}