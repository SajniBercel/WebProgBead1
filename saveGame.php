<?php
include_once('config.php');
include_once('auth.php');
include_once('dbManager.php');

updateUser(getConnection() ,$_SESSION["userID"], (float)$_POST["time"], (int)$_POST["size"], (int)$_POST["seed"]);