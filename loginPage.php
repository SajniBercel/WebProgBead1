<?php
include_once("config.php");
?>

<!doctype html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="login.php" method="post">
        <label for="username">Felhasználónév</label>
        <input name="username" id="username" type="text" placeholder="Add meg a felhasználó neved">

        <label for="password">Jelszó</label>
        <input name="password" id="password" type="password" placeholder="legalább 6 karakter">

        <input type="submit">
    </form>
    <a href="register.php">register</a>
</body>
</html>