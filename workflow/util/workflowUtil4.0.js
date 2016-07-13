var _getContextPath = function() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}; 

var contextPath = _getContextPath();
document.write('<script src="' + contextPath + '/platform/util/platformUtil.js" type="text/javascript" ></sc' + 'ript>');

/* =============================================================================
 * 15.征询、委派和回退按钮
 * btnConsult - 征询  ,  
 * btnDelegate - 委派  , 
 * btnBack - 回退
 * btnCloseConsult - 征询反馈  , 
 * btnRevokeConsult - 撤消征询
 * btnSubmit-提交流程, 
 * btnCancel-撤销流程, 
 * btnCopyTo-关闭抄送待办
 * btnReject-驳回
 * =============================================================================
 */

var WorkFlowConstants = {
	TASK_BTN_CONSULT : "btnConsult" ,
	TASK_BTN_DELEGATE : "btnDelegate" ,
	TASK_BTN_BACK : "btnBack" ,
	TASK_BTN_CONSULT_CLOSE : "btnCloseConsult" ,
	TASK_BTN_CONSULT_REVOKE : "btnRevokeConsult" ,
	TASK_BTN_SUBMIT : "btnSubmit" ,
	TASK_BTN_CANCEL : "btnCancel" ,
	TASK_BTN_COPYTO : "btnCopyTo" ,
	TASK_BTN_REJECT : "btnReject" 	
}

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


//发送异步请求 
function sendAjaxRequest(url,params,callback){
	if(!params){params={};};
	Ext.Ajax.request({
	    url:url,
	    method: 'POST',
	    timeout : 300000,
	    params:params,
	    success: function ( result, request) {
	    	Ext.Msg.hide();
	    	//alert(result.responseText);
	        callback(Ext.JSON.decode(result.responseText));
	    },
	    failure: function ( result, request) {
	    	Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
	    }
	});
};

/**
 * 根据流程ID创建流程实例
 * @param processId  
 * 返回json对象
 * 正确 {flag:0,instanceCode:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}
 */
function createInstanceByProcessId(processId,callback){
	Ext.Msg.wait('根据流程Id创建流程实例....');
	var url = contextPath + "/workflowUtilAction.do?method=createInstanceByProcessId";
	var params ={'processId':processId};
	sendAjaxRequest(url,params,callback);
}

/**
 * 根据流程Code创建流程实例
 * @param processCode 
 * 返回json对象  
 * 正确 {flag:0,instanceCode:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'} 
 */
function createInstanceByProcessCode(processCode,callback){
	Ext.Msg.wait('根据流程Code创建流程实例....');
	var url = contextPath + "/workflowUtilAction.do?method=createInstanceByProcessCode";
	var params ={'processCode':processCode};
	sendAjaxRequest(url,params,callback);
}

/**
 * 根据实体编码创建流程实例
 * @param {} entityCode 实体编码
 * @param {} callback 回调函数
 * 正确 {flag:0,instanceCode:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'} 
 */
function createInstanceByEntityCode(entityCode,params,callback){
	getProcessIdByEntityCode(entityCode,params,function(obj){
		if(obj.flag !=0){
			if(callback){
				callback(obj);
			}
			Ext.Msg.alert('提示',obj.msg);
			return; 
		}
		var processId = obj.processId;
		createInstanceByProcessId(processId,callback);
	});
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
	var url = contextPath + "/workflowUtilAction.do?method=getProcessIdByEntityCodeOld";
	if(!params){
		params = {};
	}else{
		if(typeof(params) != "object"){
			try{
				params = Ext.JSON.decode(params) ;
			}catch(ex){
				Ext.Msg.alert("提示",ex) ;
				return ;
			}
		}
	}
	
	var json = {
		"entityCode" : entityCode,
		"entityAttJson" : params
    };
    var jsonData = Ext.JSON.encode(json);
    
    // 提交ajax请求
    Ext.Ajax.request({
    	url		: 	url,
    	method	:	'POST',
    	sync	:	'',
    	scope	:	this,
    	timeout : 	300000,
    	headers	:	{'Content-Type':'application/json'},
    	jsonData:	jsonData,
    	success	: 	function(res, opts){
	    	Ext.Msg.hide();
	    	var returnJson = Ext.JSON.decode(res.responseText);
	    	
			if(returnJson.flag == 0){	
				// 找到一个符合条件的流程, 直接启动流程
				var procId = returnJson.processId ;	// 流程ID
				
				// 取得实例编码
				var _insCode = params.e_instance_code ;
				
				if(_insCode != null && _insCode != "" && _insCode != "undefined"){
					// 如果实例编码已存在, 则执行重启并提交流程
					restartInstanceSubmit(_insCode,procId,params,callback);
					
				}else{
					// 如果实例编码不存在, 则执行启动并提交流程
					startAndSubmitProcess(procId,params,callback) ;
				}
				
			}else if(returnJson.flag == 1){	
				// 未找到符合条件的流程
				var str = {flag:1,msg:returnJson.msg};
				Ext.Msg.alert('提示',"寻找可执行流程失败："+returnJson.msg,function(){callback(str);});
				
			}else{	
				// 找到多个符合条件的流程
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
					function choose(){
						var records = grid.getSelectionModel().getSelection();
						if(records.length==1){
							var record = records[0];
							Ext.MessageBox.confirm("确认流程","选择流程:【"+record.get('processName')+"】,确定继续吗？",function(e){
								if(e=="yes"){
									params.flag=0;
									params.processId=record.get('processId');
									params.processCode=record.get('processCode');
									params.processName=record.get('processName');
									t_window.close();
									callback(params);
								}
							});
						}else{
							Ext.Msg.alert('提示','请先选中一条流程');
						}
					}
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
				
			}
	    },
    	failure: function(res, opts){
    		Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
    	}
    });
}

