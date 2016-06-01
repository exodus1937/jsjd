/**
 * 获取当前工程根目录 
 */
var _getContextPath = function() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}; 

var contextPath = _getContextPath();

/**
 *  获取当前服务访问地址 , 例如 ：http://localhost:8080/xip2
 *  
 *	window.location.host; //返回url 的主机部分，例如：www.itokit.com
 *	window.location.hostname; //返回www.xxx.com
 *	window.location.href; //返回整个url字符串(在浏览器中就是完整的地址栏)，例如：www.xxx.com/index.php?class_id=3&id=2
 *	window.location.pathname; //返回/a/index.php或者/index.php
 *	window.location.protocol; //返回url 的协议部分，例如： http:，ftp:，maito:等等。
 *	window.location.port //url 的端口部分，如果采用默认的80端口，那么返回值并不是默认的80而是空字符
 * 
 */
var getPlatformPath = function() {
	var protocol = document.location.protocol ; 
	var addr = document.location.hostname ;
	var port = window.location.port ;
	
	var platformPath = protocol + "//" + addr + ":" + port + contextPath;
	
	return platformPath ;
}

// var platformPath = 'http://localhost:8080/xip2';
var platformPath = getPlatformPath() ;

var wsdlPath = platformPath + '/services/workflowWS?wsdl'; //如需引入此次js，请自行调整地址
var actionName = '/processWebServiceDemo.do'; //actionName 如需调整，请自行修改

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
	if(!params){
		params={'workflowWS':wsdlPath};
	}else{
		params.workflowWS = wsdlPath;
	};
	Ext.Ajax.request({
	    url:url,
	    timeout : 300000,
	    method: 'POST',
	    params:params,
	    success: function ( result, request) {
	    	if(callback){
	    		callback(Ext.decode(result.responseText));
	    	}
	    },
	    failure: function ( result, request) {
	    	Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
	    }
	});
};

/**
 * 根据实体编码创建流程实例
 * @param {} entityCode 实体编码
 * @param {} params 参数 json字符串
 * @param {} loginName 用户名
 * @param {} callback 回调函数
 * 正确 {flag:0,instanceCode:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'} 
 */
function createInstanceByEntityCode(entityCode,params,loginName,callback){
	getProcessIdByEntityCode(entityCode,params,loginName,function(obj){
		if(obj.flag !=0){
			if(callback){
				callback(obj);
			}
			Ext.Msg.alert('提示',obj.msg);
			return; 
		}
		var processId = obj.processId;
		createInstanceByProcessId(processId,loginName,callback);
	});
}

/**
 * 根据流程ID创建流程实例
 * @param processId 流程id
 * @param loginName 登录名
 * @param callback 回调函数  
 * 返回json对象
 * 正确 {flag:0,instanceCode:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}
 */
