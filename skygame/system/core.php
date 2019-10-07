<?php
function __autoload($classname)
{
	if (strHas($classname, "Model")) {
		$filename = str_replace("Model", "", $classname);
		$filename = strtolower($filename);
		require_once(getcwd() . "/mvc/model/" . $filename . '.php');
		return;
	}
	if (strHas($classname, "Controller")) {
		$filename = str_replace("Controller", "", $classname);
		$filename = strtolower($filename);
		if (file_exists (getcwd() . "/mvc/controller/" . $filename . '.php')) {
			require_once(getcwd() . "/mvc/controller/" . $filename . '.php');
			return;

		} else if($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']==$_SERVER['SERVER_NAME']||$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']==$_SERVER['SERVER_NAME'].'/'){
			showHomePage();
		}
		else{
			showErrorPage();
		}
	}
}