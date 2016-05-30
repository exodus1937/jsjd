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
<sj:head locale="zh-CN" jqueryui="true"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <% 
  HashMap map=(HashMap)session.getAttribute("XzSessionVars");
  String _userId=(String)map.get("userId");
  String path=request.getContextPath();
  %>
<head>
  <script src="js/jquery.js"></script>
    <script src="../groupIndex/js/index_params.js"></script>
       <script sype="text/javascript">
		        var userID='<%=_userId%>';
		        document.onreadystatechange=function(){
		        	if(document.readyState == "complete"){
		        		getTargetColumn('5','','');
		        		getTargetColumnValues('5','','');
		        		getTargetColumn1('5','','');
		        		//getTargetDl();
		        	}
		        };
        </script>
		<meta charset="utf-8">
		<title>机组状态</title>
		<link rel="stylesheet" type="text/css" href="css/jzyxzt.css"/>
	</head>
	<body>
		<div class="bd_m">
	
		<div class="bd_1">
			<span>机组运行状态</span>
				<img src="img/x.png" class="x-01"/>
			
		</div>
	     <div class="zt_row1">
	     	
	     	<table  style="table-layout:fixed;width: 70%;" id="xiangxiname" border="1px" rules=all>
			</table>
	     	
	     </div>
	     <table  style="table-layout:fixed;width: 70%;" id="xiangxi" border="1px" rules=all>
		</table>
		</div>
		
		<!---------------------------底部------------------------>
		<div class="zt_bottom_1">
	       <div class="h7-1">
			<span>图例说明:</span>
			
		</div>
		<div class="h7-2">
				<img src="img/red1.png" class="red-02"/>
			<span>运行</span>
			
		</div>
			<div class="h7-3">
				<img src="img/green.png" class="green-02"/>
			
			<span>停机</span>
			
		</div>
		<div class="h7-4">
				<img src="img/yellow.png" class="yellow-02"/>
			<span>通讯中断</span>
		</div>
		</div>
		</div>
		
	</body>
</html>