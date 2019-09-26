<?php
// カウントアップ処理
$file	= $_POST['file'];
$count	= $_POST['count'];
$sub_count = $_POST['sub_count'];
$check	= $_SERVER['HTTP_X_REQUESTED_WITH'];

/*
	include 'ChromePhp.php';
	ChromePhp::log('いけてる');	
	ChromePhp::log($url);	
	$json = file_get_contents(__DIR__.'/data.json');
	$arr = json_decode($json,true);
	var_dump($arr);
	var_dump($arr["vote_1"]["log"]);
	echo $arr["vote_1"]["log"];
	$arr['vote_1']['log'][] = 1;
	var_dump($arr);
	$json_fp = fopen('data.json', 'w');
	flock($json_fp, LOCK_SH);
	fwrite($json_fp, json_encode($arr));
	fclose($json_fp);
*/

if ($file && $count && $check && strtolower($check) == 'xmlhttprequest') {	
	$json = file_get_contents(__DIR__.'/data.json');
	$arr = json_decode($json,true);
	$arr[$file]['log'][] = intval($count);
	$json_fp = fopen('data.json', 'w');
	flock($json_fp, LOCK_SH);
	fwrite($json_fp, json_encode($arr));
	fclose($json_fp);
}

if ($file && $count && $check && strtolower($check) == 'xmlhttprequest' && $count !== NaN && intval($count) > 0) {
	include 'ChromePhp.php';
	ChromePhp::log($count);
	$filename = 'data/'.$file.'.dat';
	$fp = @fopen($filename, 'w');
	flock($fp, LOCK_SH);
	fputs($fp, $count);
	flock($fp, LOCK_UN);
	fclose($fp);
	echo 'success';
}
if ($file && $count && $sub_count && $check && strtolower($check) == 'xmlhttprequest' && intval($count) <= 0 || $count == NaN) {
	$filename = 'data/'.$file.'.dat';
	$fp = @fopen($filename, 'w');
	flock($fp, LOCK_SH);
	fputs($fp, $sub_count);
	flock($fp, LOCK_UN);
	fclose($fp);
	echo 'success';
}

