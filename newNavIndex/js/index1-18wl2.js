/**
 * Created by lswpc on 2016-01-14.
 */
$('b').click(function () {
    $(this).addClass('title_active1').siblings().removeClass('title_active1');
});
$(".jituan_wrap").each(function(i){
    if(i==0||i==1||i==4||i==5){
        $(this).css({background:"#f1f1f1"})
    }

});
/**/
$("#dczb>.fl").each(function (i) {
    if(i==0||i==1||i==4||i==5||i==8||i==9||i==13||i==14){
        $(this).css({background:"#f1f1f1"})
    }
});
//tab5
function jiandubaobiao_show(){
    $('.shengchanbaobiao_view').hide();
    $('.jiandubaobiao_view').show();
}

function shengchanbaobiao_show(){
    $('.shengchanbaobiao_view').css({display:"block"})
    $('.jiandubaobiao_view').css({display:"none"})
    $('.dianchang_view').find('a').css({backgrond:"#fff"});
    $('.dianchang_view').find("td").css({backgrond:'#fff'});
}
//tab6
function jiandujihuan_show(){
	$('.jdjh').show();
	$('.jdzj').hide();
}
function jianduzongjie_show(){
	$('.jdjh').css({display:"none"});
	$('.jdzj').css({display:"block"})
}
