
//jituan  baojing
 var curWwwPath = window.document.location.href;  
 var pathName = window.document.location.pathname; 
 var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080  
 var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis  
 var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);  
 var rootPath = localhostPaht + projectName;



//jituan  baojing
 var curWwwPath = window.document.location.href;  
 var pathName = window.document.location.pathname; 
 var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080  
 var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis  
 var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);  
 var rootPath = localhostPaht + projectName;

 (function($){
     $.fn.FontScroll = function(options){
         var d = {time: 3000,s: 'fontColor',num: 1}
         var o = $.extend(d,options);
         this.children('ul').addClass('line');
         var _con = $('.line').eq(0);
         var _conH = _con.height(); //滚动总高度
         var _conChildH = _con.children().eq(0).height();//一次滚动高度
         var _temp = _conChildH;  //临时变量
         var _time = d.time;  //滚动间隔
         var _s = d.s;  //滚动间隔


         _con.clone().insertAfter(_con);//初始化克隆

         //样式控制
         var num = d.num;
         var _p = this.find('li');
         var allNum = _p.length;

         _p.eq(num).addClass(_s);


         var timeID = setInterval(Up,_time);
         this.hover(function(){clearInterval(timeID)},function(){timeID = setInterval(Up,_time);});

         function Up(){
             _con.animate({marginTop: '-'+_conChildH});
             //样式控制
             _p.removeClass(_s);
             num += 1;
             _p.eq(num).addClass(_s);

             if(_conH == _conChildH){
                 _con.animate({marginTop: '-'+_conChildH},"normal",over);
             } else {
                 _conChildH += _temp;
             }
         }
         function over(){
             _con.attr("style",'margin-top:0');
             _conChildH = _temp;
             num = 1;
             _p.removeClass(_s);
             _p.eq(num).addClass(_s);
         }
     }
 })(jQuery);
 
 marquee();
function marquee(){
	var url = ctx+"/portal/getdmyFDL.do"
	$.ajax({
		url:url,
		dataType:"json",
		success:function(data){
			var d= data;
			
			//console.log(d[0].ORGNAME);
			//console.log(d[0]);
			var htmlc = "<ul>" +
            "<li><em>"+d[0].ORGNAME+"</em><em style='margin:0 10px 0 20px'>日发电量最高&nbsp;"+d[0].DAYVALUE+"万kWh</em><em style='margin:0 10px'>"+d[0].DAYDATE+"</em><em style='margin: 0 10px'>月发电量最高&nbsp;"+d[0].MONTHVALUE+"亿kWh</em><em style='margin:0 10px'>"+d[0].MONTHDATE+"</em></li>" +
            "<li><em>"+d[1].ORGNAME+"</em><em style='margin:0 10px 0 20px'>日发电量最高&nbsp;"+d[1].DAYVALUE+"万kWh</em><em style='margin:0 10px'>"+d[1].DAYDATE+"</em><em style='margin: 0 10px'>月发电量最高&nbsp;"+d[1].MONTHVALUE+"亿kWh</em><em style='margin:0 10px'>"+d[1].MONTHDATE+"</em></li>" +
            "</ul>"
            $("#FontScroll").html(htmlc);
			$('#FontScroll').FontScroll({time: 5000,num: 1});
		}
	})
}

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
					  		
					  		 "<td  class='ellipsis' style='text-align: left;'>" +
							"<a title='"+data[i].NAME+"' href='javascript:void(0)' onclick=parent.click_a('"+rootPath+"/main?xwl=23WPD5TO7KQ1&showAddWindow=Y&ID="+data[i].IDS+"')>"+data[i].NAME+"</a></td>"+
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
					  		
					  		 "<td  class='ellipsis' style='text-align: left;'>" +
							"<a title='"+data[i].NAME+"' href='javascript:void(0)' onclick=parent.click_a('"+rootPath+"/main?xwl=23WPD5TO7KQ1&showAddWindow=Y&ID="+data[i].IDS+"')>"+data[i].NAME+"</a></td>"+
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

