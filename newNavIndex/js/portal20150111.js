

var userID='<%=_userId%>';
$(function() {
	localStorage.setItem("specid", $("#spec").val());
	localStorage.setItem("orgid",$("#org").val());
	$("#spec").on('change', function() {
		changeSpec();
		
		 localStorage.setItem("specid", $("#spec").val());
	});
	
	$("#org").on('change', function() {
		changeOrg();
		localStorage.setItem("orgid",$("#org").val());
		 
	});

	
	 
	//console.log(localStorage.getItem("orgid"));
   // console.log(localStorage.getItem("specid"));
   
	init();
});

//var td = $('tbody td').not('.class_main9 table tbody td').each(function () {
//    $(this).attr({title:this.innerHTML}).css({textAlign:"center"});
//});
function styleTable(table){
    var $table = $(table);
    /*ok*/
    if(table == "#zongjieTable"){
        $table.find('td::nth-child(4n+1)').css({maxWidth:"78px",overflow:"hidden"});
        $table.find('td::nth-child(4n+2)').css({maxWidth:"145px",overflow:"hidden"});
        $table.find('td::nth-child(4n+3)').css({maxWidth:"60px",overflow:"hidden"});
        $table.find('td::nth-child(4n)').css({maxWidth:"80px",overflow:"hidden"});
    }
    /*ok*/
    if(table == "#yujingTable"){
        $table.find('td::nth-child(4n+1)').css({maxWidth:"65px",overflow:"hidden"});
        $table.find('td::nth-child(4n+2)').css({maxWidth:"150px",overflow:"hidden"});
        $table.find('td::nth-child(4n+3)').css({maxWidth:"75px",overflow:"hidden"});
        $table.find('td::nth-child(4n)').css({maxWidth:"45px",overflow:"hidden"});
    }
    /*ok*/
    if(table == "#jianduTable"||table == "#jianduzhixingTable"){
        $table.find('td::nth-child(4n+1)').css({maxWidth:"44px",overflow:"hidden"});
        $table.find('td::nth-child(4n+2)').css({maxWidth:"152px",overflow:"hidden"});
        $table.find('td::nth-child(4n+3)').css({maxWidth:"69px",overflow:"hidden"});
        $table.find('td::nth-child(4n)').css({maxWidth:"97px",overflow:"hidden"});
    }
    /**/

    if(table == "#baojingTable"){
        $table.find('td::nth-child(4n+1)').css({maxWidth:"125px",overflow:"hidden"});
        $table.find('td::nth-child(4n+2)').css({maxWidth:"65px",overflow:"hidden"});
        $table.find('td::nth-child(4n+3)').css({maxWidth:"50px",overflow:"hidden"});
        $table.find('td::nth-child(4n)').css({maxWidth:"110px",overflow:"hidden"});
    }


}
/**
 * 初始化 所有进行初次加载
 */
 
  function jigaihref(){
    if($("#org").val() == 'c21834b4-1cb0-490f-a2a8-deeaf7f7e065'){//岱海发电
        $('#jigaiInf').attr({href:"http://10.10.10.32:7001/jsjd/XipTecProject.do?method=showPage&id=4c425127-fadb-43bd-ba46-4aa601a6b2d7"})
    }else if($("#org").val() == '472212af-1977-462b-a74a-a1f36ed6562d'){//宁东发电
        $('#jigaiInf').attr({href:"http://10.10.10.32:7001/jsjd/XipTecProject.do?method=showPage&id=ad2aeb79-31a3-4c26-98f3-9b341496cbe5"})
    }
}
 
 
 
 
function init() {
	jigaihref();	
	yujing();
	jiandubaobiao();
	jianduzhixing();
	zongjie();
	baojing();
	project();

	getTargetDate(2,userID);//重要指标
	getMission(userID);  //工作提醒
	getWorksDate(userID);//监督工作
	
	setTimeout(function(){
		major_pulldown();
	},3000);

} 
/**
 * 电厂改变
 */
