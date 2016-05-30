<%@page import="com.xzsoft.model.TecProjectVo"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    	SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        TecProjectVo tecProjectVo=(TecProjectVo)request.getAttribute("tecProjectVo");
        String begin = simpleDateFormat.format(tecProjectVo.getTp_begintime());
        String end = simpleDateFormat.format(tecProjectVo.getTp_endtime()); 
    %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/evaluate/css/pjfa.css" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="Content-type" content="application/x-www-form-urlencoded">
		<script src="<%=request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
		<script src="<%=request.getContextPath() %>/tab/sssj_util.js"></script>
		<script src="<%= request.getContextPath() %>/echars/dist/echarts.js"></script>
		<script src="<%= request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
		<title>胶球系统改造在线收益评价方案</title>
	</head>

	<body id="dgOut">
		<input type="hidden" id="id" value="${requestScope.tecProjectVo.id}">
		<div id="allContent">
				<div id="tupian">
				<form id="exp" method="post">
				<input id="imageUrl" name="imageUrl" type="hidden" value="">
				<!-- 
					<div id="dayin">
						<img src="<%=request.getContextPath() %>/evaluate/img/dayin.png"/>
					</div>
				 -->
					<div id="daochu">
						<img src="<%=request.getContextPath() %>/evaluate/img/daochu.png" title="Word导出" />
					</div>
				</form>
				</div>
				<div id="title">
					<span>${requestScope.tecProjectVo.tp_name}</span>
				</div>
				<!----------------------项目介绍---------------->
		
				<div class="xm_1">
		
					<div class="biaoti">
						<span>项目介绍</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
		
				</div>
				<div class="ct_1">
					<div class="ta_1">${requestScope.tecProjectVo.tp_info}</div>
				</div>
				<!-----------------收益因素-------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>收益因素</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
		
				</div>
				<div class="ct_1">
		
					<div class="ta_1">${requestScope.tecProjectVo.tp_factor}</div>
				</div>
		
				<!-----------------评价周期-------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>评价周期</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
		
				</div>
				<div class="ct_1">
		
					<div class="ta_1">${requestScope.tecProjectVo.tp_cycle}</div>
				</div>
		
				<!-------------------------验收模式---------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>验收模型</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
		
				</div>
				<div class="ct_1">
					<div class="ta_2">
						<img src="<%=request.getContextPath() %>/evaluate/img/jqgzmx.png"></img>
		
					</div>
				</div>
			<!-----------------收益情况-------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>收益情况</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
				</div>
				<div class="ct_1">
					<div class="ta_2">
						<div class="sy_1">
								<table width="100%" heigth="250px" border="0">
									  <tr height=40>
									    <td id ="begin"></td>
									    <td id ="end"></td>
									  </tr>
									  <tr height="40" >
									    <td id="hour" ></td>
									    <td>&nbsp;</td>
									  </tr>
									  <tr height="40">
									    <td>累计节煤收益：${requestScope.tecProjectVo.profitVo.allCoal }（万元）</td>
									    <td>累计节电收益：${requestScope.tecProjectVo.profitVo.allElectric }（万元）</td>
									  </tr>
									  <tr height="40">
									    <td>累计维护收益：${requestScope.tecProjectVo.profitVo.allMaintain }（万元）</td>
									    <td>累计综合收益：${requestScope.tecProjectVo.profitVo.allComperhensive }（万元）</td>
									  </tr>
									</table>	
						</div>
		
					</div>
				</div>
					<!-----------------收益曲线-------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>收益曲线</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
				</div>
				<div class="ct_1">
					<div class="ta_2">
						<div id="myChart" class="sy_1" style="hieight:400px">收益曲线折线</div>
					</div>
				</div>
				<div id="guanbi">
					<img src="<%=request.getContextPath() %>/evaluate/img/guanbi.png" title="退出" onclick="window.close();"/>
				</div>
	    </div>
	</body>
<script type="text/javascript">
$(function(){ 
	getHour();
	//根据id请求数据
	//var id = $("#id").val();
	//alert(id);
	var jsonData =new Object();
	 $.ajax({
			url : "<%=request.getContextPath()%>/XipTecProject.do",
			data : {
				method:"getLineData",
				id:'${requestScope.tecProjectVo.id}'
				},
			type : "post",
			async : false, //同步执行
			dateType : "json",
			success : function(data) {
				jsonData = data;
			},
			error:function(){
				alert("获取折线图数据失败");
 		}
		})
	
	var myChart ;
	var option ;
	require.config({
		paths : {
			echarts : '<%=request.getContextPath() %>/echars/www/js'
		}
	});
	require([ 'echarts', 
		          'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
		          'echarts/chart/bar'
		],function(ec){
			myChart = ec.init(document.getElementById("myChart"));
			createOption();
			myChart.setOption(option);
		}
	);
	function createOption(){ 
		option={
				tooltip:{
					 show : true,
					 trigger: 'axis',
			     },
			     legend : {
						show:true,
						data : ['${requestScope.tecProjectVo.tp_name}']
				},
				toolbox: {
			        show : true,
			        feature : {
			            restore : {
			            	show: true
			            },
			            saveAsImage : {
			            	show: true
			            }
			        }
			    },
			    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data:function(){
						            var res = [];
						           	for(var i=0;i<jsonData.length;i++){
						   			res[i]=new Date(jsonData[i].profit_date).format('yyyy-MM-dd hh:mm:ss');	
						           	}
						            return res;
						        }()
					        }
					    ],
				
			    yAxis : [
					        {
					            type : 'value',
					            axisLabel : {
					                formatter: '{value}'
					            }
					        }
					    ],
			    series : [
					{
						name:'${requestScope.tecProjectVo.tp_name}',
			            type:'line',
			            data:function(){
				            var res =[];
			            	for(var i=0;i<jsonData.length;i++){
								res[i]=jsonData[i].comperhensive;
						     }
				            return res;
				        }()

					}

				]
		}
	
	}
	
		
		$("#daochu").click(function(){
			var imageUrl = myChart.getDataURL("png");
			$("#imageUrl").val(imageUrl);
			var url = "<%=request.getContextPath()%>/XipTecProject.do?method=ExpWord&id=${requestScope.tecProjectVo.id}";
		//	alert(url);
			$("#exp").attr("action",url).submit();
		})
	})
	function getHour(){
		var hour =new Object();
		 $.ajax({
				url : "<%=request.getContextPath()%>/XipTecProject.do",
				data : {
					method:"getLineData",
					id:'${requestScope.tecProjectVo.id}'
					},
				type : "post",
				async : false, //同步执行
				dateType : "json",
				success : function(data) {
					hour = data;
				}
		})
		
		var begins = new Date(hour[0].profit_date).getTime();
		var ends = Date.parse(new Date(hour[hour.length-1].profit_date));
		var dat = Math.round((Math.abs(begins - ends))/1000/60/60);
		$("#hour").html("累计运行（小时):"+dat+"(小时)");
		$("#begin").html("开始时间："+new Date(hour[0].profit_date).format('yyyy-MM-dd hh:mm:ss'));
		$("#end").html("结束时间:"+new Date(hour[hour.length-1].profit_date).format('yyyy-MM-dd hh:mm:ss'));
						
	}
</script>
</html>