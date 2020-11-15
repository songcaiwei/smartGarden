<?php
$servername='localhost';
$username='rzf';
$password='123456';

$conn=new mysqli($servername,$username,$password);
if ($conn->connect_error){
    echo die('连接失败'.$conn->connect_error);
}else{
    echo '连接成功';
}

//创建数据库
$dbname='CREATE DATABASE smartGardenDb';
if ($conn->query($dbname)===TRUE){
    echo '数据库创建成功';
}else{
    echo '数据库创建失败'.$conn->error;
}

////删除数据库
/*$dbname='DROP DATABASE myDB2';
if ($conn->query($dbname)===TRUE){
    echo '数据库删除成功';
}else{
    echo '数据库删除失败'.$conn->error;
}*/