<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!-- 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
	<%
		// 变量ID类型 : task-待办ID, ins-实例ID
		String varType = request.getParameter("varType");
		// 实例编码  
		String varId = request.getParameter("varId");
		// 流程ID
		String proId = request.getParameter("processId") ;
	%>
	
	<head>
		<title>流程运行监控处理</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<!-- <meta http-equiv="X-UA-Compatible" content="IE=10" /> -->
		<style>
			body {
				margin: 0px;
				overflow: hidden
			}
		</style>
		<%-- 
		<script type="text/javascript" src="<%=request.getContextPath() %>/workflow/designer/js/swfobject.js"></script>
		 --%>
		<script type="text/javascript">
			function chkId(){
				if("<%=varId%>" == ""){
					alert("加载监控数据失败>>  传入待办ID或流程实例ID值为空, 请确认！") ;
					return false;
				}
			}
		</script>
	</head>
	
	<body onload="chkId()">
		<div id="myContent" >
		    <object id="presentation" width="100%" height="630px" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" align="middle">
		     	<param name="allowScriptAccess" value="sameDomain" />
		     	<!-- <param name="movie" value="ProcessMonitor.swf" /> -->
		     	<param name="quality" value="high" />
		     	<param name="allowFullScreen" value="true" />
		     	<param name="wmode" value="Opaque" />
		     	<embed src="<%=request.getContextPath() %>/workflow/designer/ProcessMonitorManager.swf?type=<%=varType %>&id=<%=varId %>&processId=<%=proId%>" quality="high"  width="100%" height="100%" name="presentation" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" allowFullScreen="true" />
			</object>			
<%-- 			
			<h1>
				Alternative content
			</h1>
			<p>
				<a href="http://www.adobe.com/go/getflashplayer"><img
						src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"
						alt="Get Adobe Flash player" />
				</a>
			</p>
		</div>
		<script type="text/javascript">
			var so = new SWFObject("../designer/ProcessMonitorManager.swf", "mymovie", "100%", "100%",  "7", "");
			so.addVariable("id","<%=varId%>");
			so.addVariable("type","<%=varType%>");
			so.addVariable("processId","<%=proId%>");
			
			so.addParam("wmode", "Opaque");
			
			so.write("myContent"); 
		</script>
 --%>		
	</body>
</html>