function changeOrg() {
	userID='<%=_userId%>';
	console.log(userID)
	jigaihref();
	major_pulldown();
	yujing();
	jiandubaobiao();
	jianduzhixing();
	baojing();
	zongjie();
	project();	
	getTargetDate(2,userID);//重要指标
	getMission(userID);  //工作提醒
	getWorksDate(userID);//监督工作
}

/**
 * 专业改变
 */
function changeSpec() {
	jiandubaobiao();
	jianduzhixing();
	baojing();
	zongjie();
	yujing();
	getTargetDate(2,userID);//重要指标
	getMission(userID);  //工作提醒
	getWorksDate(userID);//监督工作
}



function major_pulldown() {
	var url = ctx + "/portal/quotaList.do?orgid=" + $("#org").val();
	console.log(url);
	$
			.ajax({
				url : url,
				dataType : "json",
				success : function(data) {
					if (data && data.length > 0) {
						/* 圆环上数据 */
						var circleClass = 'circle1';
						if(data.length == 1){
							$(".circle_data7").html(Number(data[0].fhl).toFixed(1)+'%').show(); // 保留一位小数！
							$(".circle_data5").hide();
							$(".circle_data6").hide();
							$(".circle5").hide();
							$(".circle6").hide();
							$(".circle_data").each(function(i) {
								$(this).hide();
							});
							$('.circle1').hide();
							$('.circle7').html(data[0].jzm).show();
							$('.circle7').css(
									{
										backgroundImage : getYxzt(data[0].yxzt)
									});
						}else if(data.length == 2){
							$(".circle_data5").html(Number(data[0].fhl).toFixed(1)+'%').show(); // 保留一位小数！
							$(".circle_data6").html(Number(data[1].fhl).toFixed(1)+'%').show(); // 保留一位小数！
							
							$('.circle5').html(data[0].jzm).show();
							$('.circle6').html(data[1].jzm).show();

							
							$(".circle_data7").hide();
							$(".circle7").hide();
							$('.circle1').hide();
							$(".circle_data").each(function(i) {
								$(this).hide();
							});
							$('.circle5').css(
									{
										backgroundImage : getYxzt(data[0].yxzt)
									});
							$('.circle6').css(
									{
										backgroundImage : getYxzt(data[1].yxzt)
									});
						}else if(data.length == 4){
							$(".circle_data5").hide();
							$(".circle_data6").hide();
							$(".circle_data7").hide();
							$(".circle5").hide();
							$(".circle6").hide();
							$(".circle7").hide();
							$(".circle_data").each(function(i) {
								$(this).html(Number(data[i].fhl).toFixed(1)+'%').show(); // 保留一位小数！
							});
							circleClass = 'circle1';
							/* 圆环颜色 */
							/* 0.0 绿色 1.0红色 2.0 非停 3.0 黄色 */
							$('.circle1')
							.each(
									function(i) {
											$('.circle1')
											.eq(i)
											.css(
													{
														backgroundImage : getYxzt(data[i].yxzt)
													});
											$('.circle1').eq(i).html(data[i].jzm).show();
										
									})
						}
					} else {
						$(".circle_data").each(function(i) {
							$(this).html(''); // 保留一位小数！
						});
						$(".circle_data5").html('');
						$(".circle_data6").html('');
						$(".circle_data7").html('');
					}
					/*
					 * alert(data[0].NAME); console.log(data[0].NAME);
					 * console.log(data[0].ID);
					 */
				}
			});
	/* console.log($('#marjor_pulldown').find("option").size()) */
}

function getYxzt(yxzt){
	if (parseInt(yxzt) == 0) {
		return "url('"+ ctx+ "/newNavIndex/img/operate.png')";
	} else if (parseInt(yxzt) == 1) {
		return "url('"+ ctx+ "/newNavIndex/img/pause.png')";
	} else if (parseInt(data[i].yxzt) == 3) {
		return  "url('"+ ctx+ "/newNavIndex/img/pause.png')";
	}
	return '';
}