/**
 * 根据实例Code提交流程   
 * @param instanceCode
 * @param params  启动参数(json格式)
 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象 
 * 正确 {flag:0,msg:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}   
 */
function submitInstance(instanceCode,params,callback){
	Ext.Msg.wait('流程实例提交中....');
	
	if(!params){
		params = {}
	}else{
		if(typeof(params) != "object"){
			try{
				params = Ext.JSON.decode(params) ;
			}catch(ex){
				Ext.Msg.alert("提示",ex) ;
				return ;
			}
		}
	};
	
	var url = contextPath + "/workflowUtilAction.do?method=submitProcessOld";
	
	var json = {
		"instanceCode" : instanceCode,
		"entityAttJson" : params
    };

    var jsonData = Ext.JSON.encode(json);
    
    // 提交ajax请求
    Ext.Ajax.request({
    	url		: 	url,
    	method	:	'POST',
    	sync	:	'',
    	scope	:	this,
    	timeout : 	300000,
    	headers	:	{'Content-Type':'application/json'},
    	jsonData:	jsonData,
    	success	: 	function(res, opts){
    		// 关闭进度条
    		Ext.Msg.hide();
    		// 获取返回值
	    	var returnJson = Ext.decode(res.responseText);
	    	
    		if(returnJson.flag == 0){
    			// 提交成功
    			var str = {flag:0,instanceCode:instanceCode};
    			callback(str);
    			
    		}else if(returnJson.flag == 1){
    			// 提交失败
    			var str = {flag:1,msg:returnJson.msg};
    			callback(str);
    			
    		}else{
    			/*=================
    			 * 流需要手动选择审批人
    			 *===============*/
    			
    			// 取得记录集和选择模式
    			var records =  returnJson.data ;
    			var multiselect = returnJson.multiselect;
    			
    			// 取得节点名称
    			var _actName = '' ;
    			if(records.length > 0){
    				_actName = '<font color=\"red\">【'+records[0].actName+'】</font>节点的' ;
    			}
    			// 定义store
			    var ds = Ext.create('Ext.data.JsonStore',{
			    	 data 	:  records,
			    	 fields :  ['userId','actName','userName','empName','orgName']
			    }) ;
    			// 判断选择框
    			var selModel = Ext.create('Ext.selection.CheckboxModel',{
    				showHeaderCheckbox	: 	multiselect == 'Y' ? true:false,
    				selType				:	'checkboxmodel',
    				mode 				:	multiselect=='Y' ? 'MULTI':'SINGLE'	
    			});
    			// 定义查询框
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
    			// 选择后处理函数
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
    							
    							var url = contextPath + "/workflowUtilAction.do?method=submitProcessOld";
    							
    							var json = {
									"instanceCode" 	: 	instanceCode,
									"entityAttJson" : 	params,
									"userIds"		:	userIds
							    };
    							
    							var jsonData = Ext.JSON.encode(json);
    							// 提交请求
    							Ext.Ajax.request({
    						    	url		:	url,
    						    	method	:	'POST',
    						    	sync	:	'',
    						    	scope	:	this,
    						    	timeout : 	300000,
    						    	headers	:	{'Content-Type':'application/json'},
    						    	jsonData:	jsonData,
    						    	success	: 	function(res, opts){
    							    	var returnJson = Ext.decode(res.responseText);
    							    	
    							    	if(returnJson.flag == 0){
        									var str = {flag:0,instanceCode:instanceCode};
        									callback(str);
        									
        								}else if(returnJson.flag == 1){
        									var str = {flag:1,msg:returnJson.msg};
        									callback(str);
        								}
    						    	},
    						    	failure	: 	function(res, opts){
    						    		Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
    						    	}
    						    });
    						}
    					});
    					
    				}else{
    					Ext.Msg.alert('提示','请先选择审批人');
    				}
    			}
    		 	// 定义Grid
    			var grid = new Ext.grid.GridPanel({
    				selModel	: 	selModel,
    				store		: 	ds, 
    				columns		: 	[
			          	new Ext.grid.RowNumberer(),
					    {text:'ID',		dataIndex:'userId',		hidden:true},
					    {text:'节点名',	dataIndex:'actName',	hidden:true,width:200},
					    {text:'用户名',	dataIndex:'userName',	width:120},
					    {text:'员工名',	dataIndex:'empName',	width:100},
					    {text:'组织',		dataIndex:'orgName',	width:200}
    				],
    				listeners:{
    					'rowdblclick':choose
    				}
    			});  
    			
    			var t_window = new Ext.Window({
    				width	:	700,
    				height	:	400,
    				layout	:	'fit',
    				items	:	[grid],
    				buttonAlign	:	'center',
    				modal	:	true,
    				closeAction	:	'close',
    				title	:	'请选择'+_actName+'审批人',
    				buttons	:	[
    				    {
			        		text:'确定',handler:choose
			         	},{
			         		text:'取消',handler:function(){
			         			t_window.close(); 
			         		}
			         	}
			        ]
    			});
    			
    			Ext.Msg.hide();
    			t_window.show();
    			// 选中第一行记录
				selModel.select(ds.first()) ;
    			

    		}
    	},
    	failure: function(res, opts){
    		Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
    	}
    });
}

