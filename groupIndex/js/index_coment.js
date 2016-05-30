function getContextPath() {
     var pathName = document.location.pathname;
     var index = pathName.substr(1).indexOf("/");
     var result = pathName.substr(0,index+1);
     return result;
 }
var _contextPath = getContextPath();
function getComent(type){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getComent",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  data:{type:type},
			  success: function(data){
				  var ev=eval("("+data+")");
				  var html="<div class='m02-2-1'><div style='float: left; margin-left: 15px;'>排名</div><div style='float:left;margin-left: 85px'>电厂名称</div><div style='float:left;margin-left: 130px'>趋势</div><div class='d-03-02-01'>年度</div ><div class='d-03-02-01'>季度</div></div>";
				  var num="";
				  var html1="<div class='m02-2-1'><div style='float: left; margin-left: 15px;'>排名</div><div style='float:left;margin-left: 85px'>电厂名称</div><div style='float:left;margin-left: 130px'>趋势</div><div class='d-03-02-01'>年度</div ><div class='d-03-02-01'>季度</div></div>";
				  var num1="";
				  if(type=="1"){
					  for(var i=0;i<ev.length/2;i++){
						  if(ev[i].QQQ>0){
							num="<div class='d3-1 d3-bg1'>"+ev[i].QQQ+"</div>";  
						  }else if(ev[i].QQQ<0){
							num="<div class='d3-1 d3-bg2'>"+ev[i].QQQ+"</div>";  
						  }else if(ev[i].QQQ==0){
							num="<div class='d3-1'>"+ev[i].QQQ+"</div>";  
						  }else{
							  num="<div class='d3-1'>&nbsp</div>";  
						  }
						  var paiming="&nbsp";
						  if(typeof(ev[i].PAIMMING)!='undefined'){
							  paiming=ev[i].PAIMMING;
						  }
						  html+="<div class='m02-2-2'><div style='float: left; margin-left: 20px;width: 26px;'>" +
						  paiming+"</div><div class='d3-t'>"+ev[i].ORG_NAME+"</div>" +
						  				num+
						  				"<div class='d3-1'>"+ev[i].YEAR+"</div>" +
						  				"<div class='d3-2'>第"+ev[i].SEASON_DATE+"季度</div></div>";
						  document.getElementById("duibiao").innerHTML=html;
					  }
					  for(var i=ev.length/2;i<ev.length;i++){
						  if(ev[i].QQQ>0){
							num1="<div class='d3-1 d3-bg1'>"+ev[i].QQQ+"</div>";  
						  }else if(ev[i].QQQ<0){
							num1="<div class='d3-1 d3-bg2'>"+ev[i].QQQ+"</div>";  
						  }else if(ev[i].QQQ==0){
							num1="<div class='d3-1'>"+ev[i].QQQ+"</div>";  
						  }else{
							  num1="<div class='d3-1'>&nbsp</div>";  
						  }
						  var paiming1="&nbsp";
						  if(typeof(ev[i].PAIMMING)!='undefined'){
							  paiming1=ev[i].PAIMMING;
						  }
						  html1+="<div class='m02-2-2'><div style='float: left; margin-left: 20px;width: 26px;'>" +
						  paiming1+"</div><div class='d3-t'>"+ev[i].ORG_NAME+"</div>" +
						  				num1+
						  				"<div class='d3-1'>"+ev[i].YEAR+"</div>" +
						  				"<div class='d3-2'>第"+ev[i].SEASON_DATE+"季度</div></div>";
						  document.getElementById("duibiao1").innerHTML=html1;
					  }
				  }else if(type=="2"){
					  
				  }
			  },
			  error: function (data) {
	           //alert(data.msg);
	        }
	})

}
