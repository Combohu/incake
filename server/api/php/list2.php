<?php
header("Access-Control-Allow-Origin:*");
include("../config/connect.php");


$sql = "select * from incake_list2";

$res = mysql_query($sql);

$product = array();
while($row = mysql_fetch_assoc($res)){
  array_push($product,$row);
}
  echo json_encode($product);
?>
