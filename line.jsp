<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
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
<script src="<%=request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
<script src="<%=request.getContextPath() %>/iColorPickerLink/iColorPicker.js"></script>
<script src="<%=request.getContextPath() %>/tab/timeValidate.js"></script>
<script src="<%=request.getContextPath() %>/tab/sssj_util.js"></script>
<script src="<%=request.getContextPath() %>/tab/sssj.js"></script>
<script src="<%=request.getContextPath() %>/tab/history.js"></script>
<script src="<%=request.getContextPath() %>/tab/goBack.js"></script>
<script src="<%=request.getContextPath() %>/tab/js/line.js"></script>
</head>
<body>
	<div>
		<!-- 保存折线图的信息  -->
		<input type="hidden" id="pointsValue" value="<%=request.getAttribute("pointsValue")%>"/>
		<input type="hidden" id="isLoadEcharts" value="false"/>
		<!-- 
		保存我的关注信息 
		-->
		<input type="hidden" type="text" id="myAttention" value='<%=request.getAttribute("pageModelList")%>'/>
		<input type="hidden" type="text" id="totalPage" value='<%=request.getAttribute("totalPage")%>'/>
		<!-- 保存当前页数  -->
		<input type='hidden' type="text" id="pageNum" value="1"/>
		<!-- 保存已选择的我的关注信息 -->
		<input type='hidden' type="text" id="selectIds" value=""/>
		<!-- 保存当前页选中项的信息  -->
		<input type='hidden' type="text" id="currentPageSelected" value=""/>
		<!--header开始-->
		
		<div class="row">
			<form action="XipSssjAction.do" >
			    <input type="hidden" name="method" value="getMyAttention">
				<div class="col-lg-2">
					<div class="input-group input-group-sm">
					  <span class="input-group-addon" id="sizing-addon3">测点名称</span>
					  <input name="name" type="text" class="form-control" placeholder="" aria-describedby="sizing-addon3"/>
					</div>
				</div>
				<div class="col-lg-2">
					<div class="input-group input-group-sm">
					  <span class="input-group-addon" id="sizing-addon3">系统</span>
					  <input name="xitong" type="text" class="form-control" placeholder="" aria-describedby="sizing-addon3">
					</div>
				</div>
				<div class="col-lg-2">
					<div class="input-group input-group-sm">
						<input id="search" class="btn btn-default active btn-sm" type="submit" value="搜索">
					</div>
				</div>
				<div class="col-lg-4">
				</div>
				<div class="col-lg-1">
							<div class="input-group input-group-sm">
								<input id="clearSelect" class="btn btn-default active btn-sm" type="button" value="清空选中项">
							</div>
				</div>
				<div class="col-lg-1">
					<div class="input-group input-group-sm">
						<input id="createLine" class="btn btn-default active btn-sm" type="button" value="生成折线">
					</div>
				</div>
			</form>
		</div>
		</div>
		<div class="clear"></div>
		<div id="content">
			<div class="tab_1">
				<table class="table table-bordered table-condensed table-striped table-hover">
					<thead>
						<tr>
							<th class="ched"></th>
							<th>测点名称</th>
							<th>测点编号</th>
							<th class="ched"></th>
							<th>测点名称</th>
							<th>测点编号</th>
							<th class="ched"></th>
							<th>测点名称</th>
							<th>测点编号</th>
						</tr>
					</thead>
					<tbody>
						<tr style="height: 34px">
							<td id="td_checkbox_0"></td>
							<td id="td_name_0"></td>
							<td id="td_code_0"></td>
							<td id="td_checkbox_1"></td>
							<td id="td_name_1"></td>
							<td id="td_code_1"></td>
							<td id="td_checkbox_2"></td>
							<td id="td_name_2"></td>
							<td id="td_code_2"></td>
						</tr>
						<tr style="height: 34px">
							<td id="td_checkbox_3"></td>
							<td id="td_name_3"></td>
							<td id="td_code_3"></td>
							<td id="td_checkbox_4"></td>
							<td id="td_name_4"></td>
							<td id="td_code_4"></td>
							<td id="td_checkbox_5"></td>
							<td id="td_name_5"></td>
							<td id="td_code_5"></td>
						</tr>
						<tr style="height: 34px">
							<td id="td_checkbox_6"></td>
							<td id="td_name_6"></td>
							<td id="td_code_6"></td>
							<td id="td_checkbox_7"></td>
							<td id="td_name_7"></td>
							<td id="td_code_7"></td>
							<td id="td_checkbox_8"></td>
							<td id="td_name_8"></td>
							<td id="td_code_8"></td>
						</tr>
						<tr style="height: 34px">
							<td id="td_checkbox_9"></td>
							<td id="td_name_9"></td>
							<td id="td_code_9"></td>
							<td id="td_checkbox_10"></td>
							<td id="td_name_10"></td>
							<td id="td_code_10"></td>
							<td id="td_checkbox_11"></td>
							<td id="td_name_11"></td>
							<td id="td_code_11"></td>
						</tr>
						<tr style="height: 34px">
							<td id="td_checkbox_12"></td>
							<td id="td_name_12"></td>
							<td id="td_code_12"></td>
							<td id="td_checkbox_13"></td>
							<td id="td_name_13"></td>
							<td id="td_code_13"></td>
							<td id="td_checkbox_14"></td>
							<td id="td_name_14"></td>
							<td id="td_code_14"></td>
						</tr>
						<tr style="height: 34px">
							<td id="td_checkbox_15"></td>
							<td id="td_name_15"></td>
							<td id="td_code_15"></td>
							<td id="td_checkbox_16"></td>
							<td id="td_name_16"></td>
							<td id="td_code_16"></td>
							<td id="td_checkbox_17"></td>
							<td id="td_name_17"></td>
							<td id="td_code_17"></td>
						</tr>
					</tbody>
				</table>
				<div class="row">
					<div class="col-lg-5">
					</div>
					<div class="col-lg-3">
						<nav>
						  <ul class="pagination">
						    <li id="li_pre">
						      <a id="a_pre" href="#" aria-label="Previous">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
						    <!-- 
						    	<li><a href="#">1</a></li>
							    <li><a href="#">2</a></li>
							    <li><a href="#">3</a></li>
							    <li><a href="#">4</a></li>
							    <li><a href="#">5</a></li>
						     -->
						    <li id="li_next">
						      <a id="a_next" href="#" aria-label="Next">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>
						  </ul>
						</nav>
					</div>
					<div class="col-lg-3">
					</div>
				</div>
				
			</div>
			
			<div id="line" style="height: 350px">
				<div class="sublist">
					<div>
						<div>
							<select id="timeSelect">
								<option value="year" id="time">年</option>
								<option value="month" id="time">月</option>
								<option value="day" id="time">日</option>
								<option value="hour" id="time" selected>时</option>
							</select> <span>时间:</span>
							<!-- 时间控件 -->
							<input id="startTime_year"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy',alwaysUseStartDate:true})" />
							<input id="startTime_month"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM',alwaysUseStartDate:true})" />
							<input id="startTime_day"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" />
							<input id="startTime_hour"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:00:00',alwaysUseStartDate:true})" />
							<span style="width: 20px; height: 20px; text-align: center;">至</span>
							<input id="endTime_year"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy',alwaysUseStartDate:true})" />
							<input id="endTime_month"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM',alwaysUseStartDate:true})" />
							<input id="endTime_day"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" />
							<input id="endTime_hour"
								onFocus="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:00:00',alwaysUseStartDate:true})" />
							<!-- 查询测点 -->
							<input type="button"
								id="openWindow" value="查询测点"  class="btn btn-default btn-sm active"/>   
							<!-- 保存查询的测点信息 -->

							<!-- 提交查询 -->
							<input  type="button" class='btn btn-default btn-sm active'
								value="查询 " id="submitHistory" />  
								<input id="submitSssj" type="button" class='btn btn-default btn-sm active'
										value="实时" />
								<input id="go" type="button" class='btn btn-default btn-sm active'
								value="前一小时" /> <input
								id="back" type="button" value="后一小时" class='btn btn-default btn-sm active' 
							 />
						</div>
					</div>
				</div>
				<div id="myCharts" style="height: 350px"></div>
			</div>
			<div class="tab_2">
				<table id="pointsInfo" class="table table-bordered">
						<tr>
							<th>序号</th>
							<th>颜色</th>
							<th>测点名称</th>
							<th>测点编号</th>
							<th>单位</th>
							<th>当前值</th>
							<th>里程下线</th>
							<th>里程上线</th>
							<th>刷新折线</th>
						</tr>
				</table>
			</div>
		</div>
		<!--header结束-->
		<!--content开始-->
		<div id="content" class="ub-f1 tx-l "></div>
