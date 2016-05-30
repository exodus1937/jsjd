// JavaScript Document
var fn = {};
fn.naviMsgClose = function() {
	$('.navi li').hover(function(){
		$(this).addClass('hover');	
		$(this).find('.navi_content').slideDown(200);
	},function(){
		$(this).removeClass('hover');
		$(this).find('.navi_content').stop(true,true).slideUp(200);
	});
};
$(function() {
	for (fname in fn) {
		if (fname.indexOf('_') == -1) {
			fn[fname]();
		}
	}
});