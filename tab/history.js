/**
 * 实时数据折线显示
 */
	var myChart_history;
	var option_history;
	function initHistory(ec){
		//历史数据            
//		myChart_history.clert();
//		myChart.clear();
//		myChart_history = ec.init(document.getElementById('history'));
		myChart_history = ec.init(document.getElementById('myCharts'));
		createHistoryOption();
		myChartHistorySetOption(createHistoryInfo);
		//myChart_history.setOption(option_history,true); 
	}

	//创建option对象
	function createHistoryOption(){ 
		var type =$("#timeSelect option:selected").val();
		var startTime;
		var endTime;
		if(type=="hour"){
			startTime = $("#startTime_hour"	).val();
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
		}if(type=="month"){
			startTime = $("#startTime_month").val();
			startTime = startTime +"-01"
			endTime = $("#endTime_month").val();
			endTime = endTime +"-01"
			if(startTime !== null && startTime !== ""){
				startTime = new Date(startTime.replace(/-/g,"/")).format('yyyy-MM-dd 00:00:00');
			}
			if(endTime !== null && endTime !== ""){
				endTime = new Date(endTime.replace(/-/g,"/")).format('yyyy-MM-dd 00:00:00');	             
			}
		}if(type=="year"){
			startTime = $("#startTime_year").val();
			endTime = $("#endTime_year").val();
			if(startTime !== null && startTime !== ""){
				startTime = new Date(startTime.replace(/-/g,"/")).format('yyyy-01-01 00:00:00');
			}
			if(endTime !== null && endTime !== ""){
				endTime = new Date(endTime.replace(/-/g,"/")).format('yyyy-01-01 00:00:00');	             
			}
		}
		if(endTime === null || endTime === ''){
			endTime = new Date().format('yyyy-MM-dd hh:00:00');
		}
		option_history = { 
				tooltip:{
					 show : true,
					 trigger: 'axis',
					 formatter: function(params,ticket,callback) {
						    var pointsValue = $("#pointsValue").val();
						 	var pointValue = eval(pointsValue);
				            var res = params[0][1];
				            var temp = 0;
				            var range_up = '';
				            var rang_down = '';
				           
				            for (var i = 0, l = params.length; i < l; i++) {
				            	//判断名称是否一致 ，设置百分比
				            	var temp = params[i][0];   
				            	for(var j=0;j<pointValue.length;j++){ 
				            		var name = pointValue[j].name;
				            		if(name == temp ){   
				            			var pointName = pointValue[j].name;
				            			var range_up = pointValue[j].range_up; 
				            			var range_down = pointValue[j].range_down;
				            			if(range_up == '' || range_up == 'null'){
				            				range_up = params[i][2];
				            			}
				            			if(range_down == '' || range_down == 'null'){
				            				range_down = 0;
				            			}
				            			if(pointValue.length<2){
				            				res += '<br/>' + pointName + ' :  ' + params[i][2];
				            				$("#history_currentValue_"+i).text(params[i][2]);
				            			}else{
				            				var value = ((params[i][2]*((range_up-range_down)/100))+parseFloat(range_down)).toFixed(2);
				            				res += '<br/>' + pointName + ' :  ' + value; 
				            				$("#history_currentValue_"+i).text(value);
				            			}
				            		}
				            	}
				            }
				            setTimeout(function(){
				                callback(ticket, res);
				            }, 0)
				            return 'loading';
				        }
			     },
			    legend : {
					show:true,
					data :  function(){
						var res = [];
//						var historyPointsValue = $("#historyPointsValue").val();
						var historyPointsValue = $("#pointsValue").val();
						var arr = eval(historyPointsValue);
						for(var i=0;i<arr.length;i++){
							res.push(arr[i].name);
						}
						return res;
					}()
				},
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
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : function(){
			            	var time = $('#timeSelect option:selected').val();
			            	
		            		var type;
			            	if(time == 'year'){
			            		type="year"
			            	}if(time == 'month'){
			            		type="month"
			            	}if(time == 'day'){
			            		type="day"
			            	}if(time == 'hour'){
			            		type="hour"
			            	}
			            	
			            	//获取选择时间
		            		var res = [];
		            		$.ajax({
								url : "XipHistoryAction.do",
								type : "get",
								async : false, //同步执行
								dateType : "json",
								data:{
									method:"getTimeByHistory",
									startTime:startTime,
									endTime:endTime,
									type:type
								},                     
								success : function(data) {
									for (var i = 0; i<data.length ; i++) {
										res.push(new Date(data[i]).format("yyyy-MM-dd hh:mm:ss"));
									}
								}
							})
							return res;
			            }()
			        }
			    ],
			    yAxis : function(){
			    	var pointsValue = $('#pointsValue').val();
			    	var pointValue = eval(pointsValue);
			    	var res = [];
			    	var itme;
			    	if(pointValue.length<2){
			    		itme = {
					            type : 'value',
					            axisLabel : {
					                formatter: '{value}'
					             }
				        }
			    	}else{
			    		itme = {
				    			type : 'value',
								scale : true,
							    boundaryGap:[0,0],
							    min:0,
							    max:100,
							    splitNumber:4,
								axisLabel: {
					           	 	show: true,
					           	 	formatter: function(value){
					           	 		return value+"%";
					           	 	}
					          }	
				    	}
			    	}
			    	res.push(itme);
			    	return res;
			    }(),
			    series :function(){
					var serie=[];
					var pointsValue = $('#pointsValue').val();
					var type = $('#timeSelect option:selected').val();
					var pointValue = eval(pointsValue);
					var codes = [];
					var precent = [];
					var range_up = [];
					var range_down = [];
					var name = [];
					var pointIds = [];
					for(var i=0;i<pointValue.length;i++){
						codes.push(pointValue[i].code);    
						range_up.push(pointValue[i].range_up);
						range_down.push(pointValue[i].range_down);  
						name.push(pointValue[i].name);   
						pointIds.push(pointValue[i].id);
					}				
					for(var i=0;i<pointValue.length;i++){
						var res = [];
						var warns = new Object();
						var piValue = new Object();
						//查询异常点数据
						$.ajax({
							url : "XipWarnningAction.do",
							type : "get",
							async : false, //同步执行
							dateType : "json",
							data:{
								method:"getWarnningByDate",
								p_i_id:pointIds[i],
								startTime:startTime,
								endTime:endTime
							},
							success:function(data){
								 //   alert("aa");
								 	warns = data;
							},
							error:function(){
								alert("异常点数据请求失败！");
							}
						});
						//获取历史数据
						var range_upValue = range_up[i];
						var range_downValue = range_down[i];
						var dataItme;
						$.ajax({
							url : "XipHistoryAction.do",
							type : "get",
							async : false, //同步执行
							dateType : "json",
							data:{
								method:"getHistoryDataByDateArr",
								p_i_id : pointIds[i],
								startTime:startTime,
								endTime:endTime,
								type:type
							},
							success:function(data) {
								piValue = data;
								for (var i =0; i < data.length ; i++) {
									if(pointValue.length<2){
										dataItme={
												value:data[i].value,
												tooltip:{
													trigger: 'axis',
													 show : true
												}
										 }
									}else{
//										if(range_upValue == '' || range_upValue == 'null'){
//											range_upValue =data[i].value;
//				            			}
//										if(range_downValue == '' || range_downValue == 'null'){
//											range_downValue =0;
//				            			}
										dataItme={
												value:(data[i].value-range_downValue)/((range_upValue-range_downValue)/100),
												tooltip:{
													trigger: 'axis',
													 show : true
												}
										 }
									}
									res.push(dataItme);
								}
							},
							error:function(){
								alert("获取测点数据失败！");
							}
						 });     
						var item ={
								name:name[i],
								type:'line',
								data:res,
								markPoint:{
								itemStyle: {
					                   normal: {
					                       borderColor: '#000000',
					                       borderWidth: 1,            // 标注边线线宽，单位px，默认为1
					                       label: {
					                        show: false
					                       }
					                   },
					                   emphasis: {
					                      borderColor: '#000000',
					                       borderWidth: 1,
					                       label: {
					                           show: false
					                       }
					                   }
					               },
					               symbol:'none',
									symbolSize:5,
									data:function(){
										var warnning=[];
										var data = [];
										//遍历查询出的历史数据
										for (var i = 0; i < piValue.length; i++) {
											//times记录时间段出现异常点的次数
											var times = 0;
											//遍历查询出的异常点数
											for (var j = 0; j < warns.length; j++) {
												//判断是否是第一个点和最后一个点
												//alert(piValue[i].time+"    "+warns[j].w_date);
												//如果是判断这两个点上是否有异常点存在
												if(i==0 || i == piValue.length-1){
													//判断时间是否有等的点
													if(piValue[i].time == warns[j].w_date){
														times++;
														data.push({name: '异常数据',value:times, xAxis:new Date(piValue[i].time).format('yyyy-MM-dd hh:mm:ss'), yAxis: (piValue[i].value-range_downValue)/((range_upValue-range_downValue)/100)})
														break;    
													}
												}else{
													if(piValue[i].time == warns[j].w_date){
														times++;
														data.push({name: '异常数据次数',value:times, xAxis: new Date(piValue[i].time).format('yyyy-MM-dd hh:mm:ss'), yAxis: (piValue[i].value-range_downValue)/((range_upValue-range_downValue)/100)})
														break;
													}
													if(piValue[i-1].time < warns[j].w_date && piValue[i].time >warns[j].w_date){
														//alert('aaa');      
														times++;
														data.push({name: '异常数据次数',value:times, xAxis: new Date(piValue[i].time).format('yyyy-MM-dd hh:mm:ss'), yAxis: (piValue[i].value-range_downValue)/((range_upValue-range_downValue)/100)})
													}
												}
											}
										}
										return data;
									}()
								}
								
						}
						serie.push(item);
					}
					return serie;
		        }()
			};
	}
	function submitHistory(){
		$("#submit_history").click();
	}
	function validIsSelectTime(){
		var type =$("#timeSelect option:selected").val();
		var startTime ;
		var endTime;
		if(type=="hour"){
			startTime = $("#startTime_hour"	).val();
			endTime = $("#endTime_hour").val();
			if((startTime != null && startTime != "")&&(endTime != null && endTime != "") ){
				return true;
			}else{
				return false;
			}
		}
		if(type=="day"){
			startTime = $("#startTime_day"	).val();
			endTime = $("#endTime_day").val();
			if((startTime != null && startTime != "")&&(endTime != null && endTime != "") ){
				return true;
			}else{
				return false;
			}
		}
		if(type=="month"){
			startTime = $("#startTime_month").val();
			endTime = $("#endTime_month").val();
			if((startTime != null && startTime != "")&&(endTime != null && endTime != "") ){
				return true;
			}else{
				return false;
			}
		}
		if(type=="year"){
			startTime = $("#startTime_year"	).val();
			endTime = $("#endTime_year").val();
			if((startTime != null && startTime != "")&&(endTime != null && endTime != "") ){
				return true;
			}else{
				return false;
			}
		}
		if(type == ""){
			return false;
		}
	}
	
	/**
	 * 创建折线图
	 * @param callback
	 */
	function myChartHistorySetOption(callback){
		myChart_history.setOption(option_history,true);
		callback();
	}
	
	/**
	 * 
	 */
	function createHistoryInfo(){
		$("#pointsInfo tr:not(:first)").empty(); 
		//初始化动态生成直线的信息
    	var pointsInfo = $("#pointsValue").val();
    	var points = eval(pointsInfo);
    	for(var i=0;i<points.length;i++){
	    	 var rowNum = i+1; 
    		 var name = points[i].name;
    		 var code = points[i].code;
    		 var org = "";
    		 var currentValue = 0;
    		 var range_up = points[i].range_up;   
    		 var range_down = points[i].range_down;
    		 var t_p_unit = points[i].t_p_unit;
    		 if(range_up == 'null'){
    			 range_up = "";			
			 }
			 if(range_down == 'null'){
				 range_down = "";			
			 }
			 $("#pointsInfo").append("<tr><td hidden='true' id='history_id_"+i+"'>"+points[i].id+"</td><td>"+rowNum+"</td><td style='text-align:center'><input type='hidden' id='history_"+i+"' name='mycolor' type='text' value='' class='iColorPicker'/></td><td style='text-align:center' id='history_name_"+i+"'>"+name+"</td><td style='text-align:center' id='history_code_"+i+"'>"+code+"</td><td id='history_t_p_unit_"+i+"'>"+t_p_unit+"</td><td style='text-align:center' id='history_currentValue_"+i+"'>"+currentValue+"</td> <td style='text-align:center' ><input id='history_range_down_"+i+"' type='text' value='"+range_down+"'></td><td style='text-align:center' ><input id='history_range_up_"+i+"' type='text' value='"+range_up+"'></td><td style='text-align:center' id='refesh_"+i+"'><a id='a_history_"+i+"' href='javascript:void(0)'>刷新</a></td></tr>")
 		}
    	iColorPicker();
	}