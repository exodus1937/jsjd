var flag = false;
var userID;
var org_name=null;
Default_option();

//根据用户的电厂和专业来对应显示；
function Default_option(){
	var wj_spec = $("#wj_spec").val();
	var wj_option = $("#spec option").not("#wj_spec");
	for(var i = 0;i < wj_option.length; i++){
		if(wj_option[i].value == wj_spec){			
			$("#spec").get(0).removeChild(wj_option[i])
		}
	}
	
	$.ajax({
		url : ctx + "/portal/getOrgIdByUserId.do",
		dataType : "json",
		success : function(data) {		
			var wj_orgid =data[0].ORG_ID;			
			$('#org option').each(function(){
				if(this.value == wj_orgid){
					org_name=data[0].ORG_NAME;
					this.selected = "selected";
					
					tabs();
					 flag=true;
					 flag2(flag);
					 jituanjinlai();
				}
			})
		}
	});		
}
//集团用户进来

function jituanjinlai(){
	if(org_name=="京能集团"){
		
		$('#yibiaopan').show();
		changeView()
		$('.dianchang_view').hide();
		$('.jituan_view').show();
		$('.class_main1_main').hide();


		
	}else{
		
		$('#yibiaopan').hide();
		$('.dianchang_view').show();
		$('.jituan_view').hide();
		$('.class_main1_main').show();
		
	}
}
//指标排名
$.ajax({
	url:ctx+"/zbpm.do?method=getZbpm&org_id="+$("#org").val()+"&flag=0",
	type:"GET",
	success:function(data){
		  var ev1=eval("("+data+")");
		  if(ev1[0].mark=="success"){
			  	$.ajax({
			  	url:ctx+"/zbpm.do?method=getZbpm&org_id="+$("#org").val()+"&flag=1",
			  	type:"GET",
			  	success:function(data){
			  		  var ev2=eval("("+data+")");
			  		for(var i=0;i<ev1.length;i++){
						  var tdhtml=trfix(ev1[1].ZHGDMH_val.toFixed(2),ev1[1].ZHGDMH_p,ev2[1].ZHGDMH_val.toFixed(2),ev2[1].ZHGDMH_p)+
						  			 trfix(ev1[2].CHYDL_val.toFixed(2),ev1[2].CHYDL_p,ev2[2].CHYDL_val.toFixed(2),ev2[2].CHYDL_p)+					  			 
						  			 trfix(ev1[3].ZHCHYDL_val.toFixed(2),ev1[3].ZHCHYDL_p,ev2[3].ZHCHYDL_val.toFixed(2),ev2[3].ZHCHYDL_p)+
						  			 trfix(ev1[4].JZFHL_val.toFixed(2),ev1[4].JZFHL_p,ev2[4].JZFHL_val.toFixed(2),ev2[4].JZFHL_p)+
						  			 trfix(ev1[5].BSHL_val.toFixed(2),ev1[5].BSHL_p,ev2[5].BSHL_val.toFixed(2),ev2[5].BSHL_p);
					 
					}		  		
					$("#zhibiaopaimingtable").html(tdhtml);		  		  		  		 
			  	}
			  	
			 })
		  
		}			 		 
		  
	}
	
})



 function trfix(val1 ,pm1,val2,pm2){
  	var tr ="<tr>" +
	"<td> "+val1+"</td>" +
	"<td> "+pm1+"</td>" +
	"<td>"+val2+"</td>"+
	"<td>"+pm2+"</td>"
	"</tr>"
	return tr;
							
}
//异常情况
function yichangqingkuang(){
	$.ajax({
	url:ctx+"/portal/getAbnormalList.do?orgid="+$("#org").val(),
	type:"GET",
		success:function(data){
			var ev=eval("("+data+")");
			if(ev.length!=0){
				for(var i=0;i<ev.length;i++){
					 var tdhtml="<tr>" +
				  		"<td> "+ev[i].name+"</td>" +
				  		"<td> "+ev[i].code+"</td>" +
				  		"<td>"+ev[i].time+"</td>"
				  		"</tr>"
				}
				$("#ycqktable").html(tdhtml);
			}
		}
	})
}
yichangqingkuang();

//机组状态参数跳转处理
var tiaozhuan=document.getElementsByClassName('tiaozhuan')[0];
function tabs(){
	
	if(org_name=="岱海发电"){
		tiaozhuan.href=ctx +"/main?xwl=23YA0QJSVS7L"
	}else if(org_name=="宁东发电"){
		tiaozhuan.href=ctx +"/main?xwl=23YA0QJSVS7L"
	}
}


function flag2(flag){
		
		if (flag){
		userID=$("#useId").html();
		
	
		$(function() {
			localStorage.setItem("specid", $("#spec").val());
			localStorage.setItem("orgid",$("#org").val());
			
			$("#spec").on('change', function() {
				changeSpec();		
				 localStorage.setItem("specid", $("#spec").val());
			});
			
			$("#org").on('change', function() {

				
				changeOrg();
				
				if($("#org option:selected").text()=='京能集团'){
					$('.dianchang_view').hide();

					$('.jituan_view').show();
					$('.class_main1_main').hide();
					$('#main1').show();
					

					$("#d_dcyh").hide();//电厂用户;
					$("#d_jtyh").show();//集团用户;	

				}else{
					changeOrg();//1-31,把集团与电厂隔离开
					$('.dianchang_view').show();
					$('.jituan_view').hide();

					$("#d_dcyh").show();//电厂用户;
					$("#d_jtyh").hide();//集团用户;	
				}
				
				if($("#org option:selected").text()=='岱海发电'){
					tiaozhuan.href=ctx +"/main?xwl=23YA0QJSVS7L"
				}else if($("#org option:selected").text()=='宁东发电'){
					
					tiaozhuan.href=ctx +"/main?xwl=23YA0QJSVS7L"
				}
				localStorage.setItem("orgid",$("#org").val());		 
			});
	 init();
	});
}
	
}



