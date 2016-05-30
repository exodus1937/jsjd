/**
 * 主模块菜单
 * @author  宋延军
 * @param arg 请求编号
 */
common.prototype.frame.nav = function(arg) {
	$("#menuUL").append(""); var menuUL = "";
	$.post("/YunHwaKKX/system/userJuriRoot", function(data) {
		if (data.FLAG == "SUCCESS") {
			if(data.juriRootAll!=undefined && data.juriRootAll!=null){
				for ( var i = 0; i < data.juriRootAll.length; i++) {
					if (data.juriRootAll[i].jPid == "0") {
						if(data.juriRootAll[i].isCompetence == true){//console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------正在生成模块代码：'+data.juriRootAll[i].jName);
							//menuUL +="<li><a href='#' id='" +data.juriRootAll[i].appendRootTagID +"' onclick='common.prototype.frame.nav_click(\"" +data.juriRootAll[i].appendRootTagID +"\", \"" +data.juriRootAll[i].appendLayerTitle +"\", \"" +data.juriRootAll[i].appendLayerTitleStyle +"\", \"" +data.juriRootAll[i].appendLayerAreaW +"\", \"" +data.juriRootAll[i].appendLayerAreaH +"\", \"" +data.juriRootAll[i].jPath+"\");'><img src='../resources/images/"+data.juriRootAll[i].appendRootImage+"' /><span>"+data.juriRootAll[i].jName+"</span></a></li>";
							//@steven 2015.01.30 update codes.
							menuUL +="<li><a href='javascript:void(0);' id='" +data.juriRootAll[i].appendRootTagID +"' onclick='common.prototype.frame.nav_click(\"" +data.juriRootAll[i].appendRootTagID +"\", \"" +data.juriRootAll[i].jPath+"\");'><img src='../resources/images/"+data.juriRootAll[i].appendRootImage+"' /><span>"+data.juriRootAll[i].jName+"</span></a></li>";
						}//if..end.
					}//if..end.
				}//for..end.
			}//if..end.
			alert(menuUL);
			$("#menuUL").append(menuUL);//console.log(menuUL)
		}//if..end.
	});//.post..end.
};
///**
// * 点击主菜单时公共调用方法
// * @author 宋延军
// * @param {} appendRootTagID 
// * @param {} appendLayerTitle
// * @param {} appendLayerTitleStyle
// * @param {} appendLayerAreaW
// * @param {} appendLayerAreaH
// * @param {} jPath
// */
//common.prototype.frame.nav_click = function(appendRootTagID, appendLayerTitle, appendLayerTitleStyle, appendLayerAreaW, appendLayerAreaH, jPath){
//	//console.log('-------------------------------------------------------传递过来的参数：'+appendRootTagID+"  ,  "+ appendLayerTitle+"  ,  "+ appendLayerTitleStyle+"  ,  "+ appendLayerAreaW+"  ,  "+ appendLayerAreaH+"  ,  "+ jPath);
//	$("#"+appendRootTagID).click(function(){ 	
//		$.layer({ type: 2, title: [appendLayerTitle, appendLayerTitleStyle],   shadeClose: true, maxmin: true,  fix : false, border:[0],   area: [appendLayerAreaW, appendLayerAreaH], iframe: {src: jPath} });
//	});
//};

//@steven 2015.01.30 update codes.
/**
 * 点击主菜单时公共调用方法
 * @author 宋延军
 * @param {} appendRootTagID 
 * @param {} jPath
 */
common.prototype.frame.nav_click = function(appendRootTagID, jPath){
	//console.log('-------------------------------------------------------传递过来的参数：'+appendRootTagID+"  ,  "+ jPath);
	//$("#"+appendRootTagID).click(function(){ 	
	//$("#"+appendRootTagID).on("click", function(e){	
	$(document).on('click','#'+appendRootTagID, function (){	
		window.location.href = jPath;
	});
};
/**
 * 初始加载项
 * @author  宋延军
 */
$(document).ready( function() {
	common.prototype.frame.nav(0);
});