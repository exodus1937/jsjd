<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html style="background:#CED9E7">
<html
	class="um landscape min-width-240px min-width-320px min-width-480px min-width-768px min-width-1024px">
<head>
<title></title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<link href="<%=request.getContextPath() %>/tab/css/bootstrap.min.css"
	rel="stylesheet" />
<link href="<%=request.getContextPath() %>/tab/css/line.css"
	rel="stylesheet" />
<script src="<%=request.getContextPath() %>/tab/js/bootstrap.min.js"></script>
<script src="<%=request.getContextPath() %>/echars/dist/echarts.js"></script>
<script src="<%=request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
<script src="<%=request.getContextPath() %>/My97DatePicker/calendar.js"></script>
<script src="<%=request.getContextPath() %>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=request.getContextPath() %>/tab/history.js"></script>
<script src="<%=request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
<script src="<%=request.getContextPath() %>/iColorPickerLink/iColorPicker.js"></script>
<script src="<%=request.getContextPath() %>/tab/timeValidate.js"></script>
<script src="<%=request.getContextPath() %>/tab/sssj_util.js"></script>
<script src="<%=request.getContextPath() %>/tab/sssj.js"></script>
<script src="<%=request.getContextPath() %>/tab/goBack.js"></script>
<script src="<%=request.getContextPath() %>/tab/js/line.js"></script>
</head>
<body>
<script type="text/javascript">
				var time = "hour";
				$(function(){
					$('#timeSelect').change(function(){
						time = $('#timeSelect option:selected').val();
						$('#startTime_day').hide();
						$('#endTime_day').hide();
						$('#startTime_hour').hide();
						$('#endTime_hour').hide();
						$('#startTime_sec').hide();
						$('#endTime_sec').hide();
						if(time == 'day'){
							$('#startTime_day').show();
							$('#endTime_day').show();
						}
						if(time == 'hour'){
							$('#startTime_hour').show();
							$('#endTime_hour').show();
						}
					})
					
				})
			</script>
	<div>
		<!-- 保存折线图的信息  -->
		<input type="hidden" id="pointsValue" value="<%=request.getAttribute("pointsValue")%>"/>
		<input type="hidden" id="isLoadEcharts" value="false"/>
		</div>
		<div class="clear"></div>
		<div id="content">
		<div id="line" style="height: 350px">
				<div class="sublist">
					<div>
						<div>
							<select id="timeSelect">
								<option value="day" id="time">日</option>
								<option value="hour" id="time" selected>时</option>
							</select> <span>时间:</span>
							<!-- 时间控件 -->
							<input id="startTime_day"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" />
							<input id="startTime_hour"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:00:00',alwaysUseStartDate:true})" />
							<span style="width: 20px; height: 20px; text-align: center;">至</span>
							<input id="endTime_day"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" />
							<input id="endTime_hour"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:00:00',alwaysUseStartDate:true})" />
							<input  type="button" class='btn btn-default btn-sm active' value="查询 " id="submitHistory" />  
							<!-- <input id="go" type="button" class='btn btn-default btn-sm active'value="前一小时" /> 
							<input id="back" type="button" value="后一小时" class='btn btn-default btn-sm active' /> -->
						</div>
					</div>
				</div>
				<div id="myCharts" style="width:600px;height:300px;background:#CED9E7"></div>
			</div>
		</div>
		<!--header结束-->
		<!--content开始-->
		<div id="content" class="ub-f1 tx-l "></div>
</body>

<script type="text/javascript">
$("#startTime_day").hide();
$("#endTime_day").hide();
var tempEC;
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
		    var tempEC = ec;
			createOption(ec);
			initEcharts(ec);
			
		}
	);
})
function initEcharts(ec){
	//初始化mychart
	myChart = ec.init(document.getElementById('myCharts'));
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
			//console.log(data);
			Data = data;
		},
		error:function(){
			alert("获取数据失败");
        }
	})
}
function getDataHistory(){
	var type =$("#timeSelect option:selected").val();
	var startTime;
	var endTime;
	if(type=="hour"){
		startTime = $("#startTime_hour").val();
		endTime = $("#endTime_hour").val();
		if(startTime !== null && startTime !== ""){
			startTime = new Date(startTime.replace(/-/g,"/")).format('yyyy-MM-dd hh:00:00');
		}
		if(endTime !== null && endTime !== ""){
			endTime = new Date(endTime.replace(/-/g,"/")).format('yyyy-MM-dd hh:00:00');	             
		}
	}
	if(type=="day"){
		startTime = $("#startTime_day").val();
		endTime = $("#endTime_day").val();
		if(startTime !== null && startTime !== ""){
			startTime = new Date(startTime.replace(/-/g,"/")).format('yyyy-MM-dd 00:00:00');
		}
		if(endTime !== null && endTime !== ""){
			endTime = new Date(endTime.replace(/-/g,"/")).format('yyyy-MM-dd 00:00:00');	             
		}
	}
	if(endTime === null || endTime === ''){
		endTime = new Date().format('yyyy-MM-dd hh:00:00');
		}
		$.ajax({
			url : "<%=request.getContextPath()%>/XipHistoryAction.do",
			type : "post",
			async : false, //同步执行
			dateType : "json",
			data:{
				method:"getWarnHistory",
				pi_code : pi_code,
				startTime:startTime,
				endTime:endTime
			},                     
			success : function(data) {
				//console.log(data);
				Data = data;
			},
			error:function(){
				alert("获取数据失败");
	        }
		})
	
}
function createOption(ec){
	var type = $("#startTime_day").val();
	var types = $("#startTime_hour").val();
	if(type == "" && types == ""){
		getDate(); 
		}else{
		 getDataHistory(); 
		} 
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
		        	dataZoom: {show: true},
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
				data : (function() {
						var res = [];
						for(var i = 0;i <Data.length ; i++){
							res.push(new Date(Data[i].time).format("yyyy-MM-dd hh:mm:ss"));	
						}
						//console.log(res);
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
					        		//console.log(datas);
					        		return datas;
							 }()
		              }
		      ]
		};
}	
  $("#submitHistory").click(function(){
	  var select =$("#timeSelect option:selected").val();
	  var begin;
	  var end;
	  if(select == "hour"){
		  begin = $("#startTime_hour").val();
		  end = $("#endTime_hour").val();
		  if(begin =="" || end ==""){
		  alert("请选择正确时间");
		  }
	  }if(select == "day"){
		  begin = $("#startTime_day").val();
		  end = $("#endTime_day").val();
		  if(begin =="" || end ==""){
		  alert("请选择正确时间");
		  }
	  }if(select == ""){
		  alert("请选择正确时间");
	  }else{
		  myChart.clear();
		  createOption(tempEC);
		  myChart.setOption(option,true);
	  }
	  
  })
    </script>
</html>