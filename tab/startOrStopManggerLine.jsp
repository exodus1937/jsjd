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
	var pointValue='<%=request.getAttribute("vo")%>';
	var last_time='<%=request.getAttribute("last_time")%>';
	var pointNames = [] ;
	var pi_codes = [] ;
	var point = pointValue.split(",");
	for(var i=0;i<point.length;i++){
		pointNames.push(point[i].substring(0,point[i].indexOf("@")));
		pi_codes.push(point[i].substring(point[i].indexOf("@")+1,point[i].length));
	}
	$(function(){
		//alert(last_time);
		
		//alert(pointNames);
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
	function createOption(ec){
		
		
		option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			    	show:true,
			        data:function(){
			        	var res = [];
						for(var i=0;i<pointNames.length;i++){
							res.push(pointNames[i]);
						}
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
							$.ajax({
								url : "XipHistoryAction.do",
								type : "post",
								async : false, //同步执行
								dateType : "json",
								data:{
									method:"getStartOrStopManggerLineData",
									pi_code : pi_codes[0],
									last_time:last_time
								},                     
								success : function(data) {
									for (var i = 0; i < data.length; i++) {
										res.push(new Date(data[i].time).format("yyyy-MM-dd hh:mm:ss"));
									}
								},
								error:function(){
									alert("获取x轴数据失败");
						        }
							})
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
			    series : function(){
			    	var serie=[];
			    	for(var i=0;i<pi_codes.length;i++){
						//alert(code[i]);
						var datas = [];
						var item = {
								 type:'line',
								 name:pointNames[i],
								 large:true,
								 symbol:'none',
								 data:function(){
									 $.ajax({
						        			url : "XipHistoryAction.do",
						        			data:{
						        				method:"getStartOrStopManggerLineData",
						        				pi_code:pi_codes[i],
						        				last_time:last_time
						        				},
						        			type : "post",
						        			async : false, //同步执行
						        			dateType : "json",
						        			success : function(data) {
						        				//alert("数据获取成功");
							        			for(var i=0;i<data.length;i++){
							        				datas.push(data[i].value);
								        		}
						        			},
						        			error:function(){
												alert("数据获取失败");
									        }
						        		})
						        		return datas;
								 }()
						}
						serie.push(item);
					}
			    	return serie;
			    }()
			};
	}
</script>
<body>
<div id="myChart" style="height:300px">

</div>
</body>
</html>