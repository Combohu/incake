<?php
header("Access-Control-Allow-Origin:*");
include("../config/connect.php");
$username = $_GET["username"];
$password = $_GET["password"];
$email = $_GET["email"];
$weixin = $_GET["weixin"];
$sql1 = "SELECT * FROM incake_data WHERE username='$username'";
$result = mysql_query($sql1);
if (mysql_num_rows($result)>0) {
    $res_body = array("status"=>0, "message"=>"用户名已被占用");
}else {
$sql2 = "insert into incake_data (username, password, email, weixin) values ('$username', '$password', '$email', '$weixin')";
$res = mysql_query($sql2);
if (mysql_query($sql2)){
  $res_body = array("status"=>1, "message"=>"注册成功");
}else{
  $res_body = array("status"=>0, "message"=>"用户名重复，请重新选择！");
}
}
echo json_encode($res_body);
	mysql_close();
?>
