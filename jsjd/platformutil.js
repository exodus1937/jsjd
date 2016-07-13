var _getContextPath = function() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}; 

var contextPath = _getContextPath();

/**
 * 弹出ext窗口
 * @params:config窗口配置 json示例{title:'',height:'',width:'',url:'',isMax:'',closeCallback:function(){}}
 */
function showExtWindow(config){
	var winTitle = config.title!=null ? config.title : '';
	var winHeight = config.height!=null ? config.height : 500;
	var winWidth = config.width!=null ? config.width : 770;
	var winUrl = config.url!=null ? config.url : '';
	
	var windId = 'extWin' + new Date().getTime();
    if(winUrl.indexOf('?')!= -1){
    	winUrl = winUrl + '&extWinId=' + windId;
    }else{
    	winUrl = winUrl + '?extWinId=' + windId;
    }
	
	var extWindow = new Ext.Window({
		id:windId,
	    title: winTitle,
	    height: winHeight,
	    width: winWidth,
	    layout: 'fit',
	    modal: true,
		resizable: false,
		maximizable: true,
		html: '<iframe id=\'extWindowIframe\' width=\'100%\' height=\'100%\' frameborder=0 src="' + winUrl + '"></iframe>',
		listeners: {
			show: function(win) {},
			close: function() {
				if (config.closeCallback) {
					config.closeCallback();
				}
			}
		}
	});
	extWindow.show();
	if(config.isMax){
		extWindow.maximize();
	}
}

/**
 * 弹出附件管理页面
 * @params: config附件配置 json示例{userId:'',src_id:'',org_id:'',att_cat:'',bus_no:'',canUp:'',canDown:'',canDel:'',closeCallback:function(){}} 
 */
function showAttachmentManager(userId, src_id, org_id, att_cat, bus_no, canUp, canDown, canDel, closeCallback){
	if(userId==null || userId==""){
		Ext.Msg.alert('提示','用户id不能为空!');
		return;
	}
	if(src_id==null || src_id==""){
		Ext.Msg.alert('提示','来源id不能为空!');
		return;
	}
	if(att_cat==null || att_cat==""){
		Ext.Msg.alert('提示','附件类型不能为空!');
		return;
	}
	
	if(canUp==null || canUp==""){
		canUp = 'Y';
	}
	
	if(canDown==null || canDown==""){
		canDown = 'N';
	}
	
	if(canDel==null || canDel==""){
		canDel = 'N';
	}
	
	var url = '';
	
	var url = contextPath + '/main?xwl=23XOJ8S7DHCA'
				+ '&userId=' + userId
		        + '&srcId=' + src_id
		        + '&orgId=' + org_id
		        + '&attCat=' + att_cat
		        + '&busNo=' + encodeURI(encodeURI(bus_no))
		        + '&canUp=' + canUp
		        + '&canDown=' + canDown
		        + '&canDel=' + canDel;
	
	
	
	var windowConfig = {title:'附件管理','url':url,'isMax':true,'closeCallback':closeCallback};
	showExtWindow(windowConfig);
}


/**
 * 弹出功能帮助页面
 * @params:funId 功能树id
 * @params:type 帮助类型 r:只读 rw:读写
 * @params:title 窗口标题
 */
function showFunHelpWin(funId, type, title){
	if(funId==null || funId=='undefined' || funId==''){
		Ext.Msg.alert('提示','请指定功能id!');
		return;
	}	
	var winTitle = '功能帮助';
	if(title){
		winTitle = title + '帮助';
	}
	
	var windId = 'extWin' + new Date().getTime();
	
	var url = contextPath+"/pub/uip/common/kindeditor4/editor.jsp?type="+type+"&funTreeId="+funId+"&extWinId="+windId;
	
	var extWindow = new Ext.Window({
		id:windId,
	    title: winTitle,
	    height: 500,
	    width: 770,
	    layout: 'fit',
	    modal: true,
		resizable: false,
		maximizable: false,
		html: '<iframe id=\'extWindowIframe\' width=\'100%\' height=\'460px\' frameborder=0 src="' + url + '"></iframe>',
		listeners: {
			show: function(win) {},
			close: function() {
			}
		}
	});
	
	extWindow.show();
}

function exportExcel(templateCode, sqlParams){
	if(sqlParams!=null && sqlParams!=""){
		sqlParams = encodeURI(encodeURI(parseJson4String(sqlParams)));
	}else{
		sqlParams = "";
	}
	window.location.href = contextPath + "/templateManageAction.do?method=exportExcel&templateCode="+templateCode+"&sqlParams="+sqlParams;
	return;
}

function importExcel(templateCode){
	var url = contextPath + '/main?xwl=23WTCCFOX43O&templateCode='+templateCode;

	var windowConfig = {title:'模板数据上传', 'url':url, 'width':600, 'height':500};
	
	showExtWindow(windowConfig);
}

function parseJson4String(jsonObject){
	var result = "";
	
	var index = 0;
	for(var key in jsonObject){  
		if(index==0){
			result = key + "xzsplit" + jsonObject[key];
		}else{
			result = result + "," + key + "xzsplit" + jsonObject[key];
		} 
		index++;
	}
	
	return result;
}

//帆软弹出窗口
function frPopWindow(url,title,refreshParent,isMax,height,width,iframeId) {
	var aHeight=500;
    var aWidth=880;
    if(height){
    	aHeight=height;
    }
    if(width){
    	aWidth=width;
    }
	var popWindow = new Ext.Window({
		layout: 'fit',
		id: 'frmPopWindow',
		title:title,
		modal: true,
		width: aWidth,
		height: aHeight,
		resizable: false,
		maximizable: true,
		html: '<iframe width=\'100%\' frameborder=0 height=\'100%\' id="'+iframeId+'" src="' + url + '"></iframe>',
		listeners: {
			show: function(win) {},
			close: function() {
				if (refreshParent==0) {
					//window.location.reload();
				}
				if (refreshParent==1) {
					window.location.reload();
				}
				if (refreshParent==2) {
					//window.location.reload();
					buttonClick('查询');
				}
			}
		}
	});
	popWindow.show();
	if(isMax)
		popWindow.maximize();
}

function buttonClick(buttonName){
	var buttons=document.getElementsByTagName("button");
	for(var i=0;i<buttons.length;i++){
	    if(buttons[i].innerHTML==buttonName){
			buttons[i].click();
			break;
	    }
	}
}