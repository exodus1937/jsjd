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
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
      
	<head>
		<meta charset="utf-8" />
		<title>京能集团实时技术监督管理系统</title>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<link type="text/css" rel="Stylesheet" href="css/main_style.css" />
        <script src="js/jquery-2.1.1.js" sype="text/javascript"></script>
<span id=localtime></span>
	</head>
	<frameset rows="23%,*,9%" >
			  <frame src="top.jsp" frameborder="0" scrolling="no" noresize="noresize"/>
			  <frame id="centerId" src="center.jsp" frameborder="0" noresize="noresize"/>
			  <frame src="end.jsp" frameborder="0" scrolling="no" noresize="noresize"/>
	</frameset>
	<body>
	
		<%-- <!--Logo区域-->
		<div  style="margin:0 auto;">
			<div id="header">
				<div style="padding-top: 10px;">
					<img src="img/logo_dianchang.png" width="60%" height="60%" align="center">
				</div>
				<div class="tuichu">
					<img src="img/yonghu.png" width=15px height=15px>&nbsp;<%=empname %>&#124;&nbsp;
					<a href="#" onclick="logout(); return false;">退出</a>
				</div>

			</div>
			<!--菜单区域-->
			<div id="menu" >
				<ul  style="list-style: none;width:100%">
				
						<li ><a style="font-family: '微软雅黑';color:white;" href="#"><b>标准法则</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>监督网络</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>技术监督</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>技术管理</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>综合查询</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>对标管理</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>生产报表</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>技术项目管理</b></a>
						</li>
						<li><a style="font-family: '微软雅黑';color:white;" href="#"><b>综合管理</b></a>
						</li>
					
				</ul>
			</div>
			<div id="main" style="width:1280px;margin:0 auto;">
			123
			</div> --%>
			
			

