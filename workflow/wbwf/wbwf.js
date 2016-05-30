var WBWF = {

	// 获取浏览器信息
	getBrowserInfo : function(){
/*		
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
		
		//以下进行测试
		if (Sys.ie) document.write('IE: ' + Sys.ie);
		if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
		if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
		if (Sys.opera) document.write('Opera: ' + Sys.opera);
		if (Sys.safari) document.write('Safari: ' + Sys.safari);
*/		
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
        var m = ua.match(re);
        Sys.browser = m[1].replace(/version/, "'safari");
        Sys.ver = m[2];
        return Sys;
	},
		
	/**
	 * 打开待办审批页面
	 * @param {} contextPath
	 * @param {} taskId
	 * @param {} insCode
	 * @param {} title
	 * @param {} beginDate
	 * @param {} bizId
	 * @param {} fromUserName
	 * @param {} taskState
	 */
	openTaskPage : function(contextPath, taskId, taskState){
		// 等待框
		var msg = Ext.MessageBox.show({
			title 	 : 	'请等待',
			msg 	 : 	'正在提交请求.......',
			width 	 : 	300,
			wait	 : 	true,
			progress : 	true,
			closable : 	false
		});		

		// 提交请求
		Ext.Ajax.request({
			url 	: contextPath + '/workItemAction.do?method=isCustomTaskByTaskId',
			params	: {
				'taskId'  	: taskId,
				'taskState' : taskState
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				if(response.flag == '0'){ 
					// 客户化待办
					var url = response.url ; 
					window.open(url+"&taskId="+taskId+"&taskState="+taskState, "_blank");
					
				}else if(response.flag == '1'){	
					// 标准待办 
					//window.open(contextPath + "/main?xwl=23VMPVCRPO56&taskId="+ taskId ,"_blank");
					
					// 最外层弹出待办窗口   
					window.parent.parent.showExtWindow({
						'title'	:	'审批',
						'url'	:	contextPath + "/main?xwl=23VMPVCRPO56&taskId="+ taskId,
						'isMax'	:	true,
						closeCallback:function(){
						    taskStore.load();
						    hisTaskStore.load();
						    archTaskStore.load();
						}
					});
				}else{ 
					// 错误提示
					Ext.Msg.alert("提示", response.msg);
				}
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});			
	},	
	
	/**
	 * 批量待办处理 >> 同步请求取得按钮信息
	 * @param {} url
	 * @param {} taskId
	 * @return {}
	 */
	getGlobalData : function(url,taskId){
		var respArray = [] ;
		Ext.Ajax.request({
			url 		: url,
			params		: {'taskId'  : taskId},
			method 	: 'post',
			timeout : 3600000,
			async	:	false,
			success : function(response, options) {
				respArray = Ext.JSON.decode(response.responseText); 
			},
			failure : function(reponse, options) {
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});			
		return respArray ;
	},	
	
	/**
	 * 批量待办处理 >> 加载按钮信息
	 * @param {} contextPath
	 * @param {} taskId
	 * @param {} taskArray
	 * @return {}
	 */
	loadButtons	: function(contextPath,taskId, taskArray){
		var respButtonArray = this.getGlobalData(contextPath+'/workItemAction.do?method=getButtonsByTaskId', taskId) ;
		var buttons = respButtonArray.data; 
		var btnArray = new Array() ;	// 记录按钮数组
		var lineArray = new Array() ;	// 记录连线按钮数组
		for(var i=0; i<buttons.length; i++){
			var button = buttons[i];
			var id	= button.id ;
			var code = button.code;
			var name = button.name;
			if(name=='回退'){
				name='回退上级';
			}
			if(name=='驳回'){
				name='驳回填写人';
			}
			var disable = button.disable; // Y不可用   N可用	
			
			if (code == "btnConsult" 
					|| code == "btnCloseConsult"
					|| code == "btnRevokeConsult" 
					|| code == "btnDelegate"
					|| code == "btnBack") {
				continue ;
			}
			
			if(disable=="N"){	// 如果disable属性为 "Y"时, 则不显示按钮
				
				// 定义按钮对象
				var btn = new Ext.Button({
					text	: 	name
				});	
				
				// 根据按钮编码分配按钮处理事件
				if(code == "btnSubmit"){ // 提交流程
					btn.setHandler(function(){
						doSubmit(taskArray, null, "btnSubmit",contextPath);
					});
						
				}else if(code == "btnCancel"){	// 撤回流程
					btn.setHandler(function(){
						Ext.MessageBox.confirm('提示','您确定要撤回流程吗?',function(opt){
							if(opt == 'yes'){
								doCancel(taskArray,contextPath) ;
							}else{
								return false ;								
							}
						});
					});
				}else if(code == "btnReject"){ // 驳回流程
					btn.setHandler(function(){
						var comment = Ext.getCmp('textArea1').getValue(); 
						doReject(taskArray,comment,contextPath) ;
					});	
					
				}else if(code == "btnCopyTo"){ // 关闭抄送待办
					btn.setHandler(function(){
						closeCopyTo(taskArray,contextPath) ;
					});
					
				}else{	// 按钮处理
					lineArray.push(btn.getId()+";"+code) ;
					btn.setHandler(function(code,b){
						// 计算按钮编码【点击时执行此段代码】
						var lineCode  = '' ;
						for(var j=0; j<lineArray.length; j++){
							var a = lineArray[j].split(';') ;
							if(a[0] == code.id){
								lineCode = a[1] ;
								break ;
							}
						}
						var comment = Ext.getCmp('textArea1').getValue();
						completeTask(taskArray, comment, null, lineCode, contextPath) ;						
					});
				}
				
				// 将按钮对象压入数组
				btnArray.push(btn) ;
			}
		}
		return btnArray ;
	},
	
	/**
	 * 批量待办处理 >> 打开界面
	 * @param {} contextPath
	 * @param {} taskIds
	 */
	openBatchTaskPage : function(contextPath, taskIds){
		// 等待框
		var msg = Ext.MessageBox.show({
			title 	 : 	'请等待',
			msg 	 : 	'正在提交请求.......',
			width 	 : 	240,
			wait	 : 	true,
			progress : 	true,
			closable : 	false
		});	
		
		// 提交请求
		Ext.Ajax.request({
			url 	: contextPath + '/workItemAction.do?method=isSameProcess',
			params	: {
				'taskIds'  : taskIds
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				if(response.flag == 0){
					// 加载按钮
					var a = taskIds.split(",") ;
					var btnArr = this.WBWF.loadButtons(contextPath, a[0], a) ;
					
					// 审批意见
					var textArea = new Ext.form.TextArea({
						id			:	'textArea1' ,
						width	 	:	'100%',
						height	 	:	180,			
						inputType	:	'text' 
					}) ;	
					var fieldset = new Ext.form.FieldSet({
				        title		:	'审批意见',
					    labelAlign	: 	'right',
					    layout		: 	'column',
					    labelWidth	:	80,
					    height	 	:	220,	
						items		: 	[
							{layout:"form",baseCls:'my-panel-no-border',columnWidth:1,items:[textArea]}		
						]
					});						
					var panel= new Ext.Panel({
						width	 	:	'100%',
						height	 	:	50,
						baseCls     :	'my-panel-no-border',
						items		:	[fieldset],
						buttonAlign	:	'right',
						buttons		:	btnArr
					}) ;					
					
					// 审批窗口
					new Ext.Window({
						id			:	'batchWin',
					    title 		: 	'<font color=red><i>【注意：所选待办信息须为同一流程、同一流程版本、相同节点且下一通知/会签节点无须手动选人】</i></font>',
					    bodyStyle  	: 	'padding: 10px 0px 0px',
					    width		:	600,
					    height		:	300,
					    modal		:	true,
					    closeAction	:	true,
					    layout		:	'fit',
					    autoScroll 	: 	true,
					    constrain	:	true,
					    shadow		:	false,
					    items		:	[panel]
					}).show();						
				}else{
					Ext.Msg.alert("提示","所选待办信息须为同一流程、同一流程版本、相同节点,请确认!") ;
					return false;
				}
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});			
	}
}