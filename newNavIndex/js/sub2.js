function test(pagenumber,pagesize){
    var $li =$("#zongjie").find('#st_tree').find('li');
    $li.each(function () {
        if($(this).context.className =="open"||$(this).context.className =="folder"){

          
        }else{
            $(this).on('click', function () {
              //  console.log(this.innerHTML);
            	var type  = this.innerHTML;
                if(type.indexOf('计划')){
                    type = 0;
                }else if(type.indexOf('总结')){
                    type = 1;
                }
                console.log(type);
                /*fenye*/
                /*var pagenumber= pagenumber;
                var pagesize = pagesize;
                console.log(localStorage.getItem("orgid"));
				console.log(localStorage.getItem("specid"));
                */            
                var url = ctx + "/portal/supervisionPlanOrSummaryPageData.do?orgid="+localStorage.getItem("orgid")+"&specid="+localStorage.getItem("specid")+"&pagenum=1&pagesize=10&ispage=true&type="+type+"";                            
           
              $.ajax({
                    url:url,
                    dataType:"json",
                    success: function (data) {
                    	$("#zhongjie_table").html('') ;
                    	if(data && data.pagedata.length>0){
                    		for(var i = 0;i<data.pagedata.length;i++){
                    			
                                var $td1=$("<td >"+data.pagedata[i].S_P_CODE+"</td>");
                                var $td2=$("<td >"+data.pagedata[i].S_P_NAME+"</td>");
                                var $td3=$("<td >"+data.pagedata[i].EMP_NAME+"</td>");
                                var $td4=$("<td >"+data.pagedata[i].CREATE_DATE+"</td>");
                               // var $td5=$("<td >"+data.pagedata[i].CREATE_DATE+"</td>");
                                var $tr1=$("<tr></tr>");
                                $tr1.append($td1);
                                $tr1.append($td2);
                                $tr1.append($td3);
                                $tr1.append($td4);
                             //   $tr1.append($td5);
                            }
                            var $table=$("#zhongjie_table");
                            $table.append($tr1);
                    	}
                    		
                      

                    }
                });
            })
        }
    });

   /* $li.css({color:'red'})*/
}

function jiandubaobiao(){
	var $li =$('#jiandubaobiao').find('#st_tree').find('li');
    $li.each(function () {
        if($(this).context.className =="open"||$(this).context.className =="folder"){       
        }else{
            $(this).on('click', function () { 
            var t = encodeURI(this.innerHTML);
            var url = ctx + "/portal/supervisionReportPageData.do?orgid="+localStorage.getItem("orgid")+"&specid="+localStorage.getItem("specid")+"&pagenum=1&pagesize=1&ispage=true";
            
            $.ajax({
                    url:url,
                    dataType:"json",
                    success: function (data) {
                    	$("#jiandubaobiao_table").html('') ;
                    	console.log(data);
                    	
                    	if(data && data.pagedata.length>0){
                    		for(var i = 0;i<data.pagedata.length;i++){
                                var $td1=$("<td >"+data.pagedata[i].GENERAL_CODE+"</td>");
                                var $td2=$("<td >"+data.pagedata[i].GENERAL_NAME+"</td>");
                                var $td3=$("<td >"+data.pagedata[i].EMP_NAME+"</td>");
                                var $td4=$("<td >"+data.pagedata[i].CREATE_DATE+"</td>");
                                var $tr1=$("<tr></tr>");
                                $tr1.append($td1);
                                $tr1.append($td2);
                                $tr1.append($td3);
                                $tr1.append($td4);
                            }
                            var $table=$("#jiandubaobiao_table");
                            $table.append($tr1);
                    	}
                    		
                      

                    }
                });
            })
        }
    });

	
}
function jianduzhixing(){
	
	var $li =$('#jianduzhixing').find('#st_tree').find('li');
    $li.each(function () {
    //	alert(1);
    	
        if($(this).context.className =="open"||$(this).context.className =="folder"){       
        }else{
            $(this).on('click', function () { 
            console.log(1);
            var typeName = this.innerHTML;
            //alert(typeName);
           // var url = "http://127.0.0.1:8080/jsjd/portal/supervisionReportPageData.do?orgid="+localStorage.getItem("orgid")+"&specid="+localStorage.getItem("specid")+"&pagenum=1&pagesize=1&ispage=true";
            var url = encodeURI(ctx + "/portal/supervisionImplementationTreeList.do?orgid="+localStorage.getItem("orgid")+"&specid="+localStorage.getItem("specid")+"&typeName="+typeName+"&createTime=&pagenum=1&pagesize=1");
            console.log(url);
           
            $.ajax({
                    url:url,
                    dataType:"json",
                    success: function (data) {
                    	$("#jianduzhixing_table").html('') ;
                    	console.log(data);
                    	
                    	if(data && data.pagedata.length>0){
//                    		var url = "http://127.0.0.1:8080/jsjd/portal/supervisionImplementationTreeList.do?orgid="+localStorage.getItem("orgid")
//                            +"&specid="+localStorage.getItem("specid")+"&pagenum=1&pagesize=10&type=1&datetime=2015-12-30&day=1";
//						    console.log(url);     
                    		for(var i = 0;i<data.pagedata.length;i++){
						                var $td1=$("<td >"+data.pagedata[i].MOM_TYPE+"</td>");
						                var $td2=$("<td >"+data.pagedata[i].EMP_NAME+"</td>");
						                var $td3=$("<td >"+data.pagedata[i].CREATE_DATE+"</td>");
						                var $td4=$("<td >"+data.pagedata[i].ORG_SHORT_NAME+"</td>");
						                var $td5=$("<td >"+data.pagedata[i].ATT_FILE_NAME+"</td>");
						                var $td6=$("<td >"+data.pagedata[i].SRC_ID+"</td>");
						                var $tr1=$("<tr></tr>");
						                $tr1.append($td1);
						                $tr1.append($td2);
						                $tr1.append($td3);
						                $tr1.append($td4);
						                $tr1.append($td5);
						                $tr1.append($td6);
						
						            }
                
                            var $table=$("#jianduzhixing_table");
                            $table.append($tr1);
                    	}
                    		
                      

                    }
                });
            })
        }
    });

	
}


