<?php

class UserModel
{
	public static function subjectPost($subject, $admin)
	{
		$db = Db::getInstance();
		$query = "INSERT INTO `gigfa_18584373_skymods`.`sky_subjects` (`id`, `subject`, `admin_name`) VALUES (NULL, '$subject', '$admin');";
		$db->insert($query);
		$records = $db->query('select * from sky_subjects');
		return count($records);
	}

	public static function getNewPosts()
	{
		$db = Db::getInstance();
		$query = "SELECT * FROM `gigfa_18584373_skymods`.`sky_panel` ORDER BY id DESC ;";

		$records = $db->query($query);
		return $records;
	}

	public static function panelpost($title, $shortdesc, $maindesc, $author, $subject, $postpic)
	{
		$db = Db::getInstance();
		$query = "INSERT INTO  `gigfa_18584373_skymods`.`sky_panel` (	`id` ,`post_title` ,`post_short_desc` ,`post_desc` ,`post_author` ,`post_subject` ,`post_pic`)VALUES (	NULL ,  '$title',  '$shortdesc',  '$maindesc',  '$author',  '$subject',  '$postpic');";
		$db->insert($query);
		$records = $db->query('select * from sky_panel');
		return count($records);
	}
	public static function paneledit($post_id,$post_title,$post_shortdesc,$post_desc,$author,$subject,$pic)
	{
		$db = Db::getInstance();
		$query = "UPDATE `sky_panel` SET `post_title` = '$post_title', `post_short_desc` = '$post_shortdesc', `post_desc` = '$post_desc', `post_author` = '$author', `post_subject` = '$subject', `post_pic` = '$pic' WHERE `sky_panel`.`id` = $post_id ";
		$db->update($query);
	}
	public static function paneldelete($post_id)
	{
		$db = Db::getInstance();
		$query = "DELETE FROM `sky_panel` WHERE `id` = $post_id ";
		$db->delete($query);
	}


}