<?php

getQuestion();


function getQuestion(){
    $sql    = "SELECT * from questions";
    $sql1   = "SELECT * from corrections";
    $db     = new Database();

    $questionArray   = $db->getAllrows($sql);
    $correctionArray = $db->getAllrows($sql1);
    $file_name_Q     = "question.json";
    $file_name_C     = "correction.json";
    
    file_put_contents($file_name_Q, json_encode($questionArray));
    file_put_contents($file_name_C, json_encode($correctionArray));
}


// ------------Bonus -----------------
// // browser
// $user_agent = $_SERVER['HTTP_USER_AGENT'];
// if (strpos($user_agent, 'Chrome') !== false) {
//     $browser = 'Chrome';
// } elseif (strpos($user_agent, 'Firefox') !== false) {
//     $browser = 'Firefox';
// } elseif (strpos($user_agent, 'Safari') !== false) {
//     $browser = 'Safari';
// } elseif (strpos($user_agent, 'Trident') !== false) {
//     $browser = 'Internet Explorer';
// } else {
//     $browser = 'Other';
// }
// echo "The client is using the following browser: $browser <br>";
// // @ip
// $ip = $_SERVER["REMOTE_ADDR"];
// echo "The User IP address: " . $ip;

// $navigateur = $_SERVER["REMOTE_ADDR"];

?>