<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.xzsoft.util.PropertiesUtil"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

	<!--为了让 IE 浏览器运行最新的渲染模式-->
	<meta name="renderer" content="webkit">
	<!--让国产浏览器启用高速模式-->
	<title>京能集团实时技术监督生产管理系统</title>
	<c:set var="ctx" value="${pageContext.request.contextPath}"
		scope="request" />
	<script type="text/javascript">
		var ctx = "${ctx}";
	</script>
	<script type="text/javascript" src="js/jquery.js"></script>
	<link href="js/style.css" type="text/css" rel="stylesheet"/>
	</head>
	<body>
<div class="wj0"><!--<span><a href="#" id="yuelan">预览</a></span>--><span><a href="javascript:void(0)" id="down">下载</a></span></div>
<div class="wj">
      <div class="wj1">
    <div class="wj1a"> <span><a href="javascript:void(0)" id = "BZFG_JTBZ" >集团标准</a></span> <span><a href="javascript:void(0)" id = "BZFG_GJBZ">国家标准</a></span> <span><a href="javascript:void(0)" id = "BZFG_HYBZ">行业标准</a></span> <span><a href="javascript:void(0)" id = "BZFG_DCBZ">电厂标准</a></span>
          <dl>
        <input name="" type="button" class="wj1a2" value="搜 索" id="search" onclick="query();"/>
        <input id ="Find" name="Find" type="text" class="wj1a1" placeholder="请输入关键字" />
      </dl>
        </div>
  </div>
      <div class="wj2" id="st1"> 
    <!-- 动态生成li -->
    <div class="fengge"> </div>
  </div>
      <div class="fengge"></div>
    </div>
<script language="javascript">
 
 	$(function(){
 	
 		//导航切换；--通过query方法执行操作
 		$('.wj1').find('a').click(function () {
    	 	$(this).parent().css("opacity", "1").siblings().css("opacity", "0.7")
 		 	 query(this.id);
 		 })
 		 
 		 //默认执行第一个tab + query！
 		 $('.wj1').find('a').eq(0).click(); 		 
 		 
 		 //回车执行查询 
		$('#Find').bind('keyup', function(ev) {
			oEvent = ev||event
	    	if (this.value && oEvent.keyCode == "13") {
	        	$('#search').click();
	    	}
		});
 		  
	});
 	
 	
 	
    
	
    var $show=null;
	function query(id){
		if(id ==null){
    		id = "BZFG_JTBZ";
		}
		
		document.getElementById("st1").innerHTML = "";
		var Find = document.getElementById("Find").value;
		//console.log(Find+id);
		var s = encodeURI(encodeURI('${ctx}/jtbz/JtbzList.do?Find='+Find+'&id='+id));//解决IE下中文乱码
		
		//var s = encodeURI(encodeURI('${ctx}/jtbzAction?Find='+Find+'&id='+id));
		//alert(s);
		
		$.get(s, function (data) {
		////$.get('http://localhost:8080/jsjd/jtbzAction?Find='+Find+'&id='+id, function (data) {
    	//data = data.substring(data.indexOf('[', 0),data.indexOf(']', 0)+1);
   		var content = JSON.parse(data);//eval(data)
		//alert(2);
		//console.log(content);
   		var t ="";
   		
   		//var a = "%E7%94%B5%E6%B5%8B%E6%8A%80%E6%9C%AF%E7%9B%91%E7%9D%A3%E5%AF%BC%E5%88%99[%E6%89%B9%E5%87%86%E7%89%88]";
   		//alert(decodeURI(a));
		if(id=="BZFG_JTBZ"){
			for(var i=0;i < content.length;i++) {
    		t = t+ "<li><a href='${ctx}/flash/play.jsp?real_no="+content[i].real_no+"' target='_blank'><img id ='"+content[i].att_id+"' src='img/jtbz"+content[i].ImgNum+".jpg' title='"+content[i].title+"'/></a><h1 class='dui'></h1></li>"; 
}
$(".wj0").show();
		}else{
	     t="<table class='wu_tab1'><thead><tr><td>序号</td><td>名称</td><td>编号</td><td>发布（修订）单位</td><td>最新发布（修订）时间</td><td>预览</td><td>下载</td></tr></thead><tbody>"	
    	for(var i=0;i < content.length;i++) {
    		//alert(content[0].title);	
	    t=t+"<tr><td>"+i+1+"</td><td>"+content[i].title+"</td><td></td><td></td><td></td><td><p class='wj_yulan' onclick=window.open('"+"${ctx}/flash/play.jsp?real_no="+content[i].real_no+"');></p></td><td><p class='wj_down' onclick=window.open('http://127.0.0.1/jsjd/xipAttMrgAction.do?method=down&selectedIds="+content[i].title+"');></p></td></tr><tr></tr>"
  	 	//console.log(t);
  	 	}
		t=t+"</tbody></table>"	
		$(".wj0").hide();
		
		}
		

		
    	document.getElementById("st1").innerHTML = t;
    	
    	$show = $("#st1 li");
    	$show.on('click',function () {
			
			//选中的样式
	       	$("#st1 li h1").css("display", "none");
		    $(this).find(".dui").css("display", "block");
           
            //获取对应的下载预览!
            var att_id = $(this).find('img').get(0).id;
            var yulanurl = $(this).find('a').get(0).href;
        	
/*            //预览
            $("#yuelan").unbind("click").click(function () {
              	//alert(yulanurl);
            	window.open(yulanurl, "_blank");
			});*/
			
			//双击预览
			 $(this).find(".dui").unbind("dblclick").dblclick(function () {
            	window.open(yulanurl, "_blank");
			})
		
			//下载
        	$("#down").unbind("click").click(function () {
				//alert('<%=basePath%>');
        		//window.open("http://127.0.0.1/jsjd/xipAttMrgAction.do?method=down&selectedIds="+att_id);
            	window.open("<%=basePath%>" + "xipAttMrgAction.do?method=down&selectedIds=" + att_id);
        	});
        	return false;
        });
	})
};
	
	var monitor = setInterval(function(){
	  $.ajax({
		url : "../newPage.do?method=monitor",
		async: false,
		type : "POST", 
		success : function(data) {
			
		}
	  });
     },1000*60*5);

	
        
</script>
</body>
</html>
