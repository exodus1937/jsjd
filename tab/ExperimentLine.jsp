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
<title>Insert title here</title>
<script type="text/javascript">
	var myChart ;
	var option ;
	var startTime = new Date(<%=request.getAttribute("startTime")%>).format('yyyy-MM-dd hh:00:00');
	var endTime;
	var piValue = <%=request.getAttribute("list")%>;
	//alert(piValue[0].t_p_name);
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
			        		res.push(piValue[i].t_p_name)
			        	}
			        	return res;
			        }()
			    },
			    calculable : true,
			    toolbox: {
			        show : true,
			        feature : {
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
			        			url : "<%=request.getContextPath()%>/XipExperimentAction.do",
			        			type : "post",
			        			async : false, //同步执行
			        			dateType : "json",
			        			data : {
			        				method:"getVacuumExperimentLineX",
			        				startTime:startTime
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
			  series : function(){
				  var serie = [];
				  for(var i = 0;i<piValue.length;i++){
					  var res = [];
					  $.ajax({
							url : "<%=request.getContextPath()%>/XipExperimentAction.do",
							type : "post",
							async : false, //同步执行
							dateType : "json",
							data:{
								method:"getExperimentLineData",
								startTime:startTime,
								endTime:endTime,
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
								name:piValue[i].t_p_name,
								data:res,
								large:true
					 }
					  serie.push(item)
				  }
				  return serie;
			  }()
		}
	}
	
	
	$(function(){
		$("#startTime").blur(function(){
			var startTime = $("#startTime").val();
			if(startTime !== ''){
				var startDate = new Date(startTime.replace(/-/g,'/')).getTime();
				var endTime = new Date(startDate + 1000*60*15).format('yyyy-MM-dd hh:mm:ss');
				$('#endTime').val(endTime);
			}
		})
		
		$("#createLine").click(function(){
			startTime = $("#startTime").val();
		    endTime = $("#endTime").val();
			if(startTime != "" && endTime!=""){
				var startDate = new Date(startTime.replace(/-/g,"/")).getTime();	
				var endDate = new Date(endTime.replace(/-/g,"/")).getTime();
				var nowDate = new Date().getTime();
				if(endDate > nowDate){
					alert("结束时间大于当前时间， 请重新选择");
					return;
				}
				
				//判断时间是否在15分钟之内
				if((endDate-startDate) > (1000*60*15) ){
					alert("请保证选择的时间在15分钟之内！");
					return ;
				}
			}
			createOption();
			myChart.setOption(option);
		})
	})
</script>
</head>
<body>
	
	<div>
		<div>
			<!-- 时间空间 -->
			时间：<input id="startTime" 
								  onFocus="WdatePicker({onpicking:function(dp){
									  var startTime = dp.cal.getNewDateStr();
										if(startTime !== ''){
											var startDate = new Date(startTime.replace(/-/g,'/')).getTime();
											var endTime = new Date(startDate + 1000*60*15).format('yyyy-MM-dd hh:mm:ss');
											$('#endTime').val(endTime);
										}
									  },startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})"/>
			<span>- </span><input id="endTime" 
								  onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})"/>
			<input id="createLine" type="button" value="生成折线图" />
		</div>	
		<div id="myChart" style="height:250px">
			<!-- 折线图生成 -->
		</div>
	</div>
</body>
</html>