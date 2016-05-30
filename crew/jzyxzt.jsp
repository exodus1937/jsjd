<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.ResourceBundle" %>
<sj:head locale="zh-CN" jqueryui="true"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<% 
  HashMap map=(HashMap)session.getAttribute("XzSessionVars");
  String _userId=(String)map.get("userId");
  String path=request.getContextPath();
  %>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
	    <meta charset="UTF-8"/>
        <link rel="stylesheet" type="text/css" href="css/jzyxzt.css"/>
        <script src="js/jquery.js"></script>
        <script src="js/index_params.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
		<script src="<%=request.getContextPath() %>/echars/dist/echarts.js"></script>
		<script src="<%=request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
		<script src="<%=request.getContextPath() %>/tab/sssj_util.js"></script>
        <script sype="text/javascript">
		        var userID='<%=_userId%>';
		        document.onreadystatechange=function(){
		        	if(document.readyState == "complete"){
		        		getTargetColumn('4','','1');
		        		getTargetColumnValues('4','','1');
		        		getTargetColumn1('4','','1');
		        		getTargetDl('1');
		        		date();
		        		date1();
		        		//getTargetDl();
		        		
		        	}
		        };
		        function getDateStion(a,b,c,d){//a:模块位置b:电厂ID c:指标类型 d：区别
		        	getTargetColumn(a,b,c);
	        		getTargetColumnValues(a,b,c);
	        		getTargetColumn1(a,b,c);
	        		getTargetDl(d);
	        		date1();
		        }
		        function cancel(){
		        	$('#table1').addClass('d_n_1');
		        }
        </script>
        <script type="text/javascript">
