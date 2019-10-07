<?php
session_start();
date_default_timezone_set('Asia/Tehran');
global $config;
global $userLogined;
require_once(getcwd() .'/config.php');
require_once(getcwd() .'/system/common.php');
require_once(getcwd() .'/system/db.php');
require_once(getcwd() .'/system/view.php');
require_once(getcwd() .'/system/core.php');
require_once(getcwd() .'/system/phpmailer.php');
require_once(getcwd() .'/system/smtp.php');
require_once(getcwd() .'/locale/fa.php');
?>