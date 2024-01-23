<?php

$formConfigFile = file_get_contents("rd-mailform.config.json");
$formConfig = json_decode($formConfigFile, true);

date_default_timezone_set('Etc/UTC');

try {
    require './phpmailer/PHPMailerAutoload.php';

    $recipients = $formConfig['recipientEmail'];

    preg_match_all("/([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)/", $recipients, $addresses, PREG_OFFSET_CAPTURE);

    if (!count($addresses[0])) {
        die('MF001');
    }

    function getRemoteIPAddress() {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];

        } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        return $_SERVER['REMOTE_ADDR'];
    }

    if (preg_match('/^(127\.|192\.168\.|::1)/', getRemoteIPAddress())) {
        die('MF002');
    }

    $template = file_get_contents('rd-mailform.tpl');

    if (isset($_POST['form-type'])) {
        switch ($_POST['form-type']){
            case 'contact':
                $subject = 'Un mensaje de un visitante de tu sitio';
                break;
            case 'subscribe':
                $subject = 'Solicitud de suscripción';
                break;
            case 'order':
                $subject = 'Solicitud de pedido';
                break;
            default:
                $subject = 'Un mensaje de un visitante de tu sitio';
                break;
        }
    }else{
        die('MF004');
    }

    if (isset($_POST['email'])) {
        $template = str_replace(
            array("<!-- #{FromState} -->", "<!-- #{FromEmail} -->"),
            array("Email:", $_POST['email']),
            $template);
    }

    if (isset($_POST['message'])) {
        $template = str_replace(
            array("<!-- #{MessageState} -->", "<!-- #{MessageDescription} -->"),
            array("Mensaje:", $_POST['message']),
            $template);
    }

    // En un regex, el carácter \v se utiliza como "cualquier cosa", ya que este carácter es raro
    preg_match("/(<!-- #\{BeginInfo\} -->)([^\v]*?)(<!-- #\{EndInfo\} -->)/", $template, $matches, PREG_OFFSET_CAPTURE);
    foreach ($_POST as $key => $value) {
        if ($key != "counter" && $key != "email" && $key != "message" && $key != "form-type" && $key != "g-recaptcha-response" && !empty($value)){
            $info = str_replace(
                array("<!-- #{BeginInfo} -->", "<!-- #{InfoState} -->", "<!-- #{InfoDescription} -->"),
                array("", ucfirst($key) . ':', $value),
                $matches[0][0]);

            $template = str_replace("<!-- #{EndInfo} -->", $info, $template);
        }
    }

    $template = str_replace(
        array("<!-- #{Subject} -->", "<!-- #{SiteName} -->"),
        array($subject, $_SERVER['SERVER_NAME']),
        $template);

    $mail = new PHPMailer();


    if ($formConfig['useSmtp']) {
        // Indicar a PHPMailer que use SMTP
        $mail->isSMTP();

        // Habilitar la depuración de SMTP
        // 0 = desactivado (para uso en producción)
        // 1 = mensajes del cliente
        // 2 = mensajes del cliente y del servidor
        $mail->SMTPDebug = 0;

        $mail->Debugoutput = 'html';

        // Configurar el nombre del servidor de correo
        $mail->Host = 'smtp.gmail.com';

        // Configurar el puerto SMTP - probablemente sea 587
        $mail->Port = 587;

        // Habilitar la autenticación SMTP
        $mail->SMTPAuth = true;

        // Configurar el protocolo de seguridad SMTP (TLS)
        $mail->SMTPSecure = 'tls';

        // Nombre de usuario para la autenticación SMTP (tu dirección de correo electrónico de Gmail)
        $mail->Username = 'tudirecciondecorreo@gmail.com';

        // Contraseña para la autenticación SMTP
        $mail->Password = 'tucontraseñadegmail';
    }

    $mail->From = $_POST['email'];
}


