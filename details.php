<?php
$servername = "";
$username = "root";
$password = "";
$dbname = "ddolphin";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];   
    $password = $_POST["password"];
    $sql = "INSERT INTO login (username,email,password) VALUES ('$username','$email','$password')";
    if ($conn->query($sql) === TRUE) {
        include 'do.html';
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?> 