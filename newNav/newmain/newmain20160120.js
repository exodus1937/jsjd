common.prototype.page.fork.load = function(){
		
	
	$("#loginUSERINFO").click(function() {
		$('.theme-popover-mask').fadeIn(100);
		$('.theme-popover').slideDown(200);
	});
	$('.theme-poptit .close').click(function() {
		$('.theme-popover-mask').fadeOut(100);
		$('.theme-popover').slideUp(200);
	});				
				
	$('.iframeCon').mouseover(function(){
		$('.navSecond').hide();
		$('.navFirst dd').removeClass('current');
	});			
	 var curWwwPath = window.document.location.href;  
    //获取主机地址之后的目录，如： cis/website/meun.htm  
    var pathName = window.document.location.pathname;  
    var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080  
    var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis  
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);  
    var rootPath = localhostPaht + projectName

    document.getElementById("url").value=rootPath;
    
	common.prototype.page.fork.turnPageInit();
	common.prototype.page.fork.getRolesByUserId();
	common.prototype.page.fork.loadMenuTree(rootPath);
}
/**
 * 跳转首页后初始化用户信息
 */
common.prototype.page.fork.turnPageInit= function(){
	$.post("../newPage.do?method=turnPageInit",{}, function(data) {
		var obj = eval(data);
		//$("#username").append(obj.userName);
		$("#username").append(obj.empName);
		
		$("#userName").attr("value",obj.userName);
		$("#userId").attr("value",obj.userId);
		$("#roleName").attr("value",obj.roleName);
		$("#empName").attr("value",obj.empName);
		$("#org_name").attr("value",obj.org_name);
		
		var mainPage=obj.path+obj.homePage+'?userId='+obj.userId+'&roleId='+obj.roleId+'&userName='+obj.userName+'&roleCode='+obj.roleCode;
		//alert(mainPage);
		var frame=document.getElementById('index_page');
		frame.src=mainPage;
		
//		$("#userName1").append(obj.userName);
//		$("#userId1").append(obj.userId);
//		$("#roleName1").append(obj.roleName);
//		$("#empName1").append(obj.empName);
//		$("#org_name1").append(obj.org_name);
	});
}
/**
 * 加载用户角色
 */
common.prototype.page.fork.getRolesByUserId =function(){
	//alert(userId);
	$.post("../newPage.do?method=getRolesByUserId",{}, function(data) {
		var obj = eval(data);
		//alert(obj.length);
		//拆分obj列表用于填充角色转换下拉框
		
	});
}

/**
 * 加载用户第一级功能菜单
 */
common.prototype.page.fork.loadMenuTree =function(rootPath){
	//alert(rootPath);
	var firstMenu=$("#navFirst");
	$("#navFirst dd").remove();
	var homePage="<dd class='current'><a target='page' href='"+rootPath+"/portal.do' secMenuId='secMenu_1'>首 页</a></dd>";
	firstMenu.append(homePage);
//	$.post("../newPage.do?method=loadMenuTree",{}, function(data) {
//		var obj = eval(data);
//		
//		for(var i=0;i<obj.length;i++){			
//			var node=obj[i];
//			if(node.menuName!="首页"){
//				
//				var childDiv="<dd><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_Sec(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"</a></dd>";
//				firstMenu.append(childDiv);
//			}
//		}
//	});
	
	$.ajax({
		url : "../newPage.do?method=loadMenuTree",
		async: false,
		type : "POST", 
		//data: {menuId:menuId},
		success : function(data) {
			var obj = eval(data);
			
			for(var i=0;i<obj.length;i++){			
				var node=obj[i];
				if(node.menuName!="首页"){
					
					var childDiv="<dd><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_Sec(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"</a></dd>";
					firstMenu.append(childDiv);
				}
			}
		}
	});
	//一级导航样式
	window.leftnav = $(".leftNav");
	//leftnav.mCustomScrollbar('destroy')
	leftnav.mCustomScrollbar({
		autoHideScrollbar:true,
		scrollSpeed:20,
		scrollInertia:800, //滚动惯性-滚动缓动效果
		theme:"leftnav"
	});
}
/**
 * 加载二级子节点
 */
