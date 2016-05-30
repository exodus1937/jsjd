<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="com.xzsoft.xip.platform.util.PlatformUtil"%>
<%@ page import="java.util.Properties"%>
<%@ page import="org.apache.commons.net.util.Base64"%>
<%
	// 取得配置文件值
    String serverUrl = PlatformUtil.getXipConfigVal("cas.casServerUrl");
    String loginCheckUrl = serverUrl+"/platformAction.do?method=personalLogin";
	// 系统名称
	String appName = PlatformUtil.getXipConfigVal("loginPage.appName");
	String keyCode = request.getParameter("keyCode");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录</title>
<%@ include file="/common/include/include4.inc"%>
<script type="text/javascript">
	var $$ = function(func){  
		if (document.addEventListener) {  
			window.addEventListener("load", func, false);  
		}  
		else if (document.attachEvent) {  
			window.attachEvent("onload", func);  
		}  
	}  
	  
	$$(function(){  
		var oInput = document.getElementById("userName");   
		oInput.focus();
	}) 


function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
</script>
<style type="text/css">

</style>
<style>
		*{margin:0;padding: 0;}
		body{overflow: hidden;background: url(imgs/bj.png);overflow: hidden;font: "微软雅黑";}
		span,img,input,button,b{display: block;border: none;}
		input,button{outline:none;border:none;display: block;}
		.fl{float: left;}
		.clear{clear: both;}
		.continar{position: relative;width: 100%;height:100%;}
		#back{position: absolute;left: 0;top:0;}
		.box2{position: absolute;opacity: 0.2;z-index: 2;background: #FFFFFF;height:400px;width:550px;}
		.box{position: absolute;z-index: 3;height:400px;width:550px;}
		.head{clear: both;width:100%;height:80px;background: #EEEEEE;}
		.head div{width:205px;80px;}
		.head div img{display: block;margin-left:59px;margin-top:20px;height: 34px;width: 125px;}
		
		.head b{width:343px;height:80px;padding-top:22px;display: block;font-weight: 600;}
		.head b span{height:33px;padding-left:20px;color:#197DDB;border-left: 1px solid #666666;line-height:100%;font-size: 33px;font-family: "微软雅黑";}
		
		.main{margin-top:52px;height: 268px;position: relative;}
		
		.main .user{width:100%;height:48px;margin:0 auto;}
		.main .pass{margin-top:30px}
		.main .user img{height:100%;width:10%;margin-left:25%;}
		.main .user input{height: 100%;width:40%;font-size: 24px;padding-left:16px;}
		.main .denglu{margin-left:24%;height:63px;width:60%;margin-top:50px;}
		.main .denglu img{height:63px;}
		.err_wrap{
			position: absolute;
			top:140px;
			left:252px;
		}
	</style>
</head>

<body>
	
	<div class="continar">
			<img src="imgs/back.jpg" id="back">
			<div class="box2"></div>
			<div class="box">
				<div class="head clear">
					<div class="fl"><img src="imgs/logo.png" class="fl"></div>
					<b class="fl"><span>实时技术监督系统</span></b>
				</div>
				<div class="main clear">
					<div class="user clear">
						<img src="imgs/user.png" class="fl">
						<!--<input type="text" class="input_style fl" id="userName" value="admin"  value=''/>-->
						<input name="userName" type="text" value='' class="input_style fl" id="userName" value="admin" />
					</div>
					<div class="user pass clear">
						<img src="imgs/pass.png" class="fl">
						<input name="password" value='' type="password" border="0" class="input_style fl" id="password" value="xzsoft" />
						<!--<input type="password" class="fl"/>-->
					</div>
					<div class="err_wrap" height="70" align="center" border="0" >
						<span id='err' style='font-size:15px;color:red;'></span>	
					</div>
					<div class="denglu">
						<div align="center">
							<a href="#" onclick="onLogon()" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Image3','','imgs/login.png',1)">
								<img src="imgs/login.png" name="Image3" style="margin-right:40px" width="290" height="49" border="0" id="Image3" />
							</a>
						</div>
					</div>
					
				</div>
			</div>

		</div>
	<script type="text/javascript">
	function is_or_not_ie7(){
		var browser=navigator.appName; 
	    var b_version=navigator.appVersion;
	    var version=b_version.split(";"); 
	    var trim_Version=version[1].replace(/[ ]/g,""); 
	    if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
	    { 
	    document.getElementById("userName").style.marginLeft="40px";
	    document.getElementById("password").style.marginLeft="40px";    
		}
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") {
		document.getElementById("err").style.marginLeft="-35px";
		}else{
		document.getElementById("err").style.marginLeft="-35px";
		}
	}
	is_or_not_ie7()
	</script>
	<script>
			function backSize(){
				var w=document.documentElement.clientWidth;
				var h=document.documentElement.clientHeight;
				var body=document.getElementsByTagName('body')[0];
				body.style.width=w+'px';
				body.style.height=h+'px';
				var box=document.getElementsByClassName('box')[0];
				var box2=document.getElementsByClassName('box2')[0];
				var back=document.getElementById("back");
				back.style.width=w+'px';
				back.style.height=400+'px';
				back.style.top=(h-400)/2+'px';
				box.style.left=w/2+'px';
				box.style.top=(h-400)/2+'px';
				box2.style.left=w/2+'px';
				box2.style.top=(h-400)/2+'px';
				document.getElementById("Image3").style.width=275+'px';
			}
			backSize();
			window.onresize=function(){
				backSize();
			}
			
</script>
<script type="text/javascript"
		src="<%=request.getContextPath()%>/pub/uip/common/scripts/md5.js"></script>
	<script language="javascript">
	 	function GetIeVar(){
		    var ua = navigator.userAgent;
			var   strBrowserName   =   navigator.appName;
			if (strBrowserName=="Microsoft Internet Explorer"){
		        	var msieOffset = ua.indexOf("MSIE");
				if (msieOffset >0){
			    	return (ua.substring(msieOffset + 5, ua.indexOf(";", msieOffset)));
				}else{ return (0);}
			}else{
				return (0);
			}
		}
	    if (GetIeVar()>=6){
	
	    }else{
	    	//alert('请使用IE6或以上版本浏览器打开！');
	    }
	</script>
	<script type="text/javascript">
		function keydown(e){
			var currKey=0,e=e||event;
			if(e.keyCode==13){
				onLogon();
			}
		}
		document.onkeydown=keydown;
		function onLogon(){
			document.getElementById("err").innerText = "";
			Ext.MessageBox.minWidth=150;
			var userName = document.getElementById("userName").value;
			if(userName == "" || userName == null || userName == "undefined"){
				//Ext.Msg.alert("提示信息","请输入用户名");
				//Ext.Msg.show({
				//	title:'提示信息',  
				//	msg:'请输入用户名',  
				//	modal:true,  
				//	prompt:false,  
				//	width:180,
					//value:'请输入',  
					//fn:function(id){alert(id)},  
				//	buttons:Ext.Msg.OK,  
				//	icon:Ext.Msg.WARNING 
				//});
				document.getElementById("err").innerText = "请输入用户名!";
				return false;
			}
			var password = document.getElementById("password").value;
			if(password == "" || password == null || password == "undefined"){
				//Ext.Msg.alert("提示信息","请输入密码!");
				//Ext.Msg.show({
				//	title:'提示信息',  
				//	msg:'请输入密码',  
				//	modal:true,  
				//	prompt:false,  
				//	width:180,
					//value:'请输入',  
					//fn:callBack,  
				//	buttons:Ext.Msg.OK,  
				//	icon:Ext.Msg.WARNING 
				//});
				document.getElementById("err").innerText = "请输入密码!";
				return false;
			}
			
			userName = encodeURI(userName).toUpperCase();
			password = hex_md5(password);
			
			Ext.Ajax.request({
				url:'<%=loginCheckUrl%>',
				method : 'post',
				async : true,
				params : {loginName:userName, password:password,"keyCode":"<%=keyCode%>"},
				success : function(response,options){
					var response = Ext.JSON.decode(response.responseText);
					var message = '';
					if(response.msg=='用户不存在!' || response.msg=='密码不正确!' ){
							message = '用户名或密码错误';
					}else{
							message = response.msg;
					}
					
					if(response.flag==1){
						//Ext.Msg.alert('提示',response.msg);
						//Ext.Msg.show({
						//	title:'提示信息',  
						//	msg:message,  
						//	modal:true,  
						//	prompt:false,  
						//	width:180,
							//value:'请输入',  
							//fn:callBack,  
						//	buttons:Ext.Msg.OK,  
						//	icon:Ext.Msg.WARNING 
						//});
						document.getElementById("err").innerText = message;
						return;
					}else if(response.flag==-1){
						//Ext.Msg.alert('提示',"登录时发生错误,详细信息【"+response.msg+"】");
						Ext.Msg.show({
							title:'提示信息',  
							msg:"登录时发生错误,是否查看详细信息?",  
							modal:true,  
							prompt:false,  
							width:200,
							//value:'请输入',  
							fn:function(id){
								if(id=='yes'){
									var msgWindow = new Ext.Window({
										id:'msgWindow',
									    title: '错误信息',
									    height: 300,
									    width: 500,
									    layout: 'fit',
									    modal: true,
										resizable: true,
										maximizable: true,
										items:[
											new Ext.form.TextArea({
												value:response.msg
											})
										]
										//html: 
									});
									msgWindow.show();
								}
							},  
							buttons:Ext.Msg.YESNO,  
							icon:Ext.Msg.ERROR  
						});
						return;
					}else{
						url = response.url;
						
						window.location.href = url;
					}
				},
				failure : function(response,options) {
					var response = Ext.JSON.decode(response.responseText);
					Ext.Msg.show({
						title : '提示信息',
						msg : response.msg,
						modal : true,
						prompt : false,
						width : 180,
						//value:'请输入',  
						//fn:callBack,  
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.ERROR
					});
					//Ext.Msg.alert("提示信息", response.msg);
				}
			});
		}
		// 重置
		function onReset() {
			document.getElementById("userName").value = "";
			document.getElementById("password").value = "";
		}
	</script>
</body>
</html>
