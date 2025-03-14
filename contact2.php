<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Vérifie que PHPMailer est bien installé avec Composer

$mail = new PHPMailer(true);

try {
    // Paramètres SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'theo.petit.foot@gmail.com'; // Ton email
    $mail->Password = 'y8YfN1J6#'; // Ton mot de passe ou App Password Gmail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Destinataire
    $mail->setFrom('theo.petit.foot@gmail.com', 'Théo');
    $mail->addAddress('theo.petit.foot@gmail.com'); // Destinataire

    // Contenu de l'email
    $mail->isHTML(true);
    $mail->Subject = 'Test envoi PHPMailer';
    $mail->Body = 'Ceci est un test d\'envoi via PHPMailer.';

    // Envoi de l'email
    if ($mail->send()) {
        echo 'Message envoyé avec succès !';
    } else {
        echo 'Erreur lors de l\'envoi du message.';
    }
} catch (Exception $e) {
    echo "Erreur : " . $mail->ErrorInfo; // Affiche le message d'erreur détaillé
}