/**
 * 按流程Id 启动并提交流程 
 * @param processId 流程id
 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
 * 
 * 正确 {flag:0,instanceId:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}
 */
function startAndSubmitProcess(processId,params,callback){
	//提交流程，创建流程实例
	Ext.Msg.wait('根据流程Id创建流程实例....');
	
	if(!params){
		params = {'processId':processId} ;
	}else{
		if(typeof(params) != "object"){
			try{
				params = Ext.JSON.decode(params) ;
				
			}catch(ex){
				Ext.Msg.alert("提示",ex) ;
				return ;
			}
		}		
		// 加入流程ID
		params.processId = processId ;
	}
	
	// 提交请求
	Ext.Ajax.request({
	    url		:	contextPath + '/workflowUtilAction.do?method=createInstanceByProcessId',
	    method	:	'POST',
	    timeout : 	300000,
	    params	:	params,
	    success	: 	function(result, request){
	    	Ext.Msg.hide() ;
	    	var obj = Ext.JSON.decode(result.responseText) ;
	    	if(obj.flag !=0){ 
	    		// 流程实例创建失败
				callback(obj);
				return; 
				
			}else{	
				// 流程实例创建成功提交流程
				var instanceCode = obj.instanceCode;
				submitInstance(instanceCode,params,callback);
			}
	    },
	    failure	: 	function(result, request){
	    	Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
	    }
	});	
}

/**
 * 根据实例Code撤回流程实例
 * @param instanceCode
 * 正确 {flag:0,msg:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}   
 */
function revokeByInstanceCode(instanceCode,callback){
	Ext.Msg.wait('流程撤回中....');
	var url = contextPath + "/workflowUtilAction.do?method=revokeByInsCode";
	var params ={'instanceCode':instanceCode};
	sendAjaxRequest(url,params,callback);
}

/**
 * 根据实体编码和参数获取流程并提交流程 
 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
 * 
 * 正确 {flag:0,instanceId:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}
 */
