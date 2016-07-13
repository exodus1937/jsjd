
/*var reqUrl = parent.document.getElementById("index_page").contentWindow.location.href;
//提取url字符串到json数据；
function queryString(url){
   var reg_url = /^[^\?]+\?([\w\W]+)$/,
           reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
           arr_url = reg_url.exec(url),

           res = {};
           console.log(arr_url);
   if(arr_url && arr_url[1]) {
       var str_para = arr_url[1],result;
       while((result = reg_para.exec(str_para)) != null){
           res[result[1]] = result[2];
       }
   }
   return res;
}
var reqJson = queryString(reqUrl);
console.log(reqJson);*/




//弹出窗口拖拽
//获取并定义树形菜单的高度


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
jzqt_zonglan("c21834b4-1cb0-490f-a2a8-deeaf7f7e065");
function jzqt_zonglan(orgID){

	//console.log(orgID);
    var url = rootPath + "/portal.do";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            method: "getJzqtNumByOrgid",
            orgid: orgID
        },
         dataType:"json",
        success: function(data){
           
            var getTD = preparedata(data.pagedata,["G_ID","QDNUM","TJNUM","QDTIME","TJTIME","DAYS"],'zonglan');
            $("#lh_name").html(data.pagedata[0].ORGNAME)


           $("#table1_huizong").html(getTD);
           //机组起停划过的样式；
           $('.tdhover').hover(function(){
           		$(this).find('a').css({color:"#fff"})
           },function(){
           		$(this).find('a').css({color:"#000"})
           })
           //转换电厂默认加载 #1启机；
   
           detail(orgID,'1','QD',1,true);
        }
    })
}
function preparedata(data,columns,table){
    var htmlArray = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        htmlArray.push("<tr>");
        for (var j = 0;j < columns.length; j++) {
            var columnValue = getColumnValue(table, columns[j], d[columns[j]],d);
            if(table == "zonglan"&&j == 1){
            	htmlArray.push("<td "+columnValue+" class='tdhover' id='first' style='cursor:pointer'><a href='#'  title='"+d.QDNUM+"'>"+d.QDNUM+"</a></td>")
            }else if (table =="zonglan" && j == 2){
            	htmlArray.push("<td style='cursor:pointer'class='tdhover' "+columnValue+"><a href='#' title='"+d.TJNUM+"'>"+d.TJNUM+"</a></td>")
            }else{
            	htmlArray.push("<td class='overflow'><a title='" + columnValue + "'>" + columnValue + "</a></td>");
            }
        }
    }
    htmlArray.push("</tr>");
    return htmlArray.join('');

    
}
function getColumnValue(table,column,columnValue,d){
	if(column == "G_ID"){
		return "#" + columnValue;
	} 
	if(column == "QDNUM"){
		return "onclick=detail('"+d.ORGID+"','"+d.G_ID+"','QD',1,'true')";
	}   
	if(column == "TJNUM"){
		return "onclick=detail('"+d.ORGID+"','"+d.G_ID+"','TJ','1','true')";
	}
	return columnValue;
}
//detail("c21834b4-1cb0-490f-a2a8-deeaf7f7e065",'1','QD');
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
	//从第一次执行函数中获取参数 重新传入
	var org_id = sessionStorage.getItem("org_id");
	var g_id   = sessionStorage.getItem("g_id")
	var type   = sessionStorage.getItem("type")
	 detail(org_id,g_id,type,page_index + 1);
	//detail(orgId,gID,page_index + 1,g_id);
  	return false;
}
var query_flag=true;
function detail(orgid,g_id,type,nub,flag){
	sessionStorage.setItem("org_id",orgid)
	sessionStorage.setItem("g_id",g_id);
	sessionStorage.setItem("type",type);
	if(!nub){
		nub="1";
	}
	var url = rootPath + "/portal.do";
    $.ajax({
        url: url,
        type: "POST",
        data:{
            method:"getJzqtExp",
            orgid:orgid,
            g_id:g_id,
            type:type,
            pagenum:nub,
			pagesize:5 
        },
        dataType:"json",
        success: function(data){
        	//console.log(type);
           //console.log(data);
        	var page = Math.ceil(data.total/5)
        	if(query_flag||flag){
        		$("#Pagination").show()
				initPagination(page);//分页加载
			}
        	if(page==0){
        		$("#Pagination").hide()
        	}
        	
        	query_flag=false;
        	//本人所属电厂orgId   data.orgId
            var getTD = preparedataDetail(data.expr,type,data.orgId);  
            var tempOrgId="";
            if(data.expr.length){
            		var d = data.expr[0];
            		tempOrgId = d.ORG_ID;
            }
            
           $("#detail").html(getTD);
           if(type && type=='TJ' && data.orgId==tempOrgId){
            $('.button').modal({
	            target: '#modal',
	            speed: 500,
	            easing: 'easeInOutBounce',
	            animation: 'right',
	            position: '200px auto',
	            overlayClose: true,
	            on: 'click'
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
					console.log(dataT);
					
					if(d_flag){
						//sbjiaohu("zx"+i,code,name,starttime,endtime);
						d_flag = false;
						
					}
					$(".drsMoveHandle span").bind("click",
						function(event) {
							$(this).parent().parent(".lineDiv").fadeOut();
							event.stopPropagation();
						}
					)

					$(this).children(".lineDiv").fadeIn();
					var index = $(this).index();
					//zhexian($(this).find('.linecontent div').attr('id'))  
				}
			)}
        }
    })

}



