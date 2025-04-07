<?php
include 'dp_connect.php';

if (isset($_POST['submit'])){
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];


    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";


    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password_hash);

    if ($stmt->execute()) {
        header("Location:login_p.html");
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();

?>

