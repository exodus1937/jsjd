
//jituan  baojing
 var curWwwPath = window.document.location.href;  
 var pathName = window.document.location.pathname; 
 var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080  
 var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis  
 var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);  
 var rootPath = localhostPaht + projectName;



//集团通知公告；
function JTtzgg(){
	var url = ctx +"/mainDate.do?method=getJtDynamic"////getDynamic
	//console.log(ctx);
	$.ajax({
		url : url,
		type: 'POST',
		dataType : "json",
		success : function(data) {
			//console.log(data);
			var tdhtml =""
				if(data.length!=0){
					for(var i=0;i<data.length;i++){
						
						  tdhtml+="<tr>" +
					  		/*"<td><a href='javascript:void(0)' onclick='click_a('"++"')'> "+data[i].NAME+"<a></td>" +*/
					  		 "<td  class='ellipsis' style='text-align: left;'>" +
							"<a href='javascript:void(0)' onclick=parent.click_a('"+rootPath+"/main?xwl=23WPD5TO7KQ1&showAddWindow=Y&ID="+data[i].IDS+"')>"+data[i].NAME+"</a></td>"+
					  		"<td> "+data[i].ORGNAME+"</td>" +
					  		"<td>"+data[i].TIME+"</td>"
					  		"</tr>"
					}
					
					$("#JTtz").html(tdhtml);
				}
			
			
		}
	});
}

//集团table 7 异常情况和预警通知单切换;
function JTycqk_show(){
	$(".JTycqk").show();
	$(".JTyjtzd").hide();
	
}
function JTyjtzd_show(){
	$(".JTycqk").hide();
	$(".JTyjtzd").show();
}

//集团table 6 定期实验和设备轮换切换；
function JTdqsy_show(){
	$(".comb").show();
	$(".jt_jzqt").hide();
	$("#JTdqsy").show();
	$("#JTsblh").hide();
}
function JTsblh_show(){
	$(".comb").show();
	$(".jt_jzqt").hide();
	$("#JTdqsy").hide();
	$("#JTsblh").show();

}
function JTjzqt_show(){
	$(".comb").hide();
	$("#JTdqsy").hide();
	$("#JTsblh").hide();
	
	$(".jt_jzqt").show();
}
//集团 table 4考核汇总和对标管理
function JTkhhz_show(){
	$(".JTkhhz").show();
	$(".JTdbgl").hide();
}
function JTdbgl_show(){
	$(".JTkhhz").hide();
	$(".JTdbgl").show();
}

