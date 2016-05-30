/**初始加载
 * @author 宋延军
 */
$(document).ready(function() {
	document.onkeypress = forbidBackSpace;		//禁止后退键 作用于Firefox、Opera
	document.onkeydown = forbidBackSpace;		//禁止后退键  作用于IE、Chrome  
});

/**处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
 * @author 宋延军
 * @param {} e
 * @return {Boolean}
 */
function forbidBackSpace(e) {	//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外  
	var ev = e || window.event; //获取event对象   
	var obj = ev.target || ev.srcElement; //获取事件源   
	var t = obj.type || obj.getAttribute('type'); //获取事件源类型   
	//获取作为判断条件的事件类型   
	var vReadOnly = obj.readOnly;
	var vDisabled = obj.disabled;
	//处理undefined值情况   
	vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	vDisabled = (vDisabled == undefined) ? true : vDisabled;
	//当敲Backspace键时，事件源类型为密码或单行、多行文本的，   
	//并且readOnly属性为true或disabled属性为true的，则退格键失效   
	var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
	//当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效   
	var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
	//判断   
	if (flag2 || flag1){
		return false;
	}
}

/**自定义 common 对象 
 * @author 宋延军
 */
var common = function() { };

/**自定义权限框架frame对象
 * @author 宋延军
 */
common.prototype.frame = function() { };

/**自定义 text 对象
 * @author 宋延军
 */
common.prototype.text = function() { };

/**自定义 page 对象
 * @author 宋延军
 */
common.prototype.page = function() { };

/**String对象增加去除尖括号
 * @author 宋延军
 */
String.prototype.stripHTML = function() {
	var reTag = /<(?:.|\s)*?>/g;   return this.replace(reTag,"");
};

/**执行异步下载操作，超过10分钟后自动移除【1分钟=60秒*1000毫秒=60000， 10分钟=(60秒*1000毫秒)*10=600000】
 * @author 宋延军
 * @param {} downloadUri 下载地址
 * @param {} useIFrame 是否创建ifame
 */
common.prototype.page.startDownloading = function(downloadUri, useIFrame) { 
    if (!downloadUri || !downloadUri.length) {   return;   } if (!useIFrame) { window.location.href = downloadUri; } else {  var frame = $("<iframe />"); frame.appendTo($("body")).attr({ "src": downloadUri}).hide(); setTimeout(function () { frame.remove();  }, 600000);   } 
};

/**判断当前使用浏览器版本类【Firefox/IE/Chrome/Operra/Safari】
 * @author  宋延军
 * @return {} 参数对象【Json格式】
 */
common.prototype.page.validateBrowser = function(){
	var Browser_Name=navigator.appName;
	var Browser_Version=parseFloat(navigator.appVersion);
	var Browser_Agent=navigator.userAgent;
	var Actual_Version,Actual_Name;
	var is_IE=(Browser_Name=="Microsoft Internet Explorer");//判读是否为ie浏览器
	var is_NN=(Browser_Name=="Netscape");//判断是否为netscape浏览器
	var is_op=(Browser_Name=="Opera");//判断是否为Opera浏览器
	if(is_NN)
	{
	    if(Browser_Version>=5.0)
	    {
			if(Browser_Agent.indexOf("Netscape")!=-1)
			{
				var Split_Sign=Browser_Agent.lastIndexOf("/");
				var Version=Browser_Agent.lastIndexOf(" ");
				var Bname=Browser_Agent.substring(0,Split_Sign);
				var Split_sign2=Bname.lastIndexOf(" ");
				Actual_Version=Browser_Agent.substring(Split_Sign+1,Browser_Agent.length);
				Actual_Name=Bname.substring(Split_sign2+1,Bname.length);
			}
			if(Browser_Agent.indexOf("Firefox")!=-1)
			{
				var Split_Sign=Browser_Agent.lastIndexOf("/");
				var Version=Browser_Agent.lastIndexOf(" ");
				Actual_Version=Browser_Agent.substring(Split_Sign+1,Browser_Agent.length);
				Actual_Name=Browser_Agent.substring(Version+1,Split_Sign);
			}
			if(Browser_Agent.indexOf("Safari")!=-1)
			{
				if(Browser_Agent.indexOf("Chrome")!=-1)
				{
					var Split_Sign=Browser_Agent.lastIndexOf(" ");
					var Version=Browser_Agent.substring(0,Split_Sign);;
					var Split_Sign2=Version.lastIndexOf("/");
					var Bname=Version.lastIndexOf(" ");
					Actual_Version=Version.substring(Split_Sign2+1,Version.length);
					Actual_Name=Version.substring(Bname+1,Split_Sign2);
				}
				else
				{
					var Split_Sign=Browser_Agent.lastIndexOf("/");
					var Version=Browser_Agent.substring(0,Split_Sign);;
					var Split_Sign2=Version.lastIndexOf("/");
	                var Bname=Browser_Agent.lastIndexOf(" ");
					Actual_Version=Browser_Agent.substring(Split_Sign2+1,Bname);
					Actual_Name=Browser_Agent.substring(Bname+1,Split_Sign);
				}
			}
		}
		else
		{
			Actual_Version=Browser_Version;
			Actual_Name=Browser_Name;
		}
	}
	else if(is_IE)
	{
		var Version_Start=Browser_Agent.indexOf("MSIE");
		var Version_End=Browser_Agent.indexOf(";",Version_Start);
		Actual_Version=Browser_Agent.substring(Version_Start+5,Version_End)
		Actual_Name=Browser_Name;
		if(Browser_Agent.indexOf("Maxthon")!=-1||Browser_Agent.indexOf("MAXTHON")!=-1)
		{
			var mv=Browser_Agent.lastIndexOf(" ");
			var mv1=Browser_Agent.substring(mv,Browser_Agent.length-1);
			mv1="遨游版本:"+mv1;
			Actual_Name+="(Maxthon)";
			Actual_Version+=mv1;
		}
	}
	else if(Browser_Agent.indexOf("Opera")!=-1)
	{
		Actual_Name="Opera";
		var tempstart=Browser_Agent.indexOf("Opera");
		var tempend=Browser_Agent.length;
		Actual_Version=Browser_Version;
	}
	else
	{
		Actual_Name="Unknown Navigator"
		Actual_Version="Unknown Version"
	}
	/*------------------------------------------------------------------------------
	--Your Can Create new properties of navigator(Acutal_Name and Actual_Version) --
	--Userage:                                                                     --
	--1,Call This Function.                                                        --
	--2,use the property Like This:navigator.Actual_Name/navigator.Actual_Version;--
	------------------------------------------------------------------------------*/
	navigator.Actual_Name=Actual_Name;
	navigator.Actual_Version=Actual_Version;
	/*---------------------------------------------------------------------------
	--Or Made this a Class.                                                     --
	--Userage:                                                                  --
	--1,Create a instance of this object like this:var browser=new browserinfo;--
	--2,user this instance:browser.Version/browser.Name;                        --
	---------------------------------------------------------------------------*/
	this.Name=Actual_Name;
	this.Version=Actual_Version;
	console.log('---------------------你使用浏览器的核心是：'+navigator.userAgent);
	console.log('---------------------你使用的浏览器是：'+navigator.Actual_Name+'  ,  版本号：'+navigator.Actual_Version);
	return navigator;
};

/**获取浏览器的尺寸详情
 * @author  宋延军
 * @return {w,h} 尺寸对象
 */
common.prototype.page.browserViewportInfo = function(){
	var w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
	var h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight; console.log('-------------------------------------------------------------------------------------------获取浏览器宽度和高度'+w+'   '+h);
	return { w:w,h:h };
};

/**页面分页工具栏【两个参数】
 * @author 宋延军
 * @param obj Controller返回的页面page对象
 * @param url 分页函数，需要每个页面对象自己实现
 */
common.prototype.page.tool = function(obj, url) {
	if ($("#pagetool") != undefined) {
		options = {
			size:"small",
			bootstrapMajorVersion:3,
			currentPage: obj.currentPage,
			totalPages:obj.totalPage,
			numberOfPages: 5,
			onPageClicked: function(e,originalEvent,type,page){  },
			onPageChanged: function(e,oldPage,newPage){  eval(url+"("+newPage+")");   $(this).attr("alt",newPage);  },
			useBootstrapTooltip:false,
			itemTexts: function (type, page, current) { switch (type) { case "first": return "首页"; case "prev": return "前一页"; case "next":  return "下一页"; case "last":  return "末页"; case "page": return page; } },
			bootstrapTooltipOptions: { html: true, placement: 'bottom' }
		};
		$('#pagetool').bootstrapPaginator(options);
	}
};

/**页面分页工具栏2【三个参数】
 * @author 宋延军
 * @param {} pageId
 * @param {} obj Controller返回的页面page对象
 * @param {} url 分页函数，需要每个页面对象自己实现
 */
common.prototype.page.tool2 = function(pageId, obj, url) {
	if ($("#"+pageId)  != undefined) {
		options = {
			size:"small",
			bootstrapMajorVersion:3,
			currentPage: obj.currentPage,
			totalPages:obj.totalPage,
			numberOfPages: 5,
			onPageClicked: function(e,originalEvent,type,page){  },
			onPageChanged: function(e,oldPage,newPage){  eval(url+"("+newPage+")");   $(this).attr("alt", newPage);  },
			useBootstrapTooltip:false,
			itemTexts: function (type, page, current) { switch (type) { case "first": return "首页"; case "prev": return "前一页"; case "next":  return "下一页"; case "last":  return "末页"; case "page": return page; } },
			bootstrapTooltipOptions: { html: true, placement: 'bottom' }
		};
		$('#'+pageId).bootstrapPaginator(options);
	}
};


/*--@罗小宝 2015.01.27日新增的添加的代码段----------------------------------------------------------------------------------------------------------------------------------------------BEGIN--*/
/**【Author 罗小宝 2015.01.27日后续添加的】页面分页工具栏 现在有三个参数  common.prototype.page.tool1
 * @param pageId
 * @param obj  controller返回的页面page对象
 * @param url 分页函数，需要每个页面对象自己实现
 */
common.prototype.page.tool1 = function(pageId,obj, url) {
	if ($("#"+pageId) != undefined) {
          options = {
          size:"small",
          bootstrapMajorVersion:3,
          currentPage: obj.currentPage,
          totalPages:obj.totalPage,
          numberOfPages: 5,
          onPageClicked: function(e,originalEvent,type,page){ },
          onPageChanged: function(e,oldPage,newPage){ eval(url+"("+newPage+")"); },
          useBootstrapTooltip:false,
          itemTexts: function (type, page, current) { switch (type) { case "first":  return "首页"; case "prev":  return "前一页"; case "next":  return "下一页"; case "last":  return "末页";  case "page":  return page;  }  },
          bootstrapTooltipOptions: { html: true, placement: 'bottom'  }
      };
	 $('#'+pageId).bootstrapPaginator(options);
	}
};
/* 获取一个cookie uploadfy上传组件用 flash上传不是当前页 */
function getcookie(name){		
	var strcookie=document.cookie;
	var arrcookie=strcookie.split("; ");
	for(var i=0;i<arrcookie.length;i++){
	var arr=arrcookie[i].split("=");
	if(arr[0]==name)return arr[1];
	}
	return "";
}

/**【Author 罗小宝 2015.01.27日后续添加的】基础分页方法，如果扩展需要每个页面对象自己扩展 common.prototype.page.base1
 * @param pageId  分页的ul ID
 * @param url 请求的url
 * @param param 参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值  var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} };
 * @param jsmethod
 * @param udpatemethod 修改方法的名称
 */
