<?php
	header("Access-Control-Allow-Origin:*");
  include("../config/connect.php");

  $username = $_GET["username"];
  $password = $_GET["password"];
  $sql =  "select * from incake_data where username='$username' and password='$password'";
  $result = mysql_query($sql);
  $rows = mysql_num_rows($result);
  $array = array("res_code"=>1,"res_error"=>"");
  if ($rows>0) {
    // code...
    $res_body=array("status"=>1,"message"=>"恭喜您！登录成功！");
  }else{
    $res_body=array("status"=>0,"message"=>"抱歉，密码错误！");
  }
  $array["res_body"]=$res_body;

  echo json_encode($array);
  mysql_close();
?>
