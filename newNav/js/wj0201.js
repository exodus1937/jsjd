//弹出窗口拖拽	
if(typeof addEvent!='function'){var addEvent=function(o,t,f,l){var d='addEventListener',n='on'+t,rO=o,rT=t,rF=f,rL=l;if(o[d]&&!l)return o[d](t,f,false);if(!o._evts)o._evts={};if(!o._evts[t]){o._evts[t]=o[n]?{b:o[n]}:{};o[n]=new Function('e','var r=true,o=this,a=o._evts["'+t+'"],i;for(i in a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');if(t!='unload')addEvent(window,'unload',function(){removeEvent(rO,rT,rF,rL)})}if(!f._i)f._i=addEvent._i++;o._evts[t][f._i]=f};addEvent._i=1;var removeEvent=function(o,t,f,l){var d='removeEventListener';if(o[d]&&!l)return o[d](t,f,false);if(o._evts&&o._evts[t]&&f._i)delete o._evts[t][f._i]}}function cancelEvent(e,c){e.returnValue=false;if(e.preventDefault)e.preventDefault();if(c){e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()}};function DragResize(myName,config){var props={myName:myName,enabled:true,handles:['tl','tm','tr','ml','mr','bl','bm','br'],isElement:null,isHandle:null,element:null,handle:null,minWidth:10,minHeight:10,minLeft:-9999,maxLeft:9999,minTop:-9999,maxTop:9999,zIndex:4000,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,mOffX:0,mOffY:0,elmX:0,elmY:0,elmW:0,elmH:0,allowBlur:true,ondragfocus:null,ondragstart:null,ondragmove:null,ondragend:null,ondragblur:null};for(var p in props)this[p]=(typeof config[p]=='undefined')?props[p]:config[p]};DragResize.prototype.apply=function(node){var obj=this;addEvent(node,'mousedown',function(e){obj.mouseDown(e)});addEvent(node,'mousemove',function(e){obj.mouseMove(e)});addEvent(node,'mouseup',function(e){obj.mouseUp(e)})};DragResize.prototype.select=function(newElement){with(this){if(!document.getElementById||!enabled)return;if(newElement&&(newElement!=element)&&enabled){element=newElement;element.style.zIndex=++zIndex;if(this.resizeHandleSet)this.resizeHandleSet(element,true);elmX=parseInt(element.style.left);elmY=parseInt(element.style.top);elmW=element.offsetWidth;elmH=element.offsetHeight;if(ondragfocus)this.ondragfocus()}}};DragResize.prototype.deselect=function(delHandles){with(this){if(!document.getElementById||!enabled)return;if(delHandles){if(ondragblur)this.ondragblur();if(this.resizeHandleSet)this.resizeHandleSet(element,false);element=null}handle=null;mOffX=0;mOffY=0}};DragResize.prototype.mouseDown=function(e){with(this){if(!document.getElementById||!enabled)return true;var elm=e.target||e.srcElement,newElement=null,newHandle=null,hRE=new RegExp(myName+'-([trmbl]{2})','');while(elm){if(elm.className){if(!newHandle&&(hRE.test(elm.className)||isHandle(elm)))newHandle=elm;if(isElement(elm)){newElement=elm;break}}elm=elm.parentNode}if(element&&(element!=newElement)&&allowBlur)deselect(true);if(newElement&&(!element||(newElement==element))){if(newHandle)cancelEvent(e);select(newElement,newHandle);handle=newHandle;if(handle&&ondragstart)this.ondragstart(hRE.test(handle.className))}}};DragResize.prototype.mouseMove=function(e){with(this){if(!document.getElementById||!enabled)return true;mouseX=e.pageX||e.clientX+document.documentElement.scrollLeft;mouseY=e.pageY||e.clientY+document.documentElement.scrollTop;var diffX=mouseX-lastMouseX+mOffX;var diffY=mouseY-lastMouseY+mOffY;mOffX=mOffY=0;lastMouseX=mouseX;lastMouseY=mouseY;if(!handle)return true;var isResize=false;if(this.resizeHandleDrag&&this.resizeHandleDrag(diffX,diffY)){isResize=true}else{var dX=diffX,dY=diffY;if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmX+=diffX;elmY+=diffY}with(element.style){left=elmX+'px';width=elmW+'px';top=elmY+'px';height=elmH+'px'}if(window.opera&&document.documentElement){var oDF=document.getElementById('op-drag-fix');if(!oDF){var oDF=document.createElement('input');oDF.id='op-drag-fix';oDF.style.display='none';document.body.appendChild(oDF)}oDF.focus()}if(ondragmove)this.ondragmove(isResize);cancelEvent(e)}};DragResize.prototype.mouseUp=function(e){with(this){if(!document.getElementById||!enabled)return;var hRE=new RegExp(myName+'-([trmbl]{2})','');if(handle&&ondragend)this.ondragend(hRE.test(handle.className));deselect(false)}};DragResize.prototype.resizeHandleSet=function(elm,show){with(this){if(!elm._handle_tr){for(var h=0;h<handles.length;h++){var hDiv=document.createElement('div');hDiv.className=myName+' '+myName+'-'+handles[h];elm['_handle_'+handles[h]]=elm.appendChild(hDiv)}}for(var h=0;h<handles.length;h++){elm['_handle_'+handles[h]].style.visibility=show?'inherit':'hidden'}}};DragResize.prototype.resizeHandleDrag=function(diffX,diffY){with(this){var hClass=handle&&handle.className&&handle.className.match(new RegExp(myName+'-([tmblr]{2})'))?RegExp.$1:'';var dY=diffY,dX=diffX,processed=false;if(hClass.indexOf('t')>=0){rs=1;if(elmH-dY<minHeight)mOffY=(dY-(diffY=elmH-minHeight));else if(elmY+dY<minTop)mOffY=(dY-(diffY=minTop-elmY));elmY+=diffY;elmH-=diffY;processed=true}if(hClass.indexOf('b')>=0){rs=1;if(elmH+dY<minHeight)mOffY=(dY-(diffY=minHeight-elmH));else if(elmY+elmH+dY>maxTop)mOffY=(dY-(diffY=maxTop-elmY-elmH));elmH+=diffY;processed=true}if(hClass.indexOf('l')>=0){rs=1;if(elmW-dX<minWidth)mOffX=(dX-(diffX=elmW-minWidth));else if(elmX+dX<minLeft)mOffX=(dX-(diffX=minLeft-elmX));elmX+=diffX;elmW-=diffX;processed=true}if(hClass.indexOf('r')>=0){rs=1;if(elmW+dX<minWidth)mOffX=(dX-(diffX=minWidth-elmW));else if(elmX+elmW+dX>maxLeft)mOffX=(dX-(diffX=maxLeft-elmX-elmW));elmW+=diffX;processed=true}return processed}};

