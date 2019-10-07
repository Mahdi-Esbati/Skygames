<?php

class ExploreController
{
	public function __construct()
	{
	}

	public function posts()
	{
		View::render("post/explore-posts.php");
	}
}

