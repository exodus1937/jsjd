//弹出窗口拖拽	
	if(typeof addEvent!='function'){var addEvent=function(o,t,f,l){var d='addEventListener',n='on'+t,rO=o,rT=t,rF=f,rL=l;if(o[d]&&!l)return o[d](t,f,false);if(!o._evts)o._evts={};if(!o._evts[t]){o._evts[t]=o[n]?{b:o[n]}:{};o[n]=new Function('e','var r=true,o=this,a=o._evts["'+t+'"],i;for(i in a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');if(t!='unload')addEvent(window,'unload',function(){removeEvent(rO,rT,rF,rL)})}if(!f._i)f._i=addEvent._i++;o._evts[t][f._i]=f};addEvent._i=1;var removeEvent=function(o,t,f,l){var d='removeEventListener';if(o[d]&&!l)return o[d](t,f,false);if(o._evts&&o._evts[t]&&f._i)delete o._evts[t][f._i]}}function cancelEvent(e,c){e.returnValue=false;if(e.preventDefault)e.preventDefault();if(c){e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()}};function DragResize(myName,config){var props={myName:myName,enabled:true,handles:['tl','tm','tr','ml','mr','bl','bm','br'],isElement:null,isHandle:null,element:null,handle:null,minWidth:10,minHeight:10,minLeft:-9999,maxLeft:9999,minTop:-9999,maxTop:9999,zIndex:4000,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,mOffX:0,mOffY:0,elmX:0,elmY:0,elmW:0,elmH:0,allowBlur:true,ondragfocus:null,ondragstart:null,ondragmove:null,ondragend:null,ondragblur:null};for(var p in props)this[p]=(typeof config[p]=='undefined')?props[p]:config[p]};DragResize.prototype.apply=function(node){var obj=this;addEvent(node,'mousedown',function(e){obj.mouseDown(e)});addEvent(node,'mousemove',function(e){obj.mouseMove(e)});addEvent(node,'mouseup',function(e){obj.mouseUp(e)})};DragResize.prototype.select=function(newElement){with(this){if(!document.getElementById||!enabled)return;if(newElement&&(newElement!=element)&&enabled){element=newElement;element.style.zIndex=++zIndex;if(this.resizeHandleSet)this.resizeHandleSet(element,true);elmX=parseInt(element.style.left);elmY=parseInt(element.style.top);elmW=element.offsetWidth;elmH=element.offsetHeight;if(ondragfocus)this.ondragfocus()}}};DragResize.prototype.deselect=function(delHandles){with(this){if(!document.getElementById||!enabled)return;if(delHandles){if(ondragblur)this.ondragblur();if(this.resizeHandleSet)this.resizeHandleSet(element,false);element=null}handle=null;mOffX=0;mOffY=0}};DragResize.prototype.mouseDown=function(e){with(this){if(!document.getElementById||!enabled)return true;var elm=e.target||e.srcElement,newElement=null,newHandle=null,hRE=new RegExp(myName+'-([trmbl]{2})','');while(elm){if(elm.className){if(!newHandle&&(hRE.test(elm.className)||isHandle(elm)))newHandle=elm;if(isElement(elm)){newElement=elm;break}}elm=elm.parentNode}if(element&&(element!=newElement)&&allowBlur)deselect(true);if(newElement&&(!element||(newElement==element))){if(newHandle)cancelEvent(e);select(newElement,newHandle);handle=newHandle;if(handle&&ondragstart)this.ondragstart(hRE.test(handle.className))}}};DragResize.prototype.mouseMove=function(e){with(this){if(!document.getElementById||!enabled)return true;mouseX=e.pageX||e.clientX+document.documentElement.scrollLeft;mouseY=e.pageY||e.clientY+document.documentElement.scrollTop;var diffX=mouseX-lastMouseX+mOffX;var diffY=mouseY-lastMouseY+mOffY;mOffX=mOffY=0;lastMouseX=mouseX;lastMouseY=mouseY;if(!handle)return true;var isResize=false;if(this.resizeHandleDrag&&this.resizeHandleDrag(diffX,diffY)){isResize=true}else{var dX=diffX,dY=diffY;if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmX+=diffX;elmY+=diffY}with(element.style){left=elmX+'px';width=elmW+'px';top=elmY+'px';height=elmH+'px'}if(window.opera&&document.documentElement){var oDF=document.getElementById('op-drag-fix');if(!oDF){var oDF=document.createElement('input');oDF.id='op-drag-fix';oDF.style.display='none';document.body.appendChild(oDF)}oDF.focus()}if(ondragmove)this.ondragmove(isResize);cancelEvent(e)}};DragResize.prototype.mouseUp=function(e){with(this){if(!document.getElementById||!enabled)return;var hRE=new RegExp(myName+'-([trmbl]{2})','');if(handle&&ondragend)this.ondragend(hRE.test(handle.className));deselect(false)}};DragResize.prototype.resizeHandleSet=function(elm,show){with(this){if(!elm._handle_tr){for(var h=0;h<handles.length;h++){var hDiv=document.createElement('div');hDiv.className=myName+' '+myName+'-'+handles[h];elm['_handle_'+handles[h]]=elm.appendChild(hDiv)}}for(var h=0;h<handles.length;h++){elm['_handle_'+handles[h]].style.visibility=show?'inherit':'hidden'}}};DragResize.prototype.resizeHandleDrag=function(diffX,diffY){with(this){var hClass=handle&&handle.className&&handle.className.match(new RegExp(myName+'-([tmblr]{2})'))?RegExp.$1:'';var dY=diffY,dX=diffX,processed=false;if(hClass.indexOf('t')>=0){rs=1;if(elmH-dY<minHeight)mOffY=(dY-(diffY=elmH-minHeight));else if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));elmY+=diffY;elmH-=diffY;processed=true}if(hClass.indexOf('b')>=0){rs=1;if(elmH+dY<minHeight)mOffY=(dY-(diffY=minHeight-elmH));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmH+=diffY;processed=true}if(hClass.indexOf('l')>=0){rs=1;if(elmW-dX<minWidth)mOffX=(dX-(diffX=elmW-minWidth));else if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));elmX+=diffX;elmW-=diffX;processed=true}if(hClass.indexOf('r')>=0){rs=1;if(elmW+dX<minWidth)mOffX=(dX-(diffX=minWidth-elmW));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));elmW+=diffX;processed=true}return processed}};

