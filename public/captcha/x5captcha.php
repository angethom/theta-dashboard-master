<?php
include("../res/x5engine.php");
$nameList = array("jhs","48p","8nd","r82","w3d","rkr","w78","vxf","5ek","lmp");
$charList = array("M","C","Z","5","G","L","5","K","N","6");
$cpt = new X5Captcha($nameList, $charList);
//Check Captcha
if ($_GET["action"] == "check")
	echo $cpt->check($_GET["code"], $_GET["ans"]);
//Show Captcha chars
else if ($_GET["action"] == "show")
	echo $cpt->show($_GET['code']);
// End of file x5captcha.php
