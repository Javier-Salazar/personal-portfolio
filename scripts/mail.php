<?php 
    $to = 'javiersalazar1945@gmail.com';

    // this is the e-mail.

    $name = $_POST['name'];
    $from = $_POST['mail'];
    $subject = $_POST['options'];
    $message = $_POST['message'];

    $header = 'Enviado desde la pagína javiersalazar.site';
    $fullMessage = $message . '\n\nAtentamente: ' . $name . ' (' . $from . ').';

    if(!empty($name) || !empty($from) || !empty($subject)){
        if(filter_var($from, FILTER_VALIDATE_EMAIL)){
            if(mail($to, $subject, $fullMessage, $header)){
                $success = true;
            }
            else{
                $success = false;
            }
        }
        else{
            $success = false;
        }
    }
    else{
        $success = false;
    }

?>