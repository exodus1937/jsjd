<%@page import="java.net.InetAddress"%>
<%@page import="com.xzsoft.util.PropertiesUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<% 
	String type=request.getParameter("type");
	String imageName = new PropertiesUtil().getImageName(type);
	//获取本机ip
    String ip =  InetAddress.getLocalHost().getHostAddress();
//	String path = "http://"+ip+"/ztt/image/"+imageName;
	//String realPth = PropertiesUtil.getRealPath()+"ztt/image/abc.pdi";
%>
</head>
	<body>
	
			<div width="198%" height="1600" > 
				<img src="image/icon_zoom-in_alt.png" height="20" width="20" onclick="PhotoSize.action(1);"  />&nbsp;&nbsp;
				<img src="image/icon_zoom-out_alt.png" height="20" width="20" onclick="PhotoSize.action(-1);" />&nbsp;&nbsp;
				<img src="image/icon_zoom-reset_alt.png" height="20" width="20" onclick="PhotoSize.action(0);" />&nbsp;&nbsp;
				<img src="image/icon_close_alt2.png" height="20" width="20" onclick="close_win()" />
				<!--
				<input type="button" value="放大" onclick="PhotoSize.action(1);" /> 
				<input type="button" value="缩小" onclick="PhotoSize.action(-1);" /> 
				<input type="button" value="还原大小" onclick="PhotoSize.action(0);" /> 
				<input type="button" value="查看当前倍数" onclick="alert(PhotoSize.cpu);" /> --> 
				<br />
			<object classid="clsid:4F26B906-2854-11D1-9597-00A0C931BFC8" id="oframe" width="98%" height="600"> 
				<param name="DisplayURL" value="http://10.44.1.160:7001/jsjd/ztt/image/<%=imageName %>">
				<!--<EMBED PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"/>
        -->
	    </object> 
	  </div>
	    <script>
	    	var PhotoSize = {
			  zoom: 0, // 缩放率
			  count: 0, // 缩放次数
			  cpu: 0, // 当前缩放倍数值
			  elem: "", // 图片节点
			  photoWidth: 0, // 图片初始宽度记录
			  photoHeight: 0, // 图片初始高度记录
			   
			  init: function(){
			    this.elem = document.getElementById("oframe");
			    this.photoWidth = this.elem.scrollWidth;
			    this.photoHeight = this.elem.scrollHeight;
			     
			    this.zoom = 1.2; // 设置基本参数
			    this.count = 0;
			    this.cpu = 1;
			  },
			   
			  action: function(x){
			    if(x === 0){
			      this.cpu = 1;
			      this.count = 0;
			    }else{
			      this.count += x; // 添加记录
			      this.cpu = Math.pow(this.zoom, this.count); // 任意次幂运算
			    };
			    this.elem.style.width = this.photoWidth * this.cpu +"px";
			    this.elem.style.height = this.photoHeight * this.cpu +"px";
			  }
			};
				    	
				window.onload = function(){PhotoSize.init()};    	
	    	
	    	
	    	
			function DetectActiveX()
			{
			try {
			var comActiveX = new ActiveXObject('PBDCTRL.PbdCtrl.1'); // 判断IE是否已经安装pi插件
			} catch (e) {
			return false;
			}
			return true;
			}
			 
			if(DetectActiveX()==false){
			//alert("插件未装");
			window.location.href="error.jsp";
			}
			
			function close_win(){
		//	 parent.Ext.getCmp("c_win").close();
			var closewin = parent.Ext.getCmp("c_win");
			if(closewin){
				//win.destory();
				closewin.close();
	  	} 
	
		}
  </script>
		  
	</body>
</html>