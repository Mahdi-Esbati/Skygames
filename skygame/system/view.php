<?php

class View
{
	public static function render($filePath, $data=array())
	{
		extract($data);

		ob_start();
		require_once(getcwd() .'/mvc/view/'.$filePath);
		$object = ob_get_clean();
		$content = preg_replace("/\xEF\xBB\xBF/", "", $object);
		require_once(getcwd() ."/theme/defealt.php");
	}
}