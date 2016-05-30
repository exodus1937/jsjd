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
		<meta charset="utf-8" />
		<title>京能集团实时技术监督管理系统</title>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <link type="text/css" rel="Stylesheet" href="../final/css/main_style.css" />
        <script src="../final/js/jquery-2.1.1.js" sype="text/javascript"></script>
		<link type="text/css" rel="Stylesheet" href="css/main_style.css" />
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<script src="js/jquery.js"></script>
		<script src="../final/js/index_params.js"></script>
        <script sype="text/javascript">
		        //getText();
		        var userID='<%=_userId%>';
		        document.onreadystatechange=function(){
		        	if(document.readyState == "complete"){
		        		getOrgs();
		        		getWarning();
		        		getManagement();
		        	}
		        };
        </script>
		<style>
			body
			{
				font-family: "楷体";
			    margin: 0px auto;
			    list-style: none;
			    text-decoration: none;
			width: 1320px;
			}
			  	#menu a {
			  		text-decoration: none;
			  		border: none;
			  		outline:none; 
			  	}
			  	.btn{
			  		float: right;
			  	color: red;
			  	border:none;
			  	width: 90px;
			  	height:38px;
			  	background-color: white;
			  	text-decoration: none;
			  	outline: none;
			  		text-align: center;
			  		padding-bottom: 5px;
			  	}
		</style>
	</head>
	<body>
				<!--主要区域-->
				<div id="main" style="width:1280px;margin:0 auto;">
					<!--操作区域-->
					<div id="data_one">
						<div id="shijian">
						<span id="time" style="font-size: 21px;font-weight: bold;"> 
						<script type="text/javascript"> 
						  
						  function showLocale(objD)
						  {
						  	var myDate = new Date();
						  	var month=myDate.getMonth()+1;
						  	var str=myDate.getFullYear()+"年"+month+"月"+myDate.getDate()+"日      "+myDate.getHours()+"时"+ myDate.getMinutes()+"分"+ myDate.getSeconds()+"秒";

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

						<div style="width: 100%;float: left;">

							<div id="tupian1" style="float: left;">
								<div style="float:left;margin:9% 8%;font-size: 21px;">
									实时
									<br/>负荷
								</div>
								<div class="songti">
									2200
								</div>

								<div class="aril">
									WM
								</div>

							</div>

							<div id="tupian2" style="float:right;">
								<div style="float:left;margin:9% 5%;font-size: 21px;">
									实时日
									<br/>发电量
								</div>
								<div class="songti">
									2000
								</div>

								<div class="aril">
									kWh
								</div>
							</div>
						</div>

						<div id="zhibiao" style="float: left;">
							<h3><b style="font-family: '楷体';">快速导航</b></h3>
						</div>
	           
					<div id="daohang" style="color: #000000;border: 1px;  width: 570px;height:160px;background:#f9f9f9">
					</div>

					</div>

					<div id="data_two">
					
					<div class="m02-1">
							<div id="d_3_1">
								
							<div class="m02-1-1 m02-1-2" id="m_2_1"><span>运行机组报警</span></div>
							<div class="m02-1-1"id="m_2_2"><span>停机机组报警</span></div>
							</div>

							<select name="selectAge" id="selectAge" style="margin-top: 38px ;margin-right:20px;float:right;">
								<!-- <option value="1">全厂</option>
								<option value="2">公司</option>
								<option value="3">提示</option> -->
							</select>
						</div>
						<div>
							<div class="m02-2" id="m_2_3">
								<table  style="border-width:0px 0px 0px 0px; table-layout:fixed;border-top: none;border-left: none;border-right: none;float: left;width: 92%;" id="warntable" >
								</table>
							</div>
							<div class="m02-2 d_p_n" id="m_2_4">
							
							<div class="m02-2-1">
								<div style="float: left; margin-left: 72px;">
									测点名称
								</div>
								<div style="float:left;margin-left: 76px">
									报警级别
								</div>
								<div style="float:left;margin-left: 28px">
									报警值
								</div>
								<div style="float:left;margin-left: 21px">
									报警时间
								</div>
								<div style="float:left;margin-left: 15px">
									持续时间
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<div style="width: 190px;margin-left: 25px;">
									第二页
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>
								<div class="m02-2-2">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>

			<div class="m02-2-2 m02-2-bg">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>
								<div class="m02-2-2">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>

			<div class="m02-2-2 m02-2-bg">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>
								<div class="m02-2-2">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>

			<div class="m02-2-2 m02-2-bg">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>
								<div class="m02-2-2">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>

			<div class="m02-2-2 m02-2-bg">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>
								<div class="m02-2-2">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>

			<div class="m02-2-2 m02-2-bg">
								<div style="width: 190px;margin-left: 25px;">
									宁东电厂1号机凝结....
								</div>
								<div style="width: 115px;">
									集团
								</div>
								<div style="width: 82px;">
									32
								</div>
								<div style="width: 100px;">
									20:23:23
								</div>
								<div style="width: 100px;">
									1小时
								</div>

							</div>
						</div>
						</div>
					</div>
                   <div class="d-03">
                  	<div class="d-03-01" id="d_3_2">
                  		
                  			<div class="d-03-01-01 m02-1-2"id="con-1"><span>对标排名</span></div>
                  			<div class="d-03-01-02 " id="con-2"><span>可靠性</span></div>
                  			<div class="d-03-01-02 " id="con-3"><span>检修</span></div>
                  			<div class="d-03-01-02 " id="con-4"><span>生产</span></div>
                  			<div class="d-03-01-01 " id="con-5"><span>技术指标</span></div>
                  			<div class="d-03-01-03 " id="con-6"><span>特殊专项工作</span></div>
                  		    <div class="d-03-01-03 " id="con-7"><span>技术监督工作</span></div>
						
                  			
                  	
                  	</div>
                  	<!---------------------------内容---------------------------->
                  	<div id="content_3">
                  		
               <!----------------------------------------------对标排名---------------------------->
                  	<div id='con_1'>
                  	
                  	<div class="d-03-02">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan1.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							内蒙古岱海发电有限责任公司
								</div>
									<div class="d3-s">
							100
								</div>
									<div class="d3-1 d3-bg1">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<img src="img/yuan2.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							山西漳山发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan3.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							北京京能热电股份有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									4
								</div>
								
								<div class="d3-t">
							内蒙古京隆发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									5
								</div>
								
								<div class="d3-t">
							宁夏京能宁东发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									6
								</div>
								
								<div class="d3-t">
							内蒙古京能康巴什热电有限公司
								</div>
									<div class="d3-s">
							95
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									7
								</div>
								
								<div class="d3-t">
							内蒙古华宁热电有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									8
								</div>
								
								<div class="d3-t">
							京能(赤峰)能源发展有限公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  	
                  	<!-----------------右侧开始------------------>
                  	
                  	
                  		<div class="d-03-03">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									9
								</div>
								
								<div class="d3-t">
							内蒙古京泰发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									10
								</div>
								
								<div class="d3-t">
							山西京玉发电有限责任公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
							<div style="float: left; margin-left: 20px;width: 26px;">
									11
								</div>
								
								<div class="d3-t">
							北京京丰燃气热电股份有限公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									12
								</div>
								
								<div class="d3-t">
							北京太阳宫燃气热电有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									13
								</div>
								
								<div class="d3-t">
							北京京桥热电有限责任公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									14
								</div>
								
								<div class="d3-t">
							深州市钰湖电力有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									15
								</div>
								
								<div class="d3-t">
							北京京能高安屯燃气热电有限公司
								</div>
									<div class="d3-s">
							92
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									16
								</div>
								
								<div class="d3-t">
							北京京西发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  		
                  	</div>
                  	
                  	<!-----------------------------------可靠性------------------------------>
                  	<div id='con_2' class="d_p_n">
                  	
                  	<div class="d-03-02">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								2页
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan1.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							内蒙古岱海发电有限责任公司
								</div>
									<div class="d3-s">
							100
								</div>
									<div class="d3-1 d3-bg1">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<img src="img/yuan2.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							山西漳山发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan3.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							北京京能热电股份有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									4
								</div>
								
								<div class="d3-t">
							内蒙古京隆发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									5
								</div>
								
								<div class="d3-t">
							宁夏京能宁东发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									6
								</div>
								
								<div class="d3-t">
							内蒙古京能康巴什热电有限公司
								</div>
									<div class="d3-s">
							95
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									7
								</div>
								
								<div class="d3-t">
							内蒙古华宁热电有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									8
								</div>
								
								<div class="d3-t">
							京能(赤峰)能源发展有限公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  	
                  	<!-----------------右侧开始------------------>
                  	
                  	
                  		<div class="d-03-03">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									9
								</div>
								
								<div class="d3-t">
							内蒙古京泰发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									10
								</div>
								
								<div class="d3-t">
							山西京玉发电有限责任公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
							<div style="float: left; margin-left: 20px;width: 26px;">
									11
								</div>
								
								<div class="d3-t">
							北京京丰燃气热电股份有限公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									12
								</div>
								
								<div class="d3-t">
							北京太阳宫燃气热电有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									13
								</div>
								
								<div class="d3-t">
							北京京桥热电有限责任公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									14
								</div>
								
								<div class="d3-t">
							深州市钰湖电力有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									15
								</div>
								
								<div class="d3-t">
							北京京能高安屯燃气热电有限公司
								</div>
									<div class="d3-s">
							92
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									16
								</div>
								
								<div class="d3-t">
							北京京西发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  		
                  	</div>
                  	
                  	<!--------------------------------------------检修------------------------------------>
                  	<div id="con_3" class="d_p_n">
                  		
                  	
                  	<div class="d-03-02">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								3页
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan1.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							内蒙古岱海发电有限责任公司
								</div>
									<div class="d3-s">
							100
								</div>
									<div class="d3-1 d3-bg1">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<img src="img/yuan2.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							山西漳山发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan3.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							北京京能热电股份有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									4
								</div>
								
								<div class="d3-t">
							内蒙古京隆发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									5
								</div>
								
								<div class="d3-t">
							宁夏京能宁东发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									6
								</div>
								
								<div class="d3-t">
							内蒙古京能康巴什热电有限公司
								</div>
									<div class="d3-s">
							95
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									7
								</div>
								
								<div class="d3-t">
							内蒙古华宁热电有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									8
								</div>
								
								<div class="d3-t">
							京能(赤峰)能源发展有限公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  	
                  	<!-----------------右侧开始------------------>
                  	
                  	
                  		<div class="d-03-03">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									9
								</div>
								
								<div class="d3-t">
							内蒙古京泰发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									10
								</div>
								
								<div class="d3-t">
							山西京玉发电有限责任公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
							<div style="float: left; margin-left: 20px;width: 26px;">
									11
								</div>
								
								<div class="d3-t">
							北京京丰燃气热电股份有限公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									12
								</div>
								
								<div class="d3-t">
							北京太阳宫燃气热电有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									13
								</div>
								
								<div class="d3-t">
							北京京桥热电有限责任公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									14
								</div>
								
								<div class="d3-t">
							深州市钰湖电力有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									15
								</div>
								
								<div class="d3-t">
							北京京能高安屯燃气热电有限公司
								</div>
									<div class="d3-s">
							92
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									16
								</div>
								
								<div class="d3-t">
							北京京西发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  		
                  	
                  		
                  		
                  	</div>
                  		<!--------------------------------------------生产------------------------------------>
                  	<div id="con_4" class="d_p_n">
                  		
                  	
                  	<div class="d-03-02">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan1.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							内蒙古岱海发电有限责任公司
								</div>
									<div class="d3-s">
							100
								</div>
									<div class="d3-1 d3-bg1">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<img src="img/yuan2.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							山西漳山发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan3.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							北京京能热电股份有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									4
								</div>
								
								<div class="d3-t">
							内蒙古京隆发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									5
								</div>
								
								<div class="d3-t">
							宁夏京能宁东发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									6
								</div>
								
								<div class="d3-t">
							内蒙古京能康巴什热电有限公司
								</div>
									<div class="d3-s">
							95
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									7
								</div>
								
								<div class="d3-t">
							内蒙古华宁热电有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									8
								</div>
								
								<div class="d3-t">
							京能(赤峰)能源发展有限公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  	
                  	<!-----------------右侧开始------------------>
                  	
                  	
                  		<div class="d-03-03">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									9
								</div>
								
								<div class="d3-t">
							内蒙古京泰发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									10
								</div>
								
								<div class="d3-t">
							山西京玉发电有限责任公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
							<div style="float: left; margin-left: 20px;width: 26px;">
									11
								</div>
								
								<div class="d3-t">
							北京京丰燃气热电股份有限公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									12
								</div>
								
								<div class="d3-t">
							北京太阳宫燃气热电有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									13
								</div>
								
								<div class="d3-t">
							北京京桥热电有限责任公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									14
								</div>
								
								<div class="d3-t">
							深州市钰湖电力有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									15
								</div>
								
								<div class="d3-t">
							北京京能高安屯燃气热电有限公司
								</div>
									<div class="d3-s">
							92
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									16
								</div>
								
								<div class="d3-t">
							北京京西发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  		
                  	
                  	</div>
                  	
                  		<!--------------------------------------------技术指标------------------------------------>
                  		<div id="con_5" class="d_p_n">
                  			
                  	
                  	<div class="d-03-02">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan1.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							内蒙古岱海发电有限责任公司
								</div>
									<div class="d3-s">
							100
								</div>
									<div class="d3-1 d3-bg1">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<img src="img/yuan2.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							山西漳山发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan3.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							北京京能热电股份有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									4
								</div>
								
								<div class="d3-t">
							内蒙古京隆发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									5
								</div>
								
								<div class="d3-t">
							宁夏京能宁东发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									6
								</div>
								
								<div class="d3-t">
							内蒙古京能康巴什热电有限公司
								</div>
									<div class="d3-s">
							95
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									7
								</div>
								
								<div class="d3-t">
							内蒙古华宁热电有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									8
								</div>
								
								<div class="d3-t">
							京能(赤峰)能源发展有限公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  	
                  	<!-----------------右侧开始------------------>
                  	
                  	
                  		<div class="d-03-03">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									9
								</div>
								
								<div class="d3-t">
							内蒙古京泰发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									10
								</div>
								
								<div class="d3-t">
							山西京玉发电有限责任公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
							<div style="float: left; margin-left: 20px;width: 26px;">
									11
								</div>
								
								<div class="d3-t">
							北京京丰燃气热电股份有限公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									12
								</div>
								
								<div class="d3-t">
							北京太阳宫燃气热电有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									13
								</div>
								
								<div class="d3-t">
							北京京桥热电有限责任公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									14
								</div>
								
								<div class="d3-t">
							深州市钰湖电力有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									15
								</div>
								
								<div class="d3-t">
							北京京能高安屯燃气热电有限公司
								</div>
									<div class="d3-s">
							92
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									16
								</div>
								
								<div class="d3-t">
							北京京西发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  		
                  	
                  		</div>
                  			<!--------------------------------------------特殊专项工作------------------------------------>
                  			<div id="con_6" class="d_p_n">
                  				
                  	
                  	<div class="d-03-02">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan1.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							内蒙古岱海发电有限责任公司
								</div>
									<div class="d3-s">
							100
								</div>
									<div class="d3-1 d3-bg1">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<img src="img/yuan2.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							山西漳山发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan3.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							北京京能热电股份有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									4
								</div>
								
								<div class="d3-t">
							内蒙古京隆发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									5
								</div>
								
								<div class="d3-t">
							宁夏京能宁东发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									6
								</div>
								
								<div class="d3-t">
							内蒙古京能康巴什热电有限公司
								</div>
									<div class="d3-s">
							95
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									7
								</div>
								
								<div class="d3-t">
							内蒙古华宁热电有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									8
								</div>
								
								<div class="d3-t">
							京能(赤峰)能源发展有限公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  	
                  	<!-----------------右侧开始------------------>
                  	
                  	
                  		<div class="d-03-03">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									9
								</div>
								
								<div class="d3-t">
							内蒙古京泰发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									10
								</div>
								
								<div class="d3-t">
							山西京玉发电有限责任公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
							<div style="float: left; margin-left: 20px;width: 26px;">
									11
								</div>
								
								<div class="d3-t">
							北京京丰燃气热电股份有限公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									12
								</div>
								
								<div class="d3-t">
							北京太阳宫燃气热电有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									13
								</div>
								
								<div class="d3-t">
							北京京桥热电有限责任公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									14
								</div>
								
								<div class="d3-t">
							深州市钰湖电力有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									15
								</div>
								
								<div class="d3-t">
							北京京能高安屯燃气热电有限公司
								</div>
									<div class="d3-s">
							92
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									16
								</div>
								
								<div class="d3-t">
							北京京西发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  		
                  	
                  			</div>
                  				<!--------------------------------------------技术监督工作------------------------------------>
                  				<div id="con_7" class="d_p_n">
                  					
                  					
                  	
                  	<div class="d-03-02">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan1.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							内蒙古岱海发电有限责任公司
								</div>
									<div class="d3-s">
							100
								</div>
									<div class="d3-1 d3-bg1">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<img src="img/yuan2.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							山西漳山发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<img src="img/yuan3.png" style="float: left; margin-left: 20px;margin-top: 9px;">
								
								<div class="d3-t">
							北京京能热电股份有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									4
								</div>
								
								<div class="d3-t">
							内蒙古京隆发电有限责任公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									5
								</div>
								
								<div class="d3-t">
							宁夏京能宁东发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									6
								</div>
								
								<div class="d3-t">
							内蒙古京能康巴什热电有限公司
								</div>
									<div class="d3-s">
							95
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									7
								</div>
								
								<div class="d3-t">
							内蒙古华宁热电有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									8
								</div>
								
								<div class="d3-t">
							京能(赤峰)能源发展有限公司
								</div>
									<div class="d3-s">
							99
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  	
                  	<!-----------------右侧开始------------------>
                  	
                  	
                  		<div class="d-03-03">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 85px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 110px">
									得分
								</div>
								<div style="float:left;margin-left: 20px">
									趋势
								
								</div>
								<div class="d-03-02-01">
									年度
										
								</div >
								<div class="d-03-02-01">
									季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									9
								</div>
								
								<div class="d3-t">
							内蒙古京泰发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									10
								</div>
								
								<div class="d3-t">
							山西京玉发电有限责任公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							<div class="m02-2-2 m02-2-bg">
							<div style="float: left; margin-left: 20px;width: 26px;">
									11
								</div>
								
								<div class="d3-t">
							北京京丰燃气热电股份有限公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									12
								</div>
								
								<div class="d3-t">
							北京太阳宫燃气热电有限公司
								</div>
									<div class="d3-s">
							96
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									13
								</div>
								
								<div class="d3-t">
							北京京桥热电有限责任公司
								</div>
									<div class="d3-s">
							94
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									14
								</div>
								
								<div class="d3-t">
							深州市钰湖电力有限公司
								</div>
									<div class="d3-s">
							98
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2 m02-2-bg">
								<div style="float: left; margin-left: 20px;width: 26px;">
									15
								</div>
								
								<div class="d3-t">
							北京京能高安屯燃气热电有限公司
								</div>
									<div class="d3-s">
							92
								</div>
									<div class="d3-1 d3-bg2">
						                              3
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							<div class="m02-2-2">
								<div style="float: left; margin-left: 20px;width: 26px;">
									16
								</div>
								
								<div class="d3-t">
							北京京西发电有限责任公司
								</div>
									<div class="d3-s">
							97
								</div>
									<div class="d3-1 d3-bg1">
						                              2
								</div>
								<div class="d3-1 ">
						                              2015
								</div>
								<div class="d3-2 ">
						                         第一季度
								</div>
							</div>
							
							
							
							
                  		
                  	</div>
                  	
                  	
                  		
                  	
                  				</div>
                  				
                  				
                  	   	</div>
                  	
                  </div>
				</div>
			

			
			
				<!--页脚区域-->
				<div class="footer">
					<div class="f1">
					<p> <a href="#">关于我们</a>&#124;&nbsp;<a href="#">联系我们</a>&#124;&nbsp;<a href="#">信息反馈</a>&#124;&nbsp;<a href="#">人才招聘</a>&#124;&nbsp;<a href="#">友情链接</a>&#124;&nbsp;<a href="#">脚注信息</a>&nbsp;&nbsp;<a href="#">更多</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版权所有&nbsp;Copyright(c)2009-2015&nbsp;岱海电厂
						&nbsp;&nbsp;&nbsp;&nbsp;
					</p>
					</div>
				</div>
			</div>
		</div>
		</div>
	</body>
</html>