common.prototype.page.base1 = function(pageId, url, param, tableid, showcom, jsmethod, updatemethod) {

	var keyname="";
   //清理分页
	$("#"+pageId).html("");
	$.post(url,param, function(data) {
			//测试：获取返回对象中的对象中子属性
			//alert(data.page.result[0][showcom[1].name].twId);
						
			if (typeof (data) == "string") {
				data = eval(data);
			}
			$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
			$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行

			if(data.page.result.length==0){
				$("#" + tableid + " tr:eq(0)").css('display','none');
				$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
					return false;
			}//if...end
						
			for ( var i = 0; i < data.page.result.length; i++) {
				var rownum = $("#" + tableid + " tr").length - 1;
				var rowstr = "";
				if(data.page.result[i].isimedit==1){	//当需要修改时，显示红色
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
				}else if (i % 2 == 0) {
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
				} else {
					rowstr += "<tr>";
				}
				//----------------------------------------------------------------------------------------Begin
				//【自定义的列占位】【将编辑列放到前面】------------------------------------------Begin
							
				//【自定义的列占位】【将编辑列放到前面】------------------------------------------End
				//----------------------------------------------------------------------------------------End
							
				//遍历有多少列
                for ( var z = 0; z < showcom.length; z++) {
					//第一列，主键列
					if(showcom[z].key!=undefined && showcom[z].key==true) {
						keyname =showcom[z].name;//alert(showcom[z].key);
					}
					//第二列，隐藏或显示
					rowstr += "<td style='vertical-align:middle;";
					if (showcom[z].hidden)     {
                        rowstr += " display:none;"; //rowstr += " style='display:black;' ";
					}//if...end	
					//表格居中样式设置值为left、center、right
					if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
						rowstr += " vertical-align:middle; text-align: "+showcom[z].tdCss+";";
					}
					if (showcom[showcom.length-1].tdColor) {
						if (data.page.result[i][showcom[showcom.length-1].name]=="1") {
							rowstr += " background-color:#7FFF00;";
						}
					}
					rowstr += "'";
					
					if (showcom[z].flag == 0) {
									
						if (showcom[z].replacevalue.length > 0) {
							rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
						}else{
							rowstr += " cell='" + [ showcom[z].name ] + "'>";
						}
									
						if(showcom[z].click!=undefined){
							var _obj = showcom[z].click;
						                  
						    if(typeof(_obj.param)=='string'){
						    	if(_obj.staticparam==undefined){
						    		rowstr += " <a href='#' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"') >";
						        }else{
						            rowstr += "  <a href='#' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"','"+_obj.staticparam+"') >";
						        }
							 }else{
							 	var params = "";
							    for(var l = 0 ; l<_obj.param.length;l++){
							    	params+="'"+data.page.result[i][_obj.param[l].name]+"'";
							        if((l+1)<_obj.param.length){
							        	params+=",";
							        }
							    }
							    if(_obj.staticparam==undefined){
							    	rowstr += "<a href='#' onclick="+_obj.method+"("+params+") >"; 
							    }else{
							        rowstr += "<a href='#' onclick="+_obj.method+"("+params+",'"+_obj.staticparam+"')>"; 
							    }
							 }
						}
								
						if (showcom[z].replacevalue.length > 0) {
							//	rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
										
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							for ( var index in showcom[z].replacevalue) {
								var obj = showcom[z].replacevalue[index][data.page.result[i][showcom[z].name]];
								if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
									rowstr += obj;
								}
							}
								
						} else {
										
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							//var obj1 = ;//alert("OBJ1-------"+obj1);
							// 检查 obj 的类型。
							// @Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
							rowstr+=common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name);
						}//if...else...end	
								
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						if(showcom[z].click!=undefined){
							rowstr += "</a>";
						}
						rowstr += "</td>";
																
					}else if(showcom[z].flag == 1) {
						rowstr += " >";
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span  class='"+showcom[z].css+"' >";
						}
										
						rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
											
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					}else if(showcom[z].flag ==2){
							rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
							if(showcom[z].method!=""){
								rowstr+="onclick='"+showcom[z].method+"("+data.page.result[i].id+")' ";
							}
							rowstr+="></td>";
									
					};//if...elseif...elseif....end
				}
							
				//【自定义的列占位】【将编辑列放到后面】------------------------------------------Begin							
				//----------------------------------------------------------------------------------------Begin
							
				if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
				// 选中框
				//rowstr += "<td cell='id'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
						
	                rowstr +="<td style='text-align:center;vertical-align:middle;";
	                if (showcom[showcom.length-1].tdColor) {
						if (data.page.result[i][showcom[showcom.length-1].name]=="1") {
							rowstr += " background-color:#7FFF00;";
						}
					}
					rowstr += "'>";
                 if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
					rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>详情</a>";
                 }//if...end
                 if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
                     for(var k=0;k<updatemethod.length;k++){
                          rowstr += "<a href='#myModal2' " ;
                          if(updatemethod[k].method!=""){
                          	rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
                            //rowstr +="onclick='"+updatemethod[k].method+"('" + (i + 1) + "','"+ data.page.result[i][keyname]+ "');' data-toggle='modal'";//鼠标点击
                          }
                          if(updatemethod[k].title!=""){
                            rowstr +=">"+updatemethod[k].title+"</a> ";
                          }
                          //alert(rowstr);
                  	 }//for...end
                  }//if....end
				rowstr +="</td>";
				}//if....end
				//----------------------------------------------------------------------------------------End
				//【自定义的列占位】【将编辑列放到后面】 ------------------------------------------End
						    
				rowstr += "</tr>";
								
				//alert("1---------\r\n"+rowstr);//$(" <tr><td style='display:none;' cell='tdId'>402882e8443d5e0f01443d6005460000</td><td cell='tdNo'>000000012</td><td cell='tdTaskName'>第①个测试任务名称</td><td style='display:none;' cell='tdTaskInfoDescription'>空间看见</td><td style='display:none;' cell='tdTaskDateStart'>2014-02-17 09:04</td><td style='display:none;' cell='tdTaskDateEnd'>2014-02-17 09:04</td><td cell='tdTaskCurrentState'>已分配 </td><td cell='tdTaskWorkingMaxHours'>3</td><td cell='tdFbrwCuId'>clerkuser016</td><td cell='tdCreateDate'>2014-02-17 09:05</td><td cell='sysProject'>项目名0004</td><td align='center'><a data-toggle='modal' href='#myModal2' >编辑</a> </td></tr>").insertAfter($("#tableresult tr:eq(" + rownum + ")"));//这句和上句语法都没有问题，使用单独页面上初始加载的时候调用可以使用，在这里面就包语法错误。艹。。。
				$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
				//alert("2---------\r\n");
					
			};
						
			if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
				common.prototype.page.tool1(pageId,data.page, jsmethod);
			}
		});

};

/**【Author 罗小宝 2015.01.27日后续添加的】Table列表方法，带复选框 common.prototype.page.baseTable
 * @param url  请求的url
 * @param param  参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值 var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} };
 * @param jsmethod
 * @param udpatemethod 修改方法的名称
 */
common.prototype.page.baseTable = function(pageUlId,url, param, tableid, showcom, checked, jsmethod, updatemethod) {
	var keyname="";
	//清理分页
	$('#'+pageUlId).html("");
	$.post(url, param, function(data) {
		if (typeof (data) == "string") {	//测试：获取返回对象中的对象中子属性
			data = eval(data);
		}
		$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
		$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行
	
		if(data.page.result.length==0){
			$("#" + tableid + " tr:eq(0)").css('display','none');
			$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
			return false;
		}//if...end
		
		for ( var i = 0; i < data.page.result.length; i++) {
			var rownum = $("#" + tableid + " tr").length - 1;
			var rowstr = "";
			if(data.page.result[i].isimedit==1){	//当需要修改时，显示红色
				rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
			}else if (i % 2 == 0) {
				rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
			} else {
				rowstr += "<tr>";
			}
			if (checked) {		//列表复选框
				rowstr += "<td cell='id' align='center'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i][showcom[0].name] + "' /></td>";
			}
	
			//遍历有多少列
	        for ( var z = 0; z < showcom.length; z++) {
				//第一列，主键列
				if(showcom[z].key!=undefined && showcom[z].key==true) {
					keyname =showcom[z].name;//alert(showcom[z].key);
				}
				//第二列，隐藏或显示
				rowstr += "<td ";
				if (showcom[z].hidden) {
	            	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
				}//if...end	
				//表格居中样式设置值为left、center、right
				if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
					rowstr += " style=' vertical-align:middle; text-align: "+showcom[z].tdCss+";' ";
				}
				if (showcom[z].flag == 0) {
					if (showcom[z].replacevalue.length > 0) {
						rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
					}else{
						rowstr += " cell='" + [ showcom[z].name ] + "'>";
					}
					if(showcom[z].click!=undefined){
						var _obj = showcom[z].click;
						if(typeof(_obj.param)=='string'){
							if(_obj.staticparam==undefined){
								rowstr += " <a href='#' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"') >";
							}else{
								rowstr += "  <a href='#' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"','"+_obj.staticparam+"') >";
							}
						}else{
							var params = "";
							for(var l = 0 ; l<_obj.param.length;l++){
								params+="'"+data.page.result[i][_obj.param[l].name]+"'";
								if((l+1)<_obj.param.length){
							    	params+=",";
							    }
							}
							if(_obj.staticparam==undefined){
								rowstr += "<a href='#' onclick="+_obj.method+"("+params+") >";
							}else{
								rowstr += "<a href='#' onclick="+_obj.method+"("+params+",'"+_obj.staticparam+"')>";
							}
						}
					}
					if (showcom[z].replacevalue.length > 0) {
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span class='"+showcom[z].css+"' >";
						}
						for ( var index in showcom[z].replacevalue) {
							var obj = showcom[z].replacevalue[index][data.page.result[i][showcom[z].name]];
							if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
								rowstr += obj;
							}
						}
					} else {
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span class='"+showcom[z].css+"' >";
						}
						//var obj1 = ;//alert("OBJ1-------"+obj1);
						// 检查 obj 的类型。
						// @Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
						rowstr+=common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name);
					}//if...else...end	
					if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
						rowstr += " </span>";
					}
					if(showcom[z].click!=undefined){
						rowstr += "</a>";
					}
					rowstr += "</td>";
				} else if(showcom[z].flag == 1) {
					rowstr += " >";
					if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
						rowstr+="<span  class='"+showcom[z].css+"' >";
					}
					rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
					if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
						rowstr += " </span>";
					}
					rowstr += "</td>";
				} else if(showcom[z].flag ==2){
					rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
					if(showcom[z].method!=""){
						rowstr+="onclick='"+showcom[z].method+"("+data.page.result[i].id+")' ";
					}
					rowstr+="></td>";
				}//if...elseif...elseif....end
			}
			//【自定义的列占位】【将编辑列放到后面】------------------------------------------Begin							
			//----------------------------------------------------------------------------------------Begin
			if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
				
				rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
				if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
					rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>详情</a>";
				}//if...end
				if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
					for(var k=0;k<updatemethod.length;k++){
						rowstr += "<a href='#myModal2' " ;
						if(updatemethod[k].method!=""){
							rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
							//rowstr +="onclick='"+updatemethod[k].method+"('" + (i + 1) + "','"+ data.page.result[i][keyname]+ "');' data-toggle='modal'";//鼠标点击
						}
						if(updatemethod[k].title!=""){
							rowstr +=">"+updatemethod[k].title+"</a> ";
						}
						//alert(rowstr);
					}//for...end
				}//if....end
				rowstr +="</td>";
			}//if....end
			//----------------------------------------------------------------------------------------End
			//【自定义的列占位】【将编辑列放到后面】 ------------------------------------------End
			rowstr += "</tr>";
			//alert("1---------\r\n"+rowstr);//$(" <tr><td style='display:none;' cell='tdId'>402882e8443d5e0f01443d6005460000</td><td cell='tdNo'>000000012</td><td cell='tdTaskName'>第①个测试任务名称</td><td style='display:none;' cell='tdTaskInfoDescription'>空间看见</td><td style='display:none;' cell='tdTaskDateStart'>2014-02-17 09:04</td><td style='display:none;' cell='tdTaskDateEnd'>2014-02-17 09:04</td><td cell='tdTaskCurrentState'>已分配 </td><td cell='tdTaskWorkingMaxHours'>3</td><td cell='tdFbrwCuId'>clerkuser016</td><td cell='tdCreateDate'>2014-02-17 09:05</td><td cell='sysProject'>项目名0004</td><td align='center'><a data-toggle='modal' href='#myModal2' >编辑</a> </td></tr>").insertAfter($("#tableresult tr:eq(" + rownum + ")"));//这句和上句语法都没有问题，使用单独页面上初始加载的时候调用可以使用，在这里面就包语法错误。艹。。。
			$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
			//alert("2---------\r\n");
		}
		if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
			common.prototype.page.tool1(pageUlId,data.page, jsmethod);
		}
	});

};



//不分页table
common.prototype.page.baseTable5 = function(url, param, tableid, showcom, checked, jsmethod, updatemethod) {
	var keyname="";
	//清理分页
	$.post(url, param, function(data) {
		if (typeof (data) == "string") {	//测试：获取返回对象中的对象中子属性
			data = eval(data);
		}
		$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
		$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行
	
		if(data.page.length==0){
			$("#" + tableid + " tr:eq(0)").css('display','none');
			$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
			return false;
		}//if...end
		
		for ( var i = 0; i < data.page.length; i++) {
			var rownum = $("#" + tableid + " tr").length - 1;
			var rowstr = "";
			if(data.page[i].isimedit==1){	//当需要修改时，显示红色
				rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
			}else if (i % 2 == 0) {
				rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
			} else {
				rowstr += "<tr>";
			}
			if (checked) {		//列表复选框
				rowstr += "<td cell='id' align='center'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page[i][showcom[0].name] + "' /></td>";
			}
	
			//遍历有多少列
	        for ( var z = 0; z < showcom.length; z++) {
				//第一列，主键列
				if(showcom[z].key!=undefined && showcom[z].key==true) {
					keyname =showcom[z].name;//alert(showcom[z].key);
				}
				//第二列，隐藏或显示
				rowstr += "<td ";
				if (showcom[z].hidden) {
	            	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
				}//if...end	
				//表格居中样式设置值为left、center、right
				if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
					rowstr += " style='text-align: "+showcom[z].tdCss+";' ";
				}
				if (showcom[z].flag == 0) {
					if (showcom[z].replacevalue.length > 0) {
						rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page[i][showcom[z].name] + "'>";
					}else{
						rowstr += " cell='" + [ showcom[z].name ] + "'>";
					}
					if(showcom[z].click!=undefined){
						var _obj = showcom[z].click;
						if(typeof(_obj.param)=='string'){
							if(_obj.staticparam==undefined){
								rowstr += " <a href='#' onclick="+_obj.method+"('"+data.page[i][_obj.param]+"') >";
							}else{
								rowstr += "  <a href='#' onclick="+_obj.method+"('"+data.page[i][_obj.param]+"','"+_obj.staticparam+"') >";
							}
						}else{
							var params = "";
							for(var l = 0 ; l<_obj.param.length;l++){
								params+="'"+data.page[i][_obj.param[l].name]+"'";
								if((l+1)<_obj.param.length){
							    	params+=",";
							    }
							}
							if(_obj.staticparam==undefined){
								rowstr += "<a href='#' onclick="+_obj.method+"("+params+") >";
							}else{
								rowstr += "<a href='#' onclick="+_obj.method+"("+params+",'"+_obj.staticparam+"')>";
							}
						}
					}
					if (showcom[z].replacevalue.length > 0) {
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span class='"+showcom[z].css+"' >";
						}
						for ( var index in showcom[z].replacevalue) {
							var obj = showcom[z].replacevalue[index][data.page[i][showcom[z].name]];
							if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
								rowstr += obj;
							}
						}
					} else {
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span class='"+showcom[z].css+"' >";
						}
						//var obj1 = ;//alert("OBJ1-------"+obj1);
						// 检查 obj 的类型。
						// @Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
						rowstr+=common.prototype.page.baseObjectValue(data.page[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page[i],showcom[z].name);
					}//if...else...end	
					if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
						rowstr += " </span>";
					}
					if(showcom[z].click!=undefined){
						rowstr += "</a>";
					}
					rowstr += "</td>";
				} else if(showcom[z].flag == 1) {
					rowstr += " >";
					if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
						rowstr+="<span  class='"+showcom[z].css+"' >";
					}
					rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
					if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
						rowstr += " </span>";
					}
					rowstr += "</td>";
				} else if(showcom[z].flag ==2){
					rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
					if(showcom[z].method!=""){
						rowstr+="onclick='"+showcom[z].method+"("+data.page[i].id+")' ";
					}
					rowstr+="></td>";
				}//if...elseif...elseif....end
			}
			//【自定义的列占位】【将编辑列放到后面】------------------------------------------Begin							
			//----------------------------------------------------------------------------------------Begin
			if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
				
				rowstr +="<td style='text-align:center;'>";
				if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
					rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page[i][keyname]+ ");'>详情</a>";
				}//if...end
				if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
					for(var k=0;k<updatemethod.length;k++){
						rowstr += "<a href='#myModal2' " ;
						if(updatemethod[k].method!=""){
							rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
							//rowstr +="onclick='"+updatemethod[k].method+"('" + (i + 1) + "','"+ data.page.result[i][keyname]+ "');' data-toggle='modal'";//鼠标点击
						}
						if(updatemethod[k].title!=""){
							rowstr +=">"+updatemethod[k].title+"</a> ";
						}
						//alert(rowstr);
					}//for...end
				}//if....end
				rowstr +="</td>";
			}//if....end
			//----------------------------------------------------------------------------------------End
			//【自定义的列占位】【将编辑列放到后面】 ------------------------------------------End
			rowstr += "</tr>";
			//alert("1---------\r\n"+rowstr);//$(" <tr><td style='display:none;' cell='tdId'>402882e8443d5e0f01443d6005460000</td><td cell='tdNo'>000000012</td><td cell='tdTaskName'>第①个测试任务名称</td><td style='display:none;' cell='tdTaskInfoDescription'>空间看见</td><td style='display:none;' cell='tdTaskDateStart'>2014-02-17 09:04</td><td style='display:none;' cell='tdTaskDateEnd'>2014-02-17 09:04</td><td cell='tdTaskCurrentState'>已分配 </td><td cell='tdTaskWorkingMaxHours'>3</td><td cell='tdFbrwCuId'>clerkuser016</td><td cell='tdCreateDate'>2014-02-17 09:05</td><td cell='sysProject'>项目名0004</td><td align='center'><a data-toggle='modal' href='#myModal2' >编辑</a> </td></tr>").insertAfter($("#tableresult tr:eq(" + rownum + ")"));//这句和上句语法都没有问题，使用单独页面上初始加载的时候调用可以使用，在这里面就包语法错误。艹。。。
			$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
			//alert("2---------\r\n");
		}
		if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
			//common.prototype.page.tool1(pageUlId,data.page, jsmethod);
		}
	});

};

