<?php
include_once("config.php");

if (empty($_SESSION['userID'])) {
    header('Location: loginPage.html');
    exit;
}