//折线图
var dragresize = new DragResize('dragresize',
{ minWidth:400, minHeight: 250});
dragresize.isElement = function(elm)
{
if (elm.className && elm.className.indexOf('wj_tongzhi') > -1) return true;
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
    $(".wj_tongzhi").css({"left" :line_width , "top":line_height});
	//改变窗口浏览器大小重置相对定位
	$(window).resize(function(){
	var line_width=($(window).width()-700)/2+"px";
	var line_height=($(window).height()-365)/2+"px";
    $(".wj_tongzhi").css({"left" :line_width , "top":line_height});
	});
	//弹窗淡入淡出
	$(".tongzhi").bind("click",
	   function(event){
       $(this).children(".wj_tongzhi").fadeIn();
       event.stopPropagation();
	   }
	)
	//弹出层关闭按钮
	$(".drsMoveHandle span , .drsMoveHandle h1").bind("click",
	   function(event){
       $(this).parent().parent(".wj_tongzhi").fadeOut();
       event.stopPropagation();
	  }
	)












}
);
var curWwwPath = window.document.location.href;  
var pathName = window.document.location.pathname; 
var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080  
var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis  
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);  
var rootPath = localhostPaht + projectName;
//集团通知公告；
 
function JTtzgg(){
	


	var id=$('#dd').val()
	var url = rootPath+"/mainDate.do?method=getOrgDynamic&user_id="+id;
	
	
	$.ajax({
		url : url,
		type: 'POST',
		dataType : "json",
		success : function(data) {
			
			var arr=[];
			var tdhtml =""
				if(data.length!=0){
					for(var i=0;i<data.length;i++){
						//console.log(data.length)
						//var url3=rootPath+"/main?xwl=23WPD5TO7KQ1&showAddWindow=Y&ID="+data[i].NTC_ID;
						 /*"<td  class='ellipsis'>" +
							"<a href='javascript:void(0)' onclick=clickFunc('"+rootPath+"/main?xwl=23WPD5TO7KQ1&showAddWindow=Y&ID="+data[i].NTC_ID+"')>"+data[i].NAME+"</a></td>"*/
						//var url4 ="'+url3+'"
						
						  tdhtml+="<tr>" +
					  		/*"<td><a href='javascript:void(0)' onclick='click_a('"++"')'> "+data[i].NAME+"<a></td>" +*/
					  		 "<td  class='ellipsis shumudijian pa' id='pa'>" +
							"<a href='javascript:void(0)' onclick=parent.click_a('"+rootPath+"/main?xwl=23WPD5TO7KQ1&showAddWindow=Y&ID="+data[i].IDS+"')>"+data[i].NAME+"</a></td>"+
					  		"<td> "+data[i].ORGNAME+"</td>" +
					  		"<td>"+data[i].TIME+"</td>"
					  		"</tr>";
					  		arr.push(data[i].IDS);
					  		
					}
					
					$("#JTtz").html(tdhtml);
					
					newNum();
					//console.log(arr)
					var num=document.getElementById('shumu');
					if(data.length>=10){
						num.style.right=11+'px';
					}else{
						num.style.right=15+'px';
					}
					num.innerHTML=data.length;
					var shujudijian=document.getElementsByClassName('ellipsis');
					
					for(var j=0;j<shujudijian.length;j++){
						shujudijian[j].index=j;
							shujudijian[j].onclick=function(arg){
										this.parentNode.parentNode.removeChild(this.parentNode);
										jianshao(arr[this.index]);
										//alert(arr[this.index]);
										//newNum();
										
							
							}
						};
						
					}
					
					
					
				}
			
			
		
	});
}