common.prototype.page.fork.loadMenuTreeNext_Sec =function(menuId,nodeType,url,menuName){
	if(nodeType=="F"){
		//alert("叶子节点,跳转到WB平台");
		//common.prototype.page.main.loginAgain(menuId);
		common.prototype.page.main.showIndex(url,menuName);
	}else{
		//非IE浏览器下字体响应
		$('.top_txt').fontFlex(26, 50, 18);
		$('.top_date').fontFlex(13, 100, 10);
		
		//var secMenuDiv=$("#secMenuDiv");
		$("#secMenuDiv ul").each(function(){
			var _this=$(this);
			_this.attr("id",menuId);
			_this.children().remove();
//			$.post("../newPage.do?method=loadMenuTreeNext",{menuId:menuId}, function(data) {
//				//生成子菜单样式
//				
//				var obj = eval(data);
//				var cDiv="";
//				for(var i=0;i<obj.length;i++){
//					var node=obj[i];
//					var childDiv="";
//					if(node.nodeType=="F"){
//						//叶子节点
//						childDiv="<li><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_Thr(\"" +node.menuId +"\", \"" +node.nodeType +"\");'>"+node.menuName+"</a></li>";
//					}else{
//						//非叶子节点
//						childDiv="<dd><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_Thr(\"" +node.menuId +"\", \"" +node.nodeType +"\");'>"+node.menuName+"-></a></dd>";
//					}
//					
//					cDiv+=childDiv;
//				}
//				_this.append(cDiv);	
//				common.prototype.page.fork.showChildMenu(menuId,"navFirst");
//			});
			
			$.ajax({
				url : "../newPage.do?method=loadMenuTreeNext",
				async: false,
				type : "POST", 
				data: {menuId:menuId},
				success : function(data) {
					//生成子菜单样式
					
					var obj = eval(data);
					var cDiv="";
					for(var i=0;i<obj.length;i++){
						var node=obj[i];
						var childDiv="";
						if(node.nodeType=="F"){
							//叶子节点
							childDiv="<li><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_Thr(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"</a></li>";
						}else{
							//非叶子节点
							childDiv="<dd><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_Thr(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"-></a></dd>";
						}
						
						cDiv+=childDiv;
					}
					_this.append(cDiv);	
					common.prototype.page.fork.showChildMenu(menuId,"navFirst");	
					
				}
			});
			
		})
		
		//var navSecond="<ul class='navSecond mCustomScrollbar _mCS_2' style='height: 156px; display: none;',id='"+menuId+"'>"
		
	}
	
}

/**
 * 加载三级子节点
 */
common.prototype.page.fork.loadMenuTreeNext_Thr =function(menuId,nodeType,url,menuName){
	if(nodeType=="F"){
		//alert("叶子节点,跳转到WB平台");
		//alert(url);
		//common.prototype.page.main.loginAgain(menuId);
		common.prototype.page.main.showIndex(url,menuName);
	}else{
		//非IE浏览器下字体响应
		$('.top_txt').fontFlex(26, 50, 18);
		$('.top_date').fontFlex(13, 100, 10);
		
		//var secMenuDiv=$("#secMenuDiv");
		$("#thrMenuDiv ul").each(function(){
			var _this=$(this);
			_this.attr("id",menuId);
			_this.children().remove();
			$.post("../newPage.do?method=loadMenuTreeNext",{menuId:menuId}, function(data) {
				//生成子菜单样式
				
				var obj = eval(data);
				var cDiv="";
				for(var i=0;i<obj.length;i++){
					var node=obj[i];
					var childDiv="";
					if(node.nodeType=="F"){
						//叶子节点
						childDiv="<li><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_fou(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"</a></li>";
					}else{
						//非叶子节点
						childDiv="<dd><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_fou(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"-></a></dd>";
					}
					
					cDiv+=childDiv;
				}
				_this.append(cDiv);	
				
				common.prototype.page.fork.showChildMenu(menuId,"secMenuDiv");
			});
		})
		
	}
	
}

/**
 * 加载四级子节点
 */