//树形菜单
$(function(){
	$.fn.extend({
		SimpleTree:function(options){
			
			//初始化参数
			var option = $.extend({
				click:function(a){ }
			},options);
			
			option.tree=this;	/* 在参数对象中添加对当前菜单树的引用，以便在对象中使用该菜单树 */
			
			option._init=function(){
				/*
				 * 初始化菜单展开状态，以及分叉节点的样式
				 */				
				this.tree.find("ul ul").hide();	/* 隐藏所有子级菜单 */
				this.tree.find("ul ul").prev("li").removeClass("open");	/* 移除所有子级菜单父节点的 open 样式 */
				
				this.tree.find("ul ul[show='true']").show();	/* 显示 show 属性为 true 的子级菜单 */
				this.tree.find("ul ul[show='true']").prev("li").addClass("open");	/* 添加 show 属性为 true 的子级菜单父节点的 open 样式 */
			}/* option._init() End */
			
			/* 设置所有超链接不响应单击事件 */
			this.find("a").click(function(){ $(this).parent("li").click(); return false; });
			
			/* 菜单项 <li> 接受单击 */
			this.find("li").click(function(){
				/*
				 * 当单击菜单项 <li>
				 * 1.触发用户自定义的单击事件，将该 <li> 标签中的第一个超链接做为参数传递过去
				 * 2.修改当前菜单项所属的子菜单的显示状态（如果等于 true 将其设置为 false，否则将其设置为 true）
				 * 3.重新初始化菜单
				 */
				
				option.click($(this).find("a")[0]);	/* 触发单击 */
				
				/* 
				 * 如果当前节点下面包含子菜单，并且其 show 属性的值为 true，则修改其 show 属性为 false
				 * 否则修改其 show 属性为 true
				 */
				if($(this).next("ul").attr("show")=="true"){
					$(this).next("ul").attr("show","false");					
				}else{
					$(this).next("ul").attr("show","true");
				}
				
				/* 初始化菜单 */
				option._init();
			});
			
			/* 设置所有父节点样式 */
			this.find("ul").prev("li").addClass("folder");
			
			/* 设置节点“是否包含子节点”属性 */
			this.find("li").find("a").attr("hasChild",false);
			this.find("ul").prev("li").find("a").attr("hasChild",true);
			
			/* 初始化菜单 */
			option._init();
			
		}/* SimpleTree Function End */
		
	});
});
	
