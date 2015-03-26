<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>翻页列表控件</title>
<link href="css/common/pageSelect.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/common/jquery-1.7.min.js"></script>
<script type="text/javascript" src="js/common/pageSelect.js"></script>
<script type="text/javascript">


</script>

</head>
<body>
	<div class="Page">
		<table align="center" cellspacing="0" cellpadding="0"><tr><td>
			<div class="Page_con">
				<div class="Page_digg">
					<button type="button" id="dfFirstPage" >首页</button>
					<button type="button" id="dfPrevPage" >上一页</button>
					<button type="button" id="dfNextPage" >下一页</button>
					<button type="button" id="dfLastPage" >尾页</button>
				</div>
				<div class="goto">跳转至</div>
				<div class="Page_right">
					<div class="Page_jump"><input class="Page_input" type="text" id="pageInput" />页</div>
					 <button type="button" class="Page_btn">确定</button>
				</div>
			</div>
		</td></tr></table>
	</div>
</body>
</html>
