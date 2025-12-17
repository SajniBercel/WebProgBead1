<?php
const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 6;
const USERNAME_MAX_LENGTH = 127;

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}