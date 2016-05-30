//定义全局功能节点变量
//var gobal=null;

common.prototype.page.main.load = function(){

	common.prototype.page.main.getRolesByUserId();
	common.prototype.page.main.loadMenuTree();
};
/**
 * 加载用户角色
 */
common.prototype.page.main.getRolesByUserId =function(){
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
common.prototype.page.main.loadMenuTree =function(){
	$.post("../newPage.do?method=loadMenuTree",{}, function(data) {
		common.prototype.page.main.showMenu(data);	
	});
}
/**
 * 加载当前节点下一级节点
 */
common.prototype.page.main.loadMenuTreeNext =function(menuId,nodeType){
	if(nodeType=="F"){
		//alert("叶子节点,跳转到WB平台");
		common.prototype.page.main.loginAgain(menuId);
	}else{
		$.post("../newPage.do?method=loadMenuTreeNext",{menuId:menuId}, function(data) {
			common.prototype.page.main.showMenu(data);	
		});
	}	
}
/**
 * 展示功能节点
 */
common.prototype.page.main.showMenu =function(data){
	var obj = eval(data);
	$("#menuUL li").remove(); var menuUL = "";
	for(var i=0;i<obj.length;i++){
		var node=obj[i];
		//gobal=node;
		menuUL +="<li><a href='javascript:void(0);' id='" +node.menuId +"' onclick='common.prototype.page.main.loadMenuTreeNext(\"" +node.menuId +"\", \"" +node.nodeType +"\");'><img src='../newNav/treePic/a01.png' /><span>"+node.menuName+"</span></a></li>";		
	}
	$("#menuUL").append(menuUL);//console.log(menuUL)	
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