function createInstanceByProcessId(processId,loginName,callback){
	Ext.Msg.wait('根据流程Id创建流程实例....');
	var url = contextPath + actionName + "?method=createInstanceByProcessId";
	var params ={'processId':processId,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
}

/**
 * 根据流程Code创建流程实例
 * @param processCode 流程编码
 * @param loginName 登录名
 * @param callback 回调函数
 * 返回json对象  
 * 正确 {flag:0,instanceCode:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'} 
 */
function createInstanceByProcessCode(processCode,loginName,callback){
	Ext.Msg.wait('根据流程Code创建流程实例....');
	var url = contextPath + actionName + "?method=createInstanceByProcessCode";
	var params ={'processCode':processCode,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
}

/**
 * 根据实体编码和参数获取流程
 * @param entityCode  实体编码  
 * @param params  启动参数(json字符串)
 * @param loginName  登陆用户名
 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
 * 
 * 正确 {flag:0,processId:'xxx',processCode:'xxx',processName:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}
 */
function getProcessIdByEntityCode(entityCode,params,loginName,callback){
	Ext.Msg.wait("正在根据流程实体编码查询可执行流程....");
	var url = contextPath + actionName + "?method=getProcessIdByEntityCode";
	if(!params){
		params = {};
	}
	
	var json = {
		"entityCode" : entityCode,
		"entityAttJsonString" : params,
		"loginName":loginName,
		'workflowWS':wsdlPath
    };

    var jsonData = Ext.JSON.encode(json);
    Ext.Ajax.request({
    	url: url,
    	method:'POST',
    	sync:'',
    	scope:this,
    	timeout : 300000,
    	headers:{'Content-Type':'application/json'},
    	jsonData:json,
    	success: function(res, opts){
	    	Ext.Msg.hide();
	    	var returnJson = Ext.decode(res.responseText);
	    	

			if(returnJson.flag ==0){
				var str = {flag:0,processId:returnJson.processId,processCode:returnJson.processCode,processName:returnJson.processName};
				//Ext.Msg.alert('提示',"找到可执行流程【"+returnJson.processName+"】",function(){callback(str);});
				if(callback){
					callback(str);
				}
				return;
			}else if(returnJson.flag ==1){
				var str = {flag:1,msg:returnJson.msg};
				Ext.Msg.alert('提示',"寻找可执行流程失败："+returnJson.msg,function(){
					if(callback){
						callback(str);
					}
				});
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
								if(callback){
									callback(str);
								}
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
	
	/*params.entityCode = entityCode; 
	sendAjaxRequest(url,params,function(returnJson){
		if(returnJson.flag ==0){
			var str = {flag:0,processId:returnJson.processId,processCode:returnJson.processCode,processName:returnJson.processName};
			//Ext.Msg.alert('提示',"找到可执行流程【"+returnJson.processName+"】",function(){callback(str);});
			if(callback){
				callback(str);
			}
			return;
		}else if(returnJson.flag ==1){
			var str = {flag:1,msg:returnJson.msg};
			Ext.Msg.alert('提示',"寻找可执行流程失败："+returnJson.msg,function(){
				if(callback){
					callback(str);
				}
			});
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
							if(callback){
								callback(str);
							}
						}
					});
				}else{
					Ext.Msg.alert('提示','请先选中一条流程');
				}
			}
		}
		
	});*/
}

/**
 * 根据实例Code提交流程   
 * @param instanceCode
 * @param params  启动参数(json字符串)
 * @param loginName  用户名
 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象 
 * 正确 {flag:0,msg:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}   
 */
function submitInstance(instanceCode,params,loginName,callback){
	Ext.Msg.wait('流程实例提交中....');
	if(!params){params = {}};
	var url = contextPath + actionName + "?method=submitProcess";
	
	var json = {
		"instanceCode" : instanceCode,
		"entityAttJsonString" : params,
		"loginName":loginName,
		'workflowWS':wsdlPath
    };

    var jsonData = Ext.JSON.encode(json);
    Ext.Ajax.request({
    	url: url,
    	method:'POST',
    	sync:'',
    	scope:this,
    	timeout : 300000,
    	headers:{'Content-Type':'application/json'},
    	jsonData:json,
    	success: function(res, opts){
    		//var returnJson = Ext.util.JSON.decode(obj);
    		Ext.Msg.hide();
	    	var returnJson = Ext.decode(res.responseText);
	    	if(returnJson.flag == 0){
				var str = {flag:0,instanceCode:instanceCode};
				Ext.Msg.alert('提示','流程实例提交成功',function(){
					if(callback){
						callback(str);
					}
				});
			}else if(returnJson.flag == 1){
				var str = {flag:1,msg:returnJson.msg};
				Ext.Msg.alert('提示','流程实例提交失败,失败原因:'+returnJson.msg,function(){
					if(callback){
						callback(str);
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
						'rowdblclick':choose,
						'afterrender' : function(){
    		    			// 选中第一条记录
    		    			selModel.select(ds.first()) ;
    					}
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
								/**var subParams = params;
								if(!subParams){subParams = {}};
								subParams.instanceCode =instanceCode;
								subParams.userIds =userIds;
								sendAjaxRequest(url,subParams,function(returnJson){
									//var returnJson = Ext.util.JSON.decode(obj);
									if(returnJson.flag == 0){
										var str = {flag:0,instanceCode:instanceCode};
										Ext.Msg.alert('提示','流程实例提交成功',function(){
											if(callback){
												callback(str);
											}
										});
										
									}else if(returnJson.flag == 1){
										var str = {flag:1,msg:returnJson.msg};
										Ext.Msg.alert('提示','流程实例提交失败,失败原因:'+returnJson.msg,function(){
											if(callback){
												callback(str);
											}
										});
									}
								});**/
								
								var url = contextPath + actionName + "?method=submitProcess";
								var json = {
										"instanceCode":instanceCode,
										"entityAttJsonString":params,
										"loginName":loginName,
										'workflowWS':wsdlPath,
										"userIds":userIds
								    };
	    							
    							var jsonData = Ext.JSON.encode(json);
    							Ext.Ajax.request({
    						    	url: url,
    						    	method:'POST',
    						    	sync:'',
    						    	scope:this,
    						    	timeout : 300000,
    						    	headers:{'Content-Type':'application/json'},
    						    	jsonData:json,
    						    	success: function(res, opts){
    							    	var returnJson = Ext.decode(res.responseText);
    							    	if(returnJson.flag == 0){
        									var str = {flag:0,instanceCode:instanceCode};
        									//Ext.Msg.alert('提示','流程实例提交成功!',function(){callback(str);});
        									callback(str);
        									
        								}else if(returnJson.flag == 1){
        									var str = {flag:1,msg:returnJson.msg};
        									//Ext.Msg.alert('提示','流程实例提交失败,失败原因:'+returnJson.msg,function(){callback(str);});
        									callback(str);
        								}
    						    	},
    						    	failure: function(res, opts){
    						    		Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
    						    	}
    						    });
								
								//submitInstance(instanceCode,params,callback,userIds);
							}
						});
						
					}else{
						Ext.Msg.alert('提示','请先选择审批人');
					}
				}
			}
    	},
    	failure: function(res, opts){
    		Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
    	}
    });
	
	/*params.instanceCode =instanceCode;
	sendAjaxRequest(url,params,function(returnJson){
		//var returnJson = Ext.util.JSON.decode(obj);
		if(returnJson.flag == 0){
			var str = {flag:0,instanceCode:instanceCode};
			Ext.Msg.alert('提示','流程实例提交成功',function(){
				if(callback){
					callback(str);
				}
			});
		}else if(returnJson.flag == 1){
			var str = {flag:1,msg:returnJson.msg};
			Ext.Msg.alert('提示','流程实例提交失败,失败原因:'+returnJson.msg,function(){
				if(callback){
					callback(str);
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
							var subParams = params;
							if(!subParams){subParams = {}};
							var url = contextPath + actionName + "?method=submitProcess";
							subParams.instanceCode =instanceCode;
							subParams.userIds =userIds;
							sendAjaxRequest(url,subParams,function(returnJson){
								//var returnJson = Ext.util.JSON.decode(obj);
								if(returnJson.flag == 0){
									var str = {flag:0,instanceCode:instanceCode};
									Ext.Msg.alert('提示','流程实例提交成功',function(){
										if(callback){
											callback(str);
										}
									});
									
								}else if(returnJson.flag == 1){
									var str = {flag:1,msg:returnJson.msg};
									Ext.Msg.alert('提示','流程实例提交失败,失败原因:'+returnJson.msg,function(){
										if(callback){
											callback(str);
										}
									});
								}
							});
							//submitInstance(instanceCode,params,callback,userIds);
						}
					});
					
				}else{
					Ext.Msg.alert('提示','请先选择审批人');
				}
			}
		}
	});*/
}

/**
 * 按流程Id 启动并提交流程 
 * @param processId 流程id
 * @param params 传递参数 {loginName:'',create_user:'',inv_val:'',e_business_id:''}
 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
 * 
 * 正确 {flag:0,instanceId:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}
 */
function startAndSubmitProcess(processId,params,loginName,callback){
	//提交流程，创建流程实例
	createInstanceByProcessId(processId,loginName,function(obj){
		if(obj.flag !=0){
			if(callback){
				callback(obj);
			}
			return; 
		}
		var instanceCode = obj.instanceCode;
		submitInstance(instanceCode,params,loginName,callback);
	});
}

/**
 * 根据实例Code撤回流程实例
 * @param instanceCode
 * 正确 {flag:0,msg:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}   
 */
function revokeByInstanceCode(instanceCode,loginName,callback){
	Ext.Msg.wait('流程撤回中....');
	var url = contextPath + actionName + "?method=revokeByInsCode";
	var params ={'instanceCode':instanceCode,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
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
function restartInstance(instanceCode,processId,loginName,callback){
	Ext.Msg.wait('流程重启中....');
	var url = contextPath + actionName + "?method=restartInstance";
	var params ={'instanceCode':instanceCode,'processId':processId,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
}

/**
 * 根据实体编码和参数获取流程并提交流程 
 * @param entityCode 实体编码
 * @param params 参数 {loginName:'',create_user:'',inv_val:'',e_business_id:''} json字符串
 * @param callback  回调函数，将选择流程结果做为参数传递给回调函数，选择结果格式为json对象  
 * 
 * 正确 {flag:0,instanceId:'xxx'}";
 * 	  或者 
 * 错误{flag:1,msg:'xxx'}
 */
function startAndSubmitByEntityCode(entityCode,params,loginName,callback){
	//提交流程，创建流程实例
	getProcessIdByEntityCode(entityCode,params,loginName,function(obj){
		if(obj.flag !=0){
			if(callback){
				callback(obj);
			}
			return; 
		}
		var processId = obj.processId;
		startAndSubmitProcess(processId,params,loginName,callback);
	});
}

/**
 * 重启并提交
 */
function restartInstanceSubmit(instanceCode,processId,params,loginName,callback){
	restartInstance(instanceCode,processId,loginName,function(obj){
		if(obj.flag!=0){
			Ext.Msg.alert('提示',obj.msg,function(){
				if(callback){
					callback(obj);
				}
			});
			return;
		}
		//重启成功，并提交
		submitInstance(instanceCode,params,loginName,callback);
	});
}
/**
 * 终止流程 监控中来使用，给流程管理员来使用 。关闭待办，结束实例。
 * @param {} processId
 * @param {} loginName
 * @param {} callback
 */
function stopProcess(instanceId,loginName,callback){
	Ext.Msg.wait('正在终止流程....');
	var url = contextPath + actionName + "?method=stopProcess";
	var params ={'instanceId':instanceId,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
}

/**
 * 完成待办
 * @param {} taskId
 * @param {} lineCode
 * @param {} comment
 * @param {} approvers
 * @param {} loginName
 * @param {} callback
 */
function completeWorkItem(taskId,lineCode,comment,loginName,callback){
	if(comment && comment!=''){
		comment = encodeURI(comment);
	}else{
		comment = '';
	}
	
	Ext.Msg.wait('正在完成待办....');
	var url = contextPath + actionName + "?method=completeWorkItem";
	var params ={'taskId':taskId,'lineCode':lineCode,'comment':comment,'loginName':loginName};
	sendAjaxRequest(url,params,function(returnJson){
		//var returnJson = Ext.util.JSON.decode(obj);
		if(returnJson.flag == 0){
			var str = {flag:0,taskId:taskId};
			Ext.Msg.alert('提示','待办处理成功!',function(){
				if(callback){
					callback(str);
				}
			});
		}else if(returnJson.flag == 1){
			var str = {flag:1,msg:returnJson.msg};
			Ext.Msg.alert('提示','待办处理失败,失败原因:'+returnJson.msg,function(){
				if(callback){
					callback(str);
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
			
		 	var selUser = Ext.create('Ext.form.field.Text',{
		        width 			: 	300,
		        inputType 		: 	'text',
		        labelSeparator 	:	':',
		        fieldLabel		:	'姓名',
		        labelWidth		: 	50,
		        labelAlign		:	'right',
		        listeners 		: 	{
		        	'specialkey': function(field, e){
		        		if (e.getKey() == e.ENTER) {
		            		var value=  selUser.getValue();
		            		ds.filterBy(function(record,id){
		    	   	        	var text = record.get('empName');
		                    	return (text.indexOf(value)!=-1);
		    	   	    	});        			
		                }       		
		        	}
		        }		
			}) ;     
		 	
			var ttbar = Ext.create('Ext.toolbar.Toolbar', {items:[selUser]});				
			
			var grid = new Ext.grid.GridPanel({
				selModel: selModel,
				store	: ds,
				tbar	: ttbar ,
				columns	: [
				          	new Ext.grid.RowNumberer(),
						    {text:'ID',dataIndex:'userId',hidden:true},
						    {text:'用户名',dataIndex:'userName',width:100},
						    {text:'员工名',dataIndex:'empName',width:150},
						    {text:'组织',dataIndex:'orgName',width:450}
				         ],
				listeners:{
					'rowdblclick':choose,
					'afterrender' : function(){
		    			// 选中第一条记录
		    			selModel.select(ds.first()) ;
					}
				}
			});  
			var t_window = new Ext.Window({
				width		:	750,
				height		:	450,
				layout		:	'fit',
				items		:	[grid],
				modal		:	true,
				closeAction	:	'close',
				title		:	'请选择审批人',
				buttonAlign	:	'right',
				buttons:[
				         {
				        	text:'选择',handler:choose
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
							var subParams = params;
							if(!subParams){subParams = {}};
							var url = contextPath + actionName + "?method=completeWorkItem";
							subParams.approvers =userIds;
							sendAjaxRequest(url,subParams,function(returnJson){
								//var returnJson = Ext.util.JSON.decode(obj);
								if(returnJson.flag == 0){
									var str = {flag:0,taskId:taskId};
									Ext.Msg.alert('提示','待办处理成功',function(){
										if(callback){
											callback(str);
										}
									});
									
								}else if(returnJson.flag == 1){
									var str = {flag:1,msg:returnJson.msg};
									Ext.Msg.alert('提示','待办处理失败,失败原因:'+returnJson.msg,function(){
										if(callback){
											callback(str);
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
 * 征询
 * @param taskId
 * @param loginName
 * @param callback
 * @param comment
 * @param loginName
 */
function doConsult(taskId, loginName, callback, comment){
	var url = contextPath + actionName + "?method=getUsers";
	var params = {'taskId':taskId,'conditionStr':'','start':0,'limit':20,'loginName':loginName};
	Ext.Msg.wait('正在操作....');
	sendAjaxRequest(url,params,function(returnJson){
		
		if(returnJson.flag == 1){
			var str = {flag:1,msg:returnJson.msg};
			Ext.Msg.alert('提示','查询征询人出错,失败原因:'+returnJson.msg,function(){
				if(callback){
					callback(str);
				}
			});
		}else{
			var userArray = new Array();
			for(var i = 0;i<returnJson.data.length;i++){
				var record = returnJson.data[i];
				var row = {userId:record.userId, userName:record.userName, empName:record.empName, orgName:record.orgName};
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
			     pageSize : -1 
			    // autoLoad:true
			 });
			
			var multiselect = returnJson.multiselect;
			var selModel = Ext.create('Ext.selection.CheckboxModel',{
				showHeaderCheckbox: false,
				mode : 'SINGLE'	
			});
			
		 	var selUser = Ext.create('Ext.form.field.Text',{
		        width 			: 	300,
		        inputType 		: 	'text',
		        labelSeparator 	:	':',
		        fieldLabel		:	'姓名',
		        labelWidth		: 	50,
		        labelAlign		:	'right',
		        listeners 		: 	{
		        	'specialkey': function(field, e){
		        		if (e.getKey() == e.ENTER) {
		            		var value=  selUser.getValue();
		            		ds.filterBy(function(record,id){
		    	   	        	var text = record.get('empName');
		                    	return (text.indexOf(value)!=-1);
		    	   	    	});        			
		                }       		
		        	}
		        }		
			}) ;     
		 	
			var ttbar = Ext.create('Ext.toolbar.Toolbar', {items:[selUser]});			
			
			var grid = new Ext.grid.GridPanel({
				selModel: selModel,
				store	: ds, 
				tbar 	: ttbar ,
				columns	: [
				          	new Ext.grid.RowNumberer(),
						    {text:'ID',dataIndex:'userId',hidden:true},
						    {text:'用户名',dataIndex:'userName',width:100},
						    {text:'员工名',dataIndex:'empName',width:150},
						    {text:'组织',dataIndex:'orgName',width:400}
				         ],
				listeners:{
					'rowdblclick':choose,
					'afterrender' : function(){
		    			// 选中第一条记录
		    			selModel.select(ds.first()) ;
					}
				}
			});  
			var t_window = new Ext.Window({
				width		:	750,
				height		:	450,
				layout		:	'fit',
				items		:	[grid],
				buttonAlign	:	'center',
				modal		:	true,
				closeAction	:	'close',
				title		:	'请选择被征询人',
				buttonAlign	:	'right',
				buttons		:	[
				         {
				        	text:'选择',handler:choose
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
						userIds = record.get('userId');
						uesrNames = record.get('userName');
					}
					//userIds = userIds.substring(0,userIds.length-1);
					//uesrNames = uesrNames.substring(0,uesrNames.length-1);
					
					Ext.MessageBox.confirm("提示","选择征询人:【"+uesrNames+"】,确定继续吗？",function(e){
						if(e=="yes"){
							t_window.close();
							if(uesrNames && uesrNames!=''){
								uesrNames = encodeURI(uesrNames);
							}else{
								uesrNames = '';
							}
							var subParams = {'taskId':taskId,'loginName':loginName,'userName':uesrNames, 'comment':comment};
							var url = contextPath + actionName + "?method=doConsult";
							sendAjaxRequest(url,subParams,function(returnJson){
								if(returnJson.flag == 0){
									var str = {"flag":"0","msg":""};
									Ext.Msg.alert('提示','征询成功',function(){
										if(callback){
											callback(str);
										}
									});
									
								}else if(returnJson.flag == 1){
									var str = {"flag":"1","msg":returnJson.msg};
									Ext.Msg.alert('提示','征询失败: '+returnJson.msg,function(){
										if(callback){
											callback(str);
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
 * 委派
 * @param taskId
 * @param loginName
 * @param callback
 * @param comment
 * @param loginName
 */
function doDelegate(taskId, loginName, callback, comment){
	var url = contextPath + actionName + "?method=getUsers";
	var params = {'taskId':taskId,'conditionStr':'','start':0,'limit':20,'loginName':loginName};
	Ext.Msg.wait('正在操作....');
	sendAjaxRequest(url,params,function(returnJson){
		
		if(returnJson.flag == 1){
			var str = {flag:1,msg:returnJson.msg};
			Ext.Msg.alert('提示','查询征询人出错,失败原因:'+returnJson.msg,function(){
				if(callback){
					callback(str);
				}
			});
		}else{
			var userArray = new Array();
			for(var i = 0;i<returnJson.data.length;i++){
				var record = returnJson.data[i];
				var row = {userId:record.userId, userName:record.userName, empName:record.empName, orgName:record.orgName};
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
				showHeaderCheckbox: false,
				mode : 'SINGLE'	
			});
			
		 	var selUser = Ext.create('Ext.form.field.Text',{
		        width 			: 	300,
		        inputType 		: 	'text',
		        labelSeparator 	:	':',
		        fieldLabel		:	'姓名',
		        labelWidth		: 	50,
		        labelAlign		:	'right',
		        listeners 		: 	{
		        	'specialkey': function(field, e){
		        		if (e.getKey() == e.ENTER) {
		            		var value=  selUser.getValue();
		            		ds.filterBy(function(record,id){
		    	   	        	var text = record.get('empName');
		                    	return (text.indexOf(value)!=-1);
		    	   	    	});        			
		                }       		
		        	}
		        }		
			}) ;     
		 	
			var ttbar = Ext.create('Ext.toolbar.Toolbar', {items:[selUser]});				
			
			var grid = new Ext.grid.GridPanel({
				selModel: selModel,
				store	: ds, 
				tbar	: ttbar ,
				columns	: [
				          	new Ext.grid.RowNumberer(),
						    {text:'ID',dataIndex:'userId',hidden:true},
						    {text:'用户名',dataIndex:'userName',width:100},
						    {text:'员工名',dataIndex:'empName',width:150},
						    {text:'组织',dataIndex:'orgName',width:400}
				         ],
				listeners:{
					'rowdblclick':choose,
					'afterrender' : function(){
		    			// 选中第一条记录
		    			selModel.select(ds.first()) ;
					}
				}
			});  
			var t_window = new Ext.Window({
				width		:	750,
				height		:	450,
				layout		:	'fit',
				items		:	[grid],
				buttonAlign	:	'center',
				modal		:	true,
				closeAction	:	'close',
				title		:	'请选择委派人',
				buttonAlign	:	'right',
				buttons		:	[
				         {
				        	text:'选择',handler:choose
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
						userIds = record.get('userId');
						uesrNames = record.get('userName');
					}
					//userIds = userIds.substring(0,userIds.length-1);
					//uesrNames = uesrNames.substring(0,uesrNames.length-1);
					
					Ext.MessageBox.confirm("提示","选择委派人:【"+uesrNames+"】,确定继续吗？",function(e){
						if(e=="yes"){
							t_window.close();
							if(uesrNames && uesrNames!=''){
								uesrNames = encodeURI(uesrNames);
							}else{
								uesrNames = '';
							}
							var subParams = {'taskId':taskId, 'loginName':loginName, 'userName':uesrNames, 'comment':comment};
							var url = contextPath + actionName + "?method=doDelegate";
							sendAjaxRequest(url,subParams,function(returnJson){
								if(returnJson.flag == 0){
									var str = {"flag":"0","msg":"委派成功!"};
									Ext.Msg.alert('提示','委派成功',function(){
										if(callback){
											callback(str);
										}
									});
									
								}else if(returnJson.flag == 1){
									var str = {"flag":"1","msg":returnJson.msg};
									Ext.Msg.alert('提示','委派失败: '+returnJson.msg,function(){
										if(callback){
											callback(str);
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
 * 执行回退
 * @param {} taskId
 * @param {} backToActivityId
 * @param {} comment
 * @param {} loginName
 * @param {} callback
 */
function doBack(taskId,backToActivityId,comment,loginName,callback){
	if(comment && comment!=''){
		comment = encodeURI(comment);
	}else{
		comment = '';
	}
	
	var url = contextPath + actionName + "?method=getBackActivityList";
	var params = {'taskId':taskId,'loginName':loginName};
	
	Ext.Msg.wait('正在操作....');
	sendAjaxRequest(url,params,function(returnJson){
		
		if(returnJson.flag == 1){
			var str = {flag:1,msg:returnJson.msg};
			Ext.Msg.alert('提示','查询回退节点出错,失败原因:'+returnJson.msg,function(){
				if(callback){
					callback(str);
				}
			});
		}else{//需要选择审批人 
			var userArray = new Array();
			
			for(var i = 0;i<returnJson.data.length;i++){
				var record = returnJson.data[i];
				var row = {activityId:record.activityId,activityCode:record.activityCode,activityIdName:record.activityIdName};
				userArray[i] = row;
			};
			
			Ext.define('Users', {
			     extend: 'Ext.data.Model',
			     fields: [
			         {name: 'activityId', 	 	type: 'string'},
			         {name: 'activityCode',  	type: 'string'},
			         {name: 'activityIdName',   type: 'string'}
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
				mode : 'SINGLE'	
			});
			var grid = new Ext.grid.GridPanel({
				selModel: selModel,
				store: ds, 
				columns: [
				          	new Ext.grid.RowNumberer(),
						    {text:'id',dataIndex:'activityId',hidden:true},
						    {text:'节点编码',dataIndex:'activityCode',width:80},
						    {text:'节点名称',dataIndex:'activityIdName',width:100}
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
				title:'节点列表',
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
					var activityId = '';
					var activityIdName = '';
					for(var i=0;i<records.length;i++){
						var record = records[i];
						activityId = record.get('activityId');
						activityIdName = record.get('activityIdName');
					}
					
					//activityId = activityId.substring(0,activityId.length-1);
					//activityIdName = activityIdName.substring(0,activityIdName.length-1);
					
					Ext.MessageBox.confirm("确认节点","选择节点:【"+activityIdName+"】,确定继续吗？",function(e){
						if(e=="yes"){
							t_window.close();
							var subParams = {'taskId':taskId,'backToActivityId':backToActivityId,'comment':comment,'loginName':loginName};
							var url = contextPath + actionName + "?method=doBack";
							sendAjaxRequest(url,subParams,function(returnJson){
								//var returnJson = Ext.util.JSON.decode(obj);
								if(returnJson.flag == 0){
									var str = {flag:0,taskId:taskId};
									Ext.Msg.alert('提示','退回成功',function(){
										if(callback){
											callback(str);
										}
									});
									
								}else if(returnJson.flag == 1){
									var str = {flag:1,msg:returnJson.msg};
									Ext.Msg.alert('提示','退回失败,失败原因:'+returnJson.msg,function(){
										if(callback){
											callback(str);
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
 * 执行退回
 * @param {} taskId
 * @param {} loginName
 * @param {} callback
 */
/*function getBackActivityList(taskId,loginName,callback){
	Ext.Msg.wait('根据流程Id创建流程实例....');
	var url = contextPath + actionName + "?method=getBackActivityList";
	var params ={'taskId':taskId,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
}*/

/**
 * 征询反馈处理
 * @param {} taskId
 * @param {} comment
 * @param {} loginName
 * @param {} callback
 */
function closeConsultTask(taskId,comment,loginName,callback){
	if(comment && comment!=''){
		comment = encodeURI(comment);
	}else{
		comment = '';
	}
	
	Ext.Msg.wait('正在执行征询反馈....');
	var url = contextPath + actionName + "?method=closeConsultTask";
	var params ={'taskId':taskId,'comment':comment,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
	Ext.Msg.hide();
}

/**
 * 撤销征询处理
 * @param {} taskId
 * @param {} comment
 * @param {} loginName
 * @param {} callback
 */
function revokeConsultTask(taskId,comment,loginName,callback){
	if(comment && comment!=''){
		comment = encodeURI(comment);
	}else{
		comment = '';
	}
	
	Ext.Msg.wait('正在撤销征询....');
	var url = contextPath + actionName + "?method=revokeConsultTask";
	var params ={'taskId':taskId,'comment':comment,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
	Ext.Msg.hide();
}

/**
 * 驳回流程
 * @param {} taskId
 * @param {} approverComment
 * @param {} loginName
 * @param {} callback
 */
function doRejectProcess(taskId,approverComment,loginName,callback){
	if(approverComment && approverComment!=''){
		approverComment = encodeURI(approverComment);
	}else{
		approverComment = '';
	}
	Ext.Msg.wait('正在驳回流程....');
	var url = contextPath + actionName + "?method=doRejectProcess";
	var params ={'taskId':taskId,'approverComment':approverComment,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
	Ext.Msg.hide();
}

/**
 * 关闭抄送节点
 * @param {} taskId
 * @param {} loginName
 * @param {} callback
 */
function closeCopyToTask(taskId,loginName,callback){
	Ext.Msg.wait('正在关闭抄送节点....');
	var url = contextPath + actionName + "?method=closeCopyToTask";
	var params ={'taskId':taskId,'loginName':loginName};
	sendAjaxRequest(url,params,callback);
	Ext.Msg.hide();
}

/**
 * 弹出流程监控页面
 * @param {} insCode 实例编码
 */
function showMonitorPage(insCode,callback){
	if(insCode==null || insCode=='undefined' || insCode==''){
		Ext.Msg.alert('提示','请指定实例编码!');
		return;
	}	
	
	var winId = 'extWin' + new Date().getTime();
	
	var url = platformPath+"/workflow/monitor/extMonitorFrame.jsp?insCode="+insCode+"&extWinId="+winId;
	
	var extWindow = new Ext.Window({
		id:winId,
	    title: '流程监控',
	    height: 500,
	    width: 770,
	    layout: 'fit',
	    modal: true,
		resizable: false,
		maximizable: true,
		html: '<iframe id=\'extWindowIframe\' width=\'100%\' height=\'100%\' frameborder=0 src="' + url + '"></iframe>',
		listeners: {
			show: function(win) {},
			close: function() {
				if (callback) {
					callback();
				}
			}
		}
	});
	
	extWindow.show();
	extWindow.maximize();
}

/**
 * 根据流程编码查找流程ID
 * @param processCode
 */
function getProcIdByCode(processCode){
	Ext.Msg.wait('正在查找流程ID....');
	var url = contextPath + actionName + "?method=getProcIdByCode";
	var params ={'processCode':processCode};
	// 回调函数
	var callback = function(resp){
		if(resp.flag == "0"){
			return resp.msg ;
		}else{
			Ext.Msg.alert("提示",resp.msg) ;
		}
	}
	sendAjaxRequest(url,params,callback);
	Ext.Msg.hide();
}

