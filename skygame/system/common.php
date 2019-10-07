<?php
function hr($return = false)
{
	if ($return) {
		return "<hr>\n";
	} else {
		echo "<hr>\n";
	}
}

function br($return = false)
{
	if ($return) {
		return "<br>\n";
	} else {
		echo "<br>\n";
	}
}

function dump($var, $return = false)
{
	if (is_array($var)) {
		$out = print_r($var, true);
	} else if (is_object($var)) {
		$out = var_export($var, true);
	} else {
		$out = $var;
	}
	if ($return) {
		return "\n<pre>$out</pre>\n";
	} else {
		echo "\n<pre>$out</pre>\n";
	}

}

function getFullUrl()
{
	$fullurl = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	return $fullurl;
}

function getRequestUri()
{
	return $_SERVER['REQUEST_URI'];
}

function strHas($string, $search, $caseSensitive = false)
{
	if ($caseSensitive) {
return strpos($string,$search)!==false;
	} else {
return strpos(strtolower($string),strtolower($search))!==false;

	}
}
function message($type , $message,$mustExit = false){
	$data['message'] = $message;
	View::render("/message/$type.php",$data);
	if($mustExit){
		exit;
	}
}

function getCurrentDateTime(){
	return date("Y-m-d H:i:s");
}

function encryptPassword($password){
	global $config;
	return md5($password . $config['salt']);
}
function showErrorPage(){
	View::render('/error.php');
}
function showHomePage(){
	$data['header']=makeHeader();
	$data['head']=_head_imports;
	$data['bodystyle']="direction:rtl;  background-image: url('/image/ui/dark-texture2.png');";
	View::render('/homepage/index.php',$data);
}
function showHome2(){
	$data['bodystyle']="direction : rtl;";
	$data['header']=_header1;
	View::render('/home.php',$data);
}
function makeHeader(){

		$userLogined =null;
	if (!isset($_SESSION['email'] )) {
		$userLogined = '<a class=\'header-link unselectable\' href="/user/register"><i class="fa fa-user">   </i>   ثبت نام</a>'
			. '<a class=\'header-link unselectable\' href="/user/login"><i class="fa fa-unlock-alt">  </i>  ورود</a>';
	}
	else if($_SESSION['email']!=null){
		$user=$_SESSION['username'];
		$panellink = '#';
		if($_SESSION['privilage']=="admin" || $_SESSION['privilage']=="super_admin" ) {
			$panellink = '/user/panel/new-post';
		}
		$userLogined = "<a class='header-link unselectable' style='font-family: moderan,yekan' href='/user/panel/new-post'><i class='fa fa-user'>  </i> $user </a>"
			. "<a class='header-link unselectable' href='/user/logout'><i class='fa fa-external-link'></i> خروج</a>";
	}

	return "
<header id='main-header'>
	<a class='header-link unselectable' href='/'><i class='fa fa-home'></i>صفحه اصلی </a>
	<a class='header-link unselectable'><i class='fa fa-list-alt'></i>آموزش </a>
	<a class='header-link unselectable'><i class='fa fa-twitch'></i>انجمن </a>
	<a class='header-link unselectable'><i class='fa fa-trophy'></i>مسابقات </a>
	<a class='header-link unselectable'><i class='fa fa-bolt'></i>مد </a>
	<a class='header-link unselectable'><i class='fa fa-phone'></i>ارتباط با ما </a>
	".$userLogined."
	</header>
	<div id='menu-show' >
		<a>
			<i class='fa fa-bars'></i>
		</a>
	</div>";
}function makePanelHeader(){
$username = $_SESSION['username'];
		return "<header id='panel-menu' style='display: none'>
	<span class='panel-btn'> <i class='fa fa-lg fa-user vam'></i> $username </span>
<a class='panel-btn' href='/user/panel/new-post'> <i class='fa fa-lg fa-plus-square vam'></i> پست جدید</a>
<a class='panel-btn' id='btn-editpost' href='/user/panel/edit-post'> <i class='fa fa-lg fa-pencil vam'></i> ویرایش پست ها</a>
<a class='panel-btn' id='btn-types' href='/user/panel/subjects'> <i class='fa fa-lg fa-list vam' ></i> موضوعات</a>
<a class='panel-btn' id='btn-comments'> <i class='fa fa-lg fa-commenting vam'></i> مدیریت کامنت ها</a>
<a class='panel-btn' id='btn-settings'> <i class='fa fa-lg fa-cog vam'></i> تنظیمات</a>
	<a class='panel-btn' id='btn-exit' href='/user/logout'> <i class='fa fa-lg fa-sign-out vam'></i> خروج</a>
	</header>
	<div align='center' style='z-index: 51 ; position: fixed ; top: 5px; right: 5px  '><button class=' button-circle button-primary button' id='hide-btn'><i class='fa fa-lg fa-arrow-left vam'></i></button></div> ";
}