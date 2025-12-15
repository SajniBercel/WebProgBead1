<?php
include_once("config.php");
include_once("dbManager.php");

$error = "";

if(!isset($_POST['username']) || !isset($_POST['password'])){
    return false;
}

$username = $_POST['username'];
$password = $_POST['password'];

if(strlen($username) <= USERNAME_MIN_LENGTH){
    $error .= "felhasználó név nem elég hosszú (minimum: " .  USERNAME_MIN_LENGTH . " karakter)\n";
}

if(strlen($password) <= PASSWORD_MIN_LENGTH){
    $error .= "jelszó név nem elég hosszú (minimum: " .  PASSWORD_MIN_LENGTH . " karakter)\n";
}

echo 'login feldolgozás';

if(strlen($error) > 1) {
    echo '1';
    Header('authResponse.php');
    echo '2';
}

echo '3';
$pdo = dbConnection();

if(checkLogin($pdo, $username, $password)){

} else {
    $error .= "nincs ilyen felhasználó\n";
    Header('authResponse.php');
}