var res ;
var option;
var myChart;
var pointNames;
var pi_codes;
function date1(){
	$("#line_close").click(function(){
		//$("#light").css("display","none");//点击隐藏
		$("#tt").val('');
		pi_codes = '';
		$("#dd").val('');
		pointNames = '';
		myChart.clear();
		$("#line").hide();
	});
	$(".line_a").click(function(){
		var pi_code = this.id;
		var pointName = '';
		$.ajax({
			url : "<%=request.getContextPath() %>/XipHistoryAction.do",
			data:{
				method:"getPointNameByPiCode",
				picode:pi_code
				},
			type : "post",
			async : false, //同步执行
			dateType : "text",
			success : function(data) {
				pointName = data;
			},
			
		})
		
		pi_codes = $("#tt").val();
		pointNames = $("#dd").val();
		if(pi_codes !== '' && pi_codes !== null){
			var codeTemp= pi_codes.split(',');
			if(codeTemp.length == 10){
				alert("最多选择十条数据");
				flag = false;
			}
			var flag = true;
			for(var i=0;i<codeTemp.length;i++){
				if(codeTemp[i] == pi_code){
					flag = false;
					alert("此数据已在图表中存在");
					return ;
				}
			}
			if(flag == true){
				pi_codes = pi_codes + "," + pi_code;
				pointNames = pointNames + "," +  pointName;
			}
		}else{
			pi_codes = pi_codes + pi_code;
			pointNames = pointNames + pointName;
		}
		$("#tt").val(pi_codes);  
		$("#dd").val(pointNames);
	//	pointName = "实时负荷(WM)" 
		createOption();
		myChart.setOption(option)
		document.getElementById('line').style.display='block';
		return false;
		
	});
	$("#table_a").click(function(){
		document.getElementById('table').style.display='block';
	});
	
	function createOption(){
		option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:function(){
				       // alert(pointNames.split(',').length);
						return pointNames.split(',');
					}()
			    },
			    toolbox: {
			    	orient: 'vertical',
			        x: 'right',
			        y: 'center',
			        show : true,
			        feature : {
			            magicType : {show: true, type: ['line', 'bar']},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : function(){
				            var TimeDate = [];
			            	$.ajax({
			        			url : "<%=request.getContextPath() %>/XipHistoryAction.do",
			        			data:{
			        				method:"IndexLineXData",
			        				},
			        			type : "post",
			        			async : false, //同步执行
			        			dateType : "json",
			        			success : function(data) {
			        				for(var i=0;i<data.length;i++){
			        					TimeDate.push(new Date(data[i]).format("yyyy-MM-dd hh:mm:ss"))
					        		}
			        			},
			        		})
			        		return TimeDate;
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
			    series : function(){
				    //alert("@"+pi_codes+"@");
			    	var code = pi_codes.split(',');
			    	var name = pointNames.split(',');
					var serie = [];
					
					for(var i=0;i<code.length;i++){
						//alert(code[i]);
						var datas = [];
						var item = {
								 type:'line',
								 name:name[i],
								 large:true,
								 data:function(){
									 $.ajax({
						        			url : "<%=request.getContextPath() %>/XipHistoryAction.do",
						        			data:{
						        				method:"IndexLine",
						        				pi_code:code[i]
						        				},
						        			type : "post",
						        			async : false, //同步执行
						        			dateType : "json",
						        			success : function(data) {
							        			for(var i=0;i<data.length;i++){
							        				datas.push(data[i].value);
								        		}
						        			},
						        		})
						        		return datas;
								 }()
						}
						serie.push(item);
					}
					//alert(serie[0]);
					return serie;
				}()
			};
	}
	require.config({
		paths : {
			echarts : '<%=request.getContextPath()%>/echars/www/js'
		}
	});
	require([ 'echarts', 
		          'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
		          'echarts/chart/bar'
		],function(ec){
			myChart = ec.init(document.getElementById('mychart'));
		}
	);
}

</script>
		<title>机组运行状态</title>
	</head>
	<body style="background-color: rgb(252, 249, 249);">
		<div class="bj2">
		
	    <div class="tt1">
	      	
		<div id="hd01"><span onclick="getDateStion('4','','1','1')">火电</span></div>
		<div id="fd01"><span onclick="getDateStion('4','','2','1')">风电</span></div>
		<div id="sd01"><span onclick="getDateStion('4','','3','1')">水电</span></div>
		<div id="gf01"><span onclick="getDateStion('4','','4','1')">光伏</span></div>
	    </div>
	    
	      <div id="body_1"></div>
	     
		  <!------------------------body_1结束---------------------->
		   <div id="body_2"></div>
		  <!---------------------------------------body_2结束------------------------->
		  <div id="body_3"></div>
		   <!---------------------------------------body_3结束------------------------->
		   <div id="body_4"></div>
		     
		  <!----------------------------------body_4结束-------------------------------->
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		<!-----------------------------------------bottom------------------------>
			<!-- <div class="h-b">
	       <div class="h7-1">
			<span>图例说明:</span>
			
		</div>
		<div class="h7-2">
				<img src="img/red1.png" class="red-02"/>
			<span>运行</span>
			
		</div>
			<div class="h7-3">
				<img src="img/green.png" class="green-02"/>
			
			<span>停机</span>
			
		</div>
		<div class="h7-4">
				<img src="img/yellow.png" class="yellow-02"/>
			<span>通讯中断</span>
			
		</div>
			
		
		</div> -->
		

		</div>
		
		<!-------------------------------------------表格------------------------>
		
		<div id="table1"  class="d_n_1"></div>
		<!-- <table id="table1" class="d_n_1" cellpadding="0px" cellspacing="0px" border="1px" rules=all>
			

		</table> -->
	
		<!-- <input type="hidden" id="tt"  /> 
        <input type="hidden" id="dd"  />    
        <div id="line"  class="white_content">
				<a href='javascript:void(0)' id="line_close">关闭</a>
				<div style="height:300px;width:800px" id="mychart"></div>   
        </div> -->
	</body>
	<script type="text/javascript" >
	function date(){
		
			$('#body_2,#body_3,#body_4').addClass('d_n_1');
			$('#hd01,#fd01,#sd01,#gf01').addClass('active01');
			$('#hd01').addClass('active02');
			$('#hd01,#fd01,#sd01,#gf01').click(function(){
				$(this).addClass('active02').siblings().removeClass('active02');
			})
			$('#hd01').click(function(){
				$('#body_2,#body_3,#body_4').addClass('d_n_1');
				$('#body_1').removeClass('d_n_1');
			})
				$('#fd01').click(function(){
				$('#body_1,#body_3,#body_4').addClass('d_n_1');
				$('#body_2').removeClass('d_n_1');
			})
			    $('#sd01').click(function(){
				$('#body_1,#body_2,#body_4').addClass('d_n_1');
				$('#body_3').removeClass('d_n_1');
			})
			    $('#gf01').click(function(){
				$('#body_1,#body_3,#body_2').addClass('d_n_1');
				$('#body_4').removeClass('d_n_1');
			})
			    $('#dh_1').click(function(){
			    $('#table1').removeClass('d_n_1');
			    })
			    $('#x-01').click(function(){
			    $('#table1').addClass('d_n_1');
			})

		}
	</script>
</html>
