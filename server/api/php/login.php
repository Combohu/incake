<?php
	header("Access-Control-Allow-Origin:*");
  include("../config/connect.php");

  $username = $_GET["username"];
  $password = $_GET["password"];

  $sql =  "select * from incake_data where username='$username' and password='$password'";

  $res = mysql_query($sql);

  $row =mysql_num_rows($res);

  if ($row>0) {
    // code...
     echo'{"code":1}';
  }else {
    echo'{"code":0}';
  }


?>
