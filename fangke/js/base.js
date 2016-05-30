
if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//"
                + window.location.hostname
                + (window.location.port ? ':' + window.location.port : '');
}

var ctx = window.location.origin;


$.ajax({
    url:ctx+"/jsjd/newPage.do?method=charts",
   
    success:function(data){
        var json =eval("("+data+")");
        var cat = json.categories;
        var dat = json.data;    
        var dat2= json.date2;       
        chart(cat,dat,dat2);

    }

})
var flag1 = true;
function wload(page){
    
    $.ajax({
        url:ctx+"/jsjd/newPage.do?method=userLogResult",
        type:"POST",
        data:{
            pageno:page,
            count:5
        },
        success:function(data){
            var json =eval("("+data+")");
            //console.log(data);
            var page = Math.ceil(json.total/5)
                       
            if(flag1){
                initPagination(page);//分页加载
            }
            flag1=false;
            $("#detail").html(prepare(json.data));
        }
    })
    
}
wload();
var initPagination = function(page) {
            var num_entries = page;
            // 创建分页
            $("#Pagination").pagination(num_entries, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                callback: pageselectCallback,
                items_per_page: 1, //每页显示1项
                prev_text: "前一页",
                next_text: "后一页"
            });
        };

    function pageselectCallback(page_index, jq){
        //console.log(page_index);
        
        wload(page_index + 1);
        return false;
    }

function userinfo(emp_name,userName,org_name){
    $.ajax({
        url:ctx+"/jsjd/newPage.do?method=userinfo",
        type:"POST",
        data:{emp_name:emp_name,userName:userName},
        success:function(data){
    		//alert(data.msg);
           // console.log(emp_name);
           if(data.msg == 0){
               data.lasttime = "";
            }
            $("#myModalLabel").html(org_name+"   "+ emp_name+ "<small>"+data.lasttime+"</small>")
             $("#detail_2").html(prepare1(data));
           
        }
    })

}

function prepare1(data){
    var htmlArray = [];

    htmlArray.push("<tr>")
    //$("#lastTime").html(" 最近登陆时间"+data.lasttime+"");
    //noinspection JSUnresolvedVariable
    if (data.msg == 0) {
        htmlArray.push("<td>暂无数据</td><td>暂无数据</td><td>暂无数据</td><td>暂无数据</td><td>暂无数据</td>");
    } else {
        htmlArray.push("<td>" + data.allCount + "</td><td>" + data.thisYearCount + "</td><td>" + data.thisMonthCount + "</td><td>" + durTime(data.thisYearTimes) + "</td><td>" + durTime(data.thisMonthTimes) + "</td>")
       
    }
    htmlArray.push("</tr>")
    return htmlArray.join("");

} 





function chart(cat,dat,dat2){
        $('#nd').highcharts({
            chart: {
                type: 'column'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: '本年登录人次'
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
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
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
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
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
                data: dat2
            }]
        });
    }

function prepare(datax){
    var htmlArray = [];
    //htmlArray.push("<tr>");
    for(var i = 0;i<datax.length;i++){
        var d = datax[i];
        var j = i+1;
        var hh = "userinfo('"+d.emp_name+"','"+d.useName+"','"+d.org_name+"')"
        htmlArray.push("<tr><td>"+j+"</td><td >"+d.org_name+"</td><td onclick="+hh+" data-toggle='modal' data-target='#myModal' style='cursor:pointer;text-decoration:underline;color:blue'>"+d.emp_name+"</td><td>"+d.startTime+"</td><td>"+d.endTime+"</td><td>"+change_status(d.status)+"</td><td>"+durTime(d.times)+"</td></tr>")
    }
    //htmlArray.push("</tr>");
    return htmlArray.join("");
}


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
// function durTime(date1,date2) {
//      date1 =new Date(date1);
//      date2 =new Date(date2);
//     var date3 = date2.getTime() - date1.getTime();  //时间差的毫秒数
// //计算出相差天数
//     var days = Math.floor(date3 / (24 * 3600 * 1000));

// //计算出小时数
//     var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
//     var hours = Math.floor(leave1 / (3600 * 1000));
//     if(days>0){
//         hours=days*24+hours;
//     }
// //计算相差分钟数
//     var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
//     var minutes = Math.floor(leave2 / (60 * 1000));
// //计算相差秒数
//     /*var leave3 = leave2 % (60 * 1000);//计算分钟数后剩余的毫秒数
//     var seconds = Math.round(leave3 / 1000);*/

//     console.log(hours);
//     return Number(hours) + "小时 " + minutes + " 分钟";


// }
$("#submit").click(function(){
    var org_id = $("#org_id").val();
    var name = $("#nameValue").val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var status = $("#status").val();
    
    var flag = true;
    expr(1);
    function expr(page){
         $.ajax({
            url:"../../newPage.do?method=userLogResult",
            type:"POST",
            data:{
                org_id:org_id,
                nameValue:name,
                startTime:startTime,
                endTime:endTime,
                status:status,
                pageno:page,
                count:5
            },
            success:function(data){

                var json =eval("("+data+")");
                var pages = Math.ceil(json.total/5)
                //console.log(page);
                if(flag){
                    initPagination(pages);//分页加载
                }
                flag=false;


                if(json.data.length){

                    $("#detail").html(prepare(json.data)); 
                }else{
                    $("#detail").html("没有数据"); 
                }
               //console.log(data);
            }
        })
    }
    
    var initPagination = function(page) {
        var num_entries = page;
        // 创建分页
        $("#Pagination").pagination(num_entries, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageselectCallback,
            items_per_page: 1, //每页显示1项
            prev_text: "前一页",
            next_text: "后一页"
        });
    };

    function pageselectCallback(page_index, jq){
        if(page_index==0){
            return;
        }
        
        expr(page_index + 1);
        return false;
    }
       

});

