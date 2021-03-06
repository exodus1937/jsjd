function getContextPath() {
     var pathName = document.location.pathname;
     var index = pathName.substr(1).indexOf("/");
     var result = pathName.substr(0,index+1);
     return result;
 }
var _contextPath = getContextPath();
var userid;
var org_id_my;
var yearCount;

function clickOpenWindow(code,time){
	var iWidth=800; //弹出窗口的宽度;
    var iHeight=400; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
    if(time == ''){
       window.open(_contextPath+'/tab/indexLine.jsp?pi_code='+code ,'折线图',"height="+iHeight+",width="+iWidth+",scrollbars=false,top="+iTop+", left="+iLeft);
    }else{
		window.open(_contextPath+'/tab/warnInfoLine.jsp?pi_code='+code+'&warn_time='+time ,'折线图',"height="+iHeight+",width="+iWidth+",scrollbars=false,top="+iTop+", left="+iLeft);
    }
}
function open_wjdh(){
	
	//获取参数
	$.ajax({
			  url:_contextPath+"/loginParamUtil.do?method=getIndexParams",
			  type:"POST",
			  async: false,//同步操作
			  data:{path:_contextPath},
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  dataType:"json",
			  success: function(data){
				 var url = data.url;
				 window.open(url ,"wjdh") ; //myWindow即为窗口的名称
			  },
			  error: function (data) {
	        }
	})
}
function getDT(){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getDynamic",
			  type:"POST",
			  async: false,//同步操作
			  data:{path:_contextPath},
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  for(i=0;i<ev.length;i++){
					  var times="";
					  if(typeof(ev[i].TIME)!='undefined'){
						  times=ev[i].TIME;
					  }
					  spanHtml += "<p style='line-height:100%;font-size: 16px; border-bottom:1px dashed #D3D3D3'>" +
				  		"<a style='padding-left: 40px;' class='csspan' onclick=clickFunc('动态预览','"+ev[i].NTC_ID+"','"+_contextPath+"/main?xwl=23WPD5TO7KQ1&showAddWindow=Y&ID="+ev[i].NTC_ID+"') href='javascript:void(0)'>" +ev[i].NAME+
				  		"</a><a>" +times+
				  		"</a></p>";
				  }
				  document.getElementById("jddt").innerHTML=spanHtml;
			  },
			  error: function (data) {
	        }
	})

}
//获取代办任务
function getWorksDate(userID){
	userid=userID;
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getWorks",
			  type:"POST",
			  async: false,//同步操作
			  data:{userID:userID},
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  var a=0;
				  for(i=0;i<ev.length;i++){
					  a++;
					  spanHtml += "<tr height='30px' id='tr1'>"
								+"<td width='590px' id='td0"+a+"' class='ellipsis'>"
									+"<a href='#' onclick=openTaskPage('"+_contextPath+"','"+ev[i].TASKID+"','"+ev[i].TASKSTATE+"','"+userID+"') style='padding-left: 50px;width:220px' class='csspan'>"+ev[i].TASKTITLE+"</a>"
									+"<a style='padding-left: 11%;'>"+ev[i].BEGINTIME+"</a>"
									+"<a style='margin-left:3%'>"+ev[i].FROMUSERNAME+"</a>"
								+"</td></tr>";
				  }
				  document.getElementById("works").innerHTML="<table style='border: 1px solid lightgrey; border-top: none;border-left: none;border-right: none;float: left;'>"+spanHtml+"</table>";
			  },
			  error: function (data) {
	        }
	})

}
//打开代办
function openTaskPage(contextPath, taskId, taskState,userID){
	// 提交请求
	$.ajax({
		url 	: contextPath + '/workItemAction.do?method=isCustomTaskByTaskId',
		params	: {
			'taskId'  	: taskId,
			'taskState' : taskState
		},
		method 	: 'post',
		timeout : 3600000,
		success : function(response, options) {
			//msg.hide();
			window.open(contextPath + "/main?xwl=23VMPVCRPO56&userId="+userID+"&taskId="+ taskId ,"_blank");
		},
		failure : function(reponse, options) {
			msg.hide();
			var response = Ext.util.JSON.decode(response.responseText);
			window.alert("提示", response.msg);
		}
	});			
}
//获取当前用户的组织ID
function getMyOrgsUser(userID,name){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getOrgsMy",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  data:{userID:userID},
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  //spanHtml = "<option value=''>京能集团</option>";
				  org_id_my=ev[0].ORG_ID;
				   document.getElementById("orgName").innerHTML="欢迎"+ev[0].ORG_SHORT_NAME+","+name;
			  },
			  error: function (data) {
	        }
	})

}