<%-- 			<!--主要区域-->
			<div id="main" style="width:1280px;margin:0 auto;">
				<!--操作区域-->
				<div id="data_one" >
					<div id="shijian">
						<span id="time" style="font-size: 21px;font-weight: bold;"> 
						<script type="text/javascript"> 
						  
						  function showLocale(objD)
						  {
						  	var myDate = new Date();
						  	var month=myDate.getMonth()+1;
						  	var str=myDate.getFullYear()+"年"+month+"月"+myDate.getDate()+"日      "+myDate.getHours()+"时"+ myDate.getMinutes()+"分"+ myDate.getSeconds()+"秒";

						  return(str);
						  }
						  function tick()
						  {
						  var today;
						  today = new Date();
						  document.getElementById("time").innerHTML = showLocale(today);
						  window.setTimeout("tick()", 1000);
						  }
						  tick();
						
						
						</script>
						</span>
					</div>
					<div>
                       <div style="width: 100%;float: left;">
                       	
                
						<div id="tupian1" style="float: left;">
							<div style="float:left;margin:9% 8%;font-size: 21px;">
								实时<br/>负荷
							</div>
							<div class="songti">
									2200 
							</div>
							
						
							<div class="aril">
								WM
							</div>

						</div>

						<div id="tupian2" style="float:right;">
							<div style="float:left;margin:6% 5%;font-size: 21px;">
								实时日<br/>发电量
							</div>
								<div class="songti">
									2000 
							</div>
							
						
							<div class="aril">
								kWh
							</div>
						</div>
					</div>

					<div>
						<div id="tupian3" style="float: left;">
							<div style="float:left;margin:6% 7%;font-size: 21px;">
								实时<br/>排名
							</div>
	
							<div style="font-family: '宋体';font-size: 70px;text-align: center;font-weight: bold;color: white;">
								3
							</div>
						</div>

						<div id="tupian4" style="float:right;">
							<div style="float:left;margin:6% 7%;font-size: 21px;">
								电厂<br/>用率
							</div>
							<div style="font-family: '宋体';font-size: 40px;text-align: center;margin-top:20px;font-weight: bold;color: white;">
								10%
							</div>
						</div>
						       </div>
					<div id="zhibiao" style="float: left;">
						<h3><b style="font-family: '楷体';">快速导航</b></h3>
					</div>
					</div>
	           
					<div id="daohang" style="color: #000000;border: 1px;  width: 570px;height:160px;margin-top:280px;background:#f9f9f9">
						<a href="#" style="color: #000000;">
							<div style="float: left; margin-right:1%;margin-top:3%;" id="kaohe" >
								<h3 style="padding-top: 50%;padding-left: 5%;font-family: '楷体';">考核明细</h3>
							</div>
						</a>
                        <a href="#" style="color: #000000;">
							<div style="float: left; margin-right:1%;margin-top:3%;" id="ziliao" >
							<h3 style="padding-top: 50%;padding-left: 18%;font-family: '楷体';">资料库</h3>
						</div>
						</a>
						<a href="#" style="color: #000000;">
							<div style="float: left; margin-right:-2%;margin-top:3%;" id="shengchan" >
							<h3 style="padding-top: 50%;padding-left: 11%;font-family: '楷体';">生产报表</h3>
						</div>
						</a>
						<a href="#" style="color: #000000;">
							<div style="float: left; margin-top:3%;" id="jiandu" >
							<h3 style="padding-top: 50%;padding-left: 21%;font-family: '楷体';">监督网络</h3>
						</div>
						</a>
					</div>
					
				</div>

				<div id="data_two">

					<div>
						<h2 style="float: left; margin-right: 340px;font-family: '楷体';">报警信息</h2>
						<select name="selectAge" id="selectAge" style="margin-top: 25px ;margin-right:70px;float:right;">
							<option value="1">全厂</option>
							<option value="2">公司</option>
							<option value="3">提示</option>
						</select>
					</div>
				
						<div style="float: left;width: 90%;font-family: '楷体';font-size: 20px;font-weight: bold;" >
							<span style="margin-left: 10%;">
									测点名称
								</span>
							<span style="position:relative;left: 12%">
									报警级别
								</span>
								<span style="position:relative;left: 11%;margin-left: 2%">
								报警值
								</span>
								<span style="position:relative;left: 7%;margin-left: 5%">
								报警时间
								</span>
								<span style="position:relative;right: -7%;margin-left: 3%">
									持续时间
								</span>

						</div>
						<table style="border: 1px solid lightgrey; border-top: none;border-left: none;border-right: none;float: left;width: 92%;" id="warntable" >
							
							
	
       
                 <tr  height="35px"id="tr1">
								<td >
								<a style="padding-left: 4%;" id='0'></a>
								<a style="padding-left:8%" id='00'></a>
								<a style="padding-left:8%" id='000'><a>
								<a style="padding-left:8%" id='0000'></a>
								<a style="padding-left:9%" id='00000'></a>
								</td>
							</tr>
							<tr  height="35px" >
								<td >
								<a style="padding-left: 4%;" id='1'></a>
								<a style="padding-left:8%" id='11'></a>
								<a style="padding-left:8%" id='111'><a>
								<a style="padding-left:8%" id='1111'></a>
								<a style="padding-left:9%" id='11111'></a>
								</td>
							</tr>
							<tr height="35px" id="tr1">
								<td >
								<a style="padding-left: 4%;" id='2'></a>
								<a style="padding-left:8%" id='22'></a>
								<a style="padding-left:8%" id='222'><a>
								<a style="padding-left:8%" id='2222'></a>
								<a style="padding-left:9%" id='22222'></a>
								</td>
							</tr>
							<tr  height="35px">
								<td >
								<a style="padding-left: 4%;" id='3'></a>
								<a style="padding-left:8%" id='33'></a>
								<a style="padding-left:8%" id='333'><a>
								<a style="padding-left:8%" id='3333'></a>
								<a style="padding-left:9%" id='33333'></a>
								</td>
							</tr>
							<tr  height="35px" id="tr1">
								<td >
								<a style="padding-left: 4%;" id='4'></a>
								<a style="padding-left:8%" id='44'></a>
								<a style="padding-left:8%" id='444'><a>
								<a style="padding-left:8%" id='4444'></a>
								<a style="padding-left:9%" id='44444'></a>
								</td>
							</tr>
							<tr height="35px">
								<td >
								<a style="padding-left: 4%;" id='5'></a>
								<a style="padding-left:8%" id='55'></a>
								<a style="padding-left:8%" id='555'><a>
								<a style="padding-left:8%" id='5555'></a>
								<a style="padding-left:9%" id='55555'></a>
								</td>
							</tr>
							<tr  height="35px" id="tr1">
							<td >
								<a style="padding-left: 4%;" id='6'></a>
								<a style="padding-left:8%" id='66'></a>
								<a style="padding-left:8%" id='666'><a>
								<a style="padding-left:8%" id='6666'></a>
								<a style="padding-left:9%" id='66666'></a>
								</td>
							</tr>
							<tr  height="35px">
							<td >
								<a style="padding-left: 4%;" id='7'></a>
								<a style="padding-left:8%" id='77'></a>
								<a style="padding-left:8%" id='777'><a>
								<a style="padding-left:8%" id='7777'></a>
								<a style="padding-left:9%" id='77777'></a>
								</td>
							</tr>
							<tr  height="35px"id="tr1">
							<td >
								<a style="padding-left: 4%;" id='8'></a>
								<a style="padding-left:8%" id='88'></a>
								<a style="padding-left:8%" id='888'><span>
								<a style="padding-left:8%" id='8888'></a>
								<a style="padding-left:9%" id='88888'></a>
								</td>
							</tr>
							<tr  height="35px">
							<td >
								<a style="padding-left: 4%;" id='9'></a>
								<a style="padding-left:8%" id='99'></a>
								<span style="padding-left:8%" id='999'><span>
								<a style="padding-left:8%" id='9999'></a>
								<a style="padding-left:9%" id='99999'></a>
								</td>
							</tr>
							<tr  height="35px"id="tr1">
							<td >
								<a style="padding-left: 4%;" id='10'></a>
								<a style="padding-left:8%" id='1010'></a>
								<span style="padding-left:8%" id='101010'><span>
								<a style="padding-left:8%" id='10101010'></a>
								<a style="padding-left:9%" id='1010101010'></a>
								</td>
							</tr>
							
							
							
						</table>
						
						<script language="javascript" type="text/javascript">
    	/*创建xhr对象*/
    	function getXhr(){
    		var xhr = null;
    		if(window.XMLHttpRequest){
    			xhr = new XMLHttpRequest();
    		}else{
    			xhr = new ActiveXObject('Microsoft.XMLHttp');
    		}
    		return xhr;
    	}
    	/*发送一个get请求，将服务器返回的
    	一小段文本信息展示到页面中*/
    	function getText(){
    		//1.创建xhr对象
    		var tbbody='';
    		//$('#warntable').html('');
    		var xhr = getXhr();
    		//2.设置回调函数
    		xhr.onreadystatechange=function(){
    			if(xhr.readyState==4&&xhr.status==200){
    				var str = xhr.responseText;
    				var ev=eval("("+str+")");
    				
    				for(var i=0;i<ev.length;i++){
    					$('#'+i).html(ev[i].name);
    					$('#'+i+i).html(ev[i].level);
    					$('#'+i+i+i).html(ev[i].value);
    					$('#'+i+i+i+i).html(ev[i].date);
    					$('#'+i+i+i+i+i).html(ev[i].time);
    				}
    				
    			}
    		};
    		//3.创建请求
    		xhr.open('get','/jsjd/some',true);
    		//4.发送请求
    		xhr.send(null);
    		
    		//alert("2");
    		
    	}  
    	//window.onload();
        //alert(document.getElementById('aa').innerHTML);
    //	alert("3");
    	//alert($('#aa').value);
    window.setInterval(getText, 100000); 
    	getText();
    </script>
						
						
						
					</div>
				</div>
				<div id="data2">
			
				<div id="data_three">
					<div id="hhe">
						<h2 style="font-family: '楷体'">电厂指标</h2>

					</div>
				


			
					    <div style="width: 100%; float: right;">
						
							<div style="width:100%;height:30px;float: right;">
									<div class="td1">
									<span class="tdn">总装机容量</span><span class="tdn2">2430WM</span>
								  </div>
							
									<div class="td8">
									<span class="tdn">昨日发电量</span><span class="tdn2">0.21万kwh</span>
									</div>
							</div>
						
							
							
								<div style="width:100%;height:30px;float: right;">
									<div id="td2">
								<span class="tdn">总负荷</span><span class="tdn2">7559.97WM</span>
								  </div>
						
									<div id="td9">
									<span class="tdn">全厂负荷率</span><span class="tdn2">70%</span>
									</div>
								
								</div>

			
						<div style="width:100%;height:30px;float: right;">
									<div id="td3">
								<span class="tdn">年计划发电量</span><span class="tdn2">74.8万kwh</span>
								  </div>
							
									<div id="td10">
								<span class="tdn">综合厂用电率</span><span class="tdn2">7.04%</span>
									</div>
						
