<%@page contentType="text/xml;charset=UTF-8" language="java" %><%
		String searchvalue = request.getParameter("searchvalue");
 		//System.out.println(searchvalue);
 		
 		String teststr = request.getParameter("teststr");
 		//System.out.println(teststr);
 		
        DeepTreeXmlHandler dt = new DeepTreeXmlHandler();
        //modified by jiangqx 2013-04-13 for 修改加载树的数据文件配置既支持json也支持xml begin.
        String dataType = request.getParameter("dataType");
        //System.out.println(dataType);

        String xmlFile=null;
        if(dataType.equals("json")){
    		String jsonstr = 
   		 	 "{\"TreeNode\":{\"id\":\"1s\",\"text\":\"中国联通\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"1\",\"logoImagePath\":\"image/yg.png\",\"statusFlag\":\"\",\"title\":\"中国联通\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"image/yg.png\",\"busContent\":\"UCloud\",\"test1\":\"tan1\",\"test2\":\"tan2\",\"test3\":\"tan3\","
   			+ "\"TreeNode\":[{\"id\":\"11s\",\"text\":\"电信事业部\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"test2\":\"tan1\"},"
   			+ "{\"id\":\"12s\",\"text\":\"资源事业部\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\","
   			+	"\"TreeNode\":[{\"id\":\"121s\",\"text\":\"电信事业部\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
   			+ "{\"id\":\"122s\",\"text\":\"资源事业部\",\"hasChild\":\"1\",\"xmlSource\":\"asyn_add.jsp\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"}"
   			+ "]}"
   			+ "]}}";
   			JSONObject json = JSONObject.fromObject(jsonstr);
   			//JSONObject jsonobj = JSONObject.fromObject(json);
         	String xmlFormat=DFXmlJsonConverter.dfJson2XmlFormat(json);
         	out.clear();
        	out.print(xmlFormat); 
        	return;
        }else if(dataType.equals("xml")){
        	xmlFile= "xmlData.xml";
        }
        //modified by jiangqx 2013-04-13 for 修改加载树的数据文件配置既支持json也支持xml end.
        if("2".equals(searchvalue)){
        	dt.addTreeNode(new DeepTreeVo("2", "蓝海移动", "1", "xmlData3.xml"));
        }else if ("1".equals(searchvalue)){
        	dt.addTreeNode(new DeepTreeVo("1", "蓝海股份", "1", "xmlData4.xml"));
        }else if ("12".equals(searchvalue)){
        	dt.addTreeNode(new DeepTreeVo("12", "电信事业部", "1", "xmlData5.xml"));
        }else{
        	DeepTreeVo dtv = new DeepTreeVo("88888888", "中国联通", "1", xmlFile);
        	dtv.setLogoImagePath("image/yg.png");//设置logoImagePath属性的路径
        	dtv.addAttribute("imageUrl","image/yg.png");//添加imageUrl属性并设置imageUrl属性的路径
        	dtv.addAttribute("busContent","UCloud");// 添加busContent属性并设置busContent属性的值，busContent：属性名称; UCloud:属性值
        	dt.addTreeNode(dtv);
        }
        String xmlStr = dt.getStringFromDocument();
        out.clear();
        out.print(xmlStr);
        //dt.addTreeNode(new DeepTreeVo("6666", "销售部", "1", "deeptree_data.jsp?parentCode=" + "88888888"));
        //String xmlStr = dt.getStringFromDocument();
        //xml字符串
		/*xmlStr = 
			"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
		+ "<Trees>"
    	+ "<TreeNode id=\"1\" text=\"蓝海股份\" hasChild=\"1\" xmlSource=\"\" defaultOpen=\"0\" logoImagePath=\"image/yg.png\" statusFlag=\"\" title=\"蓝海金融有限公司\" hrefPath=\"\" target=\"\" dbClick=\"\" orderStr=\"U901002\" returnValue=\"\" isSelected=\"\" indeterminate=\"\" thisType=\"Company\" detailedType=\"Company\" isSubmit=\"\" parentId=\"\" childIds=\"\" imageUrl=\"image/yg.png\" busContent=\"UCloud\">"
			+ "<TreeNode id=\"11\" text=\"蓝海北京分公司\" hasChild=\"0\" xmlSource=\"\" defaultOpen=\"0\" logoImagePath=\"\" statusFlag=\"\" title=\"欢迎来到销售部\" hrefPath=\"\" target=\"\" dbClick=\"\" orderStr=\"U901002\" returnValue=\"\" isSelected=\"\" indeterminate=\"\" thisType=\"Company\" detailedType=\"Company\" isSubmit=\"\" parentId=\"\" childIds=\"\" imageUrl=\"\" busContent=\"\"/>"
			+ "<TreeNode id=\"12\" text=\"电信事业部\" hasChild=\"1\" xmlSource=\"\" defaultOpen=\"0\" logoImagePath=\"\" statusFlag=\"\" title=\"welcome to ...\" hrefPath=\"\" target=\"\" dbClick=\"\" orderStr=\"U901002\" returnValue=\"\" isSelected=\"\" indeterminate=\"\" thisType=\"Company\" detailedType=\"Company\" isSubmit=\"\" parentId=\"\" childIds=\"\" imageUrl=\"\" busContent=\"\">"
				+ "	<TreeNode id=\"121\" text=\"行业开发部\" hasChild=\"0\" xmlSource=\"\" defaultOpen=\"0\" logoImagePath=\"\" statusFlag=\"\" title=\"欢迎来到销售部\" hrefPath=\"\" target=\"\" dbClick=\"\" orderStr=\"U901002\" returnValue=\"\" isSelected=\"\" indeterminate=\"\" thisType=\"Company\" detailedType=\"Company\" isSubmit=\"\" parentId=\"\" childIds=\"\" imageUrl=\"\" busContent=\"\"/>"
			+ "</TreeNode>"
		+ "</TreeNode>"
		+ "</Trees>";*/
		
		//json字符串
		/*String jsonstr = 
		 	 "{\"TreeNode\":{\"@id\":\"1\",\"@text\":\"中国联通\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"image/yg.png\",\"@statusFlag\":\"\",\"@title\":\"中国联通\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"image/yg.png\",\"@busContent\":\"UCloud\","
			+ "\"TreeNode\":[{\"@id\":\"11\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
			+ "{\"@id\":\"12\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\","
			+	"\"TreeNode\":[{\"@id\":\"121\",\"@text\":\"电信事业部\",\"@hasChild\":\"0\",\"@xmlSource\":\"\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"},"
			+ "{\"@id\":\"122\",\"@text\":\"资源事业部\",\"@hasChild\":\"1\",\"@xmlSource\":\"asyn_add.jsp\",\"@defaultOpen\":\"0\",\"@logoImagePath\":\"\",\"@statusFlag\":\"\",\"@title\":\"welcome to ...\",\"@hrefPath\":\"\",\"@target\":\"\",\"@dbClick\":\"\",\"@orderStr\":\"U901002\",\"@returnValue\":\"\",\"@isSelected\":\"\",\"@indeterminate\":\"\",\"@thisType\":\"Company\",\"@detailedType\":\"Company\",\"@isSubmit\":\"\",\"@parentId\":\"\",\"@childIds\":\"\",\"@imageUrl\":\"\",\"@busContent\":\"\"}"
			+ "]}"
			+ "]}}";*/
		
