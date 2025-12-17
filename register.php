<?php
include_once('config.php');
include_once('dbManager.php');

$_SESSION["errorList"] = "";

if(!isset($_POST['username']) || !isset($_POST['password'])){
    $_SESSION["errorList"] .= "nincs bállítva felhasználónév vagy jelszó";
    header('Location: authResponse.php');
    exit;
}

$username = $_POST['username'];
$password = $_POST['password'];

if (strlen($username) < USERNAME_MIN_LENGTH){
    $_SESSION["errorList"] .= "felhasználó név nem elég hosszú (minimum: " .  USERNAME_MIN_LENGTH . " karakter)\n";
}

if (strlen($username) > USERNAME_MAX_LENGTH) {
    $_SESSION["errorList"] .= "felhasználónév túl hosszú (maximum: " . USERNAME_MAX_LENGTH . " karakter)\n";
}

if (strlen($password) < PASSWORD_MIN_LENGTH) {
    $_SESSION["errorList"] .= "jelszó név nem elég hosszú (minimum: " .  PASSWORD_MIN_LENGTH . " karakter)\n";
}

if (strlen($_SESSION["errorList"]) > 1) {
    header('Location: authResponse.php');
    exit;
}

$pdo = getConnection();
$response = addUser($pdo, $username, $password);
if ($response == -1){
    $_SESSION["errorList"] .= "már létezik ez a felhasználónév\n";
    header('Location: authResponse.php');
    exit;
} else if ($response == -2) {
    $_SESSION["errorList"] .= "ismeretlen hiba a regsztráció alatt (jegyezd meg hogy mi történt és írd le a: d6n2qu@inf.elte.hu email címre)\n";
    header('Location: authResponse.php');
    exit;
}

$_SESSION["userID"] = $response;
$_SESSION["username"] = $username;
header('Location: index.php');