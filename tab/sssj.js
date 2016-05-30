/**
 * 实时数据折线显示
 */
	var	flag = true;
	var myChart;
	var option;
	var end = new Date();
	var allTime;
	var timeTicket ;
	function initSssj(ec) {
		// 基于准备好的dom，初始化echarts图表
		//实时数据
		myChart = ec.init(document.getElementById('myCharts'));
		createOption();
		myChartSetOption(createInfo);
		timeTicket = setInterval(function (){
				var pointsValue = document.getElementById('pointsValue').value;
				var arrPointsValue = eval(pointsValue);
				var p_i_ids = '';
				var precent = [];
				var range_up = [];
				var range_down = [];
				for(var i=0;i<arrPointsValue.length;i++){
					var p_i_id = arrPointsValue[i].id;
					p_i_ids = p_i_ids + p_i_id +",";
					range_up.push(arrPointsValue[i].range_up);
					range_down.push(arrPointsValue[i].range_down);
				}
				p_i_ids = p_i_ids.substring(0,p_i_ids.length-1);
				var res = [];
				$.ajax({
					url : "XipSssjAction.do",
					data:{
						method:"getPoint",
						p_i_ids:p_i_ids
						},
					type : "post",
					async : false, //同步执行
					dateType : "json",
					success : function(data) {
						for (var i = 0; i < data.length; i++) {
							res.push(data[i]);
						}
					}
				})	
				myChart.addData(
			      function(){
			    	  var aa =[];
				      for(var i=0;i<res.length;i++){
				    	  if(i == res.length-1){
				    		  if(arrPointsValue.length < 2){
				    			  var data = [i,res[i].value,false,false,new Date(res[0].time).format("yyyy-MM-dd hh:mm:ss")];	
				    		  }else{
				    			  var data = [i,(res[i].value-range_down[i])/((range_up[i]-range_down[i])/100),false,false,new Date(res[0].time).format("yyyy-MM-dd hh:mm:ss")];	
				    		  }
				    	  	
				    	  }else{
				    		  if(arrPointsValue.length < 2){
				    			  var data = [i,res[i].value,false,false];
				    		  }else{
				    			
				    			  if(range_up[i] == 'null' || range_up[i] == ''){
				    				  range_up[i] = res[i].value;
							      }
				    			  if(range_down[i] == 'null' || range_down[i] == ''){
				    				  range_down[i] = 0;
							      }
				    			  var data = [i,(res[i].value-range_down[i])/((range_up[i]-range_down[i])/100),false,false]; 
				    			  
				    		  }
				    	  }
				    	  aa.push(data);
				      }
				      return aa;
			      }()
			   )
			
		},3000)	
	};
	
	//创建option对象
	
	function createOption(){ 
		  option = {
		 	 tooltip:{
				 show : true,
				 trigger: 'axis',
				 formatter: function(params,ticket,callback) {
					 	var pointsValue = $("#pointsValue").val();
					 	var pointValue = eval(pointsValue);
			            var res = params[0][1];
			            var temp = 0;
			            var precent='';
			            var range_up = '';
			            var range_down = '';
			            for (var i = 0, l = params.length; i < l; i++) {
			            	var temp = params[i][0];   
			            	for(var j=0;j<pointValue.length;j++){ 
			            		var name = pointValue[j].name;
			            		if(name == temp ){   
			            			var pointName = pointValue[j].name;
			            			var range_up =  pointValue[j].range_up;
			            			var range_down = pointValue[j].range_down;
			            			
			            			if(range_up == 'null' || range_up == 'undefine' || range_up == ''){
			            				range_up = params[i][2];
							    	 }
			            			if(range_down == 'null' || range_down == 'undefine' || range_down == ''){
			            				range_down = 0;
							    	 }
			            			if(pointValue.length < 2){
			            				res += '<br/>' + pointName + ' :  ' + params[i][2];  
			            				$("#currentValue_"+i).text(params[i][2]);
			            			}else{
			            				var value = ((params[i][2]*((range_up-range_down)/100))+parseFloat(range_down)).toFixed(2);
			            				res += '<br/>' + pointName + ' :  ' + value;
			            				$("#currentValue_"+i).text(value);
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
				data : function(){
					var res = [];
					var points = $("#pointsValue").val();
					var arr = eval(points);
					for(var i=0;i<arr.length;i++){
						res.push(arr[i].name);
					}
					return res;
				}()
			},
			toolbox : {
				show : true,
				feature : {
					restore : {show: true},         
					saveAsImage : {
						show : true   
					}
				}
			},
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
			xAxis : [ {
				type:'category',
				boundaryGap:false,
				data : (function() {
						var res = [];
						var pointsValue = $("#pointsValue").val();
						var arrPoint = eval(pointsValue);
						p_i_ids = "";
						for(var i=0;i<arrPoint.length;i++){
							p_i_ids = p_i_ids + arrPoint[i].id;
						}
						p_i_ids = p_i_ids.substring(0,p_i_ids.length-1);
						var p_i_id = arrPoint[0].id;
						$.ajax({
							url : "XipSssjAction.do",
							type : "get",
							async : false, //同步执行
							dateType : "json",
							data:{
								method:"getTime",
								p_i_ids:p_i_ids,
								end:end.format("yyyy-MM-dd hh:mm:ss")           
							},                     
							success : function(data) {
								allTime = data;
								for (var i = 0; i < data.length; i++) {
									res.push(new Date(data[i]).format("yyyy-MM-dd hh:mm:ss"));
								}
							}   
						})
						return res;
				})()
			} ],
			series :function(){
						var serie=[];
						var pointsValue = $('#pointsValue').val();
						var pointValue = eval(pointsValue);
						var codes = [];
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
							var range_upValue=pointValue[i].range_up;
							var range_downValue = pointValue[i].range_down;
							if(range_upValue == "null"){
								range_upValue = 10000;
							}
							if(range_downValue == "null"){
								range_downValue = 0;
							}
							//alert("range_upValue="+range_upValue+":range_downValue="+range_downValue+":");
							var dataItme;
							var piValue;
							var pointName = pointValue[i].name;
							//查询实时数据数据
							$.ajax({
								url : "XipSssjAction.do",
								type : "get",
								async : false, //同步执行
								dateType : "json",
								data:{
									method:"getPointById",
									p_i_id : pointIds[i],
									begin:'',
									end:end.format("yyyy-MM-dd hh:mm:ss")
								},
								success : function(data) {
									piValue = data;
									for (var i = 0; i < data.length; i++) {
										if(pointValue.length < 2){
											dataItme={
													value:data[i],
													tooltip:{
														trigger: 'axis',
														 show : true
													}
												}
										}else{
											if(range_upValue == 0){
												var value = 0;
											}else{
												var value = (data[i]-range_downValue)/((range_upValue-range_downValue)/100);
											}
											dataItme={
													value:value,
													tooltip:{
														trigger: 'axis',
														 show : true
													}
												}
										}
										res.push(dataItme);
									}
								}
							}) ;
							//异常点数据
							var warns;
							
							$.ajax({
								url : "XipWarnningAction.do",
								type : "get",
								async : false, //同步执行
								dateType : "json",
								data:{
									method:"getWarnningByDate",
									p_i_id:pointIds[i],
									startTime:'',
									endTime:''
								},
								success:function(data){
										warns=data;
								}
							});
							var item ={
									name:name[i],
									type:'line',
									data:res,
									large:true,
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
												//alert(piValue.length+"   "+warns.length);
												for (var i = 0; i < piValue.length; i++) {  
													//times记录时间段出现异常点的次数
													var times = 0;
													//遍历查询出的异常点数
													for (var j = 0; j < warns.length; j++) {
															//判断时间是否有等的点
														for(var k = 0; k < allTime.length; k++)
															if(warns[j].w_date == allTime[k]){
																var value = (data[i]-range_downValue)/((range_upValue-range_downValue)/100);
																data.push({name: '异常数据',value:piValue[k], xAxis: new Date(warns[j].w_date).format("yyyy-MM-dd hh:mm:ss"), yAxis:value})
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
    
	/**
	 * 创建折线图
	 * @param callback
	 */
	function myChartSetOption(callback){
		myChart.setOption(option,true);
		callback();
	}
	/**
	 * 生成折线图下面的table信息
	 */
	function createInfo(){
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
    		 $("#pointsInfo").append("<tr><td>"+rowNum+"</td><td hidden='true' id='id_"+i+"'>"+points[i].id+"</td><td style='text-align:center'><input type='hidden' id='"+i+"' name='mycolor' type='text' value='' class='iColorPicker'/></td><td style='text-align:center' id='name_"+i+"'>"+name+"</td><td style='text-align:center' id='code_"+i+"'>"+code+"</td><td style='text-align:center' id='t_p_unit_"+i+"'>"+t_p_unit+"</td><td style='text-align:center' id='currentValue_"+i+"'>"+currentValue+"</td><td style='text-align:center' ><input type='text' id='range_down_"+i+"' value='"+range_down+"'></td><td style='text-align:center' ><input id='range_up_"+i+"' type='text' value='"+range_up+"'></td><td style='text-align:center' id='refesh_"+i+"'><a id='a_sssj_"+i+"' href='javascript:void(0)'>刷新</a></td></tr>")
 		}
    	iColorPicker();
	}
	 /**	
     * 点击实时数据查询按钮事件
     */
	function submit(){
		var isHistory = validIsSelectTime();
//		if(pointsValue=="[]"){
//    		alert('请测点信息!');
//    	}else{
//    		var isLoadEcharts = $("#isLoadEcharts").val();
//    		if(isLoadEcharts == "false"){
//    			loadEcharts();
//    		}
//    	}
		if(isHistory == true){
			$("#submitHistory").click();
		}else{
			$("#submitSssj").click();
		}
	}
	
	