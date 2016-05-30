<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String funTreeId = request.getParameter("funTreeId");
	String type = request.getParameter("type");//r:读  rw:读写
	
	String contextPath = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>HTML编辑器</title>
    
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="themes/default/default.css" />
	<link rel="stylesheet" href="plugins/code/prettify.css" />
	<script type="text/javascript" src="kindeditor-min.js"></script>
	<script type="text/javascript" src="lang/zh_CN.js"></script>
	
	<link rel="stylesheet" href="<%=contextPath%>/webbuilder/controls/ext/resources/css/ext-all.css" type="text/css">
	<script type="text/javascript" src="<%=contextPath%>/webbuilder/controls/ext/ext-all.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/webbuilder/controls/ext/locale/ext-lang-zh_CN.js"></script>
	
	<script>
		var htmlEditor = null;
		var type = '<%=type%>';
		KindEditor.ready(function(K) {
			if(type=='r'){
				htmlEditor = K.create('textarea[name=editContent]', {
					cssPath : 'themes/default/default.css',
					uploadJson : 'jsp/upload_json.jsp',
					fileManagerJson : 'jsp/file_manager_json.jsp',
					allowFileManager : true,	//允许查看文件
					fullscreenMode :true,		//默认全屏,
					readonlyMode : true,
					hidemenu:true,
					items:[] //配置kindeditor编辑器的工具栏菜单项
				});
			}else{
				htmlEditor = K.create('textarea[name=editContent]', {
					cssPath : 'themes/default/default.css',
					uploadJson : 'jsp/upload_json.jsp',
					fileManagerJson : 'jsp/file_manager_json.jsp',
					allowFileManager : true,	//允许查看文件
					fullscreenMode :true,		//默认全屏,
					readonlyMode : false
				});
			}
		});
		function getHtml(){
			return htmlEditor.html();
		}
		//同步后，读取编辑框中的数据
		function getValueForEditor(){
			return htmlEditor.html();
			//htmlEditor.sync();
			//var editContent = document.getElementById("editContent");
			//return editContent.innerHtml();
			//return editContent.value;
		}
	</script>
	</head>
	<body>
		<textarea id="editContent" name="editContent" cols="100" rows="8" style="width:700px; height: 500px;">${param.editorValue }</textarea>
		<script type="text/javascript">
			Ext.onReady(function(){
				/**var extUtil = new ExtUtil();
				extUtil.setParam('fun_tree_id','<%=funTreeId%>');
				var jsonData = extUtil.getJsonObjBySQL('functionMenu.getFuncHelpById');
				if(jsonData.FUN_HELP != null){
					htmlEditor.html(jsonData.FUN_HELP);
				}**/
				
				Ext.Ajax.request({
	                url : '<%=contextPath%>/main?xwl=23X1UH8WGFK4',
	                method: 'POST',
	                params:{"funcTreeId":'<%=funTreeId%>'},
	                success: function(response,options){
	                  var temp = response.responseText;
	                  var resp = Ext.JSON.decode(temp);
	                  
	                  if(resp.FUN_HELP){
	                	  htmlEditor.html(resp.FUN_HELP);
	                  }
	                  
	                },
	                failure: function(response,options){
	                  Ext.Msg.alert("提示","服务器端没有响应,退出失败");
	                }
	              });
				
			});
		</script>
	</body>
</html>
