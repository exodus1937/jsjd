<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="com.xzsoft.xip.wf.common.util.WorkFlowConstants" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String taskId = request.getParameter("taskId");
	String bizId = request.getParameter("bizId");
	String insCode = request.getParameter("insCode");
	String taskState = request.getParameter("taskState") ;
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<!-- 
		<meta http-equiv="X-UA-Compatible" content="IE=7" />
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
		 -->
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/workflow/task/css/contract.css" />
		
		<%@include file="/common/include/include4.inc"%>
		
		<title>待办处理</title>
		
		<script type="text/javascript" src="extGlobal.js"></script>
		<script type="text/javascript" src="extTaskMain.js"></script>
		<script type="text/javascript" src="extTaskHandler.js"></script>
		<script type="text/javascript">
		
			var consultCode = '<%=WorkFlowConstants.TASK_BTN_CONSULT%>'; 	// 征询
			var delegateCode = '<%=WorkFlowConstants.TASK_BTN_DELEGATE%>'; // 委派
			var goBackCode = '<%=WorkFlowConstants.TASK_BTN_BACK%>'; // 回退
			var consultCloseCode = '<%=WorkFlowConstants.TASK_BTN_CONSULT_CLOSE%>'; // 征询反馈
			var consultRevokeCode = '<%=WorkFlowConstants.TASK_BTN_CONSULT_REVOKE%>'; // 撤销征询
			var submitCode = '<%=WorkFlowConstants.TASK_BTN_SUBMIT%>'; // 提交流程
			var cancelCode = '<%=WorkFlowConstants.TASK_BTN_CANCEL%>'; // 撤销流程
			var copyToCode = '<%=WorkFlowConstants.TASK_BTN_COPYTO%>'; // 关闭抄送
			var rejectCode = '<%=WorkFlowConstants.TASK_BTN_REJECT%>'; // 驳回流程				
			
			init_page('<%=request.getContextPath()%>',
					'<%=taskId%>',
					'<%=bizId%>',
					'<%=insCode%>',
					'<%=taskState%>',
					submitCode,
					cancelCode,					
					consultCode,
					consultCloseCode,
					consultRevokeCode,
					delegateCode,
					goBackCode,
					copyToCode,
					rejectCode
				);
			
			 function reinitIframe(){
		    	 
			    	var iframe = document.getElementById("bizPanelFrame");
			    	try{
			    		var bHeight = iframe.contentWindow.document.body.scrollHeight;
			    		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
			    		var height = Math.max(bHeight, dHeight);
			    		iframe.height =  height;
			    	}catch (ex){}
			    }
			    	
			//iframe 加载完成
			var iframeLoaded = function () {
				var iframe = document.getElementById('bizPanelFrame');
			    if (iframe.src.length > 0) {
			        if (!iframe.readyState || iframe.readyState == "complete") {
			            //HideTopWaitPage();
			            
			        	reinitIframe();
			        }
			    }
			}
		</script>	
		
	</head>
	
	<body scrolling="auto" style="overflow:scroll;background-color: #dfe9f6">
		<br/>		
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr id="fd_buttons_id" style="display: ">
				<td width="100%">
					<fieldset class="fieldset_style" >
					  	<div id="buttonsIframe" style="width:95%; height:30px;margin:0 auto; border: none"></div>
					</fieldset>						
				</td>
			</tr>
			<tr id="fd_comment_id" name="fd_c_name" style="display: ">
				<td width="100%">
					<fieldset class="fieldset_style" >
					  	<legend>审批意见</legend>
					  	<div id="commentIframe" style="width:95%; height:60px;margin:0 auto; border: none"></div>
					</fieldset>						
				</td>
			</tr>
			<tr style="display: ">
				<td width="100%">
					<fieldset class="fieldset_style" >
					  	<legend>业务信息</legend>
					  	<div  style="width:95%; min-height:450px;margin:0 auto; border:0px;">
					  		<iframe  style="width:100%;min-height:450px;background-color: white;border:1;border-color:#99bce8" id="bizPanelFrame" onload="iframeLoaded(this)"></iframe>
					  	</div>
					</fieldset>	
				</td>
			</tr>				
			
		</table>		
		
	</body>
</html>