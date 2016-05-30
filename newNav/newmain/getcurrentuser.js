/**
 * 更新个人信息
 */
common.prototype.page.getcurrentuser.updateUser = function(){
	
	var cuLoginName	= $("#cloginName").val();
	var cuLoginPass		= $("#cloginPass").val();
	var cuName			=  $("#cname").val();
	var cuBirthday		= 	$("#cbirthday").val();
	var cuEmail			=	$("#cemail").val();
	var cuPhone			=  $("#cphone").val();
	var sysDepartment	=  $("#departid").val();
	var roleIds			=	$("#croleids").val();			//角色ID
	var postIdenIds		=	$("#cpostIdenIds").val();	//岗位标识ID
	var enteIds			=	$("#centeIds").val();		//所属企业ID
	var cuId				=  $("#cuserid").val();			//用户ID
	
	var cuType1 		= $("#cutype1").val();		//职员类型【1.电厂用户 2.集团公司用户 3.派出机构用户 4.靠性中心用户 999.系统管理员】
	var createDate1 = common.prototype.page.getcurrentuser.converStrToDate($("#createdate1").val());//创建该职员的时间【该字段不需更新】
	var softDesc1	= $("#softdesc1").val();	//数据的排序，倒序规则（数字越大越靠前）【该字段不需更新】
	var status1 		= $("#status1").val();		//数据状态  0 可用 1不可用【该字段不需更新】
			
	
	//alert("cuLoginName:"+cuLoginName+","+ "cuLoginPass:"+cuLoginPass+","+ "cuName:"+cuName+","+ "cuBirthday:"+cuBirthday+","+ "cuEmail:"+cuEmail+","+ "cuPhone:"+cuPhone+","+ "roleIds:"+roleIds+","+ "postIdenIds:"+postIdenIds+","+ "enteIds:"+enteIds+","+ "sysDepartment.dId:"+sysDepartment+","+ "cuId:"+cuId+"")
	
	//判断是否输入了新密码
	if ($("#cloginPass").val() == "") {
		alert("密码不允许为空！"); 
		return false; 
	}//if..end.
	else {
		//异步更新个人信息
		$.post("/YunHwaKKX/system/updateUser2", {
			cuLoginName:cuLoginName,
			cuLoginPass:cuLoginPass,
			cuName:cuName,
			cuBirthday:cuBirthday,
			cuEmail:cuEmail,
			cuPhone:cuPhone,
			roleIds:roleIds,
			postIdenIds:postIdenIds,
			enteIds:enteIds,
			"sysDepartment.departId":sysDepartment,
			cuId:cuId,
			cuType:cuType1,
			createDate:createDate1,
			softDesc:softDesc1,
			status:status1
		}, function(data) {
			if (typeof (data) == 'string') {/*执行返回的脚本*/ 	eval(data.stripHTML()); return; 	}
			if (data.FLAG == "SUCCESS") { 							alert("个人信息更新成功");  $("#myModal").modal("hide");  window.location.reload(); 	}
			if (data.FLAG == "FAILD") { 								alert(data.MESSAGE); 					}
		});//updateUser2....end
	
	}//else..end.
}


/**
 * 将字符串转换为日期型
 * 【字符串格式为 'yyyy-MM-dd hh:mi:ss' 】
 */
common.prototype.page.getcurrentuser.converStrToDate = function(str){
	var tempStrs = str.split(" ");
 	var dateStrs = tempStrs[0].split("-");
 	var year = parseInt(dateStrs[0], 10);
 	var month = parseInt(dateStrs[1], 10) - 1;
 	var day = parseInt(dateStrs[2], 10);
 	var date = new Date(year, month, day);
 	return date;
}

