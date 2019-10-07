<?php

class UserController
{
	public function __construct()
	{
	}

	public function logout()
	{
		session_destroy();
		echo "<script type='text/javascript'>window.location.href = '/';</script>";
		showHomePage();
	}

	public function profile()
	{
		showHome2();
	}

	public function login()
	{
		if (isset($_SESSION['email'])) {
			message('success', "شما قبلا به سایت وارد شده اید، میتوانید از دکمه خروج استفاده کنید  " . "<a href='/user/logout' class='mainBtn'>خروج</a>", true);
			echo "<a href='/user/logout' class='mainBtn'>خروج</a>";
			exit;
		}

		if (isset($_POST['email'])) {
			$this->loginCheck();
		} else {
			$this->loginForm();
		}
	}

	private function loginCheck()
	{
		$email = $_POST['email'];
		$password = $_POST['password'];

		$db = Db::getInstance();
		$record = $db->first("SELECT * FROM sky_users WHERE email='$email' OR username ='$email';");
		if ($record == null) {
			message('fail', "ایمیل یا نام کاربری شما ثبت نشده! لطفا از بخش ثبت نام وارد سایت شوید.", true);
		} else {
			$hashedPassword = encryptPassword($password);
			if ($hashedPassword == $record['hashed_password']) {
				$_SESSION['email'] = $record['email'];
				$_SESSION['id'] = $record['id'];
				$_SESSION['username'] = $record['username'];
				$_SESSION['privilage'] = $record['privilage'];
				message('success', "شما با موفقیت وارد سایت شدید. در حال ورود به صفحه اصلی ....." . "<script>  window.setTimeout(function(){ window.location.href = '/'; }, 1500); </script>", true);
			} else {
				message('fail', 'رمز عبور شما اشتباه است! در صورت فراموشی رمز عبور از دکمه ..... استفاده کنید .', '');
			}
		}
	}

	private function loginForm()
	{
		$data[] = array();
		$data['header'] = makeHeader();
		$data['bodystyle'] = " background-image: url('/image/ui/dark-texture2.png')";
		View::render("/user/login.php", $data);
	}


	public function register()
	{
		if (isset($_POST['email'])) {
			$this->registerCheck();
		} else {
			$this->registerForm();
		}
	}

	private function registerCheck()
	{
		$db = Db::getInstance();

		$email = $_POST['email'];
		$username = $_POST['username'];
		$password1 = $_POST['password1'];
		$password2 = $_POST['password2'];
		$f_name = $_POST['f_name'];
		$l_name = $_POST['l_name'];
		$time = getCurrentDateTime();
		$record = $db->first("SELECT * FROM sky_users WHERE email='$email'");
		if ($record != null) {
			message('fail', 'ایمیل شما قبلا ثبت شده! لطفا از بخش ورود به سایت وارد شوید', true);
		}

		if (strlen($password1) < 3 || strlen($password2) < 3) {
			message('fail', 'رمز عبور شما بسیار کوتاه است! لطفا رمز عبور دیگری وارد کنید.', true);
		}

		if ($password1 != $password2) {
			message('fail', 'رمزهای عبورتان یکسان نیستند. لطفا آنها را دوباره وارد کنید.', true);
		}

		$hashedPassword = encryptPassword($password1);

		$db->insert("INSERT INTO  `gigfa_18584373_skymods`.`sky_users` (
`id` ,
`username` ,
`email` ,
`hashed_password` ,
`f_name` ,
`l_name` ,
`register_time` ,
`last_visit_time` ,
`privilage`
)
VALUES (
NULL ,  '$username',  '$email',  '$hashedPassword',  '$f_name',  '$l_name',  '$time',  '$time',  'user'
);
");

		message('success', 'تبریک ! شما با موفقیت به سایت اسکای گیمز وارد شدید!', true);
	}

	private function registerForm()
	{
		$data[] = array();
		$data['header'] = _header1;
		$data['header'] = makeHeader();
		$data['bodystyle'] = "background-image: url('/image/ui/main-bg.jpg');background-size:cover";
		View::render("/user/register.php", $data);
	}


	public function upload()
	{
		if (isset($_FILES['image'])) {
			$errors = array();
			$file_name = $_FILES['image']['name'];
			$file_size = $_FILES['image']['size'];
			$file_tmp = $_FILES['image']['tmp_name'];
			$file_type = $_FILES['image']['type'];
			$file_ext = strtolower(end(explode('.', $_FILES['image']['name'])));

			$expensions = array("jpeg", "jpg", "png");

			if (in_array($file_ext, $expensions) === false) {
				$errors[] = "extension not allowed, please choose a JPEG or PNG file.";
			}

			if ($file_size > 2097152) {
				$errors[] = 'File size must be excately 2 MB';
			}

			if (empty($errors) == true) {
				move_uploaded_file($file_tmp, "/image/uploaded/");
				echo "Success";
			} else {
				print_r($errors);
			}
		}
	}


	public function panel($page)
	{
		if ($_SESSION['email'] == null) {
			message('fail', "لطفا با حساب ادمین خود به سایت وارد شوید", true);
		} else if ($_SESSION['privilage'] == "admin" || $_SESSION['privilage'] == "superadmin") {
		} else if ($_SESSION['privilage'] == "user" || $_SESSION['privilage'] == "guest" || $_SESSION['privilage'] == null) {
			message('fail', "این بخش مخصوص مدیران سایت است ", true);
		}
		if ($page == null) {
			$data['head'] = "	<link rel=\"stylesheet\" href=\"/css/panel.css\">";
			$data['header'] = makePanelHeader();
			View::render("/panel/panel-home.php", $data);
		} else {
			$data['head'] = "<link rel=\"stylesheet\" href=\"/css/panel.css?" . date('l jS \of F Y h:i:s A') . "\">";
			$data['imports'] = "<script type=\"text/javascript\" src=\"/js/panel.js\"></script>";
			$data['header'] = makePanelHeader();
			View::render("/panel/$page.php", $data);
		}
	}

	public function panelAction($action)
	{
		if ($action == "panelpost") {
			$title = $_POST['title'];
			$shortdesc = $_POST['shortdesc'];
			$maindesc = $_POST['maindesc'];
			$author = $_SESSION['username'];
			$subject = $_POST['subject'];
			$postpic = $_POST['postpic'];
			$result = UserModel::panelpost($title, $shortdesc, $maindesc, $author, $subject, $postpic);

		} else if ($action == 'subjectpost') {
			$subject = $_POST['subject'];
			$admin = $_SESSION['username'];
			$result = UserModel::subjectPost($subject, $admin);
			echo $result;
		} else if ($action == 'paneledit') {
			$post_id = $_POST['id'];
			$post_title = $_POST['title'];
			$post_shortdesc = $_POST['shortdesc'];
			$post_desc = $_POST['desc'];
			$author = $_SESSION['username'];
			$subject = $_POST['subject'];
			$pic = $_POST['pic'];
			$result = UserModel::paneledit($post_id, $post_title, $post_shortdesc, $post_desc, $author, $subject, $pic);

		} else if ($action == 'paneldelete') {
			$post_id = $_POST['id'];
			$result = UserModel::paneldelete($post_id);
		}


	}


}
