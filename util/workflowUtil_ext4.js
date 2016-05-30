//平台流程操作封装方法
var workflowUtil = function(contextPath){
	//将json对象转化为ajax请求参数需要格式:xxx=xx&yyy=yy&zzz=zz
	function jsonToAjaxParam(params){
		var str = '';
		for(var i in params){
			str+=i+"="+params[i]+"&";
		}
		return str;
	};
	
	//发送同步请求,返回字符串 
	function sendRequest(url,params){
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("post",url,false);
		conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8"); 
		conn.send(jsonToAjaxParam(params));
		return conn.responseText;
	};
	
	/*
	 * 发送异步请求 
	 * */
	
	function sendAjaxRequest(url,params,callback){
		if(!params){params={}};
		Ext.Ajax.request({
		    url:url,
		    method: 'POST',
		    params:params,
		    success: function ( result, request) {
		    	//alert(result.responseText);
		        callback(Ext.decode(result.responseText));
		    },
		    failure: function ( result, request) {
		    	Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
		    }
		});
	};
	
	function createInstanceByProcessId_ajax(processId,callback){
		Ext.Msg.wait('根据流程Id创建流程实例....');
		var url = contextPath + "/workflowUtilAction.do?method=createInstanceByProcessId";
		var params ={'processId':processId};
		sendAjaxRequest(url,params,callback);
	}
	
	function createInstanceByProcessCode_ajax(processId,callback){
		Ext.Msg.wait('根据流程Code创建流程实例....');
		var url = contextPath + "/workflowUtilAction.do?method=createInstanceByProcessCode";
		var params ={'processCode':processCode};
		sendAjaxRequest(url,params,callback);
	}
	
	/**
	 * 根据实体编码和参数获取流程
	 * @param entityCode  实体编码  
	 * @param params  启动参数(json格式)
	 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
	 * 
	 * 正确 {flag:0,processId:'xxx',processCode:'xxx',processName:'xxx'}";
	 * 	  或者 
	 * 错误{flag:1,msg:'xxx'}
	 */
	function getProcessIdByEntityCode(entityCode,params,callback){
		
		Ext.Msg.wait("正在根据流程实体编码查询可执行流程....");
		var url = contextPath + "/workflowUtilAction.do?method=getProcessIdByEntityCode";
		if(!params){
			params = {};
		}
		params.entityCode = entityCode; 
		sendAjaxRequest(url,params,function(returnJson){
			if(returnJson.flag ==0){
				var str = {flag:0,processId:returnJson.processId,processCode:returnJson.processCode,processName:returnJson.processName};
				Ext.Msg.alert('提示',"找到可执行流程【"+returnJson.processName+"】",function(){callback(str);});
				
			}else if(returnJson.flag ==1){
				var str = {flag:1,msg:returnJson.msg};
				Ext.Msg.alert('提示',"寻找可执行流程失败："+returnJson.msg,function(){callback(str);});
			}else{
				
				var processArray = new Array();
				for(var i = 0;i<returnJson.data.length;i++){
					var record = returnJson.data[i];
					var row = {processId:record.processId,processCode:record.processCode,processName:record.processName}
					processArray[i] = row;
				};
				
				 Ext.define('Process', {
				     extend: 'Ext.data.Model',
				     fields: [
				         {name: 'processId', type: 'string'},
				         {name: 'processCode',  type: 'string'},
				         {name: 'processName',       type: 'string'}
				     ]
				 });
				 var ds = Ext.create('Ext.data.Store', {
				     model: 'Process',
				     data : processArray,
				     autoLoad:true
				 });
				 
				var grid = Ext.create('Ext.grid.Panel', {
				    store: ds,
				    selModel: { showHeaderCheckbox :false,selType: 'checkboxmodel',mode:'SINGLE' },   //选择框
				    columns:[
				             new Ext.grid.RowNumberer(),
							    {text:'ID',dataIndex:'processId',hidden:true},
							    {text:'流程编码',dataIndex:'processCode',width:130},
							    {text:'流程名称',dataIndex:'processName',width:180}
							 ],
				    height: 200,
				    width: 400,
				    listeners:{'rowdblclick':choose}
				});
				var t_window = new Ext.Window({
					width:440,
					height:400,
					layout:'fit',
					buttonAlign:'center',
					items:[grid],
					modal:true,
					closeAction:'close',
					title:'找到多个流程,请选择一条',
					buttons:[
					         {
					        	text:'确定',handler:choose
					         },{
					        	 text:'取消',handler:function(){
					        		 t_window.close(); 
					        	 }
					         }]
				});
				Ext.Msg.hide();
				t_window.show();
				
				function choose(){
					var records = grid.getSelectionModel().getSelection();
					if(records.length==1){
						var record = records[0];
						Ext.MessageBox.confirm("确认流程","选择流程:【"+record.get('processName')+"】,确定继续吗？",function(e){
							if(e=="yes"){
								var str = {flag:0,processId:record.get('processId'),processCode:record.get('processCode'),processName:record.get('processName')};
								t_window.close();
								callback(str);
							}
						});
					}else{
						Ext.Msg.alert('提示','请先选中一条流程');
					}
				}
			}
			
		});
	}
	
	
	/**
	 * 提交流程实例  
	 */
	function submitInstance_ajax(instanceCode,params,callback,userIds){
		Ext.Msg.wait('流程实例提交中....');
		if(!params){params = {}};
		var url = contextPath + "/workflowUtilAction.do?method=submitProcess";
		params.instanceCode =instanceCode;
		params.userIds =userIds;
		sendAjaxRequest(url,params,function(returnJson){
			//var returnJson = Ext.util.JSON.decode(obj);
			if(returnJson.flag == 0){
				var str = {flag:0,instanceCode:instanceCode};
				Ext.Msg.alert('提示','流程实例提交成功',function(){callback(str);});
				
			}else if(returnJson.flag == 1){
				var str = {flag:1,msg:returnJson.msg};
				Ext.Msg.alert('提示','流程实例提交失败,失败原因:'+returnJson.msg,function(){callback(str);});
			}else{
				//需要选择审批人 
				
				var userArray = new Array();
				
				for(var i = 0;i<returnJson.data.length;i++){
					var record = returnJson.data[i];
					var row = {userId:record.userId,userName:record.userName,empName:record.empName,orgName:record.orgName};
					userArray[i] = row;
				};
				
				Ext.define('Users', {
				     extend: 'Ext.data.Model',
				     fields: [
				         {name: 'userId', 	 type: 'string'},
				         {name: 'userName',  type: 'string'},
				         {name: 'empName',   type: 'string'},
				         {name: 'orgName',   type: 'string'}
				     ]
				 });
				 var ds = Ext.create('Ext.data.Store', {
				     model: 'Users',
				     data : userArray,
				     autoLoad:true
				 });
				
				var multiselect = returnJson.multiselect;
				var selModel = Ext.create('Ext.selection.CheckboxModel',{
					showHeaderCheckbox: multiselect=='Y'?true:false,
					mode :multiselect=='Y'?'MULTI':'SINGLE'	
				});
				var grid = new Ext.grid.GridPanel({
					selModel: selModel,
					store: ds, 
					columns: [
					          	new Ext.grid.RowNumberer(),
							    {text:'ID',dataIndex:'userId',hidden:true},
							    {text:'用户名',dataIndex:'userName',width:80},
							    {text:'员工名',dataIndex:'empName',width:100},
							    {text:'组织',dataIndex:'orgName',width:170}
					         ],
					listeners:{'rowdblclick':choose}
				});  
				var t_window = new Ext.Window({
					width:440,
					height:400,
					layout:'fit',
					items:[grid],
					buttonAlign:'center',
					modal:true,
					closeAction:'close',
					title:'找到多名审批人,请选择',
					buttons:[
					         {
					        	text:'确定',handler:choose
					         },{
					        	 text:'取消',handler:function(){
					        		 t_window.close(); 
					        	 }
					         }]
				});
				Ext.Msg.hide();
				t_window.show();
				
				function choose(){
					var records = grid.getSelectionModel().getSelection();
					if(records.length>0){
						var userIds = '';
						var uesrNames = '';
						for(var i=0;i<records.length;i++){
							var record = records[i];
							userIds +=""+record.get('userId')+",";
							uesrNames +=record.get('empName')+"("+record.get('userName')+")"+",";
						}
						userIds = userIds.substring(0,userIds.length-1);
						uesrNames = uesrNames.substring(0,uesrNames.length-1);
						
						Ext.MessageBox.confirm("确认审批人","选择审批人:【"+uesrNames+"】,确定继续吗？",function(e){
							if(e=="yes"){
								t_window.close();
								submitInstance_ajax(instanceCode,params,callback,userIds);
							}
						});
						
					}else{
						Ext.Msg.alert('提示','请先选择审批人');
					}
				}
			}
		});
	}
	
	function startAndSubmitProcess(processId,params,callback){
		//提交流程，创建流程实例
		createInstanceByProcessId_ajax(processId,function(obj){
			if(obj.flag !=0){
				callback(obj);
				return; 
			}
			var instanceCode = obj.instanceCode;
			submitInstance_ajax(instanceCode,params,callback);
		});
	}
	
	/**
	 * 弹出ext窗口
	 * @params:config窗口配置 json示例{title:'',height:'',width:'',url:'',isMax:'',closeCallback:function(){}}
	 */
	function showExtWindow(config){
		var winTitle = config.title!=null ? config.title : '';
		var winHeight = config.height!=null ? config.height : 500;
		var winWidth = config.width!=null ? config.width : 770;
		var winUrl = config.url!=null ? config.url : '';
		
		var windId = 'extWin' + new Date().getTime();
	    if(winUrl.indexOf('?')!= -1){
	    	winUrl = winUrl + '&extWinId=' + windId;
	    }else{
	    	winUrl = winUrl + '?extWinId=' + windId;
	    }
		
		var extWindow = Ext.create('Ext.window.Window', {
			id:windId,
		    title: winTitle,
		    height: winHeight,
		    width: winWidth,
		    layout: 'fit',
		    modal: true,
			resizable: false,
			maximizable: true,
			html: '<iframe id=\'extWindowIframe\' width=\'100%\' height=\'100%\' frameborder=0 src="' + winUrl + '"></iframe>',
			listeners: {
				show: function(win) {},
				close: function() {
					if (config.closeCallback) {
						config.closeCallback();
					}
				}
			}
		}).show();
		if(config.isMax){
			extWindow.maximize();
		}
	}
	
	/**
	 * 弹出附件管理页面
	 * @params: config附件配置 json示例{userId:'',src_id:'',org_id:'',att_cat:'',bus_no:'',canUp:'',canDown:'',canDel:'',closeCallback:function(){}} 
	 */
	function showAttachmentManager(config){
		var url = contextPath + '/platform/attachment/attachmentManage.jsp'
				  + '?userId=' + config.userId
		          + '&srcId=' + config.src_id
		          + '&orgId=' + config.org_id
		          + '&attCat=' + config.att_cat
		          + '&busNo=' + config.bus_no
		          + '&canUp=' + config.canUp
		          + '&canDown=' + config.canDown
		          + '&canDel=' + config.canDel
		
		var windowConfig = {title:'附件管理','url':url,'isMax':true,'closeCallback':config.closeCallback};
		showExtWindow(windowConfig);
	}
	
	/**
	 * 弹出功能帮助页面
	 * @params:funId 功能树id
	 * @params:type 帮助类型 r:只读 rw:读写
	 * @params:title 窗口标题
	 */
	function showFunHelpWin(funId, type, title){
		if(funId==null || funId=='undefined' || funId==''){
			Ext.Msg.alert('提示','请指定功能id!');
			return;
		}	
		var winTitle = '功能帮助';
		if(title){
			winTitle = title + '帮助';
		}
		var url = contextPath+"/pub/uip/common/kindeditor4/editor.jsp?type="+type+"&funTreeId="+funId;
		
		var windowConfig = {'title':winTitle,'url':url,'isMax':false};
		showExtWindow(windowConfig);
	}
	
	return {
		/**
		 * 根据流程ID创建流程实例
		 * @param processId  
		 * 返回json对象
		 * 正确 {flag:0,instanceCode:'xxx'}";
		 * 	  或者 
		 * 错误{flag:1,msg:'xxx'}
		 */
		'createInstanceByProcessId_ajax':function (processId,callback){
			createInstanceByProcessId_ajax(processId,callback);
		},
		
		/**
		 * 根据流程Code创建流程实例
		 * @param processId 
		 * 返回json对象  
		 * 正确 {flag:0,instanceCode:'xxx'}";
		 * 	  或者 
		 * 错误{flag:1,msg:'xxx'} 
		 */
		'createInstanceByProcessCode_ajax':function (processCode,callback){
			createInstanceByProcessCode_ajax(processCode,callback)
		},
		
		/**
		 * 根据实例Code撤回流程实例
		 * @param instanceCode
		 * 正确 {flag:0,msg:'xxx'}";
		 * 	  或者 
		 * 错误{flag:1,msg:'xxx'}   
		 */
		'revokeByInstanceCode_ajax':function (instanceCode,callback){
			Ext.Msg.wait('流程撤回中....');
			var url = contextPath + "/workflowUtilAction.do?method=revokeByInsCode";
			var params ={'instanceCode':instanceCode};
			sendAjaxRequest(url,params,callback);
		},
		
		/**
		 * 根据实例Code提交流程   
		 * @param instanceCode
		 * 正确 {flag:0,msg:'xxx'}";
		 * 	  或者 
		 * 错误{flag:1,msg:'xxx'}   
		 */
		'submitInstance_ajax':function (instanceCode,params,callback,userIds){
			submitInstance_ajax(instanceCode,params,callback,userIds);
		},
		
		/**
		 * 按流程Id 启动并提交流程 
		 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
		 * 
		 * 正确 {flag:0,instanceId:'xxx'}";
		 * 	  或者 
		 * 错误{flag:1,msg:'xxx'}
		 */
		
		'startAndSubmitProcess':function (processId,params,callback){
			startAndSubmitProcess(processId,params,callback);
		},
		
		/**
		 * 根据实体编码和参数获取流程并提交流程 
		 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
		 * 
		 * 正确 {flag:0,instanceId:'xxx'}";
		 * 	  或者 
		 * 错误{flag:1,msg:'xxx'}
		 */
		'startAndSubmitByEntityCode':function (entityCode,params,callback){
			//提交流程，创建流程实例
			getProcessIdByEntityCode(entityCode,params,function(obj){
				if(obj.flag !=0){
					callback(obj);
					return; 
				}
				var processId = obj.processId;
				startAndSubmitProcess(processId,params,callback);
			});
		},
		
		/**
		 * 根据实体编码和参数获取流程
		 * @param entityCode  实体编码  
		 * @param params  启动参数(json格式)
		 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
		 * 
		 * 正确 {flag:0,processId:'xxx',processCode:'xxx',processName:'xxx'}";
		 * 	  或者 
		 * 错误{flag:1,msg:'xxx'}
		 */
		'getProcessIdByEntityCode':function (entityCode,params,callback){
			getProcessIdByEntityCode(entityCode,params,callback);
		},
		
		/**
		 * 弹出ext窗口
		 * @params:config窗口配置 json示例{title:'',height:'',width:'',url:'',isMax:'',closeCallback:function(){}}
		 */
		'showExtWindow':function(config){
			showExtWindow(config);
		},
		
		/**
		 * 弹出附件管理页面
		 * @params: config附件配置 json示例{userId:'',src_id:'',org_id:'',att_cat:'',bus_no:'',canUp:'',canDown:'',canDel:'',closeCallback:function(){}} 
		 */
		'showAttachmentManager':function(config){
			showAttachmentManager(config);
		},
		
		/**
		 * 弹出功能帮助页面
		 * @params:funId 功能树id
		 * @params:type 帮助类型 r:只读 rw:读写
		 * @params:title 窗口标题
		 */
		'showFunHelpWin':function(funId, type, title){
			showFunHelpWin(funId, type, title);
		}
		
	}
}