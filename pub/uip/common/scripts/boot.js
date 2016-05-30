var _getContextPath = function() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
} 

var _contextPath = _getContextPath();
var contextPath = _contextPath;
var projectName = _contextPath;
var _projectName = _contextPath;
__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

var bootPATH = __CreateJSPath("boot.js");

//debugger
mini_debugger = true;   

//ExtJS 2.0
/*
document.write('<script src="' + _contextPath + '/pub/ext-2.0.2/adapter/ext/ext-base.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + _contextPath + '/pub/ext-2.0.2/ext-all.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + _contextPath + '/pub/ext-2.0.2/source/locale/ext-lang-zh_CN.js" type="text/javascript" ></sc' + 'ript>');
document.write('<link href="' + _contextPath + '/pub/ext-2.0.2/resources/css/ext-all.css" rel="stylesheet" type="text/css" />');
*/

//lov
document.write('<script src="' + _contextPath + '/pub/uip/common/scripts/component/dynamicGrid.js" ></sc' + 'ript>');
document.write('<script src="' + _contextPath + '/pub/uip/common/scripts/component/dynamicLov_new.js" ></sc' + 'ript>');
 
//miniui
/*
document.write('<script src="' + bootPATH + 'jquery-1.6.2.min.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'miniui/miniui.js" type="text/javascript" ></sc' + 'ript>');
document.write('<link href="' + bootPATH + 'miniui/themes/default/miniui.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'miniui/themes/icons.css" rel="stylesheet" type="text/css" />'); 
*/

//扩展的
document.write('<script src="' + bootPATH + 'HashMap.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'common.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'listView.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'ExtUtil.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'UIUtil.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'xipComboBox.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + _contextPath + '/pub/uip/common/My97DatePicker/WdatePicker.js" type="text/javascript" ></sc' + 'ript>');

//工作流的
document.write('<script src="' + _contextPath + '/common/include/Base64.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'wf.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + _contextPath + '/workflow/agencyTask/js/workflow.js" type="text/javascript" ></sc' + 'ript>');

//skin
var skin = getCookie("miniuiSkin");

if (!skin) {
   skin='blue';//默认皮肤
}
document.write('<link href="' + bootPATH + 'miniui/themes/' + skin + '/skin.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'ui.css" rel="stylesheet" type="text/css" />');

////////////////////////////////////////////////////////////////////////////////////////
function getCookie(sName) {
    var aCookie = document.cookie.split("; ");
    var lastMatch = null;
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
            lastMatch = aCrumb;
        }
    }
    if (lastMatch) {
        var v = lastMatch[1];
        if (v === undefined) return v;
        return unescape(v);
    }
    return null;
}
 
/*var WinAlerts = window.alert;
window.alert = function (e) {
	if (e != null && e.indexOf("试用")>-1)
	{ 
		//mini.alert('alert()已被禁用,用请mini.alert()方法:'+e);//和谐了
	}
	else
	{
		mini.alert('alert()已被禁用,请用mini.alert()方法:'+e); 
		//WinAlerts (e);
	}

};*/