function startAndSubmitByEntityCode(entityCode,params,callback){

	Ext.Msg.wait("正在根据流程实体编码查询可执行流程....");
	
	var url = contextPath + "/workflowUtilAction.do?method=getProcessIdByEntityCodeOld";
	
	if(!params){
		params = {};
	}else{
		if(typeof(params) != "object"){
			try{
				params = Ext.JSON.decode(params) ;
			}catch(ex){
				Ext.Msg.alert("提示",ex) ;
				return ;
			}
		}
	}
	
	var json = {
		"entityCode" : entityCode,
		"entityAttJson" : params
    };

    var jsonData = Ext.JSON.encode(json);
    
    Ext.Ajax.request({
    	url: url,
    	method:'POST',
    	sync:'',
    	scope:this,
    	timeout : 300000,
    	headers:{'Content-Type':'application/json'},
    	jsonData:jsonData,
    	success: function(res, opts){
	    	Ext.Msg.hide();
	    	
	    	var returnJson = Ext.decode(res.responseText);
	    	
			if(returnJson.flag ==0){	
				// 如果找到一个流程
				var processId = returnJson.processId;
				startAndSubmitProcess(processId,params,callback);
				
			}else if(returnJson.flag ==1){
				var str = {flag:1,msg:returnJson.msg};
				Ext.Msg.alert('提示',"寻找可执行流程失败："+returnJson.msg,function(){callback(str);});
				
			}else{
				// 找到0或多个符合条件的流程  
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
					buttons:[{
			        	text:'确定',handler:choose
			         	},{
			        	 text:'取消',handler:function(){
			        		 t_window.close(); 
			        	 	}
			         	}
					]
				});
				Ext.Msg.hide();
				t_window.show();
				function choose(){
					var records = grid.getSelectionModel().getSelection();
					if(records.length==1){
						var record = records[0];
						Ext.MessageBox.confirm("确认流程","选择流程:【"+record.get('processName')+"】,确定继续吗？",function(e){
							if(e=="yes"){
								t_window.close();
								var processId = record.get('processId');
								startAndSubmitProcess(processId,params,callback);
							}
						});
					}else{
						Ext.Msg.alert('提示','请先选中一条流程');
					}
				}
			}
	    },
    	failure: function(res, opts){
    		xt.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
    	}
    });
/*	
	//提交流程，创建流程实例
	getProcessIdByEntityCode(entityCode,params,function(obj){
		if(obj.flag !=0){
			callback(obj);
			return; 
		}
		var processId = obj.processId;
		startAndSubmitProcess(processId,params,callback);
	});
*/
}

/**
 * 按实例code重新启动流程
 *
 * @param    instanceCode  流程实例Code
 * return   返回参数，代表流程实例编码
 * 
 * 返回XML串   flag:0   正确，1 错误, 错误时msg为错误信息
 * <result>
 *     <flag></flag>
 *     <msg></msg>
 * </result>
 * 
**/
function restartInstance(instanceCode,processId,callback){
	Ext.Msg.wait('流程重启中....');
	var url = contextPath + "/workflowUtilAction.do?method=restartInstance";
	var params ={'instanceCode':instanceCode,'processId':processId};
	sendAjaxRequest(url,params,callback);
}

/**
 * 重启并提交
 * @param instanceCode
 * @param processId
 * @param params
 * @param callback
 */
function restartInstanceSubmit(instanceCode,processId,params,callback){
	restartInstance(instanceCode,processId,function(obj){
		if(obj.flag!=0){
			Ext.Msg.alert('提示',obj.msg,function(){callback(obj);});
			return;
		}
		//重启成功，并提交
		submitInstance(instanceCode,params,callback);
	});
}

/**
 * 弹出流程监控页面
 * @param insCode
 */
function showMonitorPage(insCode){
	if(insCode==null || insCode=='undefined' || insCode==''){
		Ext.Msg.alert('提示','请指定实例编码!');
		return;
	}	
	var url = contextPath+"/workflow/monitor/extMonitorFrame.jsp?insCode="+insCode;
	var windowConfig = {'title':'流程监控', 'url':url, 'isMax':true};
	showExtWindow(windowConfig);
}

/**
 *  撤回流程
 * @param taskId
 * @param callback
 */
function doCancel(taskId, callback){
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
		url 	: contextPath + '/workflowUtilAction.do?method=revokeProcess',
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
				window.parent.close() ;
				// 执行回调函数
				try{
					callback();
				}catch(e){
				}
			},this) ;			
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});		
}

/**
 * 征询
 * @param taskId
 * @param comment
 * @param callback
 */
function doConsult(taskId, comment, callback){
	chooseAllUsers(taskId, WorkFlowConstants.TASK_BTN_CONSULT, comment, callback);
}

/**
 * 委派
 * @param taskId
 * @param comment
 * @param callback
 */
