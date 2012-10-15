<?php

$UDID = $_GET['UDID'];

$con = mysql_connect("localhost", "swapan_app", "Qwdfty13");

if (!$con){
    die('Could not connect : ' . mysql_error());
}

mysql_select_db("swapan_app", $con);


$result = mysql_query("SELECT * from app_user where udid= '".$UDID."';") or die(mysql_error());

if(mysql_affected_rows()==0){
    $query = "INSERT INTO app_user(udid) VALUES ('" . $UDID ."');";
    $result = mysql_query($query) or die(mysql_error());
}

$result = mysql_query("SELECT * from app_user where udid='".$UDID."';") or die(mysql_error());

while ($row = mysql_fetch_array($result)){
    $USER_ID = $row['id'];
}

 
//$params = "UDID=".$UDID."&CHALLENGE=".$CHALLENGE."&DEVICE_NAME=".$DEVICE_NAME."&DEVICE_PR ODUCT=".$DEVICE_PRODUCT."&DEVICE_VERSION=".$DEVICE_VERSION;
// enrollment is a directory
$params = "app_user_id=".$USER_ID;
header('Location: http://srajdev.com/trial?'.$params);
?>
