<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.sql.Statement"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.ResourceBundle"%>
<!doctype html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>京能集团实时技术监督系统</title>
<c:set var="ctx" value="${pageContext.request.contextPath}"
	scope="request" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/style1-14.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/yz.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/style1-18wl.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/wj_0118.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/du1-24.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/jtIndex.css" />

<script type="text/javascript">
		var ctx = "${ctx}";
		
	</script>
<%
	HashMap map = (HashMap) session.getAttribute("XzSessionVars");
	String _userId = (String) map.get("userId");
	String _userName = (String) map.get("userName");
	String path = request.getContextPath();
%>
</head>
<body>
	<div id="main" class="fl">
		<div id="du_main">
			<div class="wj_top">
				<span id="time" style="color:#666;"><script type="text/javascript"> 
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
							  	var str=myDate.getFullYear()+"年"+month+"月"+Day+"日     "+hours+":"+ min+":"+ ss+"";

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
						</script></span>
				<ul>
					<select id="spec" name="language" class="pull_down">
						<!--<c:forEach items="${specList}" var="spec">
						<option id="#wj_spec"  value="${spec.ID}">${spec.NAME}</option> 
						
					</c:forEach> -->

						<c:forEach items="${specList}" var="spec">
							<option id="wj_spec" value="${spec.ID}">${spec.NAME}</option>
						</c:forEach>
						<option value="2c89e177-26e1-48dd-a844-b4661bb6e00f">绝缘</option>
						<option value="7ebef882-8cbf-4729-8c25-1b2558ed9a60">金属</option>
						<option value="93188b01-4b8b-461a-8e28-65cd03fade65">化学</option>
						<option value="af3f2df3-4030-47ce-828b-4f02f6f39243">电测</option>
						<option value="4cfbad50-6b92-4b78-a6dd-fcadf6e5fdac">电能</option>
						<option value="2dcd1a02-3b3d-4dd3-a554-c6b33f254de0">热工</option>
						<option value="f2df9251-e408-4073-90a2-967f4c85cab6">环保</option>
						<option value="5daeaa7d-5141-46b1-b857-ebd74be42118">节能</option>
						<option value="e4fd5a5f-f21b-4608-9104-49d82b4a45f7">继保</option>
						<option value="7491dd42-c94c-46fa-b82d-65e7c320593b">压力容器</option>
						<option value="cca16d73-e72a-4643-9b95-a8e7328e9b94">计量</option>
						<option value="12b4521c-090b-427d-800b-c23d2a6af8f5">励磁系统</option>
						<option value="a9b32dc4-e5ee-44cf-b98e-9009d30b3a54">振动</option>
						<option value="c8a1b764-b850-4f25-8dca-7ca1d9f6bfbc">特种设备</option>
					</select>
					<select id="org" class="pull_down">
					<option value="c21834b4-1cb0-490f-a2a8-deeaf7f7e065">岱海发电</option>
						<option value="472212af-1977-462b-a74a-a1f36ed6562d">宁东发电</option>
						<option value="a61365e2-969d-4352-b3f8-805027ab9f1d">京能集团</option>
					</select>
				</ul>
			</div>
			
			<div class="clearfix"></div>
			<div id="d_dcyh">
				<!--table1-->
				<div class="class_main1 fl wj_ma h293">
					<div class="du_more"></div>
					<div class="clearfix"></div>
					<div id="yibiaopan"
						style="width: 383px; height: 220px; display: none; margin: 0 auto;"></div>
					<div class="class_main1_main">
						<div class="circle">
							<div class="fl circle1"
								style="line-height: 60px;background-image: url('${ctx}/newNavIndex/img/pause.png');">#1机组</div>
							<div class="fl circle1 circle2"
								style="text-align: right; line-height: 60px;background-image: url('${ctx}/newNavIndex/img/pause.png')">#2机组</div>
							<div class="fl circle1 circle3"
								style="line-height: 150px;background-image: url('${ctx}/newNavIndex/img/pause.png')">#3机组</div>
							<div class="fl circle1 circle4"
								style="text-align: right; line-height: 150px;background-image: url('${ctx}/newNavIndex/img/pause.png')">#4机组</div>
							<div class="circle_data circle_data1" style="">0.0%</div>
							<div class="circle_data circle_data2" style="">0.0%</div>
							<div class="circle_data circle_data3" style="">0.0%</div>
							<div class="circle_data circle_data4" style="">0.0%</div>
							<!--双机组-->
							<div class="fl circle5" style="display: none;">#1机组</div>
							<div class="fl circle6" style="display: none;">#2机组</div>
							<!--单机组-->
							<div class="fl circle7" style="display: none;"></div>
							<div class="circle_data5 " style="display: none;">98%</div>
							<div class="circle_data6 " style="display: none;">98%</div>
							<!--单机组-->
							<div class="circle_data7" style="display: none;">77%</div>

							<!--  -->
							<div id="circle_data21">
								<span id="fhl" title="全厂负荷率">负荷率</span><br /> <span id="zfh"
									title="总负荷">总负荷</span>
							</div>
						</div>
						<div class="class_main1_right">
							<div>
								<div
									style="height: 20px; width: 20px; background: red; border-radius: 7px;"></div>
								&nbsp;&nbsp;&nbsp;运&nbsp;&nbsp;行
							</div>
							<div>
								<div
									style="height: 20px; width: 20px; background: green; border-radius: 7px;"></div>
								&nbsp;&nbsp;&nbsp;停&nbsp;&nbsp;机
							</div>
							<div>
								<div
									style="height: 20px; width: 20px; background: yellow; border-radius: 7px;"></div>
								&nbsp;通讯中断
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<table style="width: 100%; margin-top: 20px;">
						<tr class="du_href">
							<td style="background: #ffffff;"><a class="tiaozhuan"
								style="float: left; width: 120px; height: 30px; margin: 0 0 0 60px; background: #f2f2f2; text-align: center; line-height: 30px; color: #177EDA">机组状态参数</a></td>
							<td style="background: #ffffff;"><a
								href="http://10.44.1.159/Coresight"
								style="float: left; width: 120px; height: 30px; background: #f2f2f2; text-align: center; line-height: 30px; color: #177EDA">全厂系统总览</a></td>
						</tr>
					</table>
				</div>
				<!--table2-->

				<div class="class_main1 fl  wj_ma h293">
					<h3>指标一览</h3>

					<!--<div class="du_more">更多></div>-->
					<div class="clearfix"></div>
					<!-- 电厂视图 -->
					<!-- <div class="btn" style="margin-left:14%;margin-top: 6px;line-height: 27px;background: #fff;color:#177EDA;border: 1px solid #177EDA">电量指标</div>
	            <div class="btn" style="float: right;margin-right: 11%;margin-top: 6px;line-height: 27px;background: #fff;color:#177EDA;border: 1px solid #177EDA">发电指标</div>
	            <div class="clearfix"></div>-->
					<div id="dczb" class="wj_cen">
						<div class="bianse">
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div class="bianse">
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div>
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div>
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div class="bianse">
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div class="bianse">
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div>
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div>
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div class="bianse">
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div class="bianse">
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div>
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div>
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div class="bianse">
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
						<div class="bianse">
							<span class="aaa"><a
								onclick="clickOpenWindow('NMDH:PE:ZJRL','总装机容量','','','ces312adfashi','ceshi2')"
								href="javascript:void(0)" id="NMDH:PE:ZJRL"></a></span> <span></span>
						</div>
					</div>
					<!-- 集团视图 -->
					<div id="jituanzhibiao"
						style="display: none; margin-top: 10px; width: 90%; margin-left: 5%; height: 32px; line-height: 16px;">
						<div class="jituan_wrap fl">
							<div class="fl">
								实时负荷<br>(MW
							</div>
							<div class="jituanzhibiao1 fl">1335</div>
						</div>
						<div class="jituan_wrap fl">
							<div class="fl">
								本月计划<br>(万kWh)
							</div>
							<div class="jituanzhibiao1 fl">0</div>
						</div>
						<div class="jituan_wrap fl">
							<div class="fl">
								今日发电量<br>(万kWh)
							</div>
							<div class="jituanzhibiao1 fl">1779.0</div>
						</div>
						<div class="jituan_wrap fl">
							<div class="fl">
								昨日发电量<br> (万kWh)
							</div>
							<div class="jituanzhibiao1 fl">2667.09</div>
						</div>
						<div class="jituan_wrap fl">
							<div class="fl">
								本月发电量<br> (亿kWh)
							</div>
							<div class="jituanzhibiao1 fl">5.09</div>
						</div>
						<div class="jituan_wrap fl">
							<div class="fl">
								上月发电量<br> (亿kWh)
							</div>
							<div class="jituanzhibiao1 fl">12.11</div>
						</div>
						<div class="jituan_wrap fl">
							<div class="fl">
								年累计发电量<br> (亿kWh)
							</div>
							<div class="jituanzhibiao1 fl">5.09</div>
						</div>
						<div class="jituan_wrap fl">
							<div class="fl">
								年计划发电量<br> (亿kWh)
							</div>
							<div class="jituanzhibiao1 fl">0</div>
						</div>
						

					</div>
				</div>
			
				<!--table3 -->
				<div class="class_main1 class_main5 fl  wj_ma h293">
					
					<h3 class="pointer wj_bod">
						<b class="title_active1" onclick="zhibiao_show()">指标排名</b>
						<b onclick="kaohexinxi_show()">考核信息</b>					
					</h3>
					<div id="wj_ckdb" class="du_more" style="text-decoration:underline">
						<a id='duibiaodizhi' href="">查看对标奖励兑现表</a>
					</div>
					<div class="clearfix"></div>
					<div class="wj_cen" >
						<div id="kaohe" style="display:none">
							<table class="khtit tc" style="width:100%"  id="kaohexinxi">
								<thead>
							        <tr>
							            <td style="width:20%">序号</td>
							            <td style="width:80%">描述</td>
							           
							        </tr>
							    </thead>
						        <tbody>
						        	
						        
						        </tbody>
			    			</table>
			    			
			    			
						</div>
						<div id="duibiao" style="display:block">
							<table class="khtitle tc">
						        <tr>
						            <td>技术指标</td>
						            <td >当月平均值</td>
						            <td >当月实时排名</td>
						            <td >上季度平均值</td>
						            <td >上季度排名</td>
						        </tr>
			    			</table>
			    			
						    <div class="khleft1 tc fl">
						        <div > 综合供电煤耗(g/kW.h)</div>
						        <div>厂用电率<br/>（%）</div>
						        <div>综合厂用电率<br/>（%）</div>
						        <div>机组负荷率<br/>（%）</div>
						        <div>补水率<br/>（%）</div>
						       
						    </div>
						    <div class="khright fl">
						        <table class=" fl" style="width:100%;" id="zhibiaopaimingtable" >
						           
						             
						        </table>
					    	</div>
						    
						</div>
						
					   
					 </div>   
				</div>
				
				<!--table4 -->
						

				<div class="class_main1 class_main5 fl  wj_ma  ">
					
					<h3 class="pointer wj_bod">
						<b class="title_active1" onclick="changeBaojing(0);">运行机组报警</b>
						<b onclick="changeBaojing(1)">停机机组报警</b>
						<!-- <b onclick="yjtz_show()">预警通知单</b> -->
					</h3>
					<div class="du_more"><a href="http://10.44.1.160:7001/jsjd/main?xwl=23WPD5TO7GWR" target="_blank">更多&gt;</a></div>
					<div class="clearfix"></div>
					
					<div id="rongqi2" style="display: block;">
						<table id="baojingxinxi" class="wj_cen">
							<thead>
								<tr>
									<td style="width: 22%; overflow: hidden;">测点名称</td>
									<td style="width: 18%; ovflow: hidden">级别</td>
									<td style="width: 20%; overflow: hidden">报警值</td>
									<td style="width: 22%; overflow: hidden">报警时间</td>
									<td style="width: 18%; overflow: hidden">时长</td>
								</tr>
							</thead>
							<tbody id="baojingTable">
							</tbody>
							
						</table>
					</div>
					<div id="rongqi" style="display: none">
						<!-- <table id="yujingtongzhidan" class="wj_cen">
							<thead>
								<tr style="height: 32px; line-height: 32px;">
									<td style="width: 18%;">预警级别</td>
									<td style="width: 31%;">预警名称</td>
									<td style="width: 29%;">预警时间</td>
									<td style="width: 22%;">状态</td>
								</tr>
							</thead>
							<tbody id="yujingTable">
							</tbody>
						</table> -->
					</div>
				</div>

				<!--table5-->
				
				<div class="class_main1 class_main5 fl " id="wj_table5">
					<h3 class="pointer">
						<b id="wj_dq" class="title_active1" onclick="">定期试验</b>
						<b id="wj_sb" onclick="">设备轮换</b>
						<b id="wj_jz" onclick="">机组启停</b>
					</h3>
					<div class="du_more"><a id="dq_more" href="${ctx}/newNavIndex/dingqishiyan/qchuizong.html"> 更多</a>
						<%-- <a href="${ctx}/newNavIndex/jianduzhixing.jsp">更多></a> --%>
					</div>
					<div class="clearfix"></div>
	<!--			<table class="jdzx wj_cen" >
						<thead>
							<tr>
								<td style="width: 30%; overflow: hidden;">编号</td>
								<td style="width: 40%; overflow: hidden">执行项目</td>
								<td style="width: 30%; overflow: hidden">上报时间</td>
							</tr>
						</thead>
						<tbody id="jianduzhixingTable">
						</tbody>
					</table>-->
                    			<table class="jdzx wj_cen" id="wj_qiehuan">
						<thead>
							<tr>
								<td>机组</td>
								<td>试验名称</td>
								<td>曲线</td>
                                <td>时间</td>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
				<!-- table6 -->
					
				<div class="class_main1 class_main5 fl ">
					<h3 class="pointer">
						<b id="wj_yc" class="title_active1" onclick="ycqk_show()">异常情况</b>
						<b id="wj_yj" onclick="bjtzd_show()">预警通知单</b>
					
					</h3>
					<div class="du_more">
						 <a id="yc_more" href="${ctx}/newNavIndex/yichangqingkuang/qchuizong.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="ycqk wj_cen" id="ycqk" >
						<thead>
							<tr>
								<td style="width: 50%; overflow: hidden;">异常类型</td>
								<td style="width: 20%; overflow: hidden">曲线</td>
								<td style="width: 25%; overflow: hidden">时间</td>														
							</tr>
						</thead>
						<tbody id="ycqktable">
							
						</tbody>
					</table>
					<table class="yjtzd wj_cen" id="yujingtongzhidan" style="display:none;">
						<thead>
							<tr>														
								<td style="width:18%;">预警级别</td>
	              <td style="width:31%;">预警名称</td>
	              <td style="width:29%;">预警时间</td>
	              <td style="width:22%;">状态</td>
							</tr>
						</thead>
						<tbody id="yujingTable">
						
						
						</tbody>
					
					</table>
				</div>
			
				
				<!--table7  -->
				
				<div class="class_main1 class_main5 fl ">
					<!--<h3>监督计划·总结</h3>-->
					<h3 class="pointer">
						<b class="title_active1" onclick="zongjie(0)">监督计划</b>
						<b onclick="zongjie(1)">监督总结</b>
					</h3>
					<div class="du_more">
						<a href="${ctx}/smartBIjh.html">更多></a>
					</div>
					<div class="clearfix"></div>
					
					<div class="jdzj" style="width: 100%;">
						<table class="wj_cen">
							<thead style="width: 100%;">
								<tr style="width: 100%;">
									<td style="width: 30%; overflow: hidden;">编号</td>
									<td style="width: 40%; overflow: hidden;">名称</td>
									<td style="width: 30%; overflow: hidden;">上报时间</td>
								</tr>
							</thead>
							<tbody id="zongjieTable">
							</tbody>
						</table>
					</div>
				</div>
				
				<!--table8-->
				

				
				<div class="class_main1 fl ">
					<!-- 技改项目  -->
					<h3>技改项目</h3>
					<div class="du_more">
						<a href="${ctx}/newNavIndex/zaixian.html"></a>
					</div>
					<div class="clearfix"></div>
					<div style="margin: 10px 0; z-index: 1000000; display: none;">
						<div id="projectId1" class="fl title_active"
							style="margin: 0 2%; cursor: pointer"></div>
						<div id="projectId2" class="fl" style="cursor: pointer"></div>
						<a href="javascript:void(0)" id="jigaiInf" style="color: #6DB1E0">查看详情</a>
						<div class="clearfix"></div>
					</div>
					<div id="my_echart" style="width: 420px; height: 250px; position: absolute; left: 0; top: 60px; display: none;">
					</div>
				</div>

				<!--8table-->
				<!-- <div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b class="title_active1" onclick="jdgz_view()">监督工作</b> <b class=""
							onclick="gztx_view()">工作提醒</b>
					</h3>
					<div class="du_more"></div>
					<div class="clearfix"></div>
					<div id="jdgz">
						<table class="wj_jd">
							<thead>
								<tr>
									<td>序号</td>
									<td style="width: 75%">任务描述</td>
								</tr>
							</thead>
						</table>
						<div id="works"></div>
					</div>
					<div id="gztx" style="display: none">
						<table class="wj_jd">
							<thead>
								<tr>
									<td>工作提醒</td>
									<td>消息描述</td>
									<td>提醒时间</td>
									<td>倒计时（天）</td>
								</tr>
							</thead>
						</table>
						<div id="mission"></div>
					</div>
				</div> -->

				<!--9table-->
				<div class="class_main1 class_main5 fl ">
					<h3 class="pointer">
						<b class="title_active1" onclick="jiandubaobiao_show()">监督报表</b> <b
							onclick="shengchanbaobiao_show()">生产报表</b>
					</h3>
					<div class="du_more">
						<a href="${ctx}/smartBI.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="jiandubaobiao_view wj_cen">
						<thead>
							<tr>
								<td style="width: 30%; overflow: hidden;">报表编号</td>
								<td style="width: 40%; overflow: hidden;">报表名称</td>
								<td style="width: 30%; overflow: hidden;">上报时间</td>
							</tr>
						</thead>
						<tbody id="jianduTable">
						</tbody>
					</table>
					<table style="display: none;width:100%" class="shengchanbaobiao_view" id="yzs">
						<!--  集团视图  -->
						<tbody class="jituan_view">
							<!-- <tr>
								<td><div>
										<a
											href="${ctx}/ReportServer?reportlet=dcscybb_hd_sc.cpt&op=view&GENERAL_ID=8ba07335-0875-49cd-b246-768ece3b7cdd"
											class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											集团生产日报 </a>
									</div></td>
								<td><div>
										<a
											href="${ctx}/ReportServer?reportlet=TES_PS_GENERAL_DCSCZB_VIEW.cpt&op=view"
											class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											集团生产周报 </a>
									</div></td>
								<td><div>
										<a href="${ctx}/ReportServer?reportlet=SCZBYBB.cpt&op=view"
											class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											集团生产月报 </a>
									</div></td>
							</tr>
							<tr>
								<td><div>
										<a
											href="${ctx}/ReportServer?reportlet=TES_PS_GENERAL_JTSCNB_VIEW.cpt&op=view"
											class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											集团生产年报 </a>
									</div></td>
								<td><div>
										<a
											href="${ctx}/ReportServer?reportlet=2014JTSCZBFJ.cpt&op=view"
											class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											集团指标分解 </a>
									</div></td>
								<td><div>
										<a href="${ctx}/ReportServer?reportlet=JJXZBHZ.cpt&op=view"
											class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											经济指标汇总 </a>
									</div></td>
							</tr> -->
						</tbody>
						<!--  电厂视图-->
						<tbody class="dianchang_view">
							<tr>
								<td><div>
										<a href="${ctx}/main?xwl=23YJGHMW2WKK&repordCode=SCRB" class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											生产日报 </a>
									</div></td>
								<td><div>
										<a href="${ctx}/main?xwl=23YJGHMW2WKK&repordCode=SCZB" class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											生产周报 </a>
										<%-- <a href="${ctx}/newNavIndex/zhoubao.html"> <img src="${ctx}/newNavIndex/img/report1.jpg" title="生产周报" />
										</a> --%>
									</div></td>
								<td><div>
										<a href="${ctx}/main?xwl=23YJGHMW2WKK&repordCode=SCYB" class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											生产月报 </a>
										<%-- <a href="${ctx}/newNavIndex/yuebao.html"> <img src="${ctx}/newNavIndex/img/report3.jpg" title="生产月报" />
										</a> --%>
									</div></td>
							</tr>
							<tr>
								<td><div>
										<a href="${ctx}/main?xwl=23YJGHMW2WKK&repordCode=SCNB" class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											生产年报 </a>
									</div></td>
								<td><div>
										<a href="${ctx}/main?xwl=23XNPR90TJFN" class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											考核分解 </a>
									</div></td>
								<td><div>
										<a href="#" class="ellipsis"
											style="height:100px;color:#fff; line-height:135px;font-size:12px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 20px 0;">
											经济指标汇总 </a>
									</div></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div id="d_jtyh" style="display:none">
					<!-- 集团用户table1+table2 -->
				<div  class="class_main1 fl wj_ma h293 " style="width:65.1%" >
					<div style="" class="jt-left fl">
						<!--<div class="jt-left-h">
							 <div class="fl" style="margin-left:9%;text-align:left;" >单位:&nbsp;MW</div> 
							<div class="fl" style="margin-left:15%"> <div class="fl biaozhi" style="background:#51A9CF"></div>昨日负荷</div>
							<div class="fl" style="margin-left:20%"><div class="fl biaozhi" ></div>今日负荷</div>
						</div>	-->
						<div class="jt-left-1 fl">
							<div class="jt-left-1-1" style="margin-bottom:60px;">
								<div>昨日发电量 </div>
								<div id="zuori">111</div>
							</div>
							<div class="">
								<div>今日发电量 </div>
								<div id="jinri">111</div>
							</div>
							
							
						</div>
						<!-- 集团   canvas1 -->
						
						<div class="jt-left-canvas fl" style="positon:relative;padding-top:20px;">
							<div id="zhexian" style="width:340px;height: 260px;position:absolute;left:26%"></div>
							<div style="position: absolute;top:230px;left:29%;">00:00</div>
							<div style="position: absolute;top:230px;left:90%;">24:00</div>
						</div>
						<div class="jt-cs"><a href="/jsjd/main?xwl=23Z6S7B7RZLA">查询各厂测点指标</a></div>
						<div class="jt-cs jt-cs1"><a href="/jsjd/main?xwl=23YA0QJSVS7L">各厂机组主要参数</a></div>
					
					</div>
					<!-- 集团 canvas2 -->
					<div class="jt-right fl" >
						<div class="jt-right-h">
							<div class="fl">总装机容量<br/>
								<div class='zong'>121334</div>MW
							</div>		
							<div class="fl">年度计划发电量<br/>
								<div class='zong'>991334</div>亿kWh
							</div>
							<div class="fl">月计划发电量<br/>
								<div class='zong'>xxxx</div>亿kWh
							
							</div>	
							<div class="clearfix"></div>			
						</div>
						<div class="jt-right-canvas" style="clear:both">
						
							<div id="huanxing1" style="height:173px;float:left"></div>
							<div id="huanxing2" style="height:173px;float:left"></div>
							<div id="huanxing3" style="height:173px;float:right"></div>
							<div class="clearfix"></div>
							
						</div>					
						 <div class="jt-right-bottom">
							 <div class="fl" style="width:33%">运行机组负荷 </div>
							<div class="fl" style="width:34%">年发电完成率</div>
							<div class="fl" style="width:30%">月计划完成率</div>
						
						</div> 
						
					
					
					</div>
				</div>	
				<!--table3 -->
				<div class="class_main1 class_main5 fl  wj_ma h293">
					<h3 class="pointer wj_bod">
						<b class="title_active1" onclick="JTbaojing(0)">运行机组报警</b>
						<b onclick="JTbaojing(1)">停机机组报警</b>
						<!-- <b onclick="yjtz_show()">预警通知单</b> -->
					</h3>
					<div class="du_more"><a href="http://10.44.1.160:7001/jsjd/main?xwl=23WPD5TO7GWR" target="_blank">更多&gt;</a></div>
					<div class="clearfix"></div>
					
					<div id="rongqi2" style="display: block;">
						<table id="baojingxinxi" class="wj_cen">
							<thead>
								<tr>
									<td style="width: 22%; overflow: hidden;">电厂</td>
									<td style="width: 18%; overflow: hidden">报警测点</td>
									<td style="width: 20%; overflow: hidden">报警级别</td>
									<td style="width: 22%; overflow: hidden">报警值</td>
									<td style="width: 18%; overflow: hidden">报警时间</td>
								</tr>
							</thead>
							<tbody id='JTbaojing'>
								
							</tbody>
							
						</table>
					</div>
					
					
				</div>

				<!--table4 -->
				
		<div class="class_main1 class_main5 fl h213">
				<h3 class="pointer wj_bod">
					<b id="wj_kh" class="title_active1" onclick="JTkhhz_show()">考核汇总</b>
					<b id="wj_db" onclick="JTdbgl_show()">对标管理</b>					
				</h3>
				
				<div class="du_more">
				 <a id="wj_db_more"></a>
				</div>
				<div class="clearfix"></div>
				<table class="JTkhhz wj_cen">
					<thead>
						<tr>
							<td style="width: 20%; overflow: hidden;">电厂</td>
							<td style="width: 20%; overflow: hidden;">设备报警</td>
							<td style="width: 20%; overflow: hidden;">定期工作</td>
							<td style="width: 20%; overflow: hidden;">无效测点</td>
							<td style="width: 20%; overflow: hidden;">共计</td>
						</tr>
					</thead>
					<tbody id="kaohehuizong">
					<!--
						<tr>
							<td style="width: 20%; overflow: hidden;">岱海发电</td>
							<td style="width: 20%; overflow: hidden;">500</td>
							<td style="width: 20%; overflow: hidden;">200</td>
							<td style="width: 20%; overflow: hidden;">300</td>
							<td style="width: 20%; overflow: hidden;">1000</td>
						</tr>
						<tr>
							<td style="width: 20%; overflow: hidden;">宁东发电</td>
							<td style="width: 20%; overflow: hidden;">600</td>
							<td style="width: 20%; overflow: hidden;">300</td>
							<td style="width: 20%; overflow: hidden;">100</td>
							<td style="width: 20%; overflow: hidden;">1000</td>
						</tr>
						<tr>
							<td style="width: 20%; overflow: hidden;">岱海发电</td>
							<td style="width: 20%; overflow: hidden;">500</td>
							<td style="width: 20%; overflow: hidden;">200</td>
							<td style="width: 20%; overflow: hidden;">300</td>
							<td style="width: 20%; overflow: hidden;">1000</td>
						</tr>
						<tr>
							<td style="width: 20%; overflow: hidden;">宁东发电</td>
							<td style="width: 20%; overflow: hidden;">600</td>
							<td style="width: 20%; overflow: hidden;">300</td>
							<td style="width: 20%; overflow: hidden;">100</td>
							<td style="width: 20%; overflow: hidden;">1000</td>
						</tr>-->
					</tbody>
					

				</table>
				<table class="JTdbgl wj_cen" style="display:none;">
				<thead>
					<tr>
						<td style="width: 25%; overflow: hidden;">电厂</td>
						<td style="width: 25%; overflow: hidden;">奖励金额</td>
						<td style="width: 25%; overflow: hidden;">本次排名</td>
						<td style="width: 25%; overflow: hidden;">上季度排名</td>
						
					</tr>
				</thead>
				<tbody id="">
				<!--
					<tr>
						<td style="width: 20%; overflow: hidden;">岱海发电</td>
						<td style="width: 20%; overflow: hidden;">500</td>
						<td style="width: 20%; overflow: hidden;">200</td>
						<td style="width: 20%; overflow: hidden;">300</td>
						<td style="width: 20%; overflow: hidden;">1000</td>
					</tr>
					
					<tr>
						<td style="width: 20%; overflow: hidden;">宁东发电</td>
						<td style="width: 20%; overflow: hidden;">600</td>
						<td style="width: 20%; overflow: hidden;">300</td>
						<td style="width: 20%; overflow: hidden;">100</td>
						<td style="width: 20%; overflow: hidden;">1000</td>
					</tr>-->
				</tbody>
					
					
				</table>
			</div>
				<!--5table-->
				
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b class="title_active1" onclick="shengchanbaobiao_show()">生产报表</b> 
						<b onclick="jiandubaobiao_show()">监督报表</b>
					</h3>
					<div class="du_more">
						<a href="${ctx}/smartBI.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table  class="shengchanbaobiao_view wj_cen">
						<thead>
							<tr>
								<td style="width: 30%; overflow: hidden;">类型</td>
								<td style="width: 40%; overflow: hidden;">编号</td>
								<td style="width: 30%; overflow: hidden;">名称</td>
							</tr>
						</thead>
						<tbody id="shengchanbaobiao">
						<!--
							<tr>
								<td style="width: 30%; overflow: hidden;">日报</td>
								<td style="width: 40%; overflow: hidden;">jnjt20160125</td>
								<td style="width: 30%; overflow: hidden;">集团1月25日报表汇总</td>
							</tr>
							<tr>
								<td style="width: 30%; overflow: hidden;">日报</td>
								<td style="width: 40%; overflow: hidden;">jnjt20160124</td>
								<td style="width: 30%; overflow: hidden;">集团1月24日报表汇总</td>
							</tr>
							<tr>
								<td style="width: 30%; overflow: hidden;">周报</td>
								<td style="width: 40%; overflow: hidden;">jnjt20160102</td>
								<td style="width: 30%; overflow: hidden;">集团第2周报表汇总</td>
							</tr>
							<tr>
								<td style="width: 30%; overflow: hidden;">周报</td>
								<td style="width: 40%; overflow: hidden;">jnjt20160101</td>
								<td style="width: 30%; overflow: hidden;">集团第2周报表汇总</td>
							</tr>-->
						</tbody>
						
					</table>
					<table class="jiandubaobiao_view wj_cen" style="display: none;">
						<thead>
							<tr>
								<td style="width: 20%; overflow: hidden;">编号</td>
								<td style="width: 20%; overflow: hidden;">报表名称</td>
								<td style="width: 20%; overflow: hidden;">专业</td>
								<td style="width: 20%; overflow: hidden;">上报单位</td>
								<td style="width: 20%; overflow: hidden;">上报日期</td>
							</tr>
						</thead>
						<tbody id="JTjianduTable">
						<!--
							<tr>
								<td style="width: 20%; overflow: hidden;">dhfd20160201001</td>
								<td style="width: 20%; overflow: hidden;">2016年1月环保月报</td>
								<td style="width: 20%; overflow: hidden;">环保</td>
								<td style="width: 20%; overflow: hidden;">岱海发电</td>
								<td style="width: 20%; overflow: hidden;">2016/2/1</td>
							</tr>
							<tr>
								<td style="width: 20%; overflow: hidden;">ndfdd20160201001</td>
								<td style="width: 20%; overflow: hidden;">2016年1月环保月报</td>
								<td style="width: 20%; overflow: hidden;">环保</td>
								<td style="width: 20%; overflow: hidden;">宁东发电</td>
								<td style="width: 20%; overflow: hidden;">2016/2/1</td>
							</tr>-->
						</tbody>
					</table>
				</div>
				<!--table6-->
				
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b id="wj_jt_dq" class="title_active1" onclick="JTdqsy_show()">定期试验</b>
						<b id="wj_jt_sb" onclick="JTsblh_show()">设备轮换</b>
					</h3>
					<div class="du_more">
					<a id="wj_jt_more" href="${ctx}/newNavIndex/jtdingqishiyan/jthuizong.html" target="_blank">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="jdzx wj_cen">
						<thead>
							<tr>
								<td style="width: 20%; overflow: hidden;">电厂</td>
								<td style="width: 20%; overflow: hidden;">本年应进行</td>
								<td style="width: 20%; overflow: hidden;">本年已完成</td>
								<td style="width: 20%; overflow: hidden;">本月应进行</td>
								<td style="width: 20%; overflow: hidden;">本月已完成</td>
							</tr>
						</thead>
						<tbody id="JTdqsy">
						<!--
							<tr>
								<td style="width: 20%; overflow: hidden;">岱海发电</td>
								<td style="width: 20%; overflow: hidden;">800</td>
								<td style="width: 20%; overflow: hidden;">60</td>
								<td style="width: 20%; overflow: hidden;">70</td>
								<td style="width: 20%; overflow: hidden;">60</td>
							</tr>
							<tr>
								<td style="width: 20%; overflow: hidden;">宁东发电</td>
								<td style="width: 20%; overflow: hidden;">800</td>
								<td style="width: 20%; overflow: hidden;">60</td>
								<td style="width: 20%; overflow: hidden;">70</td>
								<td style="width: 20%; overflow: hidden;">60</td>
							</tr>
							<tr>
								<td style="width: 20%; overflow: hidden;">岱海发电</td>
								<td style="width: 20%; overflow: hidden;">800</td>
								<td style="width: 20%; overflow: hidden;">60</td>
								<td style="width: 20%; overflow: hidden;">70</td>
								<td style="width: 20%; overflow: hidden;">60</td>
							</tr>
							<tr>
								<td style="width: 20%; overflow: hidden;">宁东发电</td>
								<td style="width: 20%; overflow: hidden;">800</td>
								<td style="width: 20%; overflow: hidden;">60</td>
								<td style="width: 20%; overflow: hidden;">70</td>
								<td style="width: 20%; overflow: hidden;">60</td>
							</tr>-->
						</tbody>
						<tbody id="JTsblh" style="display: none;">
						<!--
							<tr>
								<td style="width: 20%; overflow: hidden;">岱海发电</td>
								<td style="width: 20%; overflow: hidden;">800</td>
								<td style="width: 20%; overflow: hidden;">60</td>
								<td style="width: 20%; overflow: hidden;">70</td>
								<td style="width: 20%; overflow: hidden;">60</td>
							</tr>
							<tr>
								<td style="width: 20%; overflow: hidden;">宁东发电</td>
								<td style="width: 20%; overflow: hidden;">800</td>
								<td style="width: 20%; overflow: hidden;">60</td>
								<td style="width: 20%; overflow: hidden;">70</td>
								<td style="width: 20%; overflow: hidden;">60</td>
							</tr>-->
						</tbody>
					</table>
				</div>
				<!-- table7 -->
				
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b id="wj_jt_yc" class="title_active1" onclick="JTycqk_show()">异常情况</b>
						<b id="wj_jt_yj" onclick="JTyjtzd_show()">预警通知单</b>
					
					</h3>
					<div class="du_more">
					<a id="wj_yc_more" href="${ctx}/newNavIndex/jtyichangqingkuang/jthuizong.html" target="_blank">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="JTycqk wj_cen">
						<thead>
							<tr>
								<td style="width: 25%; overflow: hidden;">电厂</td>
								<td style="width: 25%; overflow: hidden">本年发生(次)</td>
								<td style="width: 25%; overflow: hidden">历史累计(次)</td>
								<td style="width: 25%; overflow: hidden">未消除异常</td>	
							</tr>
						</thead>
						<tbody id="ycqktable">
							<!--<tr>
								<td style="width: 25%; overflow: hidden;">岱海发电</td>
								<td style="width: 25%; overflow: hidden">0</td>
								<td style="width: 25%; overflow: hidden">0</td>
								<td style="width: 25%; overflow: hidden">0</td>	
							</tr>
							<tr>
								<td style="width: 25%; overflow: hidden;">宁东发电</td>
								<td style="width: 25%; overflow: hidden">2</td>
								<td style="width: 25%; overflow: hidden">5</td>
								<td style="width: 25%; overflow: hidden">1</td>	
							</tr>-->
						</tbody>
					</table>

					<table class="JTyjtzd wj_cen" id="" style="display:none;">
						<thead>
							<tr>
							<td style="width: 25%; overflow: hidden">预警时间</td>
							<td style="width: 25%; overflow: hidden">预警描述</td>
							<td style="width: 25%; overflow: hidden">预警级别</td>														
							<td style="width: 25%; overflow: hidden;">电厂</td>
								
								
							<td style="width: 25%; overflow: hidden">专业</td>	
									
							</tr>
						</thead>
						<tbody id="yjtzd">
						<!--	<tr>
							<td style="width: 20%; overflow: hidden">2016/1/22</td>													<td style="width: 20%; overflow: hidden">某设备振动大，可能导致机组跳机</td>			
								<td style="width: 20%; overflow: hidden;">岱海发电</td>
								<td style="width: 20%; overflow: hidden">一般预警</td>
							
								<td style="width: 20; overflow: hidden">汽机</td>	
								
							</tr>-->						
						</tbody>
						
					</table>
				</div>
				
				
				<!--table8  -->
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b class="title_active1" onclick="">技改模型</b>
						
					</h3>
					<div class="du_more"> 更多>
						<!--<%-- <a href="${ctx}/newNavIndex/jianduzhixing.jsp">更多></a> --%>-->
					</div>
					<div class="clearfix"></div>
					<table class="ycqk wj_cen">
						<thead>
							<tr>
								<td style="width: 33%; overflow: hidden;">电厂</td>
								<td style="width: 34%; overflow: hidden">技改类型</td>
								<td style="width: 33%; overflow: hidden">数量</td>
								
							</tr>
						</thead>
						<tbody id="ycqktable">
						<!--
							<tr>
								<td style="width: 33%; overflow: hidden;">岱海发电</td>
								<td style="width: 34%; overflow: hidden">在线</td>
								<td style="width: 33%; overflow: hidden">5</td>
								
							</tr>
							<tr>
								<td style="width: 33%; overflow: hidden;">宁东发电</td>
								<td style="width: 34%; overflow: hidden">离线</td>
								<td style="width: 33%; overflow: hidden">9</td>
								
							</tr>-->
						</tbody>
					</table>
					
				</div>
				<!--table9 -->
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b class="title_active1" onclick="">通知公告</b>
						
					</h3>
					<div class="du_more"><a href="/jsjd/main?xwl=23WPD5TO7KQ1"> 更多></a>
						<!--<%-- <a href="${ctx}/newNavIndex/jianduzhixing.jsp">更多></a> --%>-->
					</div>
					<div class="clearfix"></div>
					<table class="ycqk wj_cen">
						<thead>
							<tr>
								<td style="width: 50%; overflow: hidden;">通知(公告)内容</td>
								<td style="width: 25%; overflow: hidden">发布单位</td>
								<td style="width: 25%; overflow: hidden">发布时间</td>
								
							</tr>
						</thead>
						<tbody id="JTtz">
							<!--<tr>
								<td style="width: 50%; overflow: hidden;">定于2月1日到各厂进行安全检查</td>
								<td style="width: 25%; overflow: hidden">京能集团</td>
								<td style="width: 25%; overflow: hidden">2016/1/25</td>
								
							</tr>-->
							
						</tbody>
					</table>
					
				</div>
      </div>
			<div class="clearfix"></div>
		</div>

	</div>

	<!--<script src="../jquery-1.11.1.min.js"></script>-->
	<!--<script src="select2css.js"></script>-->

	<div class="lineDiv" id="lineDiv" style="overflow: auto">
		<!-- 关闭div -->
		<div style="border: 0px black solid; height: 20px; text-align: right;">
			<a id="closeDiv" onclick="closeDiv()" href='javascript:void(0)'
				style="font-size: 1.1em; line-height: 25px; font-family: '微软雅黑'">关闭&nbsp;</a>
		</div>
		<input hidden="true" value="" id="selectPicode"> <input
			hidden="true" value="" id="selectPiname"> <input
			hidden="true" value="" id="method"> <input hidden="true"
			value="" id="points">
		<!-- 折线图显示的div -->
		<div id="myChart" style="height: 300px; width: 660px"></div>
		<!-- 测点数据的信息 -->
		<div id="pointsInfo" style="height: 40px; font-size: 17px"></div>
		<!-- <div id="methods" style="height: 20px"></div> -->
	</div>
	
	
	
	
	<script src="${ctx}/newNavIndex/js/echarts2.js"></script>
	<!--<script src="http://echarts.baidu.com/build/dist/echarts-all.js"></script>-->
	<script src="<%=path%>/final/js/jquery-1.9.1.js"
		type="text/javascript"></script>
	<script type="text/javascript" src="<%=path%>/final/js/line.js"></script>
	<script src="<%=request.getContextPath()%>/echars/dist/echarts.js"></script>
	<script
		src="<%=request.getContextPath()%>/echars/asset/js/esl/esl.js"></script>
	<script src="<%=request.getContextPath()%>/tab/sssj_util.js"></script>
	<script src="${ctx}/newNavIndex/js/jquery.js"></script>
	<script src="${ctx}/newNavIndex/js/portal.js"></script>
	<script src="${ctx}/newNavIndex/js/jt-index.js"></script>
	<script src="${ctx}/newNavIndex/js/charts.js"></script>
	<script type="text/javascript">
					//加载echarts组件
					var myChart;
					var option;
					require.config({
						paths : {
							echarts : '<%=request.getContextPath()%>/echars/www/js/'
			}
		});
		require([ 'echarts', 'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		], function(ec) {
			initEcharts(ec);
		});
	</script>
	<!--下拉框兼容ie-->
	<script type="text/javascript">
		window.onload = function() {
			function isIE() { //ie?  
				if (!!window.ActiveXObject || "ActiveXObject" in window)
					return true;
				else
					return false;
			}
			if (isIE()) {
				document.getElementById
				document.getElementById('spec').style.background = 'none';
				document.getElementById('org').style.background = 'none';
			} else {

				document.getElementById('spec').style.background = 'url(' + ctx
						+ '/newNavIndex/img/icon.png) no-repeat right center';
				document.getElementById('org').style.background = 'url(' + ctx
						+ '/newNavIndex/img/icon.png) no-repeat right center';
			}
		}
	</script>
</body>
</html>