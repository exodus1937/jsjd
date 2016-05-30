<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
%>
<html>
<head>
    <title>流程测试</title>
    <script src=  "/xip/webbuilder/controls/ext/ext-all.js" type="text/javascript" ></script>
    <script src=  "/xip/webbuilder/controls/ext/locale/ext-lang-zh_CN.js" type="text/javascript" ></script>
	<link href=   "/xip/webbuilder/controls/ext/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<%=request.getContextPath()%>/workflow/util/workflowUtil_ext4.js"></script>
</head>
<body>

  	<script>
  	var contextPath ='<%=contextPath%>'
  	 var workflowUtil = new workflowUtil(contextPath);
  		var _callback = function(e){
  			Ext.Msg.alert("callback:",e.flag +" "+e.instanceCode);
  		}
  		//workflowUtil.getProcessIdByEntityCode('xip_wf_weiting_test');
  		//var str = workflowUtil.startAndSubmitProcess('bee33bd3-3454-4df9-bcb8-76b7bcf6ebee',null,_callback);
  		//workflowUtil.submitInstance_ajax('20140821_98709960-b5eb-4c36-a44d-9bfc109864d6',null,_callback);
  		workflowUtil.startAndSubmitByEntityCode('xip_wf_weiting_test',null,_callback); 
  		/* Ext.Ajax.request({
		    url:   "/xip/workflowUtilAction.do?method=createInstanceByProcessId",
		    method: 'POST',
		    params:{processId:'8a71c09f-41c0-4a5a-bc01-182fff40ee6d'},
		    success: function ( result, request) {
		    	alert(result.responseText);
		    },
		    failure: function ( result, request) {
		    	Ext.Msg.alert('提示','请求提交失败，可能是网络或其他原因');
		    }
		}); */
  		
    </script>
</body>
</html>