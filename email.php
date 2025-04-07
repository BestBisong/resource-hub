<?php
if (isset($_POST['submit'])) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];


    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $to = "bisongbest04@gmail.com";
        $subject = "New Contact Form Submission from $name";
        

        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        

        $email_body = "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Message:\n$message\n";


        if (mail($to, $subject, $email_body, $headers)) {
            echo "Thank you for your message. We will get back to you shortly.";
        } else {
            echo "Failed to send message. Please try again later.";
        }
    } else {
        echo "Invalid email address. Please enter a valid email.";
    }
} else {
    echo "Form not submitted correctly.";
}
?>
