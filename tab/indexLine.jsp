<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="<%=request.getContextPath() %>/echars/dist/echarts.js"></script>
<script src="<%=request.getContextPath() %>/tab/sssj_util.js"></script>
<script src="<%=request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
<script src="<%=request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
<title>Insert title here</title>
</head>
<script type="text/javascript">
	var myChart;
	var option;
	var pointValue = [];
	var time = [];
	var pi_code = '<%=request.getParameter("pi_code")%>';
	<%
	String name = request.getParameter("name");
    name = java.net.URLDecoder.decode(name,"UTF-8");
	%>
	var name = '<%=name%>';
	$(function(){
		var points = $("#pointsInfo").val();
		var points = points + pi_code;
		$("#pointsInfo").attr('value',points);
		require.config({
			paths : {
				echarts : '<%=request.getContextPath() %>/echars/www/js/'
			}
		});
		require([ 'echarts', 
			          'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
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
	
	function getData(){
		$.ajax({
			url : "<%=request.getContextPath() %>/XipHistoryAction.do",
			type : "post",
			async : false, //同步执行
			dateType : "json",
			data:{
				method:"IndexLine",
				pi_code : pi_code,
			},                     
			success : function(data) {
				for (var i = 0; i < data.length; i++) {
					pointValue.push(data[i].value);
					time.push(new Date(data[i].time).format("yyyy-MM-dd hh:mm:ss"));
				}
			},
			error:function(){
				alert("获取x轴数据失败");
	        }
		})
	}
	
	function createOption(ec){
		//getData();
		var date = new Date();
		option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:true,
			        data:function(){
						var res = [];
						if(name){
							res.push(name)
						}else{
							res.push('折线图');
						}

						return res;
				     }()
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            //dataView : {show: true, readOnly: false},
			           // magicType : {show: true, type: ['line']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [ {
					type:'category',
					boundaryGap:false,
					data : function(){
						var res = [];
			            $.ajax({
		        			url : "/jsjd/XipSssjAction.do",
		        			type : "post",
		        			async : false, //同步执行
		        			dateType : "json",
		        			data : {
		        				method:"getIndexWindowLineX",
		        				date:date.format("yyyy-MM-dd hh:mm:ss")
		        			},
		        			success : function(data) {
			        		//	alert("x轴获取成功");
			        			for(var i=0;i<data.length;i++){
			        				res.push(new Date(data[i]).format("hh:mm:ss"));
				        		}
		        			},
		        			error:function(){
								alert("X轴数据获取失败！");
			        		}
		        		})	
			            return res;
					}()
				} ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}'
			            }
			        }
			    ],
			    series :[ {
			    		  name:name,
			              type:'line',
						  large:true,
						  symbol:'none',
						  data:function(){
							  var res = [];
							  $.ajax({
									url : "/jsjd/XipSssjAction.do",
									type : "post",
									async : false, //同步执行
									dateType : "json",
									data:{
										method:"getIndexWindowLineData",
										date:date.format("yyyy-MM-dd hh:mm:ss"),
										pi_code:pi_code  
									},
									success : function(data) {
										for (var i = 0; i < data.length; i++) {
											//res.push(data[i].value/1000*100/1000*100);
												dataItme={
														value:data[i],
														tooltip:{
															trigger: 'axis',
															 show : true
														}
													}
											res.push(dataItme);
										}
									}
								}) ; 
								return res;
						  }()
			    }
			    ]
			};
	}
</script>
<body>
	<input hidden="true" value="" id="pointsInfo"> 
	<div id="myChart" style="height:300px">
	</div>
</body>
</html>