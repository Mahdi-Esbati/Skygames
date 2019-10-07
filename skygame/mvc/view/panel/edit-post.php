<br><br>
<?
$db = DB::getInstance();
$name = $_SESSION['username'];
$query = "SELECT * FROM `sky_panel` WHERE post_author = '$name'	";
$records = $db->query($query);

for ($i = 0; $i < count($records); $i++) { ?>

	<div id="post-container-<?=$records[$i]["id"]?>" align="center">
		<div id="parent" class="shadowed post-container" style="background-color: #448AFF;" align="right">
			<div id="edit-box" class="post-container" style="display: none"></div>
			<div id="image" class="image-container"><img class="main-img size100" SRC="<?=$records[$i]['post_pic']?>"></div>
			<div id="post" style="margin: 5px;color: #fff">
				<h2 id="Title"><?=$records[$i]["post_title"]?></h2>
				<span>
				<?=$records[$i]["post_short_desc"]?>
				</span>
				<div id="edit-props-<?=$records[$i]["id"]?>"></div>
				<hr class="main-hr">
				<div id="button-container-<?=$records[$i]["id"]?>">
				<button class="mainBtn" id="btn-e-<?=$records[$i]["id"]?>">ویرایش پست</button>
				<button class="mainBtn red-color" id="btn-d-<?=$records[$i]["id"]?>">حذف پست</button>
				</div>
			</div>
		</div>
	</div>

<? }

if (count($records) == 0 ){ ?>
<div id="post-container" align="center">
	<div id="parent" class="shadowed post-container" style="background-color: #448AFF;" align="right">
هیچ پستی یافت نشد !
		</div>
</div>
<? }
?>
<script>

	$("button").on('click', function () {
			var fullname = $(this).attr('id');
			var id = fullname.substr(6, fullname.length);
		if($(this).attr('id').substr(0, 6) == "btn-d-"){
			alert("Delete Post Number "+id);
			$.ajax('/user/panelAction/paneldelete/', {
				type: 'post',
				data: {
					action: 'paneldelete' ,
					id : id
				},
				success: function (data){
					$("#post-container-"+id).slideToggle(600);
					setTimeout(function () {
					$("#post-container-"+id).remove();
					}, 1000);
				}
			});
		}
	else if($(this).attr('id').substr(0, 6) == "btn-e-"){
			$(this).slideToggle(0);
		$("#edit-props-"+id).append("<input class='main_input' id='edit-text-"+id+ "'>");
		$("#button-container-"+id).append("<button class='mainBtn' id='btn-confirm-"+id+ "'> تایید </button>");
		}
	else if($(this).attr('id').substr(0, 12) == "btn-confirm-") {
		alert("a");
		$("#btn-e-"+id).slideToggle(0);
		}
	});
</script>
