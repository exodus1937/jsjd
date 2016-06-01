/**
 * Created by lei on 2016/5/13 0013.
 */

/*var ctx = "http://172.168.100.110:7001/jsjd/newPage.do?method=allCompYearAnd";

 $.ajax({
 url:ctx,
 type:'get',
 success:function(data){
 console.log(data);



 }
 });*/
/* $.ajax({
 url:ctx +"/jsjd/newPage.do?method=allCompYearAnd",
 dataType:"JSON",
 success: function(data) {
 console.log(data);
 //alert(1);
 // var json =   {categories: ['京能集团','宁东发电','岱海发电','','','','','','',''], data: [49.9,71.5,106.4, 0, 0, 0, 0, 0, 0, 0],date2:[49.9,71.5,106.4, 0, 0, 0, 0, 0, 0, 0]};
 var cat = data.categories;
 var dat = data.data;
 alert(1);
 console.log(cat);
 console.log(dat);
 chart(cat,dat);
 }
 });*/


var json =   {categories: ['京能集团','宁东发电','岱海发电','','','','','','',''], data: [49.9,71.5,106.4, 0, 0, 0, 0, 0, 0, 0],date2:[49.9,71.5,106.4, 0, 0, 0, 0, 0, 0, 0]};
var cat = json.categories;
var dat = json.data;

chart(cat,dat);
function chart(cat,dat){
    $('#nd').highcharts({
        chart: {
            type: 'column'
        },
        legend: {
            enabled: true
        },
        credits: {
            enabled: false
        },
        title: {
            text: '本年登录人数'
        },
        /* subtitle: {
         text: 'Source: WorldClimate.com'
         },*/
        xAxis: {
            categories: cat
        },
        yAxis: {
            min: 0,
            title: {
                text: '人/次'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {

                dataLabels:{
                    enabled:true, // dataLabels设为true
                    style:{
                        color:'#606060',
                        "textShadow": ""
                    }
                },
                shadow:false,
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '人次',
            data: dat
        }]

    });
    $('#yd').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '本月登录人次'
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },

        xAxis: {
            categories:cat
        },
        yAxis: {
            min: 0,
            title: {
                text: '人/次'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '人次',
            data: dat
        }]
    });
}
/*
var datax = [
    {org_name: "岱海发电", emp_name: "陈浩", startTime: "2016-05-12 14:51:52", endTime: "2016-05-12 16:49:52",status:0,times:"70",useName:"hhh"},
    {org_name: "岱海发电", emp_name: "陈浩", startTime: "2016-05-12 14:51:52", endTime: "2016-05-12 16:51:52",status:0,times:"70",useName:"hhh"},
    {org_name: "岱海发电", emp_name: "陈浩", startTime: "2016-05-12 14:51:52", endTime: "2016-05-12 16:51:52",status:0,times:"70",useName:"hhh"},
    {org_name: "岱海发电", emp_name: "陈浩", startTime: "2016-05-12 14:51:52", endTime: "2016-05-12 16:51:52",status:0,times:"70",useName:"hhh"}
];
*/


var datax=[{org_name:'岱海发电',emp_name:'李金换',startTime:'2016-05-13 16:30:38.0',endTime:'2016-05-13 16:36:39.0',status:0,useName:'LIJH',times:'6'},
    {org_name:'岱海发电',emp_name:'李金换',startTime:'2016-05-13 16:23:15.0',endTime:'2016-05-13 16:26:39.0',status:0,useName:'LIJH',times:'3'},
    {org_name:'岱海发电',emp_name:'李金换',startTime:'2016-05-13 16:18:53.0',endTime:'2016-05-13 16:23:15.0',status:0,useName:'LIJH',times:'4'},
    {org_name:'岱海发电',emp_name:'李金换',startTime:'2016-05-13 15:11:56.0',endTime:'2016-05-13 15:15:38.0',status:0,useName:'LIJH',times:'4'},
    {org_name:'岱海发电',emp_name:'李金换',startTime:'2016-05-13 15:07:08.0',endTime:'2016-05-13 15:10:38.0',status:0,useName:'LIJH',times:'4'}];

function prepare(datax){
    var htmlArray = [];
    //htmlArray.push("<tr>");
    for(var i = 0;i<datax.length;i++){
        var d = datax[i];
        var j = i+1;
        htmlArray.push("<tr><td>"+j+"</td><td  >"+d.org_name+"</td><td data-toggle='modal' data-target='#myModal'>"+d.emp_name+"</td><td>"+d.startTime+"</td><td>"+d.endTime+"</td><td>"+change_status(d.status)+"</td><td>"+durTime(d.times)+"</td></tr>")
    }
    //htmlArray.push("</tr>");
    return htmlArray.join("");
}

$("#detail").html(prepare(datax));
String.prototype.stringToDate = function(){

    return new Date(Date.parse(this.replace(/-/g, "/")));

};
//console.log("2014-12-3 21:10:10".stringToDate());
function change_status(status){
    if(status == 1){
        return "在线";
    }else{
        return "离线";
    }
}
function durTime(date) {
    var minutes = date%60;
    var hours = parseInt(date/60);
    return Number(hours) + "小时 " + minutes + " 分钟";
}

Date.prototype.format = function(format) {
    /*
     * format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

$("#submit").click(function(){
    var org_id = $("#org_id").val();
    var name = $("#nameValue").val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var status = $("#status").val();

    $.ajax({
        url:ctx+"/jsjd/newPage.do?method=userLogResult",
        type:"POST",
        data:{
            org_id:org_id,
            nameValue:name,
            startTime:startTime,
            endTime:endTime,
            status:status,
            pageno:0,
            count:5
        },
        success:function(data){
            var json =eval("("+data+")");
            $("#detail").html(prepare(json));
        }
    })
});




