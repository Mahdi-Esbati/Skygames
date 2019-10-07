<?php
if(!defined('access')){

	echo "<body style='background-color: #72bcf0'><br><span style='color: #fff;background-color: rgba(233, 74, 75, 0.76);border-radius: 5px;padding: 10px'> NO ACCESS </span></body>";
	exit;
}

global $config;
$config['db']['host'] = 'DB Host' ;
$config['db']['user'] = 'gigfa_18584373' ;
$config['db']['pass'] = 'Password';
$config['db']['name'] = 'gigfa_18584373_skymods';

//for salting the hashes
$config['salt'] = 'hewfuwehfOHDQIOU123??@@@efweo';
?>