//该变技改项目的时候，同时改变title更多的超链接；
function jigaihref(){
    if($("#org").val() == 'c21834b4-1cb0-490f-a2a8-deeaf7f7e065'){//岱海发电
        $('#jigaiInf').attr({href:ctx+"/XipTecProject.do?method=showPage&id=4c425127-fadb-43bd-ba46-4aa601a6b2d7"})
    }else if($("#org").val() == '472212af-1977-462b-a74a-a1f36ed6562d'){//宁东发电
        $('#jigaiInf').attr({href:ctx+"/XipTecProject.do?method=showPage&id=ad2aeb79-31a3-4c26-98f3-9b341496cbe5"})
    }
}
function styleTable(table){
    var $table = $(table);
    /*ok*/
    if(table == "#zongjieTable"){
    	$table.find('td').eq(0).css({maxWidth:"78px",overflow:"hidden"});
    	$table.find('td').eq(1).css({maxWidth:"145px",overflow:"hidden"});
    	$table.find('td').eq(2).css({maxWidth:"60px",overflow:"hidden"});
    	$table.find('td').eq(3).css({maxWidth:"80px",overflow:"hidden"});
    	
        $table.find('tr::nth-child(4n+1) a').css({maxWidth:"78px",overflow:"hidden"});
        $table.find('tr::nth-child(4n+2) a').css({maxWidth:"145px",overflow:"hidden"});
        $table.find('tr::nth-child(4n+3) a').css({maxWidth:"60px",overflow:"hidden"});
        $table.find('tr::nth-child(4n) a').css({maxWidth:"80px",overflow:"hidden"});
    }
    /*ok*/
    if(table == "#yujingTable"){
    	
    	$table.find('td').eq(0).css({maxWidth:"65px",overflow:"hidden"});
    	$table.find('td').eq(1).css({maxWidth:"150px",overflow:"hidden"});
    	$table.find('td').eq(2).css({maxWidth:"75px",overflow:"hidden"});
    	$table.find('td').eq(3).css({maxWidth:"45px",overflow:"hidden"});
    	
        $table.find('td::nth-child(4n+1) a').css({maxWidth:"65px",overflow:"hidden"});
        $table.find('td::nth-child(4n+2) a').css({maxWidth:"150px",overflow:"hidden"});
        $table.find('td::nth-child(4n+3) a').css({maxWidth:"75px",overflow:"hidden"});
        $table.find('td::nth-child(4n) a').css({maxWidth:"45px",overflow:"hidden"});
    }
    /*ok*/
    if(table == "#jianduTable"||table == "#jianduzhixingTable"){
    	
    	$table.find('td').eq(0).css({maxWidth:"44px",overflow:"hidden"});
    	$table.find('td').eq(1).css({maxWidth:"221px",overflow:"hidden"});
    	$table.find('td').eq(2).css({maxWidth:"97px",overflow:"hidden"});
    
    	
        $table.find('td::nth-child(3n+1) a').css({maxWidth:"44px",overflow:"hidden"});
        $table.find('td::nth-child(3n+2) a').css({maxWidth:"221px",overflow:"hidden"});
        $table.find('td::nth-child(3n+3) a').css({maxWidth:"97px",overflow:"hidden"});
       
    }
    /**/

    if(table == "#baojingTable"){
    	
    	$table.find('td').eq(0).css({maxWidth:"125px",overflow:"hidden"});
    	$table.find('td').eq(1).css({maxWidth:"65px",overflow:"hidden"});
    	$table.find('td').eq(2).css({maxWidth:"50px",overflow:"hidden"});
    	$table.find('td').eq(3).css({maxWidth:"110px",overflow:"hidden"});
    	
        $table.find('td::nth-child(4n+1) a').css({maxWidth:"125px",overflow:"hidden"});
        $table.find('td::nth-child(4n+2) a').css({maxWidth:"65px",overflow:"hidden"});
        $table.find('td::nth-child(4n+3) a').css({maxWidth:"50px",overflow:"hidden"});
        $table.find('td::nth-child(4n) a').css({maxWidth:"110px",overflow:"hidden"});
    }


}
/**
 * 初始化 所有进行初次加载
 */
 

 
 //初始化； 
function init() {
	jigaihref();	
	yujing();
	jiandubaobiao();
	jianduzhixing();
	zongjie(0);
	baojing(0);
	project();
	changeView();
	
	getMission(userID);  //工作提醒
	getWorksDate(userID);//监督工作	
	setInterval(function(){
		major_pulldown();
		changeView();
		
	},20000);
	major_pulldown();
	
} 
/**
 * 电厂改变
 */

function changeOrg() {		
	userID=$("#userId").html()
	
	jigaihref();
	major_pulldown();
	yujing();
	jiandubaobiao();
	jianduzhixing();
	baojing(0);
	zongjie(0);
	project();	
	changeView() //指标一览
	getMission(userID);  //工作提醒
	getWorksDate(userID);//监督工作
	JTjiandubaobiao(); //集团监督报表;
	
}
//指标一览判断处理函数；
//集团和电厂分为2个不同的ajax获取数据；
//tab2!!!!!!!!!!!!!!!!!!!!!!通过tab切换来实现   电厂  和  集团的不同数据展示
function changeView(){
	//执行集团视图的ajax获取数据
	if($("#org").val() == "a61365e2-969d-4352-b3f8-805027ab9f1d"){
			//getTargetDateValues();
			//执行集团视图的ajax获取数据
			$("#dczb").hide();
			$("#jituanzhibiao").show();		
	}else{
		//getTargetDate(2,$("#org").val());//重要指标
		zhibiaoyilan($("#org").val());//
		$("#dczb").show();
		$("#jituanzhibiao").hide();	
	}
	
}


