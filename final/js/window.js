/*-------------------------- +
  获取id, class, tagName
 +-------------------------- */
var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
var lineDivMinWidth = 250;
var lineDivMinHeight = 124;
/*-------------------------- +
  拖拽函数
 +-------------------------- */
function lineDiv(olineDiv, handle)
{
	var disX = dixY = 0;
	var oMin = get.byClass("min", olineDiv)[0];
	var oMax = get.byClass("max", olineDiv)[0];
	var oRevert = get.byClass("revert", olineDiv)[0];
	var oClose = get.byClass("close", olineDiv)[0];
	handle = handle || olineDiv;
	handle.style.cursor = "move";
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		disX = event.clientX - olineDiv.offsetLeft;
		disY = event.clientY - olineDiv.offsetTop;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - olineDiv.offsetWidth;
			var maxT = document.documentElement.clientHeight - olineDiv.offsetHeight;
			
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);
			
			olineDiv.style.left = iL + "px";
			olineDiv.style.top = iT + "px";
			
			return false
		};
		
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};	
	//最大化按钮
	oMax.onclick = function ()
	{
		olineDiv.style.top = olineDiv.style.left = 0;
		olineDiv.style.width = document.documentElement.clientWidth - 2 + "px";
		olineDiv.style.height = document.documentElement.clientHeight - 2 + "px";
		this.style.display = "none";
		oRevert.style.display = "block";
	};
	//还原按钮
	oRevert.onclick = function ()
	{		
		olineDiv.style.width = lineDivMinWidth + "px";
		olineDiv.style.height = lineDivMinHeight + "px";
		olineDiv.style.left = (document.documentElement.clientWidth - olineDiv.offsetWidth) / 2 + "px";
		olineDiv.style.top = (document.documentElement.clientHeight - olineDiv.offsetHeight) / 2 + "px";
		this.style.display = "none";
		oMax.style.display = "block";
	};
	//最小化按钮
	oMin.onclick = oClose.onclick = function ()
	{
		olineDiv.style.display = "none";
		var oA = document.createElement("a");
		oA.className = "open";
		oA.href = "javascript:;";
		oA.title = "还原";
		document.body.appendChild(oA);
		oA.onclick = function ()
		{
			olineDiv.style.display = "block";
			document.body.removeChild(this);
			this.onclick = null;
		};
	};
	//阻止冒泡
	oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
	{
		this.onfocus = function () {this.blur()};
		(event || window.event).cancelBubble = true	
	};
}
/*-------------------------- +
  改变大小函数
 +-------------------------- */
function resize(oParent, handle, isLeft, isTop, lockX, lockY)
{
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		var disX = event.clientX - handle.offsetLeft;
		var disY = event.clientY - handle.offsetTop;	
		var iParentTop = oParent.offsetTop;
		var iParentLeft = oParent.offsetLeft;
		var iParentWidth = oParent.offsetWidth;
		var iParentHeight = oParent.offsetHeight;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
			var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;			
			var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
			var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
			
			isLeft && (oParent.style.left = iParentLeft + iL + "px");
			isTop && (oParent.style.top = iParentTop + iT + "px");
			
			iW < lineDivMinWidth && (iW = lineDivMinWidth);
			iW > maxW && (iW = maxW);
			lockX || (oParent.style.width = iW + "px");
			
			iH < lineDivMinHeight && (iH = lineDivMinHeight);
			iH > maxH && (iH = maxH);
			lockY || (oParent.style.height = iH + "px");
			
			if((isLeft && iW == lineDivMinWidth) || (isTop && iH == lineDivMinHeight)) document.onmousemove = null;
			
			return false;	
		};
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	}
};
window.onload = window.onresize = function ()
{
	var olineDiv = document.getElementById("lineDiv");
	var oTitle = get.byClass("title", olineDiv)[0];
	var oL = get.byClass("resizeL", olineDiv)[0];
	var oT = get.byClass("resizeT", olineDiv)[0];
	var oR = get.byClass("resizeR", olineDiv)[0];
	var oB = get.byClass("resizeB", olineDiv)[0];
	var oLT = get.byClass("resizeLT", olineDiv)[0];
	var oTR = get.byClass("resizeTR", olineDiv)[0];
	var oBR = get.byClass("resizeBR", olineDiv)[0];
	var oLB = get.byClass("resizeLB", olineDiv)[0];
	
	lineDiv(olineDiv, oTitle);
	//四角
	resize(olineDiv, oLT, true, true, false, false);
	resize(olineDiv, oTR, false, true, false, false);
	resize(olineDiv, oBR, false, false, false, false);
	resize(olineDiv, oLB, true, false, false, false);
	//四边
	resize(olineDiv, oL, true, false, false, true);
	resize(olineDiv, oT, false, true, true, false);
	resize(olineDiv, oR, false, false, false, true);
	resize(olineDiv, oB, false, false, true, false);
	
	olineDiv.style.left = (document.documentElement.clientWidth - olineDiv.offsetWidth) / 2 + "px";
	olineDiv.style.top = (document.documentElement.clientHeight - olineDiv.offsetHeight) / 2 + "px";
}