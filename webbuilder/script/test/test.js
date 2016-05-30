function onMouseOver(userName)
{
    var tem = Wb.get('userDisplayPanel');
    var userarr = userName.split("#");
    var htmltemp = userarr[0];
    tem.body.update(htmltemp);
    tem.setPosition(event.clientX, event.clientY);
    tem.setVisible(true);
}

function onMouseOut()
{
    var tem = Wb.get('userDisplayPanel');
	var htmltemp = '姓名';
	tem.body.update(htmltemp);
    //tem.setSize(200, 200);
    //tem.setPosition(event.clientX, event.clientY);
    tem.setVisible(false);
}