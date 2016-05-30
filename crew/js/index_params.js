function getContextPath() {
     var pathName = document.location.pathname;
     var index = pathName.substr(1).indexOf("/");
     var result = pathName.substr(0,index+1);
     return result;
 }
var _contextPath = getContextPath();
var tableTopcolumn;
var tablePICode;
var StringCode;
var table1Html;
//获取列名
function getTargetColumn(position,stationId,type){
	//获取参数
	$.ajax({
			  url:_contextPath+"/targetDate.do?method=getIndexName",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  data:{position:position,stationId:stationId,type:type},
			  success: function(data){
				  var Stringtd="";
				  table1Html="";
				  if(position!="5"){
					  Stringtd="<td class='xh1'><span>序号</span></td>";
				  }
				  var ev=eval("("+data+")");
				  tableTopcolumn=ev;
				  var classa="zjrl1";
				  if(ev.length>0 && position=="4"){
					  table1Html="<tr class='h-1'>"+Stringtd+"<td class='dc1'>电厂</td><td class='jz1'>机组</td>";
				  }else if(ev.length>0 && position=="5"){
					  table1Html="<tr><td colspan='"+2+ev.length+"' class='jz_1'><span>机组运行状态</span><a onclick='cancel()'><img src='img/x.png' id='x-01'/></a></td></tr>" +
				  		"<tr>"+Stringtd+"<td class='td1_1 td1_0'>电厂</td><td class='td1_1 td1_2'>机组</td>";
					  classa="td1_1 zt_row1_col3";
				  }
				  var ev=eval("("+data+")");
				  tableTopcolumn=ev;
				  for(var i=0;i<ev.length;i++){
					  var unit="";
					  if(typeof(ev[i].UNIT)!='undefined'){
						  unit="("+ev[i].UNIT+")";
					  }
					  table1Html+="<td class='"+classa+"'>"+ev[i].QUOTA_NAME+unit+"</td>";
				  }
				  table1Html+="</tr>";
				  /*if(type=="1"){
					  document.getElementById("hdindexname").innerHTML=spanHtml;
				  }else if(type=="2"){
					  document.getElementById("fdindexname").innerHTML=spanHtml;
				  }else if(type=="3"){
					  document.getElementById("sdindexname").innerHTML=spanHtml;
				  }else if(type=="4"){
					  document.getElementById("gfindexname").innerHTML=spanHtml;
				  }else{
					  document.getElementById("xiangxiname").innerHTML=spanHtml;
				  }*/
				  
				 // document.getElementById("indexname").innerHTML=spanHtml;
			  },
			  error: function (data) {
			  	
	        }
	})

}

//获取列名pi_code
function getTargetColumnValues(position,stationId,type){
	//获取参数
	$.ajax({
			  url:_contextPath+"/targetDate.do?method=getIndexDc",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  data:{position:position,stationId:stationId,type:type},
			  success: function(data){
				  var ev=eval("("+data+")");
				  tablePICode=ev;
			  },
			  error: function (data) {
	           //alert(data.msg);
	        }
	})

}

