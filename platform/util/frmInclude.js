var _getContextPath = function() {
	var pathName = document.location.pathname;
	var index = pathName.substr(1).indexOf("/");
	var result = pathName.substr(0,index+1);
	return result;
}

var _contextPath = _getContextPath();
var localObj = window.location;
var projectName = localObj.pathname.split("/")[1];
projectName="/"+projectName;

document.write('<link rel="stylesheet" type="text/css"  href="' + _contextPath + '/webbuilder/controls/ext/resources/css/ext-all.css"/>');

document.write('<script type="text/javascript src="' + _contextPath + '/webbuilder/controls/ext/ext-all.js""></sc' + 'ript>');
document.write('<script type="text/javascript src="' + _contextPath + '/webbuilder/controls/ext/locale/ext-lang-zh_CN.js""></sc' + 'ript>');
document.write('<script type="text/javascript src="' + _contextPath + '/common/js/base64.js""></sc' + 'ript>');
document.write('<script type="text/javascript src="' + _contextPath + '/platform/util/platformUtil.js""></sc' + 'ript>');
document.write('<script type="text/javascript src="' + _contextPath + '/workflow/util/workflowUtil4.0.js""></sc' + 'ript>');

/**document.write("<link rel='stylesheet' type='text/css' href='./common/include/ext-2.0.2/resources/css/ext-all.css'  charset='utf-8'/ >");
document.write("<link rel='stylesheet' type='text/css' href='./common/include/ext-2.0.2/resources/css/xtheme-vista.css' charset='utf-8'/>");
document.write("<link rel='stylesheet' type='text/css' href='./common/css/need.css' charset='utf-8'/>");
document.write("<script language='javascript' src='./common/include/ext-2.0.2/adapter/ext/ext-base.js' charset='utf-8'></script>");
document.write("<script language='javascript' src='./common/include/ext-2.0.2/ext-all.js' charset='utf-8'></script>");
document.write("<script language='javascript' src='./common/include/ext-2.0.2/source/locale/ext-lang-zh_CN.js' charset='utf-8'></script>");
document.write("<script type='text/javascript' src='./common/include/Base64.js' charset='utf-8'></script>");
document.write("<script type='text/javascript' src='./workflow/agencyTask/js/workflow.js' charset='utf-8'></script>");
document.write("<script type='text/javascript' src='./common/include/fr_util.js' charset='utf-8'></script>");**/