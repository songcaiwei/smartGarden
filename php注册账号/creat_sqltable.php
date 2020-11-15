<?php

$servername='localhost';
$username='rzf';
$password='123456';
$dbname='smartGardenDb';

$connect=new mysqli($servername,$username,$password,$dbname);
if ($connect){
    echo '数据库连接成功';
}else{
    echo '数据库连接失败';
}


//删除数据表
/*mysqli_select_db($connect,$dbname);
$sql = "DROP TABLE smartGarden";
$retval = mysqli_query( $connect, $sql );*/


$sqltable="CREATE TABLE smartGarden(
    "." id INT NOT NULL AUTO_INCREMENT,
    "." username VARCHAR(100) NOT NULL,
    "." password VARCHAR(40) NOT NULL,
    "." submission_date DATE,
    "." PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;";

if ($connect->query($sqltable)){
    echo '数据表创建成功';
}else{
    echo die('数据表创建失败'.$connect->error);
}

