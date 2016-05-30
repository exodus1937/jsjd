
common.prototype.page.login.load = function(){

	var userId = $("#userId").val();
	var userName = $("#_userName").val();
	var path = $("#path").val();
	$.post("../newPage.do?method=initNewLogin",{ userId:userId,userName:userName,path:path}, function(data) {
		//alert(data);
		if (data == "SUCCESS") { //alert("success: "+data.pdfName);
			window.location.href = path+"/newNav/index.html";
		}
		if (data.FLAG == 'FAILD') { 
			alert("faild: "+data.MESSAGE); 
		}
	});
};