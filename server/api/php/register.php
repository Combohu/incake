<?php
header("Access-Control-Allow-Origin:*");
include("../config/connect.php");
$username = $_GET["username"];
$password = $_GET["password"];
$email = $_GET["email"];
$weixin = $_GET["weixin"];

$sql = "insert into incake_data (username, password, email, weixin) values ('$username', '$password', '$email', '$weixin')";

$isSuc = mysql_query($sql);
if ($isSuc) {
  echo'{"code":1}';
}else{
  echo'{"code":0}';
}
	mysql_close();
?>
