
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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


<html lang="zh-CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>京能集团实时技术监督生产管理系统</title>
	<c:set var="ctx" value="${pageContext.request.contextPath}"
		scope="request" />
	<link rel="stylesheet" href="${ctx}/newNavIndex/css/style12-21.css" />
	<script type="text/javascript">
		var ctx = "${ctx}";
	</script>
	
<% 
  HashMap map=(HashMap)session.getAttribute("XzSessionVars");
  String _userId=(String)map.get("userId");
  String _userName=(String)map.get("userName");
  String path=request.getContextPath();
  %>
</head>
<body>	
	<div id="main">
		<div class="du_top">
			
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
			
			
			<div class="du_top_left">
				<select id="spec" name="language" class="pull_down" id="marjor_pulldown">
					<!--<c:forEach items="${specList}" var="spec">
						<option id="#wj_spec"  value="${spec.ID}">${spec.NAME}</option> 
						
					</c:forEach> -->
					
					<c:forEach items="${specList}" var="spec">
						<option id="wj_spec" value="${spec.ID}">${spec.NAME}</option> 
						
					</c:forEach>
					<option  value="2c89e177-26e1-48dd-a844-b4661bb6e00f">绝缘</option>
					<option  value="7ebef882-8cbf-4729-8c25-1b2558ed9a60">金属</option>
					<option  value="93188b01-4b8b-461a-8e28-65cd03fade65">化学</option>
					<option  value="af3f2df3-4030-47ce-828b-4f02f6f39243">电测</option>
					<option  value="4cfbad50-6b92-4b78-a6dd-fcadf6e5fdac">电能</option>
					<option  value="2dcd1a02-3b3d-4dd3-a554-c6b33f254de0">热工</option>
					<option  value="f2df9251-e408-4073-90a2-967f4c85cab6">环保</option>
					<option  value="5daeaa7d-5141-46b1-b857-ebd74be42118">节能</option>
					<option  value="e4fd5a5f-f21b-4608-9104-49d82b4a45f7">继保</option>
					<option  value="7491dd42-c94c-46fa-b82d-65e7c320593b">压力容器</option>
					<option  value="cca16d73-e72a-4643-9b95-a8e7328e9b94">计量</option>
					<option  value="12b4521c-090b-427d-800b-c23d2a6af8f5">励磁系统</option>
					<option  value="a9b32dc4-e5ee-44cf-b98e-9009d30b3a54">振动</option>
					<option  value="c8a1b764-b850-4f25-8dca-7ca1d9f6bfbc">特种设备</option>
				</select>
			</div>
			<div class="du_top_left">
				<ul>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<select id="org" style="float: right;"
					class="pull_down">
					<option value="c21834b4-1cb0-490f-a2a8-deeaf7f7e065">岱海发电</option>
					<option value="472212af-1977-462b-a74a-a1f36ed6562d">宁东发电</option>
					<option value="a61365e2-969d-4352-b3f8-805027ab9f1d">京能集团</option>
				</select>
			</div>
			<div class="clearfix"></div>
			<div class="clearfix"></div>
		</div>
		<div id="du_main">
		
			<!--table1-->
			<div class="class_main1">
				<h3>实时监控</h3>
				<div class="du_more"></div>
				<div id="yibiaopan" style="width:383px;height:220px; display:none;"></div>
				<div class="class_main1_main">
					<div class="circle">
						<div class="fl circle1" style="line-height: 60px;background-image: url('${ctx}/newNavIndex/img/pause.png');">#1机组</div>
						<div class="fl circle1 circle2"
							style="text-align: right; line-height: 60px;background-image: url('${ctx}/newNavIndex/img/pause.png')">#2机组</div>
						<div class="fl circle1 circle3" style="line-height: 150px;background-image: url('${ctx}/newNavIndex/img/pause.png')">#3机组</div>
						<div class="fl circle1 circle4"
							style="text-align: right; line-height: 150px;background-image: url('${ctx}/newNavIndex/img/pause.png')">#4机组</div>
						<div class="circle_data circle_data1" style="">0.0%</div>
						<div class="circle_data circle_data2" style="">0.0%</div>
						<div class="circle_data circle_data3" style="">0.0%</div>
						<div class="circle_data circle_data4" style="">0.0%</div>
					    <!--双机组-->
				        <div class="fl circle5"  style="display:none;">#1机组</div>
				        <div class="fl circle6"  style="display:none;">#2机组</div>
				        <!--单机组-->
				        <div class="fl circle7"  style="display:none;"></div>
				        
				        <div class="circle_data5 "  style="display:none;">98%</div>
      					<div class="circle_data6 "  style="display:none;">98%</div>
      					<!--单机组-->
      					<div class="circle_data7"  style="display:none;">77%</div>
      					
      					 <!--  -->
				         <div id="circle_data21">
				         	<span id="fhl" title="全厂负荷率">负荷率</span><br/>
							<span id="zfh" title="总负荷">总负荷</span>
							
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
				<table style="margin-top: 0">
					<tr class="du_href">
						<td><a class="tiaozhuan" >机组状态参数</a></td>
      					<td><a href="http://10.44.1.159/Coresight">全厂系统总览</a></td>
					</tr>
				</table>
			</div>
			<!--table2-->
			<div class="class_main1 class_main2">
				<h3>指标一览</h3>
				<!-- 电厂视图 -->
				<div id="dczb" style="display:block;margin-top:20px">

				</div>
				<!-- 集团视图 -->
				<div id="jituanzhibiao" style="display:none;margin-top:10px;">
					<div class="jituan_wrap fl" style="margin-left:3.5%;margin-right:2px;">
                		<div class="fl" style="width:60%;height:63px;line-height:18px;margin-right:1px;border-right:1px solid #fff;padding-top:10px;">
                    		实时负荷<br>(MW)
                		</div>
                	<div class="jituanzhibiao1 fl" style="border-left:1px solie #000;border-right:1px solid #fff0"></div>
            	</div>

            	<div class="jituan_wrap fl" style="margin-left:0%;margin-right:2px;">
                		<div class="fl" style="width:60%;height:63px;line-height:18px;margin-right:1px;border-right:1px solid #fff;padding-top:10px;">
                   	 	本月计划<br>(万kWh)
                	</div>
                	 <div class="jituanzhibiao1 fl" style=""></div>
            	</div>
            	<div class="jituan_wrap fl" style="margin-left:3.5%;margin-right:2px;background:#fff">
                		<div class="fl" style="width:60%;height:63px;line-height:18px;margin-right:1px;border-right:1px solid #fff;padding-top:10px;">
                  	 今日发电量<br>(万kWh)
               		 </div>
                	 <div class="jituanzhibiao1 fl" style=""></div>
            	</div>


	            <div class="jituan_wrap fl" style="margin-left:0%;margin-right:2px;background:#fff">
                		<div class="fl" style="width:60%;height:63px;line-height:18px;margin-right:1px;border-right:1px solid #fff;padding-top:10px;">
	                    	昨日发电量<br>(万kWh)
	                </div>
	                
	                 <div class="jituanzhibiao1 fl" style=""></div>
	            </div>

	            <!--right-->
	            <div class="jituan_wrap fl" style="margin-left:3.5%;margin-right:2px;">
                		<div class="fl" style="width:60%;height:63px;line-height:18px;margin-right:1px;border-right:1px solid #fff;padding-top:10px;">
	                   	 本月发电量<br>(亿kWh)
	                </div>
	                 <div class="jituanzhibiao1 fl" style=""></div>
	            </div>
	
	            <div class="jituan_wrap fl" style="margin-left:0%;margin-right:2px;">
                		<div class="fl" style="width:60%;height:63px;line-height:18px;margin-right:1px;border-right:1px solid #fff;padding-top:10px;">
	                    	上月发电量<br>(亿kWh)
	                </div>
	                <div class="jituanzhibiao1 fl" style="height:60px;line-height:63px"></div>
	            </div>
	
	            <div class="jituan_wrap fl" style="margin-left:3.5%;margin-right:2px;background:#fff">
                		<div class="fl" style="width:60%;height:63px;line-height:18px;margin-right:1px;border-right:1px solid #fff;padding-top:10px;">
	                   	 年累计发电量<br>(亿kWh)
	                </div>
	                <div class="jituanzhibiao1 fl" style=""></div>
	            </div>
	
	           <div class="jituan_wrap fl" style="margin-left:0%;margin-right:2px;background:#fff">
                		<div class="fl" style="width:60%;height:63px;line-height:18px;margin-right:1px;border-right:1px solid #fff;padding-top:10px;">
	                   	 年计划发电量<br>(亿kWh)
	                </div>
	                <div class="jituanzhibiao1 fl" style=""></div>
	            </div>
						
				
				</div>
				
				
				
				
			</div>

			<!--table3-->
			<!-- 报警信息  -->
			<div class="class_main1 class_main2">
				<h3>报警信息</h3>
				<div class="du_more"><a class="baojinggenduo" href="http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR">更多></a></div>
				<div style="height: 32px; font-size: 14px;">
					<div class="fl pointer title_active title"
						style="height: 28px; line-height: 32px; margin: 0 10px;" >
						<a href="javascript:void(0);" onclick="changeBaojing(0);">运行机组报警</a>
					</div>
					<div class="fl pointer title" style="height: 28px; line-height: 32px" onclick="changeBaojing(1);">
						<a href="javascript:void(0);" onclick="changeBaojing(1);">停机机组报警</a>
					</div>
					<div class="fl pointer title" style="height: 28px;  margin: 0 10px;line-height: 32px" onclick="yjtz_show()"">
						<a href="javascript:void(0);" >预警通知单</a>
					</div>
					
					<div class="clearfix"></div>
				</div>
				<table id="baojingxinxi" >
					<thead>
						<tr style="height: 32px; line-height: 32px">
							<td>测点名称</td>
							<td>报警级别</td>
							<td>报警值</td>
							<td>报警时间</td>
						</tr>
					</thead>
					<tbody id="baojingTable">
					</tbody>
				</table>
				<table id="yujingtongzhidan" style="display:none">
					<thead>
						<tr style="height: 32px; line-height: 32px">
							<td>预警级别</td>
							<td>预警名称</td>
							<td>预警时间</td>
							<td>状态</td>
						</tr>
					</thead>
					<tbody id="yujingTable">
					</tbody>
				</table>
				
			</div>
		

			<!--table4-->
			<!-- 监督执行 -->
			<div class="class_main1 class_main6">
				<h3>监督执行</h3>
				<div class="du_more"><a href="${ctx}/newNavIndex/jianduzhixing.jsp">更多></a></div>
				<table>
					<thead>
						<tr>
							<td style="width:44px;overflow:hidden;">编号</td>
							<td  style="width:152px;overflow:hidden">执行项目</td>
							<td  style="width:69px;overflow:hidden">上报人</td>
							<td  style="width:97px;overflow:hidden">上报时间</td>
						</tr>
					</thead>
					<tbody id="jianduzhixingTable">
					</tbody>
				</table>
			</div>

			<!--table5-->

			<div  class="class_main1 class_main3" style="display:none">
				<!-- 预警通知单 -->
				<h3>预警通知单</h3>
				<div class="du_more"><a href="${ctx}/main?xwl=23WPD5TO7GWT">更多></a></div>
				
			</div>
			
				
			<!-- 监督报表  -->
			<div class="class_main1 class_main3" >
								
				<h3>生产报表</h3>
			
				<div class="du_more"><a class="shengchangenduo" href="${ctx}/newNavIndex/jiandubaobiao.jsp">更多></a></div>
				<div style="height: 32px; font-size: 14px;">
				<div class="fl pointer title title_active" style="height: 28px; line-height: 32px;margin: 0 10px;">
						<a href="javascript:void(0);" onclick="jiandubaobiao_show()">监督报表</a>
					</div>
					<div class="fl pointer title " style="height: 28px; line-height: 32px;">
						<a href="javascript:void(0);" onclick="shengchanbaobiao_show()">生产报表</a>
					</div>
					
					<div class="clearfix"></div>
				</div>
				
				
				<table class="jiandubaobiao_view">
					<thead>
						<tr>
							<td>报表编号</td>
							<td>报表名称</td>
							
							<td>创建日期</td>
						</tr>
					</thead>
					<tbody id="jianduTable">
					</tbody>
				</table>
				
				
				
				<table style="display:none" class="shengchanbaobiao_view">
					<!--  集团视图  -->
					<tbody class = "jituan_view">
						<tr>
							<td>
								<div>
									<a href="${ctx}/ReportServer?reportlet=dcscybb_hd_sc.cpt&op=view&GENERAL_ID=8ba07335-0875-49cd-b246-768ece3b7cdd" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 		集团生产日报
                              			 </a>
									
								</div></td>
							<td><div>
									<a href="${ctx}/ReportServer?reportlet=TES_PS_GENERAL_DCSCZB_VIEW.cpt&op=view" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  集团生产周报
                              			 </a>
									
								</div></td>
							<td><div>
									<a href="${ctx}/ReportServer?reportlet=SCZBYBB.cpt&op=view" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  集团生产月报
                              			 </a>
									
								</div></td>
						</tr>
						<tr>
							<td><div>
									<a href="${ctx}/ReportServer?reportlet=TES_PS_GENERAL_JTSCNB_VIEW.cpt&op=view" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  集团生产年报
                              			 </a>
									
								</div></td>
							<td><div>
									<a href="${ctx}/ReportServer?reportlet=2014JTSCZBFJ.cpt&op=view" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  集团指标分解
                              			 </a>
									
								</div></td>
							<td>	<div>
										<a href="${ctx}/ReportServer?reportlet=JJXZBHZ.cpt&op=view" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  经济指标汇总
                              			 </a>
                              			 </div></td>
						</tr>
					</tbody>
					<!--  电厂视图-->
					<tbody class="dianchang_view">
						<tr>
							<td >
								<div>
									<a href="${ctx}/newNavIndex/ribao.html" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  生产日报
                              			 </a>
									
								</div>
							</td>
							<td><div>
									<a href="${ctx}/newNavIndex/zhoubao.html" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  生产周报
                              			 </a>
									<%-- <a href="${ctx}/newNavIndex/zhoubao.html"> <img src="${ctx}/newNavIndex/img/report1.jpg" title="生产周报" />
									</a> --%>
								</div></td>
							<td><div>
									<a href="${ctx}/newNavIndex/yuebao.html" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  生产月报
                              			 </a>
									<%-- <a href="${ctx}/newNavIndex/yuebao.html"> <img src="${ctx}/newNavIndex/img/report3.jpg" title="生产月报" />
									</a> --%>
								</div></td>
						</tr>
						<tr>
							<td><div>
									<a href="#" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  生产年报
                              			 </a>
									
								</div></td>
							<td><div>
									<a href="#" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			考核分解
                              			 </a>
									
								</div></td>
							<td><div>
									<a href="#" class="ellipsis" style="height:100px;color:#fff; line-height:170px;font-size:14px;font-family: '黑体';  background: url(${ctx}/newNavIndex/img/report1.png) no-repeat 10px 0;">
                                 			  经济指标汇总
                              			 </a>
							</div></td>
						</tr>
					</tbody>
						
				</table>
			</div>




			<!--table6-->
			<div class="class_main1 class_main3">
				<!-- 监督计划/总结 -->
				<h3>监督计划/总结</h3>
				<div class="du_more"><a href="${ctx}/newNavIndex/jiandu-zj.jsp">更多></a></div>
				<div style="height: 32px; font-size: 14px;">
					<div class="fl pointer title title_active" style="height: 28px; line-height: 32px; margin: 0 10px;">
						<a href="javascript:void(0);" onclick="changeZongjie(0);">监督计划</a>
					</div>
					<div class="fl pointer title" style="height: 28px; line-height: 32px">
						<a href="javascript:void(0);" onclick="changeZongjie(1);">监督总结</a>
					</div>
					<div class="clearfix"></div>
				</div>
				<table>
					<thead>
						<tr>
							<td>编号</td>
							<td>名称</td>
							<td>创建人</td>
							<td>创建时间</td>
						</tr>
					</thead>
					<tbody id="zongjieTable">
					</tbody>
				</table>
			</div>
			<!--7table-->
			<div class="class_main1 class_main3" style="height:316px">
				<!-- 技改项目  -->
				<h3>技改项目</h3>
				<div class="du_more"><a href="${ctx}/newNavIndex/zaixian.html"></a></div>
				<div style="margin: 10px 0;z-index:1000000; display:none;" >
					<div id="projectId1" class="fl title_active" style="margin: 0 2%; cursor: pointer ">
					</div>
					<div id="projectId2" class="fl" style="cursor: pointer"></div>
					<a href="###" id="jigaiInf" style="color:#6DB1E0">查看详情</a>
					<div class="clearfix"></div>
				</div>
				<div id="my_echart" style="width: 420px; height: 250px; position: absolute; left: -30px; top: 60px; display:none;">
				</div>
				

			</div>

			<!--8table-->
			<div class="class_main1  class_main7" style="height:316px">
				<h3>监督工作</h3>
				<div class="fl pointer title title_active" style="height: 28px; line-height: 32px; margin: 0 10px;">
						<a href="javascript:void(0);" onclick="jdgz_view()">监督工作</a>
					</div>
					<div class="fl pointer title" style="height: 28px; line-height: 32px">
						<a href="javascript:void(0);" onclick="gztx_view()">工作提醒</a>
					</div>
					<div class="clearfix"></div>
					<div id="jdgz">
						<table>
	                    	<thead>
		                        <tr style="height:20px;line-height:20px">
		                            <td style="width:40px;">序号</td>
		                            <td  style="width:320px;">任务描述</td>
		                          
		                        </tr>
	                   		</thead>
		                </table>
	                	<div id="works" >
			                
	            		</div>
                	
					</div>
					<div id="gztx" style="display:none">
						<table>
	                    	<thead>
		                        <tr style="height:20px;line-height:20px">
		                            <td>序号</td>
		                            <td>消息描述</td>
		                            <td>提醒时间</td>
		                            <td>倒计时(天)</td>
		                        </tr>
	                   		</thead>
		                </table>
	                	<div id="mission" >
			            	
	            		</div>                	
					</div>																
			</div>

			<!--9table-->
			<div class="class_main1 class_main7 class_main9" style="height:316px">
				<h3>快速导航</h3>
				<div class="du_more"></div>
				<table>
					<tbody>
               		 <tr>
                   		 <td>
                        <div>
                            <a href="${ctx}/main?xwl=23VKVPUL841Y" class="ellipsis" style="height:100px; color:#fff;line-height:170px;font-size:14px;font-family: '黑体';background: url(${ctx}/newNavIndex/img/wddb.png) no-repeat 40px; margin-top: 10px; ">
                                	我的待办
                            </a>
                        </div>
                    </td>
                    <td>
                        <div>
                            <a href="${ctx}/main?xwl=23YUMQF1SP5Q" class="ellipsis" style="height:100px; color:#fff;line-height:170px;font-size:14px;font-family: '黑体';;background: url(${ctx}/newNavIndex/img/jtbz.png) no-repeat 40px;margin-top: 10px; ;">
                               	标准法规
                            </a>

                        </div>
                    </td>

                </tr>
                <tr>
                    <td>
                        <div>
                            <a href="${ctx}/graph.do?method=initPage" class="ellipsis" style="height:100px; color:#fff;line-height:170px;font-size:14px;font-family: '黑体';background: url(${ctx}/newNavIndex/img/jdwl.png) no-repeat 40px; margin-top: 10px; ">
                                	监督网络
                            </a>

                        </div>
                    </td>
                    <td>
                        <div>
                            <a href="${ctx}/main?xwl=23X1WI0JO26Q" class="ellipsis" style="height:100px; color:#fff;line-height:170px;font-size:14px;font-family: '黑体'; background: url(${ctx}/newNavIndex/img/zlxz.png) no-repeat 40px;margin-top: 10px; ">
                           		     资料下载
                            </a>
                        </div>
                    </td>

                </tr>

                </tbody>
						</table>
					</div>
					<div class="clearfix"></div>
					</div>
					</div>
					
					<!--<script src="../jquery-1.11.1.min.js"></script>-->
					<!--<script src="select2css.js"></script>-->
					
					<div class="lineDiv" id="lineDiv" style="overflow:auto" >
					<!-- 关闭div -->
					<div style="border:0px black solid;height: 20px;text-align:right;">
						<a id="closeDiv" onclick="closeDiv()" href='javascript:void(0)' style="font-size:1.1em;line-height:25px;font-family:'微软雅黑'" >关闭&nbsp;</a>	  
					</div>
				
					<input hidden="true" value="" id="selectPicode">
					<input hidden="true" value="" id="selectPiname">
					<input hidden="true" value="" id="method">
					<input hidden="true" value="" id="points">
					<!-- 折线图显示的div -->
					<div id="myChart" style="height:300px;width:660px" >
					</div>
					<!-- 测点数据的信息 -->
					<div id="pointsInfo" style="height:40px;font-size:17px"></div>
					<!-- <div id="methods" style="height: 20px"></div> -->
			 		</div>
					<script src="${ctx}/newNavIndex/js/echarts-all.js"></script>
					<!--<script src="http://echarts.baidu.com/build/dist/echarts-all.js"></script>-->
					<script src="<%=path %>/final/js/jquery-1.9.1.js" type="text/javascript"></script>
					<script type="text/javascript" src="<%=path %>/final/js/line.js"></script>
					<script src="<%= request.getContextPath() %>/echars/dist/echarts.js"></script>
			       	<script src="<%= request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
					<script src="<%= request.getContextPath() %>/tab/sssj_util.js"></script>
					<script src="${ctx}/newNavIndex/js/jquery.js"></script>
					<script src="${ctx}/newNavIndex/js/portal.js"></script>
					<script type="text/javascript">
					//加载echarts组件
					var myChart;
					var option;
					require.config({
						paths : {
							echarts : '<%=request.getContextPath() %>/echars/www/js/'
						}
					});
					require([ 'echarts', 
						          'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
						],function(ec){
							initEcharts(ec);
						}
					);
			
					</script> 
</body>
</body>
</html>