function doDelegate(taskId, comment, callback){
	chooseAllUsers(taskId, WorkFlowConstants.TASK_BTN_DELEGATE, comment, callback);
}

/**
 * 征询反馈
 * @param {} taskId
 * @param {} comment
 * @param {} callback
 * @return {Boolean}
 */
function closeConsult(taskId, comment, callback){
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
		url 	: contextPath + '/workflowUtilAction.do?method=closeConsultTask',
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
				window.parent.close() ;
				// 执行回调函数
				try{
					callback() ;
				}catch(e){
				}
			},this) ;		
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});		
}

/**
 * 撤回征询
 * @param {} taskId
 * @param {} comment
 * @param {} callback
 */ 
function revokeConsult(taskId, comment, callback){
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
		url 	: contextPath + '/workflowUtilAction.do?method=revokeConsultTask',
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
				window.parent.close() ;
				// 执行回调函数
				try{
					callback() ;
				}catch(e){
				}
			},this) ;	
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});	
}

/**
 * 回退
 * @param {} taskId
 * @param {} comment
 * @param {} callback
 * @return {Boolean}
 */
function doBack(taskId, comment, callback){
	if(comment==null || comment==''){
		Ext.Msg.alert('提示','请输入回退意见!');
		return;
	}
	
	// 取得回退节点信息
	var respActArray = getGlobalData(contextPath+'/workflowUtilAction.do?method=getBackActivityList',taskId) ;
	if(respActArray.flag == 0){
		var acts = respActArray.data
		// 取得回退意见
		// 执行回退处理
		chooseBackActivity(acts, taskId, comment, callback) ;							
	}else{
		Ext.Msg.alert("提示",respActArray.msg) ;
		return false ;
	}
}

/**
 * 驳回处理
 * @param {} taskId
 * @param {} comment
 * @param {} callback
 * @return {Boolean}
 */
function doReject(taskId, comment, callback){
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
		url 	: contextPath + '/workflowUtilAction.do?method=rejectProcess',
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
				window.parent.close() ;
				// 执行回调函数
				try{
					callback() ;
				}catch(e){
				}
			},this) ;
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});	
}

/**
 * 关闭抄送待办
 * @param {} contextPath
 * @param {} taskId
 * @param {} callback
 */
function closeCopyTo(taskId, callback){
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
		url 	: contextPath + '/workflowUtilAction.do?method=closeCopyToTask',
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
				window.parent.close() ;
				// 执行回调函数
				try{
					callback() ;
				}catch(e){
				}
			},this) ;
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});	
}

/**
 * 完成待办
 * @param {} taskId
 * @param {} lineCode
 * @param {} comment
 * @param {} callback
 */
function completeTask(taskId, lineCode, comment, callback){
	if(comment && comment!=''){
		comment = encodeURI(comment);
	}else{
		comment = '';
	}
	
	Ext.Msg.wait('正在完成待办....');
	var url = contextPath + "/workflowUtilAction.do?method=completeWorkItem";
	var params ={'taskId':taskId,'lineCode':lineCode,'comment':comment};
	
	sendAjaxRequest(url,params,function(returnJson){
		if(returnJson.flag == 0){
			var str = {flag:0,taskId:taskId};
			Ext.Msg.alert('提示','待办处理成功!',function(){
				if(callback){
					callback();
				}
			});
		}else if(returnJson.flag == 1){
			var str = {flag:1,msg:returnJson.msg};
			Ext.Msg.alert('提示','待办处理失败,失败原因:'+returnJson.msg,function(){
				if(callback){
					callback();
				}
			});
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
				listeners:{
					'rowdblclick':choose
				}
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
				buttons:[{
		        	text:'确定',handler:choose
		         },{
		        	 text:'取消',handler:function(){
		        		 t_window.close(); 
		        	 }
		         }]
			});
			Ext.Msg.hide();
			t_window.show();
			// 选择第一条记录
			selModel.select(ds.first()) ;
			
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
							var subParams = params;
							if(!subParams){subParams = {}};
							var url = contextPath + "/workflowUtilAction.do?method=completeWorkItem";
							subParams.approvers =userIds;
							sendAjaxRequest(url,subParams,function(returnJson){
								if(returnJson.flag == 0){
									var str = {flag:0,taskId:taskId};
									Ext.Msg.alert('提示','待办处理成功',function(){
										if(callback){
											callback();
										}
									});
									
								}else if(returnJson.flag == 1){
									var str = {flag:1,msg:returnJson.msg};
									Ext.Msg.alert('提示','待办处理失败,失败原因:'+returnJson.msg,function(){
										if(callback){
											callback();
										}
									});
								}
							});
						}
					});
					
				}else{
					Ext.Msg.alert('提示','请先选择审批人');
				}
			}
		}
	});
}