function preparedataDetail(data,type,orgId){
	var htmlArray = [];
	
	for(var i = 0; i < data.length; i++){
		var d = data[i];
		htmlArray.push("<tr>");
		
	
		if(type && type=='TJ'){
			var msg='';
			if(d.ADUIT_STATUS=='A'  && orgId==d.ORG_ID){
				msg='填写';
			}
			if(d.ADUIT_STATUS=='C' && orgId==d.ORG_ID){
				msg='已提交';
			}
			if(d.ADUIT_STATUS=='D' && orgId==d.ORG_ID){
				msg='已驳回';
			}
			if(d.QT_DESC && d.QT_DESC.length>0 && d.ADUIT_STATUS=='E'){
				msg=d.QT_DESC;
			}
			htmlArray.push("<td>#"+d.G_ID+"</td><td>"+d.NAME+"</td><td>"+d.STARTTIME+"</td><td>"+d.ENDTIME+"</td><td>"+d.PARATIME+"</td><td class='button link' id="+d.ID+" onclick=getvalue('"+d.ID+"','"+d.NAME+"',this)>"+msg+"</td>")
			//htmlArray.push("<td>#"+d.G_ID+"</td><td>"+d.NAME+"</td><td>"+d.STARTTIME+"</td><td>"+d.ENDTIME+"</td><td>"+d.PARATIME+"</td><td class='button link'>填写</td>");
			htmlArray.push("<td class='zhexian' ><p><img src='img/qx.png' /></p>");
			htmlArray.push("<div class='lineDiv' style='left:25%;top:150px;width:700px; height:365px;'><div class='drsMoveHandle' id='"+data[i].KKS_CODE+";"+data[i].KKS_NAME+";"+data[i].STARTTIME+";"+data[i].ENDTIME+"' ><span></span></div><div class='linecontent' id='zx"+i+"'><button>1</button></div></div></td>")
			htmlArray.push('<td onclick=daocu("'+d.ID+'","'+type+'") class="link">查看</td>')
			
		}else{
			 msg='';
			if(d.QT_DESC && d.QT_DESC.length>0){
				msg=d.QT_DESC+'后启机';
			}
		    htmlArray.push("<td>#"+d.G_ID+"</td><td>"+d.NAME+"</td><td>"+d.STARTTIME+"</td><td>"+d.ENDTIME+"</td><td>"+d.PARATIME+"</td><td  class='button link'>"+msg+"</td>")
			//htmlArray.push("<td>#"+d.G_ID+"</td><td>"+d.NAME+"</td><td>"+d.STARTTIME+"</td><td>"+d.ENDTIME+"</td><td>"+d.PARATIME+"</td><td class='button link'>填写</td>");
			htmlArray.push("<td class='zhexian' ><p><img src='img/qx.png' /></p>");
			htmlArray.push("<div class='lineDiv' style='left:25%;top:150px;width:700px; height:365px;'><div class='drsMoveHandle' id='"+data[i].KKS_CODE+";"+data[i].KKS_NAME+";"+data[i].STARTTIME+";"+data[i].ENDTIME+"' ><span></span></div><div class='linecontent' id='zx"+i+"'><button>1</button></div></div></td>")
			htmlArray.push('<td onclick=daocu("'+d.ID+'","'+type+'") class="link">查看</td>')
			
		}
		
		htmlArray.push("</tr>")

	}
	
	return htmlArray.join('');
}








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
dragresize.ondragfocus = function() {};
dragresize.ondragstart = function(isResize) {};
dragresize.ondragmove = function(isResize) {};
dragresize.ondragend = function(isResize) {};
dragresize.ondragblur = function() {};
dragresize.apply(document);


