
/**
 * 提交单条待办
 * @param {} taskId
 * @param {} userIds
 * @param {} contextPath
 */
function doSingleSubmit(taskId, userIds, contextPath){
	// 提交请求
	Ext.Ajax.request({
		url 	: contextPath + '/workItemAction.do?method=submitProcess',
		params	: {
			'taskId'  : taskId,
			'userIds' : userIds
		},
		method 	: 'post',
		timeout : 3600000,
		async	: false,
		success : function(response, options) {
			var response = Ext.JSON.decode(response.responseText);
			if(response.flag == '0'){	// 提交成功
				
			}else if(response.flag == '1'){	// 提交失败
				
			}else{
				// 手动选人
			}				
		},
		failure : function(reponse, options) {
			var response = Ext.JSON.decode(response.responseText);
		}
	});			
}
/**
 * 批量提交流程
 * @param {} taskArray
 * @param {} userIds
 * @param {} buttonCode
 * @param {} contextPath
 */
function doSubmit(taskArray, userIds, buttonCode,contextPath){
	if(taskArray != null && taskArray.length){
		
		// 等待框
		var msg = Ext.MessageBox.show({
			title 	 : 	'请等待',
			msg 	 : 	'正在提交请求.......',
			width 	 : 	240,
			wait	 : 	true,
			progress : 	true,
			closable : 	false
		});
		
		// 循环提交流程
		for(var i=0; i<taskArray.length; i++){
			var taskId = taskArray[i] ;
			try{
				// 提交单条待办
				doSingleSubmit(taskId, userIds, contextPath) ;
				
			}catch(ex){
				continue ;
			}
		}
		
		msg.hide();
		
		// 关闭父窗口
		var batchWin = Ext.getCmp('batchWin') ;
		batchWin.destroy();
		
		Ext.Msg.alert("提示","待办处理完成!",function(){
			window.parent.location.reload();	
		},this) ;
	}
}



/**
 * 取消单条流程
 * @param {} taskId
 * @param {} contextPath
 */
function doSingleCancel(taskId,contextPath){
	// 提交请求
	Ext.Ajax.request({
		url 	: contextPath + '/workItemAction.do?method=revokeProcess',
		params	: {
			'taskId'  : taskId
		},
		method 	: 'post',
		timeout : 3600000,
		async	: false,
		success : function(response, options) {
			var response = Ext.JSON.decode(response.responseText);
		},
		failure : function(reponse, options) {
			var response = Ext.JSON.decode(response.responseText);
		}
	});		
}

/**
 * 批量撤回流程
 * @param {} taskArray
 * @param {} contextPath
 */
function doCancel(taskArray,contextPath){
	if(taskArray != null && taskArray.length){
		// 等待框
		var msg = Ext.MessageBox.show({
			title 	 : 	'请等待',
			msg 	 : 	'正在提交请求.......',
			width 	 : 	240,
			wait	 : 	true,
			progress : 	true,
			closable : 	false
		});	
		// 循环撤回流程
		for(var i=0; i<taskArray.length; i++){
			var taskId = taskArray[i] ;
			try{
				doSingleCancel(taskId,contextPath) ;
			}catch(ex){
				continue ;
			}
		}
		// 隐藏等待框
		msg.hide();
		
		// 关闭窗口
		var batchWin = Ext.getCmp('batchWin') ;
		batchWin.destroy();		
		
		Ext.Msg.alert("提示","待办处理完成!",function(){
		   window.parent.location.reload();				
		},this) ;	
	}
}



/**
 * 驳回单条待办处理
 * @param {} taskId
 * @param {} comment
 * @param {} contextPath
 */
function doSingleReject(taskId,comment,contextPath){
	if(comment == null || comment == "" || comment == "undefined"){
		Ext.Msg.alert("提示","请填写驳回意见!") ;
		return false ; 
	}	
	// 提交请求
	Ext.Ajax.request({
		url 	: contextPath + '/workItemAction.do?method=rejectProcess',
		params	: {
			'taskId' 	: 	taskId,
			'comment'	:	comment
		},
		method 	: 'post',
		timeout : 3600000,
		async	: false,
		success : function(response, options) {
			var response = Ext.JSON.decode(response.responseText);
		},
		failure : function(reponse, options) {
			var response = Ext.JSON.decode(response.responseText);
		}
	});		
}

/**
 * 驳回处理
 * @param {} taskId
 * @param {} comment
 * @param {} contextPath
 * @return {Boolean}
 */
