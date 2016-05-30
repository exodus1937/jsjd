<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="<%= request.getContextPath() %>/My97DatePicker/calendar.js"></script>
<script type="text/javascript" src="<%= request.getContextPath() %>/My97DatePicker/WdatePicker.js"></script>
<script src="<%= request.getContextPath() %>/echars/dist/echarts.js"></script>
<script src="<%= request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
<script src="<%= request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
<script src="<%= request.getContextPath() %>/tab/sssj_util.js"></script>
<title>myFirst</title>
</head>


<script type="text/javascript">
	var myChart ;
	var option ;
	var stime = "<%=request.getAttribute("time")%>";
	var piValue = <%=request.getAttribute("list")%>;  
	//alert(piValue[0].pi_code);
	<!-- 折线图代码 -->

	require.config({
		paths : {
			echarts : '<%=request.getContextPath() %>/echars/www/js/'
		}
	});
	require([ 'echarts', 
		          'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],function(ec){
			initEcharts(ec);
			createOption(ec);
			myChart.setOption(option);
		}
	);
	function initEcharts(ec){
		myChart = ec.init(document.getElementById('myChart'));
	}
	function createOption(ec){
		option = {
				tooltip : {
			        trigger: 'axis',
			        show : true
			    },
			    legend: {
			    	show:true,
			        data:function(){
			        	var res = [];
			        	for(var i = 0; i<piValue.length ; i++){
			        		res.push(piValue[i].point_name)
			        	}
			        	return res;
			        }()
			    },
			    calculable : true,
			    toolbox: {
			        show : true,
			        feature : {
			            restore : {
			            	show: true
			            },
			            dataZoom : {
				            show : true
				        },
			            saveAsImage : {
			            	show: true
			            }
			        }
			    },
			    xAxis : [ {
			            type : 'category',
			            boundaryGap : false,
			            data:function(){
				            var res = [];
				            $.ajax({
			        			url : "<%=request.getContextPath()%>/getMainAction.do",
			        			type : "post",
			        			async : false, //同步执行
			        			dateType : "json",
			        			data : {
			        				method: "getX",
			        				startTime: stime
			        				
			        			},
			        			success : function(data) {
				        			//alert("x轴获取成功");
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
			  series : function(){
				  var serie = [];
				  for(var i = 0;i<piValue.length;i++){
					  var res = [];
					  $.ajax({
							url : "<%=request.getContextPath()%>/getMainAction.do",
							type : "post",
							async : false, //同步执行
							dateType : "json",
							data:{
								method:"getPoint",
								startTime:stime,
								pi_code:piValue[i].pi_code
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
					  
					  var item ={
								type:'line',
								symbol:'none',
								name:piValue[i].point_name,
								data:res,
								large:true
					 }
					  serie.push(item)
				  }
				  return serie;
			  }()
		}
	}	
</script>
	</head>
		<body>
	
		<div>
			
			<div id="myChart" style="height:300px">
				<!-- 折线图生成 -->
			</div>
		</div>
	</body>
</html>
