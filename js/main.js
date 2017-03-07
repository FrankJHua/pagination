/**
 * Created by fy on 2017/3/7.
 */

$(function(){
    //页面加载完成开始请求数据
    var pagesize = 5,
        pageindex = 1,      //当前页
        pageSelectMax = 6;  //分页按钮数

    //获取第一页数据
    req.getPageData(pageindex,pagesize,callback);

    //回调
    function callback(res,index){
        $(".loading").hide();
        pageindex = index;
        if(res.status === 1){
            var data = res['info'],
                list = data['list'];
            showTableData(list);
            pagination(data.pagecount);
            $("#total-count").text(data.totalcount);
            $("#page-index").text(pageindex + "/" + data.pagecount);
        }else{
            alert("获取数据失败");
        }
    }

    // 填充表格数据
    function showTableData(list){
        var tableBody = $("#table-body");
        tableBody.empty();
        $(list).each(function(index,item){
            var tr = $(document.createElement('tr'));
            tr.addClass("list-item");
            tableBody.append(tr);
            tr.append("<td>" + item.ticketnum + "</td>>");
            tr.append("<td><img src='"+ item.imgurl +"' class='ticket-img'/></td>")
            tr.append("<td>" + item.account + "</td>>");
            tr.append("<td>第" + item.quarter + "季度</td>>");
            tr.append("<td>" + item.time.split(/\s/g)[0] + "</td>>");
        });
        $(".ticket-img").on("click",function(){
            var img = $(this).clone();
            $(".ticket-wrap").append(img);
            $(".over").removeClass("hide");
        });
    }

    //分页
    function pagination(pagecount){
        var wrap = $(".page-select"),
            i = 0;
        wrap.empty();
        if(pageindex > 1) {
            wrap.append("<a href='#' class='last'><<</a>");
        }
        //是否大于分页按钮数
        if(pagecount <= pageSelectMax){
            for(i = 1; i <= pagecount; i++){
                var elem = ((i == pageindex) ? ("<a href='#' class='tap pagenow'>" + i + "</a>") : ("<a href='#' class='tap'>" + i + "</a>"));
                wrap.append(elem);
            }
        }else {
            //分页按钮从第start页开始
            var start = pageindex > Math.floor(pageSelectMax / 2) ? (pageindex - parseInt(pageSelectMax / 2) + 1) : 1;
            var end = start + pageSelectMax - 1;
            if(end > pagecount) {
                start -= (end - pagecount);
                end = pagecount;
            }
            for (i = start; i <= end; i++) {
                var elem = ((i == pageindex) ? ("<a href='#' class='tap pagenow'>" + i + "</a>") : ("<a href='#' class='tap'>" + i + "</a>"));
                wrap.append(elem);
            }
        }
        if(pageindex < pagecount){
            wrap.append("<a href='#' class='next'>>></a>");
        }
        //绑定事件
        $(".tap").on("click",function(){
            var index = $(this).html();
            req.getPageData(index,pagesize,callback);
        });
        if($(".last")){
            $(".last").on("click",function(){
                var index = --pageindex;
                req.getPageData(index,pagesize,callback);
            });
        }
        if($(".next")){
            $(".next").on("click",function(){
                var index = ++pageindex;
                req.getPageData(index,pagesize,callback);
            });
        }
    }

    $(".close-btn").on("click",function(){
        $(".ticket-wrap").empty();
        $(".over").addClass("hide");
    });
});