//获取组织
function getOrgs(){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getOrgs",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  //spanHtml = "<option value=''>京能集团</option>";
				  for(i=0;i<ev.length;i++){
					  var selected="";
					  if(ev[i].ORG_ID==org_id_my){
						  selected="selected";
					  }
					  spanHtml += "<option value="+ev[i].ORG_ID+" "+selected+">"+ev[i].ORG_SHORT_NAME+"</option>";
				  }
				  document.getElementById("selectAge").innerHTML="<select onchange='getWarningAnd(16)' style='margin-top: 25px ;margin-right:4px;float:right;'>"+spanHtml+"</select>";
			  },
			  error: function (data) {
	        }
	})

}

//获取组织
function getOrgs1(){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getOrgs",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  //spanHtml = "<option value=''>京能集团</option>";
				  for(i=0;i<ev.length;i++){
					  var selected="";
					  if(ev[i].ORG_ID==org_id_my){
						  selected="selected";
					  }
					  spanHtml += "<option value="+ev[i].ORG_ID+" "+selected+">"+ev[i].ORG_SHORT_NAME+"</option>";
				  }
				  document.getElementById("selectAge").innerHTML="<select onchange='getWarningAnd(18)' style='margin-top: 25px ;margin-right:4px;float:right;'>"+spanHtml+"</select>";
			  },
			  error: function (data) {
	        }
	})

}
//更新提醒状态
function updateMission1(ID,type,url){
	    clickFunc('工作提醒填报',ID,url);
		$.ajax({
			  url:_contextPath+"/mainDate.do?method=updateMission",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  data:{ID:ID,status:type},
			  success: function(data){
				  getMission(userID);
			  },
			  error: function (data) {
	      }
	})
}

