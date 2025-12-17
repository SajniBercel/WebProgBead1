<?php
const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 6;
const USERNAME_MAX_LENGTH = 20;

//TODO: ezt át kell írni
const ROOT = "C:\\xampp\\htdocs\\Weboldal\\";

// ELTE:
//const $dns = 'mysql:host=mysql.caesar.elte.hu;dbname=sajnibercel;';
//const $dbName = 'sajnibercel';
//const $userName = 'sajnibercel';     // saját DB felhasználó
//const $password = 'fwgihHmjH6sL4FxM';         // saját DB jelszó

// LOCALHOST:
$dns = 'mysql:host=localhost;dbname=maze;';
$dbName = 'maze';
$userName = 'root';
$password = null;

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
];

try {
    $pdo = new PDO($dns, $userName, $password, $options);
} catch (PDOException $e) {
    die("[config] Adatbázis hiba kapcsolodás közben: " . $e->getMessage());
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}