<?php
/**
 * Created by PhpStorm.
 * User: fy
 * Date: 2017/3/7
 * Time: 12:31
 */
require_once ("config.php");
$conn = mysqli_connect(HOST,USERNAME,PASSWORD);
if(!$conn){
    echo mysqli_error($conn);
}
if(!mysqli_select_db($conn,DATABASE)){
    echo mysqli_error($conn);
}
mysqli_query($conn,"set names utf8");
?>