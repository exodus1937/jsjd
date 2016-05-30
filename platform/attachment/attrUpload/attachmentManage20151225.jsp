<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%
	String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    
	String userId = "f92c688a-df48-d4e2-e040-a8c021824389";
	String src_id = "001";
	String att_cat = "AA";
	//String org_id = "01af13ac-f080-4469-bafe-bb430f9f2ee3";  //ftp
	String org_id = "53e16fec-53a9-4379-9f18-6507f53be4b5"; 
	String canUp = "Y";
  	String canDown = "N";
  	String canDel = "Y";
  	String bus_no = "123";
	
    /*String userId = request.getParameter("userId");
    String src_id = request.getParameter("srcId"); 
	String att_cat = request.getParameter("attCat");//附件分类Code
    String org_id = request.getParameter("orgId"); 
	String bus_no = java.net.URLDecoder.decode(request.getParameter("busNo"), "UTF-8");
   	String canUp = request.getParameter("canUp");
   	String canDown = request.getParameter("canDown");
   	String canDel = request.getParameter("canDel"); */
%>
<html>
<head>

<link rel="stylesheet" href="<%=request.getContextPath()%>/webbuilder/controls/ext/resources/css/ext-all.css" type="text/css">
<script type="text/javascript" src="<%=request.getContextPath()%>/webbuilder/controls/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/webbuilder/controls/ext/locale/ext-lang-zh_CN.js"></script>

<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/platform/attachment/newAttrUpload/uploadPanel/UploadPanel.css">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>附件管理</title>
</head> 
<style type="text/css" media='all'>
.icon-query {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/query.gif) !important;
}
.icon-reset {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/reset.gif) !important;
}
.icon-add {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/add.gif) !important;
}
.icon-delete {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/application_delete.png) !important;
}
.icon-save {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/save.gif) !important;
}
.icon-view {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/preview.gif) !important;
}
.icon-go {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/go.gif) !important;
}
.icon-return {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/reset.gif) !important;
}
.icon-upload{
background-image: url(<%=request.getContextPath()%>/platform/attachment/images/arrow_up.png) !important;
}
.icon-down {
    background-image: url(<%=request.getContextPath()%>/platform/attachment/images/arrow_down.png) !important;
}
.x-progress-bar-red {
   height:18px;float:left;width:0;background:#FF0000 url(<%=request.getContextPath()%>/platform/attachment/images/progress-bg-red.gif) repeat-x left center;border-top:1px solid #FF0000;border-bottom:1px solid #FF0000;border-right:1px solid #FF0000;}  
}
</style>
<body>
<script type="text/javascript">
  var contextPath = '<%=path%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/platform/attachment/newAttrUpload/attachmentManage.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/platform/attachment/newAttrUpload/uploadPanel/UploadPanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/platform/attachment/newAttrUpload/swfupload/swfupload.js"></script>
<script type="text/javascript">
	init_page('<%=path%>','<%=src_id%>','<%=att_cat%>','<%=org_id%>','<%=bus_no%>','<%=canUp%>','<%=canDown%>','<%=canDel%>','<%=userId%>');
</script>
</body>
</html>