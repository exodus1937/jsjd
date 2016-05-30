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
<head>
		<meta charset="utf-8" />
		<title>京能集团实时技术监督管理系统</title>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />

		<link type="text/css" rel="Stylesheet" href="css/main_style.css" />
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<script src="js/jquery.js"></script>

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
				<div class="header">
					<img src="img/logo_dianchang.png" width="900px" height="75px" style="margin-left: 155px;margin-top: 40px;">
					<div class="tuichu">
						<div style="width:85px;height:35px;border-right:1px black dashed ;float: left;text-align: 10px;font-family: '微软雅黑';font-size: 18px;">
							<img src="img/yonghu.png" width=23px height=25px style="margin-top: 5px;">
							<p style="float: right; margin-right: 15px;margin-top: 5px;">李四</p>
						</div>

						<div style="float: right;">
							<button class="btn" onclick="logout(); return false;"><img src="img/btn-ex.png" width="80px" height="35px" style="float: right;margin-top:0px;" /></button>

						</div>

					</div>

				</div>
				<!--菜单区域-->
				<div class="menu">
					<div class="m01">
						<img src="img/shouye.png" width="26px" ; height="26px" style="float:left;margin-left: 20px;margin-top: 15px;" />
						<a style="padding-left: 1px;float: left;" href="#">首页</a>
						<img src="img/pm-l.png" height="35px" style="float: right;margin-top:10px ;" />
					</div>
					<div id="m-02">
						<a href="#">监督动态</a>
						<img src="img/pm-l.png" height="35px" style="float: right;margin-top:10px ;" />
					</div>
					<div class="m01">
						<a href="#">监督标准</a>
						<img src="img/pm-l.png" height="35px" style="float: right;margin-top:10px ;" />
					</div>
					<div class="m01">
						<a href="#">监督网络</a>
						<img src="img/pm-l.png" height="35px" style="float: right;margin-top:10px ;" />
					</div>
					<div class="m01">
						<a href="#">监督计划</a>
						<img src="img/pm-l.png" height="35px" style="float: right;margin-top:10px ;" />
					</div>
					<div class="m01">
						<a href="#">监督执行</a>
						<img src="img/pm-l.png" height="35px" style="float: right;margin-top:10px ;" />
					</div>
					<div class="m01">
						<a href="#">监督总结</a>
						<img src="img/pm-l.png" height="35px" style="float: right;margin-top:10px ;" />
					</div>
					<div class="m01">
						<a href="#">综合查询</a>
						<img src="img/pm-l.png" height="35px" style="float: right;margin-top:10px ;" />
					</div>
					<div class="m01">
						<a href="#">监督报表</a>
					</div>
				</div>

				<!--主要区域-->
				<div id="main" style="width:1280px;margin:0 auto;">
					<!--操作区域-->
					<div id="data_one">
						<div id="shijian">
						2015年6月6日&nbsp; 15时18分30秒
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
						<div class="daohang">
							<div class="data01-01">

								<a href="#">

									<img src="img/pm01-1.png" width="70px" height="70px" style="margin-top: 40px;border: 0;" />
								</a>
								<p style="margin-top: 5px;">我的待办（固定）</p>

							</div>
							<div class="data01-01">

								<a href="#">

									<img src="img/pm01-2.png" width="70px" height="70px" style="margin-top: 40px;border: 0;" />
								</a>
								<p style="margin-top: 5px;">资料库</p>

							</div>
							<div class="data01-01">

								<a href="#">

									<img src="img/pm01-3.png" width="70px" height="70px" style="margin-top: 40px;border: 0;" />
								</a>
								<p style="margin-top: 5px;">考核管理</p>

							</div>
							<div class="data01-01">

								<a href="#">

									<img src="img/pm01-4.png" width="70px" height="70px" style="margin-top: 40px;border: 0;" />
								</a>
								<p style="margin-top: 5px;">综合查询</p>

							</div>
							<div class="data01-01">

								<a href="#">

									<img src="img/pm01-5.png" width="70px" height="70px" style="margin-top: 40px;border: 0;" />
								</a>
								<p style="margin-top: 5px;margin-left: -6px;">机组启停管理</p>

							</div>

						</div>

					</div>

					<div id="data_two">

						<div class="m02-1">
							<div id="d_3_1">
								
							<div class="m02-1-1 m02-1-2" id="m_2_1"><span>运行机组报警</span></div>
							<div class="m02-1-1"id="m_2_2"><span>停机机组报警</span></div>
							</div>

							<select style="margin-top: 38px ;margin-right:20px;float:right;">
								<option value="1">全厂</option>
								<option value="2">公司</option>
								<option value="3">提示</option>
							</select>
						</div>
						
						<div>
						<!------------------------------------------------运行机组报警------------------->
						<div class="m02-2" id="m_2_3">
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
						<!-------------------------停机机组报警------------------>
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
			</div>
		</div>
		</div>
	</body>
	<!--初始化参数后台登陆连接参数  -->
		<script src="js/index_params.js"></script>
</html>