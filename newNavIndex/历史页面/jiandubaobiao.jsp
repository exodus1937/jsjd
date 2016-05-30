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

<body id="jiandubaobiao">

  <div class="wu_top0"></div>
  <div class="wu_top1">
    <form method="post" action="?">
      
      <!--  <input name="" type="text" class="wu_top1a" placeholder="请输入日期" onclick="SelectDate(this,'yyyy-MM-dd')" />
      <input name="" type="button" class="wu_top1b" value="查 询" />-->
   
      <input name="" type="button" class="wu_top1b" value="下 载" />
      <input type="button" onclick="back()" class="wu_top1b" style="width:100px;line-height: 28px;background: green;float: right" value="返回到首页">
    </form>
  </div>
  <div class="wu_left">
    <div class="st_tree" id="st_tree">
    
         		<ul show="false">
        			<!--监督报表-->
						<li class="folder"><a href="#">岱海发电</a></li>
					
							<ul show="flase">
							<!--化学监督报表-->
								<li class="folder">化学监督报表</li>
									<ul show="flase">
										<li>锅炉补给水质量月报</li>
										<li>入炉燃煤质量月报表</li>
										<li>油耗监督月度报表</li>
										<li>汽轮机油监督月度报表</li>
										<li>抗燃油监督月度报表</li>
										<li>化学大宗材料消耗月报表配置</li>
										<li>变压器油色谱及理化化验季度报告</li>
										<li>燃油质量月度报表</li>
										<li>大宗材料</li>
										<li>循环冷却水化验报告单</li>
										<li>化验水汽质量合格率统计月报表</li>
										<li>机组水汽合格率</li>
										<li>化学水处理及制氢主要运行参数监测（自）</li>
										<li>水汽平衡统计月报表（自）</li>
										<li>水处理自用水率统计月报表（自）</li>
										<li>化学在线仪表的水汽质量合格率统计月报表(自)</li>
										<li>锅炉补给水质量月报（自）</li>
										<li>在线仪表三率统计（自）</li>
										<li>氢气质量监督统计报表（自）</li>
										<li>精处理水质监测（自）</li>
									</ul>
							<!--振动监督报表-->
								<li class="open">振动监督报表</li>
									<ul show="false">
										<li>主振动报表（自）</li>
									</ul>
							<!--励磁监督报表-->
								<li class="open">励磁监督报表</li>
									<ul show="false">
										<li>发电机励磁系统监督报表</li>
									</ul>
							<!--绝缘监督报表-->
								<li class="open">绝缘监督报表</li>
									<ul show="false">
										<li>绝缘监督</li>
									</ul>
							<!--金属监督报表-->
								<li class="open">金属监督报表</li>
									<ul show="false">
										<li>金属超温超压报表</li>
										<li>受热面超温统计表</li>
										<li>火力发电厂金属技术监督月填报</li>
									</ul>
							<!--节能监督报表-->
								<li class="open">节能监督报表</li>
									<ul show="false">
										<li>节能月报（自）</li>
									</ul>
							<!--继保监督报表-->
								<li class="open">继保监督报表</li>
									<ul show="false">
										<li>110kV及以上系统故障及保护动作情况月报表</li>
										<li>电力系统继电保护与安全自动装置动作统计分析报表</li>
									</ul>
							<!--环保监督报表-->
								<li class="open">环保监督报表</li>
									<ul show="false">
										<li>环保月报（自）</li>
									</ul>
							<!--电能监督报表-->
								<li class="open">电能监督报表</li>
									<ul show="false">
										<li>电能质量AVC报表</li>
										<li>电能质量月报表</li>
									</ul>
							<!--电测监督报表-->
								<li class="open">电测监督报表</li>
									<ul show="false">
										<li>电测技术监督工作年终报表</li>
										<li>电测仪器仪表检验季报表</li>
									</ul>
							<!--热工监督报表-->
								<li class="open">热工监督报表</li>
									<ul show="false">
										<li>保护装置完好率</li>
										<li>主要检测参数合格率报表</li>
										<li>热工自动装置完好率</li>
										<li>主要检测参数合格率</li>
										<li>数采合格率统计</li>
										<li>自动调节投入情况统计表</li>
										<li>热工保护装置投入情况统计表（自）</li>
										<li>技术监督月报表</li>
									</ul>
							</ul>
					<!--	</ul>-->
						<li class="folder"><a href="#">宁东发电</a></li>
							<ul show="flase">
								<!--化学监督报表-->
								<li class="folder">化学监督报表</li>
									<ul show="flase">
										<li>锅炉补给水质量月报</li>
										<li>入炉燃煤质量月报表</li>
										<li>油耗监督月度报表</li>
										<li>汽轮机油监督月度报表</li>
										<li>抗燃油监督月度报表</li>
										<li>化学大宗材料消耗月报表配置</li>
										<li>变压器油色谱及理化化验季度报告</li>
										<li>燃油质量月度报表</li>
										<li>大宗材料</li>
										<li>循环冷却水化验报告单</li>
										<li>化验水汽质量合格率统计月报表</li>
										<li>机组水汽合格率</li>
										<li>化学水处理及制氢主要运行参数监测（自）</li>
										<li>水汽平衡统计月报表（自）</li>
										<li>水处理自用水率统计月报表（自）</li>
										<li>化学在线仪表的水汽质量合格率统计月报表(自)</li>
										<li>锅炉补给水质量月报（自）</li>
										<li>在线仪表三率统计（自）</li>
										<li>氢气质量监督统计报表（自）</li>
										<li>精处理水质监测（自）</li>
									</ul>
							<!--振动监督报表-->
								<li class="open">振动监督报表</li>
									<ul show="false">
										<li>主振动报表（自）</li>
									</ul>
							<!--励磁监督报表-->
								<li class="open">励磁监督报表</li>
									<ul show="false">
										<li>发电机励磁系统监督报表</li>
									</ul>
							<!--绝缘监督报表-->
								<li class="open">绝缘监督报表</li>
									<ul show="false">
										<li>绝缘监督</li>
									</ul>
							<!--金属监督报表-->
								<li class="open">金属监督报表</li>
									<ul show="false">
										<li>金属超温超压报表</li>
										<li>受热面超温统计表</li>
										<li>火力发电厂金属技术监督月填报</li>
									</ul>
							<!--节能监督报表-->
								<li class="open">节能监督报表</li>
									<ul show="false">
										<li>节能月报（自）</li>
									</ul>
							<!--继保监督报表-->
								<li class="open">继保监督报表</li>
									<ul show="false">
										<li>110kV及以上系统故障及保护动作情况月报表</li>
										<li>电力系统继电保护与安全自动装置动作统计分析报表</li>
									</ul>
							<!--环保监督报表-->
								<li class="open">环保监督报表</li>
									<ul show="false">
										<li>环保月报（自）</li>
									</ul>
							<!--电能监督报表-->
								<li class="open">电能监督报表</li>
									<ul show="false">
										<li>电能质量AVC报表</li>
										<li>电能质量月报表</li>
									</ul>
							<!--电测监督报表-->
								<li class="open">电测监督报表</li>
									<ul show="false">
										<li>电测技术监督工作年终报表</li>
										<li>电测仪器仪表检验季报表</li>
									</ul>
							<!--热工监督报表-->
								<li class="open">热工监督报表</li>
									<ul show="false">
										<li>保护装置完好率</li>
										<li>主要检测参数合格率报表</li>
										<li>热工自动装置完好率</li>
										<li>主要检测参数合格率</li>
										<li>数采合格率统计</li>
										<li>自动调节投入情况统计表</li>
										<li>热工保护装置投入情况统计表（自）</li>
										<li>技术监督月报表</li>
									</ul>
							
							
							</ul>

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
	  <!--<img src="img/jiandu.png" width="100%" />-->

	<table>
		<thead>
		<tr>
			<td>编号</td>
			<td>报表名称</td>
			<td>上报人</td>
			<td>创建时间</td>
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
