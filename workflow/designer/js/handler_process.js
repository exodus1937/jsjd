
/**
 * 根据流程ID测试流程
 * 
 * @param {} contextPath
 * @param {} processId
 */
function testProc(contextPath, processId){
	
	var myWin = Ext.create('Ext.window.Window',{
		title		:	'流程测试 (<font color=red>计算流程执行路径及节点执行人</font>)',
	    width		:	document.body.clientWidth*(.6),
	    height		:	600,
	    modal		:	true,
	    layout		:	'fit',
	    autoScroll 	: 	true,
	    constrain	:	true,
	    shadow		:	false,
	    html		:	'<iframe src=\"'+contextPath+'/main?xwl=23VQR0HS5LTB&processId='+processId+'\"width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>',
	    onEsc		:	function(){
	    	myWin.hide();
	    }
	}) ;
	
	myWin.show();	
}

/**
 * 流程导出
 * 
 * @param {} contextPath
 * @param {} appId
 * @param {} entityId
 */
function expProc(contextPath, appId, entityId){
	if(appId == null || appId == "" || appId == "undefined"){
		Ext.Msg.alert("提示", "请选择业务模块！") ;
		return false ;
	}	
	
	var myWin = Ext.create('Ext.window.Window',{
		title		:	'流程导出',
//	    width		:	document.body.clientWidth*(.6),
		width		:	900,
	    height		:	600,
	    modal		:	true,
	    layout		:	'fit',
	    autoScroll 	: 	true,
	    constrain	:	true,
	    shadow		:	false,
	    html		:	'<iframe src=\"'+contextPath+'/main?xwl=23X4WSD8F9MU&appId='+appId+'&entityId='+entityId+'\"width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>',
	    onEsc		:	function(){
	    	myWin.hide();
	    }
	}) ;
	
	myWin.show();		
}

/**
 * 流程导入处理
 * 
 * @param {} contextPath
 */
function impProc(contextPath){
	/*
	var myForm = Ext.create('Ext.form.Panel',{
	    width		: 	480,
	    height		: 	80,
	    frame		: 	true,		
	    fileUpload	: 	true,
	    layout		:	'absolute',
	    transparent	:	true,
	    x			:	8,
	    y			:	8,
	    items		: [{
	    	xtype	: 	'label',
	    	width	:	250,
	    	height	:	22,
	    	x		:	16,
	    	y		:	8,
	    	text	:	'请选择待导入的XML文件：'
	    },{
	        xtype		: 	'filefield',
	       	width		:	350,
	    	height		:	22,
//	        inputType	: 	'file',
	        allowBlank	: 	false,
	    	x			:	16,
	    	y			:	40
	    },{
	    	xtype	: 	'button',
	    	text	: 	'导入',
	       	width	:	80,
	    	height	:	22,
	    	x		:	380,
	    	y		:	40,	    	
	    	handler	:	function(){
	            var form = this.up('form').getForm();
	            if(form.isValid()){
	                form.submit({
	                    url		: contextPath+'/procImpAndExpAction.do?method=impProc',
	                    waitMsg	: '数据导入中... ',
	                    success	: function(fp, o) {
	                        Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
	                    }
	                });
	            }	    		
	    	}
	    }]
	}) ;
	*/
	var myWin = Ext.create('Ext.window.Window',{
		title		:	'流程导入',
	    width		:	520,
	   	height		:	160,
	    modal		:	true,
	    layout		:	'fit',
	    autoScroll 	: 	true,
	    constrain	:	true,
	    shadow		:	false,
	    html		:	'<iframe src=\"'+contextPath+'/main?xwl=23X4WSD8F9NE \"width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>',
	    onEsc		:	function(){
	    	myWin.hide();
	    }
	}) ;
	
	myWin.show();	
}

