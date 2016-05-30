 <%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.ResourceBundle" %>
<%@ page import="com.xzsoft.xip.platform.util.PlatformUtil" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="../newNav/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="../newNav/js/common.js"></script>
<script type="text/javascript" src="../newNav/js/cycle.js"></script>
<script type="text/javascript" src="../newNav/js/json_parse.js"></script>
<script type="text/javascript" src="../newNav/js/json_parse_state.js"></script>
<script type="text/javascript" src="../newNav/js/json2.js"></script>
<script type="text/javascript" src="../newNav/logic/go.js" ></script>
<script type="text/javascript"> $(window).load(function() { common.prototype.page.login.load(); }); </script>
<title>Insert title here</title>
</head>
<body>
 <% 
	  HashMap map=(HashMap)session.getAttribute("XzSessionVars");
	  String _userId=(String)map.get("userId");
	  String _userName=(String)map.get("userName");
	  String path=request.getContextPath();

	  
  %>
</body>
<div id="hitten"> 
	<input id="userId" type="hidden" value="<%=_userId%>"/>
	<input id="userName" type="hidden" value="<%=_userName%>"/>
	<input id="path" type="hidden" value="<%=path%>"/>
</div>
<script type="text/javascript">
</script>
</html>