var unit_status = '0';

function changeBaojing(status){
	unit_status = status;
	baojing();
	$("#baojingxinxi").css({display:"block"});
	$("#yujingtongzhidan").css({display:"none"});
}

function yjtz_show(){
	$("#baojingxinxi").css({display:"none"});
	$("#yujingtongzhidan").css({display:"block"});
	
}
function baojing(){
	//unit_status 0 运行 1 停机
	var url = ctx + "/portal/warningMessageList.do?orgid=" + $("#org").val() + "&pagenum=1&pagesize=5&ispage=true&unit_status="+unit_status;
	ajax(url, "baojingTable", ['T_P_NAME', 'W_LEVEL', 'W_VALUE','W_DATE']);
}

/**
 * 技改项目
 */
function project(){
	 var url = ctx + "/portal/getProject.do?pagenum=1&pagesize=2&ispage=true&orgid="+$("#org").val();
	    $.ajax({
	        url:url,
	        dataType:"json",
	        success: function (data) {
	            if(data && data.pagedata.length>0){
	            	$("#projectId1").html('<a href="javascript:void(0);" onclick="jigai(\''+data.pagedata[0].ID+'\');">'+data.pagedata[0].TP_NAME+'<a>');
	            	$("#projectId2").html('<a href="javascript:void(0);" onclick="jigai(\''+data.pagedata[1].ID+'\');">'+data.pagedata[1].TP_NAME+'<a>');
	            	jigai(data.pagedata[0].ID);
	            }else{
	            	$("#projectId1").html('');
	            	$("#projectId2").html('');
	            }
	        }
	    });
}
/**
 * 技改查询
 */
function jigai(projectId){
	if(projectId == undefined || projectId== '')
		return;
    var url = ctx + "/portal/technicalProjectData.do?projectid="+projectId+"&begintime=2015-01-01 00:00:00";
    $.ajax({
        url:url,
        dataType:"json",
        success: function (data) {
            if(data&&data.pagedata.length>0){
            	var xData = [];
            	var yesterday = [];
            	var today = [];
            	var all = [];
                for(var i = 0;i<data.pagedata.length;i++ ){
                    yesterday.push(data.pagedata[i].PROFIT_ALL-data.pagedata[i].PROFIT_TODAY);
                    today.push(data.pagedata[i].PROFIT_TODAY);
                    all.push(data.pagedata[i].PROFIT_ALL);
                    xData.push(data.pagedata[i].PROFIT_DATE_LOOP.split(' ')[0]);
                }
                var data1 = yesterday.concat(today,all);
                chart(data1,xData);
            }else{
            	 chart([],[]);
            }
        }
    });
}
var type = '0';

function changeZongjie(status){
	type = status;
	zongjie();
}
function zongjie(){
	//type：0 是计划、 1 是总结
	var url = ctx + "/portal/supervisionPlanOrSummaryPageData.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val()+ "&pagenum=1&pagesize=5&ispage=true&type="+type;
	ajax(url, "zongjieTable", ['S_P_CODE', 'S_P_NAME', 'EMP_NAME','CREATE_DATE']);
}


function yujing() {
	var url = ctx + "/portal/warningNoticeList.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val()+ "&pagenum=1&pagesize=6&ispage=true"
	ajax(url, "yujingTable", [ 'W_LEVEL', 'DESCRIPTION', 'W_DATE','AUDIT_STATUS' ]);
}

