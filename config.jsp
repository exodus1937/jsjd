<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%
	String contextPath = request.getContextPath();
%>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=utf-8">
	<title>系统文件配置</title>
	<link rel="stylesheet" href="<%=contextPath%>/webbuilder/controls/ext/resources/css/ext-all.css" type="text/css">
	<link rel="stylesheet" href="<%=contextPath%>/webbuilder/css/style.css" type="text/css">
	<script type="text/javascript" src="<%=contextPath%>/webbuilder/script/locale/wb-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/webbuilder/controls/ext/ext-all.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/webbuilder/controls/ext/locale/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/webbuilder/script/wb.js"></script>
</head>
<body>
	<script language="javascript" type="text/javascript">
	Ext.onReady(function(){
		Wb.initialize(null,480);
		var maxUid = 0;

		var emptyUid = 0;

		function createSpilitForm(){
		  var panel = new Ext.panel.Panel({
		    id : "emptyPanel_" + emptyUid,
		        frame : true,
		        layout : "column",
		        //columnWidth : .96,
		        width : '20px',
		        html : "&nbsp;",
		        xtype : "panel",
		        border : false,
		        baseCls : 'my-panel-no-border'
		  });
		  
		  emptyUid++;
		  
		  return panel;
		}

		function createDataSourceForm(record){
		  var uid = maxUid;
		  
		  var newForm = new Ext.form.Panel({
		    id : "dateSourceForm_" + uid,
		    //frame : true,
		    layout : "form",
		    bodyPadding : "5 10 10 5",
		    width : 350,
		    height : 500,
		    //title : record==null?"数据源:新增数据源":"数据源:"+record.get('dataSourceId'),
		    //collapsible : true,
		    //style : 'border-width:0px',
		    //x : 5,
		    listeners:{
		      'afterrender':function(){
		        if(record!=null){
		          setReadonly("dataSourceId_" + uid, true);
		        }
		        setReadonly("validationQuery_" + uid, true);
		      }
		    },
		    items : [{
		      id : "panel1_" + uid,
		      frame : true,
		      layout : "column",
		      columnWidth : .5,
		      xtype : "panel",
		      border : false,
		      baseCls : 'my-panel-no-border',
		      items : [ {
		        id : "panel2_" + uid,
		        frame : true,
		        layout : "column",
		        columnWidth : .96,
		        html : "&nbsp;",
		        xtype : "panel",
		        border : false,
		        baseCls : 'my-panel-no-border'
		      },{
		        id : "btn_save_" + uid,
		        iconCls : "ok_icon",
		        x : 5,
		        xtype : "button",
		        text : "保存",
		          listeners:{
		            'click':function(){
		              var opType = Ext.getCmp("opType_" + uid).getValue();
		              var dataSourceId = Ext.getCmp("dataSourceId_" + uid).getValue();

		              if(Ext.isEmpty(dataSourceId)){
		                Wb.message('数据源ID不能为空');
		                return;
		              }

		              if(opType=='_added'){
		                if(dataSourceStore.find('dataSourceId',dataSourceId) > 0){
		                  Wb.message('数据源ID已经存在');
		                  return;
		                }
		              }

		              //校验数据源配置项是否全部填写
		              if(!Ext.getCmp("dateSourceForm_" + uid).getForm().isValid()){
		                Wb.message('数据源配置项不能为空');
		                return;
		              }

		              var json = "{" +
		                  "'driverClassName':'" + Ext.getCmp("driverClassName_" + uid).getValue() + "'," +
		                  "'url':'" + Ext.getCmp("jdbcUrl_" + uid).getValue().replace(/\'/g,"\\'") + "'," +
		                  "'username':'" + Ext.getCmp("username_" + uid).getValue() + "'," +
		                  "'password':'" + Ext.getCmp("password_" + uid).getValue() + "'," +
		                  "'filters':'" + Ext.getCmp("filters_" + uid).getValue() + "'," +
		                  "'maxActive':'" + Ext.getCmp("maxActive_" + uid).getValue() + "'," +
		                  "'initialSize':'" + Ext.getCmp("initialSize_" + uid).getValue() + "'," +
		                  "'poolPreparedStatements':'" + Ext.getCmp("poolPreparedStatements_" + uid).getValue() + "'," +
		                  "'maxOpenPreparedStatements':'" + Ext.getCmp("maxOpenPreparedStatements_" + uid).getValue() + "'," +
		                  "'validationQuery':'" + Ext.getCmp("validationQuery_" + uid).getValue() + "'," +
		                  "'testOnBorrow':'" + Ext.getCmp("testOnBorrow_" + uid).getValue() + "'," +
		                  "'testOnReturn':'" + Ext.getCmp("testOnReturn_" + uid).getValue() + "'," +
		                  "'testWhileIdle':'" + Ext.getCmp("testWhileIdle_" + uid).getValue() + "'," +
		                  "'timeBetweenEvictionRunsMillis':'" + Ext.getCmp("timeBetweenEvictionRunsMillis_" + uid).getValue() + "'}";

		              var msg = Ext.MessageBox.show({
		                title 	 : 	'请等待',
		                msg 	 : 	'正在提交请求.......',
		                width 	 : 	240,
		                wait	 : 	true,
		                progress : 	true,
		                closable : 	false
		              });

		              var dataSourceId = Ext.getCmp("dataSourceId_" + uid).getValue();

		              Ext.Ajax.request({
		                url : '<%=contextPath%>/platformAction.do?method=saveDataSource',
		                params:{"dataSourceId":dataSourceId,"opType":opType,"modifyJson":json},
		                method: 'POST',
		                success: function(response,options){
		                  msg.hide();
		                  dataSourceStore.insert(0,json);
		                  dataSourceStore.commitChanges();
		                  if(opType=='_added'){
		                    Ext.getCmp("opType_" + uid).setValue('_modified');
		                    setReadonly("dataSourceId_" + uid, true);
		                  }
		                  Wb.message('保存成功');
		                },
		                failure: function(response,options){
		                  msg.hide();
		                  Ext.Msg.alert("提示","服务器端没有响应!");
		                }
		              });
		              
		            }
		          }
		      }, {
			        id : "btn_test_" + uid,
			        iconCls : "set_icon",
			        x : 10,
			        xtype : "button",
			        text : "测试",
			          listeners:{
			            'click':function(){
			              
			            	
			            	Ext.Msg.wait('正在测试请稍后...');
			            	Ext.Ajax.request({
				                url : '<%=contextPath%>/platformAction.do?method=DateSourceConnectionTest',
				                timeout:60*60*3600,
				                params:{
				                	"driverClassName":Ext.getCmp("driverClassName_" + uid).getValue(),
				                	"url":Ext.getCmp("jdbcUrl_" + uid).getValue().replace(/\'/g,"\\'"),
				                	"username":Ext.getCmp("username_" + uid).getValue(),
				                	"password":Ext.getCmp("password_" + uid).getValue()
				                },
				                method: 'POST',
				                success: function(response,options){
				                	Ext.Msg.hide();
				                	var resultJson = Ext.JSON.decode(response.responseText);
				                	
				                	Wb.message(resultJson.msg);
				                },
				                failure: function(response,options){
				                	Ext.Msg.hide();
				                    Ext.Msg.alert("提示","服务器端没有响应!");
				                }
				              });
			            	
			            }
			          }
			      }, {
		        id : "btn_del_" + uid,
		        iconCls : "cancel_icon",
		        x : 15,
		        xtype : "button",
		        hidden : record==null ? false : record.get('dataSourceId') == 'xipDefaultDS' ? true : false,
		        text : "删除",
		          listeners:{
		            'click':function(){
		              Ext.Msg.confirm('提示','确定删除此数据源？',function(btn){
		                if(btn=='yes'){
		                  
		                  if(Ext.getCmp("opType_" + uid) == '_added'){
		                    dataSourcesPanel.remove(Ext.getCmp("dateSourceForm_" + uid), true);
		                    Wb.message('删除成功!');
		                    return;
		                  }else{
		                  	var msg = Ext.MessageBox.show({
		                      title 	 : 	'请等待',
		                      msg 	 : 	'正在提交请求.......',
		                      width 	 : 	240,
		                      wait	 : 	true,
		                      progress : 	true,
		                      closable : 	false
		                    });
		                    
		                    var dataSourceId = Ext.getCmp("dataSourceId_" + uid).getValue();

		                    Ext.Ajax.request({
		                      url : '<%=contextPath%>/platformAction.do?method=delDataSourceById',
		                      params:{"dataSourceId":dataSourceId},
		                      method: 'POST',
		                      success: function(response,options){
		                        msg.hide();
		                        dataSourcesPanel.remove(Ext.getCmp("dateSourceForm_" + uid), true);
		                        dataSourceStore.remove(dataSourceStore.findRecord('dataSourceId',dataSourceId));
		                        Wb.message('删除成功');
		                      },
		                      failure: function(response,options){
		                        msg.hide();
		                        Ext.Msg.alert("提示","服务器端没有响应!");
		                      }
		                    });
		                  }
		                }
		              });
		            }
		          }
		      } ]
		    },
		             {
		               id : "dateSourceFieldSet_" + uid,
		               title : "数据源",
		               //collapsible : true,
		               layout : "fit",
		               xtype : "fieldset",
		               title : record==null?"数据源:新增数据源":"数据源:"+record.get('dataSourceId'),
		               items : [
		                 {
		                   id : "panel3_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .98,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "dataSourceId_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     labelAlign : "right",
		                     fieldLabel : "数据源ID",
		                     xtype : "textfield",
		                     value : record==null?"":record.get('dataSourceId')
		                   },{
		                      id : "opType_" + uid,
		                      labelWidth : 80,
		                      width : 250,
		                      labelAlign : "right",
		                      fieldLabel : "操作类型",
		                      xtype : "textfield",
		                      hidden : true,
		                      value : record==null?"_added":"_modified"
		                    } ]
		                 },
		                 {
		                   id : "panel4_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "driverClassName_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     value : "mysql",
		                     labelAlign : "right",
		                     fieldLabel : "驱动类型",
		                     forceSelection : true,
		                     xtype : "combobox",
		                     minChars : 0,
		                     store : [ [ 'com.mysql.jdbc.Driver', 'mysql' ],
		                             [ 'oracle.jdbc.driver.OracleDriver', 'oracle' ] ],
		                     forceList : false,
		                     value : record==null?"com.mysql.jdbc.Driver":record.get('driverClassName'),
		                     listeners:{
		                    	 'select':function(comb){
		                    		 var value = comb.getValue();
		                    		 var temp_jdbcUrl = Ext.getCmp("jdbcUrl_" + uid).getValue();
		                    		 if(value=='com.mysql.jdbc.Driver'){
		                    			 if(temp_jdbcUrl=='' || temp_jdbcUrl=='jdbc:oracle:thin:@ip:port:ServiceName'){
		                    				 Ext.getCmp("jdbcUrl_" + uid).setValue('jdbc:mysql://ip:port/datebase');
		                    			 }else{
		                    				 if(temp_jdbcUrl.indexOf('oracle') != -1){
		                    					 Ext.getCmp("jdbcUrl_" + uid).setValue('jdbc:mysql://ip:port/datebase');
		                    				 }
		                    			 }
		                    			 Ext.getCmp("validationQuery_" + uid).setValue('select 1');
		                    		 }else{
		                    			 if(temp_jdbcUrl=='' || temp_jdbcUrl=='jdbc:mysql://ip:port/datebase'){
		                    				 Ext.getCmp("jdbcUrl_" + uid).setValue('jdbc:oracle:thin:@ip:port:ServiceName');
		                    			 }else{
		                    				 if(temp_jdbcUrl.indexOf('mysql') != -1){
		                    					 Ext.getCmp("jdbcUrl_" + uid).setValue('jdbc:oracle:thin:@ip:port:ServiceName');
		                    				 }
		                    			 }
		                    			 Ext.getCmp("validationQuery_" + uid).setValue('select 1 from dual');
		                    		 }
		                    	 }
		                     }
		                   } ]
		                 },
		                 {
		                   id : "panel5_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .5,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "jdbcUrl_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     labelAlign : "right",
		                     fieldLabel : "连接地址",
		                     xtype : "textfield",
		                     value : record==null?"jdbc:mysql://ip:port/datebase":record.get('url')
		                   } ]
		                 },
		                 {
		                   id : "panel6_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "username_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     labelAlign : "right",
		                     fieldLabel : "用户名",
		                     xtype : "textfield",
		                     value : record==null?"":record.get('username')
		                   } ]
		                 },
		                 {
		                   id : "panel7_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "password_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     labelAlign : "right",
		                     fieldLabel : "密码",
		                     xtype : "textfield",
		                     inputType: 'password',
		                     value : record==null?"":record.get('password')
		                   } ]
		                 },
		                 {
		                   id : "panel8_" + uid,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "initialSize_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "20",
		                     labelAlign : "right",
		                     fieldLabel : "默认连接数",
		                     xtype : "textfield",
		                     value : record==null?"20":record.get('initialSize')
		                   } ]
		                 },
		                 {
		                   id : "panel9_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "maxActive_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "20",
		                     labelAlign : "right",
		                     fieldLabel : "最大连接数",
		                     xtype : "textfield",
		                     value : record==null?"20":record.get('maxActive')
		                   } ]
		                 },
		                 {
		                   id : "panel10_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "poolPreparedStatements_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "false",
		                     labelAlign : "right",
		                     fieldLabel : "是否缓冲PS",
		                     forceSelection : true,
		                     xtype : "combobox",
		                     minChars : 0,
		                     store : [ [ 'true', '是' ],
		                              [ 'false', '否' ] ],
		                     forceList : false,
		                     value : record==null?"false":record.get('poolPreparedStatements')
		                   } ]
		                 },
		                 {
		                   id : "panel11_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "maxOpenPreparedStatements_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "200",
		                     labelAlign : "right",
		                     fieldLabel : "最大PS数",
		                     xtype : "textfield",
		                     value : record==null?"200":record.get('maxOpenPreparedStatements')
		                   } ]
		                 },
		                 {
		                   id : "panel12_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .5,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "validationQuery_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "select 1 from wb_dual",
		                     labelAlign : "right",
		                     fieldLabel : "检测连接SQL",
		                     xtype : "textfield",
		                     //readOnly : true,
		                     value : record==null?"select 1":record.get('validationQuery')
		                   } ]
		                 },
		                 {
		                   id : "panel13_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "timeBetweenEvictionRunsMillis_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "60000",
		                     labelAlign : "right",
		                     fieldLabel : "连接间隔时间",
		                     xtype : "textfield",
		                     value : record==null?"60000":record.get('timeBetweenEvictionRunsMillis')
		                   } ]
		                 },
		                 {
		                   id : "panel14_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "testOnBorrow_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "true",
		                     labelAlign : "right",
		                     fieldLabel : "取连接前检验",
		                     forceSelection : true,
		                     xtype : "combobox",
		                     minChars : 0,
		                     store : [ [ 'true', '是' ],
		                              [ 'false', '否' ] ],
		                     forceList : false,
		                     value : record==null?"true":record.get('testOnBorrow')
		                   } ]
		                 },
		                 {
		                   id : "panel15_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "testWhileIdle_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "true",
		                     labelAlign : "right",
		                     fieldLabel : "申请连接检验",
		                     forceSelection : true,
		                     xtype : "combobox",
		                     minChars : 0,
		                     store : [ [ 'true', '是' ],
		                              [ 'false', '否' ] ],
		                     forceList : false,
		                     value : record==null?"false":record.get('testOnReturn')
		                   } ]
		                 },
		                 {
		                   id : "panel16_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "testOnReturn_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "false",
		                     labelAlign : "right",
		                     fieldLabel : "归还连接检验",
		                     forceSelection : true,
		                     xtype : "combobox",
		                     minChars : 0,
		                     store : [ [ 'true', '是' ],
		                              [ 'false', '否' ] ],
		                     forceList : false,
		                     value : record==null?"true":record.get('testWhileIdle')
		                   } ]
		                 },
		                 {
		                   id : "panel17_" + uid,
		                   frame : true,
		                   layout : "form",
		                   columnWidth : .25,
		                   xtype : "panel",
		                   border : false,
		                   baseCls : 'my-panel-no-border',
		                   items : [ {
		                     id : "filters_" + uid,
		                     labelWidth : 80,
		                     allowBlank : false,
		                     //value : "stat",
		                     labelAlign : "right",
		                     fieldLabel : "扩展插件",
		                     forceSelection : true,
		                     xtype : "combobox",
		                     minChars : 0,
		                     store : [ [ 'stat', '监控统计' ],
		                              [ 'log4j', '日志' ],
		                              [ 'wall', '防注入' ] ],
		                     forceList : false,
		                     value : record==null?"stat":record.get('filters')
		                   } ]
		                 } ]
		             }]

		  });
		  maxUid = maxUid + 1;
		  
		  return newForm;
		}

		

		var defaultTextBgImg = '<%=contextPath%>' + '/webbuilder/controls/ext/resources/themes/images/default/form/text-bg.gif';

		//设置组件是否可读并设置背景色 comId：组件id , flag: true,false
		function setReadonly(comId, flag){
		  if(flag){
		    Ext.getCmp(comId).setReadOnly(true);
		    Ext.getCmp(comId).setFieldStyle('background-color:#DDD;background-image:none');
		  }else{
		    Ext.getCmp(comId).setReadOnly(false);
		    Ext.getCmp(comId).setFieldStyle('background-color:#FFF;background-image:none;background:url("'+defaultTextBgImg+'") repeat-x scroll 0px 0px rgb(255, 255, 255)');
		    //Ext.getCmp(comId).setFieldStyle('background-color:#FFF;background-image:url("../../resources/themes/images/default/form/text-bg.gif");background-repeat:repeat-x');
		  }
		}

		Wd.propertyStore=new Ext.data.Store({
		proxy:{type:"ajax",url:"<%=contextPath%>/platformAction.do?method=getProperties",reader:{type:"json",root:"rows",rootProperty:"rows",totalProperty:"total"},listeners:{exception:function(proxy,response,operation,options){
		Wb.except(response.responseText);
		}}},fields:[{name:'name'},{name:'value'},{name:'note'}],pageSize:Wb.maxInt,storeId:"propertyStore",params:{},listeners:{beforeload:function(store,operation,options){
		if(!Wb.setStore(store))return false;
		Wb.mask("","");
		},load:function(store,records,successful,operation,options){
			propertyStore.sort('name', 'ASC');
		Wb.unmask("");
		}}
		});
		Wd.dataSourceStore=new Ext.data.Store({
		proxy:{type:"ajax",url:"<%=contextPath%>/platformAction.do?method=getDataSources",reader:{type:"json",root:"rows",rootProperty:"rows",totalProperty:"total"},listeners:{exception:function(proxy,response,operation,options){
		Wb.except(response.responseText);
		}}},fields:[
		  {name:'dataSourceId'},
		  {name:'driverClassName'},
		  {name:'url'},
		  {name:'username'},
		  {name:'password'},
		  {name:'filters'},
		  {name:'maxActive'},
		  {name:'initialSize'},
		  {name:'poolPreparedStatements'},
		  {name:'maxOpenPreparedStatements'},
		  {name:'validationQuery'},
		  {name:'testOnBorrow'},
		  {name:'testOnReturn'},
		  {name:'testWhileIdle'},
		  {name:'timeBetweenEvictionRunsMillis'}
		],pageSize:Wb.maxInt,storeId:"dataSourceStore",params:{},listeners:{beforeload:function(store,operation,options){
		if(!Wb.setStore(store))return false;
		Wb.mask("","");
		},load:function(store,records,successful,operation,options){
		Wb.unmask("");
		if(successful){
		dataSourcesPanel.removeAll();
		for(var i=0; i<records.length; i++){
		  var record = records[i];
		  
		  //dataSourcesPanel.add(createSpilitForm());
		  dataSourcesPanel.add(createDataSourceForm(record));
		}
		}
		}}
		});
		Wd.value_property_Column_editor=Wd._value_property_Column_editor={id:"value_property_Column_editor",xtype:"textfield"
		};
		Wd.propertyGridColumns=[
		{id:"rownumber",text:"序号",type:"rowNumber",renderer:Wb.nr,sortable:false,hideable:false,width:35,align:"right"
		}
		,{id:"name_property_column",text:"配置项",dataIndex:"name",renderer:function(a,b){return Wb.rd(a,b,0,0)},width:220
		}
		,{id:"value_property_Column",editor:value_property_Column_editor,text:"值",dataIndex:"value",renderer:function(a,b){return Wb.rd(a,b,0,0)},width:320
		}
		,{id:"note_property_Column",text:"说明",dataIndex:"note",renderer:function(a,b){return Wb.rd(a,b,0,0)},width:400
		}
		];
		Wd.propertyGridTbar=new Ext.toolbar.Toolbar({
		id:"propertyGridTbar",items:[
		{id:"menuItem1",xtype:"tbseparator"
		}
		,{id:"btn_save",iconCls:"save_icon",xtype:"button",text:"保存",listeners:{click:function(button,event,options){
		var modifies = propertyStore.getModifiedRecords();

		if(modifies==='' || modifies.length===0){
		  Ext.Msg.alert('提示','没有修改保存的记录!');
		  return;
		}

		var json = "{";

		for(var i=0; i<modifies.length; i++){
		  var record = modifies[i];
		  json = json + "'" +record.get('name') + "':'" + encodeURI(record.get('value')).replace(/\'/g,"\\'") + "',";
		}

		json = json.substring(0, json.length-1);

		json = json + "}";

		//var json = Ext.JSON.encode(json);

		var msg = Ext.MessageBox.show({
		  title 	: 	'请等待',
		  msg 	 	: 	'正在提交请求.......',
		  width 	: 	240,
		  wait	 	: 	true,
		  progress : 	true,
		  closable : 	false
		});

		Ext.Ajax.request({
		  url : '<%=contextPath%>'+'/platformAction.do?method=saveProperties',
		  params:{"modifyJson":json},
		  method: 'POST',
		  success: function(response,options){
		    msg.hide();
		    var temp = response.responseText;
		    var resp = Ext.JSON.decode(temp);
		    if(resp.flag=='0'){
		      Ext.Msg.alert("提示",'保存成功!');
		      propertyStore.load();
		    }else{
		      Ext.Msg.alert("提示",'保存失败:'+resp.msg);
		    }
		  },
		  failure: function(response,options){
		    msg.hide();
		    Ext.Msg.alert("提示","服务器端没有响应!");
		  }
		});
		}}
		}
		,{id:"menuItem2",xtype:"tbseparator"
		}
		]});
		Wd.dataSourcesPanelTbar=new Ext.toolbar.Toolbar({
		id:"dataSourcesPanelTbar",items:[
		{id:"menuItem3",xtype:"tbseparator"
		}
		,{id:"btn_add",iconCls:"new_icon",xtype:"button",text:"新增数据源",listeners:{click:function(button,event,options){
		//dataSourcesPanel.add(createSpilitForm());
		dataSourcesPanel.add(createDataSourceForm(null));
		}}
		}
		,{id:"menuItem4",xtype:"tbseparator"
		}
		]});
		Wd.viewport1=new Ext.container.Viewport({
		id:"viewport1",layout:"fit",items:[
		{id:"tabPanel",xtype:"tabpanel",plugins:[{"ptype":"tabscrollermenu"}],items:[
		{id:"basePanel",title:"基础配置",frame:true,layout:"fit",xtype:"panel",border:false,listeners:{activate:function(panel,options){
		Wb.load(propertyStore);
		}},items:[
		{tbar:propertyGridTbar,id:"propertyGrid",selType:"checkboxmodel",store:propertyStore,sortableColumns:true,xtype:"grid",columns:propertyGridColumns,plugins:[{ptype:"cellediting",clicksToEdit:1}],bbar:Wb.getPagingBar(propertyStore,"propertyGrid",1,1,1,1)
		}
		]}
		,{id:"dataSourcesPanel",tbar:dataSourcesPanelTbar,title:"数据源配置",frame:true,autoScroll:true,layout:"column",xtype:"panel",border:false,listeners:{activate:function(panel,options){
		Wb.load(dataSourceStore);
		}}
		}
		]}
		]});
		Wb.load(propertyStore);
		});
	</script>
</body>
</html>