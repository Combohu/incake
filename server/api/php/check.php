<?php
header("Access-Control-Allow-Origin:*");
include("../config/connect.php");
$username = $_POST["username"];
$sql =" select * from incake_data where username = '$username'";
$result = mysql_query($sql);
$row= mysql_num_rows($result);
$array = array("res_code"=>1, "res_error"=>"");
if ( $row === 0){
  // code...
$res_body = array("status"=>1,"message"=>"该用户名可以使用！");
}else{
  // code...
   $res_body = array("status"=>0,"message"=>"抱歉，该用户名已被使用！");
}
$array["res_body"] = $res_body;

echo json_encode($array);

mysql_close();
 ?>
