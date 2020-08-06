<?php

$my_verify_token="mytoken";
$challenge = $_GET['hub_challenge'];
$verify_token=$_GET['hub_verify_token'];

if ($my_verify_token===$verify_token) {
    echo $challenge;

    exit;
}

$response = file_get_contents("php://input");
//send by method get json data from facebook
file_get_contents('http://yourip_where_nodejs_work:yourport/webhook/?'.str_replace(' ','%100',$response));




?>