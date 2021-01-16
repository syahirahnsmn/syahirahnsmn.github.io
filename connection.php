<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<?php

// Localhost connection
/* $servername = "localhost";
$user = 'root';
$pass = '';
$db = 'mood_analysis'; */

// Remote database connection
$servername = "remotemysql.com";
$user = 'w066iGFwkP';
$pass = 'bo2hmcdOld';
$db = 'w066iGFwkP';


$db = mysqli_connect($servername, $user, $pass, $db) or die("Unable to connect");

if(!$db){
    die("Connection Failed:" . mysqli_connect_error);
}



if(isset($_POST["save"])){
    //$id = $_POST['id'];
    //$date = date('Y-m-d', strtotime($_POST['dateinput']));

    $dt = new DateTime("now"); 
    $date = date_format($dt, 'Y-m-d');
    $depressionRate = $_POST['depression'];
    $elevatedRate = $_POST['elevated'];
    $anxietyRate = $_POST['anxiety'];
    $irritateRate = $_POST['irritability'];

    $sql_query = "INSERT INTO mood (dateinput, depression, elevated, anxiety, irritability) 
    VALUES ('$date', '$depressionRate', '$elevatedRate', '$anxietyRate', '$irritateRate')" or die("Unable to save"); 

    if(mysqli_query($db, $sql_query)){
        
    }
    else{
        //echo "Error: " . "" . mysqli_error($db);
    }
    mysqli_close($db);
}
else{
    echo ("Unable to enter save mode");
}

?>
</body>
</html>