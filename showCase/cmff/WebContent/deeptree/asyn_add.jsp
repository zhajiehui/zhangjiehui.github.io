<%@page contentType="text/xml;charset=GBK" language="java" %><%
     	
		String id = request.getParameter("id");
		String jsonstr = "";
		//System.out.println(id);
		//System.out.println(request.getParameter("assist_dept"));
		if(id == null || "".equals(id)){
			response.sendRedirect("xmlData6.xml");
		}else{
			//json�ַ���
			if ("122".equals(id)){
			  jsonstr = 
			 	 "{\"TreeNode\":{\"id\":\"1221\",\"text\":\"�й���ͨ\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"image/yg.png\",\"statusFlag\":\"\",\"title\":\"�й���ͨ\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"image/yg.png\",\"busContent\":\"UCloud\","
				+ "\"TreeNode\":[{\"id\":\"12211\",\"text\":\"������ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
				+ "{\"id\":\"12212\",\"text\":\"��Դ��ҵ��\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\","
				+	"\"TreeNode\":[{\"id\":\"122121\",\"text\":\"������ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
				+ "{\"id\":\"122122\",\"text\":\"��Դ��ҵ��\",\"hasChild\":\"1\",\"xmlSource\":\"asyn_add.jsp\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"}"
				+ "]}"
				+ "]}}";
			}else if ("122122".equals(id)){
				jsonstr = 
			 	 "{\"TreeNode\":{\"id\":\"12213\",\"text\":\"�й���ͨ\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"image/yg.png\",\"statusFlag\":\"\",\"title\":\"�й���ͨ\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"image/yg.png\",\"busContent\":\"UCloud\","
				+ "\"TreeNode\":[{\"id\":\"122113\",\"text\":\"������ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
				+ "{\"id\":\"122123\",\"text\":\"��Դ��ҵ��\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\","
				+	"\"TreeNode\":[{\"id\":\"1221213\",\"text\":\"������ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
				+ "{\"id\":\"1221223\",\"text\":\"��Դ��ҵ��\",\"hasChild\":\"1\",\"xmlSource\":\"asyn_add.jsp\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"}"
				+ "]}"
				+ "]}}";
			}else if ("1221223".equals(id)){
				jsonstr = 
			 	 "{\"TreeNode\":{\"id\":\"122135\",\"text\":\"�й���ͨ\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"image/yg.png\",\"statusFlag\":\"\",\"title\":\"�й���ͨ\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"image/yg.png\",\"busContent\":\"UCloud\","
				+ "\"TreeNode\":[{\"id\":\"1221135\",\"text\":\"������ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
				+ "{\"id\":\"1221235\",\"text\":\"��Դ��ҵ��\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\","
				+	"\"TreeNode\":[{\"id\":\"12212135\",\"text\":\"������ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
				+ "{\"id\":\"12212235\",\"text\":\"��Դ��ҵ��\",\"hasChild\":\"1\",\"xmlSource\":\"asyn_add.jsp\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"}"
				+ "]}"
				+ "]}}";
			} else {
				jsonstr = 
			 	 "{\"TreeNode\":{\"id\":\"1221345\",\"text\":\"�й���ͨ\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"image/yg.png\",\"statusFlag\":\"\",\"title\":\"�й���ͨ\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"image/yg.png\",\"busContent\":\"UCloud\","
				+ "\"TreeNode\":[{\"id\":\"12211345\",\"text\":\"������ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
				+ "{\"id\":\"12212345\",\"text\":\"��Դ��ҵ��\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\","
				+	"\"TreeNode\":[{\"id\":\"122121345\",\"text\":\"������ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"},"
				+ "{\"id\":\"122122345\",\"text\":\"��Դ��ҵ��\",\"hasChild\":\"0\",\"xmlSource\":\"\",\"defaultOpen\":\"0\",\"logoImagePath\":\"\",\"statusFlag\":\"\",\"title\":\"welcome to ...\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\"\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\",\"busContent\":\"\"}"
				+ "]}"
				+ "]}}";
			}
			
			//json����תxml�ַ������÷�ʽ
			JSONObject json = JSONObject.fromObject(jsonstr); 
			//System.out.println(json);
			String xmlStr = DFXmlJsonConverter.dfJson2XmlFormat(json);
			//System.out.println(xmlStr);
			out.clear();
	        out.print(xmlStr);
        }
%><%@page import="com.unicom.ucloud.df.tree.DeepTreeVo"%><%@page import="com.unicom.ucloud.df.tree.DeepTreeXmlHandler"%>
<%@page import="com.unicom.ucloud.df.tree.tool.DFXmlJsonConverter"%><%@page import="net.sf.json.JSON"%>
<%@page import="net.sf.json.JSONObject"%><%@page import="net.sf.json.xml.XMLSerializer"%>