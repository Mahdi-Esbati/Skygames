<?php
define('access', true);
require_once(getcwd() . '/system/loader.php');

$uri = getRequestUri();
$fulluri = getFullUrl();
if (strHas($fulluri , "?i=1")) {
  $fulluri	= str_replace("?i=1" , "" , $fulluri);
	header('Location: '.$fulluri);
	exit;
}
$parts = explode('/', $uri);
$controller = $parts[1];
if (isset($parts[2])) {
	$method = $parts[2];
}else{
	$method = "";
}

$params = array();
for ($i = 3; $i < count($parts); $i++) {
	$params[] = $parts[$i];
}

$controllerClassName = ucfirst($controller) . "Controller";
if (class_exists($controllerClassName)) {
	$controllerInstanse = new $controllerClassName();
}
if (method_exists("$controllerClassName", "$method")) {
	call_user_func_array(array($controllerInstanse, $method), $params);
} else {
	showErrorPage();
}
?>