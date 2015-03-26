// JavaScript Document
$(document).ready(function(){
	//增加下拉三角
	$("ul.subnav").each(function() {
    $($(this).parent()[0].getElementsByTagName("a")[0]).append("<span></span>");
		$(this).parent().addClass("hasSubnav");
  });
	$("ul.topnav li a span").each(function(){
		$(this).parent().mouseenter(function() { //When trigger is clicked...
			var subNav = $(this).parent().find("ul.subnav")[0]; 
			//Following events are applied to the subnav itself (moving subnav up and down)
			$(subNav).show(); //Drop down the subnav on click
			$(this).parent().hover(function() {}, function(){	
				$(subNav).slideUp('fast'); //When the mouse hovers out of the subnav, move it back up
			});
			//Following events are applied to the trigger (Hover events for the trigger)
			}).hover(function() { 
				$(this).addClass("subhover"); //On hover over, add class "subhover"
			}, function(){	//On Hover Out
				$(this).removeClass("subhover"); //On hover out, remove class "subhover"
		});
	});
	
	//给下拉三角注册点击事件
	/*$("ul.topnav li a span").each(function(){
		$(this).parent().click(function(){
			var subNav = $(this).parent().find("ul.subnav")[0]; 
			if($(subNav).attr("isDisplay") == 0){
				$(subNav).slideDown('fast').show(); //Drop down the subnav on click
				$(subNav).attr("isDisplay","1");
			}else if($(subNav).attr("isDisplay") == 1){
				$(subNav).slideUp('slow');
				$(subNav).attr("isDisplay","0");
			}
			$(subNav).mouseleave(function(){
				$(subNav).slideUp('slow');
				$(subNav).attr("isDisplay","0");
			});
		});
	});*/
});