/**
 * Created by lei on 2016/4/22 0022.
 */
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
var ctx = window.location.origin;
id="11"

htmlArray.push("<td>#"+d.G_ID+"</td><td>"+d.NAME+"</td><td>"+d.STARTTIME+"</td><td>"+d.ENDTIME+"</td><td>"+d.PARATIME+"</td><td class='button'>填写</td><td>查看</td><td onclick='daocu("+d.ID,type+")'>导出</td>")

var url2 = 'http://172.168.100.110:7001/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"jizuqiting_id","value":"'+id+'"}]&resid=I4028e4f337ef9efa0154bc69402a2a3f&user=admin&password=manager&refresh=true'