<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="java.net.URLDecoder"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="<%=request.getContextPath() %>/echars/dist/echarts.js"></script>
<script src="<%=request.getContextPath() %>/tab/sssj_util.js"></script>
<script src="<%=request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
<script src="<%=request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
<title>报警信息</title>
</head>
<script type="text/javascript">
	var myChart;
	var option;
	var Data;
	var pi_code='<%=request.getParameter("pi_code")%>';
	<%
		String name = request.getParameter("name");
	    name = java.net.URLDecoder.decode(name,"UTF-8");
	%>
	var name='<%=name%>';
	var time1='<%=request.getParameter("time1")%>';
	var time2='<%=request.getParameter("time2")%>';
	$(function(){
		//alert(last_time);
		//alert("aaa_"+pi_code+" _____"+warn_time+"__");
		//alert(pointNames);
		require.config({
			paths : {
				echarts : '<%=request.getContextPath() %>/echars/www/js/'
			}
		});
		require([ 'echarts', 
			          'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
			],function(ec){
				createOption(ec);
				initEcharts(ec);
				
			}
		);
	})
	function initEcharts(ec){
		//初始化mychart
		myChart = ec.init(document.getElementById('myChart'));
		//将option放入到mychart
		myChart.setOption(option,true); 
	}

	function getDate(){
		$.ajax({
			url : "<%=request.getContextPath()%>/XipHistoryAction.do",
			type : "post",
			async : false, //同步执行
			dateType : "json",
			data:{
				method:"getWarnInfoLineData",
				pi_code : pi_code,
				warn_time:time1+" "+time2
			},                     
			success : function(data) {
				Data = data;
			},
			error:function(){
				alert("获取数据失败");
	        }
		})
	}
	function createOption(ec){
		getDate();
		option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:true,
			        data:function(){
						var res = [];
						res.push(name);
						return res;
				    }()
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [ {
					type:'category',
					boundaryGap:false,
					data : (function() {
							var res = [];
							for(var i = 0;i <Data.length ; i++){
								res.push(new Date(Data[i].time).format("yyyy-MM-dd hh:mm:ss"));	
							}
							return res;
					})()
				} ],
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
			            	  type:'line',
								 name:name,
								 large:true,
								 symbol:'none',
								 data:function(){
									 var datas=[];
									 for(var i = 0 ; i<Data.length;i++){
										 datas.push(Data[i].value);
									 }
						        		return datas;
								 }()
			              }
			      ]
			};
	}
</script>
<body>
<div id="myChart" style="height:300px">
</div>
</body>
</html>