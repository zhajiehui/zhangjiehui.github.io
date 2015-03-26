// JavaScript Document 
//全局变量
var projectGroup = {
	item1 : {
		name : "OS system",
		id : "001",
		ImageUrl :"resources/userhead.gif",
		UserGroup : ["01001","01002"],
		setting : ["数据分析","资源管理","基础配置","系统管理"]
	},
	item2 : {
		name : "中国移动资金",
		id : "002",
		ImageUrl :"resources/userhead.gif",
		UserGroup : ["01003","01004","01005"],
		setting : ["数据分析","资源管理","基础配置"]
	},
	item3 : {
		name : "Rental blablablablablablablablablabla",
		id : "003",
		ImageUrl :"resources/userhead.gif",
		UserGroup : ["01004","01003","01005"],
		setting : ["数据分析","基础配置","系统管理","资源管理"]
	}
};
var UserGroup = {
	item1 : {
		name : "lily",
		id : "01001",
		ImageUrl : "resources/u293.png",
	},
	item2 : {
		name : "lucy",
		id : "01002",
		ImageUrl : "resources/userhead.gif",
	},
	item3 : {
		name : "charl",
		id : "01003",
		ImageUrl : "resources/userhead.gif",
	},
	item4 : {
		name : "crist",
		id : "01004",
		ImageUrl : "resources/u124.png",
	},
	item5 : {
		name : "tommy",
		id : "01005",
		ImageUrl : "resources/u126.png",
	}
};
/*******************************************************/
$(document).ready(function(){
	loadProject();
});

$(".switcher-toggle").click(function(){
	toggleProject(this);
});

//加载该登录成员所参与的项目展示侧边栏
function loadProject(){
	var targetId = $(".switcher-toggle").data("lable");
	var html =""; 	 
	html += '<div class="accordion accordion-inverse">'
		 +    '<ul id="switcher-accordion">'
		 +    	'<li id="organization-null" class="active">'
		 + 				'<div class="accordion-title" href="#list-null">'
		 +					'<span>我的项目</span>'
		 +					'<span class="caret pull-right"></span>'
		 +				'</div>'
		 +				'<ul id="list-null" class="accordion-list list collapse">'
		 +				'</ul>'
		 +			'</li>'
		 +		'</ul>'
		 +	'</div><div class="managezone"><ul></ul></div>';
	$("#"+targetId).append(html);
	//隐藏左侧
	$("#"+targetId).attr("style","display:none;");
	//展开项目组
	spreadProjectList($(".accordion-title"));
	//加载现在项目的设置
	loadProjectSetting();
	//注册项目栏折叠展开事件
	$(".accordion-title").click(function(){
		toggleProjectCol(this);
	});   
}

function wordLimit(thisObj,maxwidth){
	if($(thisObj).text().length>maxwidth){
		var text = $(thisObj).text();
		$(thisObj).text($(thisObj).text().substring(0,maxwidth));
		$(thisObj).html($(thisObj).html()+"...");
		$(thisObj).attr("title",text);
	}
}

/*左侧栏缩放*/
function toggleProject(){
	var targetId = $(".switcher-toggle").data("lable");
	var targetsId = $(".accordion-title").attr("href");
	if($(".show-switcher")[0]){
		$(".features").removeClass("show-switcher");
		$("#"+targetId).attr("style","display:none;");
	}else{
		$(".features").addClass("show-switcher");
		$("#"+targetId).attr("style","display:block;");
		toggleProjectCol($(".accordion-title"));
		if($(".accordion-title").hasClass("collapsed")){
			//打开左侧栏时始终打开项目列表组
			$(targetsId).attr("style","height:auto;");
			$(".accordion-title").removeClass("collapsed");
			spreadProjectList($(".accordion-title"));
		}
	}
}

/*项目列表缩放*/
function toggleProjectCol(thisObj){
	var targetId = $(thisObj).attr("href");
	if($(thisObj).hasClass("collapsed")){ 
	  //展开 
		$(targetId).attr("style","height:auto;");
		$(thisObj).removeClass("collapsed");
		spreadProjectList(thisObj);
	}else{
		//折叠起来
		$(targetId).attr("style","height:0;");
		$(thisObj).addClass("collapsed");
		$("#list-null").empty();
	}
}

function spreadProjectList(thisObj){
	var html = "";
	for(var i in projectGroup){
		var pName = projectGroup[i].name;
		var pImage = projectGroup[i].ImageUrl;
		if(i == "item1"){
			html +=			'<li id="project-'+projectGroup[i].id+'" class="project-item active">';
		}else{
			html +=			'<li id="project-'+projectGroup[i].id+'" class="project-item">';
		}
		html +=					'<a>'
			 +						'<div class="icon project-logo" style="background-image:url('+pImage+');"></div>'
			 +						'<span class="project-name" data-maxwidth="13">'+pName+'</span>'
			 +					'</a>'
			 +				  '</li>';
	}
	$("#list-null").append(html);
	changeProTitle($(".project-item.active"));
	changeProUser($(".project-item.active"));
	$(".project-name").each(function() {
    wordLimit(this,$(this).data("maxwidth"));
  });
	$(".project-item").click(function(){
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
		changeProTitle(this);
		changeProUser(this);
		loadProjectSetting();
	});
}

//加载被选择项目的设置项
function loadProjectSetting(){
	$(".managezone").children("ul").empty();
	var html = "";
	var targetId = $("#list-null").find(".active").attr("id");
	targetId = targetId.substr(targetId.indexOf("-") + 1);
	for(var i in projectGroup){
		var id = projectGroup[i].id;
		if(targetId == id){
			var pSet = projectGroup[i].setting;
			for(var j in pSet){
				html +=				'<li>'
				     +					'<a>'
					 +						'<div class="analysis_icon icon"></div>'
					 +						'<span>'+pSet[j]+'</span>'
					 +					'</a>'
					 +				'</li>';
			}
		}
	}
	$(".managezone").children("ul").append(html);
}
//删除右侧栏的项目成员头像
function deletePreUser(){
	var childs = new Array();
	childs = $(".right-side").children().children();
	if(childs.length == 1){
			return false;
	}else{
		for(var i = 0;i < childs.length; i++){
			if($(childs[i]).children("#add_teamer").length){
				continue;
			}else{
				childs[i].remove();
			}
		}
	}
}
/*项目切换之更改项目显示标题*/
function changeProTitle(thisObj){
	var Id = $(thisObj).attr("id");
	var projectId = Id.substring(Id.indexOf('-') + 1, Id.length);
	for(var i in projectGroup){
		var pId = projectGroup[i].id;
		if(projectId == pId){
			var pName = projectGroup[i].name;
			$(".brand-words").html(pName);
		}
	}
}
/*项目切换之更改项目成员显示*/
function changeProUser(thisObj){
	deletePreUser();
	var html = "";
	var Id = $(thisObj).attr("id");
	var projectId = Id.substring(Id.indexOf('-') + 1, Id.length);
	for(var i in projectGroup){
		var pId = projectGroup[i].id;
		if(projectId == pId){
			var pMember = projectGroup[i].UserGroup;
			for (var k = 0; k <pMember.length;k++){
				for(var j in UserGroup){
					if(UserGroup[j].id == pMember[k]){
						html="";
						var name = UserGroup[j].name;
						html = '<li><a><img class="aside-coin user-pic" src="'+UserGroup[j].ImageUrl+'"/></a></li>';
						$(".right-side").children().append(html);
						break;
					}
				}
			}	
		}
	}
}