</body>

<script type="text/javascript">
  $(function(){
	  //处理空
	  var pointsValue = $("#pointsValue").val();
	  var myAttention = $("#myAttention").val();
	  var myAttentionJson = eval(myAttention);  
	  //显示我的关注数据
	  for(var i=0;i<myAttentionJson.length;i++){
			$("#td_name_"+i).html(myAttentionJson[i].t_p_name);
			$("#td_code_"+i).html(myAttentionJson[i].t_p_code);
			//$("#td_checkbox_"+i).html("<input type='checkbox' />");
			$("#td_checkbox_"+i).html("<input name='myAttentionCheckBox' type='checkbox' /><input id='td_t_p_unit_"+i+"' type='hidden' value='"+myAttentionJson[i].t_p_unit+"'/><input id='td_id_"+i+"' type='hidden' value='"+myAttentionJson[i].p_i_id+"'/><input id='td_range_up_"+i+"' type='hidden' value='"+myAttentionJson[i].range_up+"'/><input id='td_range_down_"+i+"' type='hidden' value='"+myAttentionJson[i].range_down+"'/>");
	  }
	  //生成页数
	  var totalPage = $("#totalPage").val();
	  totalPage = parseInt(totalPage);
	  if(totalPage == 0 || totalPage == ""){       
		  totalPage = 1;   
	  }
	  for(var i=totalPage;i>=1;i--){
		 $("#li_pre").after("<li id='li_"+i+"'><a id='pageNo_"+i+"' href='#' onclick='getPageNoList(this)'>"+i+"</a></li>");	
	  }
	 
	  vilidateRange(pointsValue);
      var isHistory = false;
		   //隐藏控件
		  $('#startTime_year').hide();
	    	$('#endTime_year').hide();
	    	$('#startTime_month').hide();
	    	$('#endTime_month').hide();
	    	$('#startTime_day').hide();
	    	$('#endTime_day').hide();
	    	$("#go").hide();
	    	$("#back").hide();
	    	
	    	//获取echarts的ec变量
	    	var tempEC;
	    	var pointsValue = $("#pointsValue").val();
	    	//判断是否生成折线图	    
	    	loadEcharts();
	    	function loadEcharts(){    
	    		require.config({
	    			paths : {   
	    				echarts : 'echars/www/js'
	    			}
	    		});
	    		require([ 'echarts', 
	    			          'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
	    			          'echarts/chart/bar'
	    			],function(ec){
	    				tempEC = ec;
	    				//判断是否生成折线图
	    		    	if(pointsValue=="[]"){
	    		    		alert('请测点信息!');
	    		    	}else{
	    		    		var isHistory = validIsSelectTime();
	    		    		if(isHistory == true){
		    		    		
	    		    			initHistory(ec)
	    		    		}else{
	    						initSssjEcharts(ec);
	    		    		}
	    		    	}
	    			}
	    		);
	    		$("#isLoadEcharts").val("true");
	    	}
	    	function initSssjEcharts(ec){
	    		initSssj(ec);
	    	}
	    	function initHistoryEcharts(ec){
	    		initHistory(ec);
	    	}
	    	//切换时间选项
	    	var time = $("#timeSelect option:selected").val();
	    	$("#timeSelect").change(function(){
	    					time = $('#timeSelect option:selected').val();
	    					$('#startTime_year').hide();
	    					$('#endTime_year').hide();
	    					$('#startTime_month').hide();
	    					$('#endTime_month').hide();
	    					$('#startTime_day').hide();
	    					$('#endTime_day').hide();
	    					$('#startTime_hour').hide();
	    					$('#endTime_hour').hide();  
	    					$('#startTime_sec').hide();
	    					$('#endTime_sec').hide();
	    					if(time == 'year'){
	    						$('#startTime_year').show();
	    						$('#endTime_year').show();
	    					}
	    					if(time == 'month'){
	    						$('#startTime_month').show();
	    						$('#endTime_month').show();
	    					}
	    					if(time == 'day'){
	    						$('#startTime_day').show();
	    						$('#endTime_day').show();
	    					}
	    					if(time == 'hour'){
	    						$('#startTime_hour').show();
	    						$('#endTime_hour').show();
	    					}
	    	})

	    	<!-- 打开选择测点弹窗 -->
	    	$("#openWindow").click(function(){
		    	//if(myChart_history){ 
	    		//	myChart_history.clear();
			    //}if(myChart){
	    		//	myChart.clear();
				//}
	    		isHistory = validIsSelectTime();
	    		clearInterval(timeTicket);
	    		if(isHistory){
	    			$("#go").show();
	    	    	$("#back").show();	
			    }else{
			    	$("#go").hide();
	    	    	$("#back").hide();	
			    }
	    		window.open ("<%=request.getContextPath()%>/main?xwl=23XW18WXGGMZ&userId=<%= request.getAttribute("userId") %>", "newwindow", "modal=yes,height=600, width=800, toolbar= no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		    })

			$("#submitSssj").click(function(){
				var pointsValue = $("#pointsValue").val();
				vilidateRange(pointsValue);
				$("#go").hide();
    	    	$("#back").hide();	
    	    	var type =$("#timeSelect option:selected").val();
    	    	if(type){
    	    		if(type=="hour"){
    	    			$("#startTime_hour"	).val("");
    	    			$("#endTime_hour").val("");
    	    		}
    	    		if(type=="day"){
    	    			$("#startTime_day").val("");
    	    			$("#endTime_day").val("");
    	    		}if(type=="month"){
    	    			$("#startTime_month").val("");
    	    			$("#endTime_month").val("");
    	    		}if(type=="year"){
    	    			$("#startTime_year").val("");
    	    			$("#endTime_year").val("");
    	    		}
            	}
    	    	
				initSssj(tempEC);
			})
			$("#submitHistory").click(function(){
				var flag = "true";
				flag = validate();
				if(flag == "true"){
					var pointsValue = $("#pointsValue").val();
					vilidateRange(pointsValue);
					var type =$("#timeSelect option:selected").val();
					var startTime;
					var endTime;
	    	    	if(type){
	    	    		if(type=="hour"){
	    	    			startTime = $("#startTime_hour"	).val();
	    	    			endTime = $("#endTime_hour").val();
	    	    		}
	    	    		if(type=="day"){
	    	    			startTime = $("#startTime_day").val();
	    	    			endTime = $("#endTime_day").val();
	    	    		}if(type=="month"){
	    	    			startTime = $("#startTime_month").val();
	    	    			endTime = $("#endTime_month").val();
	    	    		}if(type=="year"){
	    	    			startTime = $("#startTime_year").val();
	    	    			endTime = $("#endTime_year").val();
	    	    		}
	            	}
					if(endTime == "" || startTime == ""){
						alert("请先选择时间");	
					}else{
						$("#go").show();
		    	    	$("#back").show();
						clearInterval(timeTicket);
						initHistory(tempEC);
					}
				}
			})
			$(document).on("click","a[id^='a_sssj_']",function(){
				var pointsValue = $("#pointsValue").val();
				var points = eval(pointsValue);
				var new_pointsValue = "";
				var referf = true;
				for(var i=0;i<points.length;i++){
					var pointsInfo = "";
					var id = $("#id_"+i).text();
					var code = $("#code_"+i).text();
					var name = $("#name_"+i).text();
					var range_up = $("#range_up_"+i).val();
					var range_down = $("#range_down_"+i).val();
					var t_p_unit = $("#t_p_unit_"+i).val();
					if(!check(range_up)){
						referf = false;
					}
					if(!check(range_down)){
						referf = false;
					}
					pointsInfo =  "{'t_p_unit':'"+t_p_unit+"','id':'"+id+"','code':'"+code+"','name':'"+name+"','range_up':'"+range_up+"','range_down':'"+range_down+"'}"
					new_pointsValue = new_pointsValue + pointsInfo + ",";
				}
				if(referf){
					new_pointsValue = new_pointsValue.substr(0,new_pointsValue.length-1);
					//alert("["+new_pointsValue+"]");
					$("#pointsValue").val("["+new_pointsValue+"]");
					myChart.clear();
					createOption();
					myChartSetOption(createInfo);
				}else{
					alert("最大值，最小值请填写数字");
				}
			})
			$(document).on("click","a[id^='a_history_']",function(){
				var historyPointsValue = $("#pointsValue").val();
				var points = eval(historyPointsValue);
				var new_pointsValue = "";
				var referf = true;
				for(var i=0;i<points.length;i++){
					var pointsInfo = "";
					var id = $("#history_id_"+i).text();
					var code = $("#history_code_"+i).text();
					var name = $("#history_name_"+i).text();
					var range_up = $("#history_range_up_"+i).val();
					var range_down = $("#history_range_down_"+i).val();
					var t_p_unit = $("#t_p_unit_"+i).val();
					if(!check(range_up)){
						referf = false;
					}
					if(!check(range_down)){
						referf = false;
					}
					pointsInfo =  "{'t_p_unit':'"+t_p_unit+"','id':'"+id+"','code':'"+code+"','name':'"+name+"','range_up':'"+range_up+"','range_down':'"+range_down+"'}"
					new_pointsValue = new_pointsValue + pointsInfo + ",";
				}
				if(referf){
					new_pointsValue = new_pointsValue.substr(0,new_pointsValue.length-1);
					//alert("["+new_pointsValue+"]");
					//alert("["+new_pointsValue+"]")
					$("#pointsValue").val("["+new_pointsValue+"]");
					myChart_history.clear();
					createHistoryOption();
					myChartHistorySetOption(createHistoryInfo);
				}else{
					alert("最大值，最小值请填写数字");
				}
			})

			$("#a_pre").click(function(){
				    var pageNum = $("#pageNum").val();
				    pageNum = parseInt(pageNum);
				    if(pageNum == 1){
					    return false;
					}else{
						getPrelist(pageNum);
						return false;
					}
			})
			$("#a_next").click(function(){
				var pageNum = $("#pageNum").val();
				var totalpage = $("#totalPage").val();
				pageNum = parseInt(pageNum); 
				totalpage = parseInt(totalpage); 
				if(pageNum == totalpage){
					return false;
				}else{
					getNextlist(pageNum);
					return false;
				}
			})

			$("#createLine").click(function(){
				
				compareInfo();
				selectData()
	             var new_pointsValue = $("#selectIds").val();
	             if(new_pointsValue != ""){
					 new_pointsValue = "["+new_pointsValue + "]";
					 $("#pointsValue").val(new_pointsValue);
					 submit();
				 }else{
					  return false;
				 }
	             currentPageSelect();
			}) 

			$("#clearSelect").click(function(){
				$('input[type="checkbox"]').each(function(){
					$(this).attr("checked",false);
				})
				$("#selectIds").val("");
			})
			$("#search").click(function(){
				var name = $("input[name='name']").val();
                var xitong = $("input[name='xitong']").val();
                $.ajax({
					url : "XipSssjAction.do",
					data:{
						method:"getMyAttentionByParam",
						name:name,
						xitong:xitong
						},
					type : "post",
					async : false, //同步执行
					dateType : "json",
					success : function(data) {
						var lists = data.lists;
						var new_totalPage = data.totalPage;
						//清除数据
						for(var i=0;i<18;i++){
							$("#td_name_"+i).html("");
							$("#td_code_"+i).html("");
							if($("#td_checkbox_"+i)){
								$("#td_checkbox_"+i).children("input").remove();
							}
						}
						var old_totalPage = $("#totalPage").val();
						old_totalPage = parseInt(old_totalPage);
						if(old_totalPage == 0){
							old_totalPage = 1;
						} 
						for(var i=1;i<=old_totalPage;i++){
							$("#li_"+i).remove();
						}
						if(new_totalPage == 0){
							new_totalPage = 1;
						}
						$("#totalPage").val(new_totalPage);
						//清除数据完毕
						for(var i=new_totalPage;i>=1;i--){
							 $("#li_pre").after("<li id='li_"+i+"'><a id='pageNo_"+i+"' href='#' onclick='getPageNoList(this)'>"+i+"</a></li>");	
						}
						for(var i=0;i<lists.length;i++){
							$("#td_name_"+i).html(lists[i].t_p_name);
							$("#td_code_"+i).html(lists[i].t_p_code);
							$("#td_checkbox_"+i).html("<input id='myAttentionCheckBox' type='checkbox' /><input id='td_id_"+i+"' type='hidden' value='"+lists[i].p_i_id+"'/><input id='td_range_up_"+i+"' type='hidden' value='"+lists[i].range_up+"'/><input id='td_range_down_"+i+"' type='hidden' value='"+lists[i].range_down+"'/>");
						}  
					}
				})	
                return false;
			})
			 //绑定回车事件
			  $("input[name='name']").bind('keypress',function(event){
		            if(event.keyCode == "13"){
		                var name = $("input[name='name']").val();
		                var xitong = $("input[name='xitong']").val();
		                $.ajax({
							url : "XipSssjAction.do",
							data:{
								method:"getMyAttentionByParam",
								name:name,
								xitong:xitong
								},
							type : "post",
							async : false, //同步执行
							dateType : "json",
							success : function(data) {
								var lists = data.lists;
								var new_totalPage = data.totalPage;
								//清除数据
								for(var i=0;i<18;i++){
									$("#td_name_"+i).html("");
									$("#td_code_"+i).html("");
									if($("#td_checkbox_"+i)){
										$("#td_checkbox_"+i).children("input").remove();
									}
								}
								var old_totalPage = $("#totalPage").val();
								old_totalPage = parseInt(old_totalPage);
								if(old_totalPage == 0){
									old_totalPage = 1;
								}
								for(var i=1;i<=old_totalPage;i++){
									$("#li_"+i).remove();
								}
								if(new_totalPage == 0){
									new_totalPage = 1;
								}
								$("#totalPage").val(new_totalPage);
								//清除数据完毕
								for(var i=new_totalPage;i>=1;i--){
									 $("#li_pre").after("<li id='li_"+i+"'><a id='pageNo_"+i+"' href='#' onclick='getPageNoList(this)'>"+i+"</a></li>");	
								}
								for(var i=0;i<lists.length;i++){
									$("#td_name_"+i).html(lists[i].t_p_name);
									$("#td_code_"+i).html(lists[i].t_p_code);
									$("#td_checkbox_"+i).html("<input id='myAttentionCheckBox' type='checkbox' /><input id='td_id_"+i+"' type='hidden' value='"+lists[i].p_i_id+"'/><input id='td_range_up_"+i+"' type='hidden' value='"+lists[i].range_up+"'/><input id='td_range_down_"+i+"' type='hidden' value='"+lists[i].range_down+"'/>");
								}    
							}
						})	
		                return false;
		            }
		       });
	    	$("input[name='xitong']").bind('keypress',function(event){
	            if(event.keyCode == "13"){
	                var name = $("input[name='name']").val();
	                var xitong = $("input[name='xitong']").val();
	                $.ajax({
						url : "XipSssjAction.do",
						data:{
							method:"getMyAttentionByParam",
							name:name,
							xitong:xitong
							},
						type : "post",
						async : false, //同步执行
						dateType : "json",
						success : function(data) {
							var lists = data.lists;
							var new_totalPage = data.totalPage;
							//清除数据
							for(var i=0;i<18;i++){
								$("#td_name_"+i).html("");
								$("#td_code_"+i).html("");
								if($("#td_checkbox_"+i)){
									$("#td_checkbox_"+i).children("input").remove();
								}
							}
							var old_totalPage = $("#totalPage").val();
							old_totalPage = parseInt(old_totalPage);
							if(old_totalPage == 0){
								old_totalPage = 1;
							} 
							for(var i=1;i<=old_totalPage;i++){
								$("#li_"+i).remove();
							}
							if(new_totalPage == 0){
								new_totalPage = 1;
							}
							$("#totalPage").val(new_totalPage);
							//清除数据完毕
							for(var i=new_totalPage;i>=1;i--){
								 $("#li_pre").after("<li id='li_"+i+"'><a id='pageNo_"+i+"' href='#' onclick='getPageNoList(this)'>"+i+"</a></li>");	
							}
							for(var i=0;i<lists.length;i++){
								$("#td_name_"+i).html(lists[i].t_p_name);
								$("#td_code_"+i).html(lists[i].t_p_code);
								$("#td_checkbox_"+i).html("<input id='myAttentionCheckBox' type='checkbox' /><input id='td_id_"+i+"' type='hidden' value='"+lists[i].p_i_id+"'/><input id='td_range_up_"+i+"' type='hidden' value='"+lists[i].range_up+"'/><input id='td_range_down_"+i+"' type='hidden' value='"+lists[i].range_down+"'/>");
							} 
						}
					})	
	                return false;
	            }
	       });
	  }) 
    </script>
</html>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          