 <%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
<html>
 <% 
  HashMap map=(HashMap)session.getAttribute("XzSessionVars");
  String empname=(String)map.get("empName");
  String _userId=(String)map.get("userId");
  String path=request.getContextPath();
  System.out.println(path);
  %>
<head>
		<meta charset="utf-8" />
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<link type="text/css" rel="Stylesheet" href="css/main_style.css" />
        <script src="js/jquery.js" sype="text/javascript"></script>
        <script src="<%=request.getContextPath() %>/final/js/index_params.js" sype="text/javascript"></script>
       <script type="text/javascript">
       $(function(){
    	   var userID='<%=_userId%>';
    	   var _contextPath = getContextPath();
    	   $.ajax({
				  url:_contextPath+"/loginParamUtil.do?method=getIndexPage",
				  type:"POST",
				  async: false,//同步操作
				  data:{path:_contextPath,userID:userID},
				  contentType:"application/x-www-form-urlencoded; charset=utf-8",
				  dataType:"json",
				  success: function(data){
					url = data.url;
					//window.parent.document.getElementById("centerId").src = url;
					 //window.open(url ,"首页") ; //myWindow即为窗口的名称
					 location.href=url;
				  },
				  error: function (data) {
		           alert(data.msg);
		        }
		    })
       })
       
        function getPage(num){
        	var _contextPath = getContextPath();
 	        var url="";
 	        $.ajax({
 				  url:_contextPath+"/loginParamUtil.do?method=getPage",
 				  type:"POST",
 				  async: false,//同步操作
 				  data:{path:_contextPath,num:num},
 				  contentType:"application/x-www-form-urlencoded; charset=utf-8",
 				  dataType:"json",
 				  success: function(data){
 					url = data.url;
 					window.parent.document.getElementById("centerId").src = url;
 					 //window.open(url ,"wjdh") ; //myWindow即为窗口的名称
 				  },
 				  error: function (data) {
 		           alert(data.msg);
 		        }
 		    })
        }
        </script>
<title>top</title>
</head>
<body>

</body>
</html>