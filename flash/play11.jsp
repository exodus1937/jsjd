<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%
String swffilename = request.getParameter("filename");
String floderdate = request.getParameter("folderdate");
String path="/showswf/flash/swf/"+floderdate+"/"+swffilename+".swf";
String docId=request.getParameter("doc_id");
System.out.println("path:"+path);
%>
<html>
	<head>
		<title>在线查看</title>
		<style type="text/css" media="screen">
html,body {
	height: 100%;
}

body {
	margin: 0;
	padding: 0;
	overflow: auto;
}

#flashContent {
	display: none;
}
</style>

		<script type="text/javascript" src="js/swfobject/swfobject.js"></script>
		<script type="text/javascript">
            var swfVersionStr = "10.0.0";
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = {
                  SwfFile : escape("<%=path%>"),
		Scale : 1,   
                    ZoomTransition : 'easeOut',  
                    ZoomTime : 0.5,  
                    ZoomInterval : 0.2,  
                    FitPageOnLoad : false,  
                    FitWidthOnLoad : false,  
                    PrintEnabled : false,  
                    FullScreenAsMaxWindow : false,  
                    ProgressiveLoading : true,  
                    MinZoomSize : 0.2,  
                    MaxZoomSize : 5,  
                    SearchMatchAll : false,  
                    InitViewMode : 'Portrait',  
                    PrintToolsVisible : false,      
                    ViewModeToolsVisible : false,  
                    ZoomToolsVisible : true,  
                    NavToolsVisible : true,  
                    CursorToolsVisible :false,  
                    SearchToolsVisible : false,  
                    localeChain: 'zh_CN'  
	};

	var params = {

	}
	params.quality = "high";
	params.bgcolor = "#ffffff";
	params.allowscriptaccess = "sameDomain";
	params.allowfullscreen = "true";
	var attributes = {};
	attributes.id = "FlexPaperViewer";
	attributes.name = "FlexPaperViewer";
	swfobject.embedSWF("FlexPaperViewer.swf", "flashContent", "100%", "95%",
			swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
	swfobject.createCSS("#flashContent", "display:block;text-align:left;");
</script>
<script  type="text/javascript">
            function al(docId){
		           alert(docId);
				   window.open("http://10.215.29.231:7001/XIP/xz/zspt/doc/downloadFileById.jsp?doc_id="+docId);	
					
			}
</script>

	</head>
	<body>
		<div align="center">
			<div id="flashContent">
			</div>
	</div>
		<div align="right"  style="margin:10">
		<input type="button" style="width:60px;height:25px;" value="下 载" onclick="al('<%=docId%>')" ></input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		</div>
	</body>
</html>