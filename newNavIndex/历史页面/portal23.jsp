<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>京能集团实时技术监督生产管理系统</title>
	<c:set var="ctx" value="${pageContext.request.contextPath}"
		scope="request" />
	<link rel="stylesheet" href="${ctx}/newNavIndex/css/style12-21.css" />
	<script type="text/javascript">
		var ctx = "${ctx}";
	</script>
</head>
<body>
	<div id="main">
		<div class="du_top">
			<div class="du_top_left fl">
				<select id="spec" name="language" class="pull_down" id="marjor_pulldown">
					<c:forEach items="${specList}" var="spec">
						<option value="${spec.ID}">${spec.NAME}</option>
					</c:forEach>
				</select>
			</div>
			<div class="du_top_right fl">
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
				<div class="class_main1_main">
					<div class="circle">
						<div class="fl circle1" style="line-height: 60px;display:none;">1#机组</div>
						<div class="fl circle1 circle2"
							style="text-align: right; line-height: 60px;display:none;">2#机组</div>
						<div class="fl circle1 circle3" style="line-height: 150px;display:none;">3#机组</div>
						<div class="fl circle1 circle4"
							style="text-align: right; line-height: 150px;display:none;">4#机组</div>
						<div class="circle_data circle_data1" style="display:none;"></div>
						<div class="circle_data circle_data2" style="display:none;"></div>
						<div class="circle_data circle_data3" style="display:none;"></div>
						<div class="circle_data circle_data4" style="display:none;"></div>
					    <!--双机组-->
				        <div class="fl circle5"  style="display:none;">1#机组</div>
				        <div class="fl circle6"  style="display:none;">2#机组</div>
				        <!--单机组-->
				        <div class="fl circle7"  style="display:none;"></div>
				        
				        <div class="circle_data5 "  style="display:none;">98%</div>
      					<div class="circle_data6 "  style="display:none;">98%</div>
      					<!--单机组-->
      					<div class="circle_data7"  style="display:none;">77%</div>
				        
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
						<td><a href="http://10.10.10.32:7001/jsjd/main?xwl=23YA0QJSVS7L" >机组状态参数</a></td>
      					<td><a href="https://10.44.1.159/Coresight">全厂系统总览</a></td>
					</tr>
				</table>
			</div>
			<!--table2-->
			<div class="class_main1 class_main2">
				<h3>报警信息</h3>
				<div class="du_more"><a href="http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR">更多></a></div>
				<div style="height: 32px; font-size: 14px;">
					<div class="fl pointer"
						style="height: 28px; line-height: 32px; margin: 0 10px;" >
						<a href="javascript:void(0);" onclick="changeBaojing(0);">运行机组报警</a>
					</div>
					<div class="fl pointer" style="height: 28px; line-height: 32px" onclick="changeBaojing(1);">
						<a href="javascript:void(0);" onclick="changeBaojing(1);">停机机组报警</a>
					</div>
					<div class="clearfix"></div>
				</div>
				<table style="margin-top: 0;">
					<thead>
						<tr style="height: 40px; line-height: 40px">
							<td>测点名称</td>
							<td>报警级别</td>
							<td>报警值</td>
							<td>报警时间</td>
						</tr>
					</thead>
					<tbody id="baojingTable">
					</tbody>
				</table>
			</div>
			<!--table3-->
			<div class="class_main1 class_main3">
				<h3>监督报表</h3>
				<div class="du_more"><a href="${ctx}/newNavIndex/jiandubaobiao.jsp">更多></a></div>
				<table>
					<thead>
						<tr>
							<td>报表编号</td>
							<td>报表名称</td>
							<td>创建人</td>
							<td>创建日期</td>
						</tr>
					</thead>
					<tbody id="jianduTable">
					</tbody>
				</table>
			</div>

			<!--table4-->
			<div class="class_main1 class_main6">
				<h3>监督执行</h3>
				<div class="du_more"><a href="${ctx}/newNavIndex/jianduzhixing.jsp">更多></a></div>
				<table>
					<thead>
						<tr>
							<td>编号</td>
							<td>执行项目</td>
							<td>上报人</td>
							<td>上报时间</td>
						</tr>
					</thead>
					<tbody id="jianduzhixingTable">
					</tbody>
				</table>
			</div>

			<!--table5-->

			<div  class="class_main1 class_main3">
				<h3>预警通知单</h3>
				<div class="du_more">更多></div>
				<table>
					<thead>
						<tr>
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

			<!--table6-->
			<div class="class_main1 class_main3">
				<h3>监督计划/总结</h3>
				<div class="du_more"><a href="${ctx}/newNavIndex/jiandu-zj.jsp">更多></a></div>
				<div style="height: 32px; font-size: 14px;">
					<div class="fl pointer"
						style="height: 28px; line-height: 32px; margin: 0 10px;">
						<a href="javascript:void(0);" onclick="changeZongjie(0);">监督计划</a>
						</div>
					<div class="fl pointer" style="height: 28px; line-height: 32px">
					<a href="javascript:void(0);" onclick="changeZongjie(1);">监督总结</a>
					</div>
					<div class="clearfix"></div>
				</div>
				<table style="margin-top: 0;">
					<thead>
						<tr>
							<td>计划编号</td>
							<td>计划名称</td>
							<td>创建人</td>
							<td>创建时间</td>
						</tr>
					</thead>
					<tbody id="zongjieTable">
					</tbody>
				</table>
			</div>
			<!--7table-->
			<div class="class_main1 class_main3">
				<h3>技改项目</h3>
				<div class="du_more"><a href="${ctx}/newNavIndex/zaixian。html">更多></a></div>
				<div style="margin: 10px 0;z-index:1000000;">
					<div id="projectId1" class="fl title_active" style="margin: 0 5%; cursor: pointer">
					</div>
					<div id="projectId2" class="fl" style="cursor: pointer"></div>
					<a href="###">查看详细信息</a>
					<div class="clearfix"></div>
				</div>
				<div id="my_echart"
					style="width: 420px; height: 250px; position: absolute; left: -30px; top: 60px;"></div>
				<!--<div class="table_view" >
                <div class="table_left">收益(万元)</div>

                <div class="table_view1">
                    昨日收益<br/>
                    <span>111</span>
                </div>
                <div class=" table_view2">
                    今日实时收益<br/>
                    <span>12312</span>
                </div>
                <div class=" table_view3">
                    累计收益<br/>
                    <span>32334</span>
                </div>
                <div class=" table_view4"></div>
                <div class="table_bottom">累计运行时间(小时)</div>
            </div>-->

			</div>

			<!--8table-->
			<div class="class_main1 class_main9 class_main7">
				<h3>生产报表</h3>
				<div class="du_more">更多></div>
				<table>
					<table>
						<tbody>
							<tr>
								<td><div>
										<a href="#"> <img src="${ctx}/newNavIndex/img/report2.jpg" title="生产日报" />
										</a>
									</div></td>
								<td><div>
										<a href="#"> <img src="${ctx}/newNavIndex/img/report1.jpg" title="生产月报" />
										</a>
									</div></td>
								<td><div>
										<a href="#"> <img src="${ctx}/newNavIndex/img/report3.jpg" title="生产周报" />
										</a>
									</div></td>
							</tr>
							<tr>
								<td><div>
										<a href="#"> <img src="${ctx}/newNavIndex/img/report4.jpg" title="集团生产日报" />
										</a>
									</div></td>
								<td><div>
										<a href="#"> <img src="${ctx}/newNavIndex/img/report5.jpg" title="集团生产周报" />
										</a>
									</div></td>
								<td><div>
										<a href="#"> <img src="${ctx}/newNavIndex/img/report6.jpg" title="集团生产年报" />
										</a>
									</div></td>
							</tr>
						</tbody>
					</table>
					</div>

					<!--9table-->
					<div class="class_main1 class_main7 class_main9">
						<h3>快速导航</h3>
						<div class="du_more"></div>
						<table>
							<tbody>
								<tr>
									<td align="center"><div>
											<a href="${ctx}/main?xwl=23VKVPUL841Y">
												<img src="${ctx}/newNavIndex/img/wddb.png" title="我的待办" />
											</a>
										</div></td>
									<td align="center"><div>
											<a href="${ctx}/main?xwl=23WS4LY0CY47">
												<img src="${ctx}/newNavIndex/img/jtbz.png" title="集团标准" />
											</a>
										</div></td>
								</tr>
								<tr>
									<td align="center"><div>
											<a
												href="${ctx}/graph.do?method=initPage">
												<img src="${ctx}/newNavIndex/img/jdwl.png" title="监督网络" />
											</a>
										</div></td>
									<td align="center"><div>
											<a href="${ctx}/main?xwl=23X1WI0JO26Q">
												<img src="${ctx}/newNavIndex/img/zlxz.png" title="资料下载" />
											</a>
										</div></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="clearfix"></div>
					</div>
					</div>
					<!--<script src="../jquery-1.11.1.min.js"></script>-->
					<!--<script src="select2css.js"></script>-->
					<script src="${ctx}/newNavIndex/js/echarts-all.js"></script>

					<!--<script src="http://echarts.baidu.com/build/dist/echarts-all.js"></script>-->

					<script src="${ctx}/newNavIndex/js/jquery.js"></script>
					<script src="${ctx}/newNavIndex/js/portal.js"></script>
</body>
</body>
</html>