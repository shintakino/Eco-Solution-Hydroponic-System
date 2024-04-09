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

// Retrieve POST data
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'];

// Encrypt the password
$password = md5($password);

// Check if the email already exists
$sql_check = "SELECT * FROM users WHERE email=?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $email);
$stmt_check->execute();
$result = $stmt_check->get_result();

if ($result->num_rows > 0) {
    // Email already exists
    //echo json_encode(array("error" => "Email already exists"));
} else {
    // Prepare SQL statement to insert data into the users table
    $sql = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $firstName, $lastName, $email, $password);


    // Execute SQL statement
    if ($stmt->execute() === TRUE) {
        echo json_encode(array("result" => "User registered successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

// Close connections
$stmt_check->close();
$stmt->close();
$conn->close();
?>
