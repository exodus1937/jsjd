<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isErrorPage="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>出错了!</title>
</head>
<body>
	出错了！<br>
	发生了以下错误:
	<font color=red>
		<%
			String message = request.getParameter("msg") ;
		out.print(message) ;
		%>
		
	</font>
</body>
</html>