/**
 * 专业改变
 */
function changeSpec() {
	jiandubaobiao();//监督报表
	jianduzhixing();//监督执行
	baojing(0);     //报警信息
	zongjie(0);//监督/计划
	yujing();//预警通知单
	getMission(userID);  //工作提醒
	getWorksDate(userID);//监督工作
	JTyujing();
}
function zhibiaoyilan(orgid){
	
	var url= ctx+"/portal/getIndex.do?orgid="+orgid+"&position=2"
	$.ajax({
		url:url,
		type:'GET',
		success:function(data){
			 var ev=eval("("+data+")");
			 var spanHtml="";
			 //console.log(data);
			 if(ev.length!=0){
				 var a=0;
				  var Bar="";
				  var yearCount = ev[3].VALUEDATE;				
			  	   if(ev[2].VALUEDATE==0){
			  		 ev[4].VALUEDATE=0;
			  	   }else{
			  		  ev[4].VALUEDATE=ev[3].VALUEDATE/ev[2].VALUEDATE*100;
			  	   }
			  	  
				  for(var i=0;i<ev.length;i++){
					  a++;
					 
					  if(typeof(ev[i].VALUEDATE)!='undefined'){
					  	   if(typeof(ev[i].PI_CODE)!='undefined'){
					  		
					  	       Bar = "onclick=clickOpenWindow('"+ev[i].PI_CODE+"','"+ev[i].QUOTA_NAME+"','','','"+ev[i].METHOD+"','"+ev[i].POINTS+"') href='javascript:void(0)'";
					  	   }
					  	   
				           spanHtml+="<div class='td1'>"
									   +"<span class='tdn'>" +
									   		"<a style='text-align:left'"+Bar+" id='"+ev[i].PI_CODE+"'>"+ev[i].QUOTA_NAME+"</a>" +
									   	"</span>" +
									   	"<span class='tdn2' id='"+ev[i].QUOTA_NAME+"'>"+parseFloat(ev[i].VALUEDATE).toFixed(2)+ev[i].UNIT+"</span>"
								   +"</div>";
				          
				          	 $(zfh).html("<a onclick=OpenWindow('"+ev[1].PI_CODE+"','"+ev[1].QUOTA_NAME+"','','','"+ev[1].METHOD+"','"+ev[1].POINTS+"') href='javascript:void(0)' >"+parseFloat(ev[1].VALUEDATE).toFixed(2) + "MW"+"</a>").show();
							$(fhl).html("<a onclick=OpenWindow('"+ev[2].PI_CODE+"','"+ev[2].QUOTA_NAME+"','','','"+ev[2].METHOD+"','"+ev[2].POINTS+"') href='javascript:void(0)' >"+parseFloat(ev[2].VALUEDATE).toFixed(2) + "%"+"</a>").show();

						
				    }
					
				  }
				  document.getElementById("dczb").innerHTML=spanHtml;
				
			 }
		}
		
	})
	
}


