<?php
include 'dp_connect.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username_or_email = $_POST['username_or_email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username_or_email, $username_or_email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();


        if (password_verify($password, $user['password_hash'])) {
            header("Location: loading_page.html"); 
            exit(); 
        } else {
            echo "Invalid password!";
            header("Location: login_p.html");
        }
    } else {
        echo "User not found!";
    }

    $stmt->close();
}
$conn->close();
?>