/**
 * 取消选中所有checkbox
 * @param	name值
 */
common.prototype.page.checkboxUnchecked = function(name) {
	$("input[name=" + name + "]").each(function(index, obj) {
		if (this.checked) {
			this.checked = false;
		}
	});
};
/*--@罗小宝 2015.01.27日新增的添加的代码段----------------------------------------------------------------------------------------------------------------------------------------------END--*/


/*--公共PageBase【common.prototype.page.base】默认分页----------------------------------------------------------------------------------------------------------------------------------------------------*/
/**基础分页方法，如果扩展需要每个页面对象自己扩展
 * @author 宋延军
 * @param url 请求的url
 * @param param 参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值 【var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} }; 】
 * @param jsmethod 回调分页的方法
 * @param udpatemethod 自定义操作[ 修改 | 删除 ]方法
 */
common.prototype.page.base = function(url, param, tableid, showcom, jsmethod, updatemethod) {
	var keyname="";
	//清理分页
	$('#pagetool').html("");
	$.post(url, param, function(data) {
			//测试：获取返回对象中的对象中的子属性 //alert(data.page.result[0][showcom[1].name].departId); //测试：获取返回对象中的的属性 //alert(data.page.result[0][showcom[0].name]+" "+data.page.result[0][showcom[1].name]);
			if (typeof (data) == "string") {
				data = eval(data);
			}
			$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
			$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行

			if(data.page.result.length==0){
				$("#" + tableid + " tr:eq(0)").css('display','none');
				$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");//无数据时展现的消息
				return false;
			}//if...end
		
			for ( var i = 0; i < data.page.result.length; i++){
				var rownum = $("#" + tableid + " tr").length - 1;
				var rowstr = "";
				if(data.page.result[i].isimedit==1){	//当需要修改时，显示红色
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
				}else if (i % 2 == 0) {
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
				} else {
					rowstr += "<tr>";
				}
				//--------------------------------------------------------------------------------------Begin【自定义的列占位】【将编辑列放到前面】
				//----------------------------------------------------------------------------------------End【自定义的列占位】【将编辑列放到前面】
				//遍历有多少列
                for ( var z = 0; z < showcom.length; z++){
					//第一列，主键列
					if(showcom[z].key!=undefined && showcom[z].key==true) {
						keyname =showcom[z].name;//alert(showcom[z].key);
					}
					//第二列，隐藏或显示
					rowstr += "<td ";
					if (showcom[z].hidden){
                    	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
					}//if...end	
					//表格居中样式设置值为left、center、right
					if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
						rowstr += " style=' vertical-align:middle; text-align: "+showcom[z].tdCss+";' ";
					}
					
					//----------------------------------------------------------------------------------------------------------------------------begin
					if (showcom[z].flag == 0) {
					
						if (showcom[z].replacevalue.length > 0) {
							rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
							
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}//if...end
							for ( var index in showcom[z].replacevalue) {
								var obj = showcom[z].replacevalue[index][data.page.result[i][showcom[z].name]];
								if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
									rowstr += obj;
								}//if...end
							}//for...end
						} 
						else {
							rowstr += " cell='" + [ showcom[z].name ] + "'>";
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							// @Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
							rowstr+=common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name);
						}//if...else...end	
						
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					}
					
					else if(showcom[z].flag == 1) {
						rowstr += " >";
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span  class='"+showcom[z].css+"' >";
						}
						
						rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
						
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					}
					
					else if(showcom[z].flag ==2){
						rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
						if(showcom[z].method!=""){
							rowstr+="onclick='"+showcom[z].method+"("+data.page.result[i].id+")' ";
						}
						rowstr+="></td>";
					};//if...elseif...elseif....end
				}
				
				//【自定义的列占位】【将编辑列放到后面】----------------------------------------------------------Begin	
				
				if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
					// 选中框
					//rowstr += "<td cell='id'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
					
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>详情</a>";
					}//if...end
					if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
						for(var k=0;k<updatemethod.length;k++){
							rowstr += "<a href='#myModal2' " ;
							if(updatemethod[k].method!=""){
								rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
								//rowstr +="onclick='"+updatemethod[k].method+"('" + (i + 1) + "','"+ data.page.result[i][keyname]+ "');' data-toggle='modal'";//鼠标点击
							}
							if(updatemethod[k].title!=""){
								rowstr +=">"+updatemethod[k].title+"</a> ";
							}
							
						}//for...end
						
					}//if....end
					
					rowstr +="</td>";
					
				}//if....end
				
				//【自定义的列占位】【将编辑列放到后面】----------------------------------------------------------End
				rowstr += "</tr>";
				$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
			};
			if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
				common.prototype.page.tool(data.page, jsmethod);
			}
			
	});//post..end
};

/*--公共PageBase【common.prototype.page.base2】自定义列编辑和删除---------------------------------------------------------------------------------------------------------------------------------------*/
/**基础分页方法2，如果扩展需要每个页面对象自己扩展
 * @author 宋延军
 * @param url 请求的url
 * @param param 参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值 【var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} }; 】
 * @param jsmethod 回调分页的方法
 * @param udpatemethod 自定义操作[ 修改 ]方法
 * @param deletemethod 自定义操作[ 删除 ]方法
 */
common.prototype.page.base2 = function(url, param, tableid, showcom, jsmethod, updatemethod, deletemethod) {
	var keyname="";
	//清理分页
	$('#pagetool').html("");
	$.post(url, param, function(data) {
			//测试：获取返回对象中的对象中的子属性 //alert(data.page.result[0][showcom[1].name].departId); //测试：获取返回对象中的的属性 //alert(data.page.result[0][showcom[0].name]+" "+data.page.result[0][showcom[1].name]);
			if (typeof (data) == "string") {
				data = eval(data);
			}
			$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
			$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行

			if(data.page.result.length==0){
				$("#" + tableid + " tr:eq(0)").css('display','none');
				$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
				return false;
			}//if...end
						
			for ( var i = 0; i < data.page.result.length; i++){
				var rownum = $("#" + tableid + " tr").length - 1;
				var rowstr = "";
				if(data.page.result[i].isimedit==1){	//当需要修改时，显示红色
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
				}else if (i % 2 == 0) {
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
				} else {
					rowstr += "<tr>";
				}
				//--------------------------------------------------------------------------------------Begin【自定义的列占位】【将编辑列放到前面】
				//----------------------------------------------------------------------------------------End【自定义的列占位】【将编辑列放到前面】
				
				//遍历有多少列
                for ( var z = 0; z < showcom.length; z++){
					//第一列，主键列
					if(showcom[z].key!=undefined && showcom[z].key==true) {
						keyname =showcom[z].name;//alert(showcom[z].key);
					}
					//第二列，隐藏或显示
					rowstr += "<td ";
					if (showcom[z].hidden){
                    	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
					}//if...end	
					//表格居中样式设置值为left、center、right
					if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
						rowstr += " style=' vertical-align:middle; text-align: "+showcom[z].tdCss+";' ";
					}
					
					//----------------------------------------------------------------------------------------------------------------------------begin
					if (showcom[z].flag == 0){
						if (showcom[z].replacevalue.length > 0) {
							rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
							
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}//if...end
							for ( var index in showcom[z].replacevalue){
								var obj = showcom[z].replacevalue[index][data.page.result[i][showcom[z].name]];
								if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
									rowstr += obj;
								}//if...end
							}//for...end
						} 
						else{
							rowstr += " cell='" + [ showcom[z].name ] + "'>";
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							// @Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
							rowstr+=common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name);
						}//if...else...end	
								
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					} 
					//----------------------------------------------------------------------------------------------------------------------------end
				
					else if(showcom[z].flag == 1){
						rowstr += " >";
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span  class='"+showcom[z].css+"' >";
						}
						
						rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
							
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					}
					
					else if(showcom[z].flag == 2){
						rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
						if(showcom[z].method!=""){
							rowstr+="onclick='"+showcom[z].method+"("+data.page.result[i].id+")' ";
						}
						rowstr+="></td>";
						
					};//if...elseif...elseif....end
				}
			
				//【自定义的列占位】【将编辑列放到后面】----------------------------------------------------------Begin							
				rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
			
				//-----------------------------------------------------------------------------------------Begin
				/*编辑*/
				if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
					// 选中框
					//rowstr += "<td cell='id'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
					if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
						for(var k=0;k<updatemethod.length;k++){
							rowstr += "<a href='#myModal2' " ;
							if(updatemethod[k].method!=""){
								rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
							}
							if(updatemethod[k].title!=""){
								rowstr +=">"+updatemethod[k].title+"</a>";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
				}//if....end
				
				/*删除*/
				if(deletemethod!="" && deletemethod!='undefined' && deletemethod!=undefined){
		        	if(typeof(deletemethod)=='string' || typeof(deletemethod)=='String' || typeof(deletemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ deletemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(deletemethod)=='object' || typeof(deletemethod)=='Object' || typeof(deletemethod)=='OBJECT'){
						for(var k=0;k<deletemethod.length;k++){
							rowstr += "&nbsp;|&nbsp;" ;
							rowstr += "<a href='#' " ;
							if(deletemethod[k].method!=""){
								rowstr +="onclick="+deletemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') ";//鼠标悬停
							}
							if(deletemethod[k].title!=""){
								rowstr +=">"+deletemethod[k].title+"</a> ";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
								    	
				}//if....end
				//-----------------------------------------------------------------------------------------End
				
				rowstr +="</td>";
				//【自定义的列占位】【将编辑列放到后面】 ---------------------------------------------------------End
				rowstr += "</tr>";
				$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
			};
	
			if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
				common.prototype.page.tool(data.page, jsmethod);
			}
	});

};

/*--公共PageBase【common.prototype.page.base3】自定义列编辑和删除（扩展可在字段上附加连接操作）---------------------------------------------------------------------------------------------------*/
/**基础分页方法3，如果扩展需要每个页面对象自己扩展（扩展可在字段上附加连接操作）
 * @author 宋延军
 * @param url 请求的url
 * @param param 参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值 【var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} }; 】
 * @param jsmethod 回调分页的方法
 * @param udpatemethod 自定义操作[ 修改 ]方法
 * @param deletemethod 自定义操作[ 删除 ]方法
 */