function jiandubaobiao(){
	var url = ctx + "/portal/supervisionReportPageData.do?orgid=" + $("#org").val()+ "&specid=" + $("#spec").val() + "&pagenum=1&pagesize=6&ispage=true";
//	'GENERAL_ID',
	ajax(url, "jianduTable", [ 'GENERAL_CODE','GENERAL_NAME', 'EMP_NAME','CREATE_DATE' ]);
}
//jianduzhixing 
function jianduzhixing(){
	
	var url = ctx + "/portal/supervisionImplementationList.do?orgid=" + $("#org").val()+ "&specid=" + $("#spec").val() + "&pagenum=1&pagesize=6&ispage=true";
	ajax(url, "jianduzhixingTable", [ 'MOM_CODE','MOM_TYPE', 'EMP_NAME', 'CREATE_DATE' ]);

}

function ajax(url, tableId, columns) {
	$.ajax({
		url : url,
		dataType : "json",
		success : function(data) {
			var tableHtml = '';
			if (data && data.pagedata.length > 0) {
				tableHtml = prearData(data.pagedata, columns, tableId);
			}
			$("#" + tableId).html(tableHtml);
			styleTable("#" + tableId);
		}
	});
}

function getAudit_Status(value) {
	if (value == 'A') {
		return '草稿';
	} else if (value == 'G') {
		return '生产部领导审核';
	} else if (value == 'C') {
		return '电厂接收';
	} else if (value == 'D') {
		return '处理中';
	} else if (value == 'I') {
		return '公司验收';
	} else if (value == 'K') {
		return '集团验收';
	} else if (value == 'M') {
		return '处理完成';
	} else if (value == '1') {
		return '部门级审核';
	} else if (value == '3') {
		return '生技部领导审核';
	} else if (value == '4') {
		return '公司领导审核';
	} else if (value == '5') {
		return '处理中';
	} else if (value == '6') {
		return '申请验收';
	} else if (value == '7') {
		return '完成';
	} else if (value == 'Z') {
		return '作废';
	}
	return '';

}

function prearData(data, columns, table) {
	var htmlArray = new Array();
	for (var i = 0; i < data.length; i++) {
		var d = data[i];
		htmlArray.push("<tr>");
		for (var j = 0; j < columns.length; j++) {
			var columnValue = getColumnValue(table, columns[j], d[columns[j]]);
			var color = '';
			if(table == "baojingTable"){
				color = getTdColor(d['W_LEVEL']);
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a title="+columnValue+" class='ellipsis' href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+d.W_ID+"'>" + columnValue + "</a></td>");
			}
			if(table == "jianduzhixingTable"){
				htmlArray.push("<td class='ellipsis'><a title="+columnValue+" class='ellipsis' href='http://10.10.10.32:7001/jsjd/main?xwl=23YYEI1R9984&executeId="+d.MOM_ID+"'>" + columnValue + "</a></td>");
			}
		
			if(table == "zongjieTable"){
				
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a title="+columnValue+" href=' http://10.10.10.32:7001/jsjd/main?xwl=23YYRPL8YUSW&ORG_ID="+localStorage.getItem("orgid")+"&IS_SUMMARIZE="+d.IS_SUMMARIZE+"&S_P_TYPE="+d.S_P_TYPE+"&S_P_ID="+d.S_P_ID+"'>" + columnValue + "</a></td>");
			/*htmlArray.push("<td class='ellipsis' style=\""+color+"\">" + columnValue + "</td>");*/
			}
			if(table == "jianduTable"){
				http://10.10.10.32:7001/jsjd/main?xwl=23YYSVDX10MS&TEMPLETE_ID=aaa&GENERAL_ID=bbb
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a title="+columnValue+" href='http://10.10.10.32:7001/jsjd/main?xwl=23YYSVDX10MS&TEMPLETE_ID="+d.TEMPLETE_ID+"&GENERAL_ID="+d.GENERAL_ID+"'>" + columnValue + "</a></td>");
				/*htmlArray.push("<td class='ellipsis' style=\""+color+"\">" + columnValue + "</td>");*/
			}
			if(table == "yujingTable"){
				
				/*htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+data.W_ID+"'>" + columnValue + "</a></td>");*/
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a title="+columnValue+" href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWT&fromPage=y'>" + columnValue + "</a></td>");
			}
			
		
			
		}
		
		htmlArray.push("</tr>");
	}
	return htmlArray.join('');
}