//更新提醒状态
function updateMission(ID,type){
	
	if(window.confirm('你确定要取消提醒吗？')){
		
		$.ajax({
			  url:_contextPath+"/mainDate.do?method=updateMission",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  data:{ID:ID,status:type},
			  success: function(data){
				  getMission(userID);
			  },
			  error: function (data) {
	      }
	})
        return true;
     }else{
    	 //getMission(userID); 
    }
	
}
//获取提醒信息
function getMission(userID){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getMission",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  data:{userID:userID},
			  //dataType:"json",
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  var a=0;
				  if(ev.length!=0){
					  for(i=0;i<ev.length;i++){
						  a++;
						  if(i%2==0){
							  spanHtml+="<tr height='27px' id='tr1'>";
							}else{
								spanHtml+="<tr height='27px'>";
							}
						  spanHtml += "<td  class='ellipsis' width='590px' id='td0"+a+"' style='padding-left: 50px'><a href='javascript:void(0)' onclick=updateMission1('"+ev[i].MISSION_ID+"','CLOSE','"+_contextPath+"/main?xwl="+ev[i].MISSION_ADDRESS+"&showAddWindow=Y')>"+ev[i].MISSION_DEC+"</a></td>" +
						  		"<td class='ellipsis' width='300px' style='text-align: center;'>"+ev[i].ORG_SHORT_NAME+"</td>" +
						  		"<td class='ellipsis' width='200px' style='text-align: center;'>"+ev[i].CREATE_DATE+"</td>" +
						  		"<td class='ellipsis' width='200px' style='text-align: center;'>"+ev[i].DAYS+"</td>"
								+"<td class='ellipsis' width='20px' style='text-align: center;'><a href='javascript:void(0)' onclick=updateMission('"+ev[i].MISSION_ID+"','CANCEL')>取消</a></td></tr>";
					  }
					  if(a<6){
						  for(var b=0;b<6-a;a++){
							  if((6-a)%2==0){
								  spanHtml+="<tr height='27px' id='tr1'>";
								}else{
									spanHtml+="<tr height='27px'>";
								}
							  spanHtml += "<td style='text-align: center;'></td><td style='text-align: center;'></td><td style='text-align: center;'></td><td style='text-align: center;'></td><td style='text-align: center;'></td>"
									+"</tr>";
						  }
					  }
				  }else{
					  for(var b=0;b<6;b++){
						  if(b%2==0){
							  spanHtml+="<tr height='27px' id='tr1'>";
							}else{
								spanHtml+="<tr height='27px'>";
							}
						  spanHtml += "<td width='590px' style='text-align: center;'></td>"
								+"</tr>";
					  }
				  }
				  
				  document.getElementById("mission").innerHTML="<table style='border-width:0px 0px 0px 0px; table-layout:fixed;border-top: none;border-left: none;border-right: none;float: left;'>"+spanHtml+"</table>";
			  },
			  error: function (data) {
	        }
	})

}
//获取快捷导航
function getManagement(userID){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getManagement",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  data:{userID:userID},
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  for(i=0;i<ev.length;i++){
					  var a="5";
					  var b="kaohe";
					  if(i==1 ||i==5){
						  a="18";
						  b="ziliao";
					  }else if(i==2 ||i==6){
						  a="11";
						  b="shengchan";
					  }else if(i==3 ||i==7){
						  a="21";
						  b="jiandu";
					  }
					  var name="";
					  if(typeof(ev[i].APPLICATION_NAME)!='undefined'){
						  name=ev[i].APPLICATION_NAME;
					  }
					  spanHtml += "<a href='javascript:void(0)' onclick=clickFunc('"+name+"','"+ev[i].NAVIGATION_ID+"','"+ev[i].APPLICATION_URL+"') style='color: #000000;' >"
						+"<div style='background-image:url("+ev[i].IMAGE_URL+");float: left;margin-top:3%;' id='"+b+"'>"
							+"<h3 style='padding-top: 50%;padding-left: "+a+"%;font-family: 楷体;'>"+name+"</h3>"
						+"</div></a>";
				  }
				  document.getElementById("daohang").innerHTML=spanHtml;
			  },
			  error: function (data) {
	        }
	})

}
//获取指标值
function getTargetDate(position,userId){
	//获取参数
	$.ajax({
			  url:_contextPath+"/targetDate.do?method=getIndex",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  data:{position:position,userId:userId},
			  success: function(data){
				  var spanHtml="";
				  var html = "";
				  var ev=eval("("+data+")");
				  if(ev.length!=0){
					  if(position=="1"){
					  	
//					  	for(i=0;i<ev.length;i++){
//					  	       html+="<div id='tupian1' style='float: left;'>" +
//					  	       		"<div style='float:left;margin:6% 8%;font-size: 21px;'>" +
//					  	       		ev[i].QUOTA_NAME.substr(0,ev[0].QUOTA_NAME.length/2)+"<br/>"+ev[i].QUOTA_NAME.substr(ev[0].QUOTA_NAME.length/2)+"</div><div class='songti' id='ssfh' style='text-align: center;margin-top: 2px;'>" +
//					  	       		ev[i].VALUEDATE+"<br/>"</div></div>"; 
//					  	}
//					  document.getElementById("upzhibiao").innerHTML = html;
					  document.getElementById("ssfhvalue").innerHTML="<a style='color:#FFFFFF;' onclick=clickOpenWindow('"+ev[0].PI_CODE+"','') href='javascript:void(0)'>"+ev[0].VALUEDATE+"<br>"+ev[0].UNIT+"</a>";
					  document.getElementById("fdlvalue").innerHTML="<a style='color:#FFFFFF;' onclick=clickOpenWindow('"+ev[1].PI_CODE+"','') href='javascript:void(0)'>"+ev[1].VALUEDATE+"<br>"+ev[1].UNIT+"</a>";
					  //document.getElementById("sspmvalue").innerHTML=ev[2].VALUEDATE;
					  document.getElementById("dcylvalue").innerHTML="<a style='color:#FFFFFF;' onclick=clickOpenWindow('"+ev[3].PI_CODE+"','') href='javascript:void(0)'>"+ev[3].VALUEDATE+ev[3].UNIT+"</a>";
					  }
					  else if(position=="2"){
						  var a=0;
						  var Bar="";
						  yearCount = ev[3].VALUEDATE;
						  for(i=0;i<ev.length;i++){
							  a++;
							  if(typeof(ev[i].VALUEDATE)!='undefined'){
							  	   if(typeof(ev[i].PI_CODE)!='undefined'){
							  	       Bar = "onclick=clickOpenWindow('"+ev[i].PI_CODE+"','') href='javascript:void(0)'";
							  	   }
						           spanHtml+="<div class='td1' style='height:25px;'>"
										   +"<span class='tdn'><a "+Bar+">"+ev[i].QUOTA_NAME+"</a></span><span class='tdn2' id='"+ev[i].QUOTA_NAME+"'>"+ev[i].VALUEDATE+ev[i].UNIT+"</span>"
										   +"</div>";
						    }
						  }
						  document.getElementById("dczb").innerHTML=spanHtml;
						  getGenerating(userId);
					  }
				  }
			  },
			  error: function (data) {
	        }
	})

}
//获取计划发电量
function getGenerating(userId){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getGenerating",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  data:{userId:userId},
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  if(ev.length!=0 && typeof(ev[0].YEAR_PLAN)!='undefined'){
					  document.getElementById("年计划发电量").innerHTML=ev[0].YEAR_PLAN+ev[0].UNIT;
					  document.getElementById("月度计划发电量").innerHTML=ev[0].MONTH_PLAN+ev[0].UNIT;
					  document.getElementById("年度发电量完成率").innerHTML=yearCount/ev[0].YEAR_PLAN
				  }
			  },
			  error: function (data) {
	        }
	})

}
//获取排名
function getRanking(userId){
	//获取参数
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getRanking",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  data:{userId:userId},
			  success: function(data){
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  if(ev.length!=0){
					  document.getElementById("sspmvalue").innerHTML=ev[0].PAIMMING;
				  }
			  },
			  error: function (data) {
	        }
	})

}

