<br>
<h1 style="text-align:center ;color: #fff;text-shadow: 2px 2px #000;">مدیریت موضوعات</h1>
<div align="center">

	<div style="width: 60% ;border-radius: 10px;padding: 5px;padding-right: 25px;direction: ltr">

		<div class="round-corners">
			<table class="table normal-shadow" style="margin: 10px;color: #fff;background-image: url('/image/ui/steel.png') ; ">
				<thead>
				<tr>
					<th class="table-header ">شماره موضوع</th>
					<th class="table-header ">نام موضوع</th>
				</tr>
				</thead>
				<tbody id="tbody">
				<? $db = db::getInstance(); $record = $db->query("SELECT * FROM sky_subjects");
				for($i=0 ; $i<count($record);$i++){
				?>
				<tr>
					<td><?=$record[$i]["id"]?></td>
					<td><?=$record[$i]["subject"]?></td>
					</tr>
				<? } ?>
				</tbody>

			</table>

			<input class="main_input" placeholder="موضوع جدید" id="subject-name">
			<button class="mainBtn" id="send-btn">درج موضوع</button>
</div>
<script src="/js/sweetalert.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/sweetalert.css">
<script>
	$('#send-btn').on('click', function () {
		var subject =$("#subject-name").val();
		$.ajax('/user/panelAction/subjectpost', {
			type: 'post',
			data: {
				subject: subject
			},
			success: function (data) {
				swal({
					title: " پست شما با موفقیت ارسال شد ",
					type: "success",
					confirmButtonText: "تایید"
				});

				$("#tbody").append("<tr><td>"+data+"</td><td>"+subject+"</td></tr>");
			}
		});

	});

</script>