function getColumnValue(table, column, columnValue) {
	if(columnValue == undefined)
		return '';
	if (table == 'yujingTable') {
		if (column == 'W_LEVEL') {
			if (columnValue == 0) {
				columnValue = "一般预警";
			} else if (columnValue == 1) {
				columnValue = "严重预警";
			}
		} else if (column == 'AUDIT_STATUS') {
			columnValue = getAudit_Status(columnValue);
		} else if (column == 'W_DATE') {
			columnValue = columnValue.split(" ")[0];
		}
	}else if(table == "jianduTable"){
		if (column == 'CREATE_DATE') {
			columnValue = columnValue.split(" ")[0];
		}
	}else if(table == "jianduzhixingTable"){
		if (column == 'CREATE_DATE') {
			columnValue = columnValue.split(" ")[0];
		}
	}else if(table == "baojingTable"){
		if (column == 'W_LEVEL') {
			switch (columnValue) {
			case '1':
				columnValue='班组';
				break;
			case '2':
				columnValue='部门';
				break;
			case '3':
				columnValue='电厂';
				break;
			case '4':
				columnValue='集团';
				break;
			default:
				columnValue='';
				break;
			}
		}
	}else if(table == "zongjieTable"){
		if (column == 'CREATE_DATE') {
			columnValue = columnValue.split(" ")[0];
		}
	}
	return columnValue;
}

function getTdColor(w_level){
	switch (w_level) {
	case '4':
		//w_level="color:red";
	w_level="color:#000";
		break;
	case '3':
		//w_level="color:orange";
	w_level="color:#000";
		break;
	case '2':
		w_level="";
		break;
	case '1':
		//w_level="color:blue";
	w_level="color:#000";
		break;
	default:
		w_level='';
		break;
	}
	return w_level;
}



function chart(data,xData) {
	//alert(data.length)
	var one = [];
	var two = [];
	var three = [];
	var s = data.length;
	for (var i = 0; i < s; i++) {
		if (i < s / 3) {
			one.push(data[i]);
		} else if (i > s / 3 - 1 && i < s * 2 / 3) {
			two.push(data[i]);
		} else if (i > s * 2 / 3 - 1 && i < s * 3 / 3) {
			three.push(data[i])
		}
	}
	
	

	// 基于准备好的dom，初始化echarts图表
	var myChart = echarts.init(document
			.getElementById('my_echart'));
	option = {
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : [ '昨日收益', '今日收益', '累计收益' ],

			y : 30
		},

		calculable : true,
		axis : {
			axisLine : {
				lineStyle : {
					color : '#000',
					width : 2,
					type : 'solid'
				}
			}
		},
		xAxis : [ {
			name : "运行时间",
			nameLocation : "end",
			axisLine : {
				lineStyle : {
					color : '#000',
					width : 2,
					type : 'solid'
				}
			},
			type : 'category',
			boundaryGap : false,
			data : xData
		} ],
		yAxis : [ {

			name : "投运时间",
			nameLocation : "start",
			type : 'value',
			axisLine : {
				lineStyle : {
					color : '#000',
					width : 2,
					type : 'solid'
				}
			},
		} ],
		series : [ {
			name : '昨日收益',
			type : 'line',
			stack : '总量',
			data : one
		}, {
			name : '今日收益',
			type : 'line',
			stack : '总量',
			data : two
		}, {
			name : '累计收益',
			type : 'line',
			stack : '总量',
			data : three
		} ]
	};

	// 为echarts对象加载数据
	myChart.setOption(option);

}
//切换table下两个不同内容~~
$(".title").on("click",function(){
	$(this).addClass('title_active').siblings().removeClass("title_active");

});