</div>

						<div style="width:100%;height:30px;float: right;">
										<div id="td4">
								<span class="tdn">年累计发电量</span><span class="tdn2">68.4万kwh</span>
								  </div>
								
									<div id="td11">
								<span class="tdn">发电厂用电率</span><span class="tdn2">7.04%</span>
									</div>
									
						</div>
						
						
						
						<div style="width:100%;height:30px;float: right;">
										<div id="td5">
								<span class="tdn">年度发电量完成率</span><span class="tdn2">91.44%</span>
								  </div>
									
								
									<div id="td12">
								<span class="tdn">综合供电煤耗</span><span class="tdn2">310.26g/kwh</span>
								  </div>
								
						</div>
							<div style="width:100%;height:30px;float: right;">
										<div id="td6">
								<span class="tdn">月度计划发电量</span><span class="tdn2">6.3万kwh</span>
								  </div>
								
							
									<div id="td13">
								<span class="tdn">发电供电煤耗</span><span class="tdn2">315g/kwh</span>
								  </div>
						</div>
						<div style="width:100%;height:30px;float: right;">
												<div id="td7">
								<span class="tdn">月度累计发电量</span><span class="tdn2">5.8万kwh</span>
								  </div>
					
												<div id="td14">
								<span class="tdn">发电水耗</span><span class="tdn2">1.1kg/kwh</span>
								  </div>
						</div>

						</div>
				

				</div>
				<div class="data_four">
					<div id="gongzuo">
						<h2 style="float: left; font-family: '楷体';">工作提醒</h2>

						<a id="a_5" href="#" style="float: right;margin-top:25px;margin-right: 20px;text-align: center;font-family: '楷体';">
							更多
						</a>
					</div>

					<div style="float: left;">

						<div style="font-size: 20px;font-weight: bold;">
							<span style="margin-left: 2%;">
								序号
								</span>
							<span style="position:relative;left: 30%">
									消息描述
								</span>
						
						</div>

						<table style="border: 1px solid lightgrey; border-top: none;border-left: none;border-right: none;float: left;">

							<tr height="27px" id="tr1">
								<td  width="590px" id="td01" style="text-align: center;">请在2015年1月10号前上报2014年化学专业年度总结</td>
							</tr>
							<tr height="27px">
								<td   id="td02" style="text-align: center;">请在2015年1月10号前上报2014年化学专业年度总结</td>
							</tr>
							<tr align="center" height="27px" id="tr1">
								<td id="td03" style="text-align: center;">请在2015年1月10号前上报2014年化学专业年度总结</td>

							</tr>
							<tr align="center" height="27px">
								<td  id="td04" style="text-align: center;">请在2015年1月10号前上报2014年化学专业年度总结</td>

							</tr>
							<tr align="center" height="27px" id="tr1">
								<td  id="td05" style="text-align: center;">请在2015年1月10号前上报2014年化学专业年度总结</td>

							</tr>
							<tr align="center" height="27px">
								<td colspan="2" width="100%" id="td06" style="text-align: center;">请在2015年1月10号前上报2014年化学专业年度总结</td>

							</tr>

						</table>
					</div>
