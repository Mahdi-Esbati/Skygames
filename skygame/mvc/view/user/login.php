<link rel="stylesheet" href="/css/header.css">
<div align="center">
	<br>
	<div class="login-dialog" style="background-image: url('/image/ui/dark-texture1.png'")">
		<p class="mid"><img class="" width="64px" height="64px" style="  filter: drop-shadow(2px 8px 3px rgba(0, 0, 0, 0.87));margin-right: 5px" src="/image/ui/login.png"/ > </p>
		<h1  style="text-align:center ;color: #fff;text-shadow: 2px 2px #000;">ورود کاربران</h1>

		<form action="/user/login/" method="post">
			<div class="mid" >
				<p class="mainP">
					<input class="main_input" type="text" name="email" placeholder="نام کاربری" >
				</p>
				<p class="mainP">
					<input class="main_input" type="password" name="password" placeholder="رمز عبور" height="400px" width="500px">
				</p>
				<p class="mainP">
					<button class="shadowed mainBtn" style="padding-left: 30px;padding-right: 30px" type="submit">ورود</button>
				</p>
		</form>
		<a class="main-a unselectable">فراموشی رمز عبور</a>
		<br>
		<a class="main-a unselectable" href="/user/register/">قبلا ثبت نام نکرده اید؟</a>
	</div>

</div>
</div>