$(document).ready(function() {
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
		
		
		 $("#tijiao").click(function(){
			 var ids = $("#result").val();
			 var name = $("#flowname").val();
				var qt_desc = $("#tj").val();
				//保存数据
				$("#"+ids).html('已提交');
							
				$("#modal").hide();
				$("#style").val($("#SW_hidden_element").next().attr("style"));
				$("#SW_hidden_element").next().removeAttr("style");
				
                //移除onclick事件
				$("#"+ids).removeAttr("onclick"); 
				$("#"+ids).removeAttr("class"); 
				//$("#"+ids).modal('hide');
				$("#"+ids).unbind("click");
				
				if(!ids || ids.length<1){
					alert('id号不能为空');
					return;
				}if(!qt_desc || qt_desc.length<1){
					alert('选择检修类型');
					return ;
				}
				//var contextPath = 'http://127.0.0.1:8080/jsjd';
				// var workflowUtil = new workflowUtil(contextPath);

				 var json={e_business_id:ids,qt_desc:qt_desc,name:name};
				 startAndSubmitByEntityCode('JIZUTINGJI',json,function(e){  
				   if(e.flag==1)
				   {
				     alert(e.msg);
				   }else{ var inst_code = e.instanceCode;
				        Ext.Ajax.request({
				          url: rootPath + '/main?xwl=2406L4N5MW6V',
				         params: {id:ids,inst_code:inst_code,qt_desc:qt_desc,name:name},
				         // params: {id:ids,INST_CODE_JZQT:inst_code,qt_desc:qt_desc},
				          success: function(response){
				            Ext.Msg.alert('提示','流程提交成功!');
                            //提交后就变成审批中的状态
				           /**$.ajax({
				        		url : "../portal/upateAduitStatus.do",
				        		async: false,
				        		type : "POST", 
				        		data: {id:ids},
				        		success : function(data) {
				        			
				        		}
				        	})**/
				            
				          },
				          failure:function(response){
				        	  alert(response);
				          }
				        });
				       }
				 });
				
		});  
		 
					
	}
);


function sbjiaohu(id,pi_codes,names,startime,endtime) {
	var code = pi_codes.split(",");
	var name = names.split(",");	
	var sbchulidata =[];
	var sbname=[];
	var sblhx = 0;
	sblhx = chulishijian(startime,endtime);
	for(var t=0;t< code.length;t++){
		//console.log(startime);
		//console.log(endtime);
		var url = rootPath + '/XipHistoryAction.do?method=getTecPro&pi_code='+code[t]+'&startTime=' + startime + '&endTime=' + endtime;
		$.ajax({
			url: url,
			async : false,
			success:function(data) {
					var sbchuli = chulihanshu(data,name[t]);
					sbchulidata.push(sbchuli.value);
					sbname.push(name[t]);
				if(t == code.length-1&& sblhx){
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
		//async : false, //同步执行
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
	//console.log(time);
		return time;				
}




if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
var ctx = window.location.origin;


function daocu(id,type){
	var url = ctx+"/jsjd/XipExperimentAction.do?method=getjzQt&qt_id="+id;
	var url2  = ""
	
	if(type == "QD"){
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"jizuqiting_id","value":"'+id+'"}]&resid=I4028e4f337ef9efa0154bc69402a2a3f&user=admin&password=manager&refresh=true'
	}else{
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"jizuqiting_id","value":"'+id+'"}]&resid=I4028e4f341b675de0154c1c0aaf700f0&user=admin&password=manager&refresh=true' 
	}
	//window.open(url2);
	
	$.ajax({
		url:url,
		type:"POST",
		success:function(){
			
			window.open(url2);
		}

	})
}

function getvalue(id,flowname,is){
	//alert($("#SW_hidden_element").next().attr("style"));
	if(($("#"+id).html()=='填写' ||  $("#"+id).html()=='已驳回' )&& $("#style").val().length>0 ){
		$("#SW_hidden_element").next().attr("style",$("#style").val()  );
	}
	
	if($("#"+id).html()!='填写' &&  $("#"+id).html()!='已驳回'){
		$("#modal").hide();
		if(!$("#style").val()){
			$("#style").val($("#SW_hidden_element").next().attr("style"));
		}
		
		$("#SW_hidden_element").next().removeAttr("style");
		
        //移除onclick事件
		$("#"+id).removeAttr("onclick"); 
		$("#"+id).removeAttr("class"); 
		//$("#"+ids).modal('hide');
		$("#"+id).unbind("click");
		return ;
	}
	$("#result").val(id);
	$("#flowname").val(flowname);
	
	
}

