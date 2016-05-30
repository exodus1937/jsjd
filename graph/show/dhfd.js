common.prototype.page.dhfd.load = function(){
	
	//第一级加载
	common.prototype.page.dhfd.getFirst();
}
/**
 * 电厂加载第一级
 */
common.prototype.page.dhfd.getFirst = function(){
	$.post("/jsjd/graph.do?method=getPowerGraph",{}, function(data) {
		var obj = eval(data);
		var count=0;
		var zy=14;
		for(var i=0;i<obj.length;i++){
			var arr=obj[i];
			var glist=arr.glist;
			var name=glist[0].emp_name;
			if(count==0){
				$("#ry_two").html(name);
			}else{
				$("#ry_one").html(name);
			}
			count+=1;
			for(var t=0;t<glist.length;t++){
				var gp=glist[t];
				var spec_id=gp.spec_id;
				var spec_name=gp.spec_name;
				var attribute20=gp.attribute20;
				$("#zy_"+zy).html(spec_name);
				//加载二级数据
				common.prototype.page.dhfd.getTwo(spec_id,attribute20);
				zy-=1;
			}
			
		}
		
	});
}

common.prototype.page.dhfd.getTwo = function(spec_id,attribute20){
	$.post("/jsjd/graph.do?method=loadEmpBySpec",{spec_id:spec_id,attribute20:attribute20}, function(data) {
		var obj = eval(data);
		//alert(obj.length);
		//拆分obj列表用于填充角色转换下拉框
		
	});
}