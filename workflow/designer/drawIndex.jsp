<%@ page language="java" import="java.util.*,java.net.URLDecoder" pageEncoding="utf-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
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
 
  <body >
  <div align=center>
    <object id="presentation" width="100%" height="630px" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" align="middle">
     	<param name="allowScriptAccess" value="sameDomain" />
     	<param name="movie" value="WFDesigner.swf" />
     	<param name="quality" value="high" />
     	<param name="allowFullScreen" value="true" />
     	<param name="wmode" value="Opaque" />
     	<embed src="WFDesigner.swf" quality="high"  width="100%" height="100%" name="presentation" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" allowFullScreen="true" />
	 </object>
	 <!-- 
	  	<form name ="form1" id="form1" method="post" action="">  
	  	 <object id="presentation" width="100%" height="630px" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" align="middle">
	     	<param name="allowScriptAccess" value="sameDomain" />
	     	<param name="movie" value="WFDesigner.swf" />
	     	<param name="quality" value="high" />
	     	<param name="allowFullScreen" value="true" />
	     	<embed src="WFDesigner.swf" quality="high"  width="100%" height="100%" name="presentation" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" allowFullScreen="true" />
		 </object>
		</form>
	 -->
	</div>
  </body>
</html>
