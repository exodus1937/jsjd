var TaskUtil = {
		
	// 征询按钮编码
	TASK_BTN_CONSULT : "btnConsult" ,
	// 委派按钮编码
	TASK_BTN_DELEGATE : "btnDelegate" ,
	// 回退按钮编码
	TASK_BTN_BACK : "btnBack" ,
	// 征询反馈按钮编码
	TASK_BTN_CONSULT_CLOSE : "btnCloseConsult" ,
	// 撤销征询按钮编码
	TASK_BTN_CONSULT_REVOKE : "btnRevokeConsult" ,
	// 提交流程按钮编码
	TASK_BTN_SUBMIT : "btnSubmit" ,
	// 撤销流程按钮编码
	TASK_BTN_CANCEL : "btnCancel" ,
	// 关闭抄送按钮编码
	TASK_BTN_COPYTO : "btnCopyTo" ,
	// 驳回流程	按钮编码
	TASK_BTN_REJECT : "btnReject" ,	
	// 业务表单iframe对象 id
	BIZ_PANEL_FRAME : "bizPanelFrame",
	
	
	// 获取应用根目录
	getCtxPath : function(){
	    var pathName = document.location.pathname;
	    var index = pathName.substr(1).indexOf("/");
	    var result = pathName.substr(0,index+1);
	    return result;		
	},
	
	/**
	 * 提交ajax请求
	 * @param {} requestUrl		:	请求URL
	 * @param {} requestParam	:	请求参数(json格式)
	 * @param {} isAsync		:	请求同步/异步性(true为同步,false为异步)
	 */
	sendAjaxReq : function(requestUrl, requestParam, isAsync){
		var resp ;
		// 提交请求
		Ext.Ajax.request({
			url 	: 	requestUrl,
			params	: 	requestParam,
			method 	: 	'post',
			timeout :	3600000,
			async	:	isAsync,
			success : function(response, options) {
				resp = Ext.JSON.decode(response.responseText); 
			},
			failure : function(reponse, options) {
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});			
		return resp ;			
	} , 
	
	/**
	 * 关闭当前待办处理窗口
	 */
	closeTaskWin : function(){
		window.parent.Ext.getCmp(xz_ExtWind_soft).close() ;
	},
	
	/**
	 * 根据待办ID生成审批按钮组
	 * @param {} taskId		:	待办ID
	 * @param {} bizId		:	业务ID
	 * @param {} insCode	:	实例编码
	 * @param {} taskState	:	待办状态
	 */
	createButtons : function(taskId, bizId, insCode,taskState){
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
			var _reqUrl = TaskUtil.getCtxPath() + '/workItemAction.do?method=getButtonsByTaskId' ;
			var _reqParam = {'taskId' : taskId} ;
			respButtonArray = TaskUtil.sendAjaxReq(_reqUrl, _reqParam, false) ;
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
				if(code == TaskUtil.TASK_BTN_SUBMIT){ // 提交流程
					btn.setHandler(function(){
						// 执行前置函数
						var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_SUBMIT, insCode, bizId) ;
						if(json == null){// 不存在前置函数
							// 执行流程提交
							TaskUtil.doSubmit(taskId, null, TaskUtil.TASK_BTN_SUBMIT, insCode, bizId);		
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								// 执行流程提交
								TaskUtil.doSubmit(taskId, null, TaskUtil.TASK_BTN_SUBMIT, insCode, bizId);	
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}
					});
						
				}else if(code == TaskUtil.TASK_BTN_CANCEL){	// 撤回流程
					btn.setHandler(function(){
						Ext.MessageBox.confirm('提示','您确定要撤回流程吗?',function(opt){
							if(opt == 'yes'){
								// 执行前置函数
								var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_CANCEL, insCode, bizId) ;
								
								if(json == null){// 不存在前置函数
									// 执行流程撤回
									TaskUtil.doCancel(taskId, TaskUtil.TASK_BTN_CANCEL, insCode, bizId) ;	
									
								}else{ // 存在前置函数
									var response = Ext.JSON.decode(json);
									
									if(response.flag == 0){	// 执行成功
										// 执行流程撤回
										TaskUtil.doCancel(taskId, TaskUtil.TASK_BTN_CANCEL, insCode, bizId) ;		
										
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
					
				}else if(code == TaskUtil.TASK_BTN_CONSULT){ // 征询
					btn.setHandler(function(){
						// 执行前置函数
						var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_CONSULT, insCode, bizId) ;
						
						var comment = textArea.getValue(); 
						
						if(json == null){// 不存在前置函数
							TaskUtil.chooseAllUsers(taskId, TaskUtil.TASK_BTN_CONSULT, insCode, bizId, comment) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								TaskUtil.chooseAllUsers(taskId, TaskUtil.TASK_BTN_CONSULT, insCode, bizId, comment) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});
					
				}else if(code == TaskUtil.TASK_BTN_CONSULT_CLOSE){ // 征询反馈
					btn.setHandler(function(){
						// 审批意见
						var comment = textArea.getValue();
						
						// 执行前置函数
						var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_CONSULT_CLOSE, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							TaskUtil.closeConsult(taskId,comment,TaskUtil.TASK_BTN_CONSULT_CLOSE, insCode, bizId) ;							
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								TaskUtil.closeConsult(taskId,comment,TaskUtil.TASK_BTN_CONSULT_CLOSE, insCode, bizId) ;	
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});
					
				}else if(code == TaskUtil.TASK_BTN_CONSULT_REVOKE){ // 撤销征询
					btn.setHandler(function(){
						var comment = textArea.getValue(); 
						
						// 执行前置函数
						var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_CONSULT_REVOKE, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							TaskUtil.revokeConsult(taskId,comment,TaskUtil.TASK_BTN_CONSULT_REVOKE, insCode, bizId) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								TaskUtil.revokeConsult(taskId,comment,TaskUtil.TASK_BTN_CONSULT_REVOKE, insCode, bizId) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});	
					
				}else if(code == TaskUtil.TASK_BTN_DELEGATE){ // 委派处理
					btn.setHandler(function(){
						// 执行前置函数
						var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_DELEGATE, insCode, bizId) ;
						
						var comment = textArea.getValue();
						
						if(json == null){// 不存在前置函数
							TaskUtil.chooseAllUsers(taskId, TaskUtil.TASK_BTN_DELEGATE, insCode, bizId, comment) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								TaskUtil.chooseAllUsers(taskId, TaskUtil.TASK_BTN_DELEGATE, insCode, bizId, comment) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}						
					});
					
				}else if(code == TaskUtil.TASK_BTN_BACK){ // 回退流程
					btn.setHandler(function(){
						// 执行前置函数
						var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_BACK, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							// 取得回退节点信息
							var _reqUrl = TaskUtil.getCtxPath()+'/workItemAction.do?method=getBackActivityList' ;
							var _reqParam = {'taskId' : taskId} ;
							respActArray = TaskUtil.sendAjaxReq(_reqUrl, _reqParam, false) ;		
							if(respActArray.flag == 0){
								var acts = respActArray.data
								// 取得回退意见
								var comment = textArea.getValue();
								// 执行回退处理
								TaskUtil.chooseBackActivity(acts, taskId, comment, TaskUtil.TASK_BTN_BACK, insCode, bizId) ;							
							}else{
								Ext.Msg.alert("提示",respActArray.msg) ;
								return false ;
							}							
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								// 取得回退节点信息
								var _reqUrl = TaskUtil.getCtxPath()+'/workItemAction.do?method=getBackActivityList' ;
								var _reqParam = {'taskId' : taskId} ;
								respActArray = TaskUtil.sendAjaxReq(_reqUrl, _reqParam, false) ;								
								
								if(respActArray.flag == 0){
									var acts = respActArray.data
									// 取得回退意见
									var comment = textArea.getValue();
									// 执行回退处理
									TaskUtil.chooseBackActivity(acts, taskId, comment, TaskUtil.TASK_BTN_BACK, insCode, bizId) ;							
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
					
				}else if(code == TaskUtil.TASK_BTN_REJECT){ // 驳回流程
					btn.setHandler(function(){
						var comment = textArea.getValue(); 
						// 执行前置函数
						var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_REJECT, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							TaskUtil.doReject(taskId, comment, TaskUtil.TASK_BTN_REJECT, insCode, bizId) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								TaskUtil.doReject(taskId, comment, TaskUtil.TASK_BTN_REJECT, insCode, bizId) ;
								
							}else{
								Ext.Msg.alert("执行失败","原因："+response.msg) ;
								return false; 
							}	
						}
					});	
					
				}else if(code == TaskUtil.TASK_BTN_COPYTO){ // 关闭抄送待办
					btn.setHandler(function(){
						// 执行前置函数
						var json = TaskUtil.beforeHandlerEvent(TaskUtil.TASK_BTN_COPYTO, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							TaskUtil.closeCopyTo(taskId, TaskUtil.TASK_BTN_COPYTO, insCode, bizId) ;
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								TaskUtil.closeCopyTo(taskId, TaskUtil.TASK_BTN_COPYTO, insCode, bizId) ;
								
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
						var json = TaskUtil.beforeHandlerEvent(lineCode, insCode, bizId) ;
						
						if(json == null){// 不存在前置函数
							TaskUtil.completeTask(taskId, comment, null, lineCode, insCode, bizId) ;	
							
						}else{ // 存在前置函数
							var response = Ext.JSON.decode(json);
							
							if(response.flag == 0){	// 执行成功
								TaskUtil.completeTask(taskId, comment, null, lineCode, insCode, bizId) ;	
								
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
		return btnArray ;
	},
	
	/**
	 * 获取业务表单地址
	 * @param {} taskId		:	待办ID
	 * return JSON 返回格式为：{"formUrl":"","createType":""}
	 */
	getBizFormUrl : function(taskId){
		var _reqUrl = TaskUtil.getCtxPath()+'/workItemAction.do?method=getTaskBaseInfo' ;
		var _reqParam = {"taskId":taskId} ;
		var resp = TaskUtil.sendAjaxReq(_reqUrl, _reqParam, false) ;
		if(resp == null || resp == "" || resp == "undefined"){
			return null;
		}else{
			return resp.formUrl;
		}
	},
	
	/**
	 * 按钮点击前执行函数
	 * @param {} buttonCode		:	按钮编码
	 * @param {} instanceCode	:	实例编码
	 * @param {} businessId		:	业务ID
	 */
	beforeHandlerEvent : function(buttonCode,instanceCode,businessId){
		var json = null ;
		// 取得业务表单iframe元素
		var iframeObj = document.getElementById(TaskUtil.BIZ_PANEL_FRAME) ;
		if(iframeObj != null){
			try{
				json = iframeObj.contentWindow.beforeHandler(buttonCode,instanceCode,businessId);
			}catch(ex){
				json = null ;
			}
		}	
		return json ; 
	},
	
	/**
	 * 按钮处理完成后回调函数
	 * @param {} buttonCode		:	按钮编码
	 * @param {} businessId		:	业务ID
	 * @param {} instanceCode	:	实例编码
	 */
	afterHandlerEvent : function(buttonCode,instanceCode,businessId){
		// 取得业务表单iframe元素
		var iframeObj = document.getElementById(TaskUtil.BIZ_PANEL_FRAME) ;
		if(iframeObj != null){
			try{
				iframeObj.contentWindow.afterHandler(buttonCode,instanceCode,businessId);
			}catch(ex){
			}							
		}	
	},
	
	/**
	 * 流程提交或完成待办选择下一个节点的审批人
	 * @param records		:	执行人记录
	 * @param isSingleSelect:	单选/多选			
	 * @param taskId		:	待办ID
	 * @param comment		:	审批意见
	 * @param buttonCode	:	按钮编码
	 * @param insCode		:	实例编码
	 * @param bizId			:	业务ID
	 */
	chooseApprover : function(records, isSingleSelect, taskId, comment, buttonCode, insCode, bizId){
		var actName = '' ;
		if(records.length > 0){
			actName = '<font color=\"red\">【'+records[0].actName+'】</font>节点的' ;
		}
		
	    var store = Ext.create('Ext.data.JsonStore',{
	    	 data 	:  records,
	    	 fields 	:  ['userId','actName','userName','empName','orgName']
	    }) ;
	    
	 	var selUser = Ext.create('Ext.form.field.Text',{
	 		id 				: 	'selUserId',
	        width 			: 	250,
	        inputType 		: 	'text',
	        labelSeparator 	:	':',
	        fieldLabel		:	'用户名',
	        labelWidth		: 	50,
	        labelAlign		:	'right',
	        listeners 		: 	{
	        	'specialkey': function(field, e){
	        		if (e.getKey() == e.ENTER) {
	            		var value=  selUser.getValue();
	        	    	store.filterBy(function(record,id){
	    	   	        	var text = record.get('empName');
	                    	return (text.indexOf(value)!=-1);
	    	   	    	});        			
	                }       		
	        	}
	        }		
		}) ;     
	 	
		var ttbar = Ext.create('Ext.toolbar.Toolbar', {items:[selUser]});
		
		var grid = Ext.create('Ext.grid.Panel',{
		    store	: store,
		    selModel : {
		    	 showHeaderCheckbox :	false,
		    	 selType	:	'checkboxmodel',
		    	 mode		:	isSingleSelect ? 'SINGLE' : 'MULTI'
		    },
		    tbar : ttbar ,
		    columns	: [
		        new Ext.grid.RowNumberer({header:'序号',width:35}),
		        {header: '用户ID',  hidden:true, dataIndex: 'userId'},
		        {header: '节点名', width:180,hidden:true, dataIndex: 'actName'},
		        {header: '用户名', width:120, dataIndex: 'userName'},
		        {header: '员工姓名', width:120, dataIndex: 'empName'},
		        {header: '组织名称', width:250, dataIndex: 'orgName'}
		    ],
		    width	:	'100%',
		    height	:	'100%',	
		    loadMask:	{'msg':'数据加载中...'},
		    dockedItems	: [{
		        xtype	: 'pagingtoolbar',
		        store	: store,   // GridPanel使用相同的数据源
		        dock	: 'bottom',
		        displayInfo: true
		    }],
		    listeners :{
		    	'afterrender': function(){
		    		// 选中第一条记录
		    		grid.getSelectionModel().select(store.first()) ;
		    	}
		    }
		});	
		 
		var btnConfirm = Ext.create('Ext.Button',{
		 	text	:	'选择',
		 	handler	:	function(){
		 		var record_array = grid.getSelectionModel().getSelection() ;
		 		if(record_array.length == 0){
		 			Ext.Msg.alert("提示","请选人审批人!") ;
		 			return false ;
		 		}else{
		 			var userIds = "";
		 			Ext.each(record_array,function(r){
		 				var userId = r.get('userId') ;
		 				if(userIds == ""){
		 					userIds = userId ;
		 				}else{
		 					userIds = userIds + "," + userId ;
		 				}
		 			}) ;
		 			
		 			win.hide();
		 			
		 			// 选择人后执行提交处理
		 			if(buttonCode == 'btnSubmit'){ // 提交
		 				TaskUtil.doSubmit(taskId,userIds,buttonCode,insCode,bizId) ;
		 				
		 			}else{
		 				TaskUtil.completeTask(taskId, comment, userIds, buttonCode,insCode,bizId) ;
		 			}
		 		}
		 	}		
		}) ;
		
		var btnCancel = Ext.create('Ext.Button',{
		 	text	:	'取消',
		 	handler	:	function(){
		 		win.hide();
		 	}
		}) ;
		
		var win = Ext.create('Ext.window.Window',{
		    title 		: 	'<div style="padding:7 "><span style="color:blue;">请选择'+actName+'审批人</span></div>',
		    width		:	700,
		    height		:	400,
		    modal		:	true,
		    layout		:	'fit',
		    autoScroll 	: 	true,
		    constrain	:	true,
		    adow		:	false,
		    shadow		:	false,
			items 		: 	[grid],
			buttonAlign	: 	'right',
			buttons 	:	[btnConfirm,btnCancel]		
		}) ;
		
		win.show() ;	
	},

	/**
	 * 选择征询人或委派人
	 * @param taskId	:	待办ID
	 * @param buttonCode:	按钮编码
	 * @param insCode	:	实例编码
	 * @param bizId		:	业务ID
	 * @param comment	:	审批意见
	 */
	chooseAllUsers : function(taskId, buttonCode, insCode, bizId, comment){
		if(comment == null || comment == "" || comment == "undefined"){
			if(buttonCode == 'btnConsult'){	// 征询
				Ext.Msg.alert("提示","请审批意见框中填写征询备注信息!") ;
				
			}else{ // 委派
				Ext.Msg.alert("提示","请审批意见框中填写委派备注信息!") ;
			}
			return false ; 
		}
		
		Ext.define('User',{
			extend	:	'Ext.data.Model',
			fields	:	[
				 {name: 'userId', 		type: 'string'},
				 {name: 'userName',  	type: 'string'},
				 {name: 'empCode',      type: 'string'},
				 {name: 'empName',  	type: 'string'},
				 {name: 'orgName',  	type: 'string'}
			]	
		}) ;
		
		Ext.define('User', {
			 extend: 'Ext.data.Model',
			 fields: [
				{name:'userId',		mapping:'userId'},
				{name:'userName',	mapping:'userName'},
				{name:'empCode',	mapping:'empCode'},
				{name:'empName',	mapping:'empName'},
				{name:'orgName',	mapping:'orgName'}
			 ]
		});	

		var myStore = Ext.create('Ext.data.Store', {
			model	: 'User',
			pageSize: 10,
			proxy	: {
				type	: 	'ajax',
				url		: 	TaskUtil.getCtxPath() + '/workItemAction.do?method=getUsersForConsultOrDelegate4Ext',
				reader	: {
					type	: 	'json',
					root	: 	'dataList',
					totalProperty	: 'totalProperty'
				}
			},
			listeners	:	{
				'beforeload' : function(){
					var params = {'taskId':taskId,'condition':condition.getValue()} ;
					Ext.apply(myStore.proxy.extraParams, params);
				}
			}		
		});	
		
		var condition = Ext.create('Ext.form.field.Text',{
	        width 			: 	250,
	        inputType 		: 	'text',
	        labelSeparator 	:	':',
	        fieldLabel		:	'名称',
	        labelWidth		: 	40,
	        labelAlign		:	'right',
	        listeners 		: 	{
	        	'specialkey': function(field, e){
	        		if (e.getKey() == e.ENTER) {
	        			myStore.load({params:{'start':0,'limit':10}});
	                }       		
	        	}
	        }		
		}) ;
		var mytbar = Ext.create('Ext.toolbar.Toolbar', {items:[condition]});
		
		var myGrid = Ext.create('Ext.grid.Panel',{
		    store	: myStore,
		    selModel : {
		    	 showHeaderCheckbox :	false,
		    	 selType	:	'checkboxmodel',
		    	 mode	:	'SINGLE' 
		    },
		    tbar : mytbar ,
		    columns	: [
		        new Ext.grid.RowNumberer({header:'序号',width:35}),
		        {header: '用户ID',  hidden:true, dataIndex: 'userId'},
		        {header: '用户名称', width:120, dataIndex: 'userName'},
		        {header: '员工编号', width:120, dataIndex: 'empCode'},
		        {header: '员工姓名', width:120, dataIndex: 'empName'},
		        {header: '组织名称', width:290, dataIndex: 'orgName'}
		    ],
		    width	: 400,
		    height	: 125,
		    loadMask:	{'msg':'数据加载中...'},
		    listeners	:	{
		    	'render' : function(){
		    		myStore.load({
		    			callback : function(){
		    				// 选中第一条记录
		    	    		myGrid.getSelectionModel().select(myStore.first()) ;
		    			}
		    		});
		    	}
		    },  
		    dockedItems	: [{
		        xtype	: 'pagingtoolbar',
		        store	: myStore,   // GridPanel使用相同的数据源
		        dock	: 'bottom',
		        displayInfo: true
		    }]
		});
		
		var tttile = (buttonCode=="btnConsult" ? "请选择征询人" : "请选择委派人") ; 
		
		var btnConfirm = Ext.create('Ext.Button', {
		    text: '选择',
		    handler: function() {
		 		var record_array = myGrid.getSelectionModel().getSelection() ;
		 		if(record_array.length == 0){
		 			Ext.Msg.alert("提示",tttile) ;
		 			return false ;
		 		}else{
		 			var userId = "";
		 			Ext.each(record_array,function(r){
		 				userId = r.get('userId') ;
		 			}) ;
		 			
		 			myWin.hide();
		 			
		 			// 选择人后执行处理
		 			if(buttonCode == 'btnConsult'){ // 征询
		 				TaskUtil.doConsult(taskId, userId, buttonCode, insCode, bizId, comment) ;
		 				
		 			}else if(buttonCode == 'btnDelegate'){ // 委派
		 				TaskUtil.doDelegate(taskId, userId, buttonCode, insCode, bizId, comment) ;
		 				
		 			}else{
		 				
		 			}
		 		}	    	
		    }
		});	
		
		var btnCancel = Ext.create('Ext.Button', {
		    text: '取消',
		    handler: function() {
		    	myWin.hide();
		    }
		});
		
		var myWin = Ext.create('Ext.window.Window',{
		    title 		: 	'<div style="padding:7 "><span style="color:blue;">'+tttile+'</span></div>',
		    width		:	750,
		    height		:	400,
		    modal		:	true,
		    layout		:	'fit',
		    autoScroll 	: 	true,
		    constrain	:	true,
		    shadow		:	false,
		    onEsc		:	function(){
		    	myWin.hide();
		    },
			items 		: 	[myGrid],
			buttonAlign	: 	'right',
			buttons 	:	[btnConfirm,btnCancel]		
			
		}) ;
		
		myWin.show();
	},

	/**
	 * 选择流程回退至节点信息
	 * @param records	:	节点记录集
	 * @param taskId	:	待办ID
	 * @param comment	:	审批意见
	 * @param buttonCode:	按钮编码
	 * @param insCode	:	实例编码
	 * @param bizId		:	业务ID
	 */
	chooseBackActivity : function(records, taskId, comment, buttonCode, insCode, bizId){
		if(comment == null || comment == "" || comment == "undefined"){
			Ext.Msg.alert("提示","请填写回退意见!") ;
			return false ; 
		}		
		
	    var store = Ext.create('Ext.data.JsonStore',{
	        data 	:  records,
	        fields 	:  ['activityId','activityCode','activityName']
	    });
	     
		var grid = Ext.create('Ext.grid.Panel',{
		    store	: store,
		    selModel : {
		    	 showHeaderCheckbox :	false,
		    	 selType	:	'checkboxmodel',
		    	 mode		:	'SINGLE'
		    },
		    columns	: [
		        new Ext.grid.RowNumberer({header:'序号',width:35}),
		        {header: '节点ID',  hidden:true, dataIndex: 'activityId'},
		        {header: '节点编码', width:200, dataIndex: 'activityCode'},
		        {header: '节点名称', width:300, dataIndex: 'activityName'}
		    ],
		    width	:	'100%',
		    height	:	'100%',	
		    loadMask:	{'msg':'数据加载中...'},
		    dockedItems	: [{
		        xtype	: 'pagingtoolbar',
		        store	: store,   // GridPanel使用相同的数据源
		        dock	: 'bottom',
		        displayInfo: true
		    }]
		});		
		 
		var btnConfirm = Ext.create('Ext.Button',{
		 	text	:	'选择',
		 	handler	:	function(){
		 		var record_array = grid.getSelectionModel().getSelection() ;
		 		if(record_array.length == 0){
		 			Ext.Msg.alert("提示","请选择回退至的节点!") ;
		 			return false ;
		 		}else{
		 			var backToActivityId = "";
		 			Ext.each(record_array,function(r){
		 				backToActivityId = r.get('activityId') ;
		 			}) ;
		 			
		 			win.hide();
		 			
		 			// 执行回退
		 			TaskUtil.doBack(taskId, comment, backToActivityId, buttonCode, insCode, bizId) ;	 			
		 		}
		 	}
		});
		
		var btnCancel = Ext.create('Ext.Button',{
		 	text	:	'取消',
		 	handler	:	function(){
		 		win.hide();
		 	}
		});
		
		var win = Ext.create('Ext.window.Window',{
		    title 		: 	'<div style="padding:7 "><span style="color:blue;">请选择回退节点</span></div>',
		    width		:	600,
		    height		:	400,
		    modal		:	true,
		    layout		:	'fit',
		    autoScroll 	: 	true,
		    constrain	:	true,
		    shadow		:	false,
			items 		: 	[grid],
			buttonAlign	: 	'right',
			buttons 	:	[btnConfirm,btnCancel]		
		});
		
		win.show() ;		
	},
	
	/**
	 * 提交流程
	 * @param {} taskId		:	待办ID
	 * @param {} userIds	:	审批人ID
	 * @param {} buttonCode	:	按钮编码
	 * @param {} insCode	:	实例编码
	 * @param {} bizId		:	业务ID
	 */
	doSubmit : function(taskId, userIds, buttonCode, insCode, bizId){
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=submitProcess',
			params	: {
				'taskId'  : taskId,
				'userIds' : userIds
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				if(response.flag == '0'){
					// 提交成功
					
					Ext.Msg.alert("提示",response.msg,function(){
						// 关闭父窗口
						//window.parent.close() ;
						TaskUtil.closeTaskWin() ;
						
						// 执行回调函数
						TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
					},this) ;
					
				}else if(response.flag == '1'){
					// 提交失败
					Ext.Msg.alert("提示", response.msg);
					return false;
					
				}else{
					// 手动选人
					if(response.multiselect == 'Y'){ // 多选审批人
						TaskUtil.chooseApprover(response.data, false, taskId, null, buttonCode, insCode, bizId) ;
						
					}else{	// 单选审批人
						TaskUtil.chooseApprover(response.data, true, taskId, null, buttonCode, insCode, bizId) ;
					}
				}
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});		
	},

	/**
	 * 撤回流程
	 * @param {} taskId		:	待办ID
	 * @param {} buttonCode	:	按钮编码
	 * @param {} insCode	:	实例编码
	 * @param {} bizId		:	业务ID
	 */
	doCancel : function(taskId, buttonCode, insCode, bizId){
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=revokeProcess',
			params	: {
				'taskId'  : taskId
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				// 提交成功
				Ext.Msg.alert("提示", response.msg, function(){
					// 关闭父窗口
					//window.parent.close() ;
					TaskUtil.closeTaskWin() ;
					
					// 执行回调函数
					TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;			
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});		
	},

	/**
	 * 征询处理
	 * @param taskId	:	待办ID
	 * @param userId	:	审批人ID
	 * @param buttonCode: 	按钮编码
	 * @param insCode	:	实例编码
	 * @param bizId		:	业务ID
	 * @param comment	:	审批意见
	 */
	doConsult : function(taskId, userId, buttonCode, insCode, bizId, comment){
		if(comment == null || comment == "" || comment == "undefined"){
			Ext.Msg.alert("提示","请填写征询备注信息!") ;
			return false ; 
		}
		
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=doConsult',
			params	: {
				'taskId'  	: 	taskId,
				'userId'	:	userId,
				'comment'	:	comment
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				
				// 提交成功
				Ext.Msg.alert("提示",response.msg,function(){
					// 关闭父窗口
					//window.parent.close() ;
					TaskUtil.closeTaskWin() ;
					
					// 执行回调函数
					TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;			
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});	
	},

	/**
	 * 征询反馈
	 * @param {} taskId		:	待办ID
	 * @param {} comment	:	审批意见
	 * @param {} buttonCode	:	按钮编码
	 * @param {} insCode	:	实例编码
	 * @param {} bizId		:	业务ID
	 */
	closeConsult : function(taskId,comment,buttonCode, insCode, bizId){
		if(comment == null || comment == "" || comment == "undefined"){
			Ext.Msg.alert("提示","请在审批意见框中填写征询反馈意见!") ;
			return false ; 
		}	
		
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=closeConsultTask',
			params	: {
				'taskId'  : taskId,
				'comment' :	comment
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				
				Ext.Msg.alert("提示",response.msg,function(){
					// 关闭父窗口
					//window.parent.close() ;
					TaskUtil.closeTaskWin() ;
					
					// 执行回调函数
					TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;		
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});		
	},

	/**
	 * 撤回征询
	 * @param {} taskId		:	待办ID
	 * @param {} comment	:	审批意见
	 * @param {} buttonCode	:	按钮编码
	 * @param {} insCode	:	实例编码
	 * @param {} bizId		:	业务ID
	 */ 
	revokeConsult : function(taskId, comment, buttonCode, insCode, bizId){
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=revokeConsultTask',
			params	: {
				'taskId' 	: 	taskId,
				'comment'	:	comment
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);

				Ext.Msg.alert("提示",response.msg,function(){
					// 关闭父窗口
					//window.parent.close() ;
					TaskUtil.closeTaskWin() ;
					
					// 执行回调函数
					TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;	
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});	
	},

	/**
	 * 委派处理
	 * @param taskId	:	待办ID
	 * @param userId	:	审批人ID
	 * @param buttonCode:	按钮编码
	 * @param insCode	:	实例编码
	 * @param bizId		:	业务ID
	 * @param comment	:	审批意见
	 */
	doDelegate : function(taskId, userId, buttonCode, insCode, bizId, comment){
		if(comment == null || comment == "" || comment == "undefined"){
			Ext.Msg.alert("提示","请填写备注信息!") ;
			return false ; 
		}
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=doDelegate',
			params	: {
				'taskId'  	: 	taskId,
				'userId'	:	userId,
				'comment'	:	comment
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				// 提交成功
				Ext.Msg.alert("提示",response.msg,function(){
					// 关闭父窗口
					//window.parent.close() ;
					TaskUtil.closeTaskWin() ;
					
					// 执行回调函数
					TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;			
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});	
	},

	/**
	 * 回退处理
	 * @param {} taskId				:	待办ID
	 * @param {} comment			:	审批意见
	 * @param {} backToActivityId	:	发起回退业务的节点ID
	 * @param {} buttonCode			:	按钮编码
	 * @param {} insCode			:	实例编码
	 * @param {} bizId				:	业务ID
	 */
	doBack : function(taskId, comment, backToActivityId, buttonCode, insCode, bizId){
		if(comment == null || comment == "" || comment == "undefined"){
			Ext.Msg.alert("提示","请填写回退意见!") ;
			return false ; 
		}	
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=doBack',
			params	: {
				'taskId' 			: 	taskId,
				'backToActivityId'	:	backToActivityId,
				'comment'			:	comment
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				
				Ext.Msg.alert("提示",response.msg,function(){
					// 关闭父窗口
					//window.parent.close() ;
					TaskUtil.closeTaskWin() ;
					
					// 执行回调函数
					TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});		
	},
	
	/**
	 * 驳回处理
	 * @param {} taskId		:	待办ID
	 * @param {} comment	:	审批意见
	 * @param {} buttonCode	:	按钮编码
	 * @param {} insCode	:	实例编码
	 * @param {} bizId		:	业务ID
	 */
	doReject : function(taskId, comment, buttonCode, insCode, bizId){
		if(comment == null || comment == "" || comment == "undefined"){
			Ext.Msg.alert("提示","请填写驳回意见!") ;
			return false ; 
		}	
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=rejectProcess',
			params	: {
				'taskId' 	: 	taskId,
				'comment'	:	comment
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				
				Ext.Msg.alert("提示",response.msg,function(){
					// 关闭父窗口
					//window.parent.close() ;
					TaskUtil.closeTaskWin() ;
					
					// 执行回调函数
					TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});	
	},

	/**
	 * 关闭抄送待办
	 * @param {} taskId		:	待办ID
	 * @param {} buttonCode	:	按钮编码
	 * @param {} insCode	:	实例编码
	 * @param {} bizId		:	业务ID
	 */
	closeCopyTo : function(taskId, buttonCode, insCode, bizId){
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=closeCopyToTask',
			params	: {
				'taskId' : 	taskId
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				
				Ext.Msg.alert("提示",response.msg,function(){
					// 关闭父窗口
					//window.parent.close() ;
					TaskUtil.closeTaskWin() ;
					
					// 执行回调函数
					TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});	
	},

	/**
	 * 完成待办
	 * @param {} taskId		:	待办ID
	 * @param {} comment	:	审批意见
	 * @param {} userIds	:	审批用户ID
	 * @param {} buttonCode	:	按钮编码
	 * @param {} insCode	:	实例编码
	 * @param {} bizId		:	业务ID
	 */
	completeTask : function(taskId, comment, userIds, buttonCode, insCode, bizId){
		if(comment == null || comment == "" || comment == "undefined"){
			
			Ext.Msg.alert("提示","请填写审批意见!") ;
			return false ; 
		}	
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
			url 	: TaskUtil.getCtxPath() + '/workItemAction.do?method=completeWorkItem',
			params	: {
				'taskId' 	: 	taskId,
				'comment'	:	comment,
				'userIds'	:	userIds,
				'lineCode'	:	buttonCode
			},
			method 	: 'post',
			timeout : 3600000,
			success : function(response, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				if(response.flag == '0'){	// 提交成功
					Ext.Msg.alert("提示",response.msg,function(){
						// 关闭父窗口

						//window.parent.close() ;
						TaskUtil.closeTaskWin() ;
						
						// 执行回调函数
						TaskUtil.afterHandlerEvent(buttonCode, insCode, bizId) ;
						
					},this) ;
					
				}else if(response.flag == '1'){	// 提交失败
					Ext.Msg.alert("提示", response.msg);
					return false;
					
				}else{	// 手动选人
					if(response.multiselect == 'Y'){ 
						// 多选审批人
						TaskUtil.chooseApprover(response.data, false, taskId, comment, buttonCode, insCode, bizId) ;
						
					}else{	
						// 单选审批人
						TaskUtil.chooseApprover(response.data, true, taskId, comment, buttonCode, insCode, bizId) ;
					}
				}
			},
			failure : function(reponse, options) {
				msg.hide();
				var response = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", response.msg);
			}
		});	
	}
};
