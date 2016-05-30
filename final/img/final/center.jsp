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
<html>
 <% 
  HashMap map=(HashMap)session.getAttribute("XzSessionVars");
  String _userId=(String)map.get("userId");
  String _userName=(String)map.get("userName");
  String path=request.getContextPath();
  %>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>京能集团实时技术监督管理系统</title>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<link type="text/css" rel="Stylesheet" href="css/css/main_style.css" />
		<link type="text/css" rel="Stylesheet" href="css/main_style.css" />
        <script src="js/jquery-1.9.1.js" sype="text/javascript"></script>
        <script src="<%=path %>/workflow/wbwf/wbwf.js" sype="text/javascript"></script>
        <script src="<%=path %>/webbuilder/controls/ext/ext-all.js" sype="text/javascript"></script>
        <script src="js/index_params.js" sype="text/javascript"></script>
        <script type="text/javascript">
			$(function(){
				$('#m_2_1').click(function(){
					$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
					$('#m_2_3').removeClass('d_p_n').siblings().addClass('d_p_n');
					$('#m_2_4').addClass('d_p_n');
					
					})
							$('#m_2_2').click(function(){
					$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
						$('#m_2_4').removeClass('d_p_n').siblings().addClass('d_p_n');
					
					})
			})	
        </script> 
        <script sype="text/javascript">
		        
		        
		        //getText();
		        var userID='<%=_userId%>';
		        document.onreadystatechange=function(){
		        	if(document.readyState == "complete"){
		        		getMyOrgsUser(userID,"<%=_userName %>");
		        		getOrgs();
		        		getDT();
		        		getWorksDate(userID);
		        		getWarning('0','16');
		        		getWarning('1','16');
		        		getManagement(userID);
		        		getMission(userID);
		        		getTargetDate("1",userID);
		        		getTargetDate("2",userID);
		        		getRanking(userID);
		        		  window.setInterval(
		        				function() 
		        				{ 
		        					getTargetDate("1",userID); 
		        				}, 10000); 
		        		window.setInterval(
		        				function() 
		        				{ 
		        					getTargetDate("2",userID); 
		        				}, 10000);  
		        		window.setInterval(getDT, 10000); 
				        //window.setInterval(getTargetDate("1",userID), 10000); 
				        //window.setInterval(getTargetDate("2",userID), 10000); 
		        	}
		        };
        </script>
<span id=localtime></span>
<style  type="text/css">
.m02-1-2 {
    color: rgb(80,155,238);
    font-weight: 100;
    background-image: url(img/m01-1.png);
    background-repeat: no-repeat;
    background-position: bottom center;
}

