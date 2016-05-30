<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.xzsoft.xip.platform.util.PlatformUtil" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	// 系统导航模式
	String navigator_model = PlatformUtil.getSystemParamVal("NAVIGATOR_MODEL") ;
	String mainPageUrl =PlatformUtil.getSystemParamVal("MAIN_PAGE_URL");
	if((mainPageUrl==null)||("".equals(mainPageUrl.trim()))){
	    if("TREE".equals(navigator_model)){
	        mainPageUrl = path+"/main?xwl=23VRM7XF4LFO";
	    }else{
	        mainPageUrl = path+"/main?xwl=23VVL2NDQLT5";
	    }
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
</head>
<body>
 <script type="text/javascript">
    <%if(PlatformUtil.isMoblie(request)){%>
        window.location.href="<%=path%>/main?xwl=23W2EADAWUTR";
 	<%}else{%>
 		window.location.href="<%=mainPageUrl%>";
 	<%}%>
 </script>
</script>
</body>
</html>
