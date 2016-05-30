




function rootpath() {
	var url = $('<input id="url" type="hidden" value="">');
	$("body").prepend(url);
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPath = curWwwPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	var rootPath = localhostPath + projectName;
	document.getElementById("url").value = rootPath;
}
rootpath();
var rootPath = $('#url').val();
var data1={};

//alert(1);

$(".level1").show();
$(".level4").hide();
$(".wu_top").hide();
$("#table1_huizong").hide();
$("#Pagination").hide();
$(".wu_main").css({"marginTop":23});
$('#lh_name').html("岱海电厂");

function getTree() {

	var org_id = localStorage.getItem("orgid");
	if(org_id !== "a61365e2-969d-4352-b3f8-805027ab9f1d"){
		var url = rootPath　 + 　"/portal/getSYTreeMenu.do?orgid=" + org_id;	
		$.ajax({
			type: "GET",
			url: url,
			
			dataType:"JSON",
			success: function(data){		

				data1=data;
				//console.log(data1);
			},
			complete:function(msg){
				var setting = {
					callback: {
						onClick: zTreeOnClick
					}
				};
				$.fn.zTree.init($("#tree"), setting, data1);

				//默认展开机组；
				$("#tree_1_switch").click();
				//默认显示电厂的相关信息；
				$("#tree_1_span").click();
			}

			
		})
	}else{
		var url = rootPath + "/portal/getJTSYTreeMenu.do" ;
		$.ajax({
			type: "GET",
			url: url,
			
			dataType:"JSON",
			success: function(data){		

				data1=data;
			},
			complete:function(msg){
				var setting = {
					callback: {
						onClick: zTreeOnClick
					}
				};
				$.fn.zTree.init($("#tree"), setting, data1);

				//默认展开机组；
				$("#tree_1_switch").click();
				//默认显示电厂的相关信息；
				$("#tree_1_span").click();
			}

			
		})
	}
}
//data1=[{"children":[{"children":[{"children":[{"children":[],"id":"15","name":"#1轴加风机切换至#2轴加风机运行"},{"children":[],"id":"16","name":"#2轴加风机切换至#1轴加风机运行"},{"children":[],"id":"17","name":"#1氢侧交流油泵切换至#2氢侧交流油泵运行"},{"children":[],"id":"18","name":"#2氢侧交流油泵切换至#1氢侧交流油泵运行"},{"children":[],"id":"19","name":"#1氢冷闭式泵切换至#2氢冷闭式泵运行"},{"children":[],"id":"20","name":"#2氢冷闭式泵切换至#1氢冷闭式泵运行"},{"children":[],"id":"21","name":"#1氢冷开式泵切换至#2氢冷开式泵运行"},{"children":[],"id":"22","name":"#2氢冷开式泵切换至#1氢冷开式泵运行"},{"children":[],"id":"23","name":"#1润滑油冷却水泵切换至#2润滑油冷却水泵运行"},{"children":[],"id":"24","name":"#2润滑油冷却水泵切换至#1润滑油冷却水泵运行"},{"children":[],"id":"25","name":"#1EH油泵切换为#2EH油泵运行"},{"children":[],"id":"26","name":"#2EH油泵切换为#1EH油泵运行"},{"children":[],"id":"27","name":"#1定冷水泵切换为#2定冷水泵运行"},{"children":[],"id":"28","name":"#2定冷水泵切换为#1定冷水泵运行"},{"children":[],"id":"29","name":"#1闭式水泵切换至#2闭式水泵运行"},{"children":[],"id":"30","name":"#2闭式水泵切换至#1闭式水泵运行"},{"children":[],"id":"31","name":"#1小机#1交流润滑油泵切换至#2交流油泵运行"},{"children":[],"id":"32","name":"#1小机#2交流润滑油泵切换至#1交流油泵运行"},{"children":[],"id":"33","name":"#2小机#1交流润滑油泵切换至#2交流油泵运行"},{"children":[],"id":"34","name":"#2小机#2交流润滑油泵切换至#1交流油泵运行"},{"children":[],"id":"35","name":"#1循环水泵切换至#2循环水泵运行"},{"children":[],"id":"36","name":"#2循环水泵切换至#1循环水泵运行"},{"children":[],"id":"37","name":"主机#1排烟风机切换至#2排烟风机运行"},{"children":[],"id":"38","name":"主机#2排烟风机切换至#1排烟风机运行"},{"children":[],"id":"39","name":"#1密封油箱排烟风机切换至#2密封油箱排烟风机运行"},{"children":[],"id":"40","name":"#2密封油箱排烟风机切换至#1密封油箱排烟风机运行"}],"id":"6","name":"汽机专业"},{"children":[{"children":[],"id":"41","name":"#1引风机润滑油站#1油泵切换至#2油泵运行"},{"children":[],"id":"42","name":"#1引风机润滑油站#2油泵切换至#1油泵运行"},{"children":[],"id":"43","name":"#2引风机润滑油站#1油泵切换至#2油泵运行"},{"children":[],"id":"44","name":"#2引风机润滑油站#2油泵切换至#1油泵运行"},{"children":[],"id":"45","name":"#1引风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"46","name":"#1引风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"47","name":"#2引风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"48","name":"#2引风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"49","name":"#1送风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"50","name":"#1送风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"51","name":"#2送风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"52","name":"#2送风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"53","name":"#1一次风机润滑油站#1油泵切换至#2油泵运行"},{"children":[],"id":"54","name":"#1一次风机润滑油站#2油泵切换至#1油泵运行"},{"children":[],"id":"55","name":"#2一次风机润滑油站#1油泵切换至#2油泵运行"},{"children":[],"id":"56","name":"#2一次风机润滑油站#2油泵切换至#1油泵运行"},{"children":[],"id":"57","name":"#1一次风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"58","name":"#1一次风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"59","name":"#2一次风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"60","name":"#2一次风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"61","name":"#1引风机#1轴冷风机切换至#2轴冷风机"},{"children":[],"id":"62","name":"#1引风机#2轴冷风机切换至#1轴冷风机"},{"children":[],"id":"63","name":"#2引风机#1轴冷风机切换至#2轴冷风机"},{"children":[],"id":"64","name":"#2引风机#2轴冷风机切换至#1轴冷风机"},{"children":[],"id":"65","name":"#1火检风机切换至#2火检风机运行"},{"children":[],"id":"66","name":"#2火检风机切换至#1火检风机运行"},{"children":[],"id":"67","name":"#1密封风机切换至#2密封风机运行"},{"children":[],"id":"68","name":"#2密封风机切换至#1密封风机运行"},{"children":[],"id":"69","name":"SCR#1、#3稀释风机切换至#2、#3稀释风机运行"},{"children":[],"id":"70","name":"SCR#1、#2稀释风机切换至#2、#3稀释风机运行"},{"children":[],"id":"71","name":"SCR#2、#3稀释风机切换至#1、#3稀释风机运行"},{"children":[],"id":"72","name":"SCR#1、#2稀释风机切换至#1、#3稀释风机运行"},{"children":[],"id":"73","name":"SCR#2、#3稀释风机切换至#1、#2稀释风机运行"},{"children":[],"id":"74","name":"SCR#1、#3稀释风机切换至#1、#2稀释风机运行"}],"id":"7","name":"锅炉专业"},{"children":[{"children":[],"id":"75","name":"#1空压机切换至#2空压机运行"},{"children":[],"id":"76","name":"#1空压机切换至#3空压机运行"},{"children":[],"id":"77","name":"#1空压机切换至#4空压机运行"},{"children":[],"id":"78","name":"#2空压机切换至#1空压机运行"},{"children":[],"id":"79","name":"#2空压机切换至#3空压机运行"},{"children":[],"id":"80","name":"#2空压机切换至#4空压机运行"},{"children":[],"id":"81","name":"#3空压机切换至#1空压机运行"},{"children":[],"id":"82","name":"#3空压机切换至#2空压机运行"},{"children":[],"id":"83","name":"#3空压机切换至#4空压机运行"},{"children":[],"id":"84","name":"#4空压机切换至#1空压机运行"},{"children":[],"id":"85","name":"#4空压机切换至#2空压机运行"},{"children":[],"id":"86","name":"#4空压机切换至#3空压机运行"}],"id":"8","name":"公用系统专业"}],"id":"2","name":"#1机组"},{"children":[{"children":[{"children":[],"id":"87","name":"#1EH油泵切换为#2EH油泵运行"},{"children":[],"id":"88","name":"#2EH油泵切换为#1EH油泵运行"},{"children":[],"id":"89","name":"#1小机#1交流润滑油泵切换至#2交流油泵运行"},{"children":[],"id":"90","name":"#1小机#2交流润滑油泵切换至#1交流油泵运行"},{"children":[],"id":"91","name":"#1定冷水泵切换为#2定冷水泵运行"},{"children":[],"id":"92","name":"#2定冷水泵切换为#1定冷水泵运行"},{"children":[],"id":"93","name":"#1闭式水泵切换至#2闭式水泵运行"},{"children":[],"id":"94","name":"#2闭式水泵切换至#1闭式水泵运行"},{"children":[],"id":"95","name":"#2小机#1交流润滑油泵切换至#2交流油泵运行"},{"children":[],"id":"96","name":"#2小机#2交流润滑油泵切换至#1交流油泵运行"},{"children":[],"id":"97","name":"#1循环水泵切换至#2循环水泵运行"},{"children":[],"id":"98","name":"#2循环水泵切换至#1循环水泵运行"},{"children":[],"id":"99","name":"主机#1排烟风机切换至#2排烟风机运行"},{"children":[],"id":"100","name":"主机#2排烟风机切换至#1排烟风机运行"},{"children":[],"id":"101","name":"#1密封油箱排烟风机切换至#2密封油箱排烟风机运行"},{"children":[],"id":"102","name":"#2密封油箱排烟风机切换至#1密封油箱排烟风机运行"},{"children":[],"id":"103","name":"#1轴加风机切换至#2轴加风机运行"},{"children":[],"id":"104","name":"#2轴加风机切换至#1轴加风机运行"},{"children":[],"id":"105","name":"#1氢侧交流油泵切换至#2氢侧交流油泵运行"},{"children":[],"id":"106","name":"#2氢侧交流油泵切换至#1氢侧交流油泵运行"},{"children":[],"id":"107","name":"#1氢冷闭式泵切换至#2氢冷闭式泵运行"},{"children":[],"id":"108","name":"#2氢冷闭式泵切换至#1氢冷闭式泵运行"},{"children":[],"id":"109","name":"#1氢冷开式泵切换至#2氢冷开式泵运行"},{"children":[],"id":"110","name":"#2氢冷开式泵切换至#1氢冷开式泵运行"},{"children":[],"id":"111","name":"#1润滑油冷却水泵切换至#2润滑油冷却水泵运行"},{"children":[],"id":"112","name":"#2润滑油冷却水泵切换至#1润滑油冷却水泵运行"}],"id":"9","name":"汽机专业"},{"children":[{"children":[],"id":"113","name":"#1引风机润滑油站#1油泵切换至#2油泵运行"},{"children":[],"id":"114","name":"#1引风机润滑油站#2油泵切换至#1油泵运行"},{"children":[],"id":"115","name":"#2引风机润滑油站#1油泵切换至#2油泵运行"},{"children":[],"id":"116","name":"#2引风机润滑油站#2油泵切换至#1油泵运行"},{"children":[],"id":"117","name":"#1引风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"118","name":"#1引风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"119","name":"#2引风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"120","name":"#2引风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"121","name":"#1送风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"122","name":"#1送风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"123","name":"#2送风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"124","name":"#2送风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"125","name":"#1一次风机润滑油站#1油泵切换至#2油泵运行"},{"children":[],"id":"126","name":"#1一次风机润滑油站#2油泵切换至#1油泵运行"},{"children":[],"id":"127","name":"#2一次风机润滑油站#1油泵切换至#2油泵运行"},{"children":[],"id":"128","name":"#2一次风机润滑油站#2油泵切换至#1油泵运行"},{"children":[],"id":"129","name":"#1一次风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"130","name":"#1一次风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"131","name":"SCR#1、#3稀释风机切换至#2、#3稀释风机运行"},{"children":[],"id":"132","name":"SCR#1、#2稀释风机切换至#2、#3稀释风机运行"},{"children":[],"id":"133","name":"SCR#2、#3稀释风机切换至#1、#3稀释风机运行"},{"children":[],"id":"134","name":"SCR#1、#2稀释风机切换至#1、#3稀释风机运行"},{"children":[],"id":"135","name":"SCR#2、#3稀释风机切换至#1、#2稀释风机运行"},{"children":[],"id":"136","name":"SCR#1、#3稀释风机切换至#1、#2稀释风机运行"},{"children":[],"id":"137","name":"#2一次风机液压油站#1油泵切换至#2油泵运行"},{"children":[],"id":"138","name":"#2一次风机液压油站#2油泵切换至#1油泵运行"},{"children":[],"id":"139","name":"#1引风机#1轴冷风机切换至#2轴冷风机"},{"children":[],"id":"140","name":"#1引风机#2轴冷风机切换至#1轴冷风机"},{"children":[],"id":"141","name":"#2引风机#1轴冷风机切换至#2轴冷风机"},{"children":[],"id":"142","name":"#2引风机#2轴冷风机切换至#1轴冷风机"},{"children":[],"id":"143","name":"#1火检风机切换至#2火检风机运行"},{"children":[],"id":"144","name":"#2火检风机切换至#1火检风机运行"},{"children":[],"id":"145","name":"#1密封风机切换至#2密封风机运行"},{"children":[],"id":"146","name":"#2密封风机切换至#1密封风机运行"}],"id":"10","name":"锅炉专业"}],"id":"3","name":"#2机组"},{"children":[{"children":[{"children":[],"id":"147","name":"#1开式泵切换至#2开式泵运行"},{"children":[],"id":"148","name":"#2开式泵切换至#1开式泵运行"},{"children":[],"id":"149","name":"#1开式泵切换至#3开式泵运行"},{"children":[],"id":"150","name":"#3开式泵切换至#1开式泵运行"},{"children":[],"id":"151","name":"#2开式泵切换至#3开式泵运行"},{"children":[],"id":"152","name":"#3开式泵切换至#2开式泵运行"},{"children":[],"id":"153","name":"#1EH油泵切换为#2EH油泵运行"},{"children":[],"id":"154","name":"#2EH油泵切换为#1EH油泵运行"},{"children":[],"id":"155","name":"#1定冷水泵切换为#2定冷水泵运行"},{"children":[],"id":"156","name":"#2定冷水泵切换为#1定冷水泵运行"},{"children":[],"id":"157","name":"#1闭式水泵切换至#2闭式水泵运行"},{"children":[],"id":"158","name":"#2闭式水泵切换至#1闭式水泵运行"},{"children":[],"id":"159","name":"#1真空泵切换至#2真空泵运行"},{"children":[],"id":"160","name":"#2真空泵切换至#1真空泵运行"},{"children":[],"id":"161","name":"#1真空泵切换至#3真空泵运行"},{"children":[],"id":"162","name":"#3真空泵切换至#1真空泵运行"},{"children":[],"id":"163","name":"#2真空泵切换至#3真空泵运行"},{"children":[],"id":"164","name":"#3真空泵切换至#2真空泵运行"},{"children":[],"id":"165","name":"主机#1排烟风机切换至#2排烟风机运行"},{"children":[],"id":"166","name":"主机#2排烟风机切换至#1排烟风机运行"},{"children":[],"id":"167","name":"#1密封油箱排烟风机切换至#2密封油箱排烟风机运行"},{"children":[],"id":"168","name":"#2密封油箱排烟风机切换至#1密封油箱排烟风机运行"},{"children":[],"id":"169","name":"#1轴加风机切换至#2轴加风机运行"},{"children":[],"id":"170","name":"#2轴加风机切换至#1轴加风机运行"},{"children":[],"id":"171","name":"#1氢侧交流油泵切换至#2氢侧交流油泵运行"},{"children":[],"id":"172","name":"#2氢侧交流油泵切换至#1氢侧交流油泵运行"}],"id":"11","name":"汽机专业"},{"children":[{"children":[],"id":"173","name":"#1引风机油站#1油泵切换至#2油泵运行"},{"children":[],"id":"174","name":"#1引风机油站#2油泵切换至#1油泵运行"},{"children":[],"id":"175","name":"#2引风机油站#1油泵切换至#2油泵运行"},{"children":[],"id":"176","name":"#2引风机油站#2油泵切换至#1油泵运行"},{"children":[],"id":"177","name":"#1送风机液压油站#1油泵切换至#2油泵运行"}],"id":"12","name":"锅炉专业"}],"id":"4","name":"#3机组"},{"children":[{"children":[],"id":"13","name":"汽机专业"},{"children":[],"id":"14","name":"锅炉专业"}],"id":"5","name":"#4机组"}],"id":"1","name":"岱海发电"}];

