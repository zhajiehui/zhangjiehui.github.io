function dfPageBarConfig(pageCount){
	/* 根据消息数量配置分页条 */
	mesNum = jQuery("#dfListConfig").attr("mesNum") ||
				(jQuery("#dfMesNum").html().index("W")>-1 ?
					Number(jQuery("#dfMesNum").html())*10000 :
			  		jQuery("#dfMesNum").html());
	pageMesNum = jQuery("#dfPageConfig").attr("pageMesNum") || jQuery("#pageSizeInput").val();
	var dfPageNum = parseInt(mesNum/pageMesNum)+(mesNum%pageMesNum>0 ? 1 : 0);
	if(dfPageNum==0){
		//modified by wangsy 2013-07-27 update for 查询结果为空时，正确设置分页条
		jQuery("#dfMesNum").html(0);
		jQuery("#pageCount").html(0);
		jQuery("#dfPageNum").html(0);
		jQuery("#dfFirstPage").attr('class','disabled');
		jQuery("#dfPrevPage").attr('class','disabled');
		jQuery("#dfFirstPage").attr('href','###');
		jQuery("#dfPrevPage").attr('href','###');
		jQuery("#dfLastPage").attr('class','disabled');
		jQuery("#dfNextPage").attr('class','disabled');
		jQuery("#dfLastPage").attr('href','###');
		jQuery("#dfNextPage").attr('href','###');
	}else{
		if(mesNum >= 10000){
			jQuery("#dfMesNum").attr("title",mesNum);
			mesNum = parseInt(mesNum / 10000) + "W";	
		}
		if(pageCount >=10000){
			jQuery("#pageCount").attr("title",pageCount);
			pageCount = parseInt(pageCount / 10000) + "W";
		}
		if(pageCount >=10000){
			jQuery("#dfPageNum").attr("title",dfPageNum);
			dfPageNum = parseInt(dfPageNum / 10000) + "W";
		}
		
		jQuery("#dfMesNum").html(mesNum);
		jQuery("#pageCount").html(pageCount);
		jQuery("#dfPageNum").html(dfPageNum);
		if(pageCount == 1){
			jQuery("#dfFirstPage").attr('class','disabled');
			jQuery("#dfPrevPage").attr('class','disabled');
			jQuery("#dfFirstPage").attr('href','###');
			jQuery("#dfPrevPage").attr('href','###');
		}else{
			jQuery("#dfFirstPage").attr('class','');
			jQuery("#dfPrevPage").attr('class','');

			jQuery("#dfFirstPage").attr('href','javascript:query(1)');
			jQuery("#dfPrevPage").attr('href','javascript:query(jQuery("#pageCount").html()-1)');
		}
		if(pageCount == dfPageNum){
			jQuery("#dfLastPage").attr('class','disabled');
			jQuery("#dfNextPage").attr('class','disabled');
			jQuery("#dfLastPage").attr('href','###');
			jQuery("#dfNextPage").attr('href','###');
		}else{
			jQuery("#dfLastPage").attr('class','');
			jQuery("#dfNextPage").attr('class','');
			jQuery("#dfLastPage").attr('href','javascript:query(jQuery("#dfPageNum").html()-0)');
			jQuery("#dfNextPage").attr('href','javascript:query(jQuery("#pageCount").html()-0+1)');
		}
	}
	
	/*自动添加行号*/
	var rowNumber = 1;
	jQuery("[tableRowNumber]").each(function(){
		if(jQuery(this).attr("tableRowNumber")!=""){
			mesNum = 0;
			if(jQuery("#dfPageConfig").attr("RowNumByPage")==1){
				mesNum = Number(pageMesNum)*(pageCount-1);
			}
			jQuery(this).html(rowNumber+mesNum);
			rowNumber++;
			jQuery(this).attr("tableRowNumber","")
		}
	});
}