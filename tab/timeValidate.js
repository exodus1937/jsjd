	function validate(){
		var type = $("#timeSelect option:selected").val();
		if(type=="hour"){
			var endTime = $("#endTime_hour").val();
			var startTime = $("#startTime_hour").val();
			var endDate = new Date(endTime.replace(/-/g,"/")).getTime();
			var startDate = new Date(startTime.replace(/-/g,"/")).getTime();
			//alert(endTime +"   "+startTime);
			if((endTime == null || endTime == "") || (startTime == null || startTime == "")){
				alert("请先选择开始和结束的时间");
				return 'false';
			}
			if(endDate == startDate){
				alert("开始时间不能和结束时间相同");
				return 'false';
			}
			if((endDate-startDate)<0){      
				alert("开始时间不能大于结束时间");
				return 'false';
			}
			if((endDate-startDate) > 1000*60*60*3){
				alert("请选择三小时之内的时间");
				return 'false';
			}
			return "true";
		}
		if(type=="day"){
			var endTime = $("#endTime_day").val();
			var startTime = $("#startTime_day").val();
			var endDate = new Date(endTime.replace(/-/g,"/")).getTime();
			var startDate = new Date(startTime.replace(/-/g,"/")).getTime();
			if((endTime == null || endTime == "") || (startTime == null || startTime == "")){
				alert("请先选择开始和结束的时间");
				return 'false';
			}
			if(endDate == startDate){
				alert("开始时间不能和结束时间相同");
				return 'false';
			}
			if((endDate-startDate)<0){      
				alert("开始时间不能大于结束时间");
				return 'false';
			}
			if((endDate-startDate) > 1000*60*60*24*3){
				alert("请选择三天之内的时间");
				return 'false';
			}
			return "true";
		}
		if(type=="month"){
			var endTime = $("#endTime_month").val();
			var endMonth = endTime.substring(endTime.indexOf('-')+1,endTime.length);
			var endYear = endTime.substring(0,endTime.indexOf('-'));
			var startTime = $("#startTime_month").val();
			var startMonth = startTime.substring(startTime.indexOf('-')+1,startTime.length);
			var startYear = startTime.substring(0,startTime.indexOf('-'));
			//alert('endMonth='+endMonth+"endYear="+endYear);
			if((endTime == null || endTime == "") || (startTime == null || startTime == "")){
				alert("请先选择开始和结束的时间");
				return 'false';
			}
			if(endYear == startYear){
				if(endMonth<startMonth){
					   alert("开始时间不能大于结束时间");
					   return 'false';
				}else{
					if((endMonth - startMonth) > 3){
						alert("请选择三个月之内的时间");
						return 'false';
					}
				}
			}else{
				if((endYear-startYear)<0){
					alert("开始时间不能大于结束时间");
					return 'false';
				}else{
					
					if((endYear - startYear) >1){
						alert("请选择三个月之内的时间");
						return 'false';
					}else{
						if((endMonth-startMonth)>-10){
							alert("请选择三个月之内的时间");
						}
					}
				}
			}
			return "true";
		}
		if(type=="year"){
			var endTime = $("#endTime_year").val();
			var startTime = $("#startTime_year").val();
			if((endTime == null || endTime == "") || (startTime == null || startTime == "")){
				alert("请先选择开始和结束的时间");
				return 'false';
			}
			if(endTime<startTime){
				alert("开始时间不能大于结束时间");
				return 'false';
			}else{
				if((endTime-startTime)>3){
					alert("请选择三年之内的时间");
					return 'false';
				}
			}
			return "true";
		}
		
	}
