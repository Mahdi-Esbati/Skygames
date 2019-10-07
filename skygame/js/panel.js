var ismenuopen = false;
$('#hide-btn').on('click', function () {
	if (!ismenuopen) {
		var getwidth = $("#panel-menu").css("width");
		$("#panel-menu").animate({width: 'toggle'}, 500, "easeOutBounce");
		$(this).toggleClass("rotated");
		$(this).css("margin-right", getwidth);
		ismenuopen = true;
		return;
	}
	if (ismenuopen) {
		$("#panel-menu").animate({width: 'toggle'}, 300);
		$(this).toggleClass("rotated");
		$(this).css("margin-right", 5);
		ismenuopen = false;
		return;
	}
});
