<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="<%= request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
<title>Insert title here</title>
</head>
<body>
	<form action="<%=request.getContextPath()%>/getMainAction.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="getQtData"/>
		<input type="text" name="org_id" value="c21834b4-1cb0-490f-a2a8-deeaf7f7e065"/>
		<input type="text" name="g_id" value="b82966f9-71a2-447a-b416-2028b7339517"/>
		<input type="text" name="test_type" value="QJZX	"/>
		<input type="text" name="starttTime" value="2016-4-5 10:00"/>
		<input type="submit" value="测试">
	</form>
	<form action="<%=request.getContextPath()%>/getMainAction.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="changeState"/>
		<input type="text" name="user_id" value="01"/>
		<input type="text" name="ntc_name" value="岱海发电有序推进全方位对标工作"/>
		<input type="submit" value="测试">
	</form>
	<form action="<%=request.getContextPath()%>/mainDate.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="getOrgDynamic"/>
		<input type="text" name="user_id" value="97f1edf0-f37e-4995-b757-093cb840db99"/>
		<input type="submit" value="通知">
	</form>
	<form action="<%=request.getContextPath()%>/XipTecProject.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="getLineData"/>
		<input type="text" name="user_id" value="4c425127-fadb-43bd-ba46-4aa601a6b2d7"/>
		<input type="submit" value="技改">
	</form>
	<form action="<%=request.getContextPath()%>/XipHistoryAction.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="getTecPro"/>
		<input type="text" name="pi_code" value="NMDH:10CFA01MCS20XQ01"/>
		<input type="text" name="startTime" value="2016-03-14 10:00:00"/>
		<input type="text" name="endTime" value="2016-03-14 11:00:00"/>
		<input type="submit" value="各种实验">
	</form>
	<form action="<%=request.getContextPath()%>/XipHistoryAction.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="getSblhX"/>
		<input type="text" name="StartTime" value="2016-03-14 10:00:00"/>
		<input type="text" name="StopTime" value="2016-03-14 11:00:00"/>
		<input type="submit" value="shijianx">
	</form>
	<form action="<%=request.getContextPath()%>/XipExperimentAction.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="getExportAtuoValue"/>
		<input type="text" name="general_id" value="34d2b8bb-3f8c-432c-922c-332329229f6d"/>
		<input type="text" name="org_id" value="472212af-1977-462b-a74a-a1f36ed6562d"/>
		<input type="text" name="g_id" value="02"/>
		<input type="text" name="time" value="2016-04-06 11:00:00"/>
		<input type="submit" value="单机组">
	</form>
	<form action="<%=request.getContextPath()%>/XipExperimentAction.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="getAutoValueAlljz"/>
		<input type="text" name="general_id" value="926a1979-ba73-4d41-a158-698feae7b704"/>
		<input type="text" name="org_id" value="472212af-1977-462b-a74a-a1f36ed6562d"/>
		<input type="submit" value="全机组">
	</form>
	<form action="<%=request.getContextPath()%>/XipExperimentAction.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="getDaygetDayMonth"/>
		<input type="text" name="date" value="2016-5-1"/>
		<input type="text" name="type" value="mix_JNYBKL"/>
		<input type="text" name="org_id" value="472212af-1977-462b-a74a-a1f36ed6562d"/>
		<input type="submit" value="日月周宝">
	</form>
	<form action="<%=request.getContextPath()%>/XipSssjAction.do" method="post" accept-charset="utf-8">
		<input type="text" name="method" value="indexData"/>
		<input type="text" name="pi_code" value=""/>
		<input type="submit" value="看看这个测点当前时间有没有值">
	</form>
	<script type="text/javascript">
	</script>
</body>
</html>