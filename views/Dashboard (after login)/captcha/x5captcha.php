<?php
include("../res/x5engine.php");
$nameList = array("frt","d28","nep","yh5","nsg","yal","7s4","sdw","k6l","8ez");
$charList = array("F","5","Y","G","S","Y","E","3","3","R");
$cpt = new X5Captcha($nameList, $charList);
//Check Captcha
if ($_GET["action"] == "check")
	echo $cpt->check($_GET["code"], $_GET["ans"]);
//Show Captcha chars
else if ($_GET["action"] == "show")
	echo $cpt->show($_GET['code']);
// End of file x5captcha.php
