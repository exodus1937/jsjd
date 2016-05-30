/**
 * 
 */
//获取本月有多少天
function getDays(mouth,year){
	//定义当月的天数；
	var days ;
	//当月份为二月时，根据闰年还是非闰年判断天数
	if(mouth == 2){
	        days= year % 4 == 0 ? 29 : 28;
	    }
	    else if(mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12){
	        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
	        days= 31;
	    }
	    else{
	        //其他月份，天数为：30.
	        days= 30;
	    }
	    //输出天数
	    //alert('当月天数为：'+days);
	    return days;
}

/**
 * 时间对象的格式化
 */
Date.prototype.format = function(format) {
	/*
	 * format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
function check(num){
	if(!num){
		return true;
	}
	var reg=/^[-1-9]\d*$|^0$/;   // 注意：故意限制了 0321 这种格式，如不需要，直接reg=/^\d+$/;
	if(reg.test(num)==true){
	    return true;
	}else{
	    return false;
	}
}

function vilidateRange(pointsValue){
	var points = eval(pointsValue);
	var new_points = "";
	for(var i=0;i<points.length;i++){
		var code = points[i].code;
		var range_up = points[i].range_up;  
		var range_down = points[i].range_down;
		var id = points[i].id;
		var org = points[i].org;
		var name = points[i].name;
		var t_p_unit = points[i].t_p_unit;
		if(range_up == "null" || range_up == ""){
			range_up = 10000;
		}
		if(range_down == "null" || range_down == ""){
			range_down = 0;
		}
		if(t_p_unit==null || t_p_unit =="t_p_unit"){
			t_p_unit = "";
		}
		new_points = new_points + "{'t_p_unit':'"+t_p_unit+"','id':'"+id+"','code':'"+code+"','name':'"+name+"','range_up':'"+range_up+"','range_down':'"+range_down+"'},";
	}
	new_points = "["+ new_points.substr(0,new_points.length-1)+"]";
	$("#pointsValue").val(new_points);
}
