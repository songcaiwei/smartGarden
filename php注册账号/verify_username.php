<?php
header('content-Type:text/html;charset=UTF-8');     //这一行写“content-Type:text/html”，火狐会提示“XML 解析错误：格式不佳”，但是可以显示。
header('Cache-Control:no-cache');

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


$readsql = "SELECT username FROM smartgarden WHERE username='$myusername'";
//mysqli_select_db($connect, "$username");
$retval = mysqli_query($connect, $readsql);

if(mysqli_num_rows($retval) > 0){
    $nameRes = "用户名已被注册,换一个吧";
} else {
    if(!preg_match("/(?!\d+$)^[a-zA-Z][\da-zA-Z]{2,8}$/", $myusername)){


        /*/^[a-zA-Z]([a-zA-Z0-9]|[_]){2,13}$/
         * /(?!\d+$)([\da-zA-Z]|[\u4e00-\u9fa5]){2,13}/"    (?!\d+$)[\da-zA-Z\u4e00-\u9fa5]{1,13}/*/
        $nameRes = '用户名由3-9位字母数字组成，且不能为纯数字';
    } else {
        $nameRes = '用户名可用';
    }
};

if(!preg_match("/^[a-z+A-Z+0-9+]{6,10}$/", $mypassword)){
    $paswdRes = "密码不符合规则，请更换密码";
} else {
    $paswdRes = "密码可用";
};

$res = array('nameRes' => $nameRes, 'paswdRes' => $paswdRes);
echo json_encode($res, JSON_UNESCAPED_UNICODE);


/*$username=$_POST['username'];
//echo $username;
//$reg0="/^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){3,15}$/";
$nameRes;
$paswdRes;
if ($username=="rzf"){
    $nameRes = '用户名已注册';
}else if(!preg_match("/^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){0,13}$/",$username)){
    $nameRes = '用户名不合规则';
}else{
    $nameRes = '用户名可用';
}

$password=$_POST['password'];
if(!preg_match("/^[a-z+A-Z+0-9+]{5,15}$/",$password)){
    $paswdRes = "密码强度弱";
}else{
    $paswdRes = "密码可用";
}
//echo '[{'"nameRes":$nameRes,"paswdRes":$paswdRes}]';
$res = array(
    'nameRes'=>$nameRes,
    'paswdRes'=>$paswdRes
);
echo json_encode($res,JSON_UNESCAPED_UNICODE);*/


?>


