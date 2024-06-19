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

// Fetch latest light level data
$sql = "SELECT light FROM tsl2561_data ORDER BY date DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of the latest light level
    $row = $result->fetch_assoc();
    $light = $row["light"];

    // Prepare JSON response
    $response = array('light' => $light);
    echo json_encode($response);
} else {
    echo "No light level data found";
}
$conn->close();
?>
