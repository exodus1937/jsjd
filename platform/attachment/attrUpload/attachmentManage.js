function init_page(contextPath,src_id,att_cat,org_id,bus_no,canUp,canDown,canDel,userId){
	Ext.onReady(function(){
		Ext.QuickTips.init();
		Ext.Msg.minWidth = 200;				
	  	var store = new Ext.data.Store({
	    	 url : contextPath + '/xipAttMrgAction.do?method=initAtt',
			 reader: new Ext.data.JsonReader({
				root:'dataList',
				totalProperty:'totalProperty',
				fields:[
					{name:'att_id',			mapping:'att_id'},
					{name:'att_file_name',		mapping:'att_file_name'},
					{name:'view',mapping:'view'},
					{name:'url',mapping:'url'}
				]
			}),
			listeners:{
				'beforeload':function(){
					store.baseParams = {'src_id':src_id};	
				}
			}
	    });
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
		var cmArray = [] ;
		cmArray.push(sm);
		cmArray.push(new Ext.grid.RowNumberer({header:'序号',width:35}));
		cmArray.push({id:'filName',header: "附件名称",width: 500,align:'left',dataIndex: 'att_file_name',sortable:false});
		cmArray.push({header: "att_id",hidden:true, dataIndex: 'att_id'});
		cmArray.push({header:"预览",width:180,align:'center',renderer:renderView,dataIndex:'view',hidden:true});
		cmArray.push({header: "下载附件",dataIndex: 'url',align:'center',width:180,renderer:renderDownload});
		 //隐藏列		
		 var cm = new Ext.grid.ColumnModel(cmArray);
		//渲染下载图标的函数
		function renderDownload(value,record){
			var returnValue='';
		    var imgUrl=contextPath+'/platform/attachment/images/pick.png';
			returnValue = "<img src='"+imgUrl+"'/>"; 
			return returnValue;
		}	
		//渲染预览图标的函数
		function renderView(value,record){
		    var returnValue='';
		    var img=contextPath+'/platform/attachment/images/zoom.png';
		    returnValue = "<img src='"+img+"'/>";
		    return returnValue;
		}
		//////////////////////////////////////////
	 
		var uploadFile = new Ext.Button({
			text:'上传',
			disabled:canUp=='N'?true:false,
			iconCls:'icon-upload',
			pressed:false,
			handler:function(){
					/*var win = new Ext.Window({
						title : '多附件上传',
						width : 600,
						height :450,
						resizable : false,
						modal	: true,
						layout : 'fit',
						items : [{
							xtype : 'uploadpanel',
							id:'panel',
							uploadUrl : contextPath+'/xipAttMrgAction.do?method=upload',
							filePostName : 'myUpload', // 这里很重要，默认值为'fileData',这里匹配action中的setMyUpload属性
							flashUrl : 'swfupload.swf',
							fileSize : '20 MB',
							height : 400,
							border : false,
							fileTypes : '*.*', // 在这里限制文件类型:'*.jpg,*.png,*.gif'
							fileTypesDescription : '所有文件',
							postParams : {
								'src_id':src_id,
								'attCatCode':att_cat,
								'org_id':org_id,
								'bus_no':bus_no,
								'userId':userId
							}
						}],
						listeners:{
							'beforeclose':function(){
								if(Ext.getCmp("panel").closeWindow()){
								   	Ext.Msg.alert('提示','正在上传文件，请勿关闭窗口和刷新页面');
								   	return false;
								}else{
								    grid.getStore().reload();
								    grid.getView().refresh();
								    return true;
								}
							}
						}
					});
					win.show();	*/			
            }				
		});
		//删除按钮
		var delBtn = new Ext.Button({
		  text:'删除',
		  iconCls:'icon-delete',
		  disabled:canDel=='N'?true:false,
		  pressed:false,
		  xtype:'button',
		  handler:function(){
		  	var delRecord = sm.getSelections();
		  	if(delRecord.length<=0){
		  	    Ext.Msg.alert('提示','请选择需要操作的记录!');
			    return;
		  	}
		  	var p = new Array();
		  	Ext.each(delRecord,function(item){
					p.push(item.get('att_id'));	    //附件ID
					});
					
				//确认删除
			Ext.Msg.confirm('提示','确定要删除该附件吗？',function(btn){
				if(btn=='yes'){
					var progressBar=Ext.Msg.wait("正在处理中，请稍候......","提示");	
								Ext.Ajax.request({
									url:contextPath+'/xipAttMrgAction.do?method=del',
									timeout: 6000000,
									params : {
											'ids': p.toString()
									},
									method : 'post',
									success : function(response,options){
										var response = Ext.util.JSON.decode(response.responseText);
										progressBar.hide();
										if (response.flag == 1) {										
											Ext.Msg.alert('提示',response.msg);
											grid.getStore().reload();
											grid.getView().refresh();
										}else{
											Ext.Msg.alert('提示',response.msg);
											grid.getStore().reload();
											grid.getView().refresh();
										}	
									},
									failure:function(response,options){
										progressBar.hide();
										var response = Ext.util.JSON.decode(response.responseText);
										Ext.MessageBox.alert("提示",'删除失败');
										grid.getStore().reload();
										grid.getView().refresh();
									}
								});
				    
				  }  
			  });  	
		  }	
		});

		var downBtn = new Ext.Button({
		  text:'批量下载',
		  iconCls:'icon-down',
		  pressed:false,
		  disabled:canDown=='N'?true:false,
		  xtype:'button',
		  handler:function(){
		  		var downRecord = sm.getSelections();
		      	if(downRecord.length<=0){
		  	    Ext.Msg.alert('提示','请选择需要操作的记录!');
			    return;
		  	}
		  	var p = new Array();
		  	Ext.each(downRecord,function(item){
					p.push(item.get('att_id'));	    //附件ID
					});
			window.location.href= contextPath+"/xipAttMrgAction.do?method=down&selectedIds="+p.toString();		
		 }	
		});	
			
		
	 var ttbar = new Ext.Toolbar(['-',uploadFile,'-',downBtn,'-',delBtn]);	
		
		
		
		var grid = new Ext.grid.GridPanel({
		    store 		: 	store,
			cm 			: 	cm,
		    sm 			: 	sm,
		    enableColumnHide : false,
		    width		:	'100%',
		    height		:	'100%',
		    region		:	'center',
		    loadMask	:	true,
		    tbar        :   ttbar,
		    stripeRows	: 	true,
		    listeners	:	{
		    	'render' : function(){
		    		store.load();
		    	},
		    	'cellclick':function(grid, rowIndex, columnIndex, e){
					if(columnIndex==5){
						var record = grid.getSelectionModel().getSelected();
					    var id = record.data.att_id;
						window.location.href=contextPath+"/xipAttMrgAction.do?method=down&att_id="+id.toString();
			        }else if(columnIndex==4){
			           //预览功能
			     	   var record = grid.getSelectionModel().getSelected();
					   var id = record.data.att_id;
					 //  window.location.href=contextPath+"/platform/attachment/attachmentView.jsp?att_id="+id.toString();
			             window.open (contextPath+"/xipAttMrgAction.do?method=down&view=1&att_id="+id.toString(),'newwindow','height=768,width=1024,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no');
					   }
		       }
		    }
		});		
		if(canDown=='N'){
		    grid.getColumnModel().setHidden(5,true);
		    grid.getColumnModel().getColumnById("filName").width=1270;//改变列的宽度
	    }
		
		new Ext.Viewport({
			width 	: 	'100%',
			height 	: 	document.body.clientHeight,
			layout 	: 	'border',
			items 	: 	[grid]
		});		
	});
}