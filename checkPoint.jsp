<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="webbuilder/controls/ext/resources/css/ext-all.css"/> 
	<script src="js/jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="css/pm03.css"/>
	<script type="text/javascript" src="webbuilder/controls/ext/locale/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="webbuilder/controls/ext/ext-all.js"></script> 
	<script src="echars/asset/js/esl/esl.js"></script>
	<script src="echars/dist/echarts.js"></script>
	<script type="text/javascript" src="My97DatePicker/calendar.js"></script>
	<script type="text/javascript" src="My97DatePicker/WdatePicker.js"></script>
	<title>指标查询</title>
</head>
<body>
	<div style="left: 280px; top:11px; position: absolute;">
		<span>月份：</span>
		<input type="text"  class="Wdate" id="myMonth" style="width: 80px;" onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM',maxDate:'%y-%M' })"/>
	</div>
	<div id ="all" style="left: 100px; top: 20px; width: 80%; height: 80%; overflow: hidden; position: absolute;">
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
		<div id="main" style="height:310px; top: 100px;"></div>
	</div>
	<div id='div2' style="left: 250px; top:320px; width: 60%; height: 60%; overflow: hidden; position: absolute;">
		<div id="divGrid" style="height:310px;top:0px"></div>
	</div>
	<script type="text/javascript">
		var first = 0;
		//电厂名称数组
		var orgs = [];
		//电厂ID数组
		var orgsID = [];
		var orgsJson = '';
		//指标名称数组
		var indexs = [];
		//指标id数组
		var indexsID = [];
		var indexsJson = '';
		//查询条件：字符串
		var json;
		//series数据
		var series = [];
		/**
		 * Ext部分
		 */
		Ext.onReady(function(){ 	
			Ext.create('Ext.Button', {
				renderTo: document.body,
				text: '选择电厂',
				width:80,
				x:80,
			    y:10,
			    handler: function() {
			    	Ext.getCmp('grid1').getSelectionModel().deselectAll();
			    	Ext.getCmp('grid2').getSelectionModel().deselectAll();
			    	Ext.getCmp('grid3').getSelectionModel().deselectAll();
			    	Ext.getCmp('grid4').getSelectionModel().deselectAll();
			    	orgWin.show();
			    }
			});
			Ext.create('Ext.Button', {
			    renderTo: document.body,
			    text    : '选择指标',
			    width:80,
			    x:85,
			    y:10,
			    handler: function() {
			    	if(orgsJson==''||orgsJson==null){
			    		Ext.Msg.alert('提示','请选择电厂');
			    		return;
			    	}
			    	Ext.getCmp('grid5').getSelectionModel().deselectAll();
			    	grid5.getStore().load({
			    		params:{'orgs':orgsJson},
			    		callback:function(data){
			    		}
			    	});
			    	quotaWin.show();
			    }
			});
			function searchPoint(){
				//document.getElementById('myMonth').value = "2015-06";
				if(orgsJson==''||orgsJson==null){
		    		Ext.Msg.alert('提示','请选择电厂');
		    		return;
		    	}
		    	if(indexsJson==''||indexsJson==null){
		    		Ext.Msg.alert('提示','请选择指标');
		    		return;
		    	}
		    	var date = $("#myMonth").val();
		    	if(date==''||date==null){
		    		Ext.Msg.alert('提示','请选择时间');
		    		return;
		    	}
		    	json = orgsJson +";"+ indexsJson +";"+ date;
		    	grid.getStore().load({
		    		params:{'json':json},
		    		callback:function(data){
		    		}
		    	});
		    	$.ajax({
					url : "PointAction/getValue.do",
					type : "post",
					async : false, //同步执行
					dateType : "json",
					data:{
						'json' : json
					},
					success : function(data) {
						series.splice(0,series.length);
						var orgData = data.split(';');
						for(var a=0;a<orgData.length;a++){
							var data1 = orgData[a].split('/');
							for(var o=0;o<orgsID.length;o++){
								if(data1[0]==orgsID[o]){
									data1[0]=orgs[o];
								}
							}
							var value1 = [];
							if(data1.length==2){
								var indexAndValue1 = data1[1].split(',');
								for(var i=0;i<indexsID.length;i++){
									value1[i]=0;
								}
								for(var i=0;i<indexAndValue1.length;i++){
									var v = indexAndValue1[i].split(':');
									for(var j=0;j<indexsID.length;j++){
										if(v[0]==indexsID[j]){
											value1[j]=v[1];
										}
									}			
								}
							}
							if(data1.length!==2){
								for(var i=0;i<indexsID.length;i++){
									value1[i]=0;
								}
							}
							var item1 = {
								name:data1[0],
								type:'bar',
								data:value1
							};
							series[a]=item1;
						}
						myChart.setOption(option,true);
					},
				})
			}
			Ext.create('Ext.Button', {
			    renderTo: document.body,
			    text    : '查询',
			    //hidden:true,
			    width:80,
			    x:270,
			    y:10,
			    handler: function() {
			    	searchPoint();       
			    }
			});
			// 建立一个store要使用的 model
			Ext.define('Org1', {
			    extend: 'Ext.data.Model',
			    fields: [
		           {name: 'id', type: 'string'},
		           {name: 'name',  type: 'string'}
			    ]
			});
			Ext.define('Org2', {
			    extend: 'Ext.data.Model',
			    fields: [
		           {name: 'id', type: 'string'},
		           {name: 'name',  type: 'string'}
			    ]
			});
			Ext.define('Org3', {
			    extend: 'Ext.data.Model',
			    fields: [
			     	{name: 'id', type: 'string'},
			      	{name: 'name',  type: 'string'}
			    ]
			});
			Ext.define('Org4', {
			    extend: 'Ext.data.Model',
			    fields: [
			      	{name: 'id', type: 'string'},
			      	{name: 'name',  type: 'string'}
			    ]
			});
			Ext.define('quota', {
			    extend: 'Ext.data.Model',
			    fields: [
			    	{name: 'id', type: 'string'},
			      	{name: 'name',  type: 'string'}
			    ]
			});
			Ext.define('store6', {
			    extend: 'Ext.data.Model',
			    fields: [
			    	{name: 'valueId', type: 'string'},
			       	{name: 'value',  type: 'string'},
			       	{name: 'indexCode', type: 'string'},
			       	{name: 'org_name',  type: 'string'}
			    ]
			});
			var grid = new Ext.grid.GridPanel({
				renderTo: "divGrid", //rendTo属性指示将表格渲染到什么地方
				columns: [
				  	{ header: '编号', dataIndex: 'valueId', width: 80, sortable: true,hidden:true }, //sortable:是否排序,width:重设列宽
				  	new Ext.grid.RowNumberer({ 
				  		header:"序号", width:40, renderer:function(value, metadata, record, rowIndex){
				  			return 1 + rowIndex;
				  		}
				  	}),
				  	{ header: '测点值', dataIndex: 'value', sortable: true,width:200},
				   	{ header: '指标', dataIndex: 'indexCode',width:286},
				   	{ header: '电厂', dataIndex: 'org_name',width:280}
				], 
				store: Ext.create('Ext.data.Store', {
				 	model:'store6',
					proxy: {
				    	type: 'ajax',
				 		url: 'PointAction/getGridValue.do',
				 		reader: {
				     		type: 'json',
				     		root:'dataList'
				    	}
				 	},
				 	autoLoad: false        	
				}),
				stripeRows: true, //斑马线效果
				loadMask: true, //读取数据遮罩和提示,Loading....
				enableColumnMove: false, //取消列的拖放
				enableColumnResize: true, //取消列的大小改变
				columnLines:true,
				viewConfig: {
				    forceFit: true//自动填满Grid,填满父容器"grid"的大小，
				}
			});
			/*指标window*/
			var quotaWin =	Ext.create('Ext.window.Window', {
				title: '指标列表',
				height: 350,
				x: 300,
				y: 80,
				width: 200,
				layout: 'fit',
				//renderTo: document.body,
				modal:true,
				buttonAlign:"center",
				closeAction:'hide',
				//window中的按钮,添加事件
				buttons:[{
					text:"确定",       	
					listeners:{
						"click":function(){
							var rows = grid5.getSelectionModel().getSelection();
							if(rows.length==0){
			    				Ext.Msg.alert('提示','请选择指标');
			    				return;
			    			}
							indexsJson = '';
							indexs.splice(0,indexs.length);
							indexsID.splice(0,indexsID.length);
							for(var i=0;i<rows.length;i++){
								var record = rows[i];
								indexs[i] = record.get('name');
								indexsID[i] = record.get('id');
								indexsJson = indexsJson + record.get('id') + ',';
							} 
							indexsJson = indexsJson.substr(0,indexsJson.length-1);
		   					quotaWin.hide();
		   					if(first==0){
		   						document.getElementById('myMonth').value = "2015-06";
		   						searchPoint();
		   						first=1;
		   					}
		   		  		}
		   	   		}
		     	}],
		   		//window中嵌入一个指标列表
				items: { 
					xtype: 'grid',
					id:'grid5',
					border: false,
					selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),//设置可以多选
					selType:'checkboxmodel',
					columns: [
						{header: '指标名称',flex:-1,align:'center',dataIndex:'name'},
						{header:'指标编码',hidden:true,dataIndex:'id'}
					],
					store: Ext.create('Ext.data.Store', {
						model:'quota',
						//调用后台ajax
						proxy: {
							type: 'ajax',
							url: 'PointAction/getIndex.do',
							reader: {
								type: 'json',
								root:'dataList'
							}
						},
						autoLoad: false        	
					}) 
				}
			});
		    
			/*电厂window*/
			var tabs=new Ext.TabPanel({
		     	region:'center',
		    	border:false,
		     	frame:true,
		     	activeTab:0,
		     	defaults:{autoScroll:true},
		     	items:[{
		        	title:'火电',
		            layout:'fit',
		            items: { 
		            	xtype: 'grid',
		                id:'grid1',
		                border: false,
		                selType:'checkboxmodel',
		                selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),//设置可以多选
		                columns: [
		                	{header: '电厂名称',flex:-1,align:'center',dataIndex:'name'},
		                    {header:'电厂ID',hidden:true,dataIndex:'id'}
		                ],
		                store: Ext.create('Ext.data.Store', {
		                	model:'Org1',
		                 	proxy: {
		                 		type: 'ajax',
		                 	    url: 'PointAction/getFireFactory.do',
		                 	    reader: {
			                 	    type: 'json',
			                 	    root:'dataList'
		                 	    }
		                 	},
		                 	autoLoad: true        	
		                }) 
					}    
				},
				{
		        	title:'风电',
		        	layout:'fit',
		        	items: { 
		            	xtype: 'grid',
		            	id:'grid2',
		            	border: false,
		            	selType:'checkboxmodel',
		            	selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),//设置可以多选
		            	columns: [
		            		{header: '电厂名称',flex:-1,align:'center',dataIndex:'name'},
		                    {header:'电厂ID',hidden:true,dataIndex:'id'}
		               	],
		            	store: Ext.create('Ext.data.Store', {
		          	    	model:'Org2',
		          	    	proxy: {
		          	        	type: 'ajax',
		          	         	url: 'PointAction/getWindFactory.do',
		          	         	reader: {
		          	            	type: 'json',
		          	            	root:'dataList'
		          	        	}
		          	   		},
		          	    	autoLoad: true        	
		            	}) 
		         	}
		    	},
		    	{
		        	title:'水电',
		            layout:'fit',
		            items: { 
		            	xtype: 'grid',
		                id:'grid3',
		                border: false,
		                selType:'checkboxmodel',
		                selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),//设置可以多选
		                columns: [
		                	{header: '电厂名称',flex:-1,align:'center',dataIndex:'name'},
		                    {header:'电厂ID',hidden:true,dataIndex:'id'}
		                ],
		                store: Ext.create('Ext.data.Store', {
		              		model:'Org3',
		              	    proxy: {
		              	         type: 'ajax',
		              	         url: 'PointAction/getWaterFactory.do',
		              	         reader: {
		              	             type: 'json',
		              	             root:'dataList'
		              	         }
		              	     },
		              	     autoLoad: true        	
		                }) 
		             }
		        },
		        {
		        	title:'光伏',
		            layout:'fit',
		        	items: { 
		            	xtype: 'grid',
		                id:'grid4',
		                border: false,
		                selType:'checkboxmodel',
		                selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),//设置可以多选
		                columns: [
		                	{header: '电厂名称',flex:-1,align:'center',dataIndex:'name'},
		                	{header:'电厂ID',hidden:true,dataIndex:'id'}
		                ],
		                store: Ext.create('Ext.data.Store', {
		                	model:'Org4',
		                	proxy: {
		                 		type: 'ajax',
		                 		url: 'PointAction/getSunFactory.do',
		                 		reader: {
		                 			type: 'json',
		                 	 		root:'dataList'
		                 	  	}
		                 	},
		                	autoLoad: true        	
		             	}) 
		          	}
		     	}]
			});
			function getOrgs(){
				orgs.splice(0,orgs.length);
				orgsID.splice(0,orgsID.length);
				var arr1 = Ext.getCmp('grid1').getSelectionModel().getSelection();
				for(var i=0;i<arr1.length;i++){
					orgs[i]=arr1[i].data.name;
					orgsID[i]=arr1[i].data.id;
				}
				var arr2 = Ext.getCmp('grid2').getSelectionModel().getSelection();
				for(var i=arr1.length;i<arr1.length + arr2.length;i++){
					var j = i - arr1.length;
					orgs[i]=arr2[j].data.name;
					orgsID[i]=arr2[j].data.id;
				}
				var arr3 = Ext.getCmp('grid3').getSelectionModel().getSelection();
				for(var i=arr1.length + arr2.length;i<arr1.length + arr2.length + arr3.length;i++){
					var j = i - arr1.length - arr2.length;
					orgs[i]=arr3[j].data.name;
					orgsID[i]=arr3[j].data.id;
				}
				var arr4 = Ext.getCmp('grid4').getSelectionModel().getSelection();
				for(var i=arr1.length + arr2.length + arr3.length;i<arr1.length + arr2.length + arr3.length + arr4.length;i++){
					var j = i - arr1.length - arr2.length - arr3.length;
					orgs[i]=arr4[j].data.name;
					orgsID[i]=arr4[j].data.id;
				}
			}
		 	var orgWin =	Ext.create('Ext.window.Window', {
				title: '电厂',
			    height: 350,
			    width: 280,
			    x: 300,
				y: 80,
			    border:false,
			    layout: 'fit',
			    //renderTo: "all",
			    modal:true,
			    buttonAlign:"center",
			    closeAction:'hide',
			    //window中的按钮,添加事件
			    buttons:[{
			  		text:"确定",       	
			    	listeners:{
			    		"click":function(){
			    			getOrgs();
			    			if(orgsID.length==0){
			    				Ext.Msg.alert('提示','请选择电厂');
			    				return;
			    			}
			    			orgsJson = '';
			    			for(var i=0;i<orgsID.length;i++){
			    				orgsJson = orgsJson + orgsID[i] + ',';
			    			}
			    			orgsJson = orgsJson.substr(0,orgsJson.length-1);
			    			orgWin.hide();
			    			Ext.getCmp('grid5').getSelectionModel().deselectAll();
					    	grid5.getStore().load({
					    		params:{'orgs':orgsJson},
					    		callback:function(data){
					    		}
					    	});
					    	quotaWin.show();
			    		 }
			    	 }
			     }],
			    //window中嵌入多个电厂grid
			    items:[tabs]
			});
		 	orgWin.show();
		});
		
		<!-- ECharts图标主要界面 -->
		// 路径配置
		var myChart='';
		var option='';
		require.config({
	    	paths: {
	        	echarts: 'echars/www/js'
	    	}
		});
		// 使用
		require(
	    	[
	        	'echarts',
	        	'echarts/chart/bar',
	        	'echarts/chart/line'// 使用柱状图就加载bar模块，按需加载
	    	],
	    	function (ec) {
		        // 基于准备好的dom，初始化echarts图表
		        myChart = ec.init(document.getElementById('main'));  
		        option = {
		            /*title : {
		        	        text: '指标综合查询'
		        	    },*/	
		            tooltip: {
		                show: true
		                //trigger: 'axis'
		            },
		            legend: {
		 				y :'28px',
		                data:function(){
		                	return orgs;
		                }()
		            },
		            toolbox: {
		                show : true,
		                feature : {
		                    //mark : {show: true},
		                    //dataView : {show: true, readOnly: false},
		                    magicType : {show: true, type: ['bar','line','stack', 'tiled']},
		                    restore : {show: true},
		                    saveAsImage : {show: true}
		                }
		            },
		           	// calculable : true,
		            xAxis : [
		                {
		                    type : 'category',
		                    data : function(){
		                    	return indexs;
		                    }()
		                }
		            ],
		            yAxis : [
		                {
		                    type :  'value',
		                    axisLabel : {
		                        formatter: '{value} '
		                    },
		                }
		            ],
		            series : function(){
		            	return series;
		            }()
		        };
		        // 为echarts对象加载数据 
		        myChart.setOption(option); 
	    	}
		);
		
	</script>
</body>
</html>