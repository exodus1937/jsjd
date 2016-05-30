//获取get请求参数
function getRequestParameter(argname)
{
	var url = document.location.href;
	var arrStr = url.substring(url.indexOf("?")+1).split("&");
	//return arrStr;
	for(var i =0;i<arrStr.length;i++)
	{
	   var loc = arrStr[i].indexOf(argname+"=");
	   if(loc!=-1)
	   {
	    return arrStr[i].replace(argname+"=","").replace("?","");
	    break;
	   }
	  
	}
	return "";
} 
function _getRequestParameter(argname){
	return getRequestParameter(argname);
}			
//渲染审批状态列    
function onAuditStatusRenderer(e) {
    if(e.value=='A'){
    	return '起草';
    }else if(e.value=='E'){
    	return '审批通过';
    }else if(e.value=='C'){
    	return '审批中';
    }else if(e.value=='D'){
    	return '驳回';
    }else if(e.value=='R'){
    	return '撤回';
    }else{
    	return e;
    }
} 
function _onAuditStatusRenderer(e) {
	return onAuditStatusRenderer(e);
}

//添加明细行
function addRow(gridId,newRow) {
	var grid = mini.get(gridId);
	
	var idx = 0;
	if(grid.getSelected()){
		idx = grid.indexOf(grid.getSelected()) + 1;
	}
	 
    grid.addRow(newRow, idx);
} 
function _addRow(gridId,newRow) {
	addRow(gridId,newRow);
}

//删除明细行
function removeRow(gridId) {
	var grid = mini.get(gridId);
    var rows = grid.getSelecteds();
    if (rows.length > 0) {
        grid.removeRows(rows, true);
    }
}
function _removeRow(gridId) {
	removeRow(gridId);
}

/**
 * 通过Json对象属性，取得对象的值
 * 如： json: {name:'张三',age:24}, 
 * alert(_getJsonValue('name'))将返回'张三'
 */
function _getJsonValue(json,key){
	var value = '';
	for(var p in json){ 
		if(key == p){
			value = json[p];
		}
		break;
	}
	return value;
}

/* add by gongbinglai 2014.06.04 已废弃
function _openSelectlLov(config,callBackFn){
		mini.open({
         url: _getContextPath()+"/pub/uip/common/widget/SelectGridWindow.jsp?SQL_KEY="+config.sqlBlockID+"&columnWidths="+config.columnWidths
         	  +"&multiSelect="+config.multiSelect+"&columns="+encodeURI(encodeURI(mini.encode(config.columns))),
         title: "选择列表",
         width: config.width?config.width:650,
         height: config.height?config.height:380,
         ondestroy: function (action) {
             if (action == "ok") {
                 var iframe = this.getIFrameEl();
                 var data = iframe.contentWindow.GetData();
                 data = mini.clone(data);    //必须
                 if (data) {
                 	callBackFn(data);
                 	
                 }
             }

         }
     });       
}*/

//附件
function _openAttachWin(gridId){
	var grid = mini.get(gridId);
	var row = grid.getSelected();
	if(row){
		var pkId = row.PK_ID;  
		var isAddValue = 'Y';
   		var isDelValue = 'Y';
   		var audit_status = row.AUDIT_STATUS;
		
		var features = 'top=0, left=0, toolbar=no, width=' + 1000 + ', height=' + 550;
		var url = _getContextPath() + "/pub/attachment/Fujian.jsp?businessType=frm&businessCode=" + pkId + '&number=' + Math.random();
		if (audit_status == 'C' || audit_status == 'E') {
			url = url + '&isAdd=' + 'N' + '&isDel=' + 'N';
		} else {
			if (isAddValue != '' && isDelValue != null) {
				url = url + '&isAdd=' + isAddValue + '&isDel=' + isDelValue;
			}
		}
		var attachWin = window.open(url, '附件', features);
	}else{
		mini.alert('请选择一条记录');
	}
}

function _validateGrid(gridId){
	var myGrid = mini.get(gridId);
	myGrid.validate();
    if (myGrid.isValid() == false) {
        //alert("请校验输入单元格内容");
        var error = myGrid.getCellErrors()[0];
        myGrid.beginEditCell(error.record, error.column);
        return false;
    }
    return true;
}

//js日期比较(yyyy-mm-dd) 
function comptimeDate(a, b) {
	var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes > lktimes) {
    	return 1;
    }else if(starttimes == lktimes){
    	return 0;
    }else if(starttimes < lktimes){
    	return -1;
    }
}

//js时间比较(yyyy-mm-dd hh:mi:ss)
function comptime(beginTime, endTime) {
    beginTime = "2009-09-21 00:00:00";
    endTime = "2009-09-21 00:00:01";
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

    alert(beginTime + "aaa" + endTime);
    alert(Date.parse(endTime));
    alert(Date.parse(beginTime));
    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
        alert("endTime小!");
    } else if (a > 0) {
        alert("endTime大!");
    } else if (a == 0) {
        alert("时间相等!");
    } else {
        return 'exception'
    }
}