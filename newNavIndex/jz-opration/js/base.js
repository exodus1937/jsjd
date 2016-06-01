window.onload = function () {
    var stree = $(".st_tree");
    stree.SimpleTree({
        click:function(a) {
            // console.log($(a).attr("hasChild"));
            if ($(a).attr("hasChild") == "false") {
                var url = $(a).attr('href')+"&id=displaycatalog&catalogid=I8a8a8aa0308027e30152339cf073025a&showbanner=false&user=liulan&password=liulan";
                window.open(url);

            }
        }
    });
    stree.find("a").each(function () {
        var _value = $(this).html();
        $(this).attr("title",_value);
    });
    $('#tianbao').click(function () {
        if(this.href==""){
            alert("请点击要填报的报表！")
        }
    });



};
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}