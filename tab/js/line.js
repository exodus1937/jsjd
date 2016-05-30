//点击页数查询数据
function getPageNoList(a){
	compareInfo();
	selectData();
	var pageNo = a.innerHTML;
	pageNum = pageNo;
	var name = $("input[name='name']").val();
    var xitong = $("input[name='xitong']").val();
	$.ajax({
		url : "XipSssjAction.do",
		data:{
			method:"getMyAttentionByParam",
			pageNo:pageNo,
			name:name,
			xitong:xitong
		},
		type : "post",
		async : false, //同步执行
		dateType : "json",
		success : function(data) {
			$("#myAttention").val(JSON.stringify(data.lists));
			//alert($("#myAttention").val());   
			showMyAttention();
			$("#pageNum").val(pageNum);
			viewSelected();
			currentPageSelect();
		},
		error:function(){
			alert("我的关注获取失败！");
		}
	})
	return false;
}
//查询上一页
function getPrelist(pageNum){
	compareInfo();
	selectData();
	var pageNum = parseInt(pageNum);
	pageNum = pageNum - 1;
	var name = $("input[name='name']").val();
    var xitong = $("input[name='xitong']").val();
	$.ajax({
		url : "XipSssjAction.do",
		data:{
			method:"getMyAttentionByParam",
			pageNo:pageNum,
			name:name,
			xitong:xitong
		},
		type : "post",
		async : false, //同步执行
		dateType : "json",
		success : function(data) {
			$("#myAttention").val(JSON.stringify(data.lists));
			//alert($("#myAttention").val());   
			showMyAttention();
			$("#pageNum").val(pageNum);
			viewSelected();
			currentPageSelect();
		},
		error:function(){
			alert("我的关注获取失败！");
		}
	})
	return false;
}
//查询下一页
function getNextlist(pageNum){
	compareInfo();
	selectData();
	var pageNum = parseInt(pageNum);
	pageNum = pageNum + 1;
	var name = $("input[name='name']").val();
    var xitong = $("input[name='xitong']").val();
	$.ajax({
		url : "XipSssjAction.do",
		data:{
			method:"getMyAttentionByParam",
			pageNo:pageNum,
			name:name,
			xitong:xitong
		},
		type : "post",
		async : false, //同步执行
		dateType : "json",
		success : function(data) {
			$("#myAttention").val(JSON.stringify(data.lists));
			//alert($("#myAttention").val());   
			showMyAttention();
			$("#pageNum").val(pageNum);
			viewSelected();
			currentPageSelect();
		},
		error:function(){
			alert("我的关注获取失败！");
		}
	})
	return false;
}
//显示我的关注信息
function showMyAttention(){
	var attention = $("#myAttention").val();
	var myAttentionJson = eval(attention);
	//清空数据
	for(var i=0;i<18;i++){
		$("#td_name_"+i).html("");
		$("#td_code_"+i).html("");
		if($("#td_checkbox_"+i)){
			$("#td_checkbox_"+i).children("input").remove();
		}
	}     
	for(var i=0;i<myAttentionJson.length;i++){
			$("#td_name_"+i).html(myAttentionJson[i].t_p_name);
			$("#td_code_"+i).html(myAttentionJson[i].t_p_code);
			$("#td_checkbox_"+i).html("<input id='myAttentionCheckBox' type='checkbox' /><input id='td_t_p_unit_"+i+"' type='hidden' value='"+myAttentionJson[i].t_p_unit+"'/><input id='td_id_"+i+"' type='hidden' value='"+myAttentionJson[i].p_i_id+"'/><input id='td_range_up_"+i+"' type='hidden' value='"+myAttentionJson[i].range_up+"'/><input id='td_range_down_"+i+"' type='hidden' value='"+myAttentionJson[i].range_down+"'/>");
	}
}


