<?php
include_once("config.php");
include_once("dbManager.php");

if (empty($_SESSION['userID'])) {
    header('Location: loginPage.html');
    exit;
}

header('Location: manual.php');
exit;