//获取列名1
function getTargetColumn1(position,stationId,type){
	//获取参数
	$.ajax({
			  url:_contextPath+"/targetDate.do?method=getIndexName1",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  data:{position:position,stationId:stationId,type:type},
			  success: function(data){
				  //var spanHtml="";
				  var ev=eval("("+data+")");
				  var dc;
				  var trstring;
				  var spanHtmlTable="";
				  var code=0;
				  StringCode="";
				  var Stringtd="";
				  var StringA="";
				  var classab="qjxl1";
				  for(var i=0;i<ev.length;i++){
					  if(position!="5"){
						  Stringtd="<td class='dc1 dc1-1' rowspan='"+ev[i].JZSUM+"'>"+(i+1)+"</td>";
						  StringA="<td class='dc1 dc1-1' rowspan='"+ev[i].JZSUM+"'><span id='dh_1' onclick=getDateStion('5','"+ev[i].ORG_ID+"','','2')>"+ev[i].ORG_SHORT_NAME+"</span></td>";
					  }else{
						  StringA= "<td class='td1_1 td1_0' rowspan='"+ev[i].JZSUM+"'>"+ev[i].ORG_SHORT_NAME+"</td>";
						  classab="td_3 td1_0";
					  }
					  if(ev[i].ORG_NAME!=dc){
						  trstring=Stringtd+StringA;
					  }else{
						  trstring="";
					  }
					  dc=ev[i].ORG_NAME;
					  table1Html+="<tr>"+trstring
					  		+"<td class='"+classab+"'>"+ev[i].GENERATOR+"</td>";
					  for(var d=0;d<tableTopcolumn.length;d++){
						  var String ="";
						  if(typeof(tablePICode[code].PI_CODE)=='undefined'){
							  table1Html+="<td class='"+classab+"' >"+tablePICode[code].QVALUES+"</td>";
						  }else{
							  if(position!="5"){
								  table1Html+="<td class='qjxl1' id='"+tablePICode[code].PI_CODE+"'></td>";
							  }else{
								  table1Html+="<td class='td_3 td1_0' id='A"+tablePICode[code].PI_CODE+"'></td>";
							  }
							  StringCode+=tablePICode[code].PI_CODE+",";
						  }
						  code++;
					  }
					  table1Html+="</tr>";
				  }
				  var html="";
				  if(tableTopcolumn.length!=0){
					  html="<tr><td colspan='"+tableTopcolumn.length+3+"'>" +
				  		"<span class='h7-1'>图例说明:</span>" +
				  		"<img src='img/red1.png' class='h7-2 red-02'/>" +
				  		"<span class='h7-2'>运行</span>" +
				  		"<img src='img/green.png' class='green-02 h7-3'/>" +
				  		"<span class='h7-3'>停机</span>" +
				  		"<img src='img/yellow.png' class='yellow-02 h7-4'/>" +
				  		"<span class='h7-4'>通讯中断</span></td></tr>";
				  }
				  var tab="<table cellpadding='0px' cellspacing='0px' border='1px'>";
				  if(type=="1"){
					  document.getElementById("body_1").innerHTML=tab+table1Html+html+"</table>";
				  }else if(type=="2"){
					  document.getElementById("body_2").innerHTML=tab+table1Html+html+"</table>";
				  }else if(type=="3"){
					  document.getElementById("body_3").innerHTML=tab+table1Html+html+"</table>";
				  }else if(type=="4"){
					  document.getElementById("body_4").innerHTML=tab+table1Html+html+"</table>";
				  }else{
					  $('#table1').removeClass('d_n_1');
					  document.getElementById("table1").innerHTML="<table cellpadding='0px' cellspacing='0px'>"+table1Html+"<tr><td colspan='"+tableTopcolumn.length+2+"' class='zt_bottom_2'>" +
					  		"<span class='h7-1'>图例说明:</span>" +
					  		"<img src='img/red1.png' class='h7-2 red-02'/>" +
					  		"<span class='h7-2'>运行</span>" +
					  		"<img src='img/green.png' class='green-02 h7-3'/>" +
					  		"<span class='h7-3'>停机</span>" +
					  		"<img src='img/yellow.png' class='yellow-02 h7-4'/>" +
					  		"<span class='h7-4'>通讯中断</span></td></tr></table>";
				  }
			  },
			  error: function (data) {
			  	
	        }
	})

}

//获取指标值Picode的values
function getTargetDl(type){
	//获取参数
	if(StringCode!=""){
		
	
	$.ajax({
			  url:_contextPath+"/XipSssjAction.do?method=indexData",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  data:{pi_code:StringCode},
			  success: function(data){
				  var ev=eval("("+data+")");
				  for(var i=0;i<ev.length;i++){
					  var values;
					  if(type=="1"){
						  if(ev[i].value=='00'){
							  document.getElementById(ev[i].fieldName).innerHTML= "<img src='img/red1.png' class='red-02'/>";
						  }else if(ev[i].value=='01'){
							  document.getElementById(ev[i].fieldName).innerHTML= "<img src='img/green.png' class='red-02'/>";
						  }else if(ev[i].value=='02'){
							  document.getElementById(ev[i].fieldName).innerHTML= "<img src='img/yellow.png' class='red-02'/>";
						  }else{
							  document.getElementById(ev[i].fieldName).innerHTML= ev[i].value;
						  }
					  }else{
						  if(ev[i].value=='00'){
							  document.getElementById("A"+ev[i].fieldName).innerHTML= "<img src='img/red1.png' class='red-02'/>";
						  }else if(ev[i].value=='01'){
							  document.getElementById("A"+ev[i].fieldName).innerHTML= "<img src='img/green.png' class='red-02'/>";
						  }else if(ev[i].value=='02'){
							  document.getElementById("A"+ev[i].fieldName).innerHTML= "<img src='img/yellow.png' class='red-02'/>";
						  }else{
							  document.getElementById("A"+ev[i].fieldName).innerHTML= ev[i].value;
						  }
					  }
				  }
			  },
			  error: function (data) {
			  	
	        }
	})
	}
}


//获取指标值
function getTargetDate(position,stationId,type){
	//获取参数
	$.ajax({
			  url:_contextPath+"/targetDate.do?method=getIndex",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  data:{position:position,stationId:stationId,type:type},
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
					  document.getElementById("ssfh1").innerHTML=ev[0].VALUEDATE+ev[0].UNIT;
					  document.getElementById("ssfdl").innerHTML=ev[1].VALUEDATE+ev[1].UNIT;
			  },
			  error: function (data) {
			  	
	        }
	})

}
