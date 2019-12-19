<?php

include "conn.php";
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');


// 以下是登录验证代码

if (isset($_POST['user']) && isset($_POST['pass'])){
    $user=$_POST['user'];
    $pass=sha1($_POST['pass']);//二次加密
    $result = $conn->query("select * from user_information where user='$user'");

    $arr=array();

    for($i=0;$i<$result->num_rows;$i++){
        $arr[$i]=$result->fetch_assoc();
    }

    $datapass=sha1($arr[0]['pass']);//2次加密
    // echo $datapass;
    if($result->num_rows>0){
        if($datapass==$pass){//如果密码匹配
            echo true;
        }else{ //如果密码不匹配
            echo false;
        }
    }else{//代表用户名不存在,不进行密码匹配
        echo false;
    }
}