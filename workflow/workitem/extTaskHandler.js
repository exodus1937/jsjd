
/**
 * 提交流程
 * @param {} contextPath
 * @param {} taskId
 * @param {} userIds
 * @param {} buttonCode
 * @param {} insCode
 * @param {} bizId
 */
function doSubmit(contextPath, taskId, userIds, buttonCode, insCode, bizId){
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
		url 	: contextPath + '/workItemAction.do?method=submitProcess',
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
					window.parent.close() ;
					// 执行回调函数
					afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;
				
			}else if(response.flag == '1'){
				// 提交失败
				Ext.Msg.alert("提示", response.msg);
				return false;
				
			}else{
				// 手动选人
				if(response.multiselect == 'Y'){ // 多选审批人
					chooseApprover(contextPath,response.data, false, taskId, null, buttonCode, insCode, bizId) ;
					
				}else{	// 单选审批人
					chooseApprover(contextPath,response.data, true, taskId, null, buttonCode, insCode, bizId) ;
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

/**
 * 撤回流程
 * @param {} contextPath
 * @param {} taskId
 * @param {} buttonCode
 * @param {} insCode
 * @param {} bizId
 */
function doCancel(contextPath, taskId, buttonCode, insCode, bizId){
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
		url 	: contextPath + '/workItemAction.do?method=revokeProcess',
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
				afterHandlerEvent(buttonCode, insCode, bizId) ;
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
 * 征询处理
 * @param contextPath
 * @param taskId
 * @param userId
 * @param buttonCode
 * @param insCode
 * @param bizId
 * @param comment
 * @returns {Boolean}
 */
function doConsult(contextPath, taskId, userId, buttonCode, insCode, bizId, comment){
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
		url 	: contextPath + '/workItemAction.do?method=doConsult',
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
				afterHandlerEvent(buttonCode, insCode, bizId) ;
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
 * 征询反馈
 * @param {} contextPath
 * @param {} taskId
 * @param {} comment
 * @param {} consultCloseCode
 * @param {} insCode
 * @param {} bizId
 * @return {Boolean}
 */
function closeConsult(contextPath, taskId,comment,buttonCode, insCode, bizId){
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
		url 	: contextPath + '/workItemAction.do?method=closeConsultTask',
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
				afterHandlerEvent(buttonCode, insCode, bizId) ;
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
 * @param {} contextPath
 * @param {} taskId
 * @param {} comment
 * @param {} buttonCode
 * @param {} insCode
 * @param {} bizId
 */ 
function revokeConsult(contextPath, taskId, comment, buttonCode, insCode, bizId){
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
		url 	: contextPath + '/workItemAction.do?method=revokeConsultTask',
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
				afterHandlerEvent(buttonCode, insCode, bizId) ;
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
 * @param contextPath
 * @param taskId
 * @param userId
 * @param buttonCode
 * @param insCode
 * @param bizId
 * @param comment
 * @returns {Boolean}
 */
function doDelegate(contextPath, taskId, userId, buttonCode, insCode, bizId, comment){
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
		url 	: contextPath + '/workItemAction.do?method=doDelegate',
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
				afterHandlerEvent(buttonCode, insCode, bizId) ;
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
 * @param {} contextPath
 * @param {} taskId
 * @param {} comment
 * @param {} backToActivityId
 * @param {} buttonCode
 * @param {} insCode
 * @param {} bizId
 * @return {Boolean}
 */
function doBack(contextPath, taskId, comment, backToActivityId, buttonCode, insCode, bizId){
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
		url 	: contextPath + '/workItemAction.do?method=doBack',
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
				afterHandlerEvent(buttonCode, insCode, bizId) ;
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
 * 驳回处理
 * @param {} contextPath
 * @param {} taskId
 * @param {} comment
 * @param {} buttonCode
 * @param {} insCode
 * @param {} bizId
 * @return {Boolean}
 */
function doReject(contextPath, taskId, comment, buttonCode, insCode, bizId){
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
		url 	: contextPath + '/workItemAction.do?method=rejectProcess',
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
				afterHandlerEvent(buttonCode, insCode, bizId) ;
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
 * @param {} buttonCode
 * @param {} insCode
 * @param {} bizId
 */
function closeCopyTo(contextPath, taskId, buttonCode, insCode, bizId){
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
		url 	: contextPath + '/workItemAction.do?method=closeCopyToTask',
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
				afterHandlerEvent(buttonCode, insCode, bizId) ;
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
 * @param {} contextPath
 * @param {} taskId
 * @param {} comment
 * @param {} userIds
 * @param {} buttonCode
 * @param {} insCode
 * @param {} bizId
 * @return {Boolean}
 */
function completeTask(contextPath, taskId, comment, userIds, buttonCode, insCode, bizId){
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
		url 	: contextPath + '/workItemAction.do?method=completeWorkItem',
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
					window.parent.close() ;
					// 执行回调函数
					afterHandlerEvent(buttonCode, insCode, bizId) ;
				},this) ;
				
			}else if(response.flag == '1'){	// 提交失败
				Ext.Msg.alert("提示", response.msg);
				return false;
				
			}else{	// 手动选人
				if(response.multiselect == 'Y'){ // 多选审批人
					chooseApprover(contextPath, response.data, false, taskId, comment, buttonCode, insCode, bizId) ;
					
				}else{	// 单选审批人
					chooseApprover(contextPath, response.data, true, taskId, comment, buttonCode, insCode, bizId) ;
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