//记录已选择的我的关注的数据
function selectData(){
	var selectIds = $("#selectIds").val();
	var arrSelect;
	arrSelect = eval("["+selectIds+"]")
	if(selectIds != ""){
		selectIds = selectIds + ",";
	}
	$('input[type="checkbox"]:checked').each(function(){ 
		var parentId = $(this).parent().attr('id');
		index = parentId.substr(12,parentId.length);
		var id = $("#td_id_"+index).val();
		var isHave = false;
		if(arrSelect.length>0){
			for(var i=0;i<arrSelect.length;i++){
				if(arrSelect[i].id == id){
					isHave = true;
				}
			}
			if(!isHave){
//				var value = "{'t_p_unit':'"+$("#td_t_p_unit_"+index).val()+"','id':'"+$("#td_id_"+index).val()+"','name':'"+$("#td_name_"+index).text()+"','code':'"+$("#td_code_"+index).text()+"','range_up':'"+$("#td_range_up_"+index).val()+"','range_down':'"+$("#td_range_down_"+index).val()+"'}";
//				var value = '{"t_p_unit":"'+$("#td_t_p_unit_'+index).val()+'","id":"'+$("#td_id_"+index).val()+'","name":"'+$("#td_name_"+index).text()+'","code":"'+$('#td_code_'+index).text()+'","range_up":"'+$("#td_range_up_"+index).val()+'",'range_down':'"+$("#td_range_down_"+index).val()+"'}";
				var value = '{"t_p_unit":"'+$("#td_t_p_unit_"+index).val()+'","id":"'+$("#td_id_"+index).val()+'","name":"'+$("#td_name_"+index).text()+'","code":"'+$('#td_code_'+index).text()+'","range_up":"'+$("#td_range_up_"+index).val()+'","range_down":"'+$("#td_range_down_"+index).val()+'"}'
				selectIds = selectIds + value + ",";
			}
		}else{
			var value = '{"t_p_unit":"'+$("#td_t_p_unit_"+index).val()+'","id":"'+$("#td_id_"+index).val()+'","name":"'+$("#td_name_"+index).text()+'","code":"'+$('#td_code_'+index).text()+'","range_up":"'+$("#td_range_up_"+index).val()+'","range_down":"'+$("#td_range_down_"+index).val()+'"}'
			selectIds = selectIds + value + ",";
		}
	})
	selectIds = selectIds.substr(0,selectIds.length-1);
	$("#selectIds").val(selectIds);
}
//我的关注选中项的回显
function viewSelected(){
	var selectIds = $("#selectIds").val();
	var selectedJson = eval("["+selectIds+"]")
	for(var i=0;i<18;i++){
		var id = $("#td_id_"+i).val();
		for(var j=0;j<selectedJson.length;j++){
			if(id == selectedJson[j].id){
				$("#td_id_"+i).prev().prev().attr("checked",true);
			}
		}
	}
}
//记录当前页已选择的数据    
//值记录id,比较使用
function currentPageSelect(){
	var selectIds = "";
	$('input[type="checkbox"]:checked').each(function(){ 
		var parentId = $(this).parent().attr('id');
		index = parentId.substr(12,parentId.length);
		selectIds = selectIds + $("#td_id_"+index).val()+","
	})
	selectIds = selectIds.substr(0,selectIds.length-1);
	$("#currentPageSelected").val(selectIds);
}

//比较当前页选择完成后和记录的当前页的信息
//判断是否有取消的数据,如果有的话，在总的记录数据中删除取消的数据
function compareInfo(){
	var currentPageSelected = $("#currentPageSelected").val();
	var currentPageSelectedArr = currentPageSelected.split(",");
	var ids = "";
	$('input[type="checkbox"]:checked').each(function(){ 
		var parentId = $(this).parent().attr('id');
		index = parentId.substr(12,parentId.length);
		var id =  $("#td_id_"+index).val();
		ids = ids + id +",";
	})
	ids = ids.substr(0,ids.length-1);
	var idsArr = ids.split(",");
	var select2noSelectIds = "";
	//开始比较
	var has = false;
	for(var i=0;i<currentPageSelectedArr.length;i++){
		if(idsArr.indexOf(currentPageSelectedArr[i])==-1){
			select2noSelectIds = select2noSelectIds + currentPageSelectedArr[i] +",";
		}
	}
	select2noSelectIds = select2noSelectIds.substr(0,select2noSelectIds.length);
	var select2noSelectIdsArr = select2noSelectIds.split(",");
	//从总记录里删除已经取消的数据
	var allSelect = $("#selectIds").val();
	var deleteId = [];
	if(allSelect != ""){
		var allSelectJson = eval("["+allSelect+"]");
		for(var i=0;i<allSelectJson.length;i++){
			for(var j=0;j<select2noSelectIdsArr.length;j++){
				if(allSelectJson[i]["id"]==select2noSelectIdsArr[j]){
					deleteId.push(i);
				}
			}
		}
		//开始删除json中被取消的数据
		for(var i=0;i<deleteId.length;i++){
			allSelectJson.splice(deleteId[i],1);
		}
		allSelect = JSON.stringify(allSelectJson);
		allSelect = allSelect.substr(1,allSelect.length-2);
		$("#selectIds").val(allSelect);
	}
}