/*$("#tree").ajaxComplete(function(){
	var setting = {
		callback: {
			onClick: zTreeOnClick
		}
	};
	$.fn.zTree.init($("#tree"), setting, data1);
})*/
getTree();


function zTreeOnClick(ev, treeId, treeNode) {
	
	var event = ev || window.event;
	var g_id = $(event.target).parent().parent().parent().siblings().parent().parent().siblings().text();
	var special_id = $(event.target).parent().parent().parent().siblings().text();
	var name = treeNode.name;
	switch (treeNode.level) {
		//电厂级别
		case 0:
			g_id = "";
			special_id = "";
			if(name == "岱海发电"){
				sessionStorage.setItem("orgid", "c21834b4-1cb0-490f-a2a8-deeaf7f7e065");	
			}else if(name == "宁东发电"){	
				sessionStorage.setItem("orgid", "472212af-1977-462b-a74a-a1f36ed6562d");
			}			
			name = "";
			//console.log(1);
			level1();
			break;
			//机组级别
		case 1:
			g_id = name.substring(1, 2);
			special_id = "";
			name = "";
			level1();
			break;
			//专业级别
		case 2:
			g_id = special_id.substring(1, 2);
			special_id = name;
			name = "";
			
			break;
			//试验名称级别
		case 3:
			g_id = g_id.substring(1, 2);
			//console.log('4')
			level4();
			break;
		default:
			g_id = "";
			special_id = "";
			name = "";
			break;
	}
	
//level1 && level2 are some interface;

	function level1(){

		$("table.level1").show();
		$("table.level4").hide();
		$(".wu_top").hide();
		$(".wu_top1").hide();
		$("#table1_huizong").hide();
		$("#Pagination").hide();
		$(".wu_main").css({"marginTop":23});
		$('#lh_name').html(treeNode.name);
		$("#wu_top1").hide();
		var url = rootPath + "/portal.do";
		$.ajax({
			url: url,
			type: "POST",
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: "json",
			data: {
				method:"getSYCountByOrgid",
				org_id: sessionStorage.getItem("orgid"),
				g_id: g_id,
				
			},
			success: function(data) {

				$("#level1").html(prepearDatalevel1(data));

			}

		})
	}

	function level4(){
		var flag=true;

		$("table.level1").hide();
		$(".wu_top").show();
		
		$("table.level4").show();
		$(".wu_top1").show();
		$("#table1_huizong").show();
		$("#Pagination").show();

		$(".wu_main").css({"marginTop":92});
		var initPagination = function(page) {
		   	var num_entries = page;
		  	// 创建分页
		  	$("#Pagination").pagination(num_entries, {
			    num_edge_entries: 1, //边缘页数
			    num_display_entries: 4, //主体页数
			    callback: pageselectCallback,
			    items_per_page: 1, //每页显示1项
			    prev_text: "前一页",
			    next_text: "后一页"
		  	});
		};

		

		function pageselectCallback(page_index, jq){
			
			expr(page_index + 1);
			
			
		  	return false;
		}

		name = encodeURIComponent(trim(name));
		var url = rootPath + "/portal.do?name=" + name;
		expr(1);
		//level4 轮换详情；
		function expr(pagenum){
			$.ajax({
				url: url,
				type: "POST",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: "json",
				data: {
					method: "getSYTime",
					org_id: sessionStorage.getItem("orgid"),
					g_id: g_id,
					special_id: special_id,
					year:'',
             		month:'',
					ispage:true,
					pagenum:pagenum,
					pagesize:5			
				},
				success: function(data) {
					$("#sblhcounter").html("");
					var page = Math.ceil(data.total/5)
					if(flag){
						initPagination(page);//分页加载
					}
					flag=false;
					
					$('#sblhcounter').html(prepearData(data.exper));//处理ajax返回的数据添加到html中
					//初始化弹窗的相对定位
					var line_width = ($(window).width() - 700) / 2 + "px";
					//var line_height=($(window).height()-365)/2+"px";
					var line_height = 100;
					$(".lineDiv").css({
						"left": line_width,
						"top": line_height
					});
					//改变窗口浏览器大小重置相对定位
					$(window).resize(function() {
						var line_width = ($(window).width() - 700) / 2 + "px";
						var line_height = ($(window).height() - 365) / 2 + "px";
						$(".lineDiv").css({
							"left": line_width,
							"top": line_height
						});
					});
					var d_flag= true;
					//弹窗淡入淡出
					$(".zhexian").on("click",

						function(event) {

							var i = $(this).parent().index() -1 ;
							//console.log($(this).parent().index());

							var dataT = $(this).find('.drsMoveHandle').get(0).id;
							var arr = dataT.split(";");
							var code = arr[0];
							var name = arr[1];
							var starttime = arr[2];
							var endtime = arr[3];
							
							if(d_flag){
								sbjiaohu("zx"+i,code,name,starttime,endtime);
								d_flag = false;
								
							}

							$(this).children(".lineDiv").fadeIn();
							var index = $(this).index();
							//zhexian($(this).find('.linecontent div').attr('id'))  
						}
					)
					//弹出层关闭按钮
					$(".drsMoveHandle span").bind("click",
						function(event) {
							$(this).parent().parent(".lineDiv").fadeOut();
							event.stopPropagation();
						}
					)

					function tiaozhuan() {
						var s = document.getElementById('fadeIn');
					}
				} 
			});
			
		}

		//level4 轮换信息；
		$.ajax({
			url: url,
			type: "POST",
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: "json",
			data: {
				method: "getSYCount",
				org_id: sessionStorage.getItem("orgid"),
				
				g_id: g_id,
				special_id: special_id
			},
			success: function(data) {

				var data_level4 = data.lhlist[0];
				//console.log(data_level4);
				//console.log(data_level4.length);
				var table1_huizong_td = $("#table1_huizong").find("td");
				var header_h3 = $('.wu_top1').find("h3");
				var lh_name = $('#lh_name');

				if (data.lhlist.length == 0) {
					table1_huizong_td.each(function(i) {
						if (i > 4) {
							$(this).html("暂时无数据");
						}

					});
					lh_name.html("");
					header_h3.each(function() {
						$(this).html("");
					});
					lh_name.html("本条记录无数据");
				}

				if (data.lhlist.length !== 0) {
					/*轮换说明*/
					header_h3.eq(0).html(data_level4.VALID_BASIC)
					header_h3.eq(1).html(data_level4.LH_METHOD);
					header_h3.eq(2).html(data_level4.SYSTEM_LOGIC);
					header_h3.eq(3).html(data_level4.START_BASIC);
					header_h3.eq(4).html(data_level4.END_BASIC)

					/*轮换的名称*/
					lh_name.html(treeNode.name);

					/*轮换的具体数据*/
					table1_huizong_td.eq(5).html(data_level4.YSCOUNT);
					table1_huizong_td.eq(6).html(data_level4.YCOUNT);
					table1_huizong_td.eq(7).html(data_level4.MSCOUNT);
					table1_huizong_td.eq(8).html(data_level4.MCOUNT);
					table1_huizong_td.eq(9).html(fixex(data_level4.NOEXPER));
					function fixex(data){
							if(data==0){
								data = "是"
							}else if(data == 1){
								data = "否"
							}
							return data;
					}

				}

			}

		})
        return false;		
	}
	return false;

}
function prepearData(data){
	
	var htmlArray =[];
	htmlArray.push("<tr>");
	
	for(var i = 0;i<data.length;i++){

		var j=i+1;
		//htmlArray.push("<tr><td>"+j+"</td><td>" + data[i].starttime + "</td><td class='zhexian' ><p><img src='img/qx.png' /></p><div class='lineDiv' style='left:25%; top: 150px; width:700px; height:365px;'><div class='drsMoveHandle'><span></span></div><div class='linecontent' id='zx"+i+"'></div></div></td><td>" + data[i].name + "</td><td>是</td><td><a href='"+rootPath+"/getMainAction.do?method=getLhModel&lh_id="+data[i].id+"'>导出</a></td></tr>")
		htmlArray.push("<tr><td>"+j+"</td><td>" + data[i].STARTTIME + "</td><td class='zhexian' ><p><img src='img/qx.png' /></p><div class='lineDiv' style='left:25%;top:150px;width:700px; height:365px;'><div class='drsMoveHandle' id='"+data[i].KKS_CODE+";"+data[i].KKS_NAME+";"+data[i].STARTTIME+";"+data[i].ENDTIEM+"' ><span></span></div><div class='linecontent' id='zx"+i+"'></div></div></td><td>说明</td><td>是</td><td><a href='"+rootPath+"/getMainAction.do?method=getSyModel&sy_id="+data[i].ID+"'>导出</a></td></tr>")

	}
	if(data.length!==5){
		for(var k =data.length;k<5;k++){

			htmlArray.push("<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
		}
	}
		
	
	htmlArray.push("</tr>");


	return htmlArray.join('');

}
function prepearDatalevel1(data){
	var htmlArray =[];
	htmlArray.push("<tr>");
	for(var i = 0;i<data.length;i++){
		d = data[i];
		var j=i+1;
		htmlArray.push("<tr><td owspan='4'>"+j+"</td><td owspan='4' style='text-align:left'>" + d.name+ "</td>");
		
		for(var k = 0;k < d.result.length ; k++){
			if(k === 0){
				htmlArray.push("<td>#"+d.result[k].G_ID+"</td><td>"+d.result[k].YSCOUNT+"</td><td>"+d.result[k].YCOUNT+"</td><td>"+d.result[k].MSCOUNT+"</td><td>"+d.result[k].MCOUNT+"</td><td>"+d.result[k].FLAG+"</td></tr>")
			}
			else{

			}
		}
		
	}
		

	htmlArray.push("</tr>");


	return htmlArray.join('');

}
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

//click弹出层
$(".wu_top1 h2").each(function(i) {
	$(this).hover(
		function() {
			$(".wu_top1 h3").hide();
			$(this).parent().find("h3").slideDown();
		},
		function() {
			$(document).click(
				function() {

					$(".wu_top1 h3").slideUp();
				});
			$(".wu_top1 h2,.wu_top1 h3").click(
				function(event) {
					event.stopPropagation();
				}
			);
		}
	);

});



//折线图

var dragresize = new DragResize('dragresize', {
	minWidth: 400,
	minHeight: 250
});

dragresize.isElement = function(elm) {
	if (elm.className && elm.className.indexOf('lineDiv') > -1) return true;
};
dragresize.isHandle = function(elm) {
	if (elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
};



$(document).ready(
	function() {
		//初始化弹窗的相对定位
		var line_width = ($(window).width() - 700) / 2 + "px";
		//var line_height=($(window).height()-365)/2+"px";
		var line_height = 100;
		$(".lineDiv").css({
			"left": line_width,
			"top": line_height
		});
		//改变窗口浏览器大小重置相对定位
		$(window).resize(function() {
			var line_width = ($(window).width() - 700) / 2 + "px";
			var line_height = ($(window).height() - 365) / 2 + "px";
			$(".lineDiv").css({
				"left": line_width,
				"top": line_height
			});
		});
		//弹窗淡入淡出
		$(".zhexian").on("click",

			function(event) {
				sbjiaohu();
				$(this).children(".lineDiv").fadeIn();
				var index = $(this).index();
				//zhexian($(this).find('.linecontent div').attr('id'))  
			}
		)
		//弹出层关闭按钮
		$(".drsMoveHandle span").bind("click",
			function(event) {
				$(this).parent().parent(".lineDiv").fadeOut();
				event.stopPropagation();
			}
		)

		function tiaozhuan() {
			var s = document.getElementById('fadeIn');
		}
	}
);



//设备轮换echart

function sbjiaohu(id,pi_codes,names,startime,endtime) {
	
	var code = pi_codes.split(",");
	var name = names.split(",");	
	var sbchulidata =[];
	var sbname=[];
	for(var t=0;t< code.length;t++){
		var url = rootPath + '/XipHistoryAction.do?method=getTecPro&pi_code='+code[t]+'&startTime=' + startime + '&endTime=' + endtime;
		$.ajax({
			url: url,
			async:false,
			success: function(data) {
				//console.log(data);
				var sbchuli = chulihanshu(data,name[t]);
				sbchulidata.push(sbchuli.value);
				sbname.push(name[t]);
				
				//var zhexiantest = document.getElementById('zhexiantest')
				if(t == code.length-1){
			    	var sblhx = chulishijian(startime,endtime);
			    	sblunhuan(sbname,sblhx,sbchulidata,id);
				}
			}
		})
	}
}

function chulishijian(startime,endtime){
	var time = [];
	$.ajax({
		url : rootPath +"/XipHistoryAction.do",
		type : "post",
		async : false, //同步执行
		dateType : "json",
		data : {
			    method: "getSblhX",
			    StartTime: startime,
			    StopTime:endtime     				
			   },
		success : function(data) {
			for(var i =0;i<data.length;i++){
				time.push(data[i]);
			}
		}
	})
	return time;		
}
function chulihanshu(data,code_name) {
	var arr = [];
	for (var i = 0; i < data.length; i++) {
		arr.push(data[i]);	
	}
	var arriteam = {
			name: code_name,
			type: 'line',
			//stack: '总量',
			data: arr
		}
	return {
		value: arriteam
	}
}
function sblunhuan(name,time, data,id) {
	times = time;
	var myChart = echarts.init(document.getElementById(id));
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:name
		},
		
		toolbox: {
			show: false,
	        feature: {
	        	dataZoom: {show: true},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: (function(times) {
				var arr = [];
				for (var i = 0; i < times.length; i++) {
					//var a = new Date(times[i]);
					//arr.push(a.format("yyyy-MM-dd hh:mm:ss"));
					arr.push((new Date(times[i])).toLocaleString())
				}
				return arr;
			})(times)
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value}'
			}
		},
		series: data
	};
	myChart.setOption(option);

}
Date.prototype.format = function(format) {
	/*
	 * format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

		}
	}
	return format;
}





$(document).ready(
	function() {
		// js模拟select
		(function($) {
			var selects = $('.choose'); //获取select
			for (var i = 0; i < selects.length; i++) {
				createSelect(selects[i], i);
			}

			function createSelect(select_container, index) {
				//创建select容器，class为select_box，插入到select标签前
				var tag_select = $('<div></div>'); //div相当于select标签
				tag_select.attr('class', 'select_box');
				tag_select.insertBefore(select_container);
				//显示框class为select_showbox,插入到创建的tag_select中
				var select_showbox = $('<div></div>'); //显示框
				select_showbox.css('cursor', 'pointer').attr('class', 'select_showbox').appendTo(tag_select);
				//创建option容器，class为select_option，插入到创建的tag_select中
				var ul_option = $('<ul></ul>'); //创建option列表
				ul_option.attr('class', 'select_option');
				ul_option.appendTo(tag_select);
				createOptions(index, ul_option); //创建option
				//点击显示框
				tag_select.toggle(function() {
					ul_option.slideDown();
				}, function() {
					ul_option.slideUp();
				});
				var li_option = ul_option.find('li');
				li_option.on('click', function() {
					$(this).addClass('selected').siblings().removeClass('selected');
					var value = $(this).text();
					select_showbox.text(value);
					ul_option.slideUp();
				});
				li_option.hover(function() {
					$(this).addClass('hover').siblings().removeClass('hover');
				}, function() {
					li_option.removeClass('hover');
				});
			}

			function createOptions(index, ul_list) {
				//获取被选中的元素并将其值赋值到显示框中
				var options = selects.eq(index).find('option'),
					selected_option = options.filter(':selected'),
					selected_index = selected_option.index(),
					showbox = ul_list.prev();
				showbox.text(selected_option.text());
				//为每个option建立个li并赋值
				for (var n = 0; n < options.length; n++) {
					var tag_option = $('<li></li>'), //li相当于option
						txt_option = options.eq(n).text();
					tag_option.text(txt_option).css('cursor', 'pointer').appendTo(ul_list);
					//为被选中的元素添加class为selected
					if (n == selected_index) {
						tag_option.attr('class', 'selected');
					}
				}
			}
		})(jQuery)
	})



































//弹出窗口拖拽	
//获取并定义树形菜单的高度
var st_height = document.documentElement.clientHeight - 60
document.getElementById("tree").style.height = st_height + "px";
//获取并定义wu_main的margin
var main_mar = $(".wu_top").outerHeight(true)
$(".wu_main").css({
	"margin-top": main_mar + "px"
});

if (typeof addEvent != 'function') {
	var addEvent = function(o, t, f, l) {
		var d = 'addEventListener',
			n = 'on' + t,
			rO = o,
			rT = t,
			rF = f,
			rL = l;
		if (o[d] && !l)
			return o[d](t, f, false);
		if (!o._evts) o._evts = {};
		if (!o._evts[t]) {
			o._evts[t] = o[n] ? {
				b: o[n]
			} : {};
			o[n] = new Function('e',
				'var r=true,o=this,a=o._evts["' + t + '"],i;for(i in a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');
			if (t != 'unload') addEvent(window, 'unload', function() {
				removeEvent(rO, rT, rF, rL)
			})
		}
		if (!f._i) f._i = addEvent._i++;
		o._evts[t][f._i] = f
	};
	addEvent._i = 1;
	var removeEvent = function(o, t, f, l) {
		var d = 'removeEventListener';
		if (o[d] && !l) return o[d](t, f, false);
		if (o._evts && o._evts[t] && f._i) delete o._evts[t][f._i]
	}
}

function cancelEvent(e, c) {
	e.returnValue = false;
	if (e.preventDefault) e.preventDefault();
	if (c) {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation()
	}
};

function DragResize(myName, config) {
	var props = {
		myName: myName,
		enabled: true,
		handles: ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'],
		isElement: null,
		isHandle: null,
		element: null,
		handle: null,
		minWidth: 10,
		minHeight: 10,
		minLeft: -9999,
		maxLeft: 9999,
		minTop: -9999,
		maxTop: 9999,
		zIndex: 4000,
		mouseX: 0,
		mouseY: 0,
		lastMouseX: 0,
		lastMouseY: 0,
		mOffX: 0,
		mOffY: 0,
		elmX: 0,
		elmY: 0,
		elmW: 0,
		elmH: 0,
		allowBlur: true,
		ondragfocus: null,
		ondragstart: null,
		ondragmove: null,
		ondragend: null,
		ondragblur: null
	};
	for (var p in props) this[p] = (typeof config[p] == 'undefined') ? props[p] : config[p]
};
DragResize.prototype.apply = function(node) {
	var obj = this;
	addEvent(node, 'mousedown', function(e) {
		obj.mouseDown(e)
	});
	addEvent(node, 'mousemove', function(e) {
		obj.mouseMove(e)
	});
	addEvent(node, 'mouseup', function(e) {
		obj.mouseUp(e)
	})
};
DragResize.prototype.select = function(newElement) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		if (newElement && (newElement != element) && enabled) {
			element = newElement;
			element.style.zIndex = ++zIndex;
			if (this.resizeHandleSet) this.resizeHandleSet(element, true);
			elmX = parseInt(element.style.left);
			elmY = parseInt(element.style.top);
			elmW = element.offsetWidth;
			elmH = element.offsetHeight;
			if (ondragfocus) this.ondragfocus()
		}
	}
};
DragResize.prototype.deselect = function(delHandles) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		if (delHandles) {
			if (ondragblur) this.ondragblur();
			if (this.resizeHandleSet) this.resizeHandleSet(element, false);
			element = null
		}
		handle = null;
		mOffX = 0;
		mOffY = 0
	}
};
DragResize.prototype.mouseDown = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return true;
		var elm = e.target || e.srcElement,
			newElement = null,
			newHandle = null,
			hRE = new RegExp(myName + '-([trmbl]{2})', '');
		while (elm) {
			if (elm.className) {
				if (!newHandle && (hRE.test(elm.className) || isHandle(elm))) newHandle = elm;
				if (isElement(elm)) {
					newElement = elm;
					break
				}
			}
			elm = elm.parentNode
		}
		if (element && (element != newElement) && allowBlur) deselect(true);
		if (newElement && (!element || (newElement == element))) {
			if (newHandle) cancelEvent(e);
			select(newElement, newHandle);
			handle = newHandle;
			if (handle && ondragstart) this.ondragstart(hRE.test(handle.className))
		}
	}
};
DragResize.prototype.mouseMove = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return true;
		mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
		mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;
		var diffX = mouseX - lastMouseX + mOffX;
		var diffY = mouseY - lastMouseY + mOffY;
		mOffX = mOffY = 0;
		lastMouseX = mouseX;
		lastMouseY = mouseY;
		if (!handle) return true;
		var isResize = false;
		if (this.resizeHandleDrag && this.resizeHandleDrag(diffX, diffY)) {
			isResize = true
		} else {
			var dX = diffX,
				dY = diffY;
			if (elmX + dX < minLeft) mOffX = (dX - (diffX = minLeft - elmX));
			else if (elmX + elmW + dX > maxLeft) mOffX = (dX - (diffX = maxLeft - elmX - elmW));
			if (elmY + dY < minTop) mOffY = (dY - (diffY = minTop - elmY));
			else if (elmY + elmH + dY > maxTop) mOffY = (dY - (diffY = maxTop - elmY - elmH));
			elmX += diffX;
			elmY += diffY
		}
		with(element.style) {
			left = elmX + 'px';
			width = elmW + 'px';
			top = elmY + 'px';
			height = elmH + 'px'
		}
		if (window.opera && document.documentElement) {
			var oDF = document.getElementById('op-drag-fix');
			if (!oDF) {
				var oDF = document.createElement('input');
				oDF.id = 'op-drag-fix';
				oDF.style.display = 'none';
				document.body.appendChild(oDF)
			}
			oDF.focus()
		}
		if (ondragmove) this.ondragmove(isResize);
		cancelEvent(e)
	}
};
DragResize.prototype.mouseUp = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		var hRE = new RegExp(myName + '-([trmbl]{2})', '');
		if (handle && ondragend) this.ondragend(hRE.test(handle.className));
		deselect(false)
	}
};
DragResize.prototype.resizeHandleSet = function(elm, show) {
	with(this) {
		if (!elm._handle_tr) {
			for (var h = 0; h < handles.length; h++) {
				var hDiv = document.createElement('div');
				hDiv.className = myName + ' ' + myName + '-' + handles[h];
				elm['_handle_' + handles[h]] = elm.appendChild(hDiv)
			}
		}
		for (var h = 0; h < handles.length; h++) {
			elm['_handle_' + handles[h]].style.visibility = show ? 'inherit' : 'hidden'
		}
	}
};
DragResize.prototype.resizeHandleDrag = function(diffX, diffY) {
	with(this) {
		var hClass = handle && handle.className && handle.className.match(new RegExp(myName + '-([tmblr]{2})')) ? RegExp.$1 : '';
		var dY = diffY,
			dX = diffX,
			processed = false;
		if (hClass.indexOf('t') >= 0) {
			rs = 1;
			if (elmH - dY < minHeight) mOffY = (dY - (diffY = elmH - minHeight));
			else if (elmY + dY < minTop) mOffY = (dY - (diffY = minTop - elmY));
			elmY += diffY;
			elmH -= diffY;
			processed = true
		}
		if (hClass.indexOf('b') >= 0) {
			rs = 1;
			if (elmH + dY < minHeight) mOffY = (dY - (diffY = minHeight - elmH));
			else if (elmY + elmH + dY > maxTop) mOffY = (dY - (diffY = maxTop - elmY - elmH));
			elmH += diffY;
			processed = true
		}
		if (hClass.indexOf('l') >= 0) {
			rs = 1;
			if (elmW - dX < minWidth) mOffX = (dX - (diffX = elmW - minWidth));
			else if (elmX + dX < minLeft) mOffX = (dX - (diffX = minLeft - elmX));
			elmX += diffX;
			elmW -= diffX;
			processed = true
		}
		if (hClass.indexOf('r') >= 0) {
			rs = 1;
			if (elmW + dX < minWidth) mOffX = (dX - (diffX = minWidth - elmW));
			else if (elmX + elmW + dX > maxLeft) mOffX = (dX - (diffX = maxLeft - elmX - elmW));
			elmW += diffX;
			processed = true
		}
		return processed
	}
};

dragresize.ondragfocus = function() {};
dragresize.ondragstart = function(isResize) {};
dragresize.ondragmove = function(isResize) {};
dragresize.ondragend = function(isResize) {};
dragresize.ondragblur = function() {};
dragresize.apply(document);










