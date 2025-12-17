<!doctype html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Labirintus</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" type="image/x-icon" href="https://sajnibercel.web.elte.hu/Labirintus/icon.png">
</head>
<body>
<?php
include_once('config.php');

    if(!empty($_SESSION["errorList"])){
        echo '<div class="error">';
        echo $_SESSION["errorList"];
        echo '</div>';
    } else {
        echo '<div class="siker">';
        echo 'Sikeres művelet. <a href="index.php">vissza a főoldalhoz</a>';
        echo '</div>';
    }

    $_SESSION["errorList"] = "";
?>
</body>
</html>