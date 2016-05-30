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
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <% 
  HashMap map=(HashMap)session.getAttribute("XzSessionVars");
  String empname=(String)map.get("empName");
  String path=request.getContextPath();
  System.out.println(path);
  %>
  
<html>
      
	<head>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<link type="text/css" rel="Stylesheet" href="css/main_style.css" />
        <script src="js/jquery-2.1.1.js" sype="text/javascript"></script>
        <script src="js/index_params.js" sype="text/javascript"></script>
	</head>
	<body>
				<!--页脚区域-->
				<div id="footer">
					<p> <a href="#">关于我们</a>&#124;&nbsp;<a href="#">联系我们</a>&#124;&nbsp;<a href="#">信息反馈</a>&#124;&nbsp;<a href="#">人才招聘</a>&#124;&nbsp;<a href="#">友情链接</a>&#124;&nbsp;<a href="#" onclick="open_wjdh(); return false;">后台</a>&nbsp;&nbsp;<a href="#">更多</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版权所有&nbsp;Copyright(c)2009-2015&nbsp;岱海电厂
						&nbsp;&nbsp;&nbsp;&nbsp;
					</p>
				</div>
	</body>
	
	 
	
	
</html>