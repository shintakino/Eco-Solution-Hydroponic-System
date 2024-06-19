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

// Fetch latest humidity data
$sql = "SELECT humidity FROM sensordata ORDER BY date DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of the latest humidity
    $row = $result->fetch_assoc();
    $humidity = $row["humidity"];

    // Prepare JSON response
    $response = array('humidity' => $humidity);
    echo json_encode($response);
} else {
    echo "No humidity data found";
}
$conn->close();
?>
