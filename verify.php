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
    $email = $_POST["email"];
    $password = $_POST["password"];
    $sql= "SELECT * FROM login WHERE email = '$email' AND password = '$password' ";
    $result = mysqli_query($conn,$sql);
    $check = mysqli_fetch_array($result);
    if(isset($check))
    {
        include 'do.html';
    }
    else
    {
   echo '<script>alert("Incorrect Username or Password!!")</script>'; 
include 'login.html';
    }

}

$conn->close();
?> 