/* 		String jsonstr = 
		 	 "{\"TreeNode\":{\"id\":\"1\",\"text\":\"中国联通中国联通中国联通中国联通中国联通\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"image/yg.png\",\"statusFlag\":\"\",\"title\":\"中国联通\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"image/yg.png\",\"busContent\":\"UCloud\","
			+ "\"TreeNode\":[{\"id\":\"11\",\"text\":\"电信事业部\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
			+ "{\"id\":\"12\",\"text\":\"资源事业部\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\","
			+	"\"TreeNode\":[{\"id\":\"121\",\"text\":\"电信事业部\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
			+ "{\"id\":\"122\",\"text\":\"资源事业部\",\"hasChild\":\"1\",\"xmlSource\":\"asyn_add.jsp\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"}"
			+ "]}"
			+ "]}}"; */
		
		//json字符串转xml字符串调用方式
		//xmlStr = RmXmlJsonConverter.jsonStringToXmlFormat(jsonstr);
		
		//json对象转xml字符串调用方式
		//JSON json = JSONObject.fromObject(jsonstr); 
		//System.out.println(json);
		//xmlStr = RmXmlJsonConverter.jsonObjectToXmlFormat(json);
		//System.out.println(xmlStr);
        //out.print(xmlStr);
%><%@page import="com.unicom.ucloud.df.tree.DeepTreeVo"%><%@page import="com.unicom.ucloud.df.tree.DeepTreeXmlHandler"%>
<%@page import="com.unicom.ucloud.df.tree.tool.DFXmlJsonConverter"%><%@page import="net.sf.json.JSON"%>
<%@page import="net.sf.json.JSONObject"%><%@page import="net.sf.json.xml.XMLSerializer"%>
	