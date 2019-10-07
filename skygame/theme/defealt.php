<?php
if  (!isset($head)){
	$head =null;
}
if  (!isset($bodystyle)){
	$bodystyle = null;
}
if  (!isset($header)){
	$header = null;
}
if  (!isset($contentstyle)){
	$contentstyle = null;
}
if  (!isset($content)){
	$content = null;
}
if  (!isset($imports)){
	$imports = null;
}
?>

<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="/css/reset.css">
	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/style.css?<?php echo date('l jS \of F Y h:i:s A'); ?>">
	<link rel="stylesheet" href="/css/buttons.css">
	<link rel="stylesheet" href="/css/jquery-ui.min.css">
	<link rel="stylesheet" href="/css/jquery-ui.structure.min.css">
	<link rel="stylesheet" href="/css/jquery-ui.theme.min.css">
	<link rel="shortcut icon" href="/favicon.ico" />
	<script type="text/javascript" src="/js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/js/jquery-ui.min.js"></script>
	<link rel='stylesheet' href='/css/font-awesome/css/font-awesome.min.css'>
	<?=$head?>

<title>SkyGame</title>
</head>
<body style="<?=$bodystyle?>">
<div id="header" style="direction: rtl;"><?=$header?></div>
<div id="content" style="direction: rtl;<?=$contentstyle?>"><?=$content?></div>
<?=$imports?>
</body>
	<script type="text/javascript" src="/js/header.js"></script>
</html>