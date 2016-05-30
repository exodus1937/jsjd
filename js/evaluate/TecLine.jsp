<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script src="<%=request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
	<script src="<%=request.getContextPath() %>/tab/sssj_util.js"></script>
	<script src="<%= request.getContextPath() %>/echars/dist/echarts.js"></script>
	<script src="<%= request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
	<% 
		String id = request.getParameter("id");
	%>
<title>Insert title here</title>
</head>
<body>
	<div id="myChart" style="height:400px"></div>
	<script type="text/javascript">
	$(function(){ 
		//根据id请求数据
		//var id = $("#id").val();
		//alert(id);
		var jsonData =new Object();
		 $.ajax({
				url : "<%=request.getContextPath()%>/XipTecProject.do",
				data : {
					method:"getLineData",
					id:'<%=id%>'
					},
				type : "post",
				async : false, //同步执行
				dateType : "json",
				success : function(data) {
	 				jsonData = data;
				},
				error:function(){
					alert("获取折线图数据失败");
	 		}
			})
		
		var myChart ;
		var option ;
		require.config({
			paths : {
				echarts : '<%=request.getContextPath() %>/echars/www/js'
			}
		});
		require([ 'echarts', 
			          'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
			          'echarts/chart/bar'
			],function(ec){
				myChart = ec.init(document.getElementById("myChart"));
				createOption();
				myChart.setOption(option);
			}
		);
		function createOption(){ 
			option={
					tooltip:{
						 show : true,
						 trigger: 'axis',
				     },
				     legend : {
							show:true,
							data : ['${requestScope.tecProjectVo.tp_name}']
					},
					toolbox: {
				        show : true,
				        feature : {
				            restore : {
				            	show: true
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
						            data:function(){
							            var res = [];
							           	for(var i=0;i<jsonData.length;i++){
											res[i]=new Date(jsonData[i].profit_date).format('yyyy-MM-dd hh:mm:ss');	
									     }
							            return res;
							        }()
						        }
						    ],
					
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
							name:'${requestScope.tecProjectVo.tp_name}',
				            type:'line',
				            data:function(){
					            var res =[];
				            	for(var i=0;i<jsonData.length;i++){
									res[i]=jsonData[i].comperhensive;
							     }
					            return res;
					        }()

						}

					]
			}
		}
		})
	</script>	
</body>
</html>