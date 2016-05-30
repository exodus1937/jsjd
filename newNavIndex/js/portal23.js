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


var td = $('tbody td').each(function () {
    $(this).attr({title:this.innerHTML}).css({textAlign:"center"});
});
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
function init() {
	major_pulldown();
	yujing();
	jiandubaobiao();
	jianduzhixing();
	zongjie();
	baojing();
	project();
}
/**
 * 电厂改变
 */
function changeOrg() {
	major_pulldown();
	yujing();
	jiandubaobiao();
	jianduzhixing();
	baojing();
	zongjie();
	project();
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
							$(".circle_data7").html(Number(data[0].fhl).toFixed(1)).show(); // 保留一位小数！
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
							$(".circle_data5").html(Number(data[0].fhl).toFixed(1)).show(); // 保留一位小数！
							$(".circle_data6").html(Number(data[1].fhl).toFixed(1)).show(); // 保留一位小数！
							
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
								$(this).html(Number(data[i].fhl).toFixed(1)).show(); // 保留一位小数！
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
		return "url('"+ ctx+ "/newNavIndex/img/no_data.png')";
	} else if (parseInt(data[i].yxzt) == 3) {
		return  "url('"+ ctx+ "/newNavIndex/img/pause.png')";
	}
	return '';
}


var unit_status = '0';

function changeBaojing(status){
	unit_status = status;
	baojing();
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
	ajax(url, "zongjieTable", ['SP_CODE', 'S_P_NAME', 'EMP_NAME','CREATE_DATE']);
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
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="++d[i].["W_ID"]+"'>" + columnValue + "</a></td>");
			}
			if(table == "jianduTable"){
				
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+data.W_ID+"'>" + columnValue + "</a></td>");
			}
			if(table == "jianduzhixingTable"){
				
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+data.ORG_ID+"'>" + columnValue + "</a></td>");
			}
			if(table == "yujingTable"){
				
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+data.W_ID+"'>" + columnValue + "</a></td>");
			}
			if(table == "zongjieTable"){
				
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+data.W_ID+"'>" + columnValue + "</a></td>");
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
		w_level="color:red";
		break;
	case '3':
		w_level="color:orange";
		break;
	case '2':
		w_level="";
		break;
	case '1':
		w_level="color:blue";
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
	console.log(one);
	console.log(two);
	console.log(three);
	/*console.log(three)*/

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
//交互就是传递一个数组过来就行在ajax里调用chart方法