/**
 * 征询处理
 * @param taskId
 * @param userId
 * @param comment
 * @param callback
 * @returns {Boolean}
 */
function complateConsult(taskId, userId, comment, callback){
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
		url 	: contextPath + '/workflowUtilAction.do?method=doConsult',
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
				window.parent.close() ;
				// 执行回调函数
				try{
					callback();
				}catch(e){
				}
			},this) ;			
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});	
}

/**
 * 委派处理
 * @param taskId
 * @param userId
 * @param comment
 * @param callback
 * @returns {Boolean}
 */
function complateDelegate(taskId, userId, comment, callback){
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
		url 	: contextPath + '/workflowUtilAction.do?method=doDelegate',
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
				window.parent.close() ;
				// 执行回调函数
				try{
					callback() ;
				}catch(e){
				}
			},this) ;			
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});	
}

/**
 * 回退处理
 * @param {} taskId
 * @param {} comment
 * @param {} backToActivityId
 * @param {} callback
 * @return {Boolean}
 */
function complateBack(taskId, comment, backToActivityId, callback){
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
		url 	: contextPath + '/workflowUtilAction.do?method=doBack',
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
				window.parent.close() ;
				// 执行回调函数
				try{
					callback() ;
				}catch(e){
				}
			},this) ;
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});		
}

/**
 * 根据任务id获取按钮
 * @param taskId
 * @returns {Array}
 */
