<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Replace with your database credentials
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

// Fetch latest ph_value data
$sql = "SELECT ph_value FROM ph_data ORDER BY timestamp DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of the latest ph_value
    $row = $result->fetch_assoc();
    $ph_value = $row["ph_value"];

    // Prepare JSON response
    $response = array('ph_value' => $ph_value);
    echo json_encode($response);
} else {
    echo "No ph_value data found";
}
$conn->close();
?>

