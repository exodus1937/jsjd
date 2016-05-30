common.prototype.page.nd.load = function(){
	
	//加载电厂数据
	common.prototype.page.nd.getPowerGraph();
//	$('.struct_cell_text_1_1 li').poshytip({allowTipHover: true});
//	$('.data d').poshytip({allowTipHover: true});
}
/**
 * 装载数据
 */
common.prototype.page.nd.getPowerGraph=function(){
	
	$.post("/jsjd/graph.do?method=getPowerGraph",{}, function(data) {
		var obj = eval(data);
		
		$(".struct_cell_text_1").html("<strong><font size=4>宁东发电厂</font></strong>");   //一行数据
        $(".struct_cell_text_1_2").html("监督办公室<br>李彦军");   //一行数据
		if(obj.length==1){
			var list1=obj[0].glist;
			//var data_one="----------------------------\n"+"姓名:&nbsp&nbsp"+list1[0].emp_name+"\n电话:  "+list1[0].phone_no+"\n----------------------------\n";
			$(".struct_cell_text_1_1").html(list1[0].emp_name);   //一行数据
			
			var spec_ids_two="";
			for(var m1=0;m1<list1.length;m1++){
				spec_ids_two+=list1[m1].spec_id+",";
			}
			
			common.prototype.page.nd.loadEmpBySpec(spec_ids_two,list1[0].attribute20);
			//common.prototype.page.nd.drowLine(14);
		}
	});
}

common.prototype.page.nd.loadEmpBySpec=function(spec_ids,attribute20){

	$.ajax({
		url : "/jsjd/graph.do?method=loadEmpBySpecAll",
		async: false,
		type : "POST", 
		data: {spec_ids:spec_ids,attribute20:attribute20},
		success : function(data) {
			var obj = eval(data);
			common.prototype.page.nd.loadData(obj);	
			
		}
	});

}

