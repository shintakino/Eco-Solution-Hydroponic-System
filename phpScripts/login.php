<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eco_solution";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve POST data
$email = $_POST['email'];
$password = $_POST['password'];

// Hash the password using md5
$password = md5($password);

// Check if the email exists and password matches
$sql_check = "SELECT * FROM users WHERE email=? AND password=?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ss", $email, $password);
$stmt_check->execute();
$result = $stmt_check->get_result();

if ($result->num_rows > 0) {
    // Email and password match
    // Set login status to true
    $sql_update_status = "UPDATE users SET login_status = TRUE WHERE email = ?";
    $stmt_update_status = $conn->prepare($sql_update_status);
    $stmt_update_status->bind_param("s", $email);
    $stmt_update_status->execute();
    $stmt_update_status->close();

    // Password is correct
    echo json_encode(array("result" => "Login successful"));
} else {
    // Email and/or password is incorrect
    echo json_encode(array("error" => "Incorrect email or password"));
}


// Close connections
$stmt_check->close();
$conn->close();
?>
