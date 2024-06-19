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

// Fetch lux_settings level data with id = 1
$sql = "SELECT lux_settings FROM light_settings WHERE id = 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of the lux_settings level with id = 1
    $row = $result->fetch_assoc();
    $lux_settings = $row["lux_settings"];

    // Prepare JSON response
    $response = array('lux_settings' => $lux_settings);
    echo json_encode($response);
} else {
    echo "No lux_settings level data found for id = 1";
}
$conn->close();
?>