common.prototype.page.nd.loadData=function(obj){
	
	var level2=obj[0];
	var level3=obj[1];
	
	var flist2=level2.flist;
	var flist3=level3.flist;
	
	var data = [];
	var data3 = [];
	
	var data_info = [];
    var data3_info = [];
	for(var x=0;x<flist2.length;x++){
		var info2=flist2[x];
		var info3=flist3[x];
		var glist2=info2.glist;	
		var glist3=info3.glist;
		
		var top="<strong><font size=2.7>"+glist2[0].spec_name+"</font></strong>";
		//var top=glist2[0].spec_name;
		var dataWrite2="";
		dataWrite2+=top;
		//var dataWrite2_info="----------------------------\n";
		var dataWrite2_info="";
		
		var dataWrite3="";
		dataWrite3+=top;
		//var dataWrite3_info="----------------------------\n";
		var dataWrite3_info="";
		
		for(var t=0;t<glist2.length;t++){
			
			var da2=glist2[t];					
			dataWrite2+="<br>"+da2.emp_name;	
			//dataWrite2_info+="姓名:&nbsp&nbsp"+da2.emp_name_info+"\n电话:  "+da2.phone_no+"\n----------------------------\n";
			dataWrite2_info+=da2.emp_name_info+","+da2.phone_no+","+da2.cred_name_values+";"
		}
		data.push(dataWrite2);
		//dataWrite2_info.fontcolor("blue");
		data_info.push(dataWrite2_info);
		
		
		for(var p=0;p<glist3.length;p++){	
			
			var da3=glist3[p];					
			dataWrite3+="<br>"+da3.emp_name;
			//dataWrite3_info+="姓名:&nbsp&nbsp"+da3.emp_name_info+"\n电话:  "+da3.phone_no+"\n----------------------------\n";
			dataWrite3_info+=da3.emp_name_info+","+da3.phone_no+","+da3.cred_name_values+";"
		}
		data3.push(dataWrite3);
		//dataWrite3_info.fontcolor("blue");
		data3_info.push(dataWrite3_info);
	}
	//alert(data)
	//alert(data3)
	var len = flist2.length;
	for(var i=0;i<len;i++){
		var cell_2 = $('<div class="struct_cell"> \
                <div class="struct_line">|</div>   \
                <div class="struct_cell_text"><div class="data"> <!--数据--></div></div>    \
                </div>');
            //$(".struct_cell_text", cell_2).html('<d title="'+data_info[i]+'" href="#">'+data[i]+'</d>');  //二行数据
			$(".data", cell_2).html('<d>'+data[i]+'</d><div class="show"><div class="showw"><table width="97%" border="1" cellspacing="0" style="margin:10px auto;"><tbody></tbody></table></div></div>');  //二行数据
			$("tbody", cell_2).html('<tr><td>姓名</td><td>电话</td><td>证书</td></tr>');  //二行数据
			var dist=data_info[i].split(';');
	        var le=dist.length;
	        for(var t=0;t<le-1;t++){
	        	var ss =dist[t].split(',');
	        	$("tbody",cell_2).append('<tr><td>'+ss[0]+'</td><td>'+ss[1]+'</td><td>'+ss[2]+'</td></tr>');  //二行数据
	        }
            $(".struct_row_2").append(cell_2);
        
            
            
          //第3行
            var cell_3 = $('<div class="struct_cell"> \
                <div class="struct_line">|</div>   \
                <div class="struct_cell_text"><div class="data"><!--数据--></div></div>    \
                </div>');
            //$(".struct_cell_text", cell_3).html('<d title="'+data3_info[i]+'" href="#">'+data3[i]+'</d>');  //三行数据
            $(".data", cell_3).html('<d>'+data3[i]+'</d><div class="show"><div class="showw"><table width="97%" border="1" cellspacing="0" style="margin:10px auto;"><tbody></tbody></table></div></div>');  //三行数据
            $("tbody", cell_3).html('<tr><td>姓名</td><td>电话</td><td>证书</td></tr>');  //三行数据
            var dist3=data3_info[i].split(';');
            var le3=dist3.length;
            for(var zc=0;zc<le3-1;zc++){
            	var ss3 =dist3[zc].split(',');
            	$("tbody",cell_3).append('<tr><td>'+ss3[0]+'</td><td>'+ss3[1]+'</td><td>'+ss3[2]+'</td></tr>');  //三行数据
            }
            $(".struct_row_3").append(cell_3);
	}
	var clear = $('<div class="clear"></div>');
    $(".struct_row_2").append(clear.clone());
    $(".struct_row_3").append(clear.clone());
    $(".struct_cell").css({
        "width": 100 / len + "%"
    });
    //调整横线长度
    var mar = $(".struct_row_2 .struct_line").eq(0).width()/2;  // 一二行之间的横线
    $(".struct_line_1").css({
        "margin-left": mar +"px",
        "margin-right": mar +"px"
    });
    mar = $(".struct_row_3 .struct_line").eq(0).width()/2;  //二三行之间的横线
    $(".struct_line_2").css({
        "margin-left": mar +"px",
        "margin-right": mar +"px"
    });
    //添加直线
    /*$(".struct_line").html('<svg style="width: 2px; height: 30px;">   \
        <line x1="0" y1="0" x2="0" y2="100%" style="stroke:rgb(0,0,0);stroke-width:2"/>   \
    </svg>');*/
    $(".struct_line").html('<img src="show/line.jpg" style="width: 2px; height: 30px;" />');
    //使同一行所有格子高度相等
    var cells = $(".struct_row_2 .struct_cell_text");
    var h = 0;
    cells.each(function(i) {
        var _h = this.offsetHeight + this.style.paddingTop + this.style.paddingTop;
        h = Math.max(_h * 1, h);
    });
    cells.css({
        "height": h + "px"
    });
    cells = $(".struct_row_3 .struct_cell_text");
    h = 0;
    cells.each(function(i) {
        var _h = this.offsetHeight + this.style.paddingTop + this.style.paddingTop;
        h = Math.max( _h * 1, h);
    });
    cells.css({
        "height": h + "px"
    });
	
}

/**
 * 画线
 */
common.prototype.page.nd.drowLine=function(len){

	var clear = $('<div class="clear"></div>');
    $(".struct_row_2").append(clear.clone());
    $(".struct_row_3").append(clear.clone());
    $(".struct_cell").css({
        "width": 100 / len + "%"
    });
    //调整横线长度
    var mar = $(".struct_row_2 .struct_line").eq(0).width()/2;  // 一二行之间的横线
    $(".struct_line_1").css({
        "margin-left": mar +"px",
        "margin-right": mar +"px"
    });
    mar = $(".struct_row_3 .struct_line").eq(0).width()/2;  //二三行之间的横线
    $(".struct_line_2").css({
        "margin-left": mar +"px",
        "margin-right": mar +"px"
    });
    //添加直线
    /*$(".struct_line").html('<svg style="width: 2px; height: 30px;">   \
        <line x1="0" y1="0" x2="0" y2="100%" style="stroke:rgb(0,0,0);stroke-width:2"/>   \
    </svg>');*/
    $(".struct_line").html('<img src="graph/show/line.jpg" style="width: 2px; height: 30px;" />');
    //使同一行所有格子高度相等
    var cells = $(".struct_row_2 .struct_cell_text");
    var h = 0;
    cells.each(function(i) {
        var _h = this.offsetHeight + this.style.paddingTop + this.style.paddingTop;
        h = Math.max(_h * 1, h);
    });
    cells.css({
        "height": h + "px"
    });
    cells = $(".struct_row_3 .struct_cell_text");
    h = 0;
    cells.each(function(i) {
        var _h = this.offsetHeight + this.style.paddingTop + this.style.paddingTop;
        h = Math.max( _h * 1, h);
    });
    cells.css({
        "height": h + "px"
    });
}