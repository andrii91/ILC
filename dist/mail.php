<?php
header('Content-Type: text/html; charset=utf-8');
/* Log*/

# получаем все инфу с формы и пакуем массив с данными
$d['date_time'] = date("F j, Y, g:i:s a");
$d['REMOTE_ADDR'] = $_SERVER["REMOTE_ADDR"];
//$d['HTTP_USER_AGENT'] = trim($_SERVER['HTTP_USER_AGENT']);
$file = fopen('log.txt', "a+");
fwrite($file, ' #---Log--  ');
fwrite($file, print_r($d, 1));
fwrite($file, print_r(' --_REQUEST-- ', 1));
fwrite($file, print_r($_REQUEST, 1));
fwrite($file, ' ------#  ');
fclose($file);


function getVar($name)
{
    return isset($_REQUEST[$name]) ? trim($_REQUEST[$name]) : null;
}
function GetClearPhoneNumber($number) {
  if (empty($number)) {
    return "";
  }
  $number = str_replace('(', '', $number);
  $number = str_replace(')', '', $number);
  $number = str_replace('-', '', $number);
  // $number = str_replace('+', '', $number);
  $number = str_replace(' ', '', $number);
  return $number;
}

 
  $name = getVar('name');
  $phone = getVar('phone');
  $email = getVar('email');

$data = array(

  'name' => $name,
  'phone'     => GetClearPhoneNumber($phone),
  'email'     => $email,
  'message' => getVar('message'),
  'project_name' => getVar('project_name'),
  'order_type' => getVar('order_type'),
  'page_url' => getVar('page_url'),
  'date_visited' => date("d.m.Y"),
  'time_visited' => date("G:i:s"),
  'registration_type' => getVar('registration_type'),
  'user_agent' => getVar('user_agent'),
  'utm_source' => getVar('utm_source'),
  'utm_campaign' => getVar('utm_campaign'),
  'utm_medium' => getVar('utm_medium'),
  'utm_term' => getVar('utm_term'),
  'utm_content' => getVar('utm_content'),
  'ref' => getVar('ref'),
  'ip_address' => getVar('ip_address'),
  'city' => getVar('city'),
  'region' => getVar('region'),
  'country' => getVar('country'),
  'client_id' => getVar('client_id'),
  'utmcsr' => getVar('utmcsr'),
  'utmccn' => getVar('utmccn'),
  'utmcmd' => getVar('utmcmd'),
  'click_id' => getVar('click_id'),
  'affilliate_id' => getVar('affilliate_id')
);

/*

*/

/*ОТПРАВЛЯЕМ НА ПОЧТУ */
$c = true;
$admin_email = $data['email'];
$to = getVar('admin_email');
$project_name = $data['order_type'];

function adopt($text) {

	return '=?UTF-8?B?'.base64_encode($text).'?=';
}

foreach ($data as $key => $value) {
	if ($value != "") {
		$message .= "
				" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>";
	}
}
$message = "<table style='width: 100%;'>$message</table>";

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($to, adopt($project_name), $message, $headers );

/*end ОТПРАВЛЯЕМ НА ПОЧТУ */


?>