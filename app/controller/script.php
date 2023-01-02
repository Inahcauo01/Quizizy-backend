<?php

// // if(isset($_POST['id'])){
    // $sql    = "SELECT * from questions where id=1";
    // $db     = new Database();
    // $result = $db->getAllrows($sql);
//     foreach($result as $row){
//         echo $row['question']."<br>";
//         echo $row['choiceA']."<br>";
//         echo $row['choiceB']."<br>";
//         echo $row['choiceC']."<br>";
//         echo $row['choiceD'];
//     }
// // }

// if(isset($_POST['getData']))
    getData();

// browser
$user_agent = $_SERVER['HTTP_USER_AGENT'];
if (strpos($user_agent, 'Chrome') !== false) {
    $browser = 'Chrome';
} elseif (strpos($user_agent, 'Firefox') !== false) {
    $browser = 'Firefox';
} elseif (strpos($user_agent, 'Safari') !== false) {
    $browser = 'Safari';
} elseif (strpos($user_agent, 'Trident') !== false) {
    $browser = 'Internet Explorer';
} else {
    $browser = 'Other';
}
echo "The client is using the following browser: $browser <br>";
// @ip
$ip = $_SERVER["REMOTE_ADDR"];
echo "The User IP address: " . $ip;

$navigateur = $_SERVER["REMOTE_ADDR"];

function getData(){
    $sql    = "SELECT * from questions";
    $db     = new Database();
    $questionArray = $db->getAllrows($sql);
    return json_encode($questionArray);
}

$file_name = "question.json";
file_put_contents($file_name, getData());


?>