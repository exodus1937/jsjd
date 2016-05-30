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
  String path=request.getContextPath();
  System.out.println(path);
  %>
<head>
		<meta charset="utf-8" />
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<link type="text/css" rel="Stylesheet" href="css/main_style.css" />
        <script src="js/jquery-2.1.1.js" sype="text/javascript"></script>
        <script src="js/index_params.js" sype="text/javascript"></script>
       <script type="text/javascript">
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
<!--Logo区域-->
		<div  style="margin:0 auto;">
			<div id="header">
				<div style="padding-top: 10px;">
					<img src="img/logo_dianchang.png" width="60%" height="60%" align="center">
				</div>
				<div class="tuichu">
					<img src="img/yonghu.png" width=15px height=15px>&nbsp;<%=empname %>&#124;&nbsp;
					<a href="#" onclick="logout(); return false;">退出</a>
				</div>

			</div>
			<!--菜单区域-->
			<div id="menu" >
				<ul  style="list-style: none;width:100%;white-space:nowrap">
				
				        <li ><a style="font-family: '微软雅黑';color:white;" href="#" onclick="getPage(1)"><b>首页</b></a>
						</li>
						<li ><a style="font-family: '微软雅黑';color:white;" href="#" onclick="getPage(2)"><b>标准法则</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#" onclick="getPage(3)"><b>监督网络</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>技术监督</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>技术管理</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>综合查询</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>对标管理</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>生产报表</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>技术项目管理</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;white-space:nowrap" href="#"><b>综合管理</b></a>
						</li>
					
				</ul>
			</div>
</body>
</html>