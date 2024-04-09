<?php
header("Access-Control-Allow-Origin: http://192.168.100.15:3000");
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

// Retrieve email from POST data
$email = $_POST['email'];

// Prepare SQL statement
$sql = "SELECT * FROM users WHERE email = ? AND login_status = true";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);

// Execute SQL statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Check if there is a row with the specified email and login_status true
if ($result->num_rows > 0) {
    // Email with login_status true found
    echo "Login status is true for email: $email";
} else {
    // No matching rows found
    echo "Login status is not true for email: $email";
}

// Close statement and connection
$stmt->close();
$conn->close();

?>