function getWarningAnd(count){
   getWarning('0',count);
   getWarning('1',count);
}
//获取预警信息
function getWarning(status,count){
	//获取参数
	var org_id = $('select  option:selected').val();
	$.ajax({
			  url:_contextPath+"/mainDate.do?method=getWarning",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  data:{org_id:org_id,unitStatus:status,countSum:count},
			  //dataType:"json",
			  success: function(data){
				  var i=0;
					var trHtml=" <tr style='width: 100%;font-size: 20px;font-weight: bold;'>"
			            +"<td width='25%'>测点名称</td>"
			            +"<td style='position:relative' width='20%'>报警级别</td>"
			            +"<td style='position:relative' width='15%'>报警值</td>"
			            +"<td style='position:relative' width='20%'>报警时间</td>"
			            +"<td style='position:relative' width='20%'>报警时长</td>"
			        +"</tr>";
					if(data.length>2){
						var ev=eval("("+data+")");
						for(i=0;i<ev.length;i++){
							var htmlTd="";
							var level="";
							if(ev[i].LEVEL1==1){
								htmlTd="style='color:#00BFFF;'";
								level="班组";
							}else if(ev[i].LEVEL1==2){
								htmlTd="style='color:#FFFF00;'";
								level="部门";
							}else if(ev[i].LEVEL1==3){
								htmlTd="style='color:#FF8C00;'";
								level="电厂";
							}else if(ev[i].LEVEL1==4){
								htmlTd="style='color:#FF0000;'";
								level="集团";
							}
							if(i%2==0){
								trHtml+="<tr height='35px' id='tr1'>";
							}else{
								trHtml+="<tr height='35px'>";
							}
							trHtml+="<td class='ellipsis' "+htmlTd+" align='center'><a "+htmlTd+" onclick=clickFunc('报警信息','"+ev[i].W_ID+"','"+_contextPath+"/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+ev[i].W_ID+"') href='javascript:void(0)'>"+ev[i].NAME1+"</a></td>"
						   +"<td class='ellipsis' "+htmlTd+" align='center' >"+level+"</td>"
						   +"<td class='ellipsis' "+htmlTd+" align='center' ><a onclick=clickOpenWindow('"+ev[i].CODE1+"','"+ev[i].DATE1.substr(0,10)+"&nbsp;"+ev[i].DATE1.substr(11)+"') href='javascript:void(0)'>"+ev[i].VALUE1+"</a></td>"
						   +"<td class='ellipsis' "+htmlTd+" align='center'>"+ev[i].DATE1.substr(11)+"</td>"
						   +"<td class='ellipsis' "+htmlTd+" align='center'>"+ev[i].TIME1/60+"分钟</td></tr>"
						}
					}
					if(i<count){
						for(var a=0;a<count-i;i++){
							if(i%2==0){
								trHtml+="<tr height='35px' id='tr1'>";
							}else{
								trHtml+="<tr height='35px'>";
							}
						trHtml+="<td class='ellipsis'></td>"
						   +"<td class='ellipsis'></td>"
						   +"<td class='ellipsis'></td>"
						   +"<td class='ellipsis'></td>"
						   +"<td class='ellipsis'></td></tr>"
						}
					}
					if(status == '0'){
						document.getElementById("warntable").innerHTML="<table class=''" +
								"style='border-width:0px 0px 0px 0px; table-layout:fixed;border-top: none;border-left: none;border-right: none;float: left;width: 92%;'>"+trHtml+"</table>";

					}else if(status == '1'){
					  document.getElementById("warntable1").innerHTML="<table class=''" +
								"style='border-width:0px 0px 0px 0px; table-layout:fixed;border-top: none;border-left: none;border-right: none;float: left;width: 92%;'>"+trHtml+"</table>";

					}
								  },
			  error: function (data) {
	        }
	})

}


