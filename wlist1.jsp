<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="webbuilder/controls/ext/resources/css/ext-all.css"/> 
<script src="flash/js/jquery.js"></script>
<script type="text/javascript" src="webbuilder/controls/ext/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="webbuilder/controls/ext/ext-all.js"></script> 
<script src="echars/asset/js/esl/esl.js"></script>
<script src="echars/dist/echarts.js"></script>
<script type="text/javascript" src="My97DatePicker/calendar.js"></script>
<script type="text/javascript" src="My97DatePicker/WdatePicker.js"></script>

<title id='t'></title>
</head>
<body>
<div style="left: 20px; top:11px; position: absolute;">

<span>时间：</span>
<input type="text"  class="Wdate" id="startTime" " onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
<span>—</span>
<input type="text"  class="Wdate" id="endTime" " onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
</div>
<div id ="all" style="left: 100px; top: 20px; width: 80%; height: 80%; overflow: hidden; position: absolute;">
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="main" style="height:360px;  " ></div>
</div>
<div id='div2' style="left: 250px; top:320px; width: 60%; height: 60%; overflow: hidden; position: absolute;">
		<div id="divGrid" style="height:310px;top:0px"></div>
	</div>



<script type="text/javascript">
/**
 * Ext部分
 */
 var myChart;
  var click;
 var mindate;
 var maxdate;
 var cedian;
 var cedianid;
 var date;
 var value;
 var org_name;
 var org_id;
 var type=0;
 <%
			HashMap map = (HashMap)session.getAttribute("XzSessionVars");
			String user_id = (String)map.get("userId");
		%>
	
