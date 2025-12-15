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
    if(isset($error) && strlen($error) > 1){
        echo '<div class="error">';
        echo $error;
        echo '</div>';
    } else {
        echo '<div class="siker">';
        echo 'Sikeres művelet <a href="index.php">vissza a főoldalhoz</a>>';
        echo '</div>';
    }
?>
</body>
</html>