test();
jiandubaobiao();
jianduzhixing();

/*�����˵�*/
(function ($) {
    var selects = $('select');//��ȡselect
    for (var i = 0; i < selects.length; i++) {
        createSelect(selects[i], i);
    }
    function createSelect(select_container, index) {
        //����select������classΪselect_box�����뵽select��ǩǰ
        var tag_select = $('<div></div>');//div�൱��select��ǩ
        tag_select.attr('class', 'select_box');
        tag_select.insertBefore(select_container);
        //��ʾ��classΪselect_showbox,���뵽������tag_select��
        var select_showbox = $('<div></div>');//��ʾ��
        select_showbox.css('cursor', 'pointer').attr('class', 'select_showbox').appendTo(tag_select);
        //����option������classΪselect_option�����뵽������tag_select��
        var ul_option = $('<ul></ul>');//����option�б�
        ul_option.attr('class', 'select_option');
        ul_option.appendTo(tag_select);
        createOptions(index, ul_option);//����option
        //�����ʾ��
        tag_select.toggle(function () {
            ul_option.show();
        }, function () {
            ul_option.hide();
        });
        var li_option = ul_option.find('li');
        li_option.on('click', function () {
            $(this).addClass('selected').siblings().removeClass('selected');
            var value = $(this).text();
            select_showbox.text(value);
            ul_option.hide();
        });
        li_option.hover(function () {
            $(this).addClass('hover').siblings().removeClass('hover');
        }, function () {
            li_option.removeClass('hover');
        });
    }

    function createOptions(index, ul_list) {
        //��ȡ��ѡ�е�Ԫ�ز�����ֵ��ֵ����ʾ����
        var options = selects.eq(index).find('option'),
            selected_option = options.filter(':selected'),
            selected_index = selected_option.index(),
            showbox = ul_list.prev();
        showbox.text(selected_option.text());
        //Ϊÿ��option������li����ֵ
        for (var n = 0; n < options.length; n++) {
            var tag_option = $('<li></li>'),//li�൱��option
                txt_option = options.eq(n).text();
            tag_option.text(txt_option).css('cursor', 'pointer').appendTo(ul_list);
            //Ϊ��ѡ�е�Ԫ�����classΪselected
            if (n == selected_index) {
                tag_option.attr('class', 'selected');
            }
        }
    }
})(jQuery);


