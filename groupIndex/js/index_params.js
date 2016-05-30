var tableTopcolumn;
var tablePICode;
var StringCode;
var units;//指标单位
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
				  if(position!="5"){
					  Stringtd="<td width='100px'>序号</td>";
				  }
				  spanHtml="<tr>"+Stringtd+"<td width='100px'>电厂</td><td width='100px'>机组</td>";
				  var ev=eval("("+data+")");
				  tableTopcolumn=ev;
				  for(var i=0;i<ev.length;i++){
					  spanHtml+="<td width='100px'>"+ev[i].QUOTA_NAME+"</td>";
				  }
				  spanHtml+="</tr>";
				  if(type=="1"){
					  document.getElementById("hdindexname").innerHTML=spanHtml;
				  }else if(type=="2"){
					  document.getElementById("fdindexname").innerHTML=spanHtml;
				  }else if(type=="3"){
					  document.getElementById("sdindexname").innerHTML=spanHtml;
				  }else if(type=="4"){
					  document.getElementById("gfindexname").innerHTML=spanHtml;
				  }else{
					  document.getElementById("xiangxiname").innerHTML=spanHtml;
				  }
				  
				 // document.getElementById("indexname").innerHTML=spanHtml;
			  },
			  error: function (data) {
	           //alert(data.msg);
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
				  for(var i=0;i<ev.length;i++){
					  if(position!="5"){
						  Stringtd="<td width='100px' rowspan='"+ev[i].JZSUM+"'>"+(i+1)+"</td>";
						  StringA="<span id='dh_1' onclick=getDateStion('5','"+ev[i].ORG_ID+"','')>"+ev[i].ORG_NAME+"</span>";
					  }else{
						  StringA= ev[i].ORG_NAME;
					  }
					  if(ev[i].ORG_NAME!=dc){
						  trstring=Stringtd+
						  		"<td width='100px' rowspan='"+ev[i].JZSUM+"'>"+StringA+"</td>";
					  }else{
						  trstring="";
					  }
					  dc=ev[i].ORG_NAME;
					  spanHtmlTable+="<tr>"+trstring
					  		+"<td width='100px'>"+ev[i].GENERATOR+"</td>";
					  for(var d=0;d<tableTopcolumn.length;d++){
						  var String ="";
						  if(typeof(tablePICode[code].PI_CODE)=='undefined'){
							  spanHtmlTable+="<td width='100px' >"+tablePICode[code].QVALUES+"</td>";
						  }else{
							  spanHtmlTable+="<td width='100px' id='"+tablePICode[code].PI_CODE+"'></td>";
							  StringCode+=tablePICode[code].PI_CODE+",";
						  }
						  code++;
					  }
					  spanHtmlTable+="</tr>";
				  }
				  if(type=="1"){
					  document.getElementById("hd").innerHTML=spanHtmlTable;
				  }else if(type=="2"){
					  document.getElementById("fd").innerHTML=spanHtmlTable;
				  }else if(type=="3"){
					  document.getElementById("sd").innerHTML=spanHtmlTable;
				  }else if(type=="4"){
					  document.getElementById("gf").innerHTML=spanHtmlTable;
				  }else{
					  document.getElementById("xiangxi").innerHTML=spanHtmlTable;
				  }
			  },
			  error: function (data) {
	           //alert(data.msg);
	        }
	})

}

//获取指标值Picode的values
function getTargetDl(){
	//获取参数
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
					  if(ev[i].value=='00'){
						  document.getElementById(ev[i].fieldName).innerHTML= "<img src='img/red1.png' class='red-02'/>";
					  }else if(ev[i].value=='01'){
						  document.getElementById(ev[i].fieldName).innerHTML= "<img src='img/green.png' class='red-02'/>";
					  }else if(ev[i].value=='02'){
						  document.getElementById(ev[i].fieldName).innerHTML= "<img src='img/yellow.png' class='red-02'/>";
					  }else{
						  document.getElementById(ev[i].fieldName).innerHTML= ev[i].value;
					  }
				  }
			  },
			  error: function (data) {
	           //alert(data.msg);
	        }
	})

}


//获取指标单位
function getTargetDate1(position,stationId,type){
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
				  units =eval("("+data+")");
//					  document.getElementById("ssfh").innerHTML=ev[0].VALUEDATE+ev[0].UNIT;
//					  document.getElementById("byjh").innerHTML=ev[1].VALUEDATE+"<br>"+ev[1].UNIT;
//					  document.getElementById("jrfdl").innerHTML=ev[1].VALUEDATE+"<br>"+ev[2].UNIT;
//					  document.getElementById("zrfdl").innerHTML=ev[1].VALUEDATE+"<br>"+ev[3].UNIT;
//					  document.getElementById("byfdl").innerHTML=ev[1].VALUEDATE+"<br>"+ev[4].UNIT;
//					  document.getElementById("syfdl").innerHTML=ev[1].VALUEDATE+"<br>"+ev[5].UNIT;
//					  document.getElementById("nljfdl").innerHTML=ev[1].VALUEDATE+"<br>"+ev[6].UNIT;
//					  document.getElementById("njhfdl").innerHTML=ev[1].VALUEDATE+"<br>"+ev[7].UNIT;
			  },
			  error: function (data) {
	           //alert(data.msg);
	        }
	})
	}
	//获取首页指标值
	function getTargetDateValues(){
	//获取参数
	$.ajax({
			  url:_contextPath+"/XipSssjAction.do?method=getIndexModuleThreeData",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  success: function(data){
					  document.getElementById("ssfh").innerHTML=data[0]+"<br>"+units[0].UNIT;
					  document.getElementById("byjh").innerHTML=data[1]+"<br>"+units[1].UNIT;
					  document.getElementById("jrfdl").innerHTML=data[2]+"<br>"+units[2].UNIT;
					  document.getElementById("zrfdl").innerHTML=data[3]+"<br>"+units[3].UNIT;
					  document.getElementById("byfdl").innerHTML=data[4]+"<br>"+units[4].UNIT;
					  document.getElementById("syfdl").innerHTML=data[5]+"<br>"+units[5].UNIT;
					  document.getElementById("nljfdl").innerHTML=data[6]+"<br>"+units[6].UNIT;
					  document.getElementById("njhfdl").innerHTML=data[7]+"<br>"+units[7].UNIT;
			  },
			  error: function (data) {
	           //alert(data.msg);
	        }
	})

}
