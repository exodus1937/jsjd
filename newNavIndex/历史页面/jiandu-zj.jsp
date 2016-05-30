<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>京能集团实时技术监督生产管理系统</title>
    <c:set var="ctx" value="${pageContext.request.contextPath}"
		scope="request" />
	<link rel="stylesheet" href="${ctx}/newNavIndex/css/style12-21.css" />
	<script type="text/javascript">
		var ctx = "${ctx}";
	</script>
    <link type="text/css" rel="stylesheet" href="css/news.css"/>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/SimpleTree.js"></script>
    <script type="text/javascript" src="js/adddate.js"></script>
    <script type="text/javascript">
        $(function () {
            $(".st_tree").SimpleTree({});
        });
    </script>
</head>
<body id="zongjie">

<div class="wu_top0"></div>
<div class="wu_top1">
    <form method="post" action="?">
        
       <!--  <input name="" type="text" class="wu_top1a" placeholder="请输入日期" onclick="SelectDate(this,'yyyy-MM-dd')"/>
        <input name="" type="button" class="wu_top1b" value="查 询"/>
        <input name="" type="button" class="wu_top1b" value="导 出"/> -->
        <input name="" type="button" class="wu_top1b" value="下 载"/>
        <input type="button" onclick="back()" class="wu_top1b" style="width:100px;line-height: 28px;background: green;float: right" value="返回到首页">
    </form>
</div>
<div class="wu_left">
    <div class="st_tree" id="st_tree">

        <ul show="false">
            <!--京能集团-->
            <li class="open"><a href="#">京能集团</a></li>

            <ul show="flase">

                <li>集团年度计划</li>
                <li>集团年度总结</li>

            </ul>
            <li class="folder"><a href="#">岱海发电</a></li>
            <!--<ul show="false">-->
            <!--<li><a href="#">监督执行</a></li>-->
            <ul show="flase">
                <!--监督计划-->
                <li class="folder">监督计划</li>
                <ul show="flase">

                    <li>电厂年度计划</li>
                    <li>电厂季度计划</li>
                    <li>电厂月度计划</li>
                    <li>月度计划考核汇总</li>
                    <li>计划模板</li>

                </ul>
                <!--监督总结-->
                <li class="open">监督总结</li>
                <ul show="false">

                    <li>电厂年度总结</li>
                    <li>电厂季度总结</li>
                    <li>电厂月度总结</li>
                    <li>月度总结考核汇总</li>
                    <li>总结模板</li>

                </ul>

            </ul>
            <!--	</ul>-->
            <li class="folder"><a href="#">宁东发电</a></li>
            <ul show="flase">

                <!--监督计划-->
                <li class="folder">监督计划</li>
                <ul show="flase">

                    <li>电厂年度计划</li>
                    <li>电厂季度计划</li>
                    <li>电厂月度计划</li>
                    <li>月度计划考核汇总</li>
                    <li>计划模板</li>

                </ul>
                <!--监督总结-->
                <li class="open">监督总结</li>
                <ul show="false">

                    <li>电厂年度总结</li>
                    <li>电厂季度总结</li>
                    <li>电厂月度总结</li>
                    <li>月度总结考核汇总</li>
                    <li>总结模板</li>

                </ul>

            </ul>

        </ul>
    </div>
    <div class="fengge"></div>
</div>
<script type="text/javascript">
    var st_height = document.documentElement.clientHeight - 60 + "px";
    document.getElementById("st_tree").style.height = st_height;
</script>

<div class="wu_main_1">
    <div class="wu_main1">
        <!-- <img src="img/jiandu.png" width="100"/>-->
	<table>
            <thead>
                <tr>
                    <td>计划编号</td>
                    <td>计划名称</td>
                    <td>创建人</td>
                    <td>创建时间</td>
                    <td>流程状态</td>
                </tr>
            </thead>
            <tbody id="zhongjie_table">



            </tbody>
        </table>
        <div class="fengge"></div>
    </div>
    <div class="fengge"></div>
</div>
<script type="text/javascript" src="js/sub.js">
</script>
</body>
</html>