function ready(){
 $.ajax({
										url : "wlistAction/findOrg.do",
										type : "post",
										//async : false, //同步执行
										dateType : "json",
										data:{
										'user_id':'<%=user_id%>'
										
										},success: function(data) {
										//alert(data[0].org_id);
										//alert(data[0].org_name);
										org_name=data[0].org_name;
										//org_id="472212af-1977-462b-a74a-a1f36ed6562d";
										org_id=data[0].org_id;
										$('#t').text(org_name+"预警信息");
										
										}});
}
ready();
 function re(num){
 if(num=="moren"){
 click=[];
 click.push(Ext.getCmp('grid1').getStore().getAt(0));
 }else if(num=="xuanze"){
 click=Ext.getCmp('grid1').getSelectionModel().getSelection();
 }
  mindate=$('#startTime').val();
  maxdate=$('#endTime').val();

  cedian=[];
 cedianid='';
 date=[];
 value=[];
 type=true;
 for(i=0;i<click.length;i++){
 cedian.push(click[i].data.p_i_name);
 
 }

 if(click.length>0){
 cedianid=click[0].data.p_i_id;
 if(click.length>1){
 for(i=1;i<click.length;i++){
 var c=','+click[i].data.p_i_id
 cedianid+=c;
 
 }
 }
 }

 $.ajax({
										url : "wlistAction/findByp.do",
										type : "post",
										async : false, //同步执行
										dateType : "json",
										data:{
										'min_date':mindate,
										'max_date':maxdate,
										'cedianid':cedianid,
										'org_id':org_id
										},success: function(data) {
										if(data.length<1){
										type=false;
										return;
										}
										if(data.length<=10){
										
										for(i=0;i<data.length;i++){
										date.splice(0,0,data[i].w_date);
										}
										for(i=0;i<cedian.length;i++){
										
										var array=[];
										for(j=0;j<data.length;j++){
										
										if(cedian[i]==data[j].p_i_name){
										if(data[j].w_value===null||data[j].w_value===''){
										
										array.push(0);
										}else{
										
										array.push(data[j].w_value);
										}
										}
										
										}
										
										var json={
                                                   "name":cedian[i],
                                                   "type":"line",
                                                   "data":array
                                                           }
                                        value.push(json);                   
										}
										}else{
										for(i=0;i<10;i++){
										date.splice(0,0,data[i].w_date);
										
										}
										for(i=0;i<cedian.length;i++){
										var array=[];
										for(j=0;j<10;j++){
										if(cedian[i]==data[j].p_i_name){
										if(data[j].w_value===null||data[j].w_value===''){
										array.push(0);
										}else{
										array.push(data[j].w_value);
										}
										
										}
										               
										}
										
										var json={
                                                   "name":cedian[i],
                                                   "type":"line",
                                                   "data":array
                                                           }
                                        value.push(json);    
										}
										}
										
										}});
	if(type){									
var option = {
                    /*title : {
                	        text: '指标综合查询'
                	    },*/	
                    tooltip: {
                        show: true
                        //trigger: 'axis'
                    },
                    legend: {
					    y :'28px',
                        data:cedian
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            //mark : {show: true},
                            //dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line','bar','stack', 'tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                   // calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data :date 
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
                    series :value
                };
        
                // 为echarts对象加载数据 
                myChart.setOption(option,true);
                //加载表格  
                Ext.getCmp('grid').getStore().load({params:{'min_date':mindate,
										'max_date':maxdate,
										'cedianid':cedianid,
										'org_id':org_id}});
			}else{
			Ext.Msg.alert('提示','没有数据！');
			}
 }
Ext.onReady(function (){ 
	
	Ext.create('Ext.Button', {
	    renderTo: document.body,
	    text    : '选择测点',
	    width:80,
	    x:365,
	    y:10,
	    handler: function() {
	    
	    	pointWin.show();
	    }
	});
	Ext.create('Ext.Button', {
	    renderTo: document.body,
	    text    : '查询',
	    //hidden:true,
	    width:80,
	    x:380,
	    y:10,
	    handler: function() {
	    	re("xuanze");
	    	
	    }
	});
	Ext.define("eee", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'w_date', type: 'string' },
        { name: 'w_level', type: 'string' },
        { name: 'w_value', type: 'string' },
        { name: 'p_i_name', type: 'string' },
        { name: 'org_name', type: 'string' }
    ]
});
var store = Ext.create("Ext.data.Store", {
    model: "eee",
    autoLoad: false,
    pageSize: -1,
    proxy: {
        type: "ajax",
        url: "wlistAction/findByp.do",
        
        reader: {
            //root: "rows"
           type: 'json'
        }
    }
});
var grid = Ext.create("Ext.grid.Panel", {
    xtype: "grid",
    id:'grid',
    renderTo: "divGrid",
   // title:"报警信息",
    store: store,
   // width: 870,
   // height: 300,
   // x:70,
  //  y:310,
   margin: 50,
    //pagingToolbar:false,
    columnLines: true,
  //  renderTo: Ext.getBody(),
    selModel: {
        injectCheckbox: 0,
        mode: "SIMPLE",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
    //selType: "checkboxmodel",
    columns: [
    //{ header: '序号', width:35,type:'rowNumber'},
    new Ext.grid.RowNumberer({header:'序号',width:35}), 
    { header: '测点名称', dataIndex: 'p_i_name' },
        {header: '时间',width:150, dataIndex: 'w_date'},
        { header: '报警级别', dataIndex: 'w_level' },
         { header: '报警值', dataIndex: 'w_value'  },
         { header: '所属组织',width:200, dataIndex: 'org_name'  }
    ],
     
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    listeners: {
        itemdblclick: function (me, record, item, index, e, eOpts) {
            //双击事件的操作
        }
    },
    //bbar: { xtype: "pagingtoolbar", store: store, displayInfo: true }
});
	 // 建立一个store要使用的 model
	 Ext.define('quota', {
	     extend: 'Ext.data.Model',
	     fields: [
            {name: 'p_i_name', type: 'string'},
            {name: 'p_i_id',  type: 'string'},
            {name: 'p_i_code',type: 'string'}
	     ]
	 });	
/*测点window*/
var pointWin =	Ext.create('Ext.window.Window', {
       title: '测点列表',
       height: 350,
       width: 200,
       layout: 'fit',
       renderTo: document.body,
       //modal:true,
       buttonAlign:"center",
       closeAction:'hide',
       //window中的按钮,添加事件
       buttons:[{
       	  text:"确定",       	
       	  listeners:{
       		"click":function(){
       		
       		
       			pointWin.hide();
       		  }
       	   }
         }],
       //window中嵌入一个指标列表
       items: { 
          xtype: 'grid',
          id:'grid1',
          border: false,
          selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),//设置可以多选
          selType:'checkboxmodel',
          columns: [{header: '测点名称',flex:-1,align:'left',dataIndex:'p_i_name'},
                    {header:'测点id',flex:-1,dataIndex:'p_i_id',hidden:true},
                    {header:'测点编码',flex:-1,dataIndex:'p_i_code',hidden:true}
             ],
          store: Ext.create('Ext.data.Store', {
          id:'store1',
        	    model:'quota',
        	    listeners:{'load':function(){
        	    
        	   if(Ext.getCmp('grid1').getStore().getCount()>0){
        	   // Ext.getCmp('grid1').getSelectionModel().select(0,true);
        	   re("moren");
        	    }
        	    
        	    }},
        	    proxy: {
        	         type: 'ajax',
        	       url: 'wlistAction/findp.do',
        	       params:{'org_id':org_id},
        	        reader: {
        	             type: 'json'
        	         }
        	     },
        	     autoLoad: true        	
          }) 
       }
    });
    
});

        // 路径配置
        require.config({
            paths: {
                echarts: 'echars/www/js'
                
            }
        });
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'// 使用柱状图就加载bar模块，按需加载
                
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                 myChart = ec.init(document.getElementById('main'));  
           
        
                // 为echarts对象加载数据 
            // myChart.setOption(option); 
            }
        );
     
    </script>
    
<!-- 表格部分 -->   



</body>
</html>