<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>tag</title>
<link href="css/common/tag.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="tagGroup">
	<ul>
		<li>标签一</li>
		<li>标签二</li>
		<li>标签三</li>
		<li>标签四</li>
	</ul>
</div>
<script type="text/javascript" src="js/common/jquery-1.7.min.js"></script>
<script type="text/javascript">
$(".tagGroup>ul>li").on("hover",function(){
	$(".tagGroup>ul>li").removeClass("hover");
	$(this).addClass("hover");
	$(this).click(function(){
		$(".tagGroup>ul>li").removeClass("hover");
		$(".tagGroup>ul>li").removeClass("selected");
		$(this).addClass("selected");
	});
});
</script>
</body>
</html>