function doReject(taskArray,comment,contextPath){
	// 审批意见
	if(comment == null || comment == "" || comment == "undefined"){
		Ext.Msg.alert("提示","请填写审批意见!") ;
		return false ; 
	}	
	
	if(taskArray != null && taskArray.length){
		// 等待框
		var msg = Ext.MessageBox.show({
			title 	 : 	'请等待',
			msg 	 : 	'正在提交请求.......',
			width 	 : 	240,
			wait	 : 	true,
			progress : 	true,
			closable : 	false
		});	
		
		// 循环驳回流程
		for(var i=0; i<taskArray.length; i++){
			var taskId = taskArray[i] ;
			try{
				doSingleReject(taskId,comment,contextPath) ;
			}catch(ex){
				continue ;
			}
		}
		// 隐藏等待框
		msg.hide();
		
		// 关闭窗口
		var batchWin = Ext.getCmp('batchWin') ;
		batchWin.destroy();				
		
		Ext.Msg.alert("提示","待办处理完成!",function(){
			window.parent.location.reload();	
		},this)	
	}
}


/**
 * 关闭单条抄送待办
 * @param contextPath
 * @param taskId
 * @param contextPath
 */
function closeSingleCopyTo(taskId, contextPath){
	// 提交请求
	Ext.Ajax.request({
		url 	: contextPath + '/workItemAction.do?method=closeCopyToTask',
		params	: {
			'taskId' : 	taskId
		},
		method 	: 'post',
		timeout : 3600000,
		async	: false,
		success : function(response, options) {
			var response = Ext.JSON.decode(response.responseText);
		},
		failure : function(reponse, options) {
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});	
}

/**
 * 关闭抄送待办
 * @param {} taskArray
 * @param {} contextPath
 */
function closeCopyTo(taskArray,contextPath){
	if(taskArray != null && taskArray.length){
		// 等待框
		var msg = Ext.MessageBox.show({
			title 	 : 	'请等待',
			msg 	 : 	'正在提交请求.......',
			width 	 : 	240,
			wait	 : 	true,
			progress : 	true,
			closable : 	false
		});	
		
		// 循环关闭抄送待办
		for(var i=0; i<taskArray.length; i++){
			var taskId = taskArray[i] ;
			try{
				closeSingleCopyTo(taskId, contextPath) ;
			}catch(ex){
				continue ;
			}
		}
		// 隐藏等待框
		msg.hide();
		
		// 关闭窗口
		var batchWin = Ext.getCmp('batchWin') ;
		batchWin.destroy();				
		
		Ext.Msg.alert("提示","待办处理完成!",function(){
			window.parent.location.reload();	
		},this)	
	}
}



/**
 * 完成单条待办处理
 * @param {} taskId
 * @param {} comment
 * @param {} userIds
 * @param {} lineCode
 * @param {} contextPath
 */
function completeSingleTask(taskId, comment, userIds, lineCode, contextPath){
	// 提交请求
	Ext.Ajax.request({
		url 	: contextPath + '/workItemAction.do?method=completeWorkItem',
		params	: {
			'taskId' 	: 	taskId,
			'comment'	:	comment,
			'userIds'	:	userIds,
			'lineCode'	:	lineCode
		},
		method 	: 'post',
		timeout : 3600000,
		async	: false,
		success : function(response, options) {
			var response = Ext.JSON.decode(response.responseText);
			if(response.flag == '0'){	// 提交成功
				
			}else if(response.flag == '1'){	// 提交失败
				
			}else{ // 手动选人
				
			}			
		},
		failure : function(reponse, options) {
			var response = Ext.JSON.decode(response.responseText);
			Ext.Msg.alert("提示", response.msg);
		}
	});		
}

/**
 * 完成待办
 * @param {} taskArray
 * @param {} comment
 * @param {} userIds
 * @param {} lineCode
 * @param {} contextPath
 * @return {Boolean}
 */
function completeTask(taskArray, comment, userIds, lineCode, contextPath){
	// 审批意见
	if(comment == null || comment == "" || comment == "undefined"){
		Ext.Msg.alert("提示","请填写审批意见!") ;
		return false ; 
	}	
	
	if(taskArray != null && taskArray.length){
		
		// 等待框
		var msg = Ext.MessageBox.show({
			title 	 : 	'请等待',
			msg 	 : 	'正在提交请求.......',
			width 	 : 	240,
			wait	 : 	true,
			progress : 	true,
			closable : 	false
		});			
		
		// 批量审批
		for(var i=0; i<taskArray.length; i++){
			var taskId = taskArray[i] ;
			// 提交请求
			try{
				completeSingleTask(taskId, comment, userIds, lineCode, contextPath) ;
			}catch(ex){
				continue ;
			}		
		}
		
		msg.hide() ;
		
		// 关闭窗口
		var batchWin = Ext.getCmp('batchWin') ;
		batchWin.destroy();			
		
		Ext.Msg.alert("提示","待办处理完成!",function(){
			window.parent.location.reload();	
		},this)			
	}
}