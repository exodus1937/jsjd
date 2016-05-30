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
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
	<meta charset="UTF-8"/>
<link rel="stylesheet" type="text/css" href="css/jzyxzt.css"/>
<script src="js/jquery.js"></script>
<script src="../groupIndex/js/index_params.js"></script>
       <script sype="text/javascript">
		        var userID='<%=_userId%>';
		        document.onreadystatechange=function(){
		        	if(document.readyState == "complete"){
		        		getTargetColumn('4','','1');
		        		getTargetColumnValues('4','','1');
		        		getTargetColumn1('4','','1');
		        		getTargetDl();
		        		//getTargetDl();
		        		
		        	}
		        };
		        function getDateStion(a,b,c){
		        	getTargetColumn(a,b,c);
	        		getTargetColumnValues(a,b,c);
	        		getTargetColumn1(a,b,c);
	        		getTargetDl();
		        }
        </script>
		<title>机组运行状态</title>
	</head>
	<body>
		<div class="bj2">
		
	    <div class="tt1">
	      	
		<div id="hd01"><span onclick="getDateStion('4','','1')">火电</span></div>
		<div id="fd01"><span onclick="getDateStion('4','','2')">风电</span></div>
		<div id="sd01"><span onclick="getDateStion('4','','3')">水电</span></div>
		<div id="gf01"><span onclick="getDateStion('4','','4')">光伏</span></div>
	      </div>
	      <div id="body_1">
	      	
	    
		<div class="h-1">
			<table  style="table-layout:fixed;width: 70%;" id="hdindexname" border="1px" rules=all>
			</table>
			
	    </div>
	    <table  style="table-layout:fixed;width: 70%;" id="hd" border="1px" rules=all>
		</table>
	      		
		  </div>
		  <!------------------------body_1结束---------------------->
		  
		  
		  <div id="body_2">
		  <div class="h-1">
			<table  style="table-layout:fixed;width: 70%;" id="fdindexname" border="1px" rules=all>
			</table>
			
	    </div>
	      	<table  style="table-layout:fixed;width: 70%;" id="fd" border="1px" rules=all>
				
		    </table>
	  

	      		
		  </div>
		  <!---------------------------------------body_2结束------------------------->
		  
		    <div id="body_3">
		    <div class="h-1">
			<table  style="table-layout:fixed;width: 70%;" id="sdindexname" border="1px" rules=all>
			</table>
			
	    </div>
	      	  <table  style="table-layout:fixed;width: 70%;" id="sd" border="1px" rules=all>
					
		      </table>
	      		
		  </div>
		  <!-------------------------------------body_3结束------------------------->
		  
		    <div id="body_4">
		    <div class="h-1">
			<table  style="table-layout:fixed;width: 70%;" id="gfindexname" border="1px" rules=all>
			</table>
	    </div>
	      	
	            <table  style="table-layout:fixed;width: 70%;" id="gf" border="1px" rules=all>
					
				</table>
		  </div>
		  <!----------------------------------body_4结束-------------------------------->
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		<!-----------------------------------------bottom------------------------>
			<div class="h-b">
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
		
		<!---------------------------------------电厂详情信息------------------------------>
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
		
		
	</body>
	<script type="text/javascript" >
		$(function(){
			$('#body_2,#body_3,#body_4').addClass('d_n_1');
			$('#hd01,#fd01,#sd01,#gf01').addClass('active01');
			$('#hd01').addClass('active02');
			$('#hd01,#fd01,#sd01,#gf01').click(function(){
				$(this).addClass('active02').siblings().removeClass('active02');
			})
			$('#hd01').click(function(){
				$('#body_2,#body_3,#body_4').addClass('d_n_1');
				$('#body_1').removeClass('d_n_1');
			})
				$('#fd01').click(function(){
				$('#body_1,#body_3,#body_4').addClass('d_n_1');
				$('#body_2').removeClass('d_n_1');
			})
					$('#sd01').click(function(){
				$('#body_1,#body_2,#body_4').addClass('d_n_1');
				$('#body_3').removeClass('d_n_1');
			})
						$('#gf01').click(function(){
				$('#body_1,#body_3,#body_2').addClass('d_n_1');
				$('#body_4').removeClass('d_n_1');
			})
			

		})
		
		
	</script>
</html>