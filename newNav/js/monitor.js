var monitor = setInterval(function(){
	$.ajax({
		url : "../newPage.do?method=monitor",
		//async: false,
		type : "POST", 
		//data: {menuId:menuId},
		success : function(data) {
			var obj = eval(data);
			$("#total").html("当前在线人数"+obj.total);
			$("#userCount").html("本人登录次数"+obj.userCount);
		}
	});
},1000*60*5);