JTtzgg()

//定义右侧内容iframe的高度
var wj_in_height = function(){
$("#index_page").height($(window).height()-90);
                           }
wj_in_height();
window.onresize=function(){
wj_in_height();
                          }


var newNumber=0;
//消息条数交互
function  newNum(){
	var id=$('#dd').val();

	
	var url2=rootPath +"/getMainAction.do?method=getNum&user_id="+id;
	$.ajax({
		type:"get",
		url:url2,
		success:function(data2){
			//console.log(data2)
			var num=document.getElementById('shumu');

			if(data2>=10){
				num.style.right=4+'px';
			}else{
				
				num.style.right=4+'px';
			}
			//console.log($('#dd').val());
			num.innerHTML=data2;
			/*xiaoxishumu_dijian('shumudijian',data2,num);*/
		}
	})



}


function  jianshao(ntc){
	
	var num2=$('#dd').val();
	
	var url3=rootPath +"/getMainAction.do?method=changeState&user_id="+num2+"&ntc_name="+ntc;
	//console.log(url3);
	//var url2="http://10.44.1.160:7001/jsjd/getMainAction.do?method=changeState&user_id=1fb09dcf-537e-4cb9-9632-9d5b9a396caa&ntc_name=c107a838-ec01-4d3b-8cc3-b9bef745b4c7"
	$.ajax({
		url:url3,
		type:"get",
		success:function(data){
			console.log('aaa')
			newNum();
			
		}
	})
}

//用户的名字
function yonghumingzi(){
	var s=$('#empName').val();
	var b=document.getElementById('usermingzi');
	b.innerHTML=s+",您好<br/>欢迎进入系统";

}
 yonghumingzi();
 //待办条数交互
 var yz={};
 yz.length=0;
 yz.timer=null;

 function daibantiaoshu(){
 	var num2=$('#dd').val();
	var dai=$('.daibanNum')

 	var url3=rootPath+"/getMainAction.do?method=getDaiBan&user_id="+num2;
 	$.ajax({
		url:url3,
		type:"get",
		success:function(data){
			yz.length=data;

			if(data>=10){
				dai.css('right',7.5)
			}else{
				dai.css('right',10.5)
			}
			yz.length=data;
			dai.html(data)
			
			
			
		}
	})
 }
  daibantiaoshu();
 //轮询定时刷新 

 $('.daiban').click(function(){
 	clearInterval(yz.timer)
  		yz.timer=setInterval(function(){
  	var num2=$('#dd').val();
  	var dai=$('.daibanNum')
 	var url3=rootPath+"/getMainAction.do?method=getDaiBan&user_id="+num2;
 	$.ajax({
		url:url3,
		type:"get",
		success:function(data){
			yz.length=data;
			if(data>=10){
				dai.css('right',7.5)
			}else{
				dai.css('right',10.5)
			}
			if(data!=yz.length){
				
				
				yz.length=data;
				
			}
			dai.html(yz.length);
  		}
  	})	
  },3000)
  })
