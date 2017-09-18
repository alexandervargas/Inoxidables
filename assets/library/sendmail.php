<?php
	session_start();
  
	//añadirle tu dirección de correo electrónico aquí
	define("MY_EMAIL", "");

  /**
   * Establece la cabecera de error y la respuesta de mensaje de error JSON.
  
   */
  function errorResponse ($messsage) {
    header('HTTP/1.1 500 Error Interno del Servidor');
    die(json_encode(array('message' => $messsage)));
  }

  /**
   * Funcion para establecer el cuerpo del mensaje
   */
   function setMessageBody ($name, $message) {
    $message_body = "Nombre: " . $name."\n\n";
    $message_body .= "Comentario:\n" . nl2br($message);
    return $message_body;
  }
	$email = $_POST['email']; 
	$message = $_POST['message'];
  header('Content-type: application/json');
	//Pequeña validación. esto fue validado en el lado del cliente también
  if (empty($email) || empty($message)) {
    errorResponse('Correo electrónico o mensaje está vacío.');
  }
  //hacer verificación Captcha, asegúrese de que el remitente no es un robot:)...
  require './vender/securimage/securimage.php';
  $securimage = new Securimage();
  if (!$securimage->check($_POST['captcha_code'])) {
    errorResponse('Código de Seguridad no válido');
  }
	
  //tratar de enviar el mensaje usando la funcion mail de php
  if(mail(MY_EMAIL, $_POST['reason'], setMessageBody($_POST["name"], $message), "From: $email")) {
    echo json_encode(array('message' => 'Su mensaje se ha enviado correctamente.'));
  } else {
    header('HTTP/1.1 500 Error Interno del Servidor');
    echo json_encode(array('message' => 'Error inesperado al intentar enviar correo electrónico.'));
  }
?>
