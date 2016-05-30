<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html lang="en">
<head>
<meta charset="utf-8">
<title>京能集团实时技术监督生产管理系统</title>
<c:set var="ctx" value="${pageContext.request.contextPath}"
		scope="request" />
	<link rel="stylesheet" href="${ctx}/newNavIndex/css/style12-21.css" />
	<script type="text/javascript">
		var ctx = "${ctx}";
	</script>
<link type="text/css" rel="stylesheet" href="css/news.css" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/SimpleTree.js"></script>
<script type="text/javascript" src="js/adddate.js"></script>
<script type="text/javascript">

$(function(){
	$(".st_tree").SimpleTree({
	});
});
</script>
</head>

<body id='jianduzhixing'>

  <div class="wu_top0"></div>
  <div class="wu_top1">
    <form method="post" action="?">
     <!-- <select name="choose" id="choose">
        <option value="选择风格" selected="selected">选择电厂</option>
        <option value="复古风">岱海发电</option>
        <option value="摇滚风">宁东发电</option>
      </select>-->
      <input name="" type="text" class="wu_top1a" placeholder="请输入日期" onclick="SelectDate(this,'yyyy-MM-dd')" />
      <input name="" type="button" class="wu_top1b" value="查 询" />
      <input name="" type="button" class="wu_top1b" value="导 出" />
      <input name="" type="button" class="wu_top1b" value="下 载" />
	   <input type="button" onclick="back()" class="wu_top1b" style="width:100px;line-height: 28px;background: green;float: right" value="返回到首页">
    </form>
  </div>
  <div class="wu_left">
    <div class="st_tree" id="st_tree">
    
         		<ul show="false">
						<li class="folder"><a href="#">岱海发电</a></li>
						<!--<ul show="false">-->
							<!--<li><a href="#">监督执行</a></li>-->
							<ul show="flase">
							<!--化学监督-->
								<li>化学监督</li>
									<ul show="false">
										<li>化学清洗</li>
										<li>异常情况</li>
										<li>机组大修化学监督检查</li>
										<li>热力设备停备用防锈蚀保养</li>
										<li>大宗材料验收化验</li>
										<li>化学仪表年检及校验</li>
										<li>热力设备停备用防锈蚀保养记录</li>
										<li>热力设备停备用防锈蚀保养总结</li>
										<li>热力设备停备用防锈蚀保养方案</li>
									</ul>
							<!--绝缘监督-->
								<li class="folder">绝缘监督</li>
									<ul show="flase">
										<li>试验报告</li>
										<li>红外成像记录</li>
									</ul>
							<!--金属监督-->
								<li class="open">金属监督</li>
									<ul show="false">
										<li>金属部件检验</li>
										<li>基建期金属监督管理</li>
										<li>备品备件入厂检验执行</li>
										<li>金属监督异常情况反馈</li>
										<li>受监部件焊接管理信息</li>
										<li>金属监督机组检修总结</li>
										<li>金属部件超温、超压月报表</li>
										<li>火力发电厂金属技术监督月报表</li>
										<li>火力发电厂金属技术监督</li>
										<li>金属监督机组检修</li>
										<li>金属备品备件入厂检验执行</li>
										<li>金属基建期金属监督管理</li>
										<li>金属受监部件焊接管理信息</li>
									</ul>
							<!--电测监督-->
								<li class="open">电测监督</li>
									<ul show="false">
										<li>电测仪器仪表检验季报表填报页面</li>
										<li>电测预览</li>
										<li>电测定期检验</li>
										<li>电测检修抽检</li>
									</ul>
							<!--电能质量监督-->
								<li class="open">电能质量监督</li>
									<ul show="flase">
										<li>年电能质量月AVC报表</li>
										<li>电能定期检验</li>
									</ul>
							<!--热工监督-->
								<li class="open">热工监督</li>
									<ul show="false">
										<li>性能评估及寿命管理</li>
										<li>热控重要数据分析</li>
										<li>热工控制电源切换实验</li>
										<li>热控标准化管理</li>
										<li>热控数据备份</li>
										<li>巡检记录</li>
										<li>定期检查</li>
										<li>热控定期校验化学仪表校验计划</li>
										<li>热控定期校验化学仪表校验结果</li>
										<li>实验室标准器校验周期报告</li>
										<li>燃油流量计校验周期及校验报告</li>
										<li>热控定期校验给煤机皮带秤定期校验报告</li>
										<li>DCS系统通道测试</li>
										<li>DCS系统接地测试</li>
										<li>SOE测试记录</li>
										<li>控制系统切换记录</li>
										<li>输煤皮带拉绳开关传动结果录入</li>
										<li>热控定期实验热工控制电源切换实验</li>
										<li>MFT热态实验</li>
										<li>氨泄露仪定期试验</li>
										<li>自动调节系统扰动试验</li>
										<li>保护系统传动试验</li>
										<li>主要热工仪表及DAS系统测量参数抽检</li>
										<li>热工DCS系统日常维护试验</li>
										<li>DCS系统故障记录</li>
										<li>热控资料共享系统疑难杂症求救信息发布</li>
										<li>实验设备集团联网共享</li>
										<li>题库共享</li>
										<li>应急预案上传</li>
										<li>实验室建标材料</li>
										<li>设备说明书上传</li>
										<li>热工技术规范</li>
										<li>技改资料</li>
										<li>机组一次调频试验分析录入</li>
										<li>机组AGC性能分析</li>
										<li>测点故障分析（实时数据）</li>
										<li>热工DCS控制系统分级授权记录</li>
										<li>持证上岗记录</li>
										<li>热控定期检查检验</li>
										<li>化学仪表检验结果</li>
										<li>给煤机皮带秤定期校验报告</li>
										<li>化学仪表校验计划</li>
										<li>系统疑难杂症求救信息发布</li>
										<li>定期校验</li>
									</ul>
							<!--环保监督-->
								<li class="open">环保监督</li>
									<ul show="false">
										<li>环保设施运行维护台账</li>
										<li>脱硫、脱硝CEMS记录</li>
									</ul>
							<!--节能监督-->
								<li class="open">节能监督</li>
									<ul show="false">
										<li>节能热力试验报告</li>
										<li>节能试验管理真空严密性试验</li>
										<li>烟道阻力实验</li>
										<li>试验管理</li>
										<li>机组投产后性能试验</li>
									</ul>
							<!--继保监督-->
								<li class="open">继保监督</li>
									<ul show="">
										<li>继保反措执行</li>
										<li>110kv及以上系统故障及保护动作情况月报表</li>
										<li>继电保护及安全自动装置年度校验计划表</li>
										<li>继电保护投入率报表</li>
										<li>继保事故分析简报更新</li>
										<li>继保定值管理</li>
										<li>继保事故分析简报</li>
										<li>继保定期测试</li>
									</ul>
							<!--压力容器及承压部件管理监督-->
								<li class="open">压力容器及承压部件管理监督</li>
									<ul show="false">
										<li>压力容器定期检验</li>
										<li>压力容器压力容器检修</li>
									</ul>
							<!--计量管理监督-->
								<li class="open">计量管理监督</li>
									<ul show="true">
										<li>计量定期检定</li>
									
									</ul>
							<!--励磁监督-->
								<li class="open">励磁监督</li>
									<ul show="true">
										<li>励磁事故分析简报</li>
										<li>励磁反措执行</li>
										<li>励磁试验报告</li>

									</ul>
							<!--振动监督-->
								<li class="open">振动监督</li>
									<ul show="true">
										<li>振动检验报告</li>
										<li>振动实验管理</li>
									</ul>
							<!--特种设备监督-->
								<li class="open">特种设备监督</li>
									<ul show="false">
										<li>整改问题</li>
										<li>整改问题审批</li>
										<li>会议纪要</li>
										<li>热工主要仪表抽检合格率统计表</li>
										<li>定期工作</li>
										<li>特种设备定期检验</li>
										<li>特种设备特种设备维保</li>
										<li>特种设备特种设备检修</li>
									</ul>
							</ul>
					<!--	</ul>-->
						<li class="folder"><a href="#">宁东发电</a></li>
							<!--<ul show="false">
							<li><a href="#">监督执行</a></li>-->
							<ul show="false">
							<!--化学监督-->
								<li>化学监督</li>
									<ul show="false">
										<li>化学清洗</li>
										<li>异常情况</li>
										<li>机组大修化学监督检查</li>
										<li>热力设备停备用防锈蚀保养</li>
										<li>大宗材料验收化验</li>
										<li>化学仪表年检及校验</li>
										<li>热力设备停备用防锈蚀保养记录</li>
										<li>热力设备停备用防锈蚀保养总结</li>
										<li>热力设备停备用防锈蚀保养方案</li>
									</ul>
							<!--绝缘监督-->
								<li class="folder">绝缘监督</li>
									<ul show="false">
										<li>试验报告</li>
										<li>红外成像记录</li>
									</ul>
							<!--金属监督-->
								<li class="open">金属监督</li>
									<ul show="false">
										<li>金属部件检验</li>
										<li>基建期金属监督管理</li>
										<li>备品备件入厂检验执行</li>
										<li>金属监督异常情况反馈</li>
										<li>受监部件焊接管理信息</li>
										<li>金属监督机组检修总结</li>
										<li>金属部件超温、超压月报表</li>
										<li>火力发电厂金属技术监督月报表</li>
										<li>火力发电厂金属技术监督</li>
										<li>金属监督机组检修</li>
										<li>金属备品备件入厂检验执行</li>
										<li>金属基建期金属监督管理</li>
										<li>金属受监部件焊接管理信息</li>
									</ul>
							<!--电测监督-->
								<li class="open">电测监督</li>
									<ul show="false">
										<li>电测仪器仪表检验季报表填报页面</li>
										<li>电测预览</li>
										<li>电测定期检验</li>
										<li>电测检修抽检</li>
									</ul>
							<!--电能质量监督-->
								<li class="open">电能质量监督</li>
									<ul show="false">
										<li>年电能质量月AVC报表</li>
										<li>电能定期检验</li>
									</ul>
							<!--热工监督-->
								<li class="open">热工监督</li>
									<ul show="false">
										<li>性能评估及寿命管理</li>
										<li>热控重要数据分析</li>
										<li>热工控制电源切换实验</li>
										<li>热控标准化管理</li>
										<li>热控数据备份</li>
										<li>巡检记录</li>
										<li>定期检查</li>
										<li>热控定期校验化学仪表校验计划</li>
										<li>热控定期校验化学仪表校验结果</li>
										<li>实验室标准器校验周期报告</li>
										<li>燃油流量计校验周期及校验报告</li>
										<li>热控定期校验给煤机皮带秤定期校验报告</li>
										<li>DCS系统通道测试</li>
										<li>DCS系统接地测试</li>
										<li>SOE测试记录</li>
										<li>控制系统切换记录</li>
										<li>输煤皮带拉绳开关传动结果录入</li>
										<li>热控定期实验热工控制电源切换实验</li>
										<li>MFT热态实验</li>
										<li>氨泄露仪定期试验</li>
										<li>自动调节系统扰动试验</li>
										<li>保护系统传动试验</li>
										<li>主要热工仪表及DAS系统测量参数抽检</li>
										<li>热工DCS系统日常维护试验</li>
										<li>DCS系统故障记录</li>
										<li>热控资料共享系统疑难杂症求救信息发布</li>
										<li>实验设备集团联网共享</li>
										<li>题库共享</li>
										<li>应急预案上传</li>
										<li>实验室建标材料</li>
										<li>设备说明书上传</li>
										<li>热工技术规范</li>
										<li>技改资料</li>
										<li>机组一次调频试验分析录入</li>
										<li>机组AGC性能分析</li>
										<li>测点故障分析（实时数据）</li>
										<li>热工DCS控制系统分级授权记录</li>
										<li>持证上岗记录</li>
										<li>热控定期检查检验</li>
										<li>化学仪表检验结果</li>
										<li>给煤机皮带秤定期校验报告</li>
										<li>化学仪表校验计划</li>
										<li>系统疑难杂症求救信息发布</li>
										<li>定期校验</li>
									</ul>
							<!--环保监督-->
								<li class="open">环保监督</li>
									<ul show="false">
										<li>环保设施运行维护台账</li>
										<li>脱硫、脱硝CEMS记录</li>
									</ul>
							<!--节能监督-->
								<li class="open">节能监督</li>
									<ul show="false">
										<li>节能热力试验报告</li>
										<li>节能试验管理真空严密性试验</li>
										<li>烟道阻力实验</li>
										<li>试验管理</li>
										<li>机组投产后性能试验</li>
									</ul>
							<!--继保监督-->
								<li class="open">继保监督</li>
									<ul show="false">
										<li>继保反措执行</li>
										<li>110kv及以上系统故障及保护动作情况月报表</li>
										<li>继电保护及安全自动装置年度校验计划表</li>
										<li>继电保护投入率报表</li>
										<li>继保事故分析简报更新</li>
										<li>继保定值管理</li>
										<li>继保事故分析简报</li>
										<li>继保定期测试</li>
									</ul>
							<!--压力容器及承压部件管理监督-->
								<li class="open">压力容器及承压部件管理监督</li>
									<ul show="false">
										<li>压力容器定期检验</li>
										<li>压力容器压力容器检修</li>
									</ul>
							<!--计量管理监督-->
								<li class="open">计量管理监督</li>
									<ul show="false">
										<li>计量定期检定</li>
									
									</ul>
							<!--励磁监督-->
								<li class="open">励磁监督</li>
									<ul show="false">
										<li>励磁事故分析简报</li>
										<li>励磁反措执行</li>
										<li>励磁试验报告</li>

									</ul>
							<!--振动监督-->
								<li class="open">振动监督</li>
									<ul show="false">
										<li>振动检验报告</li>
										<li>振动实验管理</li>
									</ul>
							<!--特种设备监督-->
								<li class="open">特种设备监督</li>
									<ul show="false">
										<li>整改问题</li>
										<li>整改问题审批</li>
										<li>会议纪要</li>
										<li>热工主要仪表抽检合格率统计表</li>
										<li>定期工作</li>
										<li>特种设备定期检验</li>
										<li>特种设备特种设备维保</li>
										<li>特种设备特种设备检修</li>
									</ul>
							<!--</ul>-->

        </ul>
    </div>
    <div class="fengge"></div>
  </div>
  <script type="text/javascript">
	var st_height=document.documentElement.clientHeight-60+"px";
	document.getElementById("st_tree").style.height=st_height;
    </script> 

<div class="wu_main_1">
  <div class="wu_main1">
  <!--	<img src="img/jiandu.png" width="100%" />-->
  		<table>
		<thead>
		<tr>
			<td>监督执行项目</td>
			<td>创建人</td>
			<td>创建时间</td>
			<td>上报单位</td>
			<td>附件名称</td>
			<td>附件ID</td>
		</tr>
		</thead>
		<tbody id="jiandubaobiao_table">


		</tbody>
	</table>

    <div class="fengge"></div>
  </div>
  <div class="fengge"></div>
</div>
<script type="text/javascript" src="js/sub.js"></script>
</body>
</html>