function major_pulldown() {
	
	var jituan=$('#org').find("option:selected").text();
	var url = "";
	if(jituan ==='京能集团'){		
		url = ctx + "/portal/getQuotaList.do?orgid=" + $("#org").val();	
		$("#yibiaopan").show();
		$(".class_main1_main").hide();
	} else {
		url =  ctx + "/portal/getQuotaList.do?orgid=" + $("#org").val();
		$("#yibiaopan").hide();
		$(".class_main1_main").show();
	}			
	$.ajax({
		url : url,
		dataType : "json",
		success : function(data) {
		
		if (data && data.length > 0) {
				/* 圆环上数据 */			 // 保留一位小数！			
				//console.log(data)
				var circleClass = 'circle1';
						if(data.length == 1){							
							if(jituan == '京能集团'){
								$(".circle_data7").html(Number(data[0].ssfh).toFixed(1)).show();
								$("#circle_data21").hide();										
								
							}
							else{
								$(".circle_data7").html(Number(data[0].fhl).toFixed(1)+'%').show();
								$("#circle_data21").show();
								
							}
								$(".circle_data5").hide();
								$(".circle_data6").hide();
								$(".circle5").hide();
								$(".circle6").hide();
								$(".circle_data").each(function(i) {
									$(this).hide();
								});
								$('.circle1').hide();
								$('.circle7').html(data[0].jzm).show();
								$('.circle7').css({backgroundImage : getYxzt(data[0].yxzt)});														
						}else if (data.length == 2) {
							$(".circle_data5").html(Number(data[0].fhl).toFixed(1)+'%').show();
							$(".circle_data6").html(Number(data[1].fhl).toFixed(1)+'%').show();
							
							$('.circle5').html(data[0].jzm).show();
							$('.circle6').html(data[1].jzm).show();

							$("#circle_data21").show();
							$(".circle_data7").hide();
							$(".circle7").hide();
							$('.circle1').hide();
							$(".circle_data").each(function(i) {
								$(this).hide();
							});
							$('.circle5').css({backgroundImage : getYxzt(data[0].yxzt)});
							$('.circle6').css({backgroundImage : getYxzt(data[1].yxzt)});
						}else if(data.length == 4){
							$("#circle_data21").show();
							$(".circle_data5").hide();
							$(".circle_data6").hide();
							$(".circle_data7").hide();
							$(".circle5").hide();
							$(".circle6").hide();
							$(".circle7").hide();
							$(".circle_data").each(function(i) {
								$(this).html("<a title ="+(i+1)+"号机组负荷率  onclick=OpenWindow('"+data[i].fhl_pi+"','"+data[i].fhl_name+"','','','"+data[i].METHOD+"','"+data[i].POINTS+"') href='javascript:void(0)' >"+Number(data[i].fhl).toFixed(1)+'%'+"</a>").show();

							});
							circleClass = 'circle1';
							/* 圆环颜色 */
							/* 0.0 绿色 1.0红色 2.0 非停 3.0 黄色 */
							$('.circle1')
							.each(
									function(i) {
											$('.circle1').eq(i).css({backgroundImage : getYxzt(data[i].yxzt)});
											$('.circle1').eq(i).html(data[i].jzm).show();										
									})
						}
					} else {
						$(".circle_data").each(function(i) {
							$(this).html(''); // 保留一位小数！
						});
						$("#circle_data21").show();
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
//电厂里的backgurond的变换；
function getYxzt(yxzt){
	if (parseInt(yxzt) == 0) {
		return "url('"+ ctx+ "/newNavIndex/img/operate.png')";
	} else if (parseInt(yxzt) == 1) {
		return "url('"+ ctx+ "/newNavIndex/img/pause.png')";
	} else if (parseInt(yxzt) == 3) {
		return  "url('"+ ctx+ "/newNavIndex/img/pause.png')";
	}
	return '';
}


var unit_status = '0';

function changeBaojing(status){
	unit_status = status;
	baojing(unit_status);
	$("#rongqi2").css({display:"block"});
	$("#rongqi").css({display:"none"});
}

function yjtz_show(){
	$("#rongqi2").css({display:"none"});
	$("#rongqi").css({display:"block"});
	
}
//table3  指标排名  考核信息切换
function zhibiao_show(){
	$("#duibiao").show();
	$("#kaohe").hide();
	$("#wj_ckdb").show();
}
function kaohexinxi_show(){
	$("#duibiao").hide();
	$("#kaohe").show();
	$("#wj_ckdb").hide();
}
//table6 异常情况 预警通知单 切换
function ycqk_show(){
	$("#ycqk").show();
	$("#yujingtongzhidan").hide();
}
function bjtzd_show(){
	$("#ycqk").hide();
	$("#yujingtongzhidan").show();
}





/**
 *集团用户仪表盘tab1
 */
require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
    }
});

   require(
    [
        'echarts',
        'echarts/chart/gauge' // 使用仪表盘就加载bar模块，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('yibiaopan')); 
        
      option = {
tooltip : {
formatter: "{a} <br/>{b} : {c}%"
},
toolbox: {
show : false,
feature : {
    mark : {show: true},
    restore : {show: true},
    saveAsImage : {show: true}
}
},
series : [
{
    name:'',
    type:'gauge',
    splitNumber: 10,       // 分割段数，默认为5
    axisLine: {            // 坐标轴线
        lineStyle: {       // 属性lineStyle控制线条样式
            color: [[0.2, '#76BCA2'],[0.8, '#5D84A1'],[1, '#D50B17']], 
            width: 14
        }
    },
    axisTick: {            // 坐标轴小标记
        splitNumber: 10,   // 每份split细分多少段
        length :20,        // 属性length控制线长
        lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto'
        }
    },
    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: 'auto'
        }
    },
    splitLine: {           // 分隔线
        show: true,        // 默认显示，属性show控制显示与否
        length :14,         // 属性length控制线长
        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            color: 'auto'
        }
    },
    pointer : {
        width : 5
    },
    title : {
        show : true,
        offsetCenter: [0, '-40%'],       // x, y，单位px
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder'
        }
    },
    detail : {
        formatter:'{value}%',
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: 'auto',
            fontWeight: 'bolder'
        }
    },
    data:[{value:0, name: '实时负荷'}]
}
]
};
        myChart.setOption(option); 
    }
);


/**
 * 技改项目
 */
