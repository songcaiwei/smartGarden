<?php
header('content-Type:text/html;charset=UTF-8');
header('Cache-Control:no-cache');
//error_reporting(0);


$servername = 'localhost';
$username = 'rzf';
$password = '123456';
$dbname = 'smartGardenDb';

$connect = new mysqli($servername, $username, $password, $dbname);
if(!$connect){
    echo '数据库连接失败' . '<br>';
}

mysqli_select_db($connect, $dbname);


// 设置编码，防止中文乱码
mysqli_query($connect, "set name utf8");
$myusername = $_POST['username'];
$mypassword = $_POST['password'];

$register_num;
$success_failure;

if(isset($myusername) && isset($mypassword)){
    $readsql = "SELECT username FROM smartgarden WHERE username='$myusername'";
    //mysqli_select_db($connect, "$username");
    $retval = mysqli_query( $connect, $readsql );
    if(mysqli_num_rows($retval)==0){
        $add_myusername_mypassword = "INSERT INTO smartGarden" . "(username,password)" . "VALUES" . "('$myusername','$mypassword')";
        if($connect->query($add_myusername_mypassword)){
            $success_failure = '注册成功';
            $register_num = 1;
        } else {
            echo '注册失败：' . $connect->error;
        };
    } else {
        $success_failure = "用户名已被注册,换一个吧";
        $register_num = 0;
    };

    $register_res = array(
        "register_num"=>$register_num,
        "success_failure"=>$success_failure,
        "retval"=>$retval
    );
    echo json_encode($register_res,JSON_UNESCAPED_UNICODE);

}



/*if(isset($myusername) && isset($mypassword)){
    $readsql="SELECT username FROM smartgarden";
    mysqli_select_db( $connect, "$myusername" );
    $retval=$connect->query($readsql);
    if(!$retval){
        die('无法读取数据: ' . mysqli_error($connect));
    }

    $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
    if($myusername == $row['username']){
        $success_failure = "用户名已被注册,换一个吧";
        $register_num = 0;
    }else{
        $add_myusername_mypassword = "INSERT INTO smartGarden" . "(username,password)" . "VALUES" . "('$myusername','$mypassword')";
        if($connect->query($add_myusername_mypassword)){
            $success_failure = '注册成功';
            $register_num = 1;
        } else {
            echo '注册失败：' . $connect->error;
        }
    };

    $register_res = array(
        "register_num"=>$register_num,
        "success_failure"=>$success_failure,
        "row"=>$row
    );
    echo json_encode($register_res,JSON_UNESCAPED_UNICODE);
}*/


?>