function clickFunc(title,funId,url){
      //var tabPanel = Ext.getCmp('funTabPanel');
	  var id= "tab$"+funId;
      var tab = {};
      tab.id = id;
      tab.title = title;
      tab.closable=true;
      tab.tabUrl = url;
      tab.html='<iframe id=iframe'+funId+'  fun_id ='+id+'  scrolling="auto" onload="getState(this)" frameborder="0" width="100%" height="100%" src="'+ url+'"></iframe>';
      window.parent.parent.funTabPanel.add(tab);  
      window.parent.parent.funTabPanel.setActiveTab(id);
    if(Ext.isChrome){
    	 var frame = window.parent.parent.frames['iframe'+funId];
    	  frame.height = window.parent.parent.document.getElementById(id+"-body").style.height;
    }
  };
//退出操作

function logout(){
	  var statu = confirm("您确定要退出吗?");
      if(!statu){
          return false;
      }
     $.ajax({
    	  type:'POST',
          url:_contextPath+"/frameAction.do?method=logout",
          dataType: "json",
          success:function(data){
               if(data.flag=='1'){            
            	   window.parent.location.href = window.location.protocol+"//"+window.location.host+_contextPath;
                 /*  window.location.href = _contextPath+"/wjdh/login.html";*/
               }       
          },
          error:function(data){
        	  alert("当前用户session失效,请重新登录");
          }
      });
}