common.prototype.page.fork.loadMenuTreeNext_fou =function(menuId,nodeType,url,menuName){
	if(nodeType=="F"){
		//alert("叶子节点,跳转到WB平台");
		//common.prototype.page.main.loginAgain(menuId);
		common.prototype.page.main.showIndex(url,menuName);
	}else{
		//非IE浏览器下字体响应
		$('.top_txt').fontFlex(26, 50, 18);
		$('.top_date').fontFlex(13, 100, 10);
		
		//var secMenuDiv=$("#secMenuDiv");
		//alert("4");
		$("#fouMenuDiv ul").each(function(){
			var _this=$(this);
			_this.attr("id",menuId);
			_this.children().remove();
			$.post("../newPage.do?method=loadMenuTreeNext",{menuId:menuId}, function(data) {
				//生成子菜单样式
				
				var obj = eval(data);
				var cDiv="";
				for(var i=0;i<obj.length;i++){
					var node=obj[i];
					var childDiv="";
					if(node.nodeType=="F"){
						//叶子节点
						childDiv="<li><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_fiv(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"</a></li>";
					}else{
						//非叶子节点
						childDiv="<dd><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_fiv(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"-></a></dd>";
					}
					
					cDiv+=childDiv;
				}
				_this.append(cDiv);	
				
				common.prototype.page.fork.showChildMenu(menuId,"thrMenuDiv");
			});
		})
		
	}
	
}

/**
 * 加载五级子节点
 */
common.prototype.page.fork.loadMenuTreeNext_fiv =function(menuId,nodeType,url,menuName){
	if(nodeType=="F"){
		//alert("叶子节点,跳转到WB平台");
		//common.prototype.page.main.loginAgain(menuId);
		common.prototype.page.main.showIndex(url,menuName);
	}else{
		//非IE浏览器下字体响应
		$('.top_txt').fontFlex(26, 50, 18);
		$('.top_date').fontFlex(13, 100, 10);
		//var secMenuDiv=$("#secMenuDiv");
		$("#fivMenuDiv ul").each(function(){
			var _this=$(this);
			_this.attr("id",menuId);
			
			$.post("../newPage.do?method=loadMenuTreeNext",{menuId:menuId}, function(data) {
				//生成子菜单样式
				
				var obj = eval(data);
				var cDiv="";
				for(var i=0;i<obj.length;i++){
					var node=obj[i];
					var childDiv="";
					if(node.nodeType=="F"){
						//叶子节点
						childDiv="<li><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_six(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"</a></li>";
					}else{
						//非叶子节点
						childDiv="<dd><a target='page' href='javascript:void(0);' secMenuId='" +node.menuId +"' onclick='common.prototype.page.fork.loadMenuTreeNext_six(\"" +node.menuId +"\", \"" +node.nodeType +"\", \"" +node.url +"\", \"" +node.menuName +"\");'>"+node.menuName+"-></a></dd>";
					}
					
					cDiv+=childDiv;
				}
				_this.append(cDiv);	
				
				common.prototype.page.fork.showChildMenu(menuId,"fouMenuDiv");
			});
		})
		
	}
	
}
/**
 * 加载六级子节点
 */
common.prototype.page.fork.loadMenuTreeNext_six =function(menuId,nodeType,url,menuName){
	alert("对不起,系统暂不支持6级菜单:(,请调整菜单模式");
}
/**
 * 重写初始化登录(传递当前点击节点的menuId)
 */
common.prototype.page.main.loginAgain =function(menuId){
	$.post("../newPage.do?method=initNewLogin",{menuId:menuId}, function(data) {
		var obj = eval(data);
		var treenode=obj.node;
		//alert(treenode.text);
		window.location.href=obj.mainPageUrl;
	});
}
/**
 * 加载功能页面到前台首页中
 */
common.prototype.page.main.showIndex =function(url,menuName){
//	alert(url);
	if(url.indexOf('ztt.jsp') > 0 ){
		var win=Ext.create('Ext.window.Window',{
			id :'c_win',
			title: menuName,
	        closable: true,
	        closeAction: 'destroy',
	      	layout:'fit',
	      		items:[{html:"<iframe width='100%'  height='100%' class='iframeCon' src='.." +url +"'  name='page' frameborder='0'></iframe>"}]
		}).show();
		win.maximize();
	}else{
		
		$("#index_page").attr("src",".."+url);
	}
}

/**
 * 显示子菜单
 */
