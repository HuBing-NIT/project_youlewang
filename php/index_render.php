<?php


include "conn.php";
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

$result1=$conn->query("select * from shop_information where shop_type ='food'");
$arrdata1 = array();
for($i=0;$i<$result1->num_rows;$i++){
    $arrdata1[$i]=$result1->fetch_assoc();
}

$result2=$conn->query("select * from shop_information where shop_type ='home'");
$arrdata2 = array();
for($i=0;$i<$result2->num_rows;$i++){
    $arrdata2[$i]=$result2->fetch_assoc();
}

$result3=$conn->query("select * from shop_information where shop_type ='intel'");
$arrdata3 = array();
for($i=0;$i<$result3->num_rows;$i++){
    $arrdata3[$i]=$result3->fetch_assoc();
}

$result4=$conn->query("select * from shop_information where shop_type ='fashion'");
$arrdata4 = array();
for($i=0;$i<$result4->num_rows;$i++){
    $arrdata4[$i]=$result4->fetch_assoc();
}

$result5=$conn->query("select * from shop_information where shop_type ='beauty'");
$arrdata5 = array();
for($i=0;$i<$result5->num_rows;$i++){
    $arrdata5[$i]=$result5->fetch_assoc();
}


class data{

}

$data = new data();
$data->d1=$arrdata1;
$data->d2=$arrdata2;
$data->d3=$arrdata3;
$data->d4=$arrdata4;
$data->d5=$arrdata5;

echo json_encode($data);