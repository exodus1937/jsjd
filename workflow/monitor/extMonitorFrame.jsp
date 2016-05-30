<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String insCode = request.getParameter("insCode") ;
    String winId = request.getParameter("extWinId");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<%@include file="/common/include/include4.inc"%>
		<title>流程实例监控</title>
	</head>
	<body>
		<script type="text/javascript" src="extMonitorFrame.js"></script>
		<script type="text/javascript">
			init_page('<%=request.getContextPath()%>','<%=insCode%>','<%=winId%>');
		</script>	
	</body>
</html>