<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="js/html5shiv.min.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-size: 14px;
        }

        li {
            list-style: none;
        }

        #struct {
            width: 1500px;
            text-align: center;
            margin: 0 auto;
           
            position: relative;
        }
        #struct_1 {
            /*width: 85.7%;*/
            text-align: center;
            
            float: left;
            position: relative;
        }
        #struct_2 {
            /*width: 14.3%;*/
            text-align: center;
            
            float: left;
            position: relative;
        }

        .struct_row {
            position: relative;
        }

        .struct_line_1,
        .struct_line_2 {
            border-bottom: 2px solid #000;
        }

        .struct_line_2 {
            border-top: 2px solid #000;
        }

        .struct_cell {
            /*width: 7.14%;*/
            float: left;
            padding: 0 2px;
        }

        .struct_cell_text {
            padding: 5px;
            border: 2px solid #000;
            background: #E9E9E9;
            text-align: center;
        }

        .struct_cell_text_1,
        .struct_cell_text_1_1 {
            width: 200px;
            margin: 0 auto;;
        }

        .clear {
            clear: both;
        }


        .struct_line_0_1 {
            border-bottom: 2px solid #000;
            width: 50%;
            /*margin-left: 642px;*/
        }

        .struct_row_1_1_center {
            position: absolute;
            width: 50%;
            /*left: 642px;*/
            /*top: 180px;*/
            text-align: left;
        }

        .struct_line_0_2 {
            width: 100%;
            position: absolute;
            margin-top: 1em;
            z-index: -1;
        }

        .struct_cell_text_1_2 {
            margin-top: -2em;
            width: 200px;
            margin-left: auto;
            margin-right: auto;
        }
        /*新加的对悬浮窗样式*/
        .data {
			cursor: pointer;
		    position: relative;
		}
		
		.showw {
		    position: absolute;
		    top:40px;
		    left:50px;
			width: 400px;
			height: 300px;
			margin: 0 auto;
			overflow: auto;
			overflow-x: hidden;
			border-radius: 5px;
			background: #000000;
			filter: alpha(opacity=80);
			-moz-opacity: 0.8;
			-khtml-opacity: 0.8;
			opacity: 0.8;
			color: #ffffff;
			z-index: 9999;
			display: none;
			font-size:12pt;
		}
        
        /*新加的对btn样式*/
        .m-btn-primary {
            color: #fff;
            background-color: #337ab7;
            border-color: #2e6da4;
            position: relative;
            top:20px;
            left:20px;
        }
        .m-btn {
            font-family: 'Helvetica Neue', Helvetica, 'Microsoft Yahei', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', sans-serif;
            display: inline-block;
            padding: 6px 12px;
            font-size: 14px;
            font-stretch: normal;
            font-style: normal;
            font-variant: normal;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: 4px;
        }
        .m-btn-primary:hover {
            color: #fff;
            background-color: #286090;
            border-color: #204d74;
        }
    </style>
</head>
<body>
<script type="text/javascript">
	function getJTGraph(){
		$.post("<%=request.getContextPath()%>/graph.do?method=getJTGraph",{}, function(data) {
			window.location.href="/jsjd"+data+".jsp";
		});
	}
</script>
<input type="submit" class="m-btn m-btn-primary" value="查看集团" onclick="getJTGraph();" />
<div id="struct">
    <div class="struct_row struct_row_1">
        <div class="struct_cell_text struct_cell_text_1"><!--数据-->       	
        </div>
        <div class="struct_line">|</div>
        <div class="struct_line_0_1">
        </div>
    </div>
    <div class="struct_row struct_row_1_1_center">
        <div style="position: relative">
            <div class="struct_line_0_2">
                <img src="graph/show/line.jpg" style="width: 100%; height: 2px;" />
            </div>
            <div class="struct_cell_text struct_cell_text_1_2"><!--数据--></div>
        </div>
    </div>
    <div id="struct_1" class="struct_row">
        <div class="struct_row struct_row_1">
            <div class="struct_line">|</div>
            <div class="struct_cell_text struct_cell_text_1_1"><!--数据-->
            	
            </div>
            <div class="struct_line">|</div>
            <div class="struct_row struct_row_1_1">
            </div>
        </div>
        <div class="struct_line struct_line_1">|</div>
        <div class="struct_row struct_row_2">
        </div>
        <div class="struct_row struct_row_3">
        </div>
    </div>
    <div id="struct_2" class="struct_row">
        <div class="struct_row struct_row_1">
            <div class="struct_line">|</div>
            <div class="struct_cell_text struct_cell_text_1_1"><!--数据--></div>
            <div class="struct_line">|</div>
        </div>
        <div class="struct_line struct_line_1">|</div>
        <div class="struct_row struct_row_2">
        </div>
        <div class="struct_row struct_row_3">
        </div>
    </div>
    <div class="clear"></div>
</div>

<link rel="stylesheet" href="<%=request.getContextPath()%>/graph/css/button.css"  />
<link rel="stylesheet" href="<%=request.getContextPath()%>/graph/css/jquery.tooltip.css"  />
<link rel="stylesheet" href="<%=request.getContextPath()%>/graph/css/tip-yellow/tip-yellow.css" type="text/css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/graph/css/tip-yellowsimple/tip-yellowsimple.css" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/js/respond.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/js/html5shiv.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/js/respond.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/js/jquery.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/js/jquery.poshytip.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/show/dh.js"></script>
<script type="text/javascript"> $(window).load(function() { common.prototype.page.dh.load(); }); </script>
<script>
$("div").ajaxStop(function(){
	$(".data").hover(function(ev){
	      var oEvent = ev||event;
	      var $this = $(this).find(".showw");
	      if(oEvent.pageX>900){
	          $this.fadeIn().css({left:-300});
	      }else{
	          $this.fadeIn()
	      }

	  },function(){$(this).find(".showw").fadeOut();});
	
	for(var i = 0;i< $('.showw').find("td").size();i++){
        if(i%3==0){
            console.log(i);
            $('.showw').find("td").eq(i).css({width:50});
        }
        if(i%3==1){
            $('.showw').find("td").eq(i).css({width:110});
        }
    }

});
</script>
<script type="text/javascript">
$(document).ready(function(){

});

</script>
</body>
</html>