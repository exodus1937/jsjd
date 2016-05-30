<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<param name="wmode" value="transparent" />
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
	
	<head>
		<title>流程绘制</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<style>
			body {
				margin: 0px;
				overflow: hidden
			}
		</style>
		<%@include file="/common/include/include4.inc"%>
		
		<script type="text/javascript" src="<%=request.getContextPath() %>/workflow/designer/js/swfobject.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath() %>/workflow/designer/js/handler_process.js"></script>
		<script type="text/javascript">
			// 流程测试
 			function testProcess(processId){
 				testProc('<%=request.getContextPath()%>', processId ) ;
 			}
			
			// 导入流程
			function impProcess(){
				impProc('<%=request.getContextPath()%>') ;
			}
			
			// 导出流程
			function expProcess(appId, entityId){
				expProc('<%=request.getContextPath()%>', appId, entityId) ;
			}
 	</script>
	</head>
	<body onload="">
		<div id="myContent" >
			<iframe src="<%=request.getContextPath()%>/workflow/designer/WFDesigner.swf" width="100%" height="100%" frameborder="0"></iframe>
		</div>
		
		<!-- 
		<div id="myContent" >
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
			var so = new SWFObject("WFDesigner.swf", "mymovie", "100%", "100%",  "7", "");
			so.addParam("wmode", "Opaque");
			so.addParam("allowfullscreen", "true");
			so.addVariable("proName", '<%=request.getContextPath()%>');
			so.write("myContent"); 
			 
		</script>
		 -->
	</body>
</html>