function getButtonsByTaskId(taskId){
	var respArray = [] ;
	Ext.Ajax.request({
		url 		: contextPath+'/workflowUtilAction.do?method=getButtonsByTaskId',
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
}

/**
 * 选择征询人或委派人
 */
function chooseAllUsers(taskId, buttonCode, comment, callback){
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
			url		: 	contextPath + '/workflowUtilAction.do?method=getUsersForConsultOrDelegate4Ext',
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
	 				complateConsult(taskId, userId, comment, callback) ;
	 			}else if(buttonCode == 'btnDelegate'){ // 委派
	 				complateDelegate(taskId, userId, comment, callback) ;
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
}

/**
 * 选择流程回退至节点信息
 * @param records
 * @param taskId
 * @param comment
 * @param callback
 * @returns {Boolean}
 */
function chooseBackActivity(records, taskId, comment, callback){
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
	 			complateBack(taskId, comment, backToActivityId, callback) ;	 			
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
}

/**
 * 发送同步请求
 * @param url
 * @param taskId
 * @returns {Array}
 */
function getGlobalData(url,taskId){
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
}

/**
 * 根据任务id创建按钮
 * @param taskId
 * @param textArea 意见组件
 * @param insCode
 * @param bizId
 */
function createButtonsByTaskId(taskId, textArea, insCode, bizId){
	var respButtonArray = getButtonsByTaskId(taskId) ;
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
		
		if(disable=="N"){	// 如果disable属性为 "Y"时, 则不显示按钮
			
			// 定义按钮对象
			var btn = new Ext.Button({
				text	: 	name
			});	
			
			// 根据按钮编码分配按钮处理事件
			if(code == WorkFlowConstants.TASK_BTN_CANCEL){	// 撤回流程
				btn.setHandler(function(){
					Ext.MessageBox.confirm('提示','您确定要撤回流程吗?',function(opt){
						if(opt == 'yes'){
							// 执行前置函数
							var json = beforeHandlerEvent(WorkFlowConstants.TASK_BTN_CANCEL, insCode, bizId) ;
							
							if(json == null){// 不存在前置函数
								// 执行流程撤回
								doCancel(taskId, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CANCEL, insCode, bizId)) ;	
								
							}else{ // 存在前置函数
								var response = Ext.JSON.decode(json);
								
								if(response.flag == 0){	// 执行成功
									// 执行流程撤回
									doCancel(taskId, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CANCEL, insCode, bizId)) ;		
									
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
				
			}else if(code == WorkFlowConstants.TASK_BTN_CONSULT){ // 征询
				btn.setHandler(function(){
					// 执行前置函数
					var json = beforeHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT, insCode, bizId) ;
					
					var comment = textArea.getValue(); 
					
					if(json == null){// 不存在前置函数
						chooseAllUsers(taskId, WorkFlowConstants.TASK_BTN_CONSULT, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT, insCode, bizId)) ;
						
					}else{ // 存在前置函数
						var response = Ext.JSON.decode(json);
						
						if(response.flag == 0){	// 执行成功
							chooseAllUsers(taskId, WorkFlowConstants.TASK_BTN_CONSULT, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT, insCode, bizId)) ;
							
						}else{
							Ext.Msg.alert("执行失败","原因："+response.msg) ;
							return false; 
						}	
					}						
				});
				
			}else if(code == WorkFlowConstants.TASK_BTN_CONSULT_CLOSE){ // 征询反馈
				btn.setHandler(function(){
					// 审批意见
					var comment = textArea.getValue();
					
					// 执行前置函数
					var json = beforeHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT_CLOSE, insCode, bizId) ;
					
					if(json == null){// 不存在前置函数
						closeConsult(taskId, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT_CLOSE, insCode, bizId)) ;							
						
					}else{ // 存在前置函数
						var response = Ext.JSON.decode(json);
						
						if(response.flag == 0){	// 执行成功
							closeConsult(taskId, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT_CLOSE, insCode, bizId)) ;	
							
						}else{
							Ext.Msg.alert("执行失败","原因："+response.msg) ;
							return false; 
						}	
					}						
				});
				
			}else if(code == WorkFlowConstants.TASK_BTN_CONSULT_REVOKE){ // 撤销征询
				btn.setHandler(function(){
					var comment = textArea.getValue(); 
					
					// 执行前置函数
					var json = beforeHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT_REVOKE, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT_REVOKE, insCode, bizId)) ;
					
					if(json == null){// 不存在前置函数
						revokeConsult(taskId, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT_REVOKE, insCode, bizId)) ;
						
					}else{ // 存在前置函数
						var response = Ext.JSON.decode(json);
						
						if(response.flag == 0){	// 执行成功
							revokeConsult(taskId, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_CONSULT_REVOKE, insCode, bizId)) ;
							
						}else{
							Ext.Msg.alert("执行失败","原因："+response.msg) ;
							return false; 
						}	
					}						
				});	
				
			}else if(code == WorkFlowConstants.TASK_BTN_DELEGATE){ // 委派处理
				btn.setHandler(function(){
					// 执行前置函数
					var json = beforeHandlerEvent(WorkFlowConstants.TASK_BTN_DELEGATE, insCode, bizId) ;
					
					var comment = textArea.getValue();
					
					if(json == null){// 不存在前置函数
						chooseAllUsers(taskId, WorkFlowConstants.TASK_BTN_DELEGATE, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_DELEGATE, insCode, bizId)) ;
						
					}else{ // 存在前置函数
						var response = Ext.JSON.decode(json);
						
						if(response.flag == 0){	// 执行成功
							chooseAllUsers(taskId, WorkFlowConstants.TASK_BTN_DELEGATE, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_DELEGATE, insCode, bizId)) ;
							
						}else{
							Ext.Msg.alert("执行失败","原因："+response.msg) ;
							return false; 
						}	
					}						
				});
				
			}else if(code == WorkFlowConstants.TASK_BTN_BACK){ // 回退流程
				btn.setHandler(function(){
					// 执行前置函数
					var json = beforeHandlerEvent(WorkFlowConstants.TASK_BTN_BACK, insCode, bizId) ;
					
					if(json == null){// 不存在前置函数
						// 取得回退节点信息
						var respActArray = getGlobalData(contextPath+'/workflowUtilAction.do?method=getBackActivityList',taskId) ;
						if(respActArray.flag == 0){
							var acts = respActArray.data
							// 取得回退意见
							var comment = textArea.getValue();
							// 执行回退处理
							chooseBackActivity(acts, taskId, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_BACK, insCode, bizId)) ;							
						}else{
							Ext.Msg.alert("提示",respActArray.msg) ;
							return false ;
						}							
						
					}else{ // 存在前置函数
						var response = Ext.JSON.decode(json);
						
						if(response.flag == 0){	// 执行成功
							// 取得回退节点信息
							var respActArray = getGlobalData(contextPath+'/workflowUtilAction.do?method=getBackActivityList',taskId) ;
							if(respActArray.flag == 0){
								var acts = respActArray.data
								// 取得回退意见
								var comment = textArea.getValue();
								// 执行回退处理
								chooseBackActivity(acts, taskId, comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_BACK, insCode, bizId)) ;							
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
				
			}else if(code == WorkFlowConstants.TASK_BTN_REJECT){ // 驳回流程
				btn.setHandler(function(){
					var comment = textArea.getValue(); 
					// 执行前置函数
					var json = beforeHandlerEvent(WorkFlowConstants.TASK_BTN_REJECT, insCode, bizId) ;
					
					if(json == null){// 不存在前置函数
						doReject(taskId,comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_REJECT, insCode, bizId)) ;
						
					}else{ // 存在前置函数
						var response = Ext.JSON.decode(json);
						
						if(response.flag == 0){	// 执行成功
							doReject(taskId,comment, afterHandlerEvent(WorkFlowConstants.TASK_BTN_REJECT, insCode, bizId)) ;
							
						}else{
							Ext.Msg.alert("执行失败","原因："+response.msg) ;
							return false; 
						}	
					}
				});	
				
			}else if(code == WorkFlowConstants.TASK_BTN_COPYTO){ // 关闭抄送待办
				btn.setHandler(function(){
					// 执行前置函数
					var json = beforeHandlerEvent(WorkFlowConstants.TASK_BTN_COPYTO, insCode, bizId) ;
					
					if(json == null){// 不存在前置函数
						closeCopyTo(taskId, afterHandlerEvent(WorkFlowConstants.TASK_BTN_COPYTO, insCode, bizId)) ;
						
					}else{ // 存在前置函数
						var response = Ext.JSON.decode(json);
						
						if(response.flag == 0){	// 执行成功
							closeCopyTo(taskId, afterHandlerEvent(WorkFlowConstants.TASK_BTN_COPYTO, insCode, bizId)) ;
							
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
						completeTask(taskId, lineCode, comment, afterHandlerEvent(lineCode, insCode, bizId)) ;	
						
					}else{ // 存在前置函数
						var response = Ext.JSON.decode(json);
						
						if(response.flag == 0){	// 执行成功
							completeTask(taskId, lineCode, comment, afterHandlerEvent(lineCode, insCode, bizId)) ;	
							
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
	
	return btnArray;
}

/**
 * 根据流程编码查找流程ID
 * @param processCode
 */
function getProcessIdByCode(processCode){
	var procId ;
	
	// 提交请求查找；流程ID
	Ext.Ajax.request({
		url 	: 	contextPath + '/workflowUtilAction.do?method=getProcIdByCode',
		params	: 	{'processCode'  : processCode},
		method 	: 	'post',
		timeout : 	3600000,
		async	:	false,
		success : 	function(response, options) {
			var response = Ext.JSON.decode(response.responseText);
			if(response.flag == "0"){
				procId = response.msg ;
			}else{
				Ext.Msg.alert("提示", response.msg);
			}
		},
		failure : function(reponse, options) {
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});	
	
	return procId ;
}
/**
 * 弹出报表导入管理页面
 * @params: config附件配置 json示例{userId:'',src_id:'',org_id:'',att_cat:'',bus_no:'',canUp:'',canDown:'',canDel:'',closeCallback:function(){}} 
 */
function showImportManager(userId, src_id, org_id, att_cat, bus_no, canUp, canDown, canDel, closeCallback){
	if(userId==null || userId==""){
		Ext.Msg.alert('提示','用户id不能为空!');
		return;
	}
	if(src_id==null || src_id==""){
		Ext.Msg.alert('提示','来源id不能为空!');
		return;
	}
	if(att_cat==null || att_cat==""){
		Ext.Msg.alert('提示','附件类型不能为空!');
		return;
	}
	
	if(canUp==null || canUp==""){
		canUp = 'Y';
	}
	
	if(canDown==null || canDown==""){
		canDown = 'N';
	}
	
	if(canDel==null || canDel==""){
		canDel = 'N';
	}
	
	var url = '';
	
	var url = contextPath + '/main?xwl=240I99RICSHI'
				+ '&userId=' + userId
		        + '&srcId=' + src_id
		        + '&orgId=' + org_id
		        + '&attCat=' + att_cat
		        + '&busNo=' + encodeURI(encodeURI(bus_no))
		        + '&canUp=' + canUp
		        + '&canDown=' + canDown
		        + '&canDel=' + canDel;
	
	
	
	var windowConfig = {title:'附件管理','url':url,'isMax':true,'closeCallback':closeCallback};
	showExtWindow(windowConfig);
}