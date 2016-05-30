/**
 * 前进 后退方法
 */
function getDate(strDate) {
            var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
             function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
            return date;
}
$(function(){
	//根据选择的时间类型 改变button的显示文字
	$("#timeSelect").change(function(){
		var type = $("#timeSelect option:selected").val();
		if(type=="year"){
			$("#go").val("前一年")
			$("#back").val("后一年")
		}
		if(type=="month"){
			$("#go").val("前一月")
			$("#back").val("后一月")		
		}
		if(type=="day"){
			$("#go").val("前一天")
			$("#back").val("后一天")	
		}
		if(type=="hour"){
			$("#go").val("前一小时")
			$("#back").val("后一小时")	
		}
	})
	$("#go").click(function(){
		var selectType = $("#timeSelect").val();
		if(selectType == "year"){
			var endTime = $("#endTime_year").val();
			var startTime = $("#startTime_year").val();
			if((endTime == ''&&endTime == '') || (endTime == null&&endTime == null)){
				alert("请先选择开始和结束时间 ");
				return;
			}else{
				var endTempTime  = parseInt(endTime)-1;
				var startTempTime = parseInt(startTime)-1;
				$("#endTime_year").val(endTempTime);
				$("#startTime_year").val(startTempTime);
				createHistoryOption();
				myChart_history.setOption(option_history,true);
			}
			
		}if(selectType == "month"){
			if(endTime == '' || endTime == ''){
				alert("请先选择开始和结束时间 ");
				return;
			}else{
				var endTime = $("#endTime_month").val();
				var startTime = $("#startTime_month").val();
				//获取年，月
				endYear = endTime.substring(0,endTime.indexOf('-'));
				endMonth = endTime.substring(endTime.indexOf('-')+1,endTime.length)
				startYear = startTime.substring(0,startTime.indexOf('-'));
				startMonth = startTime.substring(startTime.indexOf('-')+1,startTime.length);
				//alert("endTime = "+endYear+"-"+endMonth +"startTime = "+startYear +"-"+startMonth);
				if(endMonth == "1"){
					endYear = endYear - 1;
					endMonth = "12"
				}else{
					endMonth = endMonth - 1;
				}
				if(startMonth == "1"){
					startYear = startYear - 1;
					startMonth = "12"
				}else{
					startMonth = startMonth - 1;
				}
				$("#endTime_month").val(endYear+"-"+endMonth);
				$("#startTime_month").val(startYear+"-"+startMonth);
				createHistoryOption();
				myChart_history.setOption(option_history,true);
			}
		}if(selectType == "day"){
			var endTime = $("#endTime_day").val();
			var startTime = $("#startTime_day").val();
			if(endTime == '' || endTime == ''){
				alert("请先选择开始和结束时间 ");
				return;
			}else{
				var endTime = $("#endTime_day").val();
				var startTime = $("#startTime_day").val();
				if(endTime == '' || endTime == ''){
					alert("请先选择开始和结束时间 ");
					return;
				}
				var endDate = new Date(endTime.replace(/-/g,"/")).getTime();
				var startDate = new Date(startTime.replace(/-/g,"/")).getTime();
				var endTemp = endDate-1000*60*60*24;
				var startTemp = startDate-1000*60*60*24;
				//alert(endTemp);
				$("#endTime_day").val(new Date(endTemp).format("yyyy-MM-dd hh:mm:ss"));
				$("#startTime_day").val(new Date(startTemp).format("yyyy-MM-dd hh:mm:ss"));
				createHistoryOption();
				myChart_history.setOption(option_history,true);
			}
		}if(selectType == "hour"){
			var endTime = $("#endTime_hour").val();
			var startTime = $("#startTime_hour").val();
			if(endTime == '' || endTime == null){
				endTime = new Date();
				startTime = endTime - 1000*60*60*3;
				startTime = new Date(startTime);
			}else{
				endTime = new Date(endTime.replace(/-/g,"/")).getTime();
				startTime = new Date(startTime.replace(/-/g,"/")).getTime();
			}
			//alert(endTime +" "+startTime);
			var endTemp = endTime-1000*60*60;
			var startTemp = startTime-1000*60*60;
			//alert(endTemp);
			$("#endTime_hour").val(new Date(endTemp).format("yyyy-MM-dd hh:00:00"));
			$("#startTime_hour").val(new Date(startTemp).format("yyyy-MM-dd hh:00:00"));
			createHistoryOption();
			myChart_history.setOption(option_history,true);
		}
	})
	$("#back").click(function(){
		var selectType = $("#timeSelect").val();
		if(selectType == "year"){
			var endTime = $("#endTime_year").val();
			var startTime = $("#startTime_year").val();
			if((endTime == ''&&endTime == '') || (endTime == null&&endTime == null)){
				alert("请先选择开始和结束时间 ");
				return;
			}else{
				var endTempTime  = parseInt(endTime)+1;
				var startTempTime = parseInt(startTime)+1;
				$("#endTime_year").val(endTempTime);
				$("#startTime_year").val(startTempTime);
				createHistoryOption();
				myChart_history.setOption(option_history,true);
			}
			
		}if(selectType == "month"){
			var endTime = $("#endTime_month").val();
			var startTime = $("#startTime_month").val();
			if(endTime == '' || endTime == ''){
				alert("请先选择开始和结束时间 ");
				return;
			}else{
				var endTime = $("#endTime_month").val();
				var startTime = $("#startTime_month").val();
				//获取年，月
				endYear = endTime.substring(0,endTime.indexOf('-'));
				endMonth = endTime.substring(endTime.indexOf('-')+1,endTime.length)
				startYear = startTime.substring(0,startTime.indexOf('-'));
				startMonth = startTime.substring(startTime.indexOf('-')+1,startTime.length);
				//alert("endTime = "+endYear+"-"+endMonth +"startTime = "+startYear +"-"+startMonth);
				if(endMonth == "12"){
					endYear = parseInt(endYear) + 1;
					endMonth = "1"
				}else{
					endMonth = parseInt(endMonth) + 1;
				}
				if(startMonth == "12"){
					startYear = parseInt(startYear) + 1;
					startMonth = "1"
				}else{
					startMonth = parseInt(startMonth) + 1;
				}
				$("#endTime_month").val(endYear+"-"+endMonth);
				$("#startTime_month").val(startYear+"-"+startMonth);
				createHistoryOption();
				myChart_history.setOption(option_history,true);
			}
		}if(selectType == "day"){
			var endTime = $("#endTime_day").val();
			var startTime = $("#startTime_day").val();
			if(endTime == '' || endTime == ''){
				alert("请先选择开始和结束时间 ");
				return;
			}
			var endDate = new Date(endTime.replace(/-/g,"/")).getTime();
			var startDate = new Date(startTime.replace(/-/g,"/")).getTime();
			var endTemp = endDate+1000*60*60*24;
			var startTemp = startDate+1000*60*60*24;
			//alert(endTemp);
			$("#endTime_day").val(new Date(endTemp).format("yyyy-MM-dd hh:mm:ss"));
			$("#startTime_day").val(new Date(startTemp).format("yyyy-MM-dd hh:mm:ss"));
			createHistoryOption();
			myChart_history.setOption(option_history,true);
		}if(selectType == "hour"){
			var endTime = $("#endTime_hour").val();
			var startTime = $("#startTime_hour").val();
			if(endTime == '' || endTime == null){
				endTime = new Date();
				startTime = endTime - 1000*60*60*3;
				startTime = new Date(startTime);
			}else{
				endTime = new Date(endTime.replace(/-/g,"/")).getTime();
				startTime = new Date(startTime.replace(/-/g,"/")).getTime();
			}
			//alert(endTime +" "+startTime);
			var endTemp = endTime+1000*60*60;
			var startTemp = startTime+1000*60*60;
			//alert(endTemp);
			$("#endTime_hour").val(new Date(endTemp).format("yyyy-MM-dd hh:00:00"));
			$("#startTime_hour").val(new Date(startTemp).format("yyyy-MM-dd hh:00:00"));
			createHistoryOption();
			myChart_history.setOption(option_history,true);
		}
	})
	
})