common.prototype.page.fork.showChildMenu = function(menuId,flag){
	
	var _this=null;
	var father=null;
	var x=null;
	
	if(flag=="navFirst"){
		father=("#navFirst");
		_this=$(".navFirst dd a[secMenuId$='"+menuId+"']");
		
		var mydd=_this.closest("dd");//new
		dds=$(".navFirst dd");//new
		
		var parentLi=_this.parent().children().eq(0);
		var secMenuObj = $("#"+_this.attr("secMenuId"));
		
		//二级导航样式----------------------------------------------------------------------
		var windowHeight = $(".JN_main").height();
		var top = parentLi.offset().top-$(".JN_leftNav").scrollTop();
		var y = top-parentLi.outerHeight();
		secMenuObj.height(secMenuObj.children().length*52);
		
		//$(parentLi).addClass('current').siblings().removeClass('current');
		
		dds.removeClass('current');//new
		mydd.addClass('current');//new
		
		if(y+secMenuObj.height()>windowHeight){
			if(secMenuObj.height()>windowHeight){
				y = 0;
				secMenuObj.height(windowHeight);
			}else if(top-secMenuObj.height()<0){
				y = 0;
			}else{
				y = top - secMenuObj.height();
			}
		}
		y=y<=0?0:y-86;
		
		x = $('.JN_leftNav').width();
		
		if($("#fivMenuDiv").children().eq(0).children().length>0){
			$("#fivMenuDiv").children().eq(0).children().each(function(){
				$(this).hide();				
			})
		}
		if($("#fouMenuDiv").children().eq(0).children().length>0){
			$("#fouMenuDiv").children().eq(0).children().each(function(){
				$(this).hide();				
			})
		}
		
		if($("#thrMenuDiv").children().eq(0).children().length>0){
			$("#thrMenuDiv").children().eq(0).children().each(function(){
				$(this).hide();
				
			})
		}
		secMenuObj.siblings().hide();
		secMenuObj.closest("div").css({"left":x,'top':y});
		secMenuObj.show();
		
	}else if(flag=="secMenuDiv"){
		father=$("#secMenuDiv");
		_this=$(".secMenuDiv dd a[secMenuId$='"+menuId+"']");
		
		var mydd=_this.closest("dd");//new
		dds=$(".secMenuDiv dd");//new
		
		var parentLi=_this.parent().children().eq(0);
		var secMenuObj = $("#"+_this.attr("secMenuId"));
		
		//三级导航样式-----------------------------------------------------------------------
		var windowHeight = $(".JN_main").height();
		var top = parentLi.offset().top-$(".JN_leftNav").scrollTop();
		var y = top-parentLi.outerHeight();
		secMenuObj.height(secMenuObj.children().length*52);
		
		//$(parentLi).addClass('current').siblings().removeClass('current');
		
		dds.removeClass('current');//new
		mydd.addClass('current');//new
		
		if(y+secMenuObj.height()>windowHeight){
			if(secMenuObj.height()>windowHeight){
				y = 0;
				secMenuObj.height(windowHeight);
			}else if(top-secMenuObj.height()<0){
				y = 0;
			}else{
				y = top - secMenuObj.height();
			}
		}
		y=y<=0?0:y-27;
		
		x = $('.JN_leftNav').width()+father.width();
		//alert(x)
		//x = _this.width()+$(father).width()-16 + 'px';
		
		if($("#fivMenuDiv").children().eq(0).children().length>0){
			$("#fivMenuDiv").children().eq(0).children().each(function(){
				$(this).hide();				
			})
		}
		if($("#fouMenuDiv").children().eq(0).children().length>0){
			$("#fouMenuDiv").children().eq(0).children().each(function(){
				$(this).hide();				
			})
		}
		
		secMenuObj.siblings().hide();
		secMenuObj.closest("div").css({"left":x,'top':y});
		secMenuObj.show();
	}else if(flag=="thrMenuDiv"){
		father=$("#thrMenuDiv");
		_this=$(".thrMenuDiv dd a[secMenuId$='"+menuId+"']");
		
		var mydd=_this.closest("dd");//new
		dds=$(".thrMenuDiv dd");//new
		
		var parentLi=_this.parent().children().eq(0);
		var secMenuObj = $("#"+_this.attr("secMenuId"));
		
		//四级导航样式-----------------------------------------------------------------
		var windowHeight = $(".JN_main").height();
		var top = parentLi.offset().top-$(".JN_leftNav").scrollTop();
		var y = top-parentLi.outerHeight();
		secMenuObj.height(secMenuObj.children().length*52);
		
		//$(parentLi).addClass('current').siblings().removeClass('current');
		
		dds.removeClass('current');//new
		mydd.addClass('current');//new
		
		if(y+secMenuObj.height()>windowHeight){
			if(secMenuObj.height()>windowHeight){
				y = 0;
				secMenuObj.height(windowHeight);
			}else if(top-secMenuObj.height()<0){
				y = 0;
			}else{
				y = top - secMenuObj.height();
			}
		}
		y=y<=0?0:y-27;
		
		x = $('.JN_leftNav').width()+$("#secMenuDiv").width()+father.width();
		//alert(x);
		
		//x = _this.width()+$(father).width()+$("#secMenuDiv").width() + 'px';
		
		if($("#fivMenuDiv").children().eq(0).children().length>0){
			$("#fivMenuDiv").children().eq(0).children().each(function(){
				$(this).hide();				
			})
		}
		secMenuObj.siblings().hide();
		secMenuObj.closest("div").css({"left":x,'top':y});
		secMenuObj.show();
	}else if(flag=="fouMenuDiv"){
		father=$("#fouMenuDiv");
		_this=$(".fouMenuDiv dd a[secMenuId$='"+menuId+"']");
		
		var mydd=_this.closest("dd");//new
		dds=$(".fouMenuDiv dd");//new
		
		var parentLi=_this.parent().children().eq(0);
		var secMenuObj = $("#"+_this.attr("secMenuId"));
		
		//五级导航样式--------------------------------------------------------------------------------------
		var windowHeight = $(".JN_main").height();
		var top = parentLi.offset().top-$(".JN_leftNav").scrollTop();
		var y = top-parentLi.outerHeight();
		secMenuObj.height(secMenuObj.children().length*52);
		
		//$(parentLi).addClass('current').siblings().removeClass('current');
		
		dds.removeClass('current');//new
		mydd.addClass('current');//new
		
		if(y+secMenuObj.height()>windowHeight){
			if(secMenuObj.height()>windowHeight){
				y = 0;
				secMenuObj.height(windowHeight);
			}else if(top-secMenuObj.height()<0){
				y = 0;
			}else{
				y = top - secMenuObj.height();
			}
		}
		y=y<=0?0:y+25;
		
		x = _this.width()+$(father).width()+$("#secMenuDiv").width()+$("#thrMenuDiv").width()-16 + 'px';
		
		secMenuObj.siblings().hide();
		secMenuObj.closest("div").css({"left":x,'top':y});
		secMenuObj.show();
	}else if(flag=="fivMenuDiv"){
		father=("#fivMenuDiv");
		_this=$(".fivMenuDiv dd a[secMenuId$='"+menuId+"']");
		x = _this.width()+$(father).width() + 'px';
	}	
	secMenuObj.mCustomScrollbar({
		autoHideScrollbar:true,
		scrollSpeed:20,
		scrollInertia:800,
		theme:"leftNav"
	});
}
/**
 * 是否注销
 */
