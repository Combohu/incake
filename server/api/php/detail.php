<?php
header("Access-Control-Allow-Origin:*");
include("../config/connect.php");

$id = $_POST["id"];


$sql = "select * from incake_detail where id=$id";

$res = mysql_query($sql);

//echo $res;

$product = array();

while($row = mysql_fetch_assoc($res)){

$product["product"] = $row;

}

if ($product["product"]) {

  $product["code"] = 1;

}else{

  $product["code"] = 0;
}
echo json_encode($product);

mysql_close();
 ?>