//为所有table  a 加class 溢出隐藏
setInterval(function(){
    $("td a").addClass("ellipsis");
},2000);

// 根据用户不同，切换生产报表到不同的视图。


if(localStorage.getItem("orgid") === "a61365e2-969d-4352-b3f8-805027ab9f1d"){
	
    $('.dianchang_view').css({display:"none"});
	$('.jituan_view').css({display:"block"});
	$('.jituan_view a').css({width:120});


}else{
	
	$('.dianchang_view').css({display:"block"});
    $('.jituan_view').css({display:"none"});
	$('.dianchang_view a').css({width:120});
}
//交互就是传递一个数组过来就行在ajax里调用chart方法

//生产报表 /监督报表切换

function jiandubaobiao_show(){	
	
	$('.shengchanbaobiao_view').css({display:"none"})
	$('.jiandubaobiao_view').css({display:"block"})

}
function shengchanbaobiao_show(){	
	$('.shengchanbaobiao_view').css({display:"block"})
	$('.jiandubaobiao_view').css({display:"none"})
	$('.dianchang_view').find('a').css({backgrond:"#fff"});
	$('.dianchang_view').find("td").css({backgrond:'#fff'});
	
}
//工作提醒/监督工作切换
function gztx_view(){
	$("#gztx").css({display:"block"});
	$("#jdgz").css({display:"none"});
}
function jdgz_view(){
	$("#gztx").css({display:"none"});
	$("#jdgz").css({display:"block"});
	
}

//table2 重要参数。。。
function getTargetDate(position,userId){
	
	$.ajax({
		  url:ctx+"/targetDate.do?method=getIndex",
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
					 
				 
				  document.getElementById("ssfhvalue").innerHTML="<a style='color:#FFFFFF;' onclick=clickOpenWindow('"+ev[0].PI_CODE+"','"+ev[0].QUOTA_NAME+"','','','"+ev[0].METHOD+"','"+ev[0].POINTS+"') href='javascript:void(0)'>"+parseFloat(ev[0].VALUEDATE).toFixed(2)+"</a>";
				  document.getElementById("fdlvalue").innerHTML="<a id='fdlvalue_a' style='color:#FFFFFF;' onclick=clickOpenWindow('"+ev[1].PI_CODE+"','"+ev[1].QUOTA_NAME+"','','','"+ev[1].METHOD+"','"+ev[1].POINTS+"') href='javascript:void(0)'>"+parseFloat(ev[1].VALUEDATE).toFixed(2)+"</a>";
				  document.getElementById("sspmvalue").innerHTML="<a style='color:#FFFFFF;' onclick=clickOpenWindow('"+ev[2].PI_CODE+"','"+ev[2].QUOTA_NAME+"','','','"+ev[2].METHOD+"','"+ev[2].POINTS+"') href='javascript:void(0)'>"+parseFloat(ev[2].VALUEDATE).toFixed(2)+"</a>";
				  document.getElementById("dcylvalue").innerHTML="<a style='color:#FFFFFF;' onclick=clickOpenWindow('"+ev[3].PI_CODE+"','"+ev[3].QUOTA_NAME+"','','','"+ev[3].METHOD+"','"+ev[3].POINTS+"') href='javascript:void(0)'>"+parseFloat(ev[3].VALUEDATE).toFixed(2)+"</a>";
				  }
				  else if(position=="2"){
					  
					  var a=0;
					  var Bar="";
					  yearCount = ev[3].VALUEDATE;
					  for(i=0;i<ev.length;i++){
						  a++;
						  if(typeof(ev[i].VALUEDATE)!='undefined'){
						  	   if(typeof(ev[i].PI_CODE)!='undefined'){
						  	       Bar = "onclick=clickOpenWindow('"+ev[i].PI_CODE+"','"+ev[i].QUOTA_NAME+"','','','"+ev[i].METHOD+"','"+ev[i].POINTS+"') href='javascript:void(0)'";
						  	   }
					           spanHtml+="<div class='td1' style='height:30px;'>"
										   +"<span class='tdn'>" +
										   		"<a style='text-align:left'"+Bar+" id='"+ev[i].PI_CODE+"'>"+ev[i].QUOTA_NAME+"</a>" +
										   	"</span>" +
										   	"<span class='tdn2' id='"+ev[i].QUOTA_NAME+"'>"+parseFloat(ev[i].VALUEDATE).toFixed(2)+ev[i].UNIT+"</span>"
									   +"</div>";
					    }
					  }
					  document.getElementById("dczb").innerHTML=spanHtml;
					 // getGenerating(userId);
				  }
			  }
		  },
		  error: function (data) {
      }
	})

}

