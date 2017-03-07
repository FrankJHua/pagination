/**
 * Created by fy on 2017/3/7.
 */
var req = {};

    //获取页面数据请求
    req.getPageData = function(pageindex, pagesize, callback){
        $(".loading").show();
        $.ajax({
            type : "POST",
            url  : "request.handler.php",
            data : {pageindex : pageindex, pagesize : pagesize},
            dataType : "json",
            success  : function(data){
                callback ? callback(data, pageindex) : (function(){})();
            }
        });
    }