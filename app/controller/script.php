<?php
include_once '../loader.php';

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


function getData(){
    $sql    = "SELECT * from questions";
    $db     = new Database();
    $questionArray = $db->getAllrows($sql);
    return json_encode($questionArray);
}

$file_name = "question.json";
file_put_contents($file_name, getData());


?>