common.prototype.page.base3 = function(url, param, tableid, showcom, jsmethod, updatemethod, deletemethod) {
	var keyname="";
	//清理分页
	$('#pagetool').html("");
	$.post(url, param, function(data) {
			//测试：获取返回对象中的对象中的子属性 //alert(data.page.result[0][showcom[1].name].departId); //测试：获取返回对象中的的属性 //alert(data.page.result[0][showcom[0].name]+" "+data.page.result[0][showcom[1].name]);
			if (typeof (data) == "string") {
				data = eval(data);
			}
			$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
			$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行

			if(data.page.result.length==0){
				$("#" + tableid + " tr:eq(0)").css('display','none');
				$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
				return false;
			}//if...end
						
			for ( var i = 0; i < data.page.result.length; i++){
				var rownum = $("#" + tableid + " tr").length - 1;
				var rowstr = "";
				if(data.page.result[i].isimedit==1){	//当需要修改时，显示红色
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
				}else if (i % 2 == 0) {
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
				} else {
					rowstr += "<tr>";
				}
				//--------------------------------------------------------------------------------------Begin【自定义的列占位】【将编辑列放到前面】
				//----------------------------------------------------------------------------------------End【自定义的列占位】【将编辑列放到前面】
				
				//遍历有多少列
                for ( var z = 0; z < showcom.length; z++){
					//第一列，主键列
					if(showcom[z].key!=undefined && showcom[z].key==true) {
						keyname =showcom[z].name;//alert(showcom[z].key);
					}
					//第二列，隐藏或显示
					rowstr += "<td ";
					if (showcom[z].hidden){
                    	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
					}//if...end	
					//表格居中样式设置值为left、center、right
					if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
						rowstr += " style=' vertical-align:middle; text-align: "+showcom[z].tdCss+";' ";
					}
					
					//添加对字段的连接@Steven2014.09.25日------------------------------------------------------------------------------------------------begin
					if (showcom[z].flag == 0) {
										
						if (showcom[z].replacevalue.length > 0) {
							rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
						}
						else{
							rowstr += " cell='" + [ showcom[z].name ] + "'>";
						}	
						
						//----------------------------------------------------------------------------------------------------2014.09.25
						if(showcom[z].click!=undefined){
							var _obj = showcom[z].click;
							if(typeof(_obj.param)=='string'){
								if(_obj.staticparam==undefined){
									rowstr += " <a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"') >";
								}else{
									rowstr += "  <a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"','"+_obj.staticparam+"') >";
								}
							}else{
								var params = "";
								for(var l = 0 ; l<_obj.param.length;l++){
									params+="'"+data.page.result[i][_obj.param[l].name]+"'";
									if((l+1)<_obj.param.length){
										params+=",";
									}
								}
								if(_obj.staticparam==undefined){
									rowstr += "<a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"("+params+") >"; 
								}else{
									rowstr += "<a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"("+params+",'"+_obj.staticparam+"')>"; 
								}
							}
						}
						//----------------------------------------------------------------------------------------------------2014.09.25
						if (showcom[z].replacevalue.length > 0) {
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							for ( var index in showcom[z].replacevalue) {
								var obj = showcom[z].replacevalue[index][data.page.result[i][showcom[z].name]];
								if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
									rowstr += obj;
								}
							}
									
						} 
						else {
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							//@Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
							rowstr+=common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name);
						}//if...else...end	
									
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						if(showcom[z].click!=undefined){
							rowstr += "</a>";
						}
						rowstr += "</td>";
																	
					} 
					//添加对字段的连接@Steven2014.09.25日------------------------------------------------------------------------------------------------end
				
					else if(showcom[z].flag == 1){
						rowstr += " >";
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span  class='"+showcom[z].css+"' >";
						}
						
						rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
							
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					}
					
					else if(showcom[z].flag == 2){
						rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
						if(showcom[z].method!=""){
							rowstr+="onclick='"+showcom[z].method+"("+data.page.result[i].id+")' ";
						}
						rowstr+="></td>";
						
					};//if...elseif...elseif....end
				}
			
				//2014-11-04 steven update code........
				//【自定义的列占位】【将编辑列放到后面】----------------------------------------------------------Begin							
				//rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
			
				//-----------------------------------------------------------------------------------------Begin
				/*编辑*/
				if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					
					
					// 选中框
					//rowstr += "<td cell='id'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
					if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
						for(var k=0;k<updatemethod.length;k++){
							rowstr += "<a href='#myModal2' " ;
							if(updatemethod[k].method!=""){
								rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
							}
							if(updatemethod[k].title!=""){
								rowstr +=">"+updatemethod[k].title+"</a>";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
					
					
					rowstr +="</td>";
					
				}//if....end
				else if (updatemethod=="") {
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>&nbsp;</td>";
				}
				/*删除*/
				if(deletemethod!="" && deletemethod!='undefined' && deletemethod!=undefined){
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					
		        	if(typeof(deletemethod)=='string' || typeof(deletemethod)=='String' || typeof(deletemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ deletemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(deletemethod)=='object' || typeof(deletemethod)=='Object' || typeof(deletemethod)=='OBJECT'){
						for(var k=0;k<deletemethod.length;k++){
							rowstr += "&nbsp;|&nbsp;" ;
							rowstr += "<a href='#' " ;
							if(deletemethod[k].method!=""){
								rowstr +="onclick="+deletemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') ";//鼠标悬停
							}
							if(deletemethod[k].title!=""){
								rowstr +=">"+deletemethod[k].title+"</a> ";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
					
					rowstr +="</td>";
				}//if....end
				
				//-----------------------------------------------------------------------------------------End
				//2014-11-04 steven update code.....
				//rowstr +="</td>";
				
				//【自定义的列占位】【将编辑列放到后面】 ---------------------------------------------------------End
				rowstr += "</tr>";
				$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
			};
	
			if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
				common.prototype.page.tool(data.page, jsmethod);
			}
	});

};

/*--公共PageBase【common.prototype.page.base4】自定义列编辑和删除（扩展可在字段上附加连接操作 + 自定义分页ID）---------------------------------------------------------------------------------*/
/**基础分页方法4，如果扩展需要每个页面对象自己扩展（扩展可在字段上附加连接操作 + 自定义分页ID）
 * @author 宋延军
 * @param pageUlId 自定义分页ID
 * @param url 请求的url
 * @param param 参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值 【var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} }; 】
 * @param jsmethod 回调分页的方法
 * @param udpatemethod 自定义操作[ 修改 ]方法
 * @param deletemethod 自定义操作[ 删除 ]方法
 */
common.prototype.page.base4 = function(pageUlId, url, param, tableid, showcom, jsmethod, updatemethod, deletemethod) {
	var keyname="";
	//清理分页
	$('#'+pageUlId).html("");
	$.post(url, param, function(data) {
			//测试：获取返回对象中的对象中的子属性 //alert(data.page.result[0][showcom[1].name].departId); //测试：获取返回对象中的的属性 //alert(data.page.result[0][showcom[0].name]+" "+data.page.result[0][showcom[1].name]);
			if (typeof (data) == "string") {
				data = eval(data);
			}
			$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
			$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行

			if(data.page.result.length==0){
				$("#" + tableid + " tr:eq(0)").css('display','none');
				$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
				return false;
			}//if...end
						
			for ( var i = 0; i < data.page.result.length; i++){
				var rownum = $("#" + tableid + " tr").length - 1;
				var rowstr = "";
				if(data.page.result[i].isimedit==1){	//当需要修改时，显示红色
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
				}else if (i % 2 == 0) {
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
				} else {
					rowstr += "<tr>";
				}
				//--------------------------------------------------------------------------------------Begin【自定义的列占位】【将编辑列放到前面】
				//----------------------------------------------------------------------------------------End【自定义的列占位】【将编辑列放到前面】
				
				//遍历有多少列
                for ( var z = 0; z < showcom.length; z++){
					//第一列，主键列
					if(showcom[z].key!=undefined && showcom[z].key==true) {
						keyname =showcom[z].name;//alert(showcom[z].key);
					}
					//第二列，隐藏或显示
					rowstr += "<td ";
					if (showcom[z].hidden){
                    	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
					}//if...end	
					//表格居中样式设置值为left、center、right
					if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
						rowstr += " style=' vertical-align:middle; text-align: "+showcom[z].tdCss+";' ";
					}
					
					//添加对字段的连接@Steven2014.09.25日------------------------------------------------------------------------------------------------begin
					if (showcom[z].flag == 0) {
										
						if (showcom[z].replacevalue.length > 0) {
							rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
						}
						else{
							rowstr += " cell='" + [ showcom[z].name ] + "'>";
						}	
						
						//----------------------------------------------------------------------------------------------------2014.09.25
						if(showcom[z].click!=undefined){
							var _obj = showcom[z].click;
							if(typeof(_obj.param)=='string'){
								if(_obj.staticparam==undefined){
									rowstr += " <a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"') >";
								}else{
									rowstr += "  <a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"','"+_obj.staticparam+"') >";
								}
							}else{
								var params = "";
								for(var l = 0 ; l<_obj.param.length;l++){
									params+="'"+data.page.result[i][_obj.param[l].name]+"'";
									if((l+1)<_obj.param.length){
										params+=",";
									}
								}
								if(_obj.staticparam==undefined){
									rowstr += "<a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"("+params+") >"; 
								}else{
									rowstr += "<a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"("+params+",'"+_obj.staticparam+"')>"; 
								}
							}
						}
						//----------------------------------------------------------------------------------------------------2014.09.25
						if (showcom[z].replacevalue.length > 0) {
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							for ( var index in showcom[z].replacevalue) {
								var obj = showcom[z].replacevalue[index][data.page.result[i][showcom[z].name]];
								if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
									rowstr += obj;
								}
							}
									
						} 
						else {
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							//@Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
							rowstr+=common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name);
						}//if...else...end	
									
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						if(showcom[z].click!=undefined){
							rowstr += "</a>";
						}
						rowstr += "</td>";
																	
					} 
					//添加对字段的连接@Steven2014.09.25日------------------------------------------------------------------------------------------------end
				
					else if(showcom[z].flag == 1){
						rowstr += " >";
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span  class='"+showcom[z].css+"' >";
						}
						
						rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
							
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					}
					
					else if(showcom[z].flag == 2){
						rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
						if(showcom[z].method!=""){
							rowstr+="onclick='"+showcom[z].method+"("+data.page.result[i].id+")' ";
						}
						rowstr+="></td>";
						
					};//if...elseif...elseif....end
				}
			
				//2014-11-04 steven update code........
				//【自定义的列占位】【将编辑列放到后面】----------------------------------------------------------Begin							
				//rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
			
				//-----------------------------------------------------------------------------------------Begin
				/*编辑*/
				if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					
					
					// 选中框
					//rowstr += "<td cell='id'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
					if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
						for(var k=0;k<updatemethod.length;k++){
							rowstr += "<a href='#myModal2' " ;
							if(updatemethod[k].method!=""){
								rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
							}
							if(updatemethod[k].title!=""){
								rowstr +=">"+updatemethod[k].title+"</a>";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
					
					
					rowstr +="</td>";
					
				}//if....end
				
				/*删除*/
				if(deletemethod!="" && deletemethod!='undefined' && deletemethod!=undefined){
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					
		        	if(typeof(deletemethod)=='string' || typeof(deletemethod)=='String' || typeof(deletemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ deletemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(deletemethod)=='object' || typeof(deletemethod)=='Object' || typeof(deletemethod)=='OBJECT'){
						for(var k=0;k<deletemethod.length;k++){
							rowstr += "&nbsp; &nbsp;" ;//@steven2015.01.26update
							rowstr += "<a href='#' " ;
							if(deletemethod[k].method!=""){
								rowstr +="onclick="+deletemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') ";//鼠标悬停
							}
							if(deletemethod[k].title!=""){
								rowstr +=">"+deletemethod[k].title+"</a> ";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
					
					rowstr +="</td>";
				}//if....end
				//-----------------------------------------------------------------------------------------End
				//2014-11-04 steven update code.....
				//rowstr +="</td>";
				
				//【自定义的列占位】【将编辑列放到后面】 ---------------------------------------------------------End
				rowstr += "</tr>";
				$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
			};
	
			if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
				common.prototype.page.tool2(pageUlId,data.page, jsmethod);
			}
	});

};





/*--公共PageBase【common.prototype.page.base5】自定义列编辑和删除（扩展可在字段上附加连接操作 + 自定义分页ID + 查询分类代码）---------------------------------------------------------------------------------*/
/**基础分页方法5，如果扩展需要每个页面对象自己扩展（扩展可在字段上附加连接操作 + 自定义分页ID）
 * @author 宋延军
 * @param pageUlId 自定义分页ID
 * @param url 请求的url
 * @param param 参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值 【var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} }; 】
 * @param jsmethod 回调分页的方法
 * @param udpatemethod 自定义操作[ 修改 ]方法
 * @param deletemethod 自定义操作[ 删除 ]方法
 * @param querycode 查询参数代码
 */
common.prototype.page.base5 = function(pageUlId, url, param, tableid, showcom, jsmethod, updatemethod, deletemethod, querycode) {
	var keyname="";
	//清理分页
	$('#'+pageUlId).html("");
	$.post(url, param, function(data) {
			//测试：获取返回对象中的对象中的子属性 //alert(data.page.result[0][showcom[1].name].departId); //测试：获取返回对象中的的属性 //alert(data.page.result[0][showcom[0].name]+" "+data.page.result[0][showcom[1].name]);
			if (typeof (data) == "string") {
				data = eval(data);
			}
			$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
			$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行

			if(data.page.result.length==0){
				$("#" + tableid + " tr:eq(0)").css('display','none');
				$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
				return false;
			}//if...end
						
			for ( var i = 0; i < data.page.result.length; i++){
				var rownum = $("#" + tableid + " tr").length - 1;
				var rowstr = "";
				if(data.page.result[i].isimedit==1){	//当需要修改时，显示红色
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
				}else if (i % 2 == 0) {
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
				} else {
					rowstr += "<tr>";
				}
				//--------------------------------------------------------------------------------------Begin【自定义的列占位】【将编辑列放到前面】
				//----------------------------------------------------------------------------------------End【自定义的列占位】【将编辑列放到前面】
				
				//遍历有多少列
                for ( var z = 0; z < showcom.length; z++){
					//第一列，主键列
					if(showcom[z].key!=undefined && showcom[z].key==true) {
						keyname =showcom[z].name;//alert(showcom[z].key);
					}
					//第二列，隐藏或显示
					rowstr += "<td ";
					if (showcom[z].hidden){
                    	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
					}//if...end	
					//表格居中样式设置值为left、center、right
					if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
						rowstr += " style=' vertical-align:middle; text-align: "+showcom[z].tdCss+";' ";
					}
					
					//添加对字段的连接@Steven2014.09.25日------------------------------------------------------------------------------------------------begin
					if (showcom[z].flag == 0) {
										
						if (showcom[z].replacevalue.length > 0) {
							rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
						}
						else{
							rowstr += " cell='" + [ showcom[z].name ] + "'>";
						}	
						
						//----------------------------------------------------------------------------------------------------2014.09.25
						if(showcom[z].click!=undefined){
							var _obj = showcom[z].click;
							if(typeof(_obj.param)=='string'){
								if(_obj.staticparam==undefined){
									rowstr += " <a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"') >";
								}else{
									rowstr += "  <a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"','"+_obj.staticparam+"') >";
								}
							}else{
								var params = "";
								for(var l = 0 ; l<_obj.param.length;l++){
									params+="'"+data.page.result[i][_obj.param[l].name]+"'";
									if((l+1)<_obj.param.length){
										params+=",";
									}
								}
								if(_obj.staticparam==undefined){
									rowstr += "<a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"("+params+") >"; 
								}else{
									rowstr += "<a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"("+params+",'"+_obj.staticparam+"')>"; 
								}
							}
						}
						//----------------------------------------------------------------------------------------------------2014.09.25
						if (showcom[z].replacevalue.length > 0) {
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							for ( var index in showcom[z].replacevalue) {
								var obj = showcom[z].replacevalue[index][data.page.result[i][showcom[z].name]];
								if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
									rowstr += obj;
								}
							}
									
						} 
						else {
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							//@Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
							rowstr+=common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name);
						}//if...else...end	
									
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						if(showcom[z].click!=undefined){
							rowstr += "</a>";
						}
						rowstr += "</td>";
																	
					} 
					//添加对字段的连接@Steven2014.09.25日------------------------------------------------------------------------------------------------end
				
					else if(showcom[z].flag == 1){
						rowstr += " >";
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span  class='"+showcom[z].css+"' >";
						}
						
						rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
							
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					}
					
					else if(showcom[z].flag == 2){
						rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
						if(showcom[z].method!=""){
							rowstr+="onclick='"+showcom[z].method+"("+data.page.result[i].id+")' ";
						}
						rowstr+="></td>";
						
					};//if...elseif...elseif....end
				}
			
				//2014-11-04 steven update code........
				//【自定义的列占位】【将编辑列放到后面】----------------------------------------------------------Begin							
				//rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
			
				//-----------------------------------------------------------------------------------------Begin
				/*编辑*/
				if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					
					
					// 选中框
					//rowstr += "<td cell='id'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
					if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
						for(var k=0;k<updatemethod.length;k++){
							rowstr += "<a href='#myModal2' " ;
							if(updatemethod[k].method!=""){
								rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
							}
							if(updatemethod[k].title!=""){
								rowstr +=">"+updatemethod[k].title+"</a>";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
					
					
					rowstr +="</td>";
					
				}//if....end
				
				/*删除*/
				if(deletemethod!="" && deletemethod!='undefined' && deletemethod!=undefined){
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					
		        	if(typeof(deletemethod)=='string' || typeof(deletemethod)=='String' || typeof(deletemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ deletemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(deletemethod)=='object' || typeof(deletemethod)=='Object' || typeof(deletemethod)=='OBJECT'){
						for(var k=0;k<deletemethod.length;k++){
							rowstr += "&nbsp; &nbsp;" ;//@steven2015.01.26update
							rowstr += "<a href='#' " ;
							if(deletemethod[k].method!=""){
								rowstr +="onclick="+deletemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') ";//鼠标悬停
							}
							if(deletemethod[k].title!=""){
								rowstr +=">"+deletemethod[k].title+"</a> ";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
					
					rowstr +="</td>";
				}//if....end
				//-----------------------------------------------------------------------------------------End
				//2014-11-04 steven update code.....
				//rowstr +="</td>";
				
				//【自定义的列占位】【将编辑列放到后面】 ---------------------------------------------------------End
				rowstr += "</tr>";
				$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
			};
	
			if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
				common.prototype.page.tool5(pageUlId, data.page, jsmethod, querycode);
			}
	});

};
/*--公共PageBase【common.prototype.page.base6】自定义列编辑和删除（扩展可在字段上附加连接操作 + 自定义分页ID + 查询分类代码）---------------------------------------------------------------------------------*/
/**基础分页方法6，如果扩展需要每个页面对象自己扩展（扩展可在字段上附加连接操作 + 自定义分页ID）
 * @author 宋延军
 * @param pageUlId 自定义分页ID
 * @param url 请求的url
 * @param param 参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值 【var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} }; 】
 * @param jsmethod 回调分页的方法
 * @param udpatemethod 自定义操作[ 修改 ]方法
 * @param deletemethod 自定义操作[ 删除 ]方法
 * @param querycode 查询参数代码
 */