function project(){
	 var url = ctx + "/portal/getProject.do?pagenum=1&pagesize=2&ispage=true&orgid="+$("#org").val();
	    $.ajax({
	        url:url,
	        dataType:"json",
	        success: function (data) {
	        	//console.log(data);
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



//监督计划

function zongjie(type){
	//type：0 是计划、 1 是总结
	var url = ctx + "/portal/supervisionPlanOrSummaryPageData.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val()+ "&pagenum=1&pagesize=5&ispage=true&type="+type;
	ajax(url, "zongjieTable", ['S_P_CODE', 'S_P_NAME','CREATE_DATE']);
	/*ajax(url, "zongjieTable", ['S_P_CODE', 'S_P_NAME', 'EMP_NAME','CREATE_DATE']);*/
}


function yujing() {
	var url = ctx + "/portal/warningNoticeList.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val()+ "&pagenum=1&pagesize=6&ispage=true"
	ajax(url, "yujingTable", [ 'W_LEVEL', 'DESCRIPTION', 'W_DATE','AUDIT_STATUS' ]);
	
}
function JTyujing(){
	
	var url = ctx + "/portal/warningNoticeList.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val()+ "&pagenum=1&pagesize=6&ispage=true";
	
	ajax(url, "yjtzd",['W_DATE','DESCRIPTION','R','ORG_SHORT_NAME','SPEC_NAME']);
}





function jiandubaobiao(){
	var url = ctx + "/portal/supervisionReportPageData.do?orgid=" + $("#org").val()+ "&specid=" + $("#spec").val() + "&pagenum=1&pagesize=6&ispage=true";
//	'GENERAL_ID',
	ajax(url, "jianduTable", [ 'GENERAL_CODE','GENERAL_NAME','CREATE_DATE' ]);
}

//jianduzhixing 
function jianduzhixing(){
	
	var url = ctx + "/portal/supervisionImplementationList.do?orgid=" + $("#org").val()+ "&specid=" + $("#spec").val() + "&pagenum=1&pagesize=6&ispage=true";
	ajax(url, "jianduzhixingTable", [ 'MOM_CODE','MOM_TYPE','CREATE_DATE' ]);

}
//集团监督报表

function JTjiandubaobiao() {
	var url = ctx + "/portal/supervisionReportPageData.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val() + "&pagenum=1&pagesize=6&ispage=true";
	ajax(url, "JTjianduTable", ['GENERAL_CODE', 'GENERAL_NAME', 'SPEC_NAME', 'ORG_SHORT_NAME', 'CREATE_DATE']);

}

//报警；
function baojing(unit_status){
	//unit_status 0 运行 1 停机
	var url = ctx + "/portal/warningMessageList.do?orgid=" + $("#org").val() + "&pagenum=1&pagesize=5&ispage=true&unit_status="+unit_status;
	ajax(url, "baojingTable", ['T_P_NAME', 'W_LEVEL', 'W_VALUE','W_DATE','W_TIME']);
}




function ajax(url, tableId, columns) {
	$.ajax({
		url : url,
		dataType : "json",
		success : function(data) {
			var tableHtml = '';
			if(data!=="[]"&&data.pagedata){
				if(data.pagedata.length>0){
					tableHtml = prearData(data.pagedata, columns, tableId);
				}
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
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a title="+columnValue+" class='ellipsis' href='"+ctx+"/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+d.W_ID+"'>" + columnValue + "</a></td>");
			}
			if(table == "jianduzhixingTable"){
				htmlArray.push("<td class='ellipsis'><a title="+columnValue+" class='ellipsis' href='"+ctx+"/main?xwl=23YYEI1R9984&executeId="+d.MOM_ID+"'>" + columnValue + "</a></td>");
			}
		
			if(table == "zongjieTable"){
				
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a title="+columnValue+" href='"+ctx+"/main?xwl=23YYRPL8YUSW&ORG_ID="+localStorage.getItem("orgid")+"&IS_SUMMARIZE="+d.IS_SUMMARIZE+"&S_P_TYPE="+d.S_P_TYPE+"&S_P_ID="+d.S_P_ID+"'>" + columnValue + "</a></td>");
			/*htmlArray.push("<td class='ellipsis' style=\""+color+"\">" + columnValue + "</td>");*/
			}
			if(table == "jianduTable"){
			var ctx1 = "http://10.44.1.160:7002";
					
					htmlArray.push("<td class='ellipsis' style=\"" + color + "\"><a title=" + columnValue + " href=" + ctx1 + "/spreadsheet/vision/openresource.jsp?paramsInfo=\[\{\"name\":\"general_id\",\"value\"=" + d.GENERAL_ID + "\}\]&resid=" + d.SMARTBI + "&user=admin&password=manager&refresh=true'>" + columnValue + "</a></td>");
					/*htmlArray.push("<td class='ellipsis' style=\""+color+"\">" + columnValue + "</td>");*/
				/*htmlArray.push("<td class='ellipsis' style=\""+color+"\">" + columnValue + "</td>");*/
			}
			if(table == "yujingTable"){
				
				/*htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a href='http://10.10.10.32:7001/jsjd/main?xwl=23WPD5TO7GWR&showAddWindow=Y&ID="+data.W_ID+"'>" + columnValue + "</a></td>");*/
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a title="+columnValue+" href='"+ctx+"/main?xwl=23WPD5TO7GWT&fromPage=y'>" + columnValue + "</a></td>");
			}
			if (table == "JTjianduTable") {

				var ctx1 = "http://10.44.1.160:7002";
				htmlArray.push("<td class='ellipsis' style=\"" + color + "\"><a title=" + columnValue + " href=" + ctx1 + "/spreadsheet/vision/openresource.jsp?paramsInfo=\[\{\"name\":\"general_id\",\"value\"=" + d.GENERAL_ID + "\}\]&resid=" + d.SMARTBI + "&user=admin&password=manager&refresh=true'>" + columnValue + "</a></td>");

			}
			if(table=="yjtzd"){
				htmlArray.push("<td class='ellipsis' style=\""+color+"\"><a title="+columnValue+" href='"+ctx+"/main?xwl=23WPD5TO7GWT&fromPage=y'>" + columnValue + "</a></td>");
				console.log(htmlArray);
			}

			
		
			
		}
		
		htmlArray.push("</tr>");
	}
	return htmlArray.join('');
}


function getColumnValue(table, column, columnValue) {
	if(columnValue == undefined)
		return '';
	if (table == 'yujingTable'||table=='yjtzd') {
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
		}else if(column=='R'){
			if (columnValue == 0) {
				columnValue = "一般预警";
			} else if (columnValue == 1||columnValue == 2) {
				columnValue = "严重预警";
			}
		}

	}else if(table == "jianduTable"||table == "JTjianduTable"){
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
	var myCharts = echarts.init(document
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

			name : "",
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
	myCharts.setOption(option);

}
//切换table下两个不同内容~~
$(".title").on("click",function(){
	$(this).addClass('title_active').siblings().removeClass("title_active");
	var baojinggenduo=document.getElementsByClassName('baojinggenduo')[0];
	var shengchangenduo=document.getElementsByClassName('shengchangenduo')[0];
	//var a=that.getElementsBYTagName('a')[0];
	//console.log($(this).find('a').html())
	var baojinggengduo=$('.baojingengduo').get(0);
	if($(this).find('a').html()=='运行机组报警' || $(this).find('a').html()=="停机机组报警"){
		//console.log('aaa')
		baojinggenduo.href=ctx+"/jsjd/main?xwl=23WPD5TO7GWR"
	}
	if($(this).find('a').html()=='预警通知单'){
		baojinggenduo.href=ctx+"/main?xwl=23WPD5TO7GWT"
	}
	if($(this).find('a').html()=='监督报表'){
		shengchangenduo.href="smartBI.html"
	}
	if($(this).find('a').html()=='生产报表'){
		shengchangenduo.href="smartBI.html"
	}
		if($(this).find('a').html()=='设备轮换'){
		shengchangenduo.href=ctx+"/newNavIndex/shebeilunhuan/qchuizong.html"
	}
});

$(document).ready(
function(){

//设备轮换更多链接
$("#wj_sb").click(
 	function(){
 		$("#dq_more").attr("href"  , ctx+"/newNavIndex/shebeilunhuan/qchuizong.html")
        $("#wj_qiehuan").html("<thead><tr><td>轮换项目</td><td>曲线</td><td>时间</td></tr></thead><tbody></tbody>")

 	}

	)
//集团设备轮换更多链接
$("#wj_jt_sb").click(
 	function(){
 		$("#wj_jt_more").attr("href"  , ctx+"/newNavIndex/jtshebeilunhuan/jthuizong.html")

 	}

	)



//定期实验更多链接
$("#wj_dq").click(
 	function(){
 		$("#dq_more").attr("href"  , ctx+"/newNavIndex/dingqishiyan/qchuizong.html")
		$("#wj_qiehuan").html("<thead><tr><td>机组</td><td>试验名称</td><td>曲线</td><td>时间</td></tr></thead><tbody></tbody>")
 	}

	)


//集团定期实验更多链接
$("#wj_jt_dq").click(
 	function(){
 		$("#wj_jt_more").attr("href"  , ctx+"/newNavIndex/jtdingqishiyan/jthuizong.html")
 	}

	)

//机组暂停更多链接
$("#wj_jz").click(
 	function(){
 		$("#dq_more").attr("href"  , "#")
$("#wj_qiehuan").html("<thead><tr><td>机组</td><td>状态</td><td>曲线</td><td>时间</td></tr></thead><tbody></tbody>")
 	}

	)
	


//异常情况更多链接
$("#wj_yc").click(
 	function(){

 		$("#yc_more").attr("href"  , ctx+"/newNavIndex/yichangqingkuang/qchuizong.html")

 	}

	)

//集团异常情况更多链接
$("#wj_jt_yc").click(
 	function(){

 		$("#wj_yc_more").attr("href"  , ctx+"/newNavIndex/jtyichangqingkuang/jthuizong.html")

 	}

	)

//预警通知单更多链接

$("#wj_yj").click(
 	function(){
 		$("#yc_more").attr("href"  , ctx+"/main?xwl=23WPD5TO7GWT")

 	}

	)

//集团预警通知单更多链接

$("#wj_jt_yj").click(
 	function(){
 		$("#wj_yc_more").attr("href"  , ctx+"/main?xwl=23WPD5TO7GWT")

 	}

	)


}


	)



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

/*单位加颜色*/
function reg(data){
	var reg1= /[a-zA-Z\.]/g;
	var reg2= /[^a-zA-Z\.]/g;
	var data1=data.match(reg);
	var data2=data.match(reg2);
	return  {
		data1:data1,
		data2:data2,
	}

}

//table2 重要参数。。。  //这个地方需要加个另外参数

/*function getTargetDate(position,orgId){
	
	$.ajax({
		  url:ctx+"/targetDate.do?method=getIndex",
		  type:"POST",
		 
		  contentType:"application/x-www-form-urlencoded; charset=utf-8",
		  //dataType:"json",
		  data:{position:position,orgId:orgId},
		  success: function(data){
			  //console.log(data);
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
						  		   
						  		var yuan=parseFloat(ev[i].V	ALUEDATE).toFixed(2)+ev[i].UNIT;
						  		var reg1= /[a-zA-Z]/g;
						  		var reg2= /[^a-zA-Z]/g;
						  		
						  		var arr1=yuan.match(reg1);
						  		var arr2=yuan.match(reg2);
						  		if(arr1!=null&&arr2!=null){
						  			var data1=arr1.join('');
						  			var data2=arr2.join('')
						  		}
						  		//console.log(data2)
								//console.log(ev);
						  	       Bar = "onclick=clickOpenWindow('"+ev[i].PI_CODE+"','"+ev[i].QUOTA_NAME+"','','','"+ev[i].METHOD+"','"+ev[i].POINTS+"') href='javascript:void(0)'";
						  	   }
					           spanHtml+="<div class='td1'>"
										   +"<span class='tdn'>" +
										   		"<a style='text-align:left'"+Bar+" id='"+ev[i].PI_CODE+"'>"+ev[i].QUOTA_NAME+"</a>" +
										   	"</span>" +
										   	"<span class='tdn2' id='"+ev[i].QUOTA_NAME+"'>"+parseFloat(ev[i].VALUEDATE).toFixed(2)+ev[i].UNIT+"</span>"
									   +"</div>";
					          
					           $(zfh).html("<a onclick=OpenWindow('"+ev[1].PI_CODE+"','"+ev[1].QUOTA_NAME+"','','','"+ev[1].METHOD+"','"+ev[1].POINTS+"') href='javascript:void(0)' >"+parseFloat(ev[1].VALUEDATE).toFixed(2) + "MW"+"</a>").show();
								$(fhl).html("<a onclick=OpenWindow('"+ev[2].PI_CODE+"','"+ev[2].QUOTA_NAME+"','','','"+ev[2].METHOD+"','"+ev[2].POINTS+"') href='javascript:void(0)' >"+parseFloat(ev[2].VALUEDATE).toFixed(2) + "%"+"</a>").show();

							 // spanZfh = parseFloat(ev[1].VALUEDATE).toFixed(2) + "MW";
								//spanFhl = parseFloat(ev[3].VALUEDATE).toFixed(2) + "%";
					    }
						
					  }
					  document.getElementById("dczb").innerHTML=spanHtml;
					 // document.getElementById("zfh").innerHTML=spanZfh;
					  //document.getElementById("fhl").innerHTML=spanFhl;

					 // getGenerating(userId);
				  }
			  }
		  },
		  error: function (data) {
      }
	})

}*/

//工作提醒

function getMission(userID){
	//获取参数
	$.ajax({  
			
			  url:ctx+"/mainDate.do?method=getMission",
			  type:"POST",
			
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
				  document.getElementById("mission").innerHTML="<table style='margin:-12px auto;width:96%;'>"+spanHtml+"</table>";
			 }
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
				 // document.getElementById("works").innerHTML="<table style=' border-top: none;border-left: none;border-right: none;float: left;'>"+spanHtml+"</table>";
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
		 
		  contentType:"application/x-www-form-urlencoded; charset=utf-8",
		  data:{ID:ID,status:type},
		  success: function(data){
			  getMission(userID);
			  
		  },
		  error: function (data) {
      }
})
}
//集团用户看到的重要参数  table2
function getTargetDateValues(){
	//获取参数
	$.ajax({
			  url:ctx+"/XipSssjAction.do?method=getIndexModuleThreeData",
			  type:"POST",
			  
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  //dataType:"json",
			  success: function(data){
				  			
				  		$(".jituanzhibiao1").html(function(n){
				  			return data[n];
				  		})
				  						 
			  },
			  error: function (data) {
	            //alert(data.msg);
	        }
	})

}





























//删除单条折线
function deleteDiv(id){
	$(".info"+id).remove();
	var picodes = $("#selectPicode").val();
	var pinames = $("#selectPiname").val();
	var methodss = $("#method").val();
	//alert(methodss);
	var pointss = $("#points").val();
	picodes = picodes.substr(0,picodes.length);
	pinames = pinames.substr(0,pinames.length);
	methodss = methodss.substr(0,methodss.length);
	points = pointss.substr(0,pointss.length);
	var codes  = picodes.split(",");
	var names  = pinames.split(",");
	var method = methodss.split(",");
	var point = pointss.split(",");
	var new_code = "";
	var new_name = "";
	var new_method = "";
	var new_point ="";
	for(var i = 0;i<codes.length;i++){
		if(i != id){
			new_code = new_code + codes[i] + ",";   
			new_name = new_name + names[i] + ",";
			new_method = new_method + method[i]+",";
			new_point = new_point + point[i]+",";
		}
	}
	if(new_code == ""){
		closeDiv();
	}else{
		$("#selectPicode").val(new_code.substr(0,new_code.length-1));
		$("#selectPiname").val(new_name.substr(0,new_name.length-1));
		$("#method").val(new_method.substr(0,new_name.length-1));
		$("#points").val(new_point.substr(0,new_name.length-1));
		var name = $("#selectPiname").val();
		var code = $("#selectPicode").val();
		var methods = $("#method").val();
		var points =$("#points").val();
		var nowDate = new Date();
		createOption(nowDate);
		myChart.clear();
		myChart.setOption(option);
	}
}
//点击生成折线
function clickOpenWindow(code,name,time_before,time_after,methods,points){ 
	//获取选择的对比数据  放入到input保存
	//alert(time_before);
	var picodes = $("#selectPicode").val();
	var piname = $("#selectPiname").val();
	var method =$("#method").val();
	var point =$("#points").val();
	var temp = picodes.split(",");
	var tempName = piname.split(",");
	var tempMethod = method.split(",");
	var tempPoint = point.split(","); 
	$('#pointsInfo').empty();
	//$('#methods').empty();
	if(temp.length==10){
		alert("最多显示10条数据");
	}else{
		//alert("selectPicode__click" + $("#selectPicode").val());
		//	alert(picodes);
		//picodes = picodes.substr(0,picodes.length-1);
		//判断是否有重复的  有重复的 不需要添加
		var flag = false;
		for(var i=0;i<temp.length;i++){
			if(temp[i] == code){
				flag = true;
				alert("以包含此数据");
			}
		}
		if(flag==false){
			if(picodes == ""){
				picodes = picodes + code;
				piname = piname +　name;
				method = method + methods;
				point = point +points;
			}else{
				picodes = picodes + "," + code;
				piname = piname +","+　name;
				method = method+","+methods;
				point = point+","+points;
			}
			var iWidth=800; //弹出窗口的宽度;
		    var iHeight=400; //弹出窗口的高度;
			var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
		    var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
			$("#selectPicode").val(picodes);
			$("#selectPiname").val(piname);
			$("#method").val(method);
			$("#points").val(point);
			var nowDate = new Date();
		    if(time_before == ''){
		       //window.open(_contextPath+'/tab/indexLine.jsp?pi_code='+code ,'折线图',"height="+iHeight+",width="+iWidth+",scrollbars=false,top="+iTop+", left="+iLeft);
		    	createOption(nowDate);
		    	myChart.clear();
		    	myChart.setOption(option);
		    	$("#lineDiv").show();
		    }else{
				//window.open(_contextPath+'/tab/warnInfoLine.jsp?pi_code='+code+'&time_before='+time_before+"&time_after="+time_after,'折线图',"height="+iHeight+",width="+iWidth+",scrollbars=false,top="+iTop+", left="+iLeft);
		    	createOption(nowDate);
		    	myChart.clear();
		    	myChart.setOption(option);
		    	$("#lineDiv").show();
		    }
		}
	}
	var codes = picodes.split(",");
	var names = piname.split(",");
	var m = method.split(",");
	var p = point.split(",");
	//在生成前 先清空
	for(var i = 0;i<codes.length;i++){
		if(codes[i] != ""){
			var $div = $("<div class='info"+i+"' style='height:20px;color:#58595B;font-size:14px;'>"+"<span>"+names[i]+"的计算方法:"+m[i]+"，涉及测点"+p[i]+"<button style='background:#6DB1E0;border:none;width:40px;margin-left:10px;cursor:pointer;border-radius:5px;' id='delete"+i+"' onclick='deleteDiv("+i+")'>删</button></span></div>")
			$("#pointsInfo").append($div);
			
		}
	}
}
//关闭折线图
function closeDiv(){
	$("#selectPicode").val("");
	$("#selectPiname").val("");
	$("#method").val("");
	$("#points").val("");
	myChart.clear();
	$("#lineDiv").hide();
}

function OpenWindow(code,name,time_before,time_after,methods,points){ 
	//获取选择的对比数据  放入到input保存
	//alert(time_before);
	var picodes = $("#selectPicode").val();
	var piname = $("#selectPiname").val();
	var method =$("#method").val();
	var point =$("#points").val();
	var temp = picodes.split(",");
	var tempName = piname.split(",");
	var tempMethod = method.split(",");
	var tempPoint = point.split(","); 
	$('#pointsInfo').empty();
	//$('#methods').empty();
	if(temp==""){
		if(picodes == ""){
			picodes = picodes + code;
			piname = piname +　name;
			method = method + methods;
			point = point +points;
		}else{
			picodes = picodes + "," + code;
			piname = piname +","+　name;
			method = method+","+methods;
			point = point+","+points;
		}
		var iWidth=800; //弹出窗口的宽度;
	    var iHeight=400; //弹出窗口的高度;
		var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	    var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
		$("#selectPicode").val(picodes);
		$("#selectPiname").val(piname);
		$("#method").val(method);
		$("#points").val(point);
		var nowDate = new Date();
	    if(time_before == ''){
	       //window.open(_contextPath+'/tab/indexLine.jsp?pi_code='+code ,'折线图',"height="+iHeight+",width="+iWidth+",scrollbars=false,top="+iTop+", left="+iLeft);
	    	createOption(nowDate);
	    	myChart.clear();
	    	myChart.setOption(option);
	    	$("#lineDiv").show();
	    }else{
			//window.open(_contextPath+'/tab/warnInfoLine.jsp?pi_code='+code+'&time_before='+time_before+"&time_after="+time_after,'折线图',"height="+iHeight+",width="+iWidth+",scrollbars=false,top="+iTop+", left="+iLeft);
	    	createOption(nowDate);
	    	myChart.clear();
	    	myChart.setOption(option);
	    	$("#lineDiv").show();
	    }
		var codes = picodes.split(",");
		var names = piname.split(",");
		var m = method.split(",");
		var p = point.split(",");
		//在生成前 先清空
		for(var i = 0;i<codes.length;i++){
			if(codes[i] != ""){
				var $div = $("<div class='info"+i+"' style='height:20px;color:#58595B;font-size:14px;'>"+"<span>"+names[i]+"的计算方法:"+m[i]+"，涉及测点"+p[i]+"<button style='background:#6DB1E0;border:none;width:40px;margin-left:10px;cursor:pointer;border-radius:5px;' id='delete"+i+"' onclick='deleteDiv("+i+")'>删</button></span></div>")
				$("#pointsInfo").append($div);
				
			}
		}
		
	}else{
		alert("最多显示10条数据");	
}
}


/**
 * Created by lswpc on 2016-01-14.
 */
$('b').click(function () {
    $(this).addClass('title_active1').siblings().removeClass('title_active1');
});
$(".jituan_wrap").each(function(i){
    if(i==0||i==1||i==4||i==5){
        $(this).css({background:"#f1f1f1"})
    }

});
/**/
$("#dczb>.fl").each(function (i) {
    if(i==0||i==1||i==4||i==5||i==8||i==9||i==13||i==14){
        $(this).css({background:"#f1f1f1"})
    }
});
//tab5
function jiandubaobiao_show(){
    $('.shengchanbaobiao_view').css({
   		display:"none"
    });
    $('.jiandubaobiao_view').show();
}

function shengchanbaobiao_show(){
    $('.shengchanbaobiao_view').css({display:"table"})
    $('.jiandubaobiao_view').css({display:"none"})
    $('.dianchang_view').find('a').css({backgrond:"#fff"});
    $('.dianchang_view').find("td").css({backgrond:'#fff'});
}

//查看奖励对标兑现表href
function dizhi() {
	var url2 = ctx + '/portal/getDuibiao.do';
	$.ajax({
		type: "get",
		url: url2,		
		success: function(data) {

			var duibiao = document.getElementById('duibiaodizhi');
			duibiao.href = "http://10.44.1.160:7002/spreadsheet/vision/openresource.jsp?paramsInfo=[{%27name%27:%27general_id%27,%27value%27:" + data + "}] &resid=I4028e4f35e08f9ee01525e1605eb0128&user=admin&password=manager&refresh=true%22";

		}
	});
}
dizhi()