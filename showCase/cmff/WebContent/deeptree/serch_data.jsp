<%@page contentType="text/xml;charset=UTF-8" language="java" %><%
		String searchvalue = request.getParameter("searchvalue");		
 		String teststr = request.getParameter("teststr");		
        DeepTreeXmlHandler dt = new DeepTreeXmlHandler();
        String dataType = request.getParameter("dataType");

        String xmlFile=null;

    	String jsonstr = 
   		 	 "{\"TreeNode\":{\"id\":\"1s\",\"text\":\"中国联通\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"1\",\"logoImagePath\":\"image/yg.png\",\"statusFlag\":\"\",\"title\":\"中国联通\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"image/yg.png\",\"busContent\":\"UCloud\",\"test1\":\"tan1\",\"test2\":\"tan2\",\"test3\":\"tan3\","
   			+ "\"TreeNode\":[{\"id\":\"11s\",\"text\":\"电信事业部\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"test2\":\"tan1\"},"
   			+ "{\"id\":\"12s\",\"text\":\"资源事业部\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"1\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\","
   			+	"\"TreeNode\":[{\"id\":\"121s\",\"text\":\"电信事业部\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
   			+ "{\"id\":\"122s\",\"text\":\"资源事业部\",\"hasChild\":\"1\",\"xmlSource\":\"asyn_add.jsp\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"}"
   			+ "]}"
   			+ "]}}";
   		JSONObject json = JSONObject.fromObject(jsonstr);
   			//JSONObject jsonobj = JSONObject.fromObject(json);
        String xmlFormat=DFXmlJsonConverter.dfJson2XmlFormat(json);
        out.clear();
        out.print(xmlFormat); 
        System.out.println("jsp:"+xmlFormat);
%><%@page import="com.unicom.ucloud.df.tree.DeepTreeVo"%><%@page import="com.unicom.ucloud.df.tree.DeepTreeXmlHandler"%>
<%@page import="com.unicom.ucloud.df.tree.tool.DFXmlJsonConverter"%><%@page import="net.sf.json.JSON"%>
<%@page import="net.sf.json.JSONObject"%><%@page import="net.sf.json.xml.XMLSerializer"%>
	