common.prototype.page.base6 = function(pageUlId, url, param, tableid, showcom, jsmethod, updatemethod, deletemethod, querycode) {
	var keyname="";
	//清理分页
	$('#'+pageUlId).html("");
	$.post(url, param, function(data) {
			//测试：获取返回对象中的对象中的子属性 //alert(data.page.result[0][showcom[1].name].departId); //测试：获取返回对象中的的属性 //alert(data.page.result[0][showcom[0].name]+" "+data.page.result[0][showcom[1].name]);
			if (typeof (data) == "string") {
				data = eval(data);
			}
			$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
			$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行

			if(data.page.result.length==0){
				$("#" + tableid + " tr:eq(0)").css('display','none');
				$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
				return false;
			}//if...end
						
			for ( var i = 0; i < data.page.result.length; i++){
				var rownum = $("#" + tableid + " tr").length - 1;
				var rowstr = "";
				if(data.page.result[i].isimedit==1){	//当需要修改时，显示红色
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
				}else if (i % 2 == 0) {
					rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
				} else {
					rowstr += "<tr>";
				}
				//--------------------------------------------------------------------------------------Begin【自定义的列占位】【将编辑列放到前面】
				rowstr += "<td cell='id' style='text-align:center;'><input  id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
				//----------------------------------------------------------------------------------------End【自定义的列占位】【将编辑列放到前面】
				
				//遍历有多少列
                for ( var z = 0; z < showcom.length; z++){
					//第一列，主键列
					if(showcom[z].key!=undefined && showcom[z].key==true) {
						keyname =showcom[z].name;//alert(showcom[z].key);
					}
					//第二列，隐藏或显示
					rowstr += "<td ";
					if (showcom[z].hidden){
                    	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
					}//if...end	
					//表格居中样式设置值为left、center、right
					if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
						rowstr += " style=' vertical-align:middle; text-align: "+showcom[z].tdCss+";' ";
					}
					
					//添加对字段的连接@Steven2014.09.25日------------------------------------------------------------------------------------------------begin
					if (showcom[z].flag == 0) {
										
						if (showcom[z].replacevalue.length > 0) {
							rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data.page.result[i][showcom[z].name] + "'>";
						}
						else{
							rowstr += " cell='" + [ showcom[z].name ] + "'>";
						}	
						
						//----------------------------------------------------------------------------------------------------2014.09.25
						if(showcom[z].click!=undefined){
							var _obj = showcom[z].click;
							if(typeof(_obj.param)=='string'){
								if(_obj.staticparam==undefined){
									rowstr += " <a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"') >";
								}else{
									rowstr += "  <a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"('"+data.page.result[i][_obj.param]+"','"+_obj.staticparam+"') >";
								}
							}else{
								var params = "";
								for(var l = 0 ; l<_obj.param.length;l++){
									params+="'"+data.page.result[i][_obj.param[l].name]+"'";
									if((l+1)<_obj.param.length){
										params+=",";
									}
								}
								if(_obj.staticparam==undefined){
									rowstr += "<a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"("+params+") >"; 
								}else{
									rowstr += "<a data-toggle='modal' href='#myModal2_2' onclick="+_obj.method+"("+params+",'"+_obj.staticparam+"')>"; 
								}
							}
						}
						//----------------------------------------------------------------------------------------------------2014.09.25
						if (showcom[z].replacevalue.length > 0) {
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							for ( var index in showcom[z].replacevalue) {
								var obj = showcom[z].replacevalue[index][data.page.result[i][showcom[z].name]];
								if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
									rowstr += obj;
								}
							}
									
						} 
						else {
							if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
								rowstr+="<span  class='"+showcom[z].css+"' >";
							}
							//@Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
							rowstr+=common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data.page.result[i],showcom[z].name);
						}//if...else...end	
									
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						if(showcom[z].click!=undefined){
							rowstr += "</a>";
						}
						rowstr += "</td>";
																	
					} 
					//添加对字段的连接@Steven2014.09.25日------------------------------------------------------------------------------------------------end
				
					else if(showcom[z].flag == 1){
						rowstr += " >";
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr+="<span  class='"+showcom[z].css+"' >";
						}
						
						rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
							
						if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
							rowstr += " </span>";	
						}
						rowstr += "</td>";
					}
					
					else if(showcom[z].flag == 2){
						rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
						if(showcom[z].method!=""){
							rowstr+="onclick='"+showcom[z].method+"("+data.page.result[i].id+")' ";
						}
						rowstr+="></td>";
						
					};//if...elseif...elseif....end
				}
			
				//2014-11-04 steven update code........
				//【自定义的列占位】【将编辑列放到后面】----------------------------------------------------------Begin							
				//rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
			
				//-----------------------------------------------------------------------------------------Begin
				/*编辑*/
				if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					
					
					// 选中框
					//rowstr += "<td cell='id'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
					if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
						for(var k=0;k<updatemethod.length;k++){
							rowstr += "<a href='#myModal2' " ;
							if(updatemethod[k].method!=""){
								rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') data-toggle='modal'";//鼠标悬停
							}
							if(updatemethod[k].title!=""){
								rowstr +=">"+updatemethod[k].title+"</a>";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
					
					
					rowstr +="</td>";
					
				}//if....end
				
				/*删除*/
				if(deletemethod!="" && deletemethod!='undefined' && deletemethod!=undefined){
					rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
					
		        	if(typeof(deletemethod)=='string' || typeof(deletemethod)=='String' || typeof(deletemethod)=='STRING'){
						rowstr += "<a href='#' onclick='"+ deletemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>操作</a>";
					}//if...end
					if(typeof(deletemethod)=='object' || typeof(deletemethod)=='Object' || typeof(deletemethod)=='OBJECT'){
						for(var k=0;k<deletemethod.length;k++){
							rowstr += "&nbsp; &nbsp;" ;//@steven2015.01.26update
							rowstr += "<a href='#' " ;
							if(deletemethod[k].method!=""){
								rowstr +="onclick="+deletemethod[k].method+"(" + (i + 1) + ",'"+ data.page.result[i][keyname]+ "') ";//鼠标悬停
							}
							if(deletemethod[k].title!=""){
								rowstr +=">"+deletemethod[k].title+"</a> ";
							}
							//alert(rowstr);
						}//for...end
					}//if....end
					
					rowstr +="</td>";
				}//if....end
				//-----------------------------------------------------------------------------------------End
				//2014-11-04 steven update code.....
				//rowstr +="</td>";
				
				//【自定义的列占位】【将编辑列放到后面】 ---------------------------------------------------------End
				rowstr += "</tr>";
				$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
			};
	
			if (jsmethod!="" && jsmethod!='undefined' && jsmethod!=undefined) {
				common.prototype.page.tool5(pageUlId, data.page, jsmethod, querycode);
			}
	});

};
/**页面分页工具栏3【四个参数】
 * @author 宋延军
 * @param {} pageId
 * @param {} obj Controller返回的页面page对象
 * @param {} url 分页函数，需要每个页面对象自己实现
 * @param {} querycode 分类查询代码
 */
common.prototype.page.tool5 = function(pageId, obj, url, querycode) {
	if ($("#"+pageId)  != undefined) {
		options = {
			size:"small",
			bootstrapMajorVersion:3,
			currentPage: obj.currentPage,
			totalPages:obj.totalPage,
			numberOfPages: 5,
			onPageClicked: function(e,originalEvent,type,page){  },
			onPageChanged: function(e,oldPage,newPage){  eval(url+"("+newPage+","+querycode+")");   $(this).attr("alt", newPage);  },
			useBootstrapTooltip:false,
			itemTexts: function (type, page, current) { switch (type) { case "first": return "首页"; case "prev": return "前一页"; case "next":  return "下一页"; case "last":  return "末页"; case "page": return page; } },
			bootstrapTooltipOptions: { html: true, placement: 'bottom' }
		};
		$('#'+pageId).bootstrapPaginator(options);
	}
};



/*@steven2014.12.28周日created code. begin--------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/**静态数据列表
 * @author 宋延军
 * @param {} data 传入的静态集合对象
 * @param param 参数 数组对象
 * @param tableid table表单元素id
 * @param showcom 需要显示的元素数组 flag = 0 显示对象中的值，flag =1 中的值显示默认值 var showcom = { {name='mailAddr',flag = 0 ,defaultvalue=''}, {name='mailAddr',flag = 0 ,defaultvalue=''} };
 * @param jsmethod
 * @param udpatemethod 修改方法的名称
 * @return {Boolean}
 */
common.prototype.page.basestaticdata = function(data,param, tableid, showcom, jsmethod, updatemethod) {
	var keyname="";
	if (typeof (data) == "string") {
		data = eval("(" + data + ")");  
	}
	$("#" + tableid + " tr:not(:eq(0))").remove();// 删除第一行外的所有行
	$("#" + tableid + " tr:eq(0)").css('display','');//eq(0)表示第一个table， 里面的tr:even表示偶数行
	if(data.length==0){
		$("#" + tableid + " tr:eq(0)").css('display','none');
		$("#"+tableid).append("<tr><td>不存在数据，请确认！</td></tr>");
		return false;
	}//if...end
	for ( var i = 0; i < data.length; i++) {
		var rownum = $("#" + tableid + " tr").length - 1;
		var rowstr = "";
		if(data[i].isimedit==1){	//当需要修改时，显示红色
			rowstr += "<tr>";//rowstr += " <tr style='background-color:#FF8080;'>";
		}else if (i % 2 == 0) {
			rowstr += "<tr>";//rowstr += " <tr style='background-color:#f6f6f6'>";
		} else {
			rowstr += "<tr>";
		}
		//【自定义的列占位】【将编辑列放到前面】----------------------------------------------------------------------------------------Begin 
		//【自定义的列占位】【将编辑列放到前面】----------------------------------------------------------------------------------------End
							
		//遍历有多少列
        for ( var z = 0; z < showcom.length; z++) {
			//第一列，主键列
			if(showcom[z].key!=undefined && showcom[z].key==true) {
				keyname =showcom[z].name;//alert(showcom[z].key);
			}
			//第二列，隐藏或显示
			rowstr += "<td ";
			if (showcom[z].hidden) {
            	rowstr += " style='display:none;' "; //rowstr += " style='display:black;' ";
			}//if...end	
			//表格居中样式设置值为left、center、right
			if(showcom[z].tdCss!=undefined && showcom[z].tdCss!='undefined' && showcom[z].tdCss!=''){
				rowstr += " style=' vertical-align:middle; text-align: "+showcom[z].tdCss+";' ";
			}
			if (showcom[z].flag == 0) {
				if (showcom[z].replacevalue.length > 0) {
					rowstr += " cell='" + [ showcom[z].name ] + "' realvalue='" + data[i][showcom[z].name] + "'>";
					if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
						rowstr+="<span  class='"+showcom[z].css+"' >";
					}//if...end
					for ( var index in showcom[z].replacevalue) {
						var obj = showcom[z].replacevalue[index][data[i][showcom[z].name]];
						if (obj != "undefined" && obj != undefined && obj != 'null' && obj != null) {
							rowstr += obj;
						}//if...end
					}//for...end
				} else {
					rowstr += " cell='" + [ showcom[z].name ] + "'>";
					if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
						rowstr+="<span  class='"+showcom[z].css+"' >";
					}
					//var obj1 = ;//alert("OBJ1-------"+obj1);
					// 检查 obj 的类型。
					// @Steven 判断获取到的值是否为空，如果为空则替换为空字符串。
					rowstr+=common.prototype.page.baseObjectValue(data[i],showcom[z].name)==null?"":common.prototype.page.baseObjectValue(data[i],showcom[z].name);
				}//if...else...end	
								
				if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
					rowstr += " </span>";	
				}
				rowstr += "</td>";
			} else if(showcom[z].flag == 1) {
				rowstr += " >";
				if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
					rowstr+="<span  class='"+showcom[z].css+"' >";
				}
				rowstr +=((showcom[z].defaultvalue == 'null' || showcom[z].defaultvalue == null) ? '': showcom[z].defaultvalue);
				if(showcom[z].css!=undefined && showcom[z].css!='undefined' && showcom[z].css!=''){
					rowstr += " </span>";	
				}
				rowstr += "</td>";
			} else if(showcom[z].flag ==2){
				rowstr+="><img src='"+showcom[z].src+"' style='cursor:hand;' ";
				if(showcom[z].method!=""){
					rowstr+="onclick='"+showcom[z].method+"("+data[i].id+")' ";
				}
				rowstr+="></td>";
			}
		}
		//【自定义的列占位】【将编辑列放到后面】----------------------------------------------------------------------------------------------------------------------------------Begin
		if(updatemethod!="" && updatemethod!='undefined' && updatemethod!=undefined){
			// 选中框
			//rowstr += "<td cell='id'><input id='checkbox_" + i + "' name='checkbox_id" + "' type='checkbox' value='" + data.page.result[i].id + "' /></td>";
			rowstr +="<td style=' vertical-align:middle; text-align:center;'>";
            if(typeof(updatemethod)=='string' || typeof(updatemethod)=='String' || typeof(updatemethod)=='STRING'){
				rowstr += "<a href='#' onclick='"+ updatemethod + "(" + (i + 1) + ","+ data.page.result[i][keyname]+ ");'>详情</a>";
            }//if...end
            if(typeof(updatemethod)=='object' || typeof(updatemethod)=='Object' || typeof(updatemethod)=='OBJECT'){
            	for(var k=0;k<updatemethod.length;k++){
                	rowstr += "<a href='#' " ;//@steven2015.01.26update
                    if(updatemethod[k].method!=""){
                    	rowstr +="onclick="+updatemethod[k].method+"(" + (i + 1) + ",'"+ data[i][keyname]+ "') ";//鼠标悬停
                     	//rowstr +="onclick='"+updatemethod[k].method+"('" + (i + 1) + "','"+ data.page.result[i][keyname]+ "');' data-toggle='modal'";//鼠标点击
                    }
                    if(updatemethod[k].title!=""){
                    	rowstr +=">"+updatemethod[k].title+"</a> ";
                    }
                }//for...end
			}//if....end
			rowstr +="</td>";
		}//if....end
		
		//【自定义的列占位】【将编辑列放到后面】 ----------------------------------------------------------------------------------------------------------------------------------End
		rowstr += "</tr>";
								
		$(rowstr).insertAfter($("#"+tableid+" tr:eq(" + rownum + ")"));
		//alert("2---------\r\n");
	}
};
/*@steven2014.12.28周日created code. end------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */

/**递归函数
 * @author 宋延军
 * @param obj 对象
 * @param paramname 获取属性的名称获取字符串
 * @return {}
 */
common.prototype.page.baseObjectValue=function(obj, paramname){
	var params = paramname.split('.');
	if(params.length==1){
		return common.prototype.page.baseCoreObjectValue(obj,params[0]);
	}else{
	    return common.prototype.page.baseObjectValue(obj[params[0]],paramname.substring(params[0].length+1,paramname.length));
	}
};

/**获取对象的属性值
 * @author 宋延军
 * @param obj 对象 或者属性名
 * @param paramname 获取属性的名称
 * @return {}
 */
common.prototype.page.baseCoreObjectValue=function(obj,paramname){
	if(typeof(obj)=='object'){
		return obj[paramname];
	}else{	
		return obj==null?"":obj;
	}
};

/**将字符串转换为日期型（如果字符串为空，则返回当前日期）【调用示例：var createDate	= common.prototype.page.converStrToDate($("#createDate1").val());】
 * @author  宋延军2014.09.25
 * @param {} str 【字符串格式为 'yyyy-MM-dd' 】
 * @return {} Date
 */
common.prototype.page.converStrToDate = function(str){
	if(str!=""){
		var tempStrs = str.split(" ");
	 	var dateStrs = tempStrs[0].split("-");
	 	var year = parseInt(dateStrs[0], 10);
	 	var month = parseInt(dateStrs[1], 10) - 1;
	 	var day = parseInt(dateStrs[2], 10);
		var date = new Date(year, month, day);
		return date;
	}
	else{
		var newdate = new Date();
		return newdate;
	}
};

/**将日期类型转换为字符串类型【调用示例：var taskCompleteDate = common.prototype.page.converDateToStr(new Date());】
 * @author  宋延军2014.09.25
 * @param {} DateIn 
 * @return {} 返回的字符串格式为【yyyy-MM-dd HH:mm】
 */
common.prototype.page.converDateToStr = function(DateIn){
	var Year = 0 ;
	var Month = 0 ;
	var Day = 0 ;
	var Hour = 0 ;
	var Minute = 0 ;
	var CurrentDate = "" ;
	
    // 初始化时间
	Year	= DateIn.getFullYear();//兼容IE,FF,safari,opera等浏览器。在FF浏览器下出现千年虫问题（114年）已解决：将DateIn.getYear();更换为：DateIn.getFullYear()
	Month	= DateIn.getMonth ()+ 1 ;
	Day		= DateIn.getDate ();
	Hour	= DateIn.getHours ();
	Minute	= DateIn.getMinutes ();

	CurrentDate = Year + "-" ;

	if ( Month >= 10 ){
		CurrentDate = CurrentDate + Month + "-" ;
    }else{
		CurrentDate = CurrentDate + "0" + Month + "-" ;
	}
	if ( Day >= 10 ){
		CurrentDate = CurrentDate + Day ;
	}else{
		CurrentDate = CurrentDate + "0" + Day ;
	}
	
	if ( Hour >= 10 ){
		CurrentDate = CurrentDate + " " + Hour ;
	}else{
		CurrentDate = CurrentDate + " 0" + Hour ; 
	}
	if ( Minute >= 10 ){
		CurrentDate = CurrentDate + ":" + Minute ; 
	}else{
		CurrentDate = CurrentDate + ":0" + Minute ; 
	}
	return CurrentDate ; 
};

/**将日期类型转换为字符串类型2【调用示例：var createDateTemp = common.prototype.page.converDateToStr2(new Date());】
 * @author  宋延军2014.09.25
 * @param {} DateIn 
 * @return {} 返回的字符串格式为【yyyy-MM-dd】
 */
common.prototype.page.converDateToStr2 = function(DateIn){
	var Year = 0 ;
	var Month = 0 ;
	var Day = 0 ;
    // 初始化时间
	Year	= DateIn.getFullYear();//兼容IE,FF,safari,opera等浏览器。在FF浏览器下出现千年虫问题（114年）已解决：将DateIn.getYear();更换为：DateIn.getFullYear()
	Month	= DateIn.getMonth ()+ 1 ;
	Day		= DateIn.getDate ();

	CurrentDate = Year + "-" ;

	if ( Month >= 10 ){
		CurrentDate = CurrentDate + Month + "-" ;
    }else{
		CurrentDate = CurrentDate + "0" + Month + "-" ;
	}
	if ( Day >= 10 ){
		CurrentDate = CurrentDate + Day ;
	}else{
		CurrentDate = CurrentDate + "0" + Day ;
	}
	return CurrentDate ; 
};

/**获得字符串实际长度，中文=2个字符，英文=1个字符
 * @author  宋延军2014.09.25
 * @param {} str 要获得长度的字符串
 * @return {}
 */
common.prototype.page.StrGetLength = function(str){
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++){
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128){  realLength += 1; }
        else{  realLength += 2; }
    }//alert(realLength);
    return realLength;
};

/**为特定面板赋值
 * @author 宋延军
 * @param tableid 显示结果的表格id
 * @param divid 修改面板div id
 * @param index 当前tr的行坐标
 */
common.prototype.page.copyvalue = function(tableid, divid, index) {
	$("#" + tableid + " tr:eq(" + index + ") td").each(
		function() {
			var showtext = $(this).text();
			var realvalue = $(this).attr("realvalue");
			if ($(this).attr("cell") != undefined && $(this).attr("cell") != "undefined" && $(this).attr("cell") != "id" && showtext != null && showtext != "null") {
				/*
				 */
				if ($("#" + divid + " [cell='" + $(this).attr("cell") + "'] ").length == 1) {
					
					/* INPUT框
					 */
					if ($("#" + divid + " [cell='" + $(this).attr("cell") + "'] ").get(0).tagName == 'INPUT') {
						$("#" + divid + " [cell='" + $(this).attr("cell") + "'] ").val(showtext);
					}
					
					/* SELECT下拉菜单
					 */
					if ($("#" + divid + " [cell='" + $(this).attr("cell") + "'] ").get(0).tagName == 'SELECT') {
						var obj  = $("#" + divid + " [cell='"+ $(this).attr("cell") + "'] ");
						if(obj.attr("cell2")!=undefined && obj.attr("cell2")=="text"){ //obj.text(showtext); //option[text='jQuery']").attr("selected", true);
							obj.find("option").each(function(i){
								if($(this).text()==showtext) {
									$(this).attr("selected", "selected");
									return false;
								}
							});
							//$("#select_id option[text='"+showtext+"']").attr("selected", true);
						}else{
							obj.val(showtext);
							
							/*@steven 2015.01.31 作废的代码区域段.........................................................BEIGN.
							//样式标签
							if(realvalue!=null && realvalue!=undefined){
								showtext = realvalue;
							}
							obj.selectpicker('val',showtext); //$('.'+obj.attr('id')).selectpicker('refresh');
							//@steven 2015.01.31 作废的代码区域段.........................................................END.*/
							
						}
					}
					
					/*TEXTAREA 文本域
					 */
					if ($("#" + divid + " [cell='" + $(this).attr("cell") + "'] ").get(0).tagName == 'TEXTAREA') {
						$("#" + divid + " [cell='" + $(this).attr("cell") + "'] ") .val(showtext);
					}
					
				}//if...end.
				
				/*对应RADIO
				 */
				if ($("#" + divid + " [cell='" + $(this).attr("cell") + "'] ").length > 1) {
					$("#" + divid + " [cell='" + $(this).attr("cell") + "'] ").each(
						function() {
							if ($(this).get(0).type == "radio") {
							if ($(this).val() == showtext || $(this).val() == realvalue) {
								$(this).attr("checked", true);
							}
						}
					});
				}//if...end.
				
			}//if...end.
		});
};

/**选中所有checkbox
 * @author 宋延军
 * @param {} name
 */
common.prototype.page.checkboxchecked = function(name) {
	$("input[name=" + name + "]").attr("checked", true);
};

/**反选checkbox
 * @author 宋延军
 * @param {} name
 */
common.prototype.page.reversecheckboxchecked = function(name) {
	$("input[name=" + name + "]").each(function(index, obj) {
		if (this.checked) {
			this.checked = false;
		} else {
			this.checked = true;
		}
	});
};

/** 获取request参数数据
 * @author 宋延军
 * @param {} par
 * @return {String}
 */
