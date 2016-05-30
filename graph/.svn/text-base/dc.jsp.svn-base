<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
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
            border: 1px solid #f00;
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
            padding: 5px 0;
            border: 2px solid #000;
            background: #E9E9E9;
            text-align: center;
        }

        .struct_cell_text_1 {
            width: 300px;
            margin: 0 auto;;
        }

        .clear {
            clear: both;
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
    </style>
</head>
<body>
<div id="struct">
    <div class="struct_row struct_row_1">
        <div class="struct_cell_text struct_cell_text_1"><!--数据-->
        	
        </div>
    </div>
    <div class="struct_line struct_line_1">|</div>
    <div class="struct_row struct_row_2">
    </div>
    <div class="struct_line struct_line_2">|</div>
    <div class="struct_row struct_row_3">
    </div>
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
<script type="text/javascript" src="<%=request.getContextPath()%>/graph/show/dc.js"></script>
<script type="text/javascript"> $(window).load(function() { common.prototype.page.dc.load(); }); </script>
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
</body>
</html>