//工作提醒

function getMission(userID){
	//获取参数
	$.ajax({  
			
			  url:ctx+"/mainDate.do?method=getMission",
			  type:"POST",
			  async: false,//同步操作
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  data:{userID:userID},
			  //dataType:"json",
			  success: function(data){
				 // console.log(data);
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  var a=0;
				  if(ev.length!=0){
					  for(i=0;i<ev.length;i++){
						  a++;
						  if(i%2==0){
							  spanHtml+="<tr height='25px'>";
							}else{
								spanHtml+="<tr height='25px'>";
							}
						  spanHtml += "<td style='width:20px;text-align:center'>"+a+"</td><td  class='ellipsis' width='150px' style=''><a href='javascript:void(0)' onclick=updateMission1('"+ev[i].MISSION_ID+"','CLOSE','"+ctx+"/main?xwl="+ev[i].MISSION_ADDRESS+"&showAddWindow=Y')>"+ev[i].MISSION_DEC+"</a></td>" +
						  		"<td class='ellipsis' width='80px' style='text-align: center;'>"+ev[i].CREATE_DATE+"</td>" +
						  		"<td class='ellipsis' width='100px' style='text-align: center;'><span>"+ev[i].DAYS+"</span><span href='javascript:void(0)' onclick=updateMission('"+ev[i].MISSION_ID+"','CANCEL')>不再提醒</span></td>"
								;
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
						  spanHtml += "<td  style='text-align: center;'></td>"
								+"</tr>";
					  }
				  }
				 // document.getElementById("mission").innerHTML ="提醒工作"
				  document.getElementById("mission").innerHTML="<table style='border-width:0px 0px 0px 0px; table-layout:fixed;border-top: none;border-left: none;border-right: none;float: left;'>"+spanHtml+"</table>";
			  },
			  error: function (data) {
	        }
	})

}
//监督工作

function getWorksDate(userID){
	userid=userID;
	//获取参数
	$.ajax({
			  url:ctx+"/mainDate.do?method=getWorks",
			  type:"POST",
			  async: false,//同步操作
			  data:{userID:userID},
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  success: function(data){
				  //console.log(data);
				  var spanHtml="";
				  var ev=eval("("+data+")");
				  var a=0;
				  for(i=0;i<ev.length;i++){

					  a++;
					  spanHtml += "<tr height='30px'>" +
					  					"<td width='40px' style='text-align:center'>"+a+"</td>" +
					  					"<td class='ellipsis'>" +
					  						"<a href='#' onclick=openTaskPage('"+ctx+"','"+ev[i].TASKID+"','"+ev[i].TASKSTATE+"','"+userID+"') style='width:100%' class='csspan'>"+ev[i].TASKTITLE+"</a>"+
					  					"</td>"+
					  				"</tr>";
				  }
				  document.getElementById("works").innerHTML="<table style=' border-top: none;border-left: none;border-right: none;float: left;'>"+spanHtml+"</table>";
			  },
			  error: function (data) {
	        }
	})

}

//更新提醒状态  

function updateMission1(ID,type,url){
    clickFunc('工作提醒填报',ID,url);
	$.ajax({
		  url:ctx+"/mainDate.do?method=updateMission",
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






























