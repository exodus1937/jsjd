
var eu = new ExtUtil();	

function openMonitorPage(contextPath,insCode){
/*	
	var wind = new Ext.Window({
		title 		: 	'流程实例监控',
		modal 		: 	true,
		collapsible	:	true,
		layout		: 	'fit',
		width 		: 	'100%',
		height		: 	'100%',
		maximizable	: 	true,
		maximized 	:	true,
		items : [{
			html:'<iframe id=\'frame_in_monitor\' width=\'100%\' height=\'100%\' src='+contextPath+'/workflow/monitor/extMonitorFrame.jsp?insCode='+insCode+' ></iframe>'
		}],
		listeners:{
			'close':function(){
				Ext.getDom('frame_in_monitor').src=null;
			}
		}
   	});
    wind.show();	
*/	
	//window.open("../monitor/monitorFrame.jsp?insId="+insId,"_blank");
	    
	//window.open(contextPath+"/workflow/monitor/monitorFrame.jsp?insId="+insId,"_blank");
	
    window.open(contextPath+"/workflow/monitor/extMonitorFrame.jsp?insCode="+insCode,"_blank");
}

function init_page(contextPath) {
	Ext.onReady(function() {
		// ajax编码字符集
		Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";
		
		function change(val){
			if(val == 'O'){
				return '组织流程';
			}else if(val == 'P'){
				return '公共流程';
			}else if(val == 'Y'){
				return '启用';
			}else if(val == 'N'){
				return '失效';
			}else if(val == 'C'){
				return '复制';
			}
			return val;
		}		
		
		function chanageState(val){
			if(val == "started"){
				return '<font color=\'blue\'>'+val+'</font>';
			}else if(val == "running"){
				return '<font color=\'red\'>'+val+'</font>';
			}else if(val == "canceled"){
				return val;
			}else if(val == "completed"){
				return '<font color=\'green\'>'+val+'</font>';
			}
			return val ;
		}
		
		// 打开流程监控
		function openMonitor(value, cellmeta, record, rowIndex, columnIndex, store){
			var insCode = record.get('INSTANCECODE');
			var title = record.get('INSTANCETITLE');
            
			//var newTitle = "<a href=\"../monitor/monitorFrame.jsp?insId="+insId+"\" target=_blank>"+title+"</a>";
            //var newTitle = "<a href='#' onclick=\"javascript:openMonitorPage('"+contextPath+"','"+insId+"');\"  >"+title+"</a>";    
            
            var newTitle = "<a href=\"javascript:openMonitorPage('"+contextPath+"','"+insCode+"');\"     >"+title+"</a>"; 
            
            return newTitle;
		}
		
		
		// 加载流程信息
		function loadStore(){
			var appId = appl.getValue() ;
			if(appId == null || appId == "" || appId == "undefined"){
				Ext.Msg.alert("提示","请选择应用信息!");
				return false;
			}
			store.load({
				params : {
					'appId' 		: 	appl.getValue(),
					'entityId'		:	entity.getValue(),
					'processName'	:	Ext.getCmp('pId').getValue(),
					'start'			:	0,
					'limit'			:	20
				}			
			});	
		}
		
		function loadStore2(){
			var appId = appl.getValue() ;
			if(appId == null || appId == "" || appId == "undefined"){
				Ext.Msg.alert("提示","请选择应用信息!");
				return false;
			}
			store2.load({
				params : {
					'appId' 		: 	appl.getValue(),
					'entityId'		:	entity.getValue(),
					'processName'	:	Ext.getCmp('pId2').getValue(),
					'start'			:	0,
					'limit'			:	20
				}
			});
	
		}	
		
		function loadStore3(){
			var appId = appl.getValue() ;
			if(appId == null || appId == "" || appId == "undefined"){
				Ext.Msg.alert("提示","请选择应用信息!");
				return false;
			}
			store3.load({
				params : {
					'appId' 		: 	appl.getValue(),
					'entityId'		:	entity.getValue(),
					'processName'	:	Ext.getCmp('pId3').getValue(),
					'start'			:	0,
					'limit'			:	20					
				}
			});	
		}	
		
		function loadStore4(){
			var appId = appl.getValue() ;
			if(appId == null || appId == "" || appId == "undefined"){
				Ext.Msg.alert("提示","请选择应用信息!");
				return false;
			}
			store4.load({
				params : {
					'appId' 		: 	appl.getValue(),
					'entityId'		:	entity.getValue(),
					'processName'	:	Ext.getCmp('pId4').getValue(),
					'start'			:	0,
					'limit'			:	20
				}
			});	
		}		
		
		

		// 选择应用
		var appStore = new Ext.data.Store({
			url		:	contextPath+'/commonQueryAction.do?method=getApps',
			reader	:	new Ext.data.JsonReader({
				root:'dataList',
				totalProperty:'totalProperty',
				fields	:	[
					{name:'appId',		mapping:'appId'},
					{name:'appCode',	mapping:'appCode'},
					{name:'appName',	mapping:'appName'}
				]
			})
		});
		var appl = new Ext.form.ComboBox({
			store			:	appStore,
			width 			: 	document.body.clientWidth*(.2),
			fieldLabel		:	'选择应用',
			emptyText		:	'---请选择---',
			labelSeparator	:	':',
			selectOnFocus	:	true,
			triggerAction	:	'all',
			displayField	:	'appName',
			valueField		:	'appId',
			listeners		:	{
				'select' : function(){
					entity.enable();
					loadStore();
					loadStore2();
					loadStore3();
					loadStore4();
				}
			}
		});
	    appl.on('beforequery',function(e){
	        var combo = e.combo;
	        if(!e.forceAll){
	            var value = e.query;
	            combo.store.filterBy(function(record,id){
	                var text = record.get(combo.displayField);
	                return (text.indexOf(value)!=-1);
	            });
	            combo.expand();
	            return false;
	        }
	    });		
	    
	    // 选择业务实体
		var entityStore = new Ext.data.Store({
			url		:	contextPath+'/commonQueryAction.do?method=getEntities',
			reader	:	new Ext.data.JsonReader({
				root:'dataList',
				totalProperty:'totalProperty',
				fields	:	[
					{name:'id',		mapping:'id'},
					{name:'code',	mapping:'code'},
					{name:'name',	mapping:'name'}
				]
			}),
			listeners	:	{
				'beforeload' :	function(){
					entityStore.baseParams = {'appId' : appl.getValue()}
				}
			}
		});
		
		entityStore.on('load', function(entityStore, records, options) {
			var Plant = entityStore.recordType;
			var p = new Plant({
				'id' 	: 	'ALL',
				'name' 	: 	'全部'
			});
			entityStore.insert(0, p);
		}, this, {
			delay : 0
		});	
	
		var entity = new Ext.form.ComboBox({
			store			:	entityStore,
			width 			: 	document.body.clientWidth*(.2),
			fieldLabel		:	'选择实体',
			labelSeparator	:	':',
			selectOnFocus	:	true,
			disabled		:	true,
			triggerAction	:	'all',
			displayField	:	'name',
			valueField		:	'id',
			listeners		:	{
				'render' : function(){
					entity.setValue('ALL') ;
					entity.setRawValue('全部') ;
				},
				'select'	: 	function(){
					loadStore();
					loadStore2();
					loadStore3();
					loadStore4();
				}
			}
		});
	    entity.on('beforequery',function(e){
	        var combo = e.combo;
	        if(!e.forceAll){
	            var value = e.query;
	            combo.store.filterBy(function(record,id){
	                var text = record.get(combo.displayField);
	                return (text.indexOf(value)!=-1);
	            });
	            combo.expand();
	            return false;
	        }
	    });	
		
		var btnQuery = new Ext.Button({
			text 		: '查询',
			xtype 		: 'button',
			iconCls		: 'icon-query',
			handler 	: function() {
				loadStore();
				loadStore2();
				loadStore3();
				loadStore4();
			}
		});
		
		var formPanel = new Ext.form.FormPanel({
			title		:	'查询条件',
			width 		:	'100%',
			height 		: 	80,
			region 		: 	'north',
			labelAlign 	: 	"right",
			labelWidth 	: 	80,
			bodyStyle  	: 	'padding: 5px 0px 0px',
			autoScroll	:	true,
			frame 		: 	true,
			layout 		: 	'column',
			items		:	[
				{layout:"form",columnWidth:.3,items:[appl]},
				{layout:"form",columnWidth:.3,items:[entity]},
				{layout:"form",columnWidth:.4,items:[btnQuery]}
			]
		});

		
		// 流程信息Panel
	  	var store = new Ext.data.Store({
//	    	 url : contextPath + '/commonQueryAction.do?method=getProcesses',
	  		 url : eu.loadPageDateUrl,
			 reader: new Ext.data.JsonReader({
				root:'dataList',
				totalProperty:'totalProperty',
				fields:[
					{name:'ENTITYNAME',		mapping:'ENTITYNAME'},
					{name:'NAME',			mapping:'NAME'},
					{name:'ENABLEFLAG',		mapping:'ENABLEFLAG'},
					{name:'PROCESSCATEGORY',mapping:'PROCESSCATEGORY'},
					{name:'ORGNAME',		mapping:'ORGNAME'},
					{name:'ENTITYID',		mapping:'ENTITYID'},
					{name:'ID',				mapping:'ID'},
					{name:'ORGID',			mapping:'ORGID'}
				]
			}),
			listeners	:	{
				'beforeload'	:	function(){
					store.baseParams = {
						'appId' 		: 	appl.getValue(),
						'entityId'		: 	entity.getValue(),
						'processName'	:	Ext.getCmp('pId').getValue(),
						'SQL_KEY'		:	'processInstance.getProcesses'
					}
				}
			},
			pruneModifiedRecords:true
	    });
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true,header:''});
		
		var cmArray = [] ;
		cmArray.push(sm);
		cmArray.push(new Ext.grid.RowNumberer({header:'序号',width:35}));
		cmArray.push({header: "业务实体名称",width: 250,align:'left',dataIndex: 'ENTITYNAME',sortable:true});
		cmArray.push({header: "流程名称",width: 350,align:'left',dataIndex: 'NAME',sortable:true});
		cmArray.push({header: "流程状态",width: 80,align:'left',dataIndex: 'ENABLEFLAG',sortable:true,renderer:change});
		cmArray.push({header: "流程分类",width: 100,align:'left',dataIndex: 'PROCESSCATEGORY',sortable:true,renderer:change});
		cmArray.push({header: "组织名称",width: 350,align:'left',dataIndex: 'ORGNAME',sortable:true});
		cmArray.push({header: "entityId",hidden:true, dataIndex: 'ENTITYID',sortable:true});
		cmArray.push({header: "id",hidden:true, dataIndex: 'ID',sortable:true});
		cmArray.push({header: "orgId",hidden:true, dataIndex: 'ORGID',sortable:true});
		var cm = new Ext.grid.ColumnModel(cmArray);
		
	 	var pagebar = new Ext.PagingToolbar({
	  	  	pageSize	:	20,
	  	  	store		:	store,
	  	  	displayInfo	:	true,
	  	  	displayMsg	:	'显示第 {0} 条到 {1} 条记录,一共 {2} 条',
	  	  	emptyMsg	:	'没有记录'
	  	});			
		
		var grid = new Ext.grid.GridPanel({
		    store 		: 	store,
			cm 			: 	cm,
		    sm 			: 	sm,
		    bbar		:	pagebar,
		    width		:	'100%',
		    height		:	'100%',
		    region		:	'center' ,
		    loadMask	:	true,
		    stripeRows	: 	true,
		    listeners	:	{
		    	'render' : function(){
		    		
		    	}
		    }
		});		
		var p1 = new Ext.Panel({
			title	:	'已创建的流程',
			tbar	:	new Ext.Toolbar([
				'-',
				'流程名称:',
				new Ext.form.TextField({
					id				:	'pId' ,
					width			:	250,
					inputType		:	'text',
					fieldLabel		:	'流程名称',
					labelSeparator	:	':',
					listeners	:	{
						'specialkey':function(field,e){
							if (e.getKey() == Ext.EventObject.ENTER) {
								loadStore();
							}
						}
					}	    	
				}),
				'-',
				new Ext.Button({
					text	:	'启动流程',
					handler	:	function(){
						// 取得流程ID
						var processId ;
						var record_array = sm.getSelections() ;
						if(record_array.length == 0){
							Ext.Msg.alert("提示","请先选择一个待启动的流程！") ;
							return false ;
						}else{
							Ext.each(record_array , function(r){
								processId = r.get('ID');
							});
						}
						// 等待框
						var msg = Ext.MessageBox.show({
							title 	 : 	'请等待',
							msg 	 : 	'正在提交请求.......',
							width 	 : 	240,
							wait	 : 	true,
							progress : 	true,
							closable : 	false
						});		
						// 提交请求
						Ext.Ajax.request({
							url 	: contextPath + '/workFlowServiceAction.do?method=startProcess',
							params	: {
								'processId' : processId
							},
							method 	: 'post',
							timeout : 3600000,
							success : function(response, options) {
								msg.hide();
								var response = Ext.JSON.decode(response.responseText);
								if(response.flag==0){
									loadStore2();
								}
								Ext.Msg.alert("提示", response.msg);
							},
							failure : function(reponse, options) {
								msg.hide();
								var response = Ext.JSON.decode(response.responseText);
								Ext.Msg.alert("提示", response.msg);
							}
						});						
					}
				}),
				'-'		
			]),			
			width 	: 	'100%',
			height 	: 	'100%',
			layout	:	'border',
			items	:	[grid]
		});
		
		
		// 已启动和已运行的流程信息
	  	var store2 = new Ext.data.Store({
//	    	 url : contextPath + '/commonQueryAction.do?method=getInstances',
	  		 url : eu.loadPageDateUrl,
			 reader: new Ext.data.JsonReader({
				root:'dataList',
				totalProperty:'totalProperty',
				fields:[
					{name:'ENTITYNAME',			mapping:'ENTITYNAME'},
					{name:'INSTANCETITLE',		mapping:'INSTANCETITLE'},
					{name:'INSTANCESTATE',		mapping:'INSTANCESTATE'},
					{name:'BEGINDATE',			mapping:'BEGINDATE'},
					{name:'ENDDATE',			mapping:'ENDDATE'},
					{name:'ENTITYID',			mapping:'ENTITYID'},
					{name:'PROCESSID',			mapping:'PROCESSID'},
					{name:'INSTANCEID',			mapping:'INSTANCEID'},
					{name:'INSTANCECODE',		mapping:'INSTANCECODE'},
					{name:'BUSINESSID',			mapping:'BUSINESSID'},
					{name:'BUSINESSCODE',		mapping:'BUSINESSCODE'},
					{name:'BUSINESSNAME',		mapping:'BUSINESSNAME'}						
				]
			}),
			listeners	:	{
				'beforeload'	:	function(){
					store2.baseParams = {
						'appId' 		: 	appl.getValue(),
						'entityId'		:	entity.getValue(),
						'processName'	:	Ext.getCmp('pId2').getValue(),						
						'opType'		:	'revoke',
						'SQL_KEY'		:	'processInstance.getStartedAndRunningInstances'
					}
				}
			},
			pruneModifiedRecords:true
	    });
		var sm2 = new Ext.grid.CheckboxSelectionModel({singleSelect:true,header:''});
		
		var cmArray2 = [] ;
		cmArray2.push(sm2);
		cmArray2.push(new Ext.grid.RowNumberer({header:'序号',width:35}));
		cmArray2.push({header: "业务实体名称",width: 250,align:'left',dataIndex: 'ENTITYNAME',sortable:true});
		cmArray2.push({header: "实例标题",width: 350,align:'left',dataIndex: 'INSTANCETITLE',sortable:true,renderer:openMonitor});
		cmArray2.push({header: "实例状态",width: 80,align:'left',dataIndex: 'INSTANCESTATE',sortable:true,renderer:chanageState});
		cmArray2.push({header: "开始日期",width: 130,align:'left',dataIndex: 'BEGINDATE',sortable:true});
		cmArray2.push({header: "结束日期",width: 130,align:'left',dataIndex: 'ENDDATE',sortable:true});
		cmArray2.push({header: "entityId",hidden:true, dataIndex: 'ENTITYID',sortable:true});
		cmArray2.push({header: "processId",hidden:true, dataIndex: 'PROCESSID',sortable:true});
		cmArray2.push({header: "instanceId",hidden:true, dataIndex: 'INSTANCEID',sortable:true});
		cmArray2.push({header: "实例编码",hidden:true,dataIndex: 'INSTANCECODE',sortable:true});
		cmArray2.push({header: "业务ID",hidden:true, dataIndex: 'BUSINESSID',sortable:true});
		cmArray2.push({header: "业务编码",width: 150,align:'left',dataIndex: 'BUSINESSCODE',sortable:true});
		cmArray2.push({header: "业务名称",width: 350,align:'left',dataIndex: 'BUSINESSNAME',sortable:true});
		var cm2 = new Ext.grid.ColumnModel(cmArray2);
	
	 	var pagebar2 = new Ext.PagingToolbar({
	  	  	pageSize	:	20,
	  	  	store		:	store2,
	  	  	displayInfo	:	true,
	  	  	displayMsg	:	'显示第 {0} 条到 {1} 条记录,一共 {2} 条',
	  	  	emptyMsg	:	'没有记录'
	  	});			
		
		var grid2 = new Ext.grid.GridPanel({
		    store 		: 	store2,
			cm 			: 	cm2,
		    sm 			: 	sm2,
		    bbar		:	pagebar2,
		    width		:	'100%',
		    height		:	'100%',
		    region		:	'center' ,
		    loadMask	:	true,
		    stripeRows	: 	true,
		    viewConfig	:	{
		    	
		    },
		    listeners	:	{
		    	'render' : function(){
		    	}
		    }
		});			
		
		var p2 = new Ext.Panel({
			title	:	'已启动和已运行的流程',
			tbar	:	new Ext.Toolbar([
				'-',
				'实例标题:',
				new Ext.form.TextField({
					id				:	'pId2',
			    	width			:	250,
			    	inputType		:	'text',
			    	fieldLabel		:	'实例标题',
			    	labelSeparator	:	':',
					listeners	:	{
						'specialkey':function(field,e){
							if (e.getKey() == Ext.EventObject.ENTER) {
								loadStore2();
							}
						}
					}					
				}),
				'-',
				new Ext.Button({
					text	:	'提交流程',
					handler	:	function(){
						// 取得流程ID
						var instanceCode ;
						var record_array = sm2.getSelections() ;
						if(record_array.length == 0){
							Ext.Msg.alert("提示","请先选择一个流程实例！") ;
							return false ;
						}else{
							Ext.each(record_array , function(r){
								instanceCode = r.get('INSTANCECODE');
							});
						}
						// 等待框
						var msg = Ext.MessageBox.show({
							title 	 : 	'请等待',
							msg 	 : 	'正在提交请求.......',
							width 	 : 	240,
							wait	 : 	true,
							progress : 	true,
							closable : 	false
						});		
						// 提交请求
						Ext.Ajax.request({
							url 	: contextPath + '/workFlowServiceAction.do?method=submitProcess',
							params	: {
								'instanceCode' : instanceCode
							},
							method 	: 'post',
							timeout : 3600000,
							success : function(response, options) {
								msg.hide();
								var response = Ext.JSON.decode(response.responseText);
								if(response.flag == 0){
									loadStore2();
									loadStore3();
								}
								Ext.Msg.alert("提示", response.msg);
							},
							failure : function(reponse, options) {
								msg.hide();
								var response = Ext.JSON.decode(response.responseText);
								Ext.Msg.alert("提示", response.msg);
							}
						});								
					}
				}),
				'-',
				new Ext.Button({
					text	:	'撤回流程',
					handler	:	function(){
						// 取得流程ID
						var instanceCode ;
						var record_array = sm2.getSelections() ;
						if(record_array.length == 0){
							Ext.Msg.alert("提示","请先选择一个流程实例！") ;
							return false ;
						}else{
							Ext.each(record_array , function(r){
								instanceCode = r.get('INSTANCECODE');
							});
						}
						// 等待框
						var msg = Ext.MessageBox.show({
							title 	 : 	'请等待',
							msg 	 : 	'正在提交请求.......',
							width 	 : 	240,
							wait	 : 	true,
							progress : 	true,
							closable : 	false
						});		
						// 提交请求
						Ext.Ajax.request({
							url 	: contextPath + '/workFlowServiceAction.do?method=revokeProcess',
							params	: {
								'instanceCode' : instanceCode
							},
							method 	: 'post',
							timeout : 3600000,
							success : function(response, options) {
								msg.hide();
								var response = Ext.JSON.decode(response.responseText);
								if(response.flag == 0){
									loadStore2();
									loadStore3();
								}
								Ext.Msg.alert("提示", response.msg);
							},
							failure : function(reponse, options) {
								msg.hide();
								var response = Ext.JSON.decode(response.responseText);
								Ext.Msg.alert("提示", response.msg);
							}
						});								
					}
				}),
				'-'		
			]),				
			width 	: 	'100%',
			height 	: 	'100%',
			layout	:	'border',
			items	:	[grid2]
		});
		
		
		
		// 重启被撤回的流程
	  	var store3 = new Ext.data.Store({
//	    	 url : contextPath + '/commonQueryAction.do?method=getInstances',
	  		 url : eu.loadPageDateUrl,
			 reader: new Ext.data.JsonReader({
				root:'dataList',
				totalProperty:'totalProperty',
				fields:[
					{name:'ENTITYNAME',			mapping:'ENTITYNAME'},
					{name:'INSTANCETITLE',		mapping:'INSTANCETITLE'},
					{name:'INSTANCESTATE',		mapping:'INSTANCESTATE'},
					{name:'BEGINDATE',			mapping:'BEGINDATE'},
					{name:'ENDDATE',			mapping:'ENDDATE'},
					{name:'ENTITYID',			mapping:'ENTITYID'},
					{name:'PROCESSID',			mapping:'PROCESSID'},
					{name:'INSTANCEID',			mapping:'INSTANCEID'},
					{name:'INSTANCECODE',		mapping:'INSTANCECODE'},
					{name:'BUSINESSID',			mapping:'BUSINESSID'},
					{name:'BUSINESSCODE',		mapping:'BUSINESSCODE'},
					{name:'BUSINESSNAME',		mapping:'BUSINESSNAME'}					
				]
			}),
			listeners	:	{
				'beforeload'	:	function(){
					store3.baseParams = {
						'appId' 		: 	appl.getValue(),
						'entityId'		:	entity.getValue(),
						'processName'	:	Ext.getCmp('pId3').getValue(),						
						'opType'		:	'restart',
						'SQL_KEY'		:	'processInstance.getCanceledInstances'
					}
				}
			},
			pruneModifiedRecords:true
	    });
		var sm3 = new Ext.grid.CheckboxSelectionModel({singleSelect:true,header:''});
		
		var cmArray3 = [] ;
		cmArray3.push(sm3);
		cmArray3.push(new Ext.grid.RowNumberer({header:'序号',width:35}));
		cmArray3.push({header: "业务实体名称",width: 250,align:'left',dataIndex: 'ENTITYNAME',sortable:true});
		cmArray3.push({header: "实例标题",width: 350,align:'left',dataIndex: 'INSTANCETITLE',sortable:true,renderer:openMonitor});
		cmArray3.push({header: "实例状态",width: 80,align:'left',dataIndex: 'INSTANCESTATE',sortable:true,renderer:chanageState});
		cmArray3.push({header: "开始日期",width: 130,align:'left',dataIndex: 'BEGINDATE',sortable:true});
		cmArray3.push({header: "结束日期",width: 130,align:'left',dataIndex: 'ENDDATE',sortable:true});
		cmArray3.push({header: "entityId",hidden:true, dataIndex: 'ENTITYID',sortable:true});
		cmArray3.push({header: "processId",hidden:true, dataIndex: 'PROCESSID',sortable:true});
		cmArray3.push({header: "instanceId",hidden:true, dataIndex: 'INSTANCEID',sortable:true});
		cmArray3.push({header: "实例编码",hidden:true,dataIndex: 'INSTANCECODE',sortable:true});
		cmArray3.push({header: "业务ID",hidden:true, dataIndex: 'BUSINESSID',sortable:true});
		cmArray3.push({header: "业务编码",width: 150,align:'left',dataIndex: 'BUSINESSCODE',sortable:true});
		cmArray3.push({header: "业务名称",width: 350,align:'left',dataIndex: 'BUSINESSNAME',sortable:true});		
		var cm3 = new Ext.grid.ColumnModel(cmArray3);
		
	 	var pagebar3 = new Ext.PagingToolbar({
	  	  	pageSize	:	20,
	  	  	store		:	store3,
	  	  	displayInfo	:	true,
	  	  	displayMsg	:	'显示第 {0} 条到 {1} 条记录,一共 {2} 条',
	  	  	emptyMsg	:	'没有记录'
	  	});			
		
		var grid3 = new Ext.grid.GridPanel({
		    store 		: 	store3,
			cm 			: 	cm3,
		    sm 			: 	sm3,
		    bbar		:	pagebar3,
		    width		:	'100%',
		    height		:	'100%',
		    region		:	'center' ,
		    loadMask	:	true,
		    stripeRows	: 	true,
		    listeners	:	{
		    	'render' : function(){
		    		
		    	}
		    }
		});				
		var p3 = new Ext.Panel({
			title	:	'已撤回的流程',
			tbar	:	new Ext.Toolbar([
				'-',
				'实例标题:',
				new Ext.form.TextField({
					id				:	'pId3',
			    	width			:	250,
			    	inputType		:	'text',
			    	fieldLabel		:	'实例标题',
			    	labelSeparator	:	':',
					listeners	:	{
						'specialkey':function(field,e){
							if (e.getKey() == Ext.EventObject.ENTER) {
								loadStore3();
							}
						}
					}					
				}),	
				'-',
				new Ext.Button({
					text	:	'重启流程',
					handler	:	function(){
						// 取得流程ID
						var instanceCode ;
						var processId ;
						var record_array = sm3.getSelections() ;
						if(record_array.length == 0){
							Ext.Msg.alert("提示","请先选择一个流程实例！") ;
							return false ;
						}else{
							Ext.each(record_array , function(r){
								instanceCode = r.get('INSTANCECODE');
								processId = r.get('PROCESSID') ;
							});
						}
						// 等待框
						var msg = Ext.MessageBox.show({
							title 	 : 	'请等待',
							msg 	 : 	'正在提交请求.......',
							width 	 : 	240,
							wait	 : 	true,
							progress : 	true,
							closable : 	false
						});		
						// 提交请求
						Ext.Ajax.request({
							url 	: contextPath + '/workFlowServiceAction.do?method=startCanceledProcess',
							params	: {
								'instanceCode'	: 	instanceCode,
								'processId'		:	processId		
							},
							method 	: 'post',
							timeout : 3600000,
							success : function(response, options) {
								msg.hide();
								var response = Ext.JSON.decode(response.responseText);
								if(response.flag == 0){
									loadStore2();
									loadStore3();
								}
								Ext.Msg.alert("提示", response.msg);
							},
							failure : function(reponse, options) {
								msg.hide();
								var response = Ext.JSON.decode(response.responseText);
								Ext.Msg.alert("提示", response.msg);
							}
						});								
					}
				}),
				'-'			
			]),			
			width 	: 	'100%',
			height 	: 	'100%',
			layout	:	'border',
			items	:	[grid3]
		});		
		
		
		// 执行完成的流程实例
	  	var store4 = new Ext.data.Store({
//	    	 url : contextPath + '/commonQueryAction.do?method=getInstances',
	  		 url : eu.loadPageDateUrl,
			 reader: new Ext.data.JsonReader({
				root:'dataList',
				totalProperty:'totalProperty',
				fields:[
					{name:'ENTITYNAME',			mapping:'ENTITYNAME'},
					{name:'INSTANCETITLE',		mapping:'INSTANCETITLE'},
					{name:'INSTANCESTATE',		mapping:'INSTANCESTATE'},
					{name:'BEGINDATE',			mapping:'BEGINDATE'},
					{name:'ENDDATE',			mapping:'ENDDATE'},
					{name:'ENTITYID',			mapping:'ENTITYID'},
					{name:'PROCESSID',			mapping:'PROCESSID'},
					{name:'INSTANCEID',			mapping:'INSTANCEID'},
					{name:'INSTANCECODE',		mapping:'INSTANCECODE'},
					{name:'BUSINESSID',			mapping:'BUSINESSID'},
					{name:'BUSINESSCODE',		mapping:'BUSINESSCODE'},
					{name:'BUSINESSNAME',		mapping:'BUSINESSNAME'}
				]
			}),
			listeners	:	{
				'beforeload'	:	function(){
					store4.baseParams = {
						'appId' 		: 	appl.getValue(),
						'entityId'		:	entity.getValue(),
						'processName'	:	Ext.getCmp('pId4').getValue(),						
						'opType'		:	'normal',
						'SQL_KEY'		:	'processInstance.getCompletedInstances'
					}
				}
			},
			pruneModifiedRecords:true
	    });
		var sm4 = new Ext.grid.CheckboxSelectionModel({singleSelect:true,header:''});
		
		var cmArray4 = [] ;
//		cmArray4.push(sm4);
		cmArray4.push(new Ext.grid.RowNumberer({header:'序号',width:35}));
		cmArray4.push({header: "业务实体名称",width: 250,align:'left',dataIndex: 'ENTITYNAME',sortable:true});
		cmArray4.push({header: "实例标题",width: 350,align:'left',dataIndex: 'INSTANCETITLE',sortable:true,renderer:openMonitor});
		cmArray4.push({header: "实例状态",width: 80,align:'left',dataIndex: 'INSTANCESTATE',sortable:true,renderer:chanageState});
		cmArray4.push({header: "开始日期",width: 130,align:'left',dataIndex: 'BEGINDATE',sortable:true});
		cmArray4.push({header: "结束日期",width: 130,align:'left',dataIndex: 'ENDDATE',sortable:true});
		cmArray4.push({header: "entityId",hidden:true, dataIndex: 'ENTITYID',sortable:true});
		cmArray4.push({header: "processId",hidden:true, dataIndex: 'PROCESSID',sortable:true});
		cmArray4.push({header: "instanceId",hidden:true, dataIndex: 'INSTANCEID',sortable:true});
		cmArray4.push({header: "实例编码",hidden:true,dataIndex: 'INSTANCECODE',sortable:true});
		cmArray4.push({header: "业务ID",hidden:true, dataIndex: 'BUSINESSID',sortable:true});
		cmArray4.push({header: "业务编码",width: 150,align:'left',dataIndex: 'BUSINESSCODE',sortable:true});
		cmArray4.push({header: "业务名称",width: 350,align:'left',dataIndex: 'BUSINESSNAME',sortable:true});		
		var cm4 = new Ext.grid.ColumnModel(cmArray4);
		
	 	var pagebar4 = new Ext.PagingToolbar({
	  	  	pageSize	:	20,
	  	  	store		:	store4,
	  	  	displayInfo	:	true,
	  	  	displayMsg	:	'显示第 {0} 条到 {1} 条记录,一共 {2} 条',
	  	  	emptyMsg	:	'没有记录'
	  	});		
		
		var grid4 = new Ext.grid.GridPanel({
		    store 		: 	store4,
			cm 			: 	cm4,
		    sm 			: 	sm4,
		    bbar		:	pagebar4,
		    width		:	'100%',
		    height		:	'100%',
		    region		:	'center' ,
		    loadMask	:	true,
		    stripeRows	: 	true,
		    listeners	:	{
		    	'render' : function(){
		    		
		    	}
		    }
		});				
		var p4 = new Ext.Panel({
			title	:	'已完成的流程',
			tbar	:	new Ext.Toolbar([
				'-',
				'实例标题:',
				new Ext.form.TextField({
					id				:	'pId4',
			    	width			:	250,
			    	inputType		:	'text',
			    	fieldLabel		:	'实例标题',
			    	labelSeparator	:	':',
					listeners	:	{
						'specialkey':function(field,e){
							if (e.getKey() == Ext.EventObject.ENTER) {
								loadStore4();
							}
						}
					}					
				}),	
				'-'			
			]),			
			width 	: 	'100%',
			height 	: 	'100%',
			layout	:	'border',
			items	:	[grid4]
		});			
		
		
		// tabpanel
		var tabPanel = new Ext.TabPanel({
			activeItem	:	0,
			width		:	'100%',
			height		:	'100%',
			region 		: 	'center',
			items		:	[p1,p2,p3,p4]
		});

		// 布局容器
		new Ext.Viewport({
			width 	: 	'100%',
			height 	: 	'100%',
			layout 	: 	'border',
			items 	: 	[formPanel, tabPanel]
		});
	});
}