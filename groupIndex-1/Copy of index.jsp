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
		<title>京能集团实时技术监督管理系统</title>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <link type="text/css" rel="Stylesheet" href="../final/css/main_style.css" />
		<link type="text/css" rel="Stylesheet" href="css/main_style.css" />
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="<%=path %>/webbuilder/controls/ext/ext-all.js" sype="text/javascript"></script>
		<script src="js/jquery.js"></script>
        <script src="../final/js/index_params.js" sype="text/javascript"></script>
        <script src="js/index_params.js" sype="text/javascript"></script>
        <script src="js/index_coment.js" sype="text/javascript"></script>
        <script sype="text/javascript">
		        //getText();
		        var userID='<%=_userId%>';
		        document.onreadystatechange=function(){
		        	if(document.readyState == "complete"){
		        		getMyOrgsUser(userID,"<%=_userName %>");
		        		getOrgs1();
		        		getWarning('0','22');
		        		getWarning('1','22');//查询预警信息0代表运行机组，1代表停机机组，22代表显示的条数
		        		getManagement(userID);
		        		getTargetDate1("3","","");
		        		getTargetDateValues();
		        		getComent("1");
		        		 window.setInterval(
		        				function() 
		        				{ 
		        					getTargetDate1("3","","");
		        					getWarning('0','18');
		    		        		getWarning('1','18');
		        				}, 5000); 
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
			    background-color:FFFFFF;
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
		<script type="text/javascript">
	
			$(function(){
					//导航栏效果
				$('.m01,#m-02').hover(function(){
					$(this).addClass('m-01');
				},function(){
					$(this).removeClass('m-01');
				}
				);
							//标题栏效果
					$('#d_3_2').children().click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
			
			
			})
					$('#m_2_1').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
			$('#m_2_3').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})
					$('#m_2_2').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
				$('#m_2_4').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})
				$('#con-1').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
				$('#con_1').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})	
			$('#con-2').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
				$('#con_2').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})	
			$('#con-3').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
				$('#con_3').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})	
			$('#con-4').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
				$('#con_4').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})	
			$('#con-5').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
				$('#con_5').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})	
			$('#con-6').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
				$('#con_6').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})	
			$('#con-7').click(function(){
			$(this).addClass('m02-1-2').siblings().removeClass('m02-1-2');
				$('#con_7').removeClass('d_p_n').siblings().addClass('d_p_n');
			
			})	
				});
		</script>

	</head>

	<body>
		<div>
			<!--Logo区域-->
			<div>
				<!--主要区域-->
				<div id="main" style="width:1280px;margin:0 auto;">
					<!--操作区域-->
					<div id="data_one">
						<div style="padding-top: 5%;width: 100%;text-align: center;"> <div id="orgName"></div></div>
						<div id="shijian" style="height: 50px;line-height: 0px;">
						<span id="time" style="font-size: 21px;font-weight: bold;"> 
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

						<div style="width: 95%;float: left;">

							<div id="tupian1" style="float: left;">
								<div style="float:left;margin:5% 9%;font-size: 21px;">
									实时
									<br/>负荷
								</div>
								<div class="songti" id="ssfh" style="text-align: center;margin-top: 2px;">
									
								</div>
							</div>

							<div id="tupian2" style="float:right;">
								<div style="float:left;margin:5% 9%;font-size: 21px;">
									本月
									<br/>计划
								</div>
								<div class="songti" id="byjh"  style="text-align: center;margin-top: 2px;">
									
									
								</div>
							</div>
							
							<div id="tupian3" style="float: left;">
								<div style="float:left;margin:4% 5%;font-size: 21px;">
									今日
									<br/>发电量
								</div>
								<div class="songti" id="jrfdl" style="text-align: center;margin-top: 2px;">
									
								</div>
							</div>

							<div id="tupian4" style="float:right;">
							
								<div style="float:left;margin:4% 5%;font-size: 21px;">
									昨日
									<br/>发电量
								</div>
								<div class="songti" id="zrfdl"  style="text-align: center;margin-top: 2px;">
									
									
								</div>
							</div>
							
							<div id="tupian5" style="float: left;">
								<div style="float:left;margin:4% 5%;font-size: 21px;">
									本月
									<br/>发电量
								</div>
								<div class="songti" id="byfdl" style="text-align: center;margin-top: 2px;">
									
								</div>
							</div>

							<div id="tupian6" style="float:right;">
								<div style="float:left;margin:4% 5%;font-size: 21px;">
									上月
									<br/>发电量
								</div>
								<div class="songti" id="syfdl"  style="text-align: center;margin-top: 2px;">
									
									
								</div>
							</div>
							<div id="tupian7" style="float: left;">
								<div style="float:left;margin:4% 5%;font-size: 21px;">
									年累计
									<br/>发电量
								</div>
								<div class="songti" id="nljfdl" style="text-align: center;margin-top: 2px;">
									
								</div>
							</div>

							<div id="tupian8" style="float:right;">
								<div style="float:left;margin:4% 5%;font-size: 21px;">
									年计划
									<br/>发电量
								</div>
								<div class="songti" id="njhfdl"  style="text-align: center;margin-top: 2px;">
									
									
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
                            <a id="a_5" href="javascript:void(0)" onclick="clickFunc('报警信息','23WPD5TO7GWR','<%=path %>/main?xwl=23WPD5TO7GWR')" style="float: right;margin-top:25px;margin-right: 50px;text-align: center;font-family: '楷体';">
							  更多
						    </a>
							 <div id="selectAge"></div>
						</div>
						
						<div>
						<!------------------------------------------------运行机组报警------------------->
						<div class="m02-2" id="m_2_3">
								<div id="warntable" class=""></div>
							</div>
						<!-------------------------停机机组报警------------------>
						<div class="m02-2 d_p_n" id="m_2_4">
							<div id="warntable1" class=""></div>
							
						</div>
                      </div>
					</div>




                  <div class="d-03">
                  	<div class="d-03-01" id="d_3_2">
                  		
                  			<div><div class="d-03-01-01 m02-1-2" id="con-1"><span onclick="getComent('2')">对标排名</span></div><div style="float:right;width:90px">
                  			
                  			<a href='javascript:void(0)' onclick="clickFunc('对标管理','23Y06JRY3XV7','/jsjd/main?xwl=23Y06JRY3XV7')">更多</a></div></div>
                  			
                  			<!-- <div class="d-03-01-02 " id="con-2"><span >可靠性</span></div>
                  			<div class="d-03-01-02 " id="con-3"><span>检修</span></div>
                  			<div class="d-03-01-02 " id="con-4"><span>生产</span></div>
                  			<div class="d-03-01-01 " id="con-5"><span>技术指标</span></div>
                  			<div class="d-03-01-03 " id="con-6"><span>特殊专项工作</span></div>
                  		    <div class="d-03-01-03 " id="con-7"><span>技术监督工作</span></div> -->
						
                  			
                  	</div>
                  	
                  	<!---------------------------内容---------------------------->
                  	<div id="content_3">
                  		
               <!----------------------------------------------对标排名---------------------------->
                  	<div id='con_1'>
                  	
                  	<div class="d-03-02" id="duibiao">
                  	
                  	</div>
                  	<!-----------------右侧开始------------------>
                  		<div class="d-03-03" id="duibiao1">
                  		
                  	</div>
                  	
                  	
                  		
                  	</div>
                  	
                  	<!-----------------------------------可靠性------------------------------>
                  	<div id='con_2' class="d_p_n">
                  	
                  	<div class="d-03-02">
                  		<div class="m02-2-1">
								<div style="float: left; margin-left: 15px;">
								排名
								</div>
								<div style="float:left;margin-left: 30px">
								电厂名称
								</div>
								<div style="float:left;margin-left: 40px">
									金牌机组
								</div>
								<div style="float:left;margin-left: 10px">
									累计非停
								</div>
								<div style="float:left;margin-left: 10px">
									锅炉灭火
								</div>
								<div style="float:left;margin-left: 10px">
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
			</div>
		</div>
		</div>
	</body>
	<!--初始化参数后台登陆连接参数  -->
		<script src="valid/index_params.js"></script>

</html>