#data_two {
  
  background-image:none;
    
}
.m02-1 {
    background-image: url(img/xiantiaoa.png);

}
#warntable1{
text-align:center;
}
.data_four {
    background-image: url(img/xiantiaoa.png);
	background-position-y: 50px;
    background-position:  50px left;
	text-aligh:center;
}
.tdn2 {
    margin-right: 5%;

}
.btbj{

}
</style>
	</head>
	<body style="overflow-x:hidden;">
			<!--主要区域-->
			<div id="main" style="width:1280px;margin:0 auto;">
				<!--操作区域-->
				<div id="data_one" >
				   <div style="padding-top: 30px;padding-bottom:20px;width: 100%;text-align: center;font-size: 20px;"> <div id="orgName" style="display:none"></div></div>

					<div style="text-align: center;">
						<span id="time" style="font-size: 20px;"> 
						<script type="text/javascript"> 
						  function showLocale(objD)
						  {
							  var myDate = new Date();
							  	var month=myDate.getMonth()+1;
							  	if(month<10){
							  		month="0"+month;
							  	}
							  	var Day = myDate.getDate();
							  	if(Day<10){
							  		Day="0"+Day;
							  	}
							  	var hours=myDate.getHours();
							  	if(hours<10){
							  		hours="0"+hours;
							  	}
							  	var min=myDate.getMinutes();
							  	var ss=myDate.getSeconds();
							  	if(min<10){
							  		min="0"+min;
							  	}
							  	if(ss<10){
							  		ss="0"+ss;
							  	}
							  	var str=myDate.getFullYear()+"年"+month+"月"+Day+"日      "+hours+"时"+ min+"分"+ ss+"秒";

							  return(str);
						  }
						  function tick()
						  {
						  var today;
						  today = new Date();
						  document.getElementById("time").innerHTML = showLocale(today);
						  window.setTimeout("tick()", 1000);
						  }
						  tick();
						</script>
						</span>
					</div>
					<div id="dateState">
                       <div style="width: 100%;float: left;">
						<div id="tupian1" style="float: left;text-aligh:center">
							<div style="float:left;font-size: 18px;text-align:center;width:30%" id="ssfhname">
								实时<br/>负荷<br/>(MW)
							</div>
							<div class="songti" id="ssfhvalue" style="line-height:54px;font-size:34px;text-align: right;width:53%;margin:inherit">
									
							</div>
						<!--	<span style="line-height:40px;float:right;position:relative;top:34px">MW</span> -->
						</div>
						
						<div id="tupian2" style="float:right;">
							<div style="float:left;font-size: 18px;text-align:center;width:30%" id="fdlname">
								实时日<br/>发电量<br/>(万kWh)
							</div>
								<div class="songti" id="fdlvalue" style="line-height:54px;font-size:34px;text-align: right;width:53%;margin:inherit">
									 
							</div>
							 
						</div>
					</div>

					<div>
						<div id="tupian3" style="float: left;">
							<div style="float:left;font-size: 18px;text-align:center;padding-top:10px;width:30%" id="sspmname">
								对标<br/>排名
							</div>
	
							<div style="font-family: '宋体';line-height:54px;font-size:34px;text-align: right;float:left;width:55%;font-weight: bold;color: white;" id="sspmvalue">
								
							</div>
						</div>

						<div id="tupian4" style="float:right;">
							<div style="float:left;font-size: 18px;text-align:center;width:30%"  id="dcylname">
								厂用<br/>电率<br/>(%)
							</div>
							<div style="line-height:54px;font-size:34px;text-align: right;width:53%;margin:inherit" class="songti" id="dcylvalue">
								
							</div>
					<!--		<span style="line-height:40px;float:left;margin-left:5px;position:relative;top:34px">%</span> -->
						</div>
						       </div>
						 </div>
					<div id="zhibiao" style="float: left;">
						<h3><b style="font-family: '楷体';">快速导航</b></h3>
					</div>
					
	           
					<div id="daohang" style="color: #000000;border: 1px;  width: 570px;height:300px;margin-top:280px;background:#f9f9f9">
					</div>
					
					
				</div>

				<div id="data_two">

						<div class="m02-1">
							<div id="d_3_1">
								
							<div class="m02-1-1 m02-1-2" id="m_2_1"><span>运行机组报警</span></div>
							<div class="m02-1-1"id="m_2_2"><span>停机机组报警</span></div>
							</div>
                            <a id="a_5" href="javascript:void(0)" onclick="clickFunc('报警信息','23WPD5TO7GWR','<%=path %>/main?xwl=23WPD5TO7GWR')" style="float: right;margin-top:25px;margin-right: 50px;text-align: center;font-family: '楷体';">
							  更多
						    </a>
							 <div id="selectAge"></div>
						</div>
						
						<div>
						<!------------------------------------------------运行机组报警------------------->
						<div class="m02-2" id="m_2_3">
								<div id="warntable" class="" style="text-align:center"></div>
							</div>
						<!-------------------------停机机组报警------------------>
						<div class="m02-2 d_p_n" id="m_2_4">
							<div id="warntable1" class=""></div>
							
						</div>
                      </div>
					</div>
				<div id="data2">
			
				<div id="data_three">
					<div id="hhe">
						<h2 style="font-family: '楷体'">电厂指标</h2>
					</div>
					    <div style="width: 100%; float: right;" id="dczb">
						

						</div>
				

				</div>
				<div class="data_four">
					<div id="gongzuo">
						<h2 style="float: left; font-family: '楷体';">工作提醒</h2>

						<a id="a_5" href="javascript:void(0)" onclick="clickFunc('工作提醒','23Y06JRY2XC3','<%=path %>/main?xwl=23Y06JRY2XC3')" style="float: right;margin-top:25px;margin-right: 20px;text-align: center;font-family: '楷体';">
							更多
						</a>
					</div>

					<div style="float: left;">

						<div style="font-size: 20px;font-weight: bold;">
							<span style="margin-left: 2%;">
								序号
								</span>
							<span style="position:relative;left: 5%">
									消息描述
								</span>
							<span style="position:relative;left: 30%">
									提醒时间
								</span>
							<span style="position:relative;left: 35%">
									倒计时(天)
								</span>
								
						
						</div>
                        <div id="mission"></div>
						<!-- <table id="mission" style="border-width:0px 0px 0px 0px; table-layout:fixed;border-top: none;border-left: none;border-right: none;float: left;">

						</table> -->
					</div>
              </div>
	       <div id="data2">
				<div id="data_five">

					<div id="hhe5">
					
						<h2 style="float: left;">监督动态</h2>
						<a id="a_5" href="javascript:void(0)" onclick="clickFunc('监督动态','23WPD5TO7KQ1','<%=path %>/main?xwl=23WPD5TO7KQ1')" style="float: right;margin-top:25px;margin-right: 20px;text-align: center;">
							更多
						</a>
						<div style="list-style: none; float: left; width: 100%;padding-left:0px;font-size: 20px;font-weight: bold;">
							<span style="margin-left: 2%;background-image:none">
								序号
								</span>
							<span style="position:relative;left: 20%;background-image:none">
									描述
								</span>
							<span style="position:relative;left: 41%;background-image:none">
									发布单位
								</span>
							<span style="position:relative;left: 42%;background-image:none">
									发布时间
								</span>
								
						
						</div>

					</div>

					<div style="list-style: none; float: left; width: 100%;padding-left:0px;" id="jddt">

					</div>

				</div>

				<div id="data_six" style="float:right;">
					<div id="gongzuo">
						<h2 style="float: left;">监督工作</h2>

						<a id="a_5" href="javascript:void(0)" onclick="clickFunc('监督工作','23WPD5TO7KQ1','<%=path %>/main?xwl=23VKVPUL841Y')" style="float: right;margin-top:25px;margin-right: 20px;text-align: center;">
							更多
						</a>

					</div>

				<div style="float: left;width: 100%;font-family: '楷体';font-size: 20px;font-weight: bold;" >

						<div style="float: left; margin-left: 2%;">
							序号
						</div>
							<div style="float:left;margin-left: 20%">
								任务描述
								</div>
								<div style="float:left;margin-left: 25%">
								时间
								</div>
								<div style="float:left;margin-left: 10%">
							上报人
								</div> 

						</div>
						<div id="works"></div>

						<!-- <table id="works" style="border: 1px solid lightgrey; border-top: none;border-left: none;border-right: none;float: left;">

						</table> -->
					</div>

				</div>

  </div>
</body>
	
	
</html>