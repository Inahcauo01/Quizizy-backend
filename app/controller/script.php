<?php

include_once 'C:\xampp\htdocs\Quizizy-backend\app\model\Database.class.php' ;
getQuestion();

function getQuestion(){
    $sql    = "SELECT * from questions";
    $sql1   = "SELECT * from corrections";
    $db = new Database();

    $questionArray   = $db->getAllrows($sql);
    $correctionArray = $db->getAllrows($sql1);
    $file_name_Q     = "question.json";
    $file_name_C     = "correction.json";
    
    file_put_contents($file_name_Q, json_encode($questionArray));
    file_put_contents($file_name_C, json_encode($correctionArray));
}


// ------------Bonus -----------------
if(isset($_POST['name'])){
    // echo "hi";

    echo $_POST['name'];
    echo "score :".$_POST['score'];
    //browser
    $u_agent = $_SERVER['HTTP_USER_AGENT'];
    $browsers = [
        '/msie/i' => 'Internet explorer',
        '/firefox/i' => 'Firefox',
        '/safari/i' => 'Safari',
        '/chrome/i' => 'Chrome',
        '/edg/i' => 'Edge',
        '/opr/i' => 'Opera',
        '/mobile/i' => 'Mobile browser',
      ];
   
      foreach ($browsers as $regex => $value) {
        if (preg_match($regex, $u_agent)) {
          $browser = $value;
        }
      }

    // @ip
    $ip = $_SERVER["REMOTE_ADDR"];
    // echo "The User IP address: " . $ip ."<br>";

    // OS
    if (preg_match('/linux/i', $u_agent)) {
        $os = 'Linux';
    } elseif (preg_match('/macintosh|mac os x|mac_powerpc/i', $u_agent)) {
        $os = 'Mac';
    } elseif (preg_match('/windows|win32|win98|win95|win16/i', $u_agent)) {
        $os = 'Windows';
    } elseif (preg_match('/ubuntu/i', $u_agent)) {
        $os = 'Ubuntu';
    } elseif (preg_match('/iphone/i', $u_agent)) {
        $os = 'IPhone';
    } elseif (preg_match('/ipod/i', $u_agent)) {
        $os = 'IPod';
    } elseif (preg_match('/ipad/i', $u_agent)) {
        $os = 'IPad';
    } elseif (preg_match('/android/i', $u_agent)) {
        $os = 'Android';
    } elseif (preg_match('/blackberry/i', $u_agent)) {
        $os = 'Blackberry';
    } elseif (preg_match('/webos/i', $u_agent)) {
        $os = 'Mobile';
    }else{
        $os = 'Autre OS';
    }
    

    $json =  unserialize(file_get_contents("http://www.geoplugin.net/php.gp?ip='$ip'"));


    $sql = "INSERT INTO data_user (`username`, `ip_adr`, `browser`, `os`,`country`,`region`,`city`,	`score`) VALUES (?,?,?,?,?,?,?,?)";
    $db = new Database();
    $db->insertData($sql,array($_POST['name'],$ip,$browser,$os,$json["geoplugin_countryName"],$json["geoplugin_region"],$json["geoplugin_city"], $_POST['score']));

}

?>