<?php
/**
 * Created by PhpStorm.
 * User: fy
 * Date: 2017/3/7
 */
    require_once ("connect.php");

    $pageSize = @$_POST["pagesize"];
    $pageIndex = @$_POST["pageindex"];
    $result = array();
    if(isset($pageSize)==null || isset($pageIndex)==null){
        //返回
        $result["status"] = 0;
        $result["msg"] = urlencode("缺少参数");
        echo urldecode(json_encode($result));
        die();
    }

    $res = null;    //资源标识符

    //查询记录条数和总页数
    $sql = "select count(*) from tickets";
    $res = mysqli_query($conn,$sql);
    $totalcount = mysqli_fetch_row($res)[0];
    $totalpage = ($totalcount%$pageSize) ? intval($totalcount/$pageSize)+1 : ($totalcount/$pageSize);

    //查询ticket列表
    $recordStart = ($pageIndex-1)*$pageSize;
    $sql = "select * from tickets limit $recordStart,$pageSize";
    $res = mysqli_query($conn,$sql);
    $list = array();
    $index = 0;
    while($array = mysqli_fetch_array($res)){
        $list["$index"]["ticketnum"] = $array["ticketnum"];
        $list["$index"]["imgurl"] = $array["imgurl"];
        $list["$index"]["account"] = $array["account"];
        $list["$index"]["quarter"] = $array["quarter"];
        $list["$index"]["time"] = $array["time"];
        $index++;
    }
    $result["info"]["totalcount"] = $totalcount;
    $result["info"]["pagecount"] = $totalpage;
    $result["info"]["list"] = $list;
    $result["status"] = 1;
    $result["msg"] = urlencode("返回数据成功");

    $result = urldecode(json_encode($result));
    echo $result;
    mysqli_close($conn);
?>