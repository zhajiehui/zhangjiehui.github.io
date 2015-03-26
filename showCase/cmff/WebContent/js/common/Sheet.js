/**
 * @class eoms.sheet  ������غ���
 * @version 0.1
 */
eoms.Sheet = function(){
	return {
		/**
		 * ����һ��������Ϊajaxҳ��������
		 * @param {String} selectId ������id��������Ԫ��
		 * @param {String} divId ����ҳ�������id
		 */
		setPageLoader : function(select,divId){
			var sel = Ext.get(select);
			if(!sel) return;
			sel.on("change",function(e){
				sel.blur();
				document.body.focus(); //for IE6
				
				function onUpdate(){
					window.scrollTo(sel.getX(),sel.getY());				
				}
			
				eoms.util.appendPage(divId,sel.dom.value,true,onUpdate);		
			});
			
		}
	}
}();

function  changes(sel){	
	    divId = "sheet-deal-content";
		var sel = Ext.get(sel);
			if(!sel) return;
		sel.blur();
		document.body.focus(); //for IE6
		function onUpdate(){
			window.scrollTo(sel.getX(),sel.getY());				
		}
		eoms.util.appendPage(divId,sel.dom.value,true,onUpdate);	
	}