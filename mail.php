<?php
  if (isset($_POST['subj'])) {$subj = $_POST['subj'];}
	if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
	if (isset($_POST['name'])) {$name = $_POST['name'];}
	if (isset($_POST['email'])) {$clientemail = $_POST['email'];}
	if (isset($_POST['message'])) {$message = $_POST['message'];}



$emailsender = 'web@kuplju-chasy.ru';


$to  = "world_clock@list.ru" ;
$to .= ", zokrat@bk.ru";


// $mes = "Тема: Заказ обратного звонка с сайта!\nТелефон: $phone\n";
$mes = "Тема: $subj\nТелефон: $phone\nИмя: $name\nE-mail: $clientemail\nСообщение: $message";
$sub='Сообщение или заказ звонка с сайта'; //сабж

$send = mail ($to,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$emailsender");

ini_set('short_open_tag', 'On');
header('Refresh: 3; URL=index.html');
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="refresh" content="3; url=index.html">
		<title>Ваше сообщение принято</title>
		<meta name="generator">

		<style type="text/css">
			body{
			   background: #93d0df;
			}
			.ok{
				width: 300px;
				height: 200px;
				position: fixed;
				left: 50%;
				top: 50%;
				margin-left: -150px;
				margin-top: -100px;
				text-align: center;
			}
			.ok p{
				font: 700 36px/42px Verdana;
				color: #2e59a8;
			}

		</style>
	</head>
<body>


	<div class="ok">
		<p>Ваше сообщение принято</p>
	</div>

	<script type="text/javascript">
	setTimeout('location.replace("/index.php")', 3000);
	/*Изменить текущий адрес страницы через 3 секунды (3000 миллисекунд)*/
	</script>

</body>
</html>