common.prototype.page.fork.logout=function(event){	
	event.preventDefault();
	$('#logoutcheck').addClass('is-visible');
	
	//close popup
	$('#logoutcheck').on('click', function(event){
		if( $(event.target).is('#logoutcheck-container') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});

}
/**
 * 确定注销
 */
common.prototype.page.fork.logoutYes=function(){
	
	$.post("../frameAction.do?method=logout",{}, function(data) {
		var obj = eval(data);
		if(obj.flag=='1'){
			var logoutUrl = obj.logoutUrl ;
            var callbackUrl = obj.callbackUrl ;
            window.location.href = logoutUrl + callbackUrl ;
		}else{
			alert(obj.msg);
		}
	});
}
/**
 * 取消注销
 */
common.prototype.page.fork.logoutNo=function(event){
	event.preventDefault();
	$('#logoutcheck').removeClass('is-visible');
}

common.prototype.page.fork.getspan= function(){
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	return required;
}
/**
 * 修改密码
 */
common.prototype.page.fork.changePWD= function(){
	
	var win=Ext.create('Ext.window.Window',{
		id :'passWin',
		title: '密码修改',
        closable: true,
        closeAction: 'destroy',
        height:200,
        width:380,
        buttonAlign:'hide',        
      	layout:'fit',
      		items:[{xtype:'form',
	      			bodyStyle: 'padding: 10px;',
	      			id:'modifyPwdForm',
	        		frame:true,
	        		defaults: {
		                labelWidth: 60,
		                anchor:'98%',
		                inputType:'password',
		                afterLabelTextTpl:common.prototype.page.fork.getspan(),
		                allowBlank:false
		            },
      			    items:[{xtype:'textfield',
		            		fieldLabel:'原密码',
		            		id:'oldPwd',
		            		name:'oldPwd'      			    	
      			    },{xtype:'textfield',
	            		fieldLabel:'新密码',
	            		id:'newPwd',
	            		name:'newPwd'      			    	
      			    },{xtype:'textfield',
	            		fieldLabel:'确认密码',
	            		id:'confirmNewPwd',
	            		name:'confirmNewPwd'      			    	
      			    }]
      		}],
      		buttons:[{text:'保存',
     			  formBind: true,
     			  scope: this,
     			  handler: function(){
     				  var w=Ext.getCmp('passWin');
     				  var form=Ext.getCmp('modifyPwdForm');
	     				 var op = Ext.getCmp('oldPwd').getValue(); 
	     				 if(op === null || op === "" || op === "undefined"){
	     				   Ext.Msg.alert("提示","请输入原密码!") ;
	     				   return false;
	     				 }
	     				var np = Ext.getCmp('newPwd').getValue(); 
	     				if(np === null || np === "" || np === "undefined"){
	     				  Ext.Msg.alert("提示","请输入新密码!") ;
	     				  return false;
	     				}
	     				var cnp = Ext.getCmp('confirmNewPwd').getValue();
	     				var _tmpLen = '{#PW_LEN_LIMIT#}';
	     				if(cnp === null || cnp === "" || cnp === "undefined"){
	     				  Ext.Msg.alert("提示","请输入确认密码!") ;
	     				  return false;				
	     				}
	     				if(!form.getForm().isValid()){
	     					  Ext.Msg.alert("提示","密码长度不正确!") ;
	     					  return false;
	     				}
	     				if('{#PW_INCLUDE_CHAR#}'=='Y'){
	     					  var re = new RegExp("[A-Za-z\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]");
	     					  if(!re.test(np)){
	     					    Ext.Msg.alert("提示","新密码必须要包含字母或者特殊字符!");
	     					    return;
	     					  }
	     					}
	     				if(!form.getForm().isValid()){
	     					  if(Ext.isEmpty(_tmpLen) || _tmpLen===0){
	     					  Wb.warning('密码长度不能少于6位！');
	     					    return false;
	     					  }else{
	     					      Wb.warning('密码长度不能少于'+_tmpLen+'位！');
	     					    return false;
	     					  }
	     					}
	     				if(np != cnp){
	     					  Ext.Msg.alert("提示","新密码与确认密码不一致!") ;
	     					  return false;					
	     				}
	     				Ext.Msg.wait('正在修改,请稍后...');
	     			// 提交请求
	     				Ext.Ajax.request({
	     				  url 	: '../frameAction.do?method=modifyUserPassword',
	     				  params	: {
	     				    'oldPwd'   :	hex_md5(op),
	     				    'password' : 	hex_md5(cnp)
	     				  },
	     				  method 	: 'post',
	     				  success : function(response, options) {
	     				    //Ext.Msg.hide();
	     				    var resp = Ext.JSON.decode(response.responseText);
	     				    
	     				    if(resp.flag == 1){
	     				      var logoutUrl = resp.logoutUrl ;
	     				      var callbackUrl = resp.callbackUrl ;
	     				      // 对于open , window.opener
	     				      Ext.Msg.alert("提示", "密码修改成功！",function(){
	     				        w.hide();
	     				      });
	     				    }else{
	     				      Ext.Msg.alert("提示", resp.msg);
	     				    }
	     				  },
	     				  failure : function(reponse, options) {
	     				    Ext.Msg.hide();
	     				    var response = Ext.JSON.decode(response.responseText);
	     				    Ext.Msg.alert("提示", response.msg);
	     				  }
	     				});
     			  }
     		   },{text:'重置',
     		   	  scope: this,
     		   	  handler: this.close
     		   }]
	}).show();
}

