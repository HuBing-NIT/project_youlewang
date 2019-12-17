<?php

include "conn.php";
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');


//将注册信息写入数据库
if(isset($_POST['submit'])){    
    $user=$_POST['user'];
    $pass=sha1($_POST['pass']);
    $email=$_POST['email'];
    $conn->query("insert user_information values(null,'$user','$pass','$email',NOW())");
}


// 接收前端的用户名值
if (isset($_POST['username'])){
    $reg_user=$_POST['username'];
    $result = $conn->query("select * from user_information where user='$reg_user'");
    if($result->fetch_assoc()){//存在，用户名已经存在
        echo true;
    }else{
        echo false;
    }
}