</div>
				


	
	
	<div id="data2">
				<div id="data_five">

					<div id="hhe5">
					
						<h2 style="float: left;">监督动态</h2>
						<a id="a_5" href="#" style="float: right;margin-top:25px;margin-right: 20px;text-align: center;">
							更多
						</a>
					</div>

					<div style="list-style: none; float: left; width: 100%;padding-left:0px;">
						<span style="line-height:100%;font-size: 16px; border-bottom:1px dashed #D3D3D3"><a style="padding-left: 40px;"><%=((HashMap<String, String>) l.get(0)).get("name") %></a><a style="margin-left: 12%;"><%=((HashMap<String, String>) l.get(0)).get("update_time") %></a>
						</span>
						<p style="line-height:100%;font-size: 16px; border-bottom:1px dashed #D3D3D3"><a style="padding-left: 40px;"><%=((HashMap<String, String>) l.get(1)).get("name") %></a><a style="margin-left: 12%;"><%=((HashMap<String, String>) l.get(1)).get("update_time") %></a>
						</p>
						<p style="line-height:100%;font-size: 16px; border-bottom:1px dashed #D3D3D3"><a style="padding-left: 40px;"><%=((HashMap<String, String>) l.get(2)).get("name") %></a><a style="margin-left: 12%;"><%=((HashMap<String, String>) l.get(2)).get("update_time") %></a>
						</p>
						<p style="line-height:100%;font-size: 16px; border-bottom:1px dashed #D3D3D3"><a style="padding-left: 40px;"><%=((HashMap<String, String>) l.get(3)).get("name") %></a><a style="margin-left: 12%;"><%=((HashMap<String, String>) l.get(3)).get("update_time") %></a>
						</p>
						<p style="width:100%;line-height:100%;font-size: 16px; border-bottom:1px dashed #D3D3D3"><a style="padding-left: 40px;"><%=((HashMap<String, String>) l.get(4)).get("name") %></a><a style="margin-left: 12%;"><%=((HashMap<String, String>) l.get(4)).get("update_time") %></a>
						</p>

					</div>

				</div>

				<div id="data_six" style="float:right;">
					<div id="gongzuo">
						<h2 style="float: left;">监督工作</h2>

						<a id="a_5" href="#" style="float: right;margin-top:25px;margin-right: 20px;text-align: center;">
							更多
						</a>

					</div>

				<div style="float: left;width: 100%;font-family: '楷体';font-size: 20px;font-weight: bold;" >

						<div style="float: left; margin-left: 2%;">
							序号
						</div>
							<div style="float:left;margin-left: 20%">
								任务描述
								</div>
								<div style="float:left;margin-left: 25%">
								时间
								</div>
								<div style="float:left;margin-left: 5%">
							上报人
								</div>

						</div>

						<table style="border: 1px solid lightgrey; border-top: none;border-left: none;border-right: none;float: left;">

							<tr height="30px" id="tr1">
								<td width="590px" id="td01">
									<a style="padding-left: 15%;">请审核2014年12月化学专业月度总结</a>
									<a style="padding-left: 5%;">2014/12/12</a>
									<a style="margin-left:3%">张三</a>
								</td>

							</tr>

							<tr height="30px">
								<td  id="td02">
									<a style="padding-left: 15%;">请审核2014年12月化学专业月度总结</a>
									<a style="padding-left: 5%;">2014/12/12</a>
									<a style="padding-left: 3%;">张三</a>
								</td>
							</tr>
							<tr height="30px" id="tr1">
								<td width="510px" id="td03">
									<a style="padding-left: 15%;">请审核2014年12月化学专业月度总结</a>
									<a style="padding-left: 5%;">2014/12/12</a>
									<a style="padding-left: 3%;">张三</a>
								</td>

							</tr>
							<tr  height="30px">
								<td width="510px" id="td04">
									<a style="padding-left: 15%;">请审核2014年12月化学专业月度总结</a>
									<a style="padding-left: 5%;">2014/12/12</a>
									<a style="padding-left: 3%;">张三</a>
								</td>

							</tr>

						</table>
					</div>

				</div>

</div> --%>	

				<!--页脚区域-->
				<div id="footer">

					<p> <a href="#">关于我们</a>&#124;&nbsp;<a href="#">联系我们</a>&#124;&nbsp;<a href="#">信息反馈</a>&#124;&nbsp;<a href="#">人才招聘</a>&#124;&nbsp;<a href="#">友情链接</a>&#124;&nbsp;<a href="#" onclick="open_wjdh(); return false;">后台</a>&nbsp;&nbsp;<a href="#">更多</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版权所有&nbsp;Copyright(c)2009-2015&nbsp;岱海电厂
						&nbsp;&nbsp;&nbsp;&nbsp;
					</p>
				</div>
			
	</body>
	
	 
	
	
</html>