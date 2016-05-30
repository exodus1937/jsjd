function initEcharts(ec){
	myChart = ec.init(document.getElementById('myChart'));
}
function createOption(nowDate){
	var pointsName = $("#selectPiname").val();
	var pointsCode = $("#selectPicode").val();
	var names = pointsName.split(",");
	var codes = pointsCode.split(",");
//	alert(names.length+"    "+codes.length);
	option = {
			tooltip : {
		        trigger: 'axis',
		        show : true
		    },
		    legend: {
		    	show:true,
		        data:function(){
		        	var res = [];
		        	for(var i = 0; i<names.length ; i++){
		        		res.push(names[i]);
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
	        			url : "/jsjd/XipSssjAction.do",
	        			type : "post",
	        			async : false, //同步执行
	        			dateType : "json",
	        			data : {
	        				method:"getIndexWindowLineX",
	        				date:nowDate.format("yyyy-MM-dd hh:mm:ss")
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
			  for(var i = 0;i<codes.length;i++){
				  var res = [];
				  $.ajax({
						url : "/jsjd/XipSssjAction.do",
						type : "post",
						async : false, //同步执行
						dateType : "json",
						data:{
							method:"getIndexWindowLineData",
							date:nowDate.format("yyyy-MM-dd hh:mm:ss"),
							pi_code:codes[i]
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
							name:names[i],
							data:res,
							large:true
				 }
				  serie.push(item)
			  }
			  return serie;
		  }()
	}
}
