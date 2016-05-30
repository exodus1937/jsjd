
function init_page(contextPath, taskId, bizId, insCode,taskState,
							submitCode,cancelCode,consultCode,consultCloseCode,
							consultRevokeCode,delegateCode,goBackCode,copyToCode,rejectCode) {
	
	Ext.onReady(function() {
//		Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";
		
		/*============================
		 * 加载审批按钮
		 *===========================*/
		var respButtonArray  ;
		var buttons ;
		var btnArray = new Array() ;	// 记录按钮数组
		var lineArray = new Array() ;	// 记录连线按钮数组
		if(taskState == 'closed'){
			// 待办已关闭
			respButtonArray = {} ;
			respButtonArray.flag = "0" ;
			respButtonArray.msg = "待办已关闭" ;
			buttons = [] ; 
			
		}else{
			respButtonArray = getGlobalData(contextPath+'/workItemAction.do?method=getButtonsByTaskId',taskId) ;
			buttons = respButtonArray.data; 
		}
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
			
			if(disable=="N"){	// 如果disable属性为 "Y"时, 则不显示按钮
				
				// 定义按钮对象
				var btn = new Ext.Button({
					text	: 	name
				});	
				
				// 根据按钮编码分配按钮处理事件
				if(code == submitCode){ // 提交流程
					btn.setHandler(function(){
						// 执行前置函数
						var json = beforeHandlerEvent(submitCode, insCode, bizId) ;
						if(json == null){// 不存在前置函数
							// 执行流程提交
							doSubmit(contextPath, taskId, null, submitCode, insCode, bizId);		
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								// 执行流程提交
								doSubmit(contextPath, taskId, null, submitCode, insCode, bizId);	
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}
					});
						
				}else if(code == cancelCode){	// 撤回流程
					btn.setHandler(function(){
						Ext.MessageBox.confirm('提示','您确定要撤回流程吗?',function(opt){
							if(opt == 'yes'){
								// 执行前置函数
								var json = beforeHandlerEvent(cancelCode, insCode, bizId) ;
								
								if(json == null){// 不存在前置函数
									// 执行流程撤回
									doCancel(contextPath, taskId, cancelCode, insCode, bizId) ;	
									
								}else{ // 存在前置函数
									var response = Ext.JSON.decode(json);
									
									if(response.flag == 0){	// 执行成功
										// 执行流程撤回
										doCancel(contextPath, taskId, cancelCode, insCode, bizId) ;		
										
									}else{
										Ext.Msg.alert("执行失败","原因："+response.msg) ;
										return false; 
									}	
								}
							}else{
								return false ;								
							}
						});
					});
					
				}else if(code == consultCode){ // 征询
					btn.setHandler(function(){
						// 执行前置函数
						var json = beforeHandlerEvent(consultCode, insCode, bizId) ;
						
						var comment = textArea.getValue(); 
						
						if(json == null){// 不存在前置函数
							chooseAllUsers(contextPath, taskId, consultCode, insCode, bizId, comment) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								chooseAllUsers(contextPath, taskId, consultCode, insCode, bizId, comment) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});
					
				}else if(code == consultCloseCode){ // 征询反馈
					btn.setHandler(function(){
						// 审批意见
						var comment = textArea.getValue();
						
						// 执行前置函数
						var json = beforeHandlerEvent(consultCloseCode, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							closeConsult(contextPath, taskId,comment,consultCloseCode, insCode, bizId) ;							
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								closeConsult(contextPath, taskId,comment,consultCloseCode, insCode, bizId) ;	
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});
					
				}else if(code == consultRevokeCode){ // 撤销征询
					btn.setHandler(function(){
						var comment = textArea.getValue(); 
						
						// 执行前置函数
						var json = beforeHandlerEvent(consultRevokeCode, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							revokeConsult(contextPath, taskId,comment,consultRevokeCode, insCode, bizId) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								revokeConsult(contextPath, taskId,comment,consultRevokeCode, insCode, bizId) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});	
					
				}else if(code == delegateCode){ // 委派处理
					btn.setHandler(function(){
						// 执行前置函数
						var json = beforeHandlerEvent(delegateCode, insCode, bizId) ;
						
						var comment = textArea.getValue();
						
						if(json == null){// 不存在前置函数
							chooseAllUsers(contextPath, taskId, delegateCode, insCode, bizId, comment) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								chooseAllUsers(contextPath, taskId, delegateCode, insCode, bizId, comment) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});
					
				}else if(code == goBackCode){ // 回退流程
					btn.setHandler(function(){
						// 执行前置函数
						var json = beforeHandlerEvent(goBackCode, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							// 取得回退节点信息
							var respActArray = getGlobalData(contextPath+'/workItemAction.do?method=getBackActivityList',taskId) ;
							if(respActArray.flag == 0){
								var acts = respActArray.data
								// 取得回退意见
								var comment = textArea.getValue();
								// 执行回退处理
								chooseBackActivity(contextPath, acts, taskId, comment, goBackCode, insCode, bizId) ;							
							}else{
								Ext.Msg.alert("提示",respActArray.msg) ;
								return false ;
							}							
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								// 取得回退节点信息
								var respActArray = getGlobalData(contextPath+'/workItemAction.do?method=getBackActivityList',taskId) ;
								if(respActArray.flag == 0){
									var acts = respActArray.data
									// 取得回退意见
									var comment = textArea.getValue();
									// 执行回退处理
									chooseBackActivity(contextPath, acts, taskId, comment, goBackCode, insCode, bizId) ;							
								}else{
									Ext.Msg.alert("提示",respActArray.msg) ;
									return false ;
								}								
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});
					
				}else if(code == rejectCode){ // 驳回流程
					btn.setHandler(function(){
						var comment = textArea.getValue(); 
						// 执行前置函数
						var json = beforeHandlerEvent(rejectCode, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							doReject(contextPath, taskId,comment, rejectCode, insCode, bizId) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								doReject(contextPath, taskId,comment, rejectCode, insCode, bizId) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}
					});	
					
				}else if(code == copyToCode){ // 关闭抄送待办
					btn.setHandler(function(){
						// 执行前置函数
						var json = beforeHandlerEvent(copyToCode, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							closeCopyTo(contextPath, taskId, copyToCode, insCode, bizId) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								closeCopyTo(contextPath, taskId, copyToCode, insCode, bizId) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}
					});
					
				}else{	// 按钮处理
					lineArray.push(btn.getId()+";"+code) ;
					btn.setHandler(function(code){
						// 计算按钮编码【点击时执行此段代码】
						var lineCode  = '' ;
						for(var j=0; j<lineArray.length; j++){
							var a = lineArray[j].split(';') ;
							if(a[0] == code.id){
								lineCode = a[1] ;
								break ;
							}
						}
						var comment = textArea.getValue();
						
						// 执行前置函数
						var json = beforeHandlerEvent(lineCode, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							completeTask(contextPath, taskId, comment, null, lineCode, insCode, bizId) ;	
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								completeTask(contextPath, taskId, comment, null, lineCode, insCode, bizId) ;	
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}
						
						
											
					});
				}
				
				// 将按钮对象压入数组
				btnArray.push(btn) ;				
			}
		}
		if(btnArray.length == 0 && taskState == 'open'){
			var _flag = respButtonArray.flag ;
			var _msg =  respButtonArray.msg ;
			if(_flag == '0'){
				_msg = '此待办已被<font color=\"red\">关闭/挂起</font>您暂不能执行审批处理,请确认!'
			}
			Ext.Msg.alert("提示",_msg,function(){
				window.parent.close() ;
				
			});
		}
		
		/*============================
		 * 加载业务表单及待办类型
		 *===========================*/
		var respFormJson = getGlobalData(contextPath+'/workItemAction.do?method=getTaskBaseInfo',taskId) ;
		var formUrl = respFormJson.formUrl ;		// 待办绑定的业务表单
		Ext.getDom('bizPanelFrame').src = formUrl;
		
		// 当前待办类型 ：normal - 正常待办，consult - 征询待办，copyto - 抄送待办，avoid - 规避待办，start-提交人待办
		var createType = respFormJson.createType ;	
		
		if(createType == 'normal' || createType == 'consult'){	// 征询或正常待办需要显示审批意见框
			Ext.getDom('fd_comment_id').style.display = "" ;
		}else{
			Ext.getDom('fd_comment_id').style.display = "none" ;
		}		
		
		
		/*============================
		 * 按钮处理区域
		 *===========================*/
		if(taskState == 'closed' || createType == 'start'){
			Ext.getDom('fd_buttons_id').style.display = "none" ;
			Ext.getDom('fd_comment_id').style.display = "none" ;
		}else{
			Ext.getDom('fd_buttons_id').style.display = "" ;
			Ext.getDom('fd_comment_id').style.display = "" ;			
		}
		
		var buttonPanel =  Ext.create('Ext.panel.Panel', {
			width	 	:	'100%',
//			baseCls     :	'my-panel-no-border',
			bodyBorder	:	false,
			frame		:	true,
			renderTo 	: 	'buttonsIframe',
			buttonAlign	:	'right',
			buttons		:	btnArray
		});
		
		
		/*============================ 
		 * 审批意见
		 *===========================*/
		var textArea = Ext.create('Ext.form.field.TextArea', {
			width	 	:	'100%',
			height	 	:	50,	
			inputType	:	'text'
		});
		var commentPanel = Ext.create('Ext.panel.Panel', {
			width	 :	'100%',
			height	 :	50,
			layout	 :	'fit',
			renderTo : 	'commentIframe',
			items	 :	[textArea]
		}) ;
		
		/*============================
		 * 业务表单区域
		 *===========================*/			
		/*var businessPanel = new Ext.Panel({
			width		:	'100%',
			height		:	450,
//			baseCls 	:	'my-panel-no-border',
			html 		: 	'<iframe id=\"bizPanelFrame\" onload="iframeLoaded(this)" src=\"'+formUrl+'\" width=\"100%\" height=\"100%\" scrolling=\"yes\" frameborder=\"0\"></iframe>',
			renderTo 	: 	'businessIframe'
		});*/
	});
}