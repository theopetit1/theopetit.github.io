<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des champs du formulaire
    $nom = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $sujet = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    // Adresse e-mail où envoyer le message
    $destinataire = "theo.petit.foot@gmail.com"; 
    $sujet_email = "Nouveau message de contact : " . $sujet;

    // Corps du message
    $contenu = "Nom: " . $nom . "\n";
    $contenu .= "Email: " . $email . "\n";
    $contenu .= "Message:\n" . $message . "\n";

    // En-têtes pour l'e-mail
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoi de l'e-mail
    if (mail($destinataire, $sujet_email, $contenu, $headers)) {
        echo "Message envoyé avec succès !";
    } else {
        echo "Une erreur est survenue lors de l'envoi du message.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>




<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Config serveur SMTP (Gmail)
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'theo.petit.foot@gmail.com'; // Mets ton email Gmail
    $mail->Password = 'xxx'; // Mets ton mot de passe Gmail ou App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Expéditeur et destinataire
    $mail->setFrom('site@gmail.com', 'Nom Expéditeur');
    $mail->addAddress('theo.petit.foot@gmail.com'); // Email du destinataire

    // Contenu du mail
    $mail->isHTML(true);
    $mail->Subject = "Nouveau message de contact";
    $mail->Body    = "Nom: " . $_POST["name"] . "<br>Email: " . $_POST["email"] . "<br>Message: " . $_POST["message"];

    $mail->send();
    echo "Message envoyé avec succès !";
} catch (Exception $e) {
    echo "Erreur : le message n'a pas pu être envoyé. Mailer Error: {$mail->ErrorInfo}";
}
?>
