<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: http://192.168.100.15:3000");
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

// Query to get temperature settings
$sql = "SELECT * FROM temperature_settings";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data as JSON
    $row = $result->fetch_assoc();
    echo json_encode(array(
        'min' => $row['min_temperature'],
        'max' => $row['max_temperature']
    ));
} else {
    // If no data exists, return an empty JSON object
    echo json_encode(array());
}

// Close the database connection
$conn->close();
?>