common.prototype.request = function(par) {
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = new Array();
	for ( var i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[par];
	if (typeof (returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
};

/**JS获取url传递参数【获取URL带QUESTRING参数的JAVASCRIPT客户端解决方案】
 * @author  宋延军
 * @return {} 参数对象【Json格式】
 */
common.prototype.getrequest2 = function(){
	var url=location.search;//获取url中"?"符后的字串
	var theRequest=new Object();
	if (url.indexOf("?") != -1) { var str=url.substr(1); strs=str.split("&");for(var i = 0; i < strs.length; i ++) { theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]); } }//alert(theRequest.id +"  "+theRequest.defaultpage);
	return theRequest;
};

function getUrlParam(index){		/*用于url传值获取 */
	var url=document.URL;
	var para="";
	if(url.lastIndexOf("?")>0){
        para=url.substring(url.lastIndexOf("?")+1,url.length);
		var arr=para.split("&");
		return arr[index].split("=")[1];
   }
}
/** HTML界面INPUT标签输入判断，只允许输入数字【0-9】【调用事件：onkeypress="javascript:return isnumber(event);"】
 * @author  宋延军
 * @param {} e
 * @return {Boolean}
 */
isnumber = function (e) {  
    if ($.browser.msie) {  
        if ( ((event.keycode > 47) && (event.keycode < 58)) || (event.keycode == 8) ) {  
            return true;  
        } else {  
            return false;  
        }  
    } else {  
        if ( ((e.which > 47) && (e.which < 58)) || (e.which == 8) ) {  
            return true;  
        } else {  
            return false;  
        }  
    }  
};
/** HTML界面INPUT标签输入判断，只允许输入数字或小数【0-9或.】【调用事件：onkeypress="javascript:return isdecimal(event);"】
 * @author  宋延军
 * @param {} e
 * @return {Boolean}
 */
isdecimal = function (e) {  
	//alert(e.which);
    if ($.browser.msie) {  
        if ( ((event.keycode > 47) && (event.keycode < 58)) || (e.which == 46)  ||  (event.keycode == 8) ) {  
            return true;  
        } else {  
            return false;  
        }  
    } else {  
        if ( ((e.which > 47) && (e.which < 58)) || (e.which == 46)  || (e.which == 8) ) {  //46 代表小数点，8代表退格键
            return true;  
        } else {  
            return false;  
        }  
    }  
};

/**
 * 初始化下拉框  hjp
 */
common.prototype.initCommbox = function (plb ,commboxId) {
	common.prototype.getXhlxByPlbList(plb,function(list) {
		common.prototype.addCommboxItem(commboxId,list,"param","param");
	});
};

/**
 * hjp
 */
common.prototype.addCommboxItem = function(commboxId,list,text,value) {
	var options = "";
	$(list).each(function(i){
		var t = this[text];
		var v = this[value];
		options+="<option value='"+v+"'>"+t+"</option>";
	});
	$("#"+commboxId).append(options);
};

/**
 * ??hjp
 */
common.prototype.clearCommboxItem = function(commboxId,isAll) {
	if(isAll) {
		$("#"+commboxId).html("");
	}else{
		$("#"+commboxId).find("option:not(:eq(0))").remove();
	}
};

/**
 * hjp
 */
common.prototype.getXhlxByPlbList = function (plb,func) {
	$.post("/YunHwaKKX/xhlx/getXhlxByPlbList",{plb:plb},function(data) {
		if(data.FLAG == "SUCCESS" && typeof(func) == "function") {
				func(data.plbList);
		}
	});
};

/***回到子菜单根节点界面【可靠性系统-特别调用】
 * @author  宋延军
 */
common.prototype.historygoback = function(){
	var paramobj=common.prototype.getrequest2(), tempId="";
	if(paramobj!=undefined || paramobj!=null){ tempId = paramobj.id;  $.post("/YunHwaKKX/juri/getobjectById",{id:tempId},  function(data) { if (data.FLAG == "SUCCESS") { window.location.replace(data.obj.jpath);/*重定向到指定界面*/ }else{ alert("您的登录信息由于长时间未操作界面，已经失效了，请重新登录！"); }  });  }
};

//@steven 2015.01.30 styleTemplat update codes..-------------------------------------------------------------------------------------------------------------------BEGIN.
//$(document).on('click','#closeBtn1', function (){ if(parent){ if(parent.layer){ var index = parent.layer.getFrameIndex(window.name); parent.layer.close(index); }else{ alert("找不到父窗口的layer对象"); } }else{ alert("找不到父窗口"); } });
//$(document).on('click','#closeBtn2', function (){ if(parent){ if(parent.layer){ var index = parent.layer.getFrameIndex(window.name); parent.layer.close(index); }else{ alert("找不到父窗口的layer对象"); } }else{ alert("找不到父窗口"); } });
//$(document).on('click','#closeBtn3', function (){ if(parent){ if(parent.layer){ var index = parent.layer.getFrameIndex(window.name); parent.layer.close(index); }else{ alert("找不到父窗口的layer对象"); } }else{ alert("找不到父窗口"); } });
$(document).on('click','#closeBtn1', function (){ layer.closeAll(); var index = parent.layer.getFrameIndex(window.name);parent.layer.close(index);layer.closeAll(); parent.layer.close(index1); });
$(document).on('click','#closeBtn2', function (){ layer.closeAll(); var index = parent.layer.getFrameIndex(window.name);parent.layer.close(index);layer.closeAll(); parent.layer.close(index1); });
$(document).on('click','#closeBtn3', function (){ layer.closeAll(); var index = parent.layer.getFrameIndex(window.name);parent.layer.close(index);layer.closeAll(); parent.layer.close(index1); });//console.log(window.name+'  -----   '+index1);
//@steven 2015.01.30  styleTemplat update codes..-------------------------------------------------------------------------------------------------------------------END.


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------BEIGN
// page 页面对象【系统管理-登录页面】index对象————login.html页面@Steven
common.prototype.page.index = function() {
};
//page 页面对象【获取当前登录用户信息】getcurrentuser对象————公共引入页面@Steven
common.prototype.page.getcurrentuser = function() {
};
// page 页面对象【登录后主菜单】index对象————index.html页面@Steven
common.prototype.page.main = function() {
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【01】系统管理 · BEIGN
// page 页面对象【系统管理-企业信息管理】ente对象————sys_ente.html页面@Steven
common.prototype.page.ente = function() {
};
//page 页面对象【系统管理-部门管理】depart对象———— sys_depart.html 页面@Steven
common.prototype.page.depart = function(){
};
//page 页面对象【系统管理-角色信息管理】 role对象———— sys_depart.html 页面@Steven
common.prototype.page.role = function(){
};
//page 页面对象【系统管理-岗位标识划分】 postiden对象———— sys_postiden.html 页面@Steven
common.prototype.page.postiden = function(){
};
//page 页面对象【系统管理-功能权限分配】 juri对象———— sys_juri.html 页面@Steven
common.prototype.page.juri = function(){
};
//page 页面对象【系统管理-职员用户管理 】 user对象———— sys_user.html 页面@Steven
common.prototype.page.user = function(){
};
//page 页面对象【系统管理-功能模块管理 】 module对象———— sys_module.html 页面@Steven
common.prototype.page.module = function(){
};
//page 页面对象【系统管理-测点监测管理 】 pointmonitor对象———— sys_pointmonitor.html 页面@Steven
common.prototype.page.pointmonitor = function(){
};
//page 页面对象【系统管理-PI系统瞬时取值服务配置 】 pointserviceconfig对象———— sys_pointserviceconfig.html 页面@Steven
common.prototype.page.pointserviceconfig = function(){
};
//page 页面对象【系统管理-辅机启停判断条件配置 】 pointfjqtconfig对象———— sys_pointfjqtconfig.html 页面@Steven
common.prototype.page.pointfjqtconfig = function(){
};
//page 页面对象【系统管理-任务调度管理 】 taskscheduling对象———— sys_taskscheduling.html 页面@Steven
common.prototype.page.taskscheduling = function(){
};
//page 页面对象【系统管理-数据审核模块】 taskscheduling对象———— sys_dataAuditing.html 页面@Steven
common.prototype.page.dataauditing = function(){
};
//page 页面对象【系统管理-数据锁定维护 】 taskscheduling对象———— sys_dataLock.html 页面@Steven
common.prototype.page.datalock = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【02】编码管理 · BEIGN
//page 页面对象【编码管理-企业单位编码维护 】 qydwbmwh对象———— sysm_qydwbmwh.html 页面@Steven
common.prototype.page.qydwbmwh = function(){
};
//page 页面对象【编码管理-电厂编码维护 】 dcbmwh对象———— sysm_dcbmwh.html 页面@Steven
common.prototype.page.dcbmwh = function(){
};
//page 页面对象【编码管理-制造厂家编码维护 】 zzcjbmwh对象———— sysm_zzcjbmwh.html 页面@Steven
common.prototype.page.zzcjbmwh = function(){
};
//page 页面对象【编码管理-辅机类型编码维护 】 fjlxbmwh对象———— sysm_fjlxbmwh.html 页面@Steven
common.prototype.page.fjlxbmwh = function(){
};
//page 页面对象【编码管理-原设备（部件）编码维护 】 ysbbmwh对象———— sysm_ysbbmwh.html 页面@Steven
common.prototype.page.ysbbmwh = function(){
};
//page 页面对象【编码管理-设备技术原因关联 】 sbjsyygl对象———— sysm_sbjsyygl.html 页面@Steven
common.prototype.page.sbjsyygl = function(){
};
//page 页面对象【编码管理-技术原因编码维护 】 jsyybmwh对象———— sysm_jsyybmwh.html 页面@Steven
common.prototype.page.jsyybmwh = function(){
};
//page 页面对象【编码管理-责任原因编码维护 】 zryybmwh对象———— sysm_zryybmwh.html 页面@Steven
common.prototype.page.zryybmwh = function(){
};
//page 页面对象【编码管理-型号类型维护 】 xhlxwh对象———— sysm_xhlxwh.html 页面@Steven
common.prototype.page.xhlxwh = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【03】数据传输 · BEIGN
//page 页面对象【数据传输-数据报送单位设置 】 sjbsdwsz对象———— transfer_sjbsdwsz.html 页面@Steven
common.prototype.page.sjbsdwsz = function(){
};
//page 页面对象【数据传输-辅机报送类型设置 】 fjbslxsz对象———— transfer_fjbslxsz.html 页面@Steven
common.prototype.page.fjbslxsz = function(){
};
//page 页面对象【数据传输-可靠性数据采集 】 kkxsjcj对象———— transfer_kkxsjcj.html 页面@Steven
common.prototype.page.kkxsjcj = function(){
};
//page 页面对象【数据传输-主机数据上报可靠性系统 】 zjsjsbkkxxtl对象———— transfer_zjsjsbkkxxtl.html 页面@Steven
common.prototype.page.zjsjsbkkxxtl = function(){
};
//page 页面对象【数据传输-辅机数据上报可靠性系统 】 zjsjsbkkxxtl对象———— transfer_fjsjsbkkxxtl.html 页面@Steven
common.prototype.page.fjsjsbkkxxtl = function(){
};
//page 页面对象【数据传输-数据上报和采集记录日志 】 sjsbhcjjlrz对象———— transfer_sjsbhcjjlrz.html 页面@Steven
common.prototype.page.sjsbhcjjlrz = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【04】主机数据 · BEIGN
//page 页面对象【主机数据-机组注册数据 】 jzzcsj对象———— zjsj_jzzcsj.html 页面@Steven
common.prototype.page.jzzcsj = function(){
};
//page 页面对象【主机数据-机组事件录入 】 jzsjlr对象———— zjsj_jzsjlr.html 页面@Steven
common.prototype.page.jzsjlr = function(){
};
//page 页面对象【主机数据-机组派生事件录入 】 jzpssjlr对象———— zjsj_jzpssjlr.html 页面@Steven
common.prototype.page.jzpssjlr = function(){
};
//page 页面对象【主机数据-机组月发电量 】 jzyfdl对象———— zjsj_jzyfdl.html 页面@Steven
common.prototype.page.jzyfdl = function(){
};
//page 页面对象【主机数据-机组月发电量快速录入】 jzyfdlkslr对象———— zjsj_jzyfdlkslr.html 页面@Steven
common.prototype.page.jzyfdlkslr = function(){
};
//page 页面对象【主机数据-机组数据整理】 jzsjzl对象———— zjsj_jzsjzl.html 页面@Steven
common.prototype.page.jzsjzl = function(){
};
//page 页面对象【主机数据-机组数据汇总】 jzsjzl对象———— zjsj_jzsjhz.html 页面@Steven
common.prototype.page.jzsjhz = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【05】主机查询 · BEIGN
//page 页面对象【主机查询-机组注册数据查询】 jzsjzl对象———— zjcx_jzzcsjcx.html 页面@Steven
common.prototype.page.jzzcsjcx = function(){
};
//page 页面对象【主机查询-机组设备注册参数查询】 jzsbzccscx对象———— zjcx_jzsbzccscx.html 页面@Steven
common.prototype.page.jzsbzccscx = function(){
};
//page 页面对象【主机查询-机组变更数据查询】 jzbgsjcx对象———— zjcx_jzbgsjcx.html 页面@Steven
common.prototype.page.jzbgsjcx = function(){
};
//page 页面对象【主机查询-机组事件数据查询】 jzsjsjcx对象———— zjcx_jzsjsjcx.html 页面@Steven
common.prototype.page.jzsjsjcx = function(){
};
//page 页面对象【主机查询-机组派生事件数据查询】 jzpssjsjcx对象———— zjcx_jzpssjsjcx.html 页面@Steven
common.prototype.page.jzpssjsjcx = function(){
};
//page 页面对象【主机查询-机组月发电量查询】 jzyfdlcx对象———— zjcx_jzyfdlcx.html 页面@Steven
common.prototype.page.jzyfdlcx = function(){
};
//page 页面对象【主机查询-机组月度汇总查询】 jzydhzcx对象———— zjcx_jzydhzcx.html 页面@Steven
common.prototype.page.jzydhzcx = function(){
};
//page 页面对象【主机查询-机组事件间隔查询】 jzsjjgcx对象———— zjcx_jzsjjgcx.html 页面@Steven
common.prototype.page.jzsjjgcx = function(){
};
//page 页面对象【主机查询-机组全停运/全运行查询】 jzqtyqyxcx对象———— zjcx_jzqtyqyxcx.html 页面@Steven
common.prototype.page.jzqtyqyxcx = function(){
};
//page 页面对象【主机查询-机组特殊事件查询】 jztssjcx对象———— zjcx_jztssjcx.html 页面@Steven
common.prototype.page.jztssjcx = function(){
};
//page 页面对象【主机查询-机组事件月度运行图查询】 jzsjydyxtcx对象———— zjcx_jzsjydyxtcx.html 页面@Steven
common.prototype.page.jzsjydyxtcx = function(){
};
//page 页面对象【主机查询-机组特殊时间段事件查询】 jzsjydyxtcx对象———— zjcx_jztssjdsjcx.html 页面@Steven
common.prototype.page.jztssjdsjcx = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【06】主机指标 · BEIGN
//page 页面对象【主机指标-主机指标计算】 zjzbjs对象———— zjzb_zjzbjs.html 页面@Steven
common.prototype.page.zjzbjs = function(){
};
//page 页面对象【主机指标-主机指标综合分析】 zjzbzhfx对象———— zjzb_zjzbzhfx.html 页面@Steven
common.prototype.page.zjzbzhfx = function(){
};
//page 页面对象【主机指标-计算各月可靠性指标】 jsgyxxkzb对象———— zjzb_jsgyxxkzb.html 页面@Steven
common.prototype.page.jsgyxxkzb = function(){
};
//page 页面对象【主机指标-机组特殊时间段指标计算】 jztssjdzbjs对象———— zjzb_jztssjdzbjs.html 页面@Steven
common.prototype.page.jztssjdzbjs = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【07】辅机数据 · BEIGN
//page 页面对象【辅机数据-辅机设备注册】 fjsbzc对象———— fjsj_fjsbzc.html 页面@Steven
common.prototype.page.fjsbzc = function(){
};
//page 页面对象【辅机数据-辅机设备事件录入】 fjsbsjlr对象———— fjsj_fjsbsjlr.html 页面@Steven
common.prototype.page.fjsbsjlr = function(){
};
//page 页面对象【辅机数据-辅机设备派生事件录入】 fjsbpssjlr对象———— fjsj_fjsbpssjlr.html 页面@Steven
common.prototype.page.fjsbpssjlr = function(){
};
//page 页面对象【辅机数据-辅机数据整理】 fjsjzl对象———— fjsj_fjsjzl.html 页面@Steven
common.prototype.page.fjsjzl = function(){
};
//page 页面对象【辅机数据-辅机数据汇总】 fjsjhz对象———— fjsj_fjsjhz.html 页面@Steven
common.prototype.page.fjsjhz = function(){
};
//page 页面对象【辅机数据-辅机设备新增日志记录】 fjsbxzrzjl对象———— fjsj_fjsbxzrzjl.html 页面@Steven
common.prototype.page.fjsbxzrzjl = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【08】辅机查询 · BEIGN
//page 页面对象【辅机查询-辅机设备注册数据】 fjsbzcsj对象———— fjcx_fjsbzcsj.html 页面@Steven
common.prototype.page.fjsbzcsj = function(){
};
//page 页面对象【辅机查询-辅机设备事件数据】 fjsbsjsj对象———— fjcx_fjsbsjsj.html 页面@Steven
common.prototype.page.fjsbsjsj = function(){
};
//page 页面对象【辅机查询-辅机设备派生事件数据】 fjsbpssjsj对象———— fjcx_fjsbpssjsj.html 页面@Steven
common.prototype.page.fjsbpssjsj = function(){
};
//page 页面对象【辅机查询-辅机设备月度汇总查询】 fjsbydhzcx对象———— fjcx_fjsbydhzcx.html 页面@Steven
common.prototype.page.fjsbydhzcx = function(){
};
//page 页面对象【辅机查询-辅机设备事件间隔查询】 fjsbsjjgcx对象———— fjcx_fjsbsjjgcx.html 页面@Steven
common.prototype.page.fjsbsjjgcx = function(){
};
//page 页面对象【辅机查询-辅机设备全停运/全运行查询】 fjsbqtyqyxcx对象———— fjcx_fjsbqtyqyxcx.html 页面@Steven
common.prototype.page.fjsbqtyqyxcx = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【09】辅机指标 · BEIGN
//page 页面对象【辅机指标-辅机指标计算】 fjzbjs对象———— fjzb_fjzbjs.html 页面@Steven
common.prototype.page.fjzbjs = function(){
};
//page 页面对象【辅机指标-辅机指标综合分析】 fjzbzhfx对象———— fjzb_fjzbzhfx.html 页面@Steven
common.prototype.page.fjzbzhfx = function(){
};
//page 页面对象【辅机指标-辅机特殊时间段指标计算】 fjtssjdzbjs对象———— fjzb_fjtssjdzbjs.html 页面@Steven
common.prototype.page.fjtssjdzbjs = function(){
};
//page 页面对象【辅机指标-原设备(部件)事件产生记录统计】 ysbsjcsjltj对象———— fjzb_ysbsjcsjltj.html 页面@Steven
common.prototype.page.ysbsjcsjltj = function(){
};
//page 页面对象【辅机指标-原设备(部件)原因发生频率分析】 ysbyyfsplfx对象———— fjzb_ysbyyfsplfx.html 页面@Steven
common.prototype.page.ysbyyfsplfx = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【10】报表分析 · BEIGN
//page 页面对象【报表分析-报表模板信息】 bbmbxx对象———— bbfx_bbmbxx.jsp 页面@Steven
common.prototype.page.bbmbxx = function(){
};
//page 页面对象【报表分析-机组相关报表】 jzxgbb对象———— bbfx_jzxgbb.jsp 页面@Steven
common.prototype.page.jzxgbb = function(){
};
//page 页面对象【报表分析-辅机相关报表】 fjxgbb对象———— bbfx_fjxgbb.jsp 页面@Steven
common.prototype.page.fjxgbb = function(){
};
//page 页面对象【报表分析-场内常用报表】 cncybb对象———— bbfx_cncybb.jsp 页面@Steven
common.prototype.page.cncybb = function(){
};
//page 页面对象【报表分析-表 1：机组注册内容报表】 b01jzzcnrbb对象———— bbfx_b01jzzcnrbb.jsp 页面@Steven
common.prototype.page.b01jzzcnrbb = function(){
};
//page 页面对象【报表分析-表 2：机组主设备注册内容】b02jzsbzcnr对象———— bbfx_b02jzsbzcnr.jsp 页面@Steven
common.prototype.page.b02jzsbzcnr = function(){
};
//page 页面对象【报表分析-表 3：机组月度事件数据报表】b03jzydsjsjbb对象———— bbfx_b03jzydsjsjbb.jsp 页面@Steven
common.prototype.page.b03jzydsjsjbb = function(){
};
//page 页面对象【报表分析-表 4：机组月度发电量报表】b04jzydfdlbb对象———— bbfx_b04jzydfdlbb.jsp 页面@Steven
common.prototype.page.b04jzydfdlbb = function(){
};
//page 页面对象【报表分析-表 5：机组月度计划检修报表】b05jzydjhjxbb对象———— bbfx_b05jzydjhjxbb.jsp 页面@Steven
common.prototype.page.b05jzydjhjxbb = function(){
};
//page 页面对象【报表分析-表 6：火电厂辅机设备—磨煤机注册填报表（一）】b06mmjzctbb1对象———— bbfx_b06mmjzctbb1.jsp 页面@Steven
common.prototype.page.b06mmjzctbb1 = function(){
};
//page 页面对象【报表分析-表 6：火电厂辅机设备—磨煤机注册填报表（二）】b06mmjzctbb2对象———— bbfx_b06mmjzctbb2.jsp 页面@Steven
common.prototype.page.b06mmjzctbb2 = function(){
};
//page 页面对象【报表分析-表 7：火电厂辅机设备—给水泵组注册内容报表（一）】b07jsbzzcnrbb1对象———— bbfx_b07jsbzzcnrbb1.jsp 页面@Steven
common.prototype.page.b07jsbzzcnrbb1 = function(){
};
//page 页面对象【报表分析-表 7：火电厂辅机设备—给水泵组注册内容报表（二）】b07jsbzzcnrbb2对象———— bbfx_b07jsbzzcnrbb2.jsp 页面@Steven
common.prototype.page.b07jsbzzcnrbb2 = function(){
};
//page 页面对象【报表分析-表 7：火电厂辅机设备—给水泵组注册内容报表（三）】b07jsbzzcnrbb3对象———— bbfx_b07jsbzzcnrbb3.jsp 页面@Steven
common.prototype.page.b07jsbzzcnrbb3 = function(){
};
//page 页面对象【报表分析-表 8：火电厂辅机设备—送风机注册内容报表（一）】b08sfjzcnrbb1对象———— bbfx_b08jsfjzcnrbb1.jsp 页面@Steven
common.prototype.page.b08sfjzcnrbb1 = function(){
};
//page 页面对象【报表分析-表 8：火电厂辅机设备—送风机注册内容报表（二）】b08sfjzcnrbb2对象———— bbfx_b08jsfjzcnrbb2.jsp 页面@Steven
common.prototype.page.b08sfjzcnrbb2 = function(){
};
//page 页面对象【报表分析-表 9：火电厂辅机设备—送风机注册内容报表（一）】b09sfjzcnrbb1对象———— bbfx_b09jsfjzcnrbb1.jsp 页面@Steven
common.prototype.page.b09sfjzcnrbb1 = function(){
};
//page 页面对象【报表分析-表 9：火电厂辅机设备—送风机注册内容报表（二）】b09sfjzcnrbb2对象———— bbfx_b09jsfjzcnrbb2.jsp 页面@Steven
common.prototype.page.b09sfjzcnrbb2 = function(){
};
//page 页面对象【报表分析-表10：火电厂辅机设备—离压加热器注册内容报表（一）】b10lyjrqzcnrbb1对象———— bbfx_b10lyjrqzcnrbb1.jsp 页面@Steven
common.prototype.page.b10lyjrqzcnrbb1 = function(){
};
//page 页面对象【报表分析-表10：火电厂辅机设备—离压加热器注册内容报表（二）】b10lyjrqzcnrbb2对象———— bbfx_b10lyjrqzcnrbb2.jsp 页面@Steven
common.prototype.page.b10lyjrqzcnrbb2 = function(){
};
//page 页面对象【报表分析-表11：辅助设备月度事件数据报表】b11fzsbydsjsjbb对象———— bbfx_b11fzsbydsjsjbb.jsp 页面@Steven
common.prototype.page.b11fzsbydsjsjbb = function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【11】我的任务 · BEIGN
//page 页面对象【我的任务-未处理的任务】wcldrw对象———— wdrw_wcldrw.html 页面@Steven
common.prototype.page.wcldrw = function(){
};
//page 页面对象【我的任务-已处理的任务】ycldrw对象———— wdrw_ycldrw.html 页面@Steven
common.prototype.page.ycldrw = function(){
};
//page 页面对象【我的任务-任务量范围统计】rwlfwtj对象———— wdrw_rwlfwtj.html 页面@Steven
common.prototype.page.rwlfwtj= function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【12】我的设备 · BEIGN
//page 页面对象【我的设备-由我监管的主机设备】ywjgdzjsb对象———— wdsb_ywjgdzjsb.html 页面@Steven
common.prototype.page.ywjgdzjsb= function(){
};
//page 页面对象【我的设备-由我监管的辅机设备】ywjgdfjsb对象———— wdsb_ywjgdfjsb.html 页面@Steven
common.prototype.page.ywjgdfjsb= function(){
};
//page 页面对象【我的设备-设备监管日志查询】sbjgrzcx对象———— wdsb_sbjgrzcx.html 页面@Steven
common.prototype.page.sbjgrzcx= function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【13】特征量信息 · BEIGN
//page 页面对象【特征量信息-特征量录入】tzllr对象———— tzlxx_tzllr.html 页面@Steven
common.prototype.page.tzllr= function(){
};
//page 页面对象【特征量信息-特征量查询】tzlcx对象———— tzlxx_tzlcx.html 页面@Steven
common.prototype.page.tzlcx= function(){
};
//page 页面对象【特征量信息-特征量超标】tzlcb对象———— tzlxx_tzlcb.html 页面@Steven
common.prototype.page.tzlcb= function(){
};
//page 页面对象【特征量信息-特征量配置】tzlpz对象———— tzlxx_tzlpz.html 页面@Steven
common.prototype.page.tzlpz= function(){
};
//page 页面对象【特征量信息-特征量分析】tzlfx对象———— tzlxx_tzlfx.html 页面@Steven
common.prototype.page.tzlfx= function(){
};
//page 页面对象【特征量信息-特征量预警】tzlyj对象———— tzlxx_tzlyj.html 页面@Steven
common.prototype.page.tzlyj= function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【14】参数管理 · BEIGN
//page 页面对象【参数管理-运行参数超标记录查询】yxcscbjlcx对象———— csgl_yxcscbjlcx.html 页面@Steven
common.prototype.page.yxcscbjlcx= function(){
};
//page 页面对象【参数管理-运行参数趋势分析】yxcsqsfx对象———— csgl_yxcsqsfx.html 页面@Steven
common.prototype.page.yxcsqsfx= function(){
};
//page 页面对象【参数管理-设备参数超标记录查询】sbcscbjlcx对象———— csgl_sbcscbjlcx.html 页面@Steven
common.prototype.page.sbcscbjlcx= function(){
};
//page 页面对象【参数管理-参数趋势分析】csqsfx对象———— csgl_csqsfx.html 页面@Steven
common.prototype.page.csqsfx= function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【15】设备隐患 · BEIGN
//page 页面对象【设备隐患-设备隐患维护】sbyhwh对象———— sbyh_sbyhwh.html 页面@Steven
common.prototype.page.sbyhwh= function(){
};
//page 页面对象【设备隐患-设备重大隐患维护】sbzdyhwh对象———— sbyh_sbzdyhwh.html 页面@Steven
common.prototype.page.sbzdyhwh= function(){
};
//page 页面对象【设备隐患-设备隐患统计报告】sbyhtjbg对象———— sbyh_sbyhtjbg.html 页面@Steven
common.prototype.page.sbyhtjbg= function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【16】预警中心 · BEIGN
//page 页面对象【预警中心-运行参数预警】yxcsyj对象———— yjzx_yxcsyj.html 页面@Steven
common.prototype.page.yxcsyj= function(){
};
//page 页面对象【预警中心-设备参数预警】sbcsyj对象———— yjzx_sbcsyj.html 页面@Steven
common.prototype.page.sbcsyj= function(){
};
//page 页面对象【预警中心-特征量参数预警】tzlcsyj对象———— yjzx_tzlcsyj.html 页面@Steven
common.prototype.page.tzlcsyj= function(){
};
//page 页面对象【预警中心-部件寿命预警】bjsmyj对象———— yjzx_bjsmyj.html 页面@Steven
common.prototype.page.bjsmyj= function(){
};
//page 页面对象【预警中心-未确认事件预警】wqrsjyj对象———— yjzx_wqrsjyj.html 页面@Steven
common.prototype.page.wqrsjyj= function(){
};
//page 页面对象【预警中心-非停事件预警】ftsjyj对象———— yjzx_ftsjyj.html 页面@Steven
common.prototype.page.ftsjyj= function(){
};
//page 页面对象【预警中心-异常日志预警】ycrzyj对象———— yjzx_ycrzyj.html 页面@Steven
common.prototype.page.ycrzyj= function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【17】报告管理 · BEIGN
//page 页面对象【报告管理-事件分析报告】sjfxbg对象———— bggl_sjfxbg.html 页面@Steven
common.prototype.page.sjfxbg= function(){
};
//page 页面对象【报告管理-特征分析报告】tzfxbg对象———— bggl_tzfxbg.html 页面@Steven
common.prototype.page.tzfxbg= function(){
};
//page 页面对象【报告管理-运行参数报告】yxcsbg对象———— bggl_yxcsbg.html 页面@Steven
common.prototype.page.yxcsbg= function(){
};
//page 页面对象【报告管理-设备参数报告】sbcsbg对象———— bggl_sbcsbg.html 页面@Steven
common.prototype.page.sbcsbg= function(){
};
//page 页面对象【报告管理-部件分析报告】bjfxbg对象———— bggl_bjfxbg.html 页面@Steven
common.prototype.page.bjfxbg= function(){
};
//page 页面对象【报告管理-异常分析报告】ycfxbg对象———— bggl_ycfxbg.html 页面@Steven
common.prototype.page.ycfxbg= function(){
};
//page 页面对象【报告管理-设备报告查询】sbbgcx对象———— bggl_sbbgcx.html 页面@Steven
common.prototype.page.sbbgcx= function(){
};
//page 页面对象【报告管理-缺陷月报录入】qxyblr对象———— bggl_qxyblr.html 页面@Steven
common.prototype.page.qxyblr= function(){
};
//page 页面对象【报告管理-缺陷月报汇总】qxybhz对象———— bggl_qxybhz.html 页面@Steven
common.prototype.page.qxybhz= function(){
};
//page 页面对象【报告管理-缺陷汇总查询】qxhzcx对象———— bggl_qxhzcx.html 页面@Steven
common.prototype.page.qxhzcx= function(){
};
//page 页面对象【报告管理-趋势月报录入】qsyblr对象———— bggl_qsyblr.html 页面@Steven
common.prototype.page.qsyblr= function(){
};
//page 页面对象【报告管理-趋势月报汇总】qsybhz对象———— bggl_qsybhz.html 页面@Steven
common.prototype.page.qsybhz= function(){
};
//page 页面对象【报告管理-趋势月报查询】qsybcx对象———— bggl_qsybcx.html 页面@Steven
common.prototype.page.qsybcx= function(){
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------【18】时事新闻 · BEIGN
//page 页面对象【时事新闻-时事新闻维护】ssxwwh对象———— ssxw_ssxwwh.html 页面@Steven
common.prototype.page.ssxwwh= function(){
};
//page 页面对象【时事新闻-最新时事新闻】zxssxw对象———— ssxw_zxssxw.html 页面@Steven
common.prototype.page.zxssxw= function(){
};
//page 页面对象【辅机查询-详细信息】fjcxdetail对象———— fjcx_detail.html 页面@Steven
common.prototype.page.fjcxdetail=function(){
};
common.prototype.page.login= function(){
};
common.prototype.page.fork= function(){
};
common.prototype.page.dhfd=function(){
	
};
common.prototype.page.dc=function(){	
};
common.prototype.page.dh=function(){	
};
common.prototype.page.nd=function(){	
};