$(function(){
	$(".st_tree").SimpleTree({
	});
});	
	
	$(document).ready(
	function(){
	// js模拟select
(function($){
var selects=$('.choose');//获取select
for(var i=0;i<selects.length;i++){
	createSelect(selects[i],i);
}
function createSelect(select_container,index){
	//创建select容器，class为select_box，插入到select标签前
	var tag_select=$('<div></div>');//div相当于select标签
	tag_select.attr('class','select_box');
	tag_select.insertBefore(select_container);
	//显示框class为select_showbox,插入到创建的tag_select中
	var select_showbox=$('<div></div>');//显示框
	select_showbox.css('cursor','pointer').attr('class','select_showbox').appendTo(tag_select);
	//创建option容器，class为select_option，插入到创建的tag_select中
	var ul_option=$('<ul></ul>');//创建option列表
	ul_option.attr('class','select_option');
	ul_option.appendTo(tag_select);
	createOptions(index,ul_option);//创建option
	//点击显示框
	tag_select.toggle(function(){
		ul_option.slideDown();
	},function(){
		ul_option.slideUp();
	});
	var li_option=ul_option.find('li');
	li_option.on('click',function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var value=$(this).text();
		select_showbox.text(value);
		ul_option.slideUp();
	});
	li_option.hover(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
	},function(){
		li_option.removeClass('hover');
	});
}
function createOptions(index,ul_list){
	//获取被选中的元素并将其值赋值到显示框中
	var options=selects.eq(index).find('option'),
		selected_option=options.filter(':selected'),
		selected_index=selected_option.index(),
		showbox=ul_list.prev();
		showbox.text(selected_option.text());
	//为每个option建立个li并赋值
	for(var n=0;n<options.length;n++){
		var tag_option=$('<li></li>'),//li相当于option
			txt_option=options.eq(n).text();
		tag_option.text(txt_option).css('cursor','pointer').appendTo(ul_list);
		//为被选中的元素添加class为selected
		if(n==selected_index){
			tag_option.attr('class','selected');
		}
	}
}
})(jQuery)

/*

	//使左右高度相等
	var main_height=$(".wu_left").height()-$(".wu_top").height()+20
	$(".wu_main").css({"min-height": main_height+"px" });
	*/
	//获取并定义树形菜单的高度
	var st_height=document.documentElement.clientHeight-60
	document.getElementById("st_tree").style.height=st_height+"px";
	//获取并定义wu_main的margin
	var main_mar=$(".wu_top").outerHeight(true)
	$(".wu_main").css({"margin-top": main_mar+"px" });


	//click弹出层
    $(".wu_top1 h2").each(
	function(i){
    	$(this).hover(
		function(){	  
	  	$(".wu_top1 h3").hide();
	  	$(this).parent().find("h3").slideDown();
		} ,
		function(){	  
		$(document).click(
   		function(){
   		$(".wu_top1 h3").slideUp();
   		}
   		);
       $(".wu_top1 h2 ,.wu_top1 h3").click(
	   function(event){
       event.stopPropagation();
	}
	); 
		
		}
		);
   }
   );
  

   }
   );
   
   
   //折线图

var dragresize = new DragResize('dragresize',
{ minWidth:400, minHeight: 250});
dragresize.isElement = function(elm)
{
if (elm.className && elm.className.indexOf('lineDiv') > -1) return true;
};
dragresize.isHandle = function(elm)
{
if (elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
};
dragresize.ondragfocus = function() { };
dragresize.ondragstart = function(isResize) { };
dragresize.ondragmove = function(isResize) { };
dragresize.ondragend = function(isResize) { };
dragresize.ondragblur = function() { };
dragresize.apply(document);
$(document).ready(

function(){
	//初始化弹窗的相对定位
	var line_width=($(window).width()-700)/2+"px";
	//var line_height=($(window).height()-365)/2+"px";
	var line_height=100;
    $(".lineDiv").css({"left" :line_width , "top":line_height});
	//改变窗口浏览器大小重置相对定位
	$(window).resize(function(){
	var line_width=($(window).width()-700)/2+"px";
	var line_height=($(window).height()-365)/2+"px";
    $(".lineDiv").css({"left" :line_width , "top":line_height});
	});
	//弹窗淡入淡出
	$(".zhexian").bind("click",
	   function(event){
       $(this).children(".lineDiv").fadeIn();
       event.stopPropagation();
	   }
	)
	//弹出层关闭按钮
	$(".drsMoveHandle span").bind("click",
	   function(event){
       $(this).parent().parent(".lineDiv").fadeOut();
       event.stopPropagation();
	  }
	)	

}
);