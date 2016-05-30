
function init_page(contextPath, insCode,winId){
	
	Ext.onReady(function(){
		var _tmpHeigth = window.parent.Ext.getCmp(winId).height;
		// 审批历史
		var approverPanel = new Ext.Panel({
			title	: '审批历史记录',
			html	:  '<iframe id=\"task_panel_url\" width=\"100%\" height='+_tmpHeigth+' frameborder=\"0\"></iframe>',
			listeners : {
				'afterrender' : function(){
					// 判断当前实例是否已归档
					Ext.Ajax.request({
						url 		: contextPath+'/workItemAction.do?method=isArchedInstance',
						params		: {'insCode'  : insCode},
						method 	: 'post',
						timeout : 3600000,
						//async	:	false,
						success : function(response, options) {
							var resp = Ext.JSON.decode(response.responseText); 
							if(resp.flag == "0"){
								// 已归档
								Ext.getDom('task_panel_url').src = contextPath+'/main?xwl=23X432D7JXHQ&varType=ins&insCode='+insCode;
							}else{
								// 未归档
								Ext.getDom('task_panel_url').src = contextPath+'/main?xwl=23VMPVCRPO4Y&varType=ins&insCode='+insCode;
							}
						},
						failure : function(reponse, options) {
							var response = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert("提示", response.msg);
						}
					});	
				}
			}
		});
		
		// 监控页面
		var monitorPanel = new Ext.Panel({
			title : '流程监控',
			height: '100%',
			html : '<iframe src=\"'+contextPath+'/workflow/task/processMonitor.jsp?varType=ins&insCode='+insCode+'\"width=\"100%\" height='+_tmpHeigth +' frameborder=\"0\"></iframe>'
			//html : '<iframe id="_swfFrame" src=\"'+contextPath+'/workflow/designer/ProcessMonitor.swf?type=ins&id='+insCode+'\"width=\"100%\" height='+_tmpHeigth+' frameborder=\"0\"></iframe>'
		});

		var tabpanel = new Ext.TabPanel({
			activeItem 	: 0,
			width 		: '100%',
			height 		: '100%',
			region 		: 'center',
			layout      : 'fit',
			items 		: [approverPanel, monitorPanel]
		});

		new Ext.Viewport({
			width 	: '100%',
			height 	: '100%',
			layout 	: 'border',
			items 	: [tabpanel]
		});	
	}) ;
}