<br>
<h1 style="text-align:center ;color: #fff;text-shadow: 2px 2px #000;">پست جدید</h1>
<div align="center">

	<div style="max-width: 70% ;border-radius: 10px;padding: 15px;color: #fff">
		<input class="main_input" type="text" id="title" placeholder="نام پست:">
		<input class="main_input" type="text" id="shortdesc" placeholder="توضیح کوتاه:" height="400px" width="500px">
		<br>
		<br>

		<input class="img_input" type="text" id="img-link" placeholder="لینک عکس مطلب" height="400px" width="500px"><img
			id="post-img" src="/image/ui/placeholder.png" alt=" عکس پیدا نشد !" class="main-img">
		<br>
		<br>
		<span>لطفا موضوع پست خود را انتخاب کنید</span>
		<? $db = Db::getInstance();
		$result = $db->query("SELECT * FROM `sky_subjects`"); ?>
		<select id="sub-select">
			<? for ($i = 0; $i < count($result); $i++) { ?>
			<option value="<?= $result[$i]["subject"] ?>"> <?= $result[$i]["subject"] ?></option><? } ?>
		</select>
		<br>
		<br>
		<textarea class="main_input" placeholder="توضیح کامل:" id="main-desc"></textarea>
		<br>
		<p class="mainP">
			<button class="shadowed mainBtn" id="send-btn">ارسال پست</button>
			<button class="shadowed mainBtn" id="draft">ذخیره در پیش نویس ها</button>
		</p>

	</div>
</div>

<div style="float: left">
</div>
<script src="/js/tinymce/tinymce.min.js"></script>
<script src="/js/sweetalert.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/sweetalert.css">
<script>
	tinymce.init({
		selector: '#main-desc',
		language: 'fa_IR',
		skin: 'skygames',
		plugins: [
			'advlist autolink lists link image preview hr anchor ',
			'searchreplace visualblocks visualchars fullscreen',
			'insertdatetime media save table contextmenu ',
			'paste textcolor colorpicker  imagetools'
		],
		height: 500,
		toolbar1: 'insertfile undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image |  preview media | forecolor backcolor ',
		content_css: "/css/tinymce-content.css?<?=date('l jS \of F Y h:i:s A')?>",
		image_advtab: true, relative_urls: false
	});

	$("#draft").on('click', function () {
		var a = tinyMCE.get('main-desc').getContent();
		alert(a);
	});


	$('#img-link').on('input', function (e) {
		var source = $("#img-link").val();
		$("#post-img").attr('src', source);
	});


	$('#send-btn').on('click', function () {
		var title = $("#title").val();
		var shortdesc = $("#shortdesc").val();
		var maindesc = tinyMCE.get('main-desc').getContent();
		var subject = $("#sub-select").val();
		var postpic = $("#img-link").val();


		$.ajax('/user/panelAction/panelpost/', {
			type: 'post',
			data: {
				title: title,
				shortdesc: shortdesc,
				maindesc: maindesc,
				subject: subject,
				postpic: postpic
			},
			success: function (data) {
				swal({
					title: " پست شما با موفقیت ارسال شد ",
					type: "success",
					confirmButtonText: "تایید"
				});
			}
		});

	});

</script>

