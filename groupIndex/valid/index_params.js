
function getContextPath() {
     var pathName = document.location.pathname;
     var index = pathName.substr(1).indexOf("/");
     var result = pathName.substr(0,index+1);
     return result;
 }
var _contextPath = getContextPath();

function open_wjdh(){
	
	//获取参数
	$.ajax({
			  url:_contextPath+"/loginParamUtil.do?method=getIndexParams",
			  type:"POST",
			  async: false,//同步操作
			  data:{path:_contextPath},
			  contentType:"application/x-www-form-urlencoded; charset=utf-8",
			  dataType:"json",
			  success: function(data){
				 var url = data.url;
				 window.open(url ,"wjdh") ; //myWindow即为窗口的名称
			  },
			  error: function (data) {
	           alert(data.msg);
	        }
	})
}

//退出操作

function logout(){
	  var statu = confirm("您确定要退出吗?");
      if(!statu){
          return false;
      }
     $.ajax({
    	  type:'POST',
          url:_contextPath+"/frameAction.do?method=logout",
          dataType: "json",
          success:function(data){
               if(data.flag=='1'){            
            	   window.location.href = window.location.protocol+"//"+window.location.host+_contextPath;
                 /*  window.location.href = _contextPath+"/wjdh/login.html";*/
               }       
          },
          error:function(data){
        	  alert("当前